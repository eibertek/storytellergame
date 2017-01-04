
var app = angular.module('game', ['ngCookies']);
app.factory('spritemanager', function(name1){
    this.name = name1;
    return this.name;
});

app.component('gameCreator', {
    template: '<game_canvas></game_canvas>',
    controller: ['$cookies', function($cookie, spritemanager){
        this.config = {'id':"canvas1", 'width':screen.width, 'height':'200px'}
        this.$onInit = function(){
            console.log(this); //sss
        }
    }]
});


app.component('gameCanvas', {
    template: '<canvas id="{{$ctrl.config.id}}" width="{{$ctrl.config.width}}" height="{{$ctrl.config.height}}"></canvas>' +
    '<button ng-click="$ctrl.drawRectangle()">Dibujar</button>',
    controller: ['$cookies', '$timeout', function($cookie, $timeout, spritemanager){
        this.config = {'id':"canvas1", 'width':screen.width, 'height':'500px'}
        this.ctx = null;
        this.rect = {x:5, y:5, width: 90, height: 15, orientation:1, velocity:1};
        this.objects = [];
        this.$onInit = function(){
            var self = this;
            $timeout(function(){
                self.container = document.getElementById(self.config.id);
                self.ctx = self.container.getContext('2d');
                for(var i = 1; i< 240; i++)
                {
                    var copy = angular.copy(self.rect);
                    copy.velocity=10+Math.random()*10;
                    copy.y = copy.height*i + 15*i;
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
                console.log(object1.x , object1.x + object1.width, self.config.width);
                if(object1.x < 0 || object1.x + object1.width > self.config.width )
                    object1.orientation*= -1;
                object1.x+=object1.velocity*object1.orientation;
            });
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
            this.ctx.font = '10px Arial';
            this.ctx.strokeText('SQUARE', obj1.x, obj1.y + obj1.height+10);
            this.ctx.closePath();
        }
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