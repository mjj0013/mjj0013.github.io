var myHeaders = new Headers();
myHeaders.set("Access-Control-Allow-Origin", "*");
myHeaders.set("Access-Control-Request-Headers", "*");


// import {startAnimation, updateCover} from "./NavBar.js";

// var coverCanvas = document.getElementById("coverCanvas");


function getCurrentLocation() {
    var pathName = window.location.pathname;
    var pathFileName = pathName.substr(pathName.lastIndexOf("/")+1)
    pathFileName = pathFileName.replace("#","");
    pathFileName = pathFileName.replace(".html","");
    return pathFileName;
}

window.onload = () => {
    var currentLocation = getCurrentLocation();
    if(currentLocation=="index") {
        initNavBar();
        initBackground();    
    }
   if(currentLocation=="eyes") {

   }
   if(currentLocation=="pacmen") {


   }
   if(currentLocation=="busStops") {
       
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
