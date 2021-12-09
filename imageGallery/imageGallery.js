var myHeaders = new Headers();
myHeaders.set("Access-Control-Allow-Origin", "*");
myHeaders.set("Access-Control-Request-Headers", "*");





//REMEMBER TO PUT URLS OF THE SOURCE OF EACH IMAGE, 


function insertImageFooters() {
    var galleryImg1=documenet.getElementById("galleryImg1");
    var galleryImg2=documenet.getElementById("galleryImg2");
    var galleryImg3=documenet.getElementById("galleryImg3");
    var galleryImg4=documenet.getElementById("galleryImg4");
    var galleryImg5=documenet.getElementById("galleryImg5");
    var galleryImg6=documenet.getElementById("galleryImg6")



    //galleryImg1.insertAdjacent

    var footer1 = `<path fill="grey" id="footer1" d="M0,${galleryImg1.height} C178,159 440,185 ${galleryImg1.width},${galleryImg1.height}" />`
    galleryImg1.insertAdjacentHTML('beforeend',footer1);
}


