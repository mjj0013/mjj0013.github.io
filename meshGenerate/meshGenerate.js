// const { Mesh } = require("./Mesh");
var myHeaders = new Headers();
myHeaders.set("Access-Control-Allow-Origin", "*");
myHeaders.set("Access-Control-Request-Headers", "*");

var maxNumOfNodes = 16;
var nodeCount = -1;
var M;
var meshSVG;
var meshAnimateInterval;
var meshCreated=false; 
function initSession() {
    meshCreated=false;
    meshSVG = document.getElementById("meshSVG");
    nodeCount =-1;
    maxNumOfNodes = 16;
    document.getElementById("numPointsLabel").innerHTML = `Number of nodes left: ${maxNumOfNodes}`;
    M = new Mesh();
    meshSVG.addEventListener("click", mouseClickHandler, false);
}


function resetMesh() {
    if(M==undefined || M==null) {
        return;
    }

    
    if(meshAnimateInterval !=undefined) clearInterval(meshAnimateInterval);
    var meshRegions = document.querySelectorAll('.meshRegion');
    var meshNodes = document.querySelectorAll('.meshNode');
   
    for(let i =0; i < meshRegions.length; ++i) {
        meshRegions[i].remove();
        
    }
    for(let i =0; i < meshNodes.length; ++i) {
        meshNodes[i].remove();
    }
    
   
    meshSVG.removeEventListener("click", (e)=> mouseClickHandler(e), true);
    document.getElementById("startMeshButton").style.opacity=1.0;
    document.getElementById("startMeshButton").style.display='block';



}

function toggleAnimateVertices(){
    if(M==undefined || M==null) return;
    
    if(!M.animateMesh) {

        //REMEMBER, THEY ARE REVERSED (PAUSE IS SHOWING WHEN IT IS PLAYING)
        document.getElementById("toPause").beginElement();
        meshAnimateInterval = setInterval(()=>M.update(), 1000/60); 
    }
    else {
        document.getElementById("toPlay").beginElement();
        if(meshAnimateInterval) clearInterval(meshAnimateInterval);
    }

    M.animateMesh = !M.animateMesh;
}

function mouseClickHandler(e) {
    const rect = meshSVG.getBoundingClientRect();
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    

    if(meshCreated) return;
    if(nodeCount==-1) {
        document.getElementById("startMeshButton").style.opacity=0.0;
        document.getElementById("startMeshButton").style.display='none';
        ++nodeCount
        document.getElementById("resetButton").classList.remove("disabled");
        document.getElementById("resetButton").onclick = resetMesh;
        return;
    }


   
    console.log("x: " + x + " y: " + y)
   
    if(nodeCount <= maxNumOfNodes-1) {
        let newPt = document.createElementNS("http://www.w3.org/2000/svg",'circle');
        //let newPt = this.regionGroupRef.current.createElementNS("http://www.w3.org/2000/svg",'circle');
        newPt.setAttribute('id','pt'+nodeCount);
        newPt.setAttribute("class","meshNode")
        newPt.setAttribute('cx', x);
        newPt.setAttribute('cy', y);
        newPt.setAttribute('r', 6);
        document.getElementById("circleGroup").appendChild(newPt);
        M.pts.push({x:x, y:y});
        ++nodeCount
        document.getElementById("numPointsLabel").innerHTML = `Number of nodes left: ${maxNumOfNodes - nodeCount}`;
    }

    if(nodeCount == maxNumOfNodes) {
        //document.getElementById("numPointsLabel").innerHTML = `Number of nodes left: 0`;
        M.build(maxNumOfNodes, false);
        M.generateEdges();
        M.depthFirstSearch();
        // var edgeCounter = [];
        // for(let e=0; e < M.edges.length;++e) {
        //     if(!edgeCounter.includes(M.edges[e].id)) edgeCounter.push(M.edges[e].id);
        //     else continue;
        //     let a = M.pts[M.edges[e].data[0]]
        //     let b = M.pts[M.edges[e].data[1]]
        //     let d  = ``;
        //     d += `M ${a.x}, ${a.y}`;
        //     d += `L ${b.x}, ${b.y}`;
        
        //     let newPolygon = document.createElementNS("http://www.w3.org/2000/svg",'path');
        //     newPolygon.setAttribute('id',M.edges[e].id);
        //     newPolygon.setAttribute('d',d);
        //     newPolygon.setAttribute('class','meshRegionBorder')
        //     if(M.renderAllEdges) document.getElementById("polyGroup").appendChild(newPolygon);
            
        // }
    
        for(let m =0; m < M.cyclesDFS.length; ++m) {
            var newPolygon = new Polygon(`polygon${m}`,M.cyclesDFS[m], M);
            var polygonElement = document.createElementNS("http://www.w3.org/2000/svg",'path');
            polygonElement.setAttributeNS(null,'id',`polygon${m}`);
            
            let d = ``;
            for(let c=0; c < M.cyclesDFS[m].length; ++c) {
                if(c==0) {
                    d += `M ${M.pts[M.cyclesDFS[m][c]].x},${M.pts[M.cyclesDFS[m][c]].y}`
                }
                else if(c==M.cyclesDFS[m].length-1) {
                    M.getEdge(M.cyclesDFS[m][c],M.cyclesDFS[m][0]).associatedPolygons.push(`polygon${m}`);
                
                }
                else {
                    console.log("M.getEdge(M.cyclesDFS[m][c],M.cyclesDFS[m][c+1])",M.getEdge(M.cyclesDFS[m][c],M.cyclesDFS[m][c+1]))
                    M.getEdge(M.cyclesDFS[m][c],M.cyclesDFS[m][c+1]).associatedPolygons.push(`polygon${m}`);
                }
                if(c==0) d += `M ${M.pts[M.cyclesDFS[m][c]].x},${M.pts[M.cyclesDFS[m][c]].y}`
                else d += `L ${M.pts[M.cyclesDFS[m][c]].x},${M.pts[M.cyclesDFS[m][c]].y}`
                
            }
            d += `L ${M.pts[M.cyclesDFS[m][0]].x},${M.pts[M.cyclesDFS[m][0]].y}`
            
            polygonElement.setAttribute('d',d);
            M.polygons[`polygon${m}`] = newPolygon;
            polygonElement.onmousedown = (e) => {console.log('vertices: ', M.polygons[`polygon${m}`].vertices)}
            polygonElement.setAttribute("stroke", "black");
            polygonElement.setAttribute("stroke-width","1");
            polygonElement.setAttribute("stroke-linecap","round");
            polygonElement.setAttribute("class","meshRegion")
            //stroke="black" stroke-width="20" stroke-linecap="round"
            
            let sat = getRandomInt(0,100);
            let light = getRandomInt(0,100);
            polygonElement.setAttributeNS(null,'fill',`hsl(${220},${sat}%,${light}%)`);
            
            document.getElementById("polyGroup").appendChild(polygonElement);
            meshCreated=true;
      
        }
        document.getElementById("playButton").classList.remove("disabled");

    }
    
    
    
}