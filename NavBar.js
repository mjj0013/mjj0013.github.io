// const { generateRandomMesh } = require("./Mesh");

var myHeaders = new Headers();
myHeaders.set("Access-Control-Allow-Origin", "*");
myHeaders.set("Access-Control-Request-Headers", "*");
var coverCanvas = document.getElementById("coverCanvas");

var searchBarShowing = 0;
var searchBarResults = [
    {path:"/pacmen/pacmen.html", subject:"Pacmen" ,keywords:["pacmen","yellow"]},
    {path:"/imageGallery/imageGallery.html", subject:"Crimson Tide" , keywords:["alabama", "crimson", "tide"]},
    {path:"/imageGallery/imageGallery.html", subject:"Mona Lisa" , keywords:["image","mona", "lisa"]},
    {path:"/imageGallery/imageGallery.html", subject:"Saturn V" , keywords:["saturn","saturn v" ,"saturn 5" ,"rocket"]},
    {path:"/imageGallery/imageGallery.html", subject:"Monte Sano" , keywords:["monte", "sano","nature"]},
    {path:"/imageGallery/imageGallery.html", subject:"Church" , keywords:["church", "jesus"]},
    {path:"/imageGallery/imageGallery.html", subject:"Ham" , keywords:["chimpanzee","astronaut", "ham"]},
    {path:"/eyes/eyes.html", subject:"Eyes" , keywords:["eyes"]},
    {path:"/busStops/busStops.html", subject:"Map Animation" , keywords:["bus","stops", "map", "demo"]},
    {path:"#", subject:"Gallery" , keywords:["gallery"]},
    {path:"#", subject:"Settings" , keywords:["settings"]},
    {path:"#", subject:"Primary Color" , keywords:["settings", "base", "primary","color"]}

]

var coverTriangles = [];
var xSortedCoverTriangles = []
var ySortedCoverTriangles = []
var step = 0;
var selectedBaseHue = 220;
var selectedSecondaryHue = 220;
var selectedNavHue = 0;
var selectedNavSat = 0;
var selectedNavBrightness = 5;
var numOfNavElements = 3;
var navElementSizes = {150:2, 50:2}     //keys are size, values are the quantities of each size

var mitDropDownOpen = false;
var numberBallPresses = 0;
var navBar = document.getElementById("navBar");

function initNavBar(replace=false) {
    coverCanvas.width = coverCanvas.height * (coverCanvas.clientWidth / coverCanvas.clientHeight);
    startAnimation(coverCanvas);

    setInterval(updateCover,1000/60);
    var currentPathName = getCurrentLocation();
    createDropdown(currentPathName,replace);
    insertNavLinks(navBar, currentPathName,replace);
    addRemainingSegment(replace);
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

    
    // document.getElementById("mitProjectsDropdownButton")
    document.getElementById("mitProjectsDropdownButton").onclick = (e) => {
        if(mitDropDownOpen) {
            var dropDownAnimation = document.getElementById("reverseDropdownAnimation");
            dropDownAnimation.beginElement();
            document.getElementById("pacmenNavLink").style.display = 'none';
            document.getElementById("eyesNavLink").style.display = 'none';
            document.getElementById("busStopsNavLink").style.display = 'none';
            mitDropDownOpen = false;
        }
        else {
            var dropDownAnimation = document.getElementById("forwardDropdownAnimation");
            dropDownAnimation.beginElement();
            dropDownAnimation.addEventListener("endEvent", ()=>{
                document.getElementById("pacmenNavLink").style.display = 'block';
                document.getElementById("eyesNavLink").style.display = 'block';
                document.getElementById("busStopsNavLink").style.display = 'block'; 
            },false);
            mitDropDownOpen = true;
        }

    }
    createSearchDropdown();
}

