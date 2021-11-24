var myHeaders = new Headers();
myHeaders.set("Access-Control-Request-Headers", "*");
myHeaders.set("Access-Control-Allow-Origin", "*");

import {startAnimation, updateCover} from "../NavBar.js";


window.onload = function() {


  var game = document.getElementById("game");
  game.width = window.innerWidth;
  game.height = window.innerHeight;




  var canvas = document.getElementById("coverCanvas");
  canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
  startAnimation(coverCanvas);
  
  window.onresize = () => {
      canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
      startAnimation(coverCanvas);
  }

  setInterval(updateCover,1000/60);
}

var pos = 0;
const pacArray = [
    ['./images/PacMan1.png', './images/PacMan2.png'],
    ['./images/PacMan3.png', './images/PacMan4.png'],
  ];
var direction = 0;
const pacMen = []; // This array holds all the pacmen


// This function returns an object with random values
function setToRandom(scale) {
  console.log("Math.random()",Math.random());
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  var velocity = setToRandom(10); // {x:?, y:?}
  var position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = 100;

  // TODO: set position here

  
  newimg.setAttribute("left",position.x+"px");
  newimg.setAttribute("top",position.y+"px");
 
  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {"position":position, "velocity":velocity, "newimg":newimg};
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  console.log("pacMen",pacMen);
    pacMen.forEach((item) => {
      
      checkCollisions(item);
      item.position.x += item.velocity.x;
      item.position.y += item.velocity.y;

      item.newimg.style.left = item.position.x+"px";
      item.newimg.style.top = item.position.y+"px";
    });
  
  setTimeout(()=>{update();}, 20);
  
}

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  //var game = document.getElementById("game");
  if(item.position.x+item.newimg.width+item.velocity.x  > window.innerWidth ) {
    item.velocity.x *= -1;
  }
  else if(item.position.x+item.velocity.x < 0 ) {
    item.velocity.x *= -1;
  }
  if(item.position.y + item.newimg.height+item.velocity.y > window.innerHeight ) {
    item.velocity.y *= -1;
  }
  else if(item.position.y +item.velocity.y  < 0 ) {
    item.velocity.y *= -1;
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

// don't change this line
// if (typeof module !== 'undefined') {
//   module.exports = { checkCollisions, update, pacMen, makeOne };
// }

export {checkCollisions, update, pacMen, makeOne}