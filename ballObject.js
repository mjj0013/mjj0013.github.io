var myHeaders = new Headers();
myHeaders.set("Access-Control-Allow-Origin", "*");
myHeaders.set("Access-Control-Request-Headers", "*");


var physicalObjects = [];
var physicalObjectMap = [];
var xGlobalForce = 0;
var yGlobalForce = 0;


// var containerPos = {x:}


var controlledObjectIndex = -1;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
//("circle"+obj.index, x, y, width, height, dx, dy, mass);
class BallObject {
    constructor(obj_id, x, y, width, height, xVelocity, yVelocity, mass) {
        
        this.x = x;
        this.y = y;

        this.gracePeriodIter = 0;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.width = width;
        this.height = height;
        this.mass = mass;
        this.collidable=false;
        this.radius = width;
      
        this.obj_id = obj_id;
        this.coeff_of_rest = 0.1    //aluminum

        this.isColliding = false;
        this.collidable = true;
        this.collidingObjects = [];
        this.hue=getRandomInt(0,360); 
       
        
        this.movable = true;
        this.controllable = true;

        this.collisionIter = 0;
        this.collisionIterSpeed = 5;
        this.startCollisionIter = false;
        this.circle2circle = this.circle2circle.bind(this);
        this.drawBallObj = this.drawBallObj.bind(this);
        this.updateBallObj =this.updateBallObj.bind(this);
    }
    circle2circle(circle1,circle2,isCollisionTest=false) {
       
        let squaredDist = (circle2.x-circle1.x)*(circle2.x-circle1.x) + (circle2.y-circle1.y)*(circle2.y-circle1.y);
        if(squaredDist <= (circle1.radius+circle2.radius)*(circle1.radius+circle2.radius)) {
            if(isCollisionTest) {return true;}

            circle1.isColliding = true;
            circle2.isColliding = true;
            let vCollision = {x: circle2.x - circle1.x , y: circle2.y - circle1.y}
            let dist = Math.sqrt(squaredDist);

            let vCollisionNorm = {x: vCollision.x / dist, y: vCollision.y/dist};

        
            let vRelativeVelocity = {x: circle1.xVelocity-circle2.xVelocity, y: circle1.yVelocity-circle2.yVelocity};
            let speed = (vRelativeVelocity.x * vCollisionNorm.x) + (vRelativeVelocity.y * vCollisionNorm.y);    //equal to the dot product
            //speed *= Math.min(circle1.coeff_of_rest,circle2.coeff_of_rest);

            if(speed < 0) {return false;}
            
            let impulse  = 2*speed/(circle1.mass + circle2.mass);
            if(circle1.movable) {
                circle1.startCollisionIter = true;
                circle1.xVelocity -= (impulse*circle2.mass*vCollisionNorm.x);
                circle1.yVelocity -= (impulse*circle2.mass*vCollisionNorm.y);
            }
            if(circle2.movable) {
                circle2.startCollisionIter = true;
                circle2.xVelocity += (impulse*circle1.mass*vCollisionNorm.x);
                circle2.yVelocity += (impulse*circle1.mass*vCollisionNorm.y);
            }
            return true;
        }
        return false; 
       
    }
    drawBallObj() {
        document.getElementById(this.obj_id).setAttribute('fill',`hsl(${this.hue}, 30%, 25%)`)
    }
    
    updateBallObj() {
        //console.log(this.x, this.y)
        //**************************** Object-to-Object collisions  ****************************
        ++this.gracePeriodIter;
        if(this.gracePeriodIter > 2) {
            physicalObjects.forEach((obj,index) => {
                if(obj != this) {   
                    this.circle2circle(this,obj);
                }
            })
        }
        

        
        //************************************ Inertia  ************************************
        var new_xVelocity;
        var new_yVelocity;
        //var velMag = Math.sqrt(this.xVelocity*this.xVelocity + this.yVelocity*this.yVelocity)
        // if(velMag < 1) {
        //     new_xVelocity = (this.xVelocity)*.98;
        //     new_yVelocity = (this.yVelocity)*.98;
        // }
        // else {
            new_xVelocity = (this.xVelocity+xGlobalForce)*.98;
            new_yVelocity = (this.yVelocity+yGlobalForce)*.98;
        //}
        
        
        //*********************************** Canvas Boundary Collisions *****************************************
        let containerRect= document.getElementById("ballContainer").getBoundingClientRect();
        
        
        if(this.x-this.width + new_xVelocity<=0) {                     //left
            if(xGlobalForce ==0.0) {new_xVelocity = -1*new_xVelocity;}
            else {new_xVelocity = 0.0;}
           
        }
        if(this.x + new_xVelocity >= containerRect.width-this.width) {    //right
            if(xGlobalForce ==0.0) {new_xVelocity = -1*new_xVelocity;}
            else {new_xVelocity = 0.0;}
           
        }
        if(this.y + new_yVelocity >= containerRect.height-this.height) {    //bottom
            if(yGlobalForce == 0.0) {new_yVelocity = -1*new_yVelocity;}
            else {new_yVelocity = 0.0;}
            
        }
        if(this.y - this.height + new_yVelocity <= 0) {                  //top
            if(yGlobalForce==0.0) {new_yVelocity = -1*new_yVelocity;}
            else {new_yVelocity = 0.0;}
           
        }
        
        //*********************************** Updating attributes *****************************************
        
       
       
        this.x = Math.max(Math.min(this.x + new_xVelocity, containerRect.width-this.width),0);
        this.y = Math.max(Math.min(this.y + new_yVelocity, containerRect.height-this.height),0);
        let circleElement = document.getElementById(this.obj_id);
        circleElement.setAttribute("cx", this.x);
        circleElement.setAttribute("cy",this.y);
        
        this.xVelocity = new_xVelocity;
        this.yVelocity = new_yVelocity;
        
        
    }
        
}