var searchBarInit=0;
function createSearchDropdown() {
    

    var searchBar = document.getElementById("searchBar")
    console.log("searchBar", searchBar.x.baseVal.value)
    let searchBoxX = searchBar.x.baseVal.value;
    let searchBoxW = searchBar.width.baseVal.value;
    var searchDropdownBox = `<path class="nav-link" id="searchDropdownBox" d="M${searchBoxX},50 l${searchBoxW},0 l0,0 l${-searchBoxW},0 l0,-50" fill="white"  pointer-events="all" />`
    var searchFwd = `<animate id="searchFwd" attributeType="XML" attributeName="d" dur="100ms"  begin="indefinite" fill="freeze"
    values="M${searchBoxX},50 l${searchBoxW},0 l0,0 l${-searchBoxW},0   l0,0;
            M${searchBoxX},50 l${searchBoxW},0 l0,50 l${-searchBoxW},0  l0,-50;
            M${searchBoxX},50 l${searchBoxW},0 l0,100 l${-searchBoxW},0 l0,-100;
            M${searchBoxX},50 l${searchBoxW},0 l0,150 l${-searchBoxW},0 l0,-150;" ></animate>`
    var searchBkwdClose = `<animate id="searchBkwdClose" attributeType="XML" attributeName="d" dur="100ms"  begin="indefinite" fill="freeze"

    values="M${searchBoxX},50 l${searchBoxW},0 l0,150 l${-searchBoxW},0 l0,-150;
            M${searchBoxX},50 l${searchBoxW},0 l0,100 l${-searchBoxW},0 l0,-100;
            M${searchBoxX},50 l${searchBoxW},0 l0,50 l${-searchBoxW},0  l0,-50;
            M${searchBoxX},50 l${searchBoxW},0 l0,0 l${-searchBoxW},0   l0,0;" ></animate>`

    document.getElementById("navBar").insertAdjacentHTML("beforeend", searchDropdownBox);
   
    
    var searchDropdownBox = document.getElementById("searchDropdownBox");
    searchDropdownBox.insertAdjacentHTML("beforeend", searchFwd);
     searchDropdownBox.insertAdjacentHTML("beforeend", searchBkwdClose);
    //  searchBarResults
    searchBar.addEventListener("input", (e)=>{
        if(searchBarInit==0) {
            searchBarInit=1;

            
            var searchFwd = document.getElementById("searchFwd");
            searchFwd.beginElement();
            searchFwd.addEventListener("endEvent", ()=>{
                document.getElementById("result1Component").style.display = 'block';
                document.getElementById("result2Component").style.display = 'block';
                document.getElementById("result3Component").style.display = 'block'; 
                document.getElementById("result4Component").style.display = 'block'; 
            },false);
            mitDropDownOpen = true;
            
        
            
        }
        processSearchBar();

    });
    
    var result1 = `
        <a href="#" id="result1Component" style="display:none;">
            <path class="nav-link searchResult" id="searchResult1" d="M${searchBoxX},50 l${searchBoxW},0 l0,25 l${-searchBoxW},0  l0,-25" fill="white"  pointer-events="all"/>
            <text id="result1Str" x="${searchBoxX}" y="70" fill="black" stroke="black" pointer-events="none"></text>
        </a>`

    var result2 = `
    <a href="#" id="result2Component" style="display:none;">
        <path class="nav-link searchResult" id="searchResult2" d="M${searchBoxX},75 l${searchBoxW},0 l0,25 l${-searchBoxW},0  l0,-25" fill="white"  pointer-events="all"/>
        <text id="result2Str" x="${searchBoxX}" y="95" fill="black" stroke="black" pointer-events="none"></text> 
    </a>`

    var result3 = `
    <a  href="#" id="result3Component" style="display:none;">
        <path class="nav-link searchResult" id="searchResult3" d="M${searchBoxX},100 l${searchBoxW},0 l0,25 l${-searchBoxW},0  l0,-25" fill="white"  pointer-events="all"/>
        <text id="result3Str" x="${searchBoxX}" y="120" fill="black" stroke="black" pointer-events="none"></text> 
    </a>`

    var result4 = `
    <a href="#" id="result4Component" style="display:none;">
        <path class="nav-link searchResult" id="searchResult4" d="M${searchBoxX},125 l${searchBoxW},0 l0,25 l${-searchBoxW},0  l0,-25" fill="white"  pointer-events="all"/>
        <text id="result4Str" x="${searchBoxX}" y="145" fill="black" stroke="black" pointer-events="none"></text>
    </a> `
    navBar.insertAdjacentHTML("beforeend", result1)
    navBar.insertAdjacentHTML("beforeend", result2)
    navBar.insertAdjacentHTML("beforeend", result3)
    navBar.insertAdjacentHTML("beforeend", result4)

    // document.getElementById("searchResult1").onclick =(e)=> {
        
    // }

    

}

function levenshteinDist(str1, str2) {
    let M = str1.length;
    let N = str2.length;
    var d  = Array(N+1).fill(null).map(() =>Array(M+1).fill(null));
    
    for(let i=0; i < M; ++i) d[0][i] = i;
    for(let j=0; j < N; ++j) d[j][0] = j;

    for(let j=1; j <= N; ++j) {
        for(let i=1; i <= M; ++i) {
            let subCost;
            if(str1[i-1]===str2[j-1]) subCost = 0;
            else subCost = 1;
            d[j][i] = Math.min(d[j][i-1]+1,  d[j-1][i]+1, d[j-1][i-1]+subCost);
        }
    }
    
    return d[N][M];

}

function processSearchBar() {
    let rootDir = (getCurrentLocation()=="index")? "./" : "../"
    let query = document.getElementById("searchField");
    query.onkeydown = (e) => {e.stopPropagation();}
    
    var queryString = query.value.toLowerCase();
    var words = queryString.split(" ");

    var subjects =  searchBarResults.map( x => {return [x["subject"],0]})
    var subjectStats = Object.fromEntries(subjects)
    var selectedSubjects = [];

    //var wordStats = Object.fromEntries(words.map((x)=> [x,Object.fromEntries(subjects)]));
    var subjectNames = Object.keys(subjectStats);
    console.log("subjectNames", subjectNames)
    for(let i=0; i < words.length;++i) {
        let w = words[i];
        
        for(let s=0; s < searchBarResults.length; ++s) {
            let keywords = searchBarResults[s]["keywords"];
            let leastDist = 999;
            let isNear = false;
            for(let kw=0; kw<keywords.length;++kw) {
                let dist = levenshteinDist(keywords[kw], w);
                if(dist < leastDist && dist <=3) {
                    isNear = true;
                    leastDist = dist;   
                }
            }
            if(isNear) { selectedSubjects.push([searchBarResults[s]["subject"], leastDist, s]); }
        }
    }

    selectedSubjects.sort(function(a,b){return a[1]-b[1]});
    // for(let s=0; s < 4;++s) {
    //if(selectedSubjects[0][0] != words[0][0]) selectedSubjects.shift();
    //}
    

    if(selectedSubjects[0]!=undefined) {
        document.getElementById("result1Str").innerHTML = selectedSubjects[0][0];
        document.getElementById("result1Component").setAttribute("href", rootDir+searchBarResults[selectedSubjects[0][2]].path);
    }

    if(selectedSubjects[1]!=undefined) {
        document.getElementById("result2Str").innerHTML = selectedSubjects[1][0];
        document.getElementById("result2Component").setAttribute("href", rootDir+searchBarResults[selectedSubjects[1][2]].path);
    }
    
    if(selectedSubjects[2]!=undefined) {
        document.getElementById("result3Str").innerHTML = selectedSubjects[2][0];
        document.getElementById("result3Component").setAttribute("href", rootDir+searchBarResults[selectedSubjects[2][2]].path);
    }
    if(selectedSubjects[3]!=undefined) {
        document.getElementById("result4Str").innerHTML = selectedSubjects[3][0];
        document.getElementById("result4Component").setAttribute("href", rootDir+searchBarResults[selectedSubjects[3][2]].path);
    }

    
}






