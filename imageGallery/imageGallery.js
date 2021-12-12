var searchBarResults = [
    {path:"/pacmen/pacmen.html", subject:"Pacmen" ,keywords:["pacmen","yellow"]},
    {path:"/imageGallery/imageGallery.html", subject:"Mona Lisa" , keywords:["image","mona", "lisa"]},
    {path:"/imageGallery/imageGallery.html", subject:"Saturn V" , keywords:["saturn","saturn v" ,"saturn 5" ,"rocket"]},
    {path:"/imageGallery/imageGallery.html", subject:"Dog" , keywords:["dog","australian", "shepherd", "aussie"]},
    {path:"/imageGallery/imageGallery.html", subject:"F&#233;licette (cat)" , keywords:["cat","astronaut", "felicette"]},
    {path:"/imageGallery/imageGallery.html", subject:"Miss Baker" , keywords:["monkey","astronaut", "miss", "baker", "squirrel"]},
    {path:"/imageGallery/imageGallery.html", subject:"Space and Rocket Center" , keywords:["museum","center", "space", "rocket"]},
    {path:"/eyes/eyes.html", subject:"Eyes" , keywords:["eyes"]},
    {path:"/busStops/busStops.html", subject:"Map Animation" , keywords:["bus","stops", "map", "demo"]},
    {path:"#", subject:"Gallery" , keywords:["gallery"]},
    {path:"#", subject:"Settings" , keywords:["settings"]},
    {path:"#", subject:"Primary Color" , keywords:["settings", "base", "primary","color"]}
]


//darken out everything else except image searched for from Search Bar
function imageSearchedFor(selectedSubject) {
    if(selectedSubject=="Mona Lisa") {
        console.log("jere");
        //darken/blur out all body except mona lisa
        document.body.style.filter="brightness(.3)";
    }
}