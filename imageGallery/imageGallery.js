var myHeaders = new Headers();
myHeaders.set("Access-Control-Allow-Origin", "*");
myHeaders.set("Access-Control-Request-Headers", "*");





//REMEMBER TO PUT URLS OF THE SOURCE OF EACH IMAGE, 


function insertImageFooters() {
    var galleryImg1=document.getElementById("galleryImg1");
    var galleryImg2=document.getElementById("galleryImg2");
    var galleryImg3=document.getElementById("galleryImg3");
    var galleryImg4=document.getElementById("galleryImg4");
    var galleryImg5=document.getElementById("galleryImg5");
    var galleryImg6=document.getElementById("galleryImg6")



    //galleryImg1.insertAdjacent
    console.log(`${galleryImg1.width.baseVal.value},${galleryImg1.height.baseVal.value}`);
    var footer1 = `<path fill="grey" id="footer1" d="M0,${galleryImg1.height.baseVal.value} C178,159 440,185 ${galleryImg1.width.baseVal.value},${galleryImg1.height.baseVal.value}" />`
    galleryImg1.insertAdjacentHTML('beforeend',footer1);
}


