var app = angular.module('game', ['ngCookies']);
app.factory('spritemanager', function(name1){
    this.name = name1;
    return this.name;
});

app.component('gamecreator', {
    template: '<gamecanvas></gamecanvas>',
    controller: ['$cookies', function($cookie, spritemanager){
        this.config = {'id':"canvas1", 'width':screen.width, 'height':'500px'}
        this.$onInit = function(){
console.log($ctrl); //sss
        }
    }]
});


app.component('gamecanvas', {
    template: '<canvas id="{{$ctrl.config.id}}" width="{{$ctrl.config.width}}" height="{{$ctrl.config.height}}"></canvas>',
    controller: ['$cookies', function($cookie, spritemanager){
        this.config = {'id':"canvas1", 'width':screen.width, 'height':'500px'}
        this.$onInit = function(){
            this.container = document.getElementById($ctrl.config.id);
            console.log(containerId, this.container);
            this.ctx = this.container.getContext('2d');
            return this;
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