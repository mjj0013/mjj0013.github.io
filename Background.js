var myHeaders = new Headers();
myHeaders.set("Access-Control-Allow-Origin", "*");
myHeaders.set("Access-Control-Request-Headers", "*");

var mouseSlope = 0;
var mouseLocQue = [];

var layerAttributes =[  {"type":"background", "fill":"hsl(220, 50%, 50%)", "c_coeffs":[], "id":null, "touchX":0, "touchY":0}, 
                        {"type":"2D", "fill":"hsl(40, 50%, 50%)", "c_coeffs":[], "id":null, "touchX":0, "touchY":0, "touchPt":{x:0,y:0}, "pt1":null, "pt2":null}
                    ];
var backgroundSVG = document.getElementById("backgroundSVG");

function initBackground() {


    var layer0 = document.createElementNS("http://www.w3.org/2000/svg","rect");
    layer0.setAttribute("width", window.innerWidth);
    layer0.setAttribute("height",window.innerHeight);
    layer0.setAttribute('fill',layerAttributes[0]["fill"]);
    backgroundSVG.appendChild(layer0);

 

    var layer1 = document.createElementNS("http://www.w3.org/2000/svg","path");
    layer1.setAttribute("id","layer1");

    let pt1_1 = {x:0, y:500};
    let pt1_2 = {x:800, y:800};
    layerAttributes[1]["pt1"] = pt1_1;
    layerAttributes[1]["pt2"] = pt1_2;
    layerAttributes[1]["id"] = "layer1";
    layerAttributes[1]["dx"] = 0;
    layerAttributes[1]["dy"] = 0;
    layerAttributes[1]["c_coeffs"] = [.17,.67,.91,.2]
    var d1 = `M${pt1_1.x},${pt1_1.y} c${.17*pt1_1.x} ${.67*pt1_1.y},${.91*pt1_2.x} ${.2*pt1_2.y}, ${pt1_2.x} ${pt1_2.y} L0 800 L-800 0 z`;
    layer1.setAttribute("d", d1)
    layer1.setAttribute('fill',layerAttributes[1]["fill"]);
    backgroundSVG.appendChild(layer1);

    //setInterval(updateBackground, 1000/30);
    
    for(let i=1; i < layerAttributes.length;++i) {
        updateLayer(layerAttributes[i])
    }
    allowInteractivity();

   
}

window.onmousemove = (e) => {
    if(mouseLocQue.length < 8) mouseLocQue.push({x:e.pageX, y:e.pageY})
    else {
        mouseLocQue.shift();
        mouseLocQue.push({x:e.pageX, y:e.pageY});
    }
    if(mouseLocQue.length > 1) {
        mouseSlope = (mouseLocQue[mouseLocQue.length-1].y-mouseLocQue[0].y)/(mouseLocQue[mouseLocQue.length-1].x-mouseLocQue[0].x);
    }
    

}

function allowInteractivity() {
    for(let i=1; i < layerAttributes.length; ++i) {
        let layerObj = document.getElementById(layerAttributes[i].id);
        layerObj.addEventListener("mouseenter",(e)=>{
            layerAttributes[i].touchPt = {x:e.pageX, y:e.pageY};
            // layerAttributes[i].touchX = mouseSlope;
            // layerAttributes[i].touchY = mouseSlope;
            layerAttributes[i].touchX = .20;
            layerAttributes[i].touchY = .20;
            document.getElementById(layerAttributes[i].id+"Animation").beginElement();
            
        })
        layerObj.addEventListener("mouseleave",(e)=>{
            layerAttributes[i].touchPt = {x:e.pageX, y:e.pageY};
            // layerAttributes[i].touchX = mouseSlope;
            // layerAttributes[i].touchY = mouseSlope;
            layerAttributes[i].touchX = .20;
            layerAttributes[i].touchY = .20;
            document.getElementById(layerAttributes[i].id+"Animation").beginElement();
     
        })
    }
}


function updateLayer(layer) {
    
      
    var layerObj = document.getElementById(layer.id);
    // if(layer.touchX!=0) layer.touchX = layer.touchX>0? layer.touchX-1 : layer.touchX+1
    // if(layer.touchY!=0) layer.touchY = layer.touchY>0? layer.touchY-1 : layer.touchY+1
    let touchX = layer.touchX*50;
    let touchY = layer.touchY*50;
    let dx1=layer.c_coeffs[0];
    let dy1=layer.c_coeffs[1];
    let dx2=layer.c_coeffs[2];
    let dy2=layer.c_coeffs[3];
    
    console.log(document.getElementById(`${layer.id+"Animation"}`))
    //var d1 = `M${pt1_1.x},${pt1_1.y} c${.17*pt1_1.x} ${.67*pt1_1.y},${.91*pt1_2.x} ${.2*pt1_2.y}, ${pt1_2.x} ${pt1_2.y} L0 800 L-800 0 z`;
    var dEnd = `M${layer.pt1.x},${layer.pt1.y} c${(dx1+.25)*layer.pt1.x} ${(dy1+.25)*layer.pt1.y},${(dx2+.25)*layer.pt2.x} ${(dy2+.25)*layer.pt2.y}, ${layer.pt2.x} ${layer.pt2.y} L0 800 L-800 0`;
    
         
    layerObj.insertAdjacentHTML("beforeend",` <animate id="${layer.id+"Animation"}" attributeType="XML" attributeName="d" begin="indefinite" dur="2s" repeatCount="1" values="${layerObj.d};${dEnd};${layerObj.d};"></animate>`);


   

    // var angFreq = .3;
    // var waveAmp = -10;
    
    // //var rarity = 1;

    // var waveD0 = sineWaveMenuEffect(layer.pt1,layer.pt2,waveAmp, angFreq, 0, true);       //at rest
    // var waveD1 = sineWaveMenuEffect(layer.pt1,layer.pt2,waveAmp, angFreq, 0, false);
    // var waveD2 = sineWaveMenuEffect(layer.pt1,layer.pt2,waveAmp, angFreq, 0, false);

    // var valStr1 =   `M${layer.pt1.x},0 ${waveD0}`;
    // var valStr2 =   `M${layer.pt1.x},0 ${waveD1}`;
    // var valStr3 =   `M${layer.pt1.x},0 ${waveD2}`;
    

    // var values = valStr1 + " ; "+ valStr2 + " ; " + valStr3;
    // var keySplines = "0 .95 .95 .23; 0 .45 .95 .23; 0 .45 .95 .23";
    // var keyTimes = "0 ; .50; 1";
    // var htmlStr = `<animate xlink:href="#${layer.id}"
    //     attributeName="d"
    //     attributeType="XML"
    //     values="${values}"
    //     keyTimes="${keyTimes}"
    //     repeatCount="indefinite"
    //     keySplines="${keySplines}"
    //     dur="4s"
    //     begin="indefinite"
    //     end="indefinite"
    //     fill="freeze"
    //     id="${layer.id+"Animation"}"
    // />`
    // layerObj.insertAdjacentHTML("beforeend",htmlStr);


}

var sineWaveMenuEffect = (start, end, amp, freq, phase,restState=false) => {
    let wave=``
    let rarity = 1;
    
    for(let x=start.x; x <end.x; ++x) {
        let x1 = (x-1+phase)*rarity + start.x;
        let x2 = (x+phase)*rarity + end.x;
        let y1 = start.y;
        let y2 = end.y;
        
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