function getCurrentLocation() {
    var pathName = window.location.pathname;
    var pathFileName = pathName.substr(pathName.lastIndexOf("/")+1)
    pathFileName = pathFileName.replace("#","");
    pathFileName = pathFileName.replace(".html","");
    if(pathFileName=="/") return "index"
    else return pathFileName;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}



function secondaryColorChanged() {
    var newHue = document.getElementById("secondaryColor");
    settingsMap['secondaryHue'] = newHue.value;
    selectedSecondaryHue = newHue.value;
    document.getElementById("layer1").setAttribute("fill",`hsl(${selectedSecondaryHue}, 50%, 50%)`)
}

function baseColorChanged() {
    var newHue = document.getElementById("baseColor");
    settingsMap['baseHue'] = newHue.value;
    selectedBaseHue = newHue.value;
    document.getElementById("layer2").setAttribute("fill",`hsl(${selectedBaseHue}, 80%, 50%)`)
    document.getElementById("layer0").setAttribute("fill",`hsl(${selectedBaseHue}, 50%, 50%)`)
    document.getElementById("fillerLayer").setAttribute("fill",`hsl(${selectedBaseHue}, 50%, 50%)`)
    document.getElementById("sw").setAttribute("right", window.innerWidth);
    var settingsButton = document.getElementById("settingsButton");
    settingsButton.onclick = () => {
        if(document.getElementById("sw").style.display=="block") {document.getElementById("sw").style.display="none";}
        else document.getElementById("sw").style.display="block";
    }
}

function createElementFromString(str) {
    var element = new DOMParser().parseFromString(str, 'text/html').body.firstElementChild;
    return element;
}

function createDropdown(currentDir,replace=false) {
    var rootDir = (currentDir=="index")? "./" : "../"
  
    var mitProjectsDropdownButton = `<path class="nav-link" id="mitProjectsDropdownButton" d="M50,0 l150,0 l0,50 l-150,0 l0,-50" fill="url(#mitProjectsLinkGradient)"  pointer-events="all"/>
        <text x="58" y="30" fill="white" stroke="white" pointer-events="none">MIT Projects</text> 
        <image href="${rootDir}icons/arrow_drop_down_white_24dp.svg" x="170" y="10" height="30" width="30" pointer-events="none">
    </path>`
    
    var mitProjectsLinkGradientHTML =  `<linearGradient id="mitProjectsLinkGradient"  x1="0" y1="1.8" x2="0" y2="0" spreadMethod="repeat" gradientTransform="rotate(90) skewX(110) scale(.625)">
    <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness}%)" offset="10%"/>
    <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness+20}%)" offset="65%"/>
    <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness+5}%)" offset="85%"/>
    <animate id="mitProjectsDropdownButtonAnimation" attributeType="XML" attributeName="x1" values="1; 1.25; 1.5" dur=".75s"  begin="indefinite" repeatCount="indefinite" fill="freeze"/>
</linearGradient>`
    
    if(!replace) {
        navBar.insertAdjacentHTML('beforeend', mitProjectsDropdownButton);
        navBar.insertAdjacentHTML('beforeend', mitProjectsLinkGradientHTML);
    }
    else {
        navBar.removeChild(document.getElementById("mitProjectsDropdownButton"));
        navBar.removeChild(document.getElementById("mitProjectsLinkGradient"));
        document.getElementById("mitProjectsDropdownBox").removeChild(document.getElementById("forwardDropdownAnimation"));
        document.getElementById("mitProjectsDropdownBox").removeChild(document.getElementById("reverseDropdownAnimation"));
        navBar.removeChild(document.getElementById("mitProjectsDropdownBox"));
        navBar.insertAdjacentHTML('beforeend', mitProjectsDropdownButton);
        navBar.insertAdjacentHTML('beforeend', mitProjectsLinkGradientHTML);
    }

    mitProjectsDropdownBox = `
    <path class="nav-link" id="mitProjectsDropdownBox" d="M50,50 l150,0 l0,0 l-150,0 l0,0" fill="url(#mitProjectsLinkGradient)"  pointer-events="all" />`
    var fwdAnimation = `<animate id="forwardDropdownAnimation" attributeType="XML" attributeName="d" dur="100ms"  begin="indefinite" fill="freeze"
    values="M50,50 l150,0 l0,0 l-150,0 l0,0;
            M50,50 l150,0 l0,50 l-150,0 l0,0;
            M50,50 l150,0 l0,100 l-150,0 l0,-100; 
            M50,50 l150,0 l0,150 l-150,0 l0,-150" ></animate>`
    var bkwdAnimation = `<animate id="reverseDropdownAnimation" attributeType="XML" attributeName="d" dur="100ms"  begin="indefinite" fill="freeze"
        values="M50,50 l150,0 l0,150 l-150,0 l0,-150;
                M50,50 l150,0 l0,100 l-150,0 l0,-100;
                M50,50 l150,0 l0,50 l-150,0 l0,0;
                M50,50 l150,0 l0,0 l-150,0 l0,0" ></animate>`
    
    navBar.insertAdjacentHTML('beforeend', mitProjectsDropdownBox);
    document.getElementById("mitProjectsDropdownBox").insertAdjacentHTML('beforeend',fwdAnimation)
    document.getElementById("mitProjectsDropdownBox").insertAdjacentHTML('beforeend',bkwdAnimation)

}

