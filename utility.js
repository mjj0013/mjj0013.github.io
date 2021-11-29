var myHeaders = new Headers();
myHeaders.set("Access-Control-Request-Headers", "*");
myHeaders.set("Access-Control-Allow-Origin", "*");



function baseColorChanged() {
    var newHue = document.getElementById("baseColor");
    var gradientStops1 = document.getElementsByClassName("gradientStop1");
    for(let i=0; i < gradientStops1.length; ++i) {
        gradientStops1[i].setAttribute("stop-color", `hsl(${newHue.value}, 70%, 30%)`)
    }

    var gradientStops2 = document.getElementsByClassName("gradientStop2");
    for(let i=0; i < gradientStops2.length; ++i) {
        gradientStops2[i].setAttribute("stop-color", `hsl(${newHue.value}, 70%, 50%)`)
        //gradientStops2[i].stopColor = `hsl(${newHue.value}, 70%, 50%)`
    }

    var gradientStops3 = document.getElementsByClassName("gradientStop3");
    for(let i=0; i < gradientStops3.length; ++i) {
        gradientStops3[i].setAttribute("stop-color", `hsl(${newHue.value}, 70%, 65%)`)
    }   
}

        
   
  

function loadTextFile(e) {
    const txt_file=document.getElementById('paragraph');
    txt_file.src = URL.createObjectURL(e.target.files[0]);
    const client = new XMLHttpRequest();
    
    client.onreadystatechange = function() {
        console.log(client.readyState);
        if(client.readyState==4) {
            if(client.status== 200) {console.log(client.responseText);}
            if(client.status== 404) {console.log('File or resource not found');}
        }


    };
    client.open('GET', e.target.files[0], true);
    client.send();
    return client;
}





function det(a,b,c,d) {
    return a*d - b*c;
}

function crossProduct(vectA, vectB) {
    let vectA_dx = vectA[1][0]-vectA[0][0];
    let vectA_dy = vectA[1][1]-vectA[0][1];

    let vectB_dx = vectB[1][0]-vectB[0][0];
    let vectB_dy = vectB[1][1]-vectB[0][1];

    let magVectA = Math.sqrt((vectA_dx)*(vectA_dx) + (vectA_dy)*(vectA_dy));
    let magVectB = Math.sqrt((vectB_dx)*(vectB_dx) + (vectB_dy)*(vectB_dy));

    let angleAB = Math.atan2(vectA_dy, vectA_dx) - Math.atan2(vectB_dy, vectB_dx);
    
    let result =  magVectA*magVectB*Math.sin(angleAB);

    console.log('result', result)
    return result;


}

function replaceAll(str,find,replace) {
    return str.replace(new RegExp(find.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'), 'g'), replace)
};


function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (pi/180);
}




function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }









