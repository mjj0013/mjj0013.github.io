var myHeaders = new Headers();
myHeaders.set("Access-Control-Request-Headers", "*");


import {startAnimation, updateCover} from "./NavBar.js";
import {SettingsModal} from "./SettingsWindow/SettingsWindow.js"
// var coverCanvas = document.getElementById("coverCanvas");

// var coverTriangles = [];
// var xSortedCoverTriangles = [];
// var ySortedCoverTriangles = [];
// var step = 0;


window.onload = () => {
    var canvas = document.getElementById("coverCanvas");
    
    canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
    startAnimation(canvas);
    
    window.onresize = () => {
        canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
        startAnimation(canvas);
    }
    setInterval(updateCover,1000/60);


    
}
