//elements needed to create canvas and get it its built in functions 
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
//create an array of enemies for the class to run through
const numberOfEnemies = 10;
const enemiesArray = [];
let gameFrame = 0;

class Enemy {
    constructor() {
        //pulls the image and sets it to the class
        this.image = new Image();
        this.image.src = 'assets/enemies/enemy4.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 213;
        this.spriteHeight = 213;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.newX = Math.random() * canvas.width;
        this.newY = Math.random() * canvas.height;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.interval = Math.floor(Math.random() * 350 + 200);

    };
    update() {
        //adds a random new position using Math.random
        if (gameFrame %this.interval == 0) {
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
        }
        //changes our current position of X & Y and updates them every 60 frames
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x -= dx/20;
        this.y -= dy/20;
        // this.x = 0;
        // this.y = 0;
        if (this.x + this.width < 0) this.x = canvas.width;
        // this.y += Math.random() * 10 - 5;
        //animate sprites 
        if (gameFrame % this.flapSpeed == 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    };
    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width,
            this.height, this.height)
    };
};

for (let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new Enemy());
};

//animation function
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
};

animate();


