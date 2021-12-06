var myHeaders = new Headers();
myHeaders.set("Access-Control-Allow-Origin", "*");
myHeaders.set("Access-Control-Request-Headers", "*");



var coverCanvas = document.getElementById("coverCanvas");
var navBar = document.getElementById("navBar");
var backgroundSVG = document.getElementById("backgroundSVG");

function getCurrentLocation() {
    var pathName = window.location.pathname;
    console.log("pathName", pathName)
    var pathFileName = pathName.substr(pathName.lastIndexOf("/")+1)
    pathFileName = pathFileName.replace("#","");
    pathFileName = pathFileName.replace(".html","");
    if(pathName=="/") return "index";

    else return pathFileName;
}

window.onresize = () => {
    for(let i =0; i < navBar.children.length; ++i) {
        navBar.removeChild(navBar.children[i])
    }
    
    initNavBar();
    if(getCurrentLocation()=="index" || getCurrentLocation()=="/") initBackground();    
    //adjustBackground();
    
    //console.log(document.getElementById("mitProjectsDropdownButton").onclick);
    //coverCanvas.width = coverCanvas.height * (coverCanvas.clientWidth / coverCanvas.clientHeight);
}



var moveObj = (key) => {
    let obj = physicalObjects[controlledObjectIndex];
    if(key=='ArrowDown') {obj.yVelocity = obj.yVelocity+5;}
    else if(key=='ArrowUp') {obj.yVelocity = obj.yVelocity-5;}
    else if(key=='ArrowLeft') {obj.xVelocity = obj.xVelocity-5;}
    else if(key=='ArrowRight') {obj.xVelocity = obj.xVelocity+5;}
    

}
//document.getElementById("ballContainer")
window.addEventListener("keydown", 
    (e) =>{
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
        // if(e.code=='Space') {this.generateRandomMesh(25,2);}    //try 25
        
        //if(e.code=='Space') {this.generateRandomMesh(10,2);}
        moveObj(e.code);
    }
);



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
    if(currentLocation=="wordSearch") {
        
        initNavBar();
        // initBackground();    
        
    }    
    if(currentLocation=="imageGallery") {
        
        initNavBar();
        //initBackground();    
        
    }
}


function startBallGame() {

    var numOfBalls = 30;
    for(let i=0; i < numOfBalls;++i) {

    }

}
