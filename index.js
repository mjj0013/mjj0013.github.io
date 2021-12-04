var myHeaders = new Headers();
myHeaders.set("Access-Control-Allow-Origin", "*");
myHeaders.set("Access-Control-Request-Headers", "*");


// import {startAnimation, updateCover} from "./NavBar.js";

var coverCanvas = document.getElementById("coverCanvas");

var navBar = document.getElementById("navBar");
var backgroundSVG = document.getElementById("backgroundSVG");

function getCurrentLocation() {
    var pathName = window.location.pathname;
    console.log("pathName", pathName)
    var pathFileName = pathName.substr(pathName.lastIndexOf("/")+1)
    pathFileName = pathFileName.replace("#","");
    pathFileName = pathFileName.replace(".html","");
    
    return pathFileName;
}

window.onresize = () => {
    for(let i =0; i < navBar.children.length; ++i) {
        navBar.removeChild(navBar.children[i])
    }
    
    if(getCurrentLocation()=="index") initBackground();    
    
    initNavBar();
    //console.log(document.getElementById("mitProjectsDropdownButton").onclick);
    //coverCanvas.width = coverCanvas.height * (coverCanvas.clientWidth / coverCanvas.clientHeight);
}




window.onload = () => {
    
    var currentLocation = getCurrentLocation();
    console.log("currentLocation", currentLocation)
    if(currentLocation=="index" || currentLocation=="/") {
        initNavBar();
        initBackground();    
    }
   if(currentLocation=="eyes") {
    initNavBar();
   }
   if(currentLocation=="pacmen") {
    initNavBar();

   }
   if(currentLocation=="busStops") {
    initNavBar();
   }
    // var canvas = document.getElementById("coverCanvas");
    
    // canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
    // startAnimation(canvas);
    
    // window.onresize = () => {
    //     canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
    //     startAnimation(canvas);
    // }
    // setInterval(updateCover,1000/60);


    
}


function startBallGame() {

    var numOfBalls = 30;
    for(let i=0; i < numOfBalls;++i) {

    }

}
