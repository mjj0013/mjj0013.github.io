var myHeaders = new Headers();
myHeaders.set("Access-Control-Allow-Origin", "*");

var coverCanvas = document.getElementById("coverCanvas");
var coverTriangles = [];
var xSortedCoverTriangles = []
var ySortedCoverTriangles = []
var step = 0;


var numOfNavElements = 3;
var navElementSizes = {150:3, 50:1}     //keys are size, values are the quantities of each size


window.onload = () =>{
    

    var canvas = document.getElementById("coverCanvas");
    canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
    startAnimation(coverCanvas);


    
    
    window.onresize = () => {
        canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
        startAnimation(coverCanvas);
    }
    addMenuAnimation();

    setInterval(updateCover,1000/60);
    // addRemainingSegment();

    var sw = document.getElementById("sw");
    

    var settingsButton = document.getElementById("settingsButton");
  
    sw.setAttribute("right", settingsButton.getBoundingClientRect().left)


    settingsButton.onclick = () => {
        if(document.getElementById("sw").style.display=="block") {
            document.getElementById("sw").style.display="none";
        }
        else {
            document.getElementById("sw").style.display="block";
        }
    }

    settingsButton.onmouseover = (e) => {

        document.getElementById("gearRotate1").beginElement();
        document.getElementById("gearRotate2").beginElement();
        settingsButton.setAttribute("cursor","pointer");
       
    }
    settingsButton.onmouseout = (e) => {
        document.getElementById("gearRotate1").endElement();
        document.getElementById("gearRotate2").endElement();
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


function addRemainingSegment() {
    let totalExistingLength = 0;
    let sizes = Object.keys(navElementSizes);
    for(let s=0; s < sizes.length;++s) {
        totalExistingLength+=sizes[s]*navElementSizes[sizes[s]];
    }

    //var navLength = document.getElementById("navBar").width.baseVal.value;
    var remSegmentLength = window.innerWidth - totalExistingLength;
   
    var htmlStr = `<path id="eyesNavButton" d="M${totalExistingLength},0 l${remSegmentLength},0 l0,50 l-${remSegmentLength},0 l0,-50" fill="hsl(220,70%,30%)" stroke="black" pointer-events="all">
	</path>`
    document.getElementById("navBar").insertAdjacentHTML('beforeend',htmlStr)
}


function updateCover() {
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
            context.fillStyle = `hsl(220, ${saturationVal}%, ${triangles.value}%)`;
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
    canvas.getContext("2d").fillStyle = `hsl(220, 50%, 50%)`;
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
    let hexPerRow = 13;
    let numRows = 2;
    let length = 40;
    
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
    console.log("ySortedCoverTriangles",ySortedCoverTriangles);

}

//export {startAnimation, loadTriangle, updateCover, Triangle};

