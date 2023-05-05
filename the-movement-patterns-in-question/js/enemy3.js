/** ++++SOME DOCUMENTATION MAY BE OUTDATED++++ */
//tells VSCode that im using canvas, so it suggests built in canvas methods
/** @type {HTMLCanvasElement} */

//references canvas1 in index.HTML
const canvas = document.getElementById('canvas1');

//sets the rendering context of canvas to two-dimensional rendering
const ctx = canvas.getContext('2d');

//sets CANVAS_HEIGHT to and WIDTH equal to HTML's canvas dimensions for context in our JS file
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

//sets the amount of enemys. the value is used in the loop that creates instances of enemy objects
const amountOfEnemys = 10;

//enemy objects will be saved in this array
const enemiesArray = [];


//creates a new HTMLImageElement and saves it to a constant variable
const enemyImage1 = new Image();

//The source of the image is set here
let gameFrame = 0;


//Factory for enemy objects
class Enemy {
    //this constructs our enemy objects
    constructor() {
        this.image = new Image();
        this.image.src = './media/enemy3.png'

        //the following line randomly generates the speed of the object | f.e.: random() * 4 - 2 is equal to -2 to 2 
        this.speed = Math.random() * 4 + 1;

        //this sets the sprideWidth and spriteHeight
        this.spriteWidth = 218;
        this.spriteHeight = 177;

        //this scales the width and height using spriteWidth and spriteHeight as reference
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;

        //the following 2 lines randomly generate a starting position on the canvas
        this.x = Math.random() * (canvas.width - this.width );
        this.y = Math.random() * (canvas.height - this.height);

        //sets the frame of the sprite, if increased by one, the next sprite (frame) is selected
        this.frame = 0;

        //this sets the animation speed of the sprites to a random number between 1 and 4
        this.spriteAnimationSpeed = Math.floor(Math.random() * 3 + 1);

        //sets the starting position on the sinus wave
        this.angle = Math.random() * 10 + 395;

        //determines of fast the angle is increasing
        this.angleSpeed = Math.random() * 1.5 + 0.5;

        //in this case it determines the radius of the circle 
        this.curve = Math.random() * 200 + 50;
    }

    //this method, when called, updates the position of the object it gets called on, making it move.
    update() {
        //sets the horizontal axis of movement equal to the value of speed
        this.x = canvas.width / 2 * Math.cos(this.angle * Math.PI / 100) + (canvas.width / 2 - this.width / 2);
        
        // makes vertical movement a sinus wave 
        this.y = canvas.height / 2 * Math.sin(this.angle * Math.PI / 300) + (canvas.height / 2 - this.height / 2);
        
        //sets the angle of the sinus wave, the higher the speed, the higher the angle
        this.angle += this.angleSpeed;

        //makes the enemy appear back on the right edge of the canvas after disappearing on the left edge
        if (this.x + this.width < 0) {
            this.x = canvas.width
        }

        //animate sprites, if gameFrame / 2 remainder is 0, then execute animation frame (to slow the animation down)
        if (gameFrame % this.spriteAnimationSpeed === 0) {
            //picking frame 1-4, if higher, resets back to frame 0
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
        
        
    }

    //this method draws the constructed object at set coordiantes with set dimensions(size)
    draw() {
        //ctx.strokeRect(this.x, this.y, this.width, this.height);
        //This draws the image. Syntax explanation here: "https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage"
        //this.frame * this.spriteWidth makes it so if sprite.frame is increased by one, the 2nd sprite of the picture is used
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}

//a loop that loops amountOfEnemys'th times and creates a new instance of an enemy object and pushes it into enemiesArray for each iteration
for (let i = 0; i < amountOfEnemys; i++) {
    enemiesArray.push(new Enemy());
}

//this is the animation
function animate() {
    //clears all old rendered frames
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    //calls the update() and draw() method on each item of enemiesArray
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    //counts every frame
    gameFrame++;

    //tells the browser to perform an animaton, invoking the callback passed in
    requestAnimationFrame(animate);
}
animate()

//20% of this code already went pretty much over my head. I tried to document everything as good as i could
//but i couldn't explain this to you in detail. If it works, it works. 