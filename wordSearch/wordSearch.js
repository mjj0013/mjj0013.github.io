
var myHeaders = new Headers();
myHeaders.set("Access-Control-Allow-Origin", "*");
myHeaders.set("Access-Control-Request-Headers", "*");


//document.getElementById("textFileInput").onchange = (e) => {loadText(e)}
var textsDb = {};   //will have format like:        {"text_file.txt": {vocab:[(word, index)], fullStr:""}}

function loadText(event) {
   
    event.preventDefault();
    const reader = new FileReader();
    if(textsDb[event.target.files[0]]==undefined) textsDb[event.target.files[0]] = {"vocab":[], };
    reader.onload = (event) => {

        var text=(event.target.result);
        textsDb[event.target.files[0]].fullStr = text;
        var words  = text.split(' ');
        
        words.sort(function(x,y){return x.localeCompare(y)})
        

        words.forEach((w) => {
            document.getElementById("fileText").value += w;
            document.getElementById("fileText").value += " ";
        });            
    };
    reader.readAsText(event.target.files[0]);


}