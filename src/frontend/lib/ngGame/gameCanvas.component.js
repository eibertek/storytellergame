
angular.module('game').component('gameCreator', {
    template: '<game_canvas></game_canvas>',
    controller: ['$cookies', function($cookie, spritemanager){
        this.config = {'id':"canvas1", 'width':screen.width, 'height':'800px'}
        this.$onInit = function(){
          //  console.log(this); //sss
        }
    }]
});

var images = {};
images.trashcan = new Image();
images.trashcan.src =  '/assets/img/trashcan.PNG';

angular.module('game').component('gameCanvas', {
    template: '<canvas id="{{$ctrl.config.id}}" width="{{$ctrl.config.width}}" height="{{$ctrl.config.height}}"></canvas>' +
    '<button ng-click="$ctrl.drawRectangle()">Dibujar</button>',
    controller: ['$cookies', '$timeout', 'spritemanager', 'gameObject', function($cookie, $timeout, spritemanager, gameObject){
        this.config = {'id':"canvas1", 'width':screen.width, 'height':'500px'}
        this.ctx = null;
        this.rect = {x:5, y:5, width: 131, height: 154, orientation:1, velocity:1, name:'SQ'};
        this.objects = [];
        this.$onInit = function(){
            var self = this;
            $timeout(function(){
                self.container = document.getElementById(self.config.id);
                self.ctx = self.container.getContext('2d');
                for(var i = 0; i< 2; i++)
                {
                    var img = images.trashcan;
                    var copy = new gameObject({x:30,y:154*i,img:img, width:131, height:154});
                    copy.name ='OBJETO__'+i;
                    self.objects.push(copy);
                }
                self.draw();
            },100);
            return this;
        }
        this.draw = function(){
            this.clearAll();
            var self = this;
            this.objects.forEach(function(object1){
          //      self.drawRectangle(object1);
                if(object1.x < 0 || object1.x + object1.width + 100 > self.config.width ){
                    object1.physics.orientation*= -1;
                    console.log(object1.name, object1.x);
                }
                object1.x+=object1.physics.velX * object1.physics.orientation;
                self.drawSprite(object1);
            });
            // values.sx, values.sy, values.sw, values.sh, values.x, values.y, values.w, values.h
        /*    this.ctx.drawImage(
                    images.trashcan,
                    0,
                    0,
                    200,
                    200,
                    this.objects[0].x,
                    this.objects[0].y,
                    200,
                    200);*/
            $timeout(function(){
                self.draw();
            }, 10);
        }

        this.clearAll = function() {
            this.ctx.clearRect(0, 0, this.container.width, this.container.height);
        }

        this.drawRectangle = function(obj1){
            this.ctx.beginPath();
            this.ctx.rect(obj1.x, obj1.y, obj1.width, obj1.height);
            this.ctx.strokeStyle = '#000';
            this.ctx.stroke();
            this.ctx.font = '8px Arial';
            if(obj1.text && obj1.text!=''){
                this.ctx.strokeText(obj1.text, obj1.x, obj1.y + obj1.height+10);
            }
            this.ctx.closePath();
        }

        this.drawImage = function(img, posx, posy, width, height, options){
            if(img===null || img=="") return false;
            if( typeof(options.repeatX) != "undefined" ){
                totalwidth = width;
                this.ctx.drawImage(img, posx, posy, img.width, height);
                drawedWidth=img.width;
                while(totalwidth>0){
                    this.ctx.drawImage(img, drawedWidth-6 + posx, posy, img.width, height);
                    totalwidth-=img.width;
                    drawedWidth+=img.width;
                }
            }else{
                this.ctx.drawImage(img, posx, posy, width, height);
            }
        };
        this.drawSpriteImage = function(values){
            if(values.img===null || values.img=="") return false;
            this.ctx.drawImage(values.img, values.sx, values.sy, values.sw, values.sh, values.x, values.y, values.w, values.h);
        };

        this.drawSprite = function(obj1){
            obj1.spritesheet.idle.update();
            this.drawSpriteImage(obj1.spritesheet.idle.draw(obj1.x, obj1.y));
        };
    }]
});

/**
 * TODO
 *
 * Crear componente gameCanvas
 *  en gameCanvas tengo que tener los metodos que tiene canvas
 *
 *  Canvas
 *    ---- objetos
 *    -------sprites
 *
 *    <gameCreator>
 *        <gameCanvas></gameCanvas>
 *    </gameCreator>
 *
 * teniendo el spritemanager que se encarga de cada uno de los objectos
 *  crear la factory object, que permita generar los distintos objetos
 *
 *
 */