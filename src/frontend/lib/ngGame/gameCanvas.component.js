window.requestAnimFrame = (function(){
    return  function(/* function */ callback, /* DOMElement */ element){
        window.setTimeout(callback, 1000 / 60);
    };
})();

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
        this.rect = {x:15, y:15};
        this.$onInit = function(){
            var self = this;
            $timeout(function(){
                self.container = document.getElementById(self.config.id);
                self.ctx = self.container.getContext('2d');
                self.drawRectangle();
            },100);
            return this;
        }
        this.drawRectangle = function(){
            console.log(this);
            this.ctx.beginPath();
            this.ctx.rect(this.rect.x, this.rect.y, 70, 70);
            this.ctx.strokeStyle = '#000';
            this.ctx.stroke();
            this.ctx.font = '10px Arial';
            this.ctx.strokeText('SQUARE', this.rect.x, this.rect.y + 80);
            this.ctx.closePath();
            requestAnimFrame( this.drawRectangle , this);
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