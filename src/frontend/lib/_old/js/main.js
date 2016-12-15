var app = angular.module('game', ['ngCookies']);

app.component('viewcookie', {
    template: '<b>Cookies Enabled {{$ctrl.cookies}}</b>',
    controller: ['$cookies', function viewCookieControler($cookie){
      this.$onInit = function(){
        this.cookies = $cookie.get('env');
      }
    }]
});

app.component('gameCanvas', {
    template: '<canvas id="{{$ctrl.config.id}}" width="{{$ctrl.config.width}}" height="{{$ctrl.config.height}}"></canvas>',
    controller: ['$cookies', function gameCanvasControler($cookie){
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