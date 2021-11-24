import "./NavBar.js"




window.onload = () => {
    var canvas = document.getElementById("coverCanvas");
    console.log("home");
    canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
    startAnimation(coverCanvas);
    
    window.onresize = () => {
        
        canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
        startAnimation(coverCanvas);
    }
    setInterval(update,1000/60);
}
function toggleSettings(e) {
    let w = document.getElementById("sw");
    
    if(w.style.display=="none" || w.style.display=='') { w.style.display="block"; }
    else w.style.display="none";

    if(e.target.id=="calcSettingsButton") {		//settings request came from calculator
        console.log("calculator button requested settings")
        console.log(document.getElementById('elementSettingsPage'));
    }
    //settings request came from Home Page
    if(e.target.id=="homeSettingsButton") {	console.log("home button requested settings"); }
}

