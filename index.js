
var myHeaders = new Headers();
myHeaders.set("Access-Control-Request-Headers", "*");


import {startAnimation} from "./NavBar.js";
var coverCanvas = document.getElementById("coverCanvas");

var coverTriangles = [];
var xSortedCoverTriangles = [];
var ySortedCoverTriangles = [];
var step = 0;

window.onload = () => {
    var canvas = document.getElementById("coverCanvas");
    
    canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
    startAnimation(coverCanvas);
    
    window.onresize = () => {
        canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
        startAnimation(coverCanvas);
    }
    setInterval(update,1000/60);
}