function generateNewAnimation() {
    var dropDownObj = document.getElementById("mitProjectsDropdownBox");
    if(dropDownObj.hasChildNodes()) {
        dropDownObj.removeChild(document.getElementById('forwardDropdownAnimation'));
        dropDownObj.removeChild(document.getElementById('reverseDropdownAnimation'));
    } 
    let animationChoice = 2
    switch(animationChoice) {
        case 0: 
            dropDownObj.insertAdjacentHTML('beforeend', `<animate id="forwardDropdownAnimation" attributeType="XML" attributeName="d" dur="2s"  begin="indefinite" fill="freeze"
            values="M50,50 l150,0 l0,0 l-150,0 l0,0;
                    M50,50 l150,0 l0,50 l-150,0 l0,0;
                    M50,50 l150,0 l0,100 l-150,0 l0,-100; 
                    M50,50 l150,0 l0,150 l-150,0 l0,-150" ></animate>
            <animate id="reverseDropdownAnimation" attributeType="XML" attributeName="d" dur="2s"  begin="indefinite" fill="freeze"
                values="M50,50 l150,0 l0,150 l-150,0 l0,-150;
                        M50,50 l150,0 l0,100 l-150,0 l0,-100;
                        M50,50 l150,0 l0,50 l-150,0 l0,0;
                        M50,50 l150,0 l0,0 l-150,0 l0,0" ></animate>`);
            break;
        case 1: 
            dropDownObj.insertAdjacentHTML('beforeend', `<animate id="forwardDropdownAnimation" attributeType="XML" attributeName="d" dur="500ms"  begin="indefinite" fill="freeze"
                values="M50,50 l150,0 l0,0   c-75 150,-75 150,-150 0  l0,0;
                        M50,50 l150,0 l0,15  c-75 120,-60 120, -150 0   l0,-15;
                        M50,50 l150,0 l0,30  c-75 90,-45 90, -150 0   l0,-30;
                        M50,50 l150,0 l0,45  c-75 60,-30 60, -150 0   l0,-45;
                        M50,50 l150,0 l0,75  c-75 30,-15 30, -150 0   l0,-75;
                        M50,50 l150,0 l0,150 c-75 0,0 0, -150 0   l0,-150;" ></animate>`);
            dropDownObj.insertAdjacentHTML('beforeend', `<animate id="reverseDropdownAnimation" attributeType="XML" attributeName="d" dur="2s"  begin="indefinite" fill="freeze"
                values="M50,50 l150,0 l0,150 l-150,0 l0,-150;
                        M50,50 l150,0 l0,100 l-150,0 l0,-100;
                        M50,50 l150,0 l0,50 l-150,0 l0,0;
                        M50,50 l150,0 l0,0 l-150,0 l0,0" ></animate>`);
            break;
        case 2: 
            dropDownObj.insertAdjacentHTML('beforeend', `<animate id="forwardDropdownAnimation" attributeType="XML" attributeName="d" dur="500ms"  begin="indefinite" fill="freeze"
                values="M50,50 l150,0 l0,0   c-75 150,-75 150, -150 0  l0,0;
                        M50,50 l150,0 l0,15  c-75 150,-75 135, -150 0   l0,-15;
                        M50,50 l150,0 l0,30  c-75 150,-75 120, -150 0   l0,-30;
                        M50,50 l150,0 l0,45  c-75 150,-75 105, -150 0   l0,-45;
                        M50,50 l150,0 l0,60  c-75 150,-75 90, -150 0   l0,-60;
                        M50,50 l150,0 l0,75  c-75 150,-75 75,  -150 0   l0,-75;
                        M50,50 l150,0 l0,90  c-75 150,-75 60, -150 0   l0,-90;
                        M50,50 l150,0 l0,105  c-75 150,-75 45,  -150 0   l0,-105;
                        M50,50 l150,0 l0,120  c-75 150,-75 30, -150 0   l0,-120;
                        M50,50 l150,0 l0,135  c-75 150,-75 15,  -150 0   l0,-135;
                        M50,50 l150,0 l0,150 c0 0,0 0,         -150 0   l0,-150;"></animate>`);
            dropDownObj.insertAdjacentHTML('beforeend', `<animate id="reverseDropdownAnimation" attributeType="XML" attributeName="d" dur="2s"  begin="indefinite" fill="freeze"
                values="M50,50 l150,0 l0,150 l-150,0 l0,-150;
                        M50,50 l150,0 l0,100 l-150,0 l0,-100;
                        M50,50 l150,0 l0,50 l-150,0 l0,0;
                        M50,50 l150,0 l0,0 l-150,0 l0,0"></animate>`);
            break;
    }
}

