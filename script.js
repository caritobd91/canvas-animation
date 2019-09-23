const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];
const colours = [
  'white',
  'rgba(255, 255, 255, 0.3)',
  'rgba(173, 216, 230, 0.8)',
  'rgba(211, 211, 211, 0.8)'
];

const maxSize = 40;
const minSize = 0;
const mouseRadius = 60;

// mouse position
let mouse = {
  x: null,
  y: null
};
window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
  }
)
// create constructor function for particle
// function to create many similiar objects
function Particle(x,y, directionX, directionY, size, colour) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.colour = colour;
}
// add draw method to particle prototype
Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  // ctx.fillRect(this.x, this.y, this.size, this.size); this will draw rectangles
  ctx.fillStyle = this.colour;
  ctx.fill();
}
// add update method to particle prototype
Particle.prototype.update = function() {
  // check where the particle is at the moment
  // if particle hits any walls, will switch direction x or direction y values. This will animate it in opposite direction
  if (this.x + this.size*2 > canvas.width ||
      this.x - this.size*2 < 0) {
        this.directionX = -this.directionX;
  }
  if (this.y + this.size*2 > canvas.height ||
    this.y - this.size*2 < 0) {
      this.directionY = -this.directionY;
  }
  // move particles
  this.x += this.directionX;
  this.y += this.directionY;

  //mouse interactivity. First check if particles are close to our mouse
  if ( mouse.x - this.x < mouseRadius
      && mouse.x - this.x >  -mouseRadius
      && mouse.y - this.y < mouseRadius
      && mouse.y - this.y > -mouseRadius) {
        if (this.size < maxSize) {
          this.size += 3; // how fast particles are growing and shrinking
        }
      } else if (this.size > minSize) {
        this.size -= 0.1;
      }
      if (this.size < 0) {
          this.size = 0;
      }
      this.draw();
}
// create particle array
function init() {
  particleArray = [];
  for (let i = 0; i < 1000; i++) {
    let size = 0;
    let x = (Math.random() * ((innerWidth - size *2) - (size*2)) + size * 2);
    let y = (Math.random() * ((innerHeight - size *2) - (size*2)) + size * 2);
    let directionX = (Math.random() * .2) - .1;
    let directionY = (Math.random() * .2) - .1;
    let colour = colours[Math.floor(Math.random() * colours.length)]; // gets whole number between 1 and 4

    particleArray.push(new Particle(x, y, directionX, directionY, size, colour));
  }
}
// animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth, innerHeight);

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }
}
init();
animate();

// resize event
window.addEventListener('resize',
  function() {
    canvas.width = this.innerWidth;
    canvas.height = this.innerHeight;
    init();
  }
)

// remove mouse position periodically
setInterval(function() {
  mouse.x = undefined;
  mouse.y = undefined;
}, 1000);