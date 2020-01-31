// DOM References
let movementDisplay = document.getElementById("movement");
let game = document.getElementById("game");
let ctx = game.getContext("2d");

// Set canvas width and height
game.setAttribute("width", getComputedStyle(game).width);
game.setAttribute("height", getComputedStyle(game).height);

function drawBox(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
}

// game.addEventListener("click", function(e) {
//     // drawBox(e.offsetX, e.offsetY, 50, 'green');
//     // clear canvas
//     ctx.clearRect(0, 0, game.width, game.height);
//     ogre.render();
//     hero.x = e.offsetX;
//     hero.y = e.offsetY;
//     hero.render();
// })

// constructor function
function Crawler(x, y, color, width, height){
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.alive = true;
    this.render = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let ogre = new Crawler(100, 50, '#BADA55', 40, 80);
let hero = new Crawler(Math.floor(Math.random()*game.width), 
                        Math.floor(Math.random()*game.height), "hotpink", 20, 20);

function movementHandler(e) {
    // w = 87 -> y--
    // a = 65 -> x--
    // s = 83 -> y++
    // d = 68 -> x++
    switch(e.keyCode) {
        case (87):
            if (hero.y > 0){
                hero.y -= 10;
            }
            break;
        case (65):
            if (hero.x > 0) {
                hero.x -= 10;
            }
            break;
        case (83):
          if (hero.y < (game.height - hero.height)) {
              hero.y += 10;
          }
            break;
        case (68):
            if (hero.x < (game.width - hero.width)) {
                hero.x += 10;
            }
    }
}

document.addEventListener("keydown", movementHandler);

function detectHit() {
    // hero.x < ogre.x + ogre.width
    // hero.x + hero.width > ogre.x
    // hero.y < ogre.y + ogre.height
    // hero.y + hero.height > ogre.y
    if (hero.x < ogre.x + ogre.width 
        && hero.x + hero.width > ogre.x 
        && hero.y < ogre.y + ogre.height
        && hero.y + hero.height > ogre.y) {
            ogre.alive = false;
            // run end game function
            document.getElementById("status")
            .textContent = "You committed murder! Congrats!"
        }
}

function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, game.width, game.height);
    // display hero coords in upper right box movementDisplay
    movementDisplay.innerHTML = "X: " + hero.x + "<br> Y: " + hero.y;
    // render hero
    hero.render();
    // check if ogre is alive
    if (ogre.alive) {
        // render the ogre
        ogre.render();
        detectHit();
    }
}

let runGame = setInterval(gameLoop, 60); // 60ms = 16fps