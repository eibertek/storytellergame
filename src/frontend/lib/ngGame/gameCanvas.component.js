
var app = angular.module('game', ['ngCookies']);
app.service('spritemanager',[ function(name1){
    return function(name1){
        this.name = name1;
        this.hello = function(){
            return this.name;
        }
    }
    }]
);
app.factory('notify', ['$window', function(win) {
    var msgs = [];
    return function(msg) {
        msgs.push(msg);
        if (msgs.length === 3) {
            win.alert(msgs.join('\n'));
            msgs = [];
        }
    };
}]);

app.component('gameCreator', {
    template: '<game_canvas></game_canvas>',
    controller: ['$cookies', function($cookie, spritemanager){
        this.config = {'id':"canvas1", 'width':screen.width, 'height':'800px'}
        this.$onInit = function(){
          //  console.log(this); //sss
        }
    }]
});


app.component('gameCanvas', {
    template: '<canvas id="{{$ctrl.config.id}}" width="{{$ctrl.config.width}}" height="{{$ctrl.config.height}}"></canvas>' +
    '<button ng-click="$ctrl.drawRectangle()">Dibujar</button>',
    controller: ['$cookies', '$timeout', 'spritemanager', function($cookie, $timeout, spritemanager){
        this.config = {'id':"canvas1", 'width':screen.width, 'height':'500px'}
        this.ctx = null;
        this.rect = {x:5, y:5, width: 90, height: 15, orientation:1, velocity:1, name:'SQ'};
        this.objects = [];
        this.$onInit = function(){
            var self = this;
            $timeout(function(){
                self.container = document.getElementById(self.config.id);
                self.ctx = self.container.getContext('2d');
                for(var i = 1; i< 10; i++)
                {
                    var copy = angular.copy(self.rect);
                    if(i%2==0)
                        copy.text = 'SQ_'+i;
                    copy.velocity=30+Math.random()*10;
                    copy.y = copy.height*i;
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
            });
            self.drawSprite();
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

        this.drawSprite = function(obj1){
            var sm = new spritemanager('aaaa');
            console.log(sm.hello());
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
 */