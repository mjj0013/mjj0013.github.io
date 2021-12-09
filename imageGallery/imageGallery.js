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


