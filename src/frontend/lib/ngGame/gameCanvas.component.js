
angular.module('game', ['ngCookies'])
.service('spritemanager',[ function(image, frameWidth, frameHeight){
    return function(image, frameWidth, frameHeight){
        this.spriteSheet = null;
        this.image = image;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        var root = this;
        this.init = function() {
            root.framesPerRow = Math.floor(root.image.width / root.frameWidth);
            root.spriteSheet = this;
        }

        this.Animation = function(frameSpeed, startFrame, endFrame, runOnce) {
            var animationSequence = [];  // array holding the order of the animation
            var currentFrame = 1;        // the current frame to draw
            var counter = 0;             // keep track of frame rate
            this.endAnimation=false;
            this.debugInfo = [];
            self = this;
            var runOnceTemp = (typeof(runOnce) !== "undefined") ? runOnce  : false;
            // create the sequence of frame numbers for the animation
            for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++){
                animationSequence.push(frameNumber);
           //     console.log(frameNumber, currentFrame, animationSequence);
            }
            // Update the animation
            this.update = function() {
                if(runOnceTemp && self.endAnimation){
                    self.debugInfo = [self.endAnimation,currentFrame, endFrame];
                    return false;
                }
                // update to the next frame if it is time
                if (counter == (frameSpeed - 1))
                    currentFrame = (currentFrame + 1) % animationSequence.length;
                // update the counter
            //    console.log(currentFrame, counter, animationSequence.length);
                counter = (counter + 1) % frameSpeed;
            };

            // draw the current frame
            this.draw = function(x, y) {
                // get the row and col of the frame
                var row = Math.floor(animationSequence[currentFrame] / root.framesPerRow);
                var col = Math.floor(animationSequence[currentFrame] % root.framesPerRow);
            //    console.log(col, row, animationSequence[currentFrame]);
             /*   console.log({ frames: root.framesPerRow,  col:col, row:row, img:root.image,
                    sx:col * root.frameWidth,
                    sy:row * root.frameHeight,
                    sw:root.frameWidth,
                    sh:root.frameHeight,
                    x:x,
                    y:y,
                    w:root.frameWidth,
                    h:root.frameHeight
                });*/
                return { img:root.image,
                        sx:Math.random()*10, // desplazamiento en x interno
                        sy:row * 0,  // desplazamiento en y interno
                        sw:root.frameWidth, //dimenxion x interna
                        sh:root.frameHeight, // dimension y interna
                        x:x,
                        y:y,
                        w:root.frameWidth,
                        h:root.frameHeight
                }
            };

            this.reset = function(){
                self.endAnimation=false;
                currentFrame = 0;
                counter = 0;
            };
        }
        this.init();
        return this;
    }
    }]
)
.factory('notify', ['$window', function(win) {
    var msgs = [];
    return function(msg) {
        msgs.push(msg);
        if (msgs.length === 3) {
            win.alert(msgs.join('\n'));
            msgs = [];
        }
    };
}])
.component('gameCreator', {
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
    controller: ['$cookies', '$timeout', 'spritemanager', function($cookie, $timeout, spritemanager){
        this.config = {'id':"canvas1", 'width':screen.width, 'height':'500px'}
        this.ctx = null;
        this.rect = {x:5, y:5, width: 131, height: 154, orientation:1, velocity:1, name:'SQ'};
        this.objects = [];
        this.$onInit = function(){
            var self = this;
            $timeout(function(){
                self.container = document.getElementById(self.config.id);
                self.ctx = self.container.getContext('2d');
                for(var i = 0; i< 4; i++)
                {
                    var copy = angular.copy(self.rect);
                    if(i%2==0)
                        copy.text = 'SQ_'+i;
                    copy.velocity=01+Math.random();
                    copy.y = copy.height*i;
                    var img = images.trashcan;
                        copy.spritesheet = new spritemanager(img, 131, 154);
                        copy.spritesheet.idle = new copy.spritesheet.Animation( 14, 1, 1, true);
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
                self.drawRectangle(object1);
                if(object1.x < 0 || object1.x + object1.width > self.config.width )
                    object1.orientation*= -1;
                object1.x+=object1.velocity*object1.orientation;
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
            }, 1);
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
         //   console.log(values.img,this.ctx);
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