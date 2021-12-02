var myHeaders = new Headers();
myHeaders.set("Access-Control-Allow-Origin", "*");
myHeaders.set("Access-Control-Request-Headers", "*");


var physicalObjects = [];
var xGlobalForce = 0;
var yGlobalForce = 0;
var containerWidth = 0;
var containerHeight= 0;
class BallObject {
    constructor(obj_id, x, y, width, height, xVelocity, yVelocity, mass, color=null) {

        this.x = x;
        this.y = y;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.width = width;
        this.height = height;
        
        this.mass = mass;
        this.collidable=false;
        
        this.radius = width;
      
        this.obj_id = obj_id;

        this.trueX = x;       //true x and y are for the object's (x,y) point after rotation (in JS, the coordinates stay the same after rotation)
        this.trueY = y;

        this.trueEdges = [
            {x1:x,       y1:y,          x2:x+width,   y2:y,         label:'p1p2', length:width},
            {x1:x+width, y1:y,          x2:x+width,   y2:y+height,  label:'p2p3', length:height},
            {x1:x+width, y1:y+height,   x2:x,         y2:y+height,  label:'p3p4', length:width},
            {x1:x,       y1:y+height,   x2:x,         y2:y,         label:'p4p1', length:height}
        ];

        this.trueCorners = [
            {x:x, y:y, label:'p1'},
            {x:x+width, y:y, label:'p2'},
            {x:x+width, y:y+height, label:'p3'},
            {x:x, y:y+height, label:'p4'}
        ];
        
        this.hasShadowRect = false;
        this.drawShadowRect = false;
       

       
        this.coeff_of_rest = 0.1    //aluminum

        this.isColliding = false;
        this.collidable = true;
        this.collidingObjects = [];
        if(color==null) this.hue=getRandomInt(0,360); 
        else this.hue=color;
        
        this.movable = true;
       

        this.controllable = true;

        this.collisionIter = 0;
        this.collisionIterSpeed = 5;
        this.startCollisionIter = false;
        this.circle2circle = this.circle2circle.bind(this);
      
  
    }
    circle2circle(circle1,circle2,isCollisionTest=false) {
        //*******************************************//******************************************* */
        //http://www.jeffreythompson.org/collision-detection/table_of_contents.php
        //This example is built on code by Matt Worden
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
        //*******************************************//******************************************* */
    }
    drawBallObj() {
        
        document.getElementById(this.obj_id).setAttribute('fill',`hsl(${this.hue}, 30%, 25%)`)
        
    }
    
    updateBallObj() {
        
        //**************************** Object-to-Object collisions  ****************************
        physicalObjects.forEach((obj,index) => {
            if(obj != this) {   
                this.circle2circle(this,obj);
            }
        })

        
        //************************************ Inertia  ************************************
        let new_xVelocity = (this.xVelocity+xGlobalForce)*.98;
        let new_yVelocity = (this.yVelocity+yGlobalForce)*.98;




        //*********************************** Canvas Boundary Collisions *****************************************
        if(this.x-this.width + new_xVelocity<=0) {                     //left
            if(xGlobalForce ==0.0) {new_xVelocity = -1*new_xVelocity;}
            else {new_xVelocity = 0.0;}
            
        }
        if(this.x + new_xVelocity >= containerWidth-this.width) {    //right
            if(xGlobalForce ==0.0) {new_xVelocity = -1*new_xVelocity;}
            else {new_xVelocity = 0.0;}
            
        }
        if(this.y + new_yVelocity >= containerHeight-this.height) {    //bottom
            if(yGlobalForce == 0.0) {new_yVelocity = -1*new_yVelocity;}
            else {new_yVelocity = 0.0;}
            
        }
        if(this.y - this.height+ new_yVelocity <= 0) {                  //top
            if(yGlobalForce==0.0) {new_yVelocity = -1*new_yVelocity;}
            else {new_yVelocity = 0.0;}
            
        }

        //*********************************** Updating attributes *****************************************
        this.x = Math.max(Math.min(this.x + new_xVelocity, containerWidth-this.width),0);
        this.y = Math.max(Math.min(this.y + new_yVelocity, containerHeight-this.height),0);
        


        var circleElement = document.getElementById(this.obj_id);
        circleElement.setAttribute("cx", this.x);
        circleElement.setAttribute("cy",this.y);
        
        
        this.xVelocity = new_xVelocity;
        this.yVelocity = new_yVelocity;
        
    
    }
        
}