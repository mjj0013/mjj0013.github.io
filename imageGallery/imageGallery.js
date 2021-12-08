var myHeaders = new Headers();
myHeaders.set("Access-Control-Allow-Origin", "*");
myHeaders.set("Access-Control-Request-Headers", "*");





//REMEMBER TO PUT URLS OF THE SOURCE OF EACH IMAGE, 



var imageIDs = {}
function createFilter(imagePath, imageId) {
    document.getElementById("resultImage").insertAdjacentHTML('beforeend',
    `<filter id="gradient1_filter" color-interpolation-filters="sRGB">
        <feImage href="${imagePath}" result="Result"/>
        <feDisplacementMap in="SourceGraphic" in2="Result" scale="200" xChannelSelector="R" yChannelSelector="B"/>
    </filter>`);
}

function image2Changed() {
    var newImgPath = document.getElementById("imageSelector2")
    var img = document.getElementById("image2");
    var imageID = newImgPath.value.split(".")[0];
    console.log(newImgPath.value.split("."));


    img.href.baseVal = `./images/${newImgPath.value}`
    if(imageIDs[imageID]==undefined) {
        imageIDs[imageID] = {"path":newImgPath.value, "filter":false};
        
    }
    if(imageIDs[imageID]["filter"]==false) {
        createFilter(img.href.baseVal, imageID);
    }
    document.getElementById("resultImage").setAttributeNS("http://www.w3.org/2000/svg","filter",`url(#gradient1_filter)`);
   
}