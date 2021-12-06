var myHeaders = new Headers();
myHeaders.set("Access-Control-Allow-Origin", "*");
myHeaders.set("Access-Control-Request-Headers", "*");

function createFilter(imagePath, imageId) {

    document.getElementById("imageManipSVG").insertAdjacentHTML('beforeend',
    `<filter id="${imageId+"filter"}" color-interpolation-filters="sRGB">
        <feImage href="${imagePath}" result="Result"/>
        <feDisplacementMap in="SourceGraphic" in2="Result" scale="200" xChannelSelector="R" yChannelSelector="B"/>
    </filter>`);
}

function createAbsolute() {
    `feImage`
}

function image1Changed() {
   
    var newImgPath = document.getElementById("imageSelector1");
    //if(newImgPath.value=="") return;
    var img = document.getElementById("image1");
    var newImgObj = new Image;
    newImgObj.onload = function() {
        img.src = `/images/${newImgPath.value}`
    }
    newImgObj.src = `/images/${newImgPath.value}`
    console.log(newImgObj.src);
 
    
}

function image2Changed() {
    var newImg2 = document.getElementById("imageSelector2");
    newImg2.value;
}