function insertNavLinks(insertInto, currentDir, replace=false) {
    var homeHref = "./index.html";
    var pacmenHref = "./pacmen/pacmen.html"
    var eyesHref = "./eyes/eyes.html"
   
    var busStopsHref = "./busStops/busStops.html"
    var imageGalleryHref = "./imageGallery/imageGallery.html"
    var rootDir = (currentDir=="index")? "./" : "../"
    if(currentDir=="index") homeHref="#";
    else if(currentDir=="pacmen"){ 
        pacmenHref="#";
        homeHref = "."+homeHref;
        eyesHref = "."+eyesHref;
        busStopsHref = "."+busStopsHref;
       
        imageGalleryHref = "."+imageGalleryHref
    }
    else if(currentDir=="eyes") {
        eyesHref = "#";
        homeHref = "."+homeHref;
        pacmenHref = "."+pacmenHref;
        busStopsHref = "."+busStopsHref;
       
        imageGalleryHref = "."+imageGalleryHref
    }
    else if(currentDir=="busStops") {
        busStopsHref = "#";
        homeHref = "."+homeHref;
        pacmenHref = "."+pacmenHref;
        eyesHref = "."+eyesHref;
       
        imageGalleryHref = "."+imageGalleryHref
    }
    
    else if(currentDir=="imageGallery") {
        busStopsHref = "."+busStopsHref;
        homeHref = "."+homeHref;
        pacmenHref = "."+pacmenHref;
        eyesHref = "."+eyesHref;
       
        imageGalleryHref = "#"
    }
    var subLinkPos = [[50,50], [50,100], [50,150]];            //excludes Home link; ordered as => Pacmen, Eyes, BusStops
    //var linkPos = [0,];
    pacmenLinkHTML_head = `<a id="pacmenNavLink" href="${pacmenHref}" x="200" y="30" pointer-events="all" display="none">`
    eyesLinkHTML_head = `<a id="eyesNavLink" href="${eyesHref}" x="200" y="80" pointer-events="all" display="none">`
    busStopsLink_head = `<a id="busStopsNavLink" href="${busStopsHref}" x="200" y="130" pointer-events="all" display="none">`
   
    var homeLinkHTML = `<a id="homeNavLink" href="${homeHref}" x="0" y="30" pointer-events="all">
        <path class="nav-link" id="homeNavButton" d="M0,0 l50,0 l0,50 l-50,0 l0,-50" fill="url(#homeNavLinkGradient)" /></a>`
    var homeIcon = `<image id="homeIcon" href="${homeHref=="#"? "./":"../"}icons/house_door_filled.svg" x="12.5" y="12.5" height="25" width="25" pointer-events="none">`
    var homeLinkGradientHTML =  `<linearGradient id="homeNavLinkGradient" x1="0" y1="1.8" x2="0" y2="0" spreadMethod="repeat" gradientTransform="rotate(90) skewX(110) scale(.625)">
    <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness}%)" offset="10%"/>
    <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness+20}%)" offset="65%"/>
    <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness+5}%)" offset="85%"/>
            <animate id="homeNavButtonAnimation" attributeType="XML" attributeName="y2" values="0; .35; .65; .35;" dur="1.5s"  begin="indefinite" repeatCount="indefinite" fill="freeze"/>
            </linearGradient>`
    
    

    var ballGameLinkHTML =  `<path class="nav-link" fill="url(#ballGameNavLinkGradient)" id="ballGameButton" d="M600,0 l50,0 l0,50 l-50,0 l0,-50"   pointer-events="all"></path>`
    
    var ballGameLinkGradientHTML =  `<radialGradient id="ballGameNavLinkGradient" cx=".5" cy="0.5" r="0.8" fx="0.5" fy="0.0" spreadMethod="repeat">
            <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness}%)" offset="10%"/>
            <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness+20}%)" offset="65%"/>
            <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness}%)" offset="85%"/>
        <animate id="ballGameNavButtonAnimation" attributeType="XML" attributeName="r" values=".8; .7; .6" dur=".75s"  begin="indefinite" repeatCount="indefinite" />
        </radialGradient>`
    
    var pacmenLinkHTML = pacmenLinkHTML_head+ `
        <path class="nav-link" id="pacmenNavButton" d="M${subLinkPos[0][0]},${subLinkPos[0][1]} l150,0 l0,50 l-150,0 l0,-50" fill="url(#pacmenNavLinkGradient)"  pointer-events="all"/>
        <text x="100" y="80" fill="white" stroke="white" pointer-events="none">Pacmen</text>
            <animate id="fadeInAnimation1" attributeType="XML" attributeName="opacity" dur="500ms"  begin="indefinite" fill="freeze"
                from="0.0" to="1.0"  begin="indefinite"></animate> 
            <animate id="fadeOutAnimation1" attributeType="XML" attributeName="opacity" dur="100ms"  begin="indefinite" fill="freeze"
                from="1.0" to="0.0" begin="indefinite"></animate> </a>`
         
    var pacmenLinkGradientHTML = `<linearGradient id="pacmenNavLinkGradient" x1=".8" y1="0.8" x2="1" y2="0.1" spreadMethod="repeat">
    <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness}%)" offset="10%"/>
    <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness+20}%)" offset="45%"/>
    <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness}%)" offset="65%"/>
    <animate id="pacmenNavButtonAnimation" attributeType="XML" attributeName="x1" values="1; 1.25; 1.5" dur=".75s"  begin="indefinite" repeatCount="1" fill="freeze"/></linearGradient>`

    var eyesLinkHTML = eyesLinkHTML_head+ `
    <path class="nav-link" id="eyesNavButton" d="M${subLinkPos[1][0]},${subLinkPos[1][1]} l150,0 l0,50 l-150,0 l0,-50" fill="url(#eyesNavLinkGradient)"  pointer-events="all"/>
    <text x="100" y="130" fill="white" stroke="white" pointer-events="none">Eyes</text> 
    <animate id="fadeInAnimation2" attributeType="XML" attributeName="opacity" dur="500ms"  begin="indefinite" fill="freeze" from="0.0" to="1.0"  begin="indefinite"></animate> 
    <animate id="fadeOutAnimation2" attributeType="XML" attributeName="opacity" dur="100ms"  begin="indefinite" fill="freeze" from="1.0" to="0.0" begin="indefinite"></animate></a>`
        
    var eyesLinkGradientHTML = `<linearGradient id="eyesNavLinkGradient" x1=".8" y1="0.8" x2="2.5" y2="5" spreadMethod="repeat">
    <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness}%)" offset="10%"/>
    <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness+20}%)" offset="45%"/>
    <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness}%)" offset="65%"/>
    <animate id="eyesNavButtonAnimation" attributeType="XML" attributeName="x1" values="1; 1.25; 1.5" dur=".75s"  begin="indefinite" repeatCount="1" fill="freeze"/>
</linearGradient>`

    
    var busStopsLinkHTML = busStopsLink_head+`
        <path class="nav-link" id="busStopsNavButton" d="M${subLinkPos[2][0]},${subLinkPos[2][1]} l150,0 l0,50 l-150,0 l0,-50" fill="url(#busStopsNavLinkGradient)"  pointer-events="all"/>
        <text x="100" y="180" fill="white" dx="-25" stroke="white" pointer-events="none" class="mapNavLinkText">Map Animation</text> 
        <animate id="fadeInAnimation3" attributeType="XML" attributeName="opacity" dur="500ms"  begin="indefinite" fill="freeze"
            from="0.0" to="1.0"  begin="indefinite"></animate> 
        <animate id="fadeOutAnimation3" attributeType="XML" attributeName="opacity" dur="100ms"  begin="indefinite" fill="freeze"
            from="1.0" to="0.0" begin="indefinite"></animate></a>`

    var busStopsGradientHTML = `<linearGradient id="busStopsNavLinkGradient" x1=".8" y1="0.8" x2="1" y2="0.1" spreadMethod="repeat">
    <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness}%)" offset="10%"/>
    <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness+20}%)" offset="45%"/>
    <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness}%)" offset="65%"/>
    <animate id="busStopsNavButtonAnimation" attributeType="XML" attributeName="x1" values="1; 1.25; 1.5" dur=".75s"  begin="indefinite" repeatCount="1" fill="freeze"/>
</linearGradient>`

    //`<a id="imageGalleryNavLink" href="${imageGalleryHref}" x="50" y="30" pointer-events="all" display="none">
    var imageGalleryLinkHTML =  `<a id="imageGalleryNavLink" href="${imageGalleryHref}" x="350" y="30" pointer-events="all">
        <path class="nav-link" fill="url(#imageGalleryNavLinkGradient)" id="imageGalleryButton" d="M200,0 l150,0 l0,50 l-150,0 l0,-50" pointer-events="all" />
        <text x="250" y="30" fill="white" dx="-25" stroke="white" pointer-events="none" class="mapNavLinkText">Gallery </text> 
        
        <image href="${rootDir}icons/imageIcon.svg" x="280" y="10" height="30" width="30" pointer-events="none">
        </a>`
        
    var imageGalleryLinkGradientHTML =  `<linearGradient id="imageGalleryNavLinkGradient"  x1="0" y1="1.8" x2="0" y2="0" spreadMethod="repeat" gradientTransform="rotate(90) skewX(110) scale(.625)">
    <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness}%)" offset="10%"/>
    <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness+20}%)" offset="65%"/>
    <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness+5}%)" offset="85%"/>
    <animate id="imageGalleryNavButtonAnimation" attributeType="XML" attributeName="y2" values="0; .35; .65; .35;" dur="1.5s"  begin="indefinite" repeatCount="indefinite" fill="freeze"/>
    </linearGradient>`
    var ballGameLinkHTML =  `<path class="nav-link" fill="url(#ballGameNavLinkGradient)" id="ballGameButton" d="M350,0 l50,0 l0,50 l-50,0 l0,-50"   pointer-events="all"></path>`
    
    var ballGameLinkGradientHTML =  `<radialGradient id="ballGameNavLinkGradient" cx=".5" cy="0.5" r="0.8" fx="0.5" fy="0.0" spreadMethod="reflect">
            <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness}%)" offset="10%"/>
            <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness+20}%)" offset="65%"/>
            <stop stop-color="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness}%)" offset="85%"/>
        <animate id="ballGameNavButtonAnimation" attributeType="XML" attributeName="r" values=".8; .7; .6" dur=".75s"  begin="indefinite" repeatCount="indefinite" />
        </radialGradient>`

    if(!replace) {
        insertInto.insertAdjacentHTML('beforeend', homeLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', homeLinkGradientHTML);
        insertInto.insertAdjacentHTML("beforeend",homeIcon);

        

        insertInto.insertAdjacentHTML('beforeend', ballGameLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', ballGameLinkGradientHTML);

        insertInto.insertAdjacentHTML('beforeend', pacmenLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', pacmenLinkGradientHTML);

        insertInto.insertAdjacentHTML('beforeend', eyesLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', eyesLinkGradientHTML);

        insertInto.insertAdjacentHTML('beforeend', busStopsLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', busStopsGradientHTML);

        insertInto.insertAdjacentHTML('beforeend', imageGalleryLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', imageGalleryLinkGradientHTML);
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
        insertInto.removeChild(document.getElementById("ballGameLinkHTML"));
        insertInto.removeChild(document.getElementById("ballGameLinkGradientHTML"));
        insertInto.removeChild(document.getElementById("imageGalleryLinkHTML"));
        insertInto.removeChild(document.getElementById("imageGalleryLinkGradientHTML"));

        insertInto.insertAdjacentHTML('beforeend', homeLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', homeLinkGradientHTML);

        insertInto.insertAdjacentHTML('beforeend', imageGalleryLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', imageGalleryLinkGradientHTML);

        insertInto.insertAdjacentHTML('beforeend', pacmenLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', pacmenLinkGradientHTML);

        insertInto.insertAdjacentHTML('beforeend', eyesLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', eyesLinkGradientHTML);

        insertInto.insertAdjacentHTML('beforeend', busStopsLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', busStopsGradientHTML);


        insertInto.insertAdjacentHTML('beforeend', ballGameLinkHTML);
        insertInto.insertAdjacentHTML('beforeend', ballGameLinkGradientHTML);
    }
    insertInto.insertAdjacentHTML("beforeend", `<circle cx="${350+20}" cy="${30}" r="${10}" fill="hsl(40, 100%, 50%)" pointer-events="none"/>`)
    insertInto.insertAdjacentHTML("beforeend", `<circle cx="${350+30}" cy="${12}" r="${7}" fill="hsl(10, 100%, 50%)" pointer-events="none"/>`)
    insertInto.insertAdjacentHTML("beforeend", `<circle cx="${350+40}" cy="${35}" r="${5}" fill="hsl(90, 80%, 50%)" pointer-events="none"/>`)
    
    document.getElementById("forwardDropdownAnimation").addEventListener("endEvent", (e)=>{
        document.getElementById("fadeInAnimation1").beginElement();
        document.getElementById("fadeInAnimation2").beginElement();
        document.getElementById("fadeInAnimation3").beginElement();
    });
    document.getElementById("reverseDropdownAnimation").addEventListener("beginEvent", (e)=>{
        document.getElementById("fadeOutAnimation1").beginElement();
        document.getElementById("fadeOutAnimation2").beginElement();
        document.getElementById("fadeOutAnimation3").beginElement();
    });
    
    // setLinkAnimations("homeNavButton");
    // setLinkAnimations("pacmenNavButton");
    // setLinkAnimations("eyesNavButton");
    // setLinkAnimations("busStopsNavButton");
    
    // setLinkAnimations("homeNavButton");
    
    makeBallGame();
    document.getElementById("ballGameButton").onclick = (e) => {
        
        ++numberBallPresses;
        if(numberBallPresses>=3) {
            return;
        }
        document.getElementById("fwdPipeAnimation").beginElement();
        document.getElementById("fwdPipeAnimation").addEventListener("endEvent", (e)=>{    
            //startBallGame(25);

            document.getElementById("ballContainer").classList.add("movingContainer");
            console.log("starting ball game");
            
            setTimeout(()=>{
                //addBallObject(150, 150, 25, 25, 5, 5,25, null);
                for(let i=0; i < 25 ; ++i) {
                    let x = getRandomInt(100,175);
                    let y = getRandomInt(10,20);
                    let r = getRandomInt(5,25);
                    let xVel = getRandomInt(-10,10);
                    addBallObject(x, y, r, r, xVel, 25 , 50, null);
                }
                
                setInterval(()=>{
                    updateBallGame();
                    drawBallGame();
                }
                
                ,1000/60)
                
            }, 500)
            //addBallObject(150, 150, 25, 25, 5, 5,25, null);
        })
    
    }
}
function setLinkAnimations(elementID) {
    document.getElementById(elementID).onmouseover = (e) => {
        document.getElementById(`${elementID}Animation`).beginElement();
    }
    document.getElementById(elementID).onmouseout = (e) => {
        document.getElementById(`${elementID}Animation`).endElement();
    }
}

function makeBallGame() {
    var pipeGradientHTML = `<radialGradient id="pipeGradient" cx=".5" cy="0.5" r="0.8" fx="0.5" fy="0.0" spreadMethod="reflect">
            <stop stop-color="hsl(255,2%,67%)" offset="40%"/>
            <stop stop-color="hsl(255,2%,30%)" offset="65%"/>
            <stop stop-color="hsl(255,2%,25%)" offset="85%"/>
        </radialGradient>`

    var pipeHTML = `
    <path class="nav-link" fill="url(#pipeGradient)" id="ballGamePipe" d="M350,50 l50,0 l0,0 l-50,0 l0,0"   pointer-events="all">
        <animate id="fwdPipeAnimation" attributeType="XML" attributeName="d" dur="50ms"  begin="indefinite" fill="freeze"
        values="M350,50 l50,0 l0,0 l-50,0 l0,0;
                M350,50 l50,0 l0,50 l-50,0 l0,0;
                M350,50 l50,0 l0,100 l-50,0 l0,-100;
                M350,50 l50,0 l0,150 l-50,0 l0,-150" 
            >
        </animate>
    </path>`

    navBar.insertAdjacentHTML('beforeend',pipeGradientHTML);
    navBar.insertAdjacentHTML('beforeend',pipeHTML)
}

var startBallGame = (numberOfBalls) =>{
    console.log("starting ball game");
    for(let i=0; i < numberOfBalls; ++i) {
        addBallObject(500, 500, 25, 25, 50, 50, null);
    }
    
    setInterval(()=>{
        updateBallGame();
        drawBallGame();
    },1000/60)
}


function addBallObject (x,y, width, height,dx,dy,mass,color,isNew=true) {
    //"user-ellipse",x,y,radius,radius,0,0,mass,null,true
    ++controlledObjectIndex;
    var obj = {
        index:controlledObjectIndex,
        x:x,
        y:y,
        width:width,
        height:height,
        dx:dx,
        dy:dy,
        mass:mass,
        color:color
    }
    physicalObjectMap.push(obj);

    var newObj =  new BallObject("circle"+obj.index, x, y, width, height, dx, dy, mass);
    physicalObjects.push(newObj);

    if(isNew) { localStorage.physicalObjectMap = JSON.stringify(physicalObjectMap); }
   
    //var circleGroup = document.getElementById("circleGroup");
    var newShape = document.createElementNS("http://www.w3.org/2000/svg",'circle');
    newShape.setAttribute('id',"circle"+obj.index);
    newShape.setAttribute('cx',newObj.x);
    newShape.setAttribute('cy',newObj.y);
    newShape.setAttribute('r',newObj.radius);
    newShape.setAttribute('fill', newObj.color);

    newShape.addEventListener('click', (e) => {
        console.log("clicked obj: "+obj.index)
        physicalObjects[controlledObjectIndex].isSelected = false;
        physicalObjects[obj.index].isSelected = true;
        controlledObjectIndex = obj.index;
    })
    //circleGroup.appendChild(newShape);
    document.getElementById("ballContainer").appendChild(newShape);

}


function updateBallGame() {  
    physicalObjects.forEach((obj,index) => {
        obj.updateBallObj();
        physicalObjectMap[index].x =  obj.x;
        physicalObjectMap[index].y =  obj.y;
        physicalObjectMap[index].dx = obj.xVelocity;
        physicalObjectMap[index].dy = obj.yVelocity;
    })
}

function drawBallGame() {
    for(let i=0; i<physicalObjects.length;++i) {
        physicalObjects[i].drawBallObj();
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



function addRemainingSegment(replace=false) {
    if(replace) {
        navBar.removeChild(document.getElementById("voidSegment"))
        navBar.removeChild(document.getElementById("settingsButton"))
        navBar.removeChild(document.getElementById("searchButton"))
    }
    let totalExistingLength = 0;
    let sizes = Object.keys(navElementSizes);
    for(let s=0; s < sizes.length;++s) {
        totalExistingLength+=sizes[s]*navElementSizes[sizes[s]];
    }

    
    var remSegmentLength = window.innerWidth - totalExistingLength - 50;
    var settingsPos = window.innerWidth - 50;
    let gear1Pos = settingsPos+20;
    let gear2Pos = settingsPos;
    // var htmlStr = `<path d="M${totalExistingLength},0 l${remSegmentLength},0 l0,50 l-${Math.abs(remSegmentLength)},0 l0,-50" fill="hsl(${selectedBaseHue},70%,30%)"  pointer-events="all"></path>`
    var htmlStr = `<path id="voidSegment" d="M${totalExistingLength},0 l${remSegmentLength},0 l0,50 l-${Math.abs(remSegmentLength)},0 l0,-50" fill="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness+10}%)"  pointer-events="all"></path>`
    navBar.insertAdjacentHTML('beforeend',htmlStr)

    var pathName = window.location.pathname;
    var rootDir = pathName.substr(pathName.lastIndexOf("/")+1)
    rootDir = rootDir.replace("#","");
    rootDir = rootDir.replace(".html","");
    if(rootDir=="index") rootDir="";
    else rootDir="../"

    navBar.insertAdjacentHTML("beforeend", `<path class="nav-link"  id="searchButton" d="M${settingsPos-50},0 l50,0 l0,50 l-50,0 l0,-50" fill="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness+10}%)"  pointer-events="all"></path>`);
    navBar.insertAdjacentHTML("beforeend", `<path class="nav-link" id="settingsButton" d="M${settingsPos},0 l50,0 l0,50 l-50,0 l0,-50" fill="hsl(${selectedNavHue},${selectedNavSat}%,${selectedNavBrightness+10}%)"  pointer-events="all"></path>`);

    navBar.insertAdjacentHTML("beforeend", `
        <foreignObject id="searchBar" class="searchPanel" x="${settingsPos-450}" y="0" width="350" height="55" opacity="0">
            <div xmlns="http://www.w3.org/1999/xhtml" width="350" height="55">
                <td><input id="searchField" placeholder="Type anything..."  type="text" style="font-size:35px;" width="350" height="55"></input></td>
            </div>
        </foreignObject>
        <animate xlink:href="#searchBar" id="searchBarFadeIn" attributeType="XML" attributeName="opacity" dur="500ms"  begin="indefinite" fill="freeze"
            from="0.0" to="1.0" begin="indefinite"></animate>
        <animate xlink:href="#searchBar" id="searchBarFadeOut" attributeType="XML" attributeName="opacity" dur="500ms"  begin="indefinite" fill="freeze"
            from="1.0" to="0.0" begin="indefinite"></animate>
    
        <image id="searchIcon" href="${rootDir}icons/search.svg" x="${settingsPos-50}" y="10" height="30" width="30" pointer-events="none"></image>
    `
    );

    navBar.insertAdjacentHTML("beforeend", `<image id="gearIcon1" href="${rootDir}icons/settings_white_filled_24dp.svg" x="${gear1Pos}" y="20" height="30" width="30" pointer-events="none">
        <animateTransform xlink:href="#gearIcon1" id="gearRotate1" attributeName="transform" attributeType="XML" type="rotate" dur="3s" begin="indefinite"  repeatCount="indefinite"
            values="0 ${gear1Pos+15} 35 ;360 ${gear1Pos+15} 35; 0 ${gear1Pos+15} 35;  360 ${gear1Pos+15} 35" 
            keySplines=".09 .89 1 .46; .09 .89 1 .46; .09 .89 1 .46; .09 .89 1 .46" 
            keyTimes="0 ; .15; .75; 1">
        </animateTransform>
    </image>`
    );
 
    navBar.insertAdjacentHTML("beforeend", `<image id="gearIcon2" href="${rootDir}icons/settings_white_filled_24dp.svg" x="${gear2Pos}" y="0" height="30" width="30" pointer-events="none">
        <animateTransform xlink:href="#gearIcon2" id="gearRotate2" attributeName="transform" attributeType="XML" type="rotate" dur="3s" begin="indefinite" repeatCount="indefinite"
            values="360 ${gear2Pos+15} 15 ;0 ${gear2Pos+15} 15; 360 ${gear2Pos+15} 15;  0 ${gear2Pos+15} 15" 
            keySplines=".09 .89 1 .46; .09 .89 1 .46; .09 .89 1 .46; .09 .89 1 .46" 
            keyTimes="0 ; .15; .75; 1">
        </animateTransform>
    </image>`);

    document.getElementById("sw").setAttribute("right", window.innerWidth);

    var settingsButton = document.getElementById("settingsButton");
    settingsButton.onclick = () => {
        if(document.getElementById("sw").style.display=="block") {document.getElementById("sw").style.display="none";}
        else document.getElementById("sw").style.display="block";
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

    document.getElementById("searchButton").onclick = () => {
        console.log(document.getElementById("searchBar").style.opacity);
        if(searchBarShowing==0) {
            document.getElementById("searchBarFadeIn").beginElement();
            searchBarShowing = 1;
        }
        else {
            document.getElementById("searchBarFadeOut").beginElement();
            searchBarShowing = 0;
            document.getElementById("searchBkwdClose").beginElement();
        }
        
    }
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
            context.fillStyle = `hsla(${selectedBaseHue}, ${saturationVal}%, ${triangles.value}%, .5)`;
            context.fill();
            context.stroke();
        }	
    }
    ++step;

}

function loadTriangle(canvas, t) {
    if(t.pts == undefined) return;
    canvas.getContext("2d").beginPath();
    canvas.getContext("2d").moveTo(t.pts[0].x, t.pts[0].y);
    canvas.getContext("2d").lineTo(t.pts[1].x, t.pts[1].y);
    canvas.getContext("2d").lineTo(t.pts[2].x, t.pts[2].y);
    canvas.getContext("2d").lineTo(t.pts[0].x, t.pts[0].y);
    canvas.getContext("2d").closePath();
    canvas.getContext("2d").fillStyle = `hsla(${selectedBaseHue}, 50%, 50%, .5)`;
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