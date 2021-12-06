var myHeaders = new Headers();
myHeaders.set("Access-Control-Allow-Origin", "*");
myHeaders.set("Access-Control-Request-Headers", "*");

var mouseSlope = 0;
var mouseLocQue = [];

var layerAttributes =[  {"type":"background", "fill":"hsl(220, 50%, 50%)",  "id":null }, 
                        {"type":"2D", "fill":"hsl(40, 50%, 50%)",  "id":null, "pt1":null, "pt2":null},
                        {"type":"2D", "fill":"hsl(220, 80%, 50%)",  "id":null, "pt1":null, "pt2":null}
                    ];
//var backgroundSVG = document.getElementById("backgroundSVG");
var wavesSVG = document.getElementById("wavesBG");
var currentWidth = window.innerWidth;
var currentHeight = window.innerHeight;
function adjustBackground() {

    if(currentHeight != window.innerHeight) {
        console.log("adjusting Y")
        var dh = currentHeight - window.innerHeight;
        for(let i =1; i < layerAttributes.length;++i) {
            layerAttributes[i].My += dh;
            layerAttributes[i].y1 += dh;
            layerAttributes[i].y2 += dh;
            layerAttributes[i].y += window.innerHeight -wavesSVG.style.height;
            layerAttributes[i].returnY += dh;
        }


    }
    for(let i=1; i < layerAttributes.length;++i) {
        updateLayer(layerAttributes[i],true)
    }

    currentWidth = window.innerWidth;
    currentHeight = window.innerHeight;
}


function initBackground() {
    var backgroundFill = document.getElementById("backgroundFiller");

    var layer0 = document.createElementNS("http://www.w3.org/2000/svg","rect");
    //layer0.setAttribute("filter","url(#backgroundLight)")
    layer0.setAttribute("id", "fillerLayer")
    layer0.setAttribute("width", window.innerWidth);
    layer0.setAttribute("pointer-events","none");
    layer0.setAttribute("height","100%");
    layer0.setAttribute('fill',layerAttributes[0]["fill"]);
    backgroundFill.appendChild(layer0)

    //backgroundSVG.appendChild(layer0);
    wavesSVG.insertAdjacentHTML('beforeend',`<rect id="layer0" width="${window.innerWidth}" height="${window.innerHeight/2}" fill="${layerAttributes[0]["fill"]}"" />`)
    //wavesSVG.appendChild(layer0);
 
    console.log("window.innerHeight",window.innerHeight)
    var layer1 = document.createElementNS("http://www.w3.org/2000/svg","path");
    layer1.setAttribute("id","layer1");
    layer1.setAttribute("pointer-events","none");
    layerAttributes[1]["id"] = "layer1";
    layerAttributes[1]["Mx"] = 0;
    layerAttributes[1]["My"] = 595-500;
    layerAttributes[1]["x1"] = 20;
    layerAttributes[1]["y1"] = 828-500;
    layerAttributes[1]["x2"] = 425;
    layerAttributes[1]["y2"] = 771-500;
    layerAttributes[1]["x"] = 390;
    //layerAttributes[1]["y"] = 1044-500;
    layerAttributes[1]["y"] = (window.innerHeight<=1000? 1044:window.innerHeight) - 500;
    layerAttributes[1]["returnX"] = -390;
    layerAttributes[1]["returnY"] = -(594-500);
    
    var d1 = `M${layerAttributes[1]["Mx"]},${layerAttributes[1]["My"]} C${layerAttributes[1]["x1"]},${layerAttributes[1]["y1"]} ${layerAttributes[1]["x2"]},${layerAttributes[1]["y2"]} ${layerAttributes[1]["x"]},${layerAttributes[1]["y"]} l${layerAttributes[1]["returnX"]} 0, l0 ${layerAttributes[1]["returnY"]}`
    layer1.setAttribute("d", d1)
    layer1.setAttribute('fill',layerAttributes[1]["fill"]);
    



    var layer2 = document.createElementNS("http://www.w3.org/2000/svg","path");
    layer2.setAttribute("id","layer2");
    layer2.setAttribute("pointer-events","none");
    layerAttributes[1]["id"] = "layer1";
    layerAttributes[2]["id"] = "layer2";
    layerAttributes[2]["Mx"] = 0;
    layerAttributes[2]["My"] = 600-500;
    layerAttributes[2]["x1"] = 20;
    layerAttributes[2]["y1"] = 478-500;
    layerAttributes[2]["x2"] = 267;
    layerAttributes[2]["y2"] = 384-500;
    layerAttributes[2]["x"] = 904;
    //layerAttributes[2]["y"] = 1097-500;
    layerAttributes[2]["y"] = window.innerHeight-wavesSVG.style.height;
    //layerAttributes[2]["y"] = 1097-300;
    layerAttributes[2]["returnX"] = -904;
    layerAttributes[2]["returnY"] = -(997-500);
    
    var d2 = `M${layerAttributes[2]["Mx"]},${layerAttributes[2]["My"]} C${layerAttributes[2]["x1"]},${layerAttributes[2]["y1"]} ${layerAttributes[2]["x2"]},${layerAttributes[2]["y2"]} ${layerAttributes[2]["x"]},${layerAttributes[2]["y"]} l${layerAttributes[2]["returnX"]} 0, l0 ${layerAttributes[2]["returnY"]}`
    layer2.setAttribute("d", d2)
    layer2.setAttribute('fill',layerAttributes[2]["fill"]);
   


    //added right here so that overlapping is correct
   
    wavesSVG.appendChild(layer2)
    wavesSVG.appendChild(layer1);


    //setInterval(updateBackground, 1000/30);
    
    for(let i=1; i < layerAttributes.length;++i) {
        updateLayer(layerAttributes[i])
    }
    //allowInteractivity();   
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
            
            document.getElementById(layerAttributes[i].id+"Animation").setAttribute("d")
            
        })
        layerObj.addEventListener("mouseleave",(e)=>{
            document.getElementById(layerAttributes[i].id+"Animation").beginElement();
     
        })
    }
}



