/// <reference path="config/common.ts" />
/// <reference path="lib/gameVector.ts" />
/// <reference path="lib/gameCanvas.ts" />
/// <reference path="lib/gameInput.ts" />
/// <reference path="lib/sprites.ts" />

interface Window { input: any; mozRequestAnimationFrame:any; webkitRequestAnimationFrame:any; }

window.input = window.input || {};

class game {
    date= new Date();
    players= new Array();
    objects= new Array();
    background= new Array();
    objectives= new Array();
    creatures= new Array();
    controllers= new Array();
    collectables= new Array();
    screenPlay= null;
    debugData= [];
    endScreen= false;
    canvas = null;
    input = null;
    pauseInput=false;
    cinematics=false;
    centered=0;
    centerVelocity=5;
    statusGame=null;
    score=0;
    activeObjective=null;
    sceneActions=function(){};
    titleScreen= false;
    self = null;
    nameId = null;
    config = new config();
    constructor(canvasId, nameId){
        this.canvas = new gameCanvas(canvasId);
        this.nameId = nameId;
        let self = this;
        window.input = new gameInput(self);
    };

    public isMobile(){
     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
     return false;
    };

    public collisionCheck(objectA, objectB){
            // get the vectors to check against
            var vX = (objectA.position.x + (objectA.width / 2)) - (objectB.position.x + (objectB.width / 2)),
                vY = (objectA.position.y + (objectA.height / 2)) - (objectB.position.y + (objectB.height / 2)),
                // add the half widths and half heights of the objects
                hWidths = (objectA.width / 2) + (objectB.width / 2),
                hHeights = (objectA.height / 2) + (objectB.height / 2),
                colDir = null;

            // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
            if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
                // figures out on which side we are colliding (top, bottom, left, or right)
                var oX = hWidths - Math.abs(vX),
                    oY = hHeights - Math.abs(vY);
                if (oX >= oY) {
                    if (vY > 0) {
                        colDir = "t";
                    } else {
                        colDir = "b";
                    }
                } else {
                    if (vX > 0) {
                        colDir = "l";
                    } else {
                        colDir = "r";
                    }
                }
            }
            return colDir;
    }

    drawBackground(){
        for(var c=0; c < this.background.length; c++ ){
            this.background[c].animate('');
        }
    };
    drawCreatures(){
        for(var c=0; c < this.creatures.length; c++ ){
            this.creatures[c].animate('');
        }    
    };
    drawObjects(){
        for(var c=0; c < this.objects.length; c++ ){
            this.objects[c].animate('');
        }    
    };   
    drawControllers(){
        for(var c=0; c < this.controllers.length; c++ ){
            this.controllers[c].animate('');
        }    
    };     
    drawCollectables(){
        for(var c=0; c < this.collectables.length; c++ ){
            this.collectables[c].animate('');
        }    
    };     
    drawObjectives(){
        for(var c=0; c < this.objectives.length; c++ ){
            this.objectives[c].animate();
        }    
    };     
    drawCharacters(displaceX=''){
        for(var c=0; c < this.players.length; c++ ){
            this.players[c].animate(displaceX);
        } 
    };
   disableInput(){
                this.pauseInput= true;
                document.body.removeEventListener("keydown",window.input.onKeyDown);
                document.body.removeEventListener("keyup",window.input.onKeyUp);
    };
   enableInput(){
        this.pauseInput= false;
        console.log(eval(this.nameId));
       document.body.addEventListener("keydown",window.input.onKeyDown);
       document.body.addEventListener("keyup", window.input.onKeyUp);
    };
    enableMouse(){
        document.body.addEventListener("mousemove",window.input.mouseMove);
        document.body.addEventListener("mousedown",window.input.mouseDown);
        document.body.addEventListener("mouseup", window.input.mouseUp);
    };
    renderMainScreen(){
        this.titleScreen= true;
       // TitleScreen();
    };
    addPlayer(player){
        this.players.push(player);
    };
    addObject(object){
        this.objects.push(object);
    };
    addCollectable(object){
        this.collectables.push(object);
    }   
    addBackground(object){
           this.background.push(object);
    };
    addObjective(object){
        this.objectives.push(object);
    };    
    addCreature(object){
        this.creatures.push(object);
    };    
    addController(object){
        this.controllers.push(object);
    };    
    setCanvas(canvas){
        this.canvas = canvas;
    };    
    removeCreature(id){
        for (var i = 0; i < this.creatures.length; i++) {
            if(this.creatures[i].id==id){
                if(typeof(this.creatures[i].objectives.onDie)==='function') this.creatures[i].objectives.onDie();
                this.creatures.splice(i,1); 
                return true;
            }
       }
       return false;
    };
    removeCollectable(id){
        for (var i = 0; i < this.collectables.length; i++) {
            if(this.collectables[i].id==id){
                this.collectables.splice(i,1);    
                return true;
            }
       }
       return false;
    };   
    getObjective(id){
        for (var i = 0; i < this.objectives.length; i++) {
            if(this.objectives[i].id==id){
                return this.objectives[i];
            }
       }
       return false;
    };     
    getCreatureByName(name){
        for (var i = 0; i < this.creatures.length; i++) {
            if(this.creatures[i].name==name){
                return this.creatures[i];
            }
       }
       return false;
    };  
    getCollectableByName(name){
        for (var i = 0; i < this.collectables.length; i++) {
            if(this.collectables[i].name==name){
                return this.collectables[i];
            }
       }
       return false;
    };    
    doCinematics(){};
    centerAll(){
        //objects
        //player
        //Background
        //objectives
        //creatures
       if(this.centered>0){
          this.centered-=3;
      }
    };
    clearFinishedObjectives(){
        for(var c=0; c < this.objectives.length; c++ ){
            if(this.objectives[c].finish){
                this.objectives[c].doObjectives();
                this.objectives.splice(c,1);
            }
        }    
    }

    render(){
        var self = this;
        this.canvas.clearAll();
        this.canvas.drawText('Day: '+new Date().getSeconds(),{color:'#000', x:1, y:30,font:'30px Arial'});
        requestAnimationFrame(function(){
                            self.render();
                        });          
    }

    
}

(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

