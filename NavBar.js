// const { generateRandomMesh } = require("./Mesh");

var myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

var coverCanvas = document.getElementById("coverCanvas");
var coverTriangles = [];
var xSortedCoverTriangles = []
var ySortedCoverTriangles = []
var step = 0;

var selectedHue = 220;

var numOfNavElements = 3;
var navElementSizes = {150:2}     //keys are size, values are the quantities of each size

var mitDropDownOpen = false;

window.onload = () =>{
   
    var canvas = document.getElementById("coverCanvas");
    canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
    startAnimation(coverCanvas);

    window.onresize = () => {
        canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
        startAnimation(coverCanvas);

        var pathName = window.location.pathname;
        var pathFileName = pathName.substr(pathName.lastIndexOf("/")+1)
        pathFileName = pathFileName.replace("#","");
        pathFileName = pathFileName.replace(".html","");
    
        insertNavLinks(document.getElementById("navBar"), pathFileName, true, selectedHue);
        addRemainingSegment(selectedHue, true);
    }
    setInterval(updateCover,1000/60);
    
    var pathName = window.location.pathname;
    var pathFileName = pathName.substr(pathName.lastIndexOf("/")+1)
    pathFileName = pathFileName.replace("#","");
    pathFileName = pathFileName.replace(".html","");


    createDropdown(pathFileName);
    insertNavLinks(document.getElementById("navBar"), pathFileName);
    addRemainingSegment();
    document.getElementById("sw").setAttribute("right", window.innerWidth);

    console.log("navBar", document.getElementById("navBar"));

    var settingsButton = document.getElementById("settingsButton");
    settingsButton.onclick = () => {
        if(document.getElementById("sw").style.display=="block") {document.getElementById("sw").style.display="none";}
        else document.getElementById("sw").style.display="block";
        
    }

    settingsButton.onmouseover = (e) => {
        //document.getElementById("gradientAnimation").beginElement()
        document.getElementById("gearRotate1").beginElement();
        document.getElementById("gearRotate2").beginElement();
        settingsButton.setAttribute("cursor","pointer");
        
    }
    settingsButton.onmouseout = (e) => {
        document.getElementById("gearRotate1").endElement();
        document.getElementById("gearRotate2").endElement();
    }

    
    // document.getElementById("mitProjectsDropdownButton")
    document.getElementById("mitProjectsDropdownButton").onclick = (e) => {
       
        
        if(mitDropDownOpen) {
            var dropDownAnimation = document.getElementById("reverseDropdownAnimation");
            dropDownAnimation.beginElement();
            
            
            document.getElementById("pacmenNavLink").style.display = 'none';
            document.getElementById("eyesNavLink").style.display = 'none';
            document.getElementById("busStopsNavLink").style.display = 'none';
            
            mitDropDownOpen = false;
            generateNewAnimation();
            
        }
        else {
            var dropDownAnimation = document.getElementById("forwardDropdownAnimation");
            dropDownAnimation.beginElement();
            dropDownAnimation.addEventListener("endEvent", ()=>{
                document.getElementById("pacmenNavLink").style.display = 'block';
                document.getElementById("eyesNavLink").style.display = 'block';
                document.getElementById("busStopsNavLink").style.display = 'block';
               
                mitDropDownOpen = true;
            },false);
            
        }
        
        
        
        

    }
    
    
    
    //  generateRandomMesh();
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


function baseColorChanged() {
    var newHue = document.getElementById("baseColor");

    var pathName = window.location.pathname;
    var pathFileName = pathName.substr(pathName.lastIndexOf("/")+1)
    pathFileName = pathFileName.replace("#","");
    pathFileName = pathFileName.replace(".html","");
    selectedHue = newHue.value;
    insertNavLinks(document.getElementById("navBar"), pathFileName, true, newHue.value);
    addRemainingSegment(newHue.value, true);

}

function createElementFromString(str) {

    var element = new DOMParser().parseFromString(str, 'text/html').body.firstElementChild;
    return element;
}

function createDropdown(currentDir,replace=false) {
    var rootDir = (currentDir=="index")? "./" : "../"
   
    var hue = 220;
    var mitProjectsDropdownButton = `<path class="nav-link" id="mitProjectsDropdownButton" d="M150,0 l150,0 l0,50 l-150,0 l0,-50" fill="url(#mitProjectsLinkGradient)" stroke="black" pointer-events="all"/>
        <text x="158" y="30" fill="white" stroke="white" pointer-events="none">MIT Projects</text> 
        <image id="gearIcon1" href="${rootDir}icons/arrow_drop_down_white_24dp.svg" x="270" y="10" height="30" width="30" pointer-events="none">
    </path>`
    var mitProjectsLinkGradientHTML =  `<radialGradient id="mitProjectsLinkGradient" cx=".5" cy="0.5" r="0.8" fx="0.5" fy="0.0" spreadMethod="reflect">
            <stop stop-color="hsl(${hue},70%,65%)" offset="40%"/>
            <stop stop-color="hsl(${hue},70%,50%)" offset="65%"/>
            <stop stop-color="hsl(${hue},70%,30%)" offset="85%"/>
        <animate id="mitProjectsDropdownButtonAnimation" attributeType="XML" attributeName="r" values=".8; .7; .6" dur=".75s"  begin="indefinite" repeatCount="1" />
        </radialGradient>`
    
    if(!replace) {
        navBar.insertAdjacentHTML('beforeend', mitProjectsDropdownButton);
        navBar.insertAdjacentHTML('beforeend', mitProjectsLinkGradientHTML);
        
    }
    else {
        navBar.removeChild(document.getElementById("mitProjectsDropdownButton"));
        navBar.removeChild(document.getElementById("mitProjectsLinkGradient"));

        navBar.insertAdjacentHTML('beforeend', mitProjectsDropdownButton);
        navBar.insertAdjacentHTML('beforeend', mitProjectsLinkGradientHTML);
    }

 
 

    mitProjectsDropdownBox = `
    <path class="nav-link" id="mitProjectsDropdownBox" d="M150,50 l150,0 l0,0 l-150,0 l0,0" fill="url(#pacmenNavLinkGradient)" stroke="black" pointer-events="all">
        <animate id="forwardDropdownAnimation" attributeType="XML" attributeName="d" dur="100ms"  begin="indefinite" fill="freeze"
            values="M150,50 l150,0 l0,0 l-150,0 l0,0;
                    M150,50 l150,0 l0,50 l-150,0 l0,0;
                    M150,50 l150,0 l0,100 l-150,0 l0,-100; 
                    M150,50 l150,0 l0,150 l-150,0 l0,-150" 
        >
        </animate>
        <animate id="reverseDropdownAnimation" attributeType="XML" attributeName="d" dur="100ms"  begin="indefinite" fill="freeze"
            values="M150,50 l150,0 l0,150 l-150,0 l0,-150;
                    M150,50 l150,0 l0,100 l-150,0 l0,-100;
                    M150,50 l150,0 l0,50 l-150,0 l0,0;
                    M150,50 l150,0 l0,0 l-150,0 l0,0" 
        >
        </animate>
    </path>`

    
    document.getElementById("navBar").insertAdjacentHTML('beforeend', mitProjectsDropdownBox);
}

function generateNewAnimation() {
    var dropDownObj = document.getElementById("mitProjectsDropdownBox");
    if(dropDownObj.hasChildNodes()) {
        dropDownObj.removeChild(document.getElementById('forwardDropdownAnimation'));
        dropDownObj.removeChild(document.getElementById('reverseDropdownAnimation'));
    } 


    // let animationChoice = getRandomInt(0, 1);
    let animationChoice = 2
    switch(animationChoice) {
        case 0: 
            dropDownObj.insertAdjacentHTML('beforeend', `<animate id="forwardDropdownAnimation" attributeType="XML" attributeName="d" dur="2s"  begin="indefinite" fill="freeze"
            values="M150,50 l150,0 l0,0 l-150,0 l0,0;
                    M150,50 l150,0 l0,50 l-150,0 l0,0;
                    M150,50 l150,0 l0,100 l-150,0 l0,-100; 
                    M150,50 l150,0 l0,150 l-150,0 l0,-150" 
            >
            </animate>
            <animate id="reverseDropdownAnimation" attributeType="XML" attributeName="d" dur="2s"  begin="indefinite" fill="freeze"
                values="M150,50 l150,0 l0,150 l-150,0 l0,-150;
                        M150,50 l150,0 l0,100 l-150,0 l0,-100;
                        M150,50 l150,0 l0,50 l-150,0 l0,0;
                        M150,50 l150,0 l0,0 l-150,0 l0,0" 
            >
            </animate>`);
            break;
        case 1: 
            dropDownObj.insertAdjacentHTML('beforeend', `<animate id="forwardDropdownAnimation" attributeType="XML" attributeName="d" dur="500ms"  begin="indefinite" fill="freeze"
                values="M150,50 l150,0 l0,0   c-75 150,-75 150,-150 0  l0,0;
                        M150,50 l150,0 l0,15  c-75 120,-60 120, -150 0   l0,-15;
                        M150,50 l150,0 l0,30  c-75 90,-45 90, -150 0   l0,-30;
                        M150,50 l150,0 l0,45  c-75 60,-30 60, -150 0   l0,-45;
                        M150,50 l150,0 l0,75  c-75 30,-15 30, -150 0   l0,-75;
                        M150,50 l150,0 l0,150 c-75 0,0 0, -150 0   l0,-150;" 
            >
            </animate>`);
            dropDownObj.insertAdjacentHTML('beforeend', `<animate id="reverseDropdownAnimation" attributeType="XML" attributeName="d" dur="2s"  begin="indefinite" fill="freeze"
                values="M150,50 l150,0 l0,150 l-150,0 l0,-150;
                        M150,50 l150,0 l0,100 l-150,0 l0,-100;
                        M150,50 l150,0 l0,50 l-150,0 l0,0;
                        M150,50 l150,0 l0,0 l-150,0 l0,0" 
            >
            </animate>`);
            break;
        case 2: 
            dropDownObj.insertAdjacentHTML('beforeend', `<animate id="forwardDropdownAnimation" attributeType="XML" attributeName="d" dur="500ms"  begin="indefinite" fill="freeze"
                values="M150,50 l150,0 l0,0   c-75 150,-75 150, -150 0  l0,0;
                        M150,50 l150,0 l0,15  c-75 150,-75 135, -150 0   l0,-15;
                        M150,50 l150,0 l0,30  c-75 150,-75 120, -150 0   l0,-30;
                        M150,50 l150,0 l0,45  c-75 150,-75 105, -150 0   l0,-45;
                        M150,50 l150,0 l0,60  c-75 150,-75 90, -150 0   l0,-60;
                        M150,50 l150,0 l0,75  c-75 150,-75 75,  -150 0   l0,-75;
                        M150,50 l150,0 l0,90  c-75 150,-75 60, -150 0   l0,-90;
                        M150,50 l150,0 l0,105  c-75 150,-75 45,  -150 0   l0,-105;
                        M150,50 l150,0 l0,120  c-75 150,-75 30, -150 0   l0,-120;
                        M150,50 l150,0 l0,135  c-75 150,-75 15,  -150 0   l0,-135;
                        M150,50 l150,0 l0,150 c0 0,0 0,         -150 0   l0,-150;" 
            >
            </animate>`);
            dropDownObj.insertAdjacentHTML('beforeend', `<animate id="reverseDropdownAnimation" attributeType="XML" attributeName="d" dur="2s"  begin="indefinite" fill="freeze"
                values="M150,50 l150,0 l0,150 l-150,0 l0,-150;
                        M150,50 l150,0 l0,100 l-150,0 l0,-100;
                        M150,50 l150,0 l0,50 l-150,0 l0,0;
                        M150,50 l150,0 l0,0 l-150,0 l0,0" 
            >
            </animate>`);
            break;
    }
    

}




function insertNavLinks(insertInto, currentDir, replace=false, hue=220) {
    var homeHref = "./index.html";
    var pacmenHref = "./pacmen/pacmen.html"
    var eyesHref = "./eyes/eyes.html"
    var busStopsHref = "./busStops/busStops.html"
    if(currentDir=="index") homeHref="#";
    else if(currentDir=="pacmen"){ 
        pacmenHref="#";
        homeHref = "."+homeHref;
        eyesHref = "."+eyesHref;
        busStopsHref = "."+busStopsHref;
    }
    else if(currentDir=="eyes") {
        eyesHref = "#";
        homeHref = "."+homeHref;
        pacmenHref = "."+pacmenHref;
        busStopsHref = "."+busStopsHref;
    }
    else if(currentDir=="busStops") {
        busStopsHref = "#";
        homeHref = "."+homeHref;
        pacmenHref = "."+pacmenHref;
        eyesHref = "."+eyesHref;
    }
    var linkPositions = [[150,50], [150,100], [150,150]];            //excludes Home link; ordered as => Pacmen, Eyes, BusStops

    pacmenLinkHTML_head = `<a id="pacmenNavLink" href="${pacmenHref}" x="200" y="30" pointer-events="all" display="none">`
    eyesLinkHTML_head = `<a id="eyesNavLink" href="${eyesHref}" x="200" y="80" pointer-events="all" display="none">`
    busStopsLink_head = `<a id="busStopsNavLink" href="${busStopsHref}" x="200" y="130" pointer-events="all" display="none">`

   
    var homeLinkHTML = `<a id="homeNavLink" href="${homeHref}" x="50" y="30" pointer-events="all">
        <path class="nav-link" id="homeNavButton" d="M0,0 c0 0,0 0,150 0 l0,50 c0 0,0 0,-150 0 l0,-50" fill="url(#homeNavLinkGradient)" stroke="black" />
        <text x="50" y="30" fill="white" stroke="white" pointer-events="none">Home</text> </a>`
    
    var homeLinkGradientHTML =  `<radialGradient id="homeNavLinkGradient" cx=".5" cy="0.5" r="0.8" fx="0.5" fy="0.0" spreadMethod="reflect">
            <stop stop-color="hsl(${hue},70%,65%)" offset="40%"/>
            <stop stop-color="hsl(${hue},70%,50%)" offset="65%"/>
            <stop stop-color="hsl(${hue},70%,30%)" offset="85%"/>
        <animate id="homeNavButtonAnimation" attributeType="XML" attributeName="r" values=".8; .7; .6" dur=".75s"  begin="indefinite" repeatCount="indefinite" />
        </radialGradient>`
    
    var pacmenLinkHTML = pacmenLinkHTML_head+ `
        <path class="nav-link" id="pacmenNavButton" d="M${linkPositions[0][0]},${linkPositions[0][1]} l150,0 l0,50 l-150,0 l0,-50" fill="url(#pacmenNavLinkGradient)" stroke="black" pointer-events="all"/>
        <text x="200" y="80" fill="white" stroke="white" pointer-events="none">Pacmen</text> </a>`

    var pacmenLinkGradientHTML = `<radialGradient id="pacmenNavLinkGradient" cx=".5" cy="0.5" r="0.8" fx="0.5" fy="0.0" spreadMethod="reflect">
        <stop stop-color="hsl(${hue},70%,45%)" offset="40%"/>
        <stop stop-color="hsl(${hue},70%,30%)" offset="65%"/>
        <stop stop-color="hsl(${hue},70%,25%)" offset="85%"/>
        <animate id="pacmenNavButtonAnimation" attributeType="XML" attributeName="r" values=".8; .7; .6" dur=".75s"  begin="indefinite" repeatCount="indefinite"/>
    </radialGradient>`

   
    var eyesLinkHTML = eyesLinkHTML_head+ `
    <path class="nav-link" id="eyesNavButton" d="M${linkPositions[1][0]},${linkPositions[1][1]} l150,0 l0,50 l-150,0 l0,-50" fill="url(#eyesNavLinkGradient)" stroke="black" pointer-events="all"/>
    <text x="200" y="130" fill="white" stroke="white" pointer-events="none">Eyes</text> </a>`

    var eyesLinkGradientHTML = `<radialGradient id="eyesNavLinkGradient" cx=".5" cy="0.5" r="0.8" fx="0.5" fy="0.0" spreadMethod="reflect">
        <stop stop-color="hsl(${hue},70%,45%)" offset="40%"/>
        <stop stop-color="hsl(${hue},70%,30%)" offset="65%"/>
        <stop stop-color="hsl(${hue},70%,25%)" offset="85%"/>
        <animate id="eyesNavButtonAnimation" attributeType="XML" attributeName="r" values=".8; .7; .6" dur=".75s"  begin="indefinite" repeatCount="indefinite" />
    </radialGradient>`

    
    var busStopsLinkHTML = busStopsLink_head+`
        <path class="nav-link" id="busStopsNavButton" d="M${linkPositions[2][0]},${linkPositions[2][1]} l150,0 l0,50 l-150,0 l0,-50" fill="url(#busStopsNavLinkGradient)" stroke="black" pointer-events="all"/>
        <text x="200" y="180" fill="white" dx="-25" stroke="white" pointer-events="none" class="mapNavLinkText">Map Animation</text> </a>`

    var busStopsGradientHTML = `<radialGradient id="busStopsNavLinkGradient" cx=".5" cy="0.5" r="0.8" fx="0.5" fy="0.0" spreadMethod="reflect">
            <stop stop-color="hsl(${hue},70%,45%)" offset="40%"/>
            <stop stop-color="hsl(${hue},70%,30%)" offset="65%"/>
            <stop stop-color="hsl(${hue},70%,25%)" offset="85%"/>
            <animate id="busStopsNavButtonAnimation" attributeType="XML" attributeName="r" values=".8; .7; .6" dur=".75s"  begin="indefinite" repeatCount="indefinite" />
        </radialGradient>`

    if(!replace) {
        insertInto.insertAdjacentHTML('beforeend', homeLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', homeLinkGradientHTML);

        insertInto.insertAdjacentHTML('beforeend', pacmenLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', pacmenLinkGradientHTML);

        insertInto.insertAdjacentHTML('beforeend', eyesLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', eyesLinkGradientHTML);

        insertInto.insertAdjacentHTML('beforeend', busStopsLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', busStopsGradientHTML);
    }
    else {
        insertInto.removeChild(document.getElementById("homeNavLink"));
        insertInto.removeChild(document.getElementById("homeNavLinkGradient"));
        insertInto.removeChild(document.getElementById("pacmenNavLink"));
        insertInto.removeChild(document.getElementById("pacmenNavLinkGradient"));
        insertInto.removeChild(document.getElementById("eyesNavLink"));
        insertInto.removeChild(document.getElementById("eyesNavLinkGradient"));
        insertInto.removeChild(document.getElementById("busStopsNavLink"));
        insertInto.removeChild(document.getElementById("busStopsNavLinkGradient"));




        insertInto.insertAdjacentHTML('beforeend', homeLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', homeLinkGradientHTML);

        insertInto.insertAdjacentHTML('beforeend', pacmenLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', pacmenLinkGradientHTML);

        insertInto.insertAdjacentHTML('beforeend', eyesLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', eyesLinkGradientHTML);

        insertInto.insertAdjacentHTML('beforeend', busStopsLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', busStopsGradientHTML);


    }
    
   

    document.getElementById("homeNavButton").onmouseover = (e) => {
        document.getElementById("homeNavButtonAnimation").beginElement();
    }
    document.getElementById("homeNavButton").onmouseout = (e) => {
        document.getElementById("homeNavButtonAnimation").endElement();
    }
    document.getElementById("homeNavButton").onmousedown = (e) => {
        document.getElementById("homeNavButtonAnimation").endElement();
        document.getElementById("homeNavSelected").beginElement();
        
    }

    document.getElementById("pacmenNavButton").onmouseover = (e) => {
        document.getElementById("pacmenNavButtonAnimation").beginElement();
    }
    document.getElementById("pacmenNavButton").onmouseout = (e) => {
        document.getElementById("pacmenNavButtonAnimation").endElement();
    }

    document.getElementById("eyesNavButton").onmouseover = (e) => {
        document.getElementById("eyesNavButtonAnimation").beginElement();
    }
    document.getElementById("eyesNavButton").onmouseout = (e) => {
        document.getElementById("eyesNavButtonAnimation").endElement();
    }

    document.getElementById("busStopsNavButton").onmouseover = (e) => {
        document.getElementById("busStopsNavButtonAnimation").beginElement();
    }
    document.getElementById("busStopsNavButton").onmouseout = (e) => {
        document.getElementById("busStopsNavButtonAnimation").endElement();
    }


}


var sineWaveMenuEffect = (startX, endX, amp, freq, phase,restState=false) => {
    let wave=``
    let rarity = 1;
    
    for(let x=startX; x <endX; ++x) {
        let x1 = (x-1+phase)*rarity + startX;
        let x2 = (x+phase)*rarity + startX;
        let y1 = 0;
        let y2 = 0;
        
        if(!restState) {
            //sawtooth
            // y1 = (2*amp/Math.PI)*Math.atan(1/Math.tan(Math.PI*(x-1+phase)*freq));
            // y2 = (2*amp/Math.PI)*Math.atan(1/Math.tan(Math.PI*(x+phase)*freq));
            y1 = amp*Math.sin(freq*(x-1))/(x-1);
            y2 = amp*Math.sin(freq*(x))/(x);
           
        }
        wave += `l${x2-x1} ${y2-y1}`
    }
    return wave;
}



var navLinkAnimationFrames = (elementID, i) => {
    let posX = i*150;
    let nextPosX = (i+1)*150

    var angFreq = .3;
    var waveAmp = -10;
    
    //var rarity = 1;

    var waveD0 = sineWaveMenuEffect(posX,nextPosX,waveAmp, angFreq, 0, true);       //at rest
    var waveD1 = sineWaveMenuEffect(posX,nextPosX,waveAmp, angFreq, 0, false);
    var waveD2 = sineWaveMenuEffect(posX,nextPosX,waveAmp, angFreq, 0, false);

    var valStr1 =   `M${posX},0 ${waveD0} L${nextPosX},50 L${posX},50 L${posX},0 `;
    var valStr2 =   `M${posX},0 ${waveD1} L${nextPosX},50 L${posX},50 L${posX},0 `;
    var valStr3 =   `M${posX},0 ${waveD2} L${nextPosX},50 L${posX},50 L${posX},0 `;
    

    var values = valStr1 + " ; "+ valStr2 + " ; " + valStr3;
    var keySplines = "0 .95 .95 .23; 0 .45 .95 .23; 0 .45 .95 .23";
    var keyTimes = "0 ; .50; 1";
    var htmlStr = `<animate xlink:href="#${elementID}"
        attributeName="d"
        attributeType="XML"
        values="${values}"
        keyTimes="${keyTimes}"
        repeatCount="indefinite"
        keySplines="${keySplines}"
        dur="4s"
        begin="indefinite"
        end="indefinite"
        fill="remove"
        id="${elementID+"Animation"}"
    />`
    console.log("elementID", elementID)
    document.getElementById(elementID).insertAdjacentHTML('beforeend',htmlStr);
    document.getElementById(elementID).onmouseover = (e) => {
        document.getElementById(elementID+"Animation").beginElement();
    }
    document.getElementById(elementID).onmouseout = (e) => {
        document.getElementById(elementID+"Animation").endElement();
    }

}
function addMenuAnimation() {
    navLinkAnimationFrames("homeNavButton",0);
    navLinkAnimationFrames("pacmenNavButton",1);
    navLinkAnimationFrames("eyesNavButton",2);
}



function addRemainingSegment(currentHue=220, replace=false) {
    

    var navBar = document.getElementById("navBar");

    if(replace) {
        navBar.removeChild(document.getElementById("voidSegment"))
        navBar.removeChild(document.getElementById("settingsButton"))
    }
    let totalExistingLength = 0;
    let sizes = Object.keys(navElementSizes);
    for(let s=0; s < sizes.length;++s) {
        totalExistingLength+=sizes[s]*navElementSizes[sizes[s]];
    }

    
    var remSegmentLength = window.innerWidth - totalExistingLength - 50;
    var settingsPos = window.innerWidth - 50;
   
    // var htmlStr = `<path d="M${totalExistingLength},0 l${remSegmentLength},0 l0,50 l-${Math.abs(remSegmentLength)},0 l0,-50" fill="hsl(${selectedHue},70%,30%)" stroke="black" pointer-events="all"></path>`
    var htmlStr = `<path id="voidSegment" d="M${totalExistingLength},0 l${remSegmentLength},0 l0,50 l-${Math.abs(remSegmentLength)},0 l0,-50" fill="hsl(${currentHue},70%,30%)" stroke="black" pointer-events="all"></path>`
    navBar.insertAdjacentHTML('beforeend',htmlStr)

    var pathName = window.location.pathname;
    var rootDir = pathName.substr(pathName.lastIndexOf("/")+1)
    rootDir = rootDir.replace("#","");
    rootDir = rootDir.replace(".html","");
    if(rootDir=="index") rootDir="";
    else rootDir="../"

    navBar.insertAdjacentHTML("beforeend", `<path class="nav-link" id="settingsButton" d="M${settingsPos},0 l50,0 l0,50 l-50,0 l0,-50" fill="hsl(${currentHue},70%,30%)" stroke="black" pointer-events="all"></path>`);

    let gear1Pos = settingsPos+20;
    let gear2Pos = settingsPos;
    // navBar.insertAdjacentHTML("beforeend", `<image id="gearIcon1" href="${rootDir}icons/settings_white_24dp.svg" x="${gear1Pos}" y="20" height="30" width="30" pointer-events="none">
    //     <animateTransform xlink:href="#gearIcon1" id="gearRotate1" attributeName="transform" attributeType="XML" type="rotate" dur="1s" begin="indefinite"  repeatCount="indefinite"
    //         from="0 ${gear1Pos+15} 35" to="360 ${gear1Pos+15} 35" >
    //     </animateTransform>
    // </image>`
    // );
    navBar.insertAdjacentHTML("beforeend", `<image id="gearIcon1" href="${rootDir}icons/settings_white_filled_24dp.svg" x="${gear1Pos}" y="20" height="30" width="30" pointer-events="none">
        <animateTransform xlink:href="#gearIcon1" id="gearRotate1" attributeName="transform" attributeType="XML" type="rotate" dur="3s" begin="indefinite"  repeatCount="indefinite"
            values="0 ${gear1Pos+15} 35 ;360 ${gear1Pos+15} 35; 0 ${gear1Pos+15} 35;  360 ${gear1Pos+15} 35" 
            keySplines=".09 .89 1 .46; .09 .89 1 .46; .09 .89 1 .46; .09 .89 1 .46" 
            keyTimes="0 ; .15; .75; 1">
        </animateTransform>
    </image>`
    );
 
    navBar.insertAdjacentHTML("beforeend", `
    <image id="gearIcon2" href="${rootDir}icons/settings_white_filled_24dp.svg" x="${gear2Pos}" y="0" height="30" width="30" pointer-events="none">
        <animateTransform xlink:href="#gearIcon2" id="gearRotate2" attributeName="transform" attributeType="XML" type="rotate" dur="3s" begin="indefinite" repeatCount="indefinite"
            values="360 ${gear2Pos+15} 15 ;0 ${gear2Pos+15} 15; 360 ${gear2Pos+15} 15;  0 ${gear2Pos+15} 15" 
            keySplines=".09 .89 1 .46; .09 .89 1 .46; .09 .89 1 .46; .09 .89 1 .46" 
            keyTimes="0 ; .15; .75; 1">
        </animateTransform>
    </image>`);

    // from="360 ${gear2Pos+15} 15" to="0 ${gear2Pos+15} 15" 

    document.getElementById("sw").setAttribute("right", window.innerWidth);

    var settingsButton = document.getElementById("settingsButton");
    settingsButton.onclick = () => {
        if(document.getElementById("sw").style.display=="block") {document.getElementById("sw").style.display="none";}
        else document.getElementById("sw").style.display="block";
        
    }

    settingsButton.onmouseover = (e) => {
        //document.getElementById("gradientAnimation").beginElement()
        document.getElementById("gearRotate1").beginElement();
        document.getElementById("gearRotate2").beginElement();
        settingsButton.setAttribute("cursor","pointer");
        
    }
    settingsButton.onmouseout = (e) => {
        document.getElementById("gearRotate1").endElement();
        document.getElementById("gearRotate2").endElement();
    }


   
}


function updateCover(currentHue=220) {
    
	var context = coverCanvas.getContext("2d");
    for(let phase=0; phase < xSortedCoverTriangles.length;++phase) {
        var triangles = xSortedCoverTriangles[phase]
        triangles.value = Math.max(waveform1(step*phase), 25);

        let saturationVal = Math.max(waveform1((step+3)*phase), 25);


        for(let a=0; a < triangles.indices.length; ++a) {
            var Tri = coverTriangles[triangles.indices[a]];
            context.beginPath();
            context.moveTo(Tri.pts[0].x,Tri.pts[0].y);
            context.lineTo(Tri.pts[1].x,Tri.pts[1].y);
            context.lineTo(Tri.pts[2].x,Tri.pts[2].y);
            context.lineTo(Tri.pts[0].x,Tri.pts[0].y);
            context.closePath();
            context.fillStyle = `hsla(${selectedHue}, ${saturationVal}%, ${triangles.value}%, .5)`;
            context.fill();
            context.stroke();
        }	
    }

    ++step;

    // window.requestAnimationFrame(this.updateCover);

}

function loadTriangle(canvas, t) {
   
    if(t.pts == undefined) return;
    canvas.getContext("2d").beginPath();
    canvas.getContext("2d").moveTo(t.pts[0].x, t.pts[0].y);
    canvas.getContext("2d").lineTo(t.pts[1].x, t.pts[1].y);
    canvas.getContext("2d").lineTo(t.pts[2].x, t.pts[2].y);
    canvas.getContext("2d").lineTo(t.pts[0].x, t.pts[0].y);
    canvas.getContext("2d").closePath();
    canvas.getContext("2d").fillStyle = `hsla(${selectedHue}, 50%, 50%, .5)`;
    canvas.getContext("2d").fill();
    canvas.getContext("2d").stroke();

}

function waveform1(t) {
    let x  = 120*t*(2*Math.PI)/(300000);
    return 80*Math.sin(x)
}

class Triangle {
	constructor(xPhase, yPhase, pts) {
		this.pts = pts;
		this.xPhase = xPhase	//denotes the phase of animation it participates in
		this.yPhase = yPhase;
		this.brightnessValue = 50;
	}
}
function startAnimation(canvas) {
    coverTriangles = []
    let numRows = 2;
    let length = 40;
    let hexPerRow = Math.ceil(window.innerWidth/length);
    var pt1 = {x:75,y:40};      //y previously 40
    let xOrigin = pt1.x;
    

    xSortedCoverTriangles = Array(hexPerRow*2).fill(0);
    ySortedCoverTriangles = Array(numRows*2).fill(0);
    for(let j=0; j < numRows; ++j) {
        for(let i =0; i < hexPerRow; ++i) {
            // 2*i+1		sub phase 1 
            // 2*i+2		sub phase 2

            var peripheralPt = {x:pt1.x-2*length, y:pt1.y}

            coverTriangles.push(new Triangle(2*i+2,2*j, [{x:pt1.x, y:pt1.y}, {x:pt1.x+length, y:pt1.y-length}, {x:pt1.x-length, y:pt1.y-length}] ))
            coverTriangles.push(new Triangle(2*i+1,2*j+1, [{x:pt1.x, y:pt1.y}, {x:pt1.x-length, y:pt1.y+length}, {x:pt1.x+length, y:pt1.y+length}] ))
            coverTriangles.push(new Triangle(2*i+2,2*j, [{x:pt1.x, y:pt1.y}, {x:pt1.x+2*length, y:pt1.y},      {x:pt1.x+length, y:pt1.y-length}] ))
            coverTriangles.push(new Triangle(2*i+1,2*j+1,[{x:pt1.x, y:pt1.y}, {x:pt1.x-2*length, y:pt1.y},      {x:pt1.x-length, y:pt1.y+length}] ))
            coverTriangles.push(new Triangle(2*i+2,2*j, [{x:pt1.x, y:pt1.y}, {x:pt1.x+length, y:pt1.y+length}, {x:pt1.x+2*length, y:pt1.y}] ));
            coverTriangles.push(new Triangle(2*i+1,2*j+1, [{x:pt1.x, y:pt1.y}, {x:pt1.x-length, y:pt1.y-length}, {x:pt1.x-2*length, y:pt1.y}] ));
            coverTriangles.push(new Triangle(2*i+2,2*j, [{x:peripheralPt.x, y:peripheralPt.y}, {x:peripheralPt.x+length, y:peripheralPt.y-length}, {x:peripheralPt.x-length, y:peripheralPt.y-length}] ));
            coverTriangles.push(new Triangle(2*i, 2*j+1,[{x:peripheralPt.x, y:peripheralPt.y}, {x:peripheralPt.x-length, y:peripheralPt.y+length}, {x:peripheralPt.x+length, y:peripheralPt.y+length}] ));
           
            pt1.x+=4*length;
        }
        pt1.x = xOrigin;
        pt1.y+=2*length;
    }
    
    
    for(let i =0; i < coverTriangles.length;++i) {
        var triangle = coverTriangles[i];
        if(typeof xSortedCoverTriangles[triangle.xPhase]=='number') {
            xSortedCoverTriangles[triangle.xPhase] = {indices:[i], value:50}
        }
        else if(typeof xSortedCoverTriangles[triangle.xPhase]=='object') xSortedCoverTriangles[triangle.xPhase].indices.push(i);
        
        if(typeof ySortedCoverTriangles[triangle.yPhase]=='number') {
            ySortedCoverTriangles[triangle.yPhase] = {indices:[i], value:50}
        }
        else if(typeof ySortedCoverTriangles[triangle.yPhase]=='object') ySortedCoverTriangles[triangle.yPhase].indices.push(i);
        loadTriangle(canvas,triangle);
    }

}