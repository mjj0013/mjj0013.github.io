var myHeaders = new Headers();
myHeaders.set("Access-Control-Allow-Origin", "*");



window.onload = () =>{
    

    var sw = new SettingsModal();
  
    sw.makeDraggable("swh");
    
    console.log("iqiq");
    sw.style.display="block";


}


function toggleSettings(e) {
    let w = document.getElementById("sw");
    
    if(w.style.display=="none" || w.style.display=='') { w.style.display="block"; }
    else w.style.display="none";

    

    console.log("ehre", w.style.display)
}


class SettingsModal {

    constructor(props) {
        
        
        this.makeDraggable = this.makeDraggable.bind(this);
        this.closeDragElement = this.closeDragElement.bind(this);
        this.elementDrag = this.elementDrag.bind(this);
        this.dragMouseDown = this.dragMouseDown.bind(this);

        this.applySettings = this.applySettings.bind(this);
        this.settingsChanged = this.settingsChanged.bind(this);

    }


    settingsChanged = (e) => {



    }

    applySettings = (e) => {



    }
    closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
    elementDrag(e) {
        
        e = e || window.event;
        
        e.preventDefault();
        this.posPrediction.pos1 = this.posPrediction.pos3 - e.clientX;
        this.posPrediction.pos2 = this.posPrediction.pos4 - e.clientY;

        this.posPrediction.pos3 = e.clientX;
        this.posPrediction.pos4 = e.clientY;

        let w = document.getElementById("sw");
        w.style.top = (w.offsetTop - this.posPrediction.pos2) + "px";
        w.style.left = (w.offsetLeft - this.posPrediction.pos1) + "px";
        return false;
    }
    dragMouseDown(e) {
        
        e = e || window.event;
        e.preventDefault();
        this.posPrediction.pos3 = e.clientX;
        this.posPrediction.pos4 = e.clientY;
        document.onmouseup = this.closeDragElement;
        document.onmousemove = this.elementDrag;


    }

    makeDraggable(item_id) {
        var item = document.getElementById(item_id)
        this.posPrediction = {pos1:0, pos2:0, pos3: 0, pos4:0}
        item.onmousedown = this.dragMouseDown;
        item.onfocus = this.dragMouseDown;
    }
}

// export {SettingsModal};