function updateLayer(layer,replace=false) {
    var dArray = [];
    var dStr = ``
    let steps = 400;
    // if(replace) {
    //     let layerObj = document.getElementById(layer.id);
    //     if(document.getElementById(layer.id+"Animation")) {
    //         layerObj.removeChild(document.getElementById(layer.id+"Animation"));
    //     }
        
       
    // }
    if(layer.id=="layer1") {
        for(let i=-steps; i < steps; ++i) {
            if(i > 0) {
                dStr+=`M${layer.Mx},${layer.My} C${layer.x1+i},${layer.y1+i} ${layer.x2},${layer.y2+i/50} ${layer.x+i},${layer.y+i} l${layer.returnX-i} 0 l0 ${layer.returnY+i};`
                dArray.push(`M${layer.Mx},${layer.My} C${layer.x1+i},${layer.y1+i} ${layer.x2},${layer.y2+i/50} ${layer.x+i},${layer.y+i} l${layer.returnX-i} 0 l0 ${layer.returnY+i};`);
            }
            else {
                dStr+=`M${layer.Mx},${layer.My} C${layer.x1+i},${layer.y1+i} ${layer.x2},${layer.y2+i/50} ${layer.x+i/50},${layer.y+i/50} l${layer.returnX-i/50} 0 l0 ${layer.returnY+i/50};`
                dArray.push(`M${layer.Mx},${layer.My} C${layer.x1+i},${layer.y1+i} ${layer.x2},${layer.y2+i/50} ${layer.x+i/50},${layer.y+i/50} l${layer.returnX-i/50} 0 l0 ${layer.returnY+i/50};`);
            }
        }
        for(let i=dArray.length-1; i>= 0; --i) {dStr+=dArray[i];}
        var layerObj = document.getElementById(layer.id);
        layerObj.insertAdjacentHTML("beforeend",`<animate id="layer1Animation" attributeType="XML" attributeName="d" dur="6s" begin="0s" repeatCount="indefinite" values="${dStr}"></animate>`)
    }
    if(layer.id=="layer2") {
        for(let i=0; i < steps; ++i) {
            dStr+=`M${layer.Mx},${layer.My} C${layer.x1+i},${layer.y1+i} ${layer.x2},${layer.y2} ${layer.x+i/50},${layer.y+i/50} l${layer.returnX-i/50} 0 l0 ${layer.returnY+i/50};`
            dArray.push(`M${layer.Mx},${layer.My} C${layer.x1+i},${layer.y1+i} ${layer.x2},${layer.y2} ${layer.x+i/50},${layer.y+i/50} l${layer.returnX-i/50} 0 l0 ${layer.returnY+i/50};`);
        }
        for(let i=dArray.length-1; i>= 0; --i) { dStr+=dArray[i];}
        var layerObj = document.getElementById(layer.id);
        layerObj.insertAdjacentHTML("beforeend",`<animate id="layer2Animation" attributeType="XML" attributeName="d" dur="6s" begin="0s" repeatCount="indefinite" values="${dStr}"></animate>`)
    }
    

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
