class gameObject
{
    img= null;
    name= '';
    id = Math.random().toString(36).substr(2);
    gravity= true;
    position= new gameVector(0,0);
    width = 0;
    height = 0;
    bounds = {};
    extra = {};
    life = 0;
    ethereal = false;
    visible = false;
    movable = true;
    grounded = false;
    creature = false;
    touched=false;
    enemyVelocity=3;
    velX = 0;
    velY = 0;
    speed= 3; 
    self = this;
    floor= false;
    limitWall = false;
    status = null;
    orientation = null;
    objectives = null;
    sprite = null;    
    constructor(){

    }
}