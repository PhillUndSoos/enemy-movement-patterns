//tells VSCode that im using canvas, so it suggests built in canvas methods
/** @type {HTMLCanvasElement} */
//references canvas1 in index.HTML
const canvas = document.getElementById('canvas1');
//sets the rendering context of canvas to two-dimensional rendering
const ctx = canvas.getContext('2d');
//sets CANVAS_HEIGHT to and WIDTH equal to HTML's canvas dimensions for context in our JS file
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const amountOfEnemys = 10;
const enemiesArray = [];

//Factory for enemy objects
class Enemy {
    //this constructs our enemy objects
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.width = 100;
        this.height = 100;
    }
    //this method, when called, updates the position of the object it gets called on, making it move.
    update() {
        this.x++
        this.y++
    }
    //this method draws the constructed object at set coordiantes with set dimensions(size)
    draw() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
//a loop that loops amountOfEnemys'th times and creates a new instance of an enemy object and pushes it into enemiesArray for each iteration
for (let i = 0; i < amountOfEnemys; i++) {
    enemiesArray.push(new Enemy());
}

console.log(enemiesArray)

//this is the animation
function animate() {
    //clears all old rendered frames
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //calls the update() and draw() method on each item of enemiesArray
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    //tells the browser to perform an animaton, invoking the callback passed in
    requestAnimationFrame(animate);
}
animate()