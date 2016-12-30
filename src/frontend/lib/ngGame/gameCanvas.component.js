var app = angular.module('game', ['ngCookies']);
app.factory('spriteManager', function(){});
app.component('gameCanvas', {
    template: '<canvas id="{{$ctrl.config.id}}" width="{{$ctrl.config.width}}" height="{{$ctrl.config.height}}"></canvas>',
    controller: ['$cookies', spriteManager, function gameCanvasControler($cookie, spriteManager){
        this.config = {'id':"canvas1", 'width':screen.width, 'height':'500px'}
        this.$onInit = function(){
            game.setCanvas(new canvasClass(this.config.id));
            if(game.isMobile()){
                game.canvas.container.width  = window.innerWidth;
                game.canvas.container.height = window.innerHeight;
                input.mobile=true;
            }
            loadImages(library.images, loadingDemo);
        }
    }]
});

/**
 * TODO
 * 
 * En la  
 * 
 * 
 */