var app=angular.module("game",["ngCookies"]);app.component("viewcookie",{template:"<b>Cookies Enabled {{$ctrl.cookies}}</b>",controller:["$cookies",function(i){this.$onInit=function(){this.cookies=i.get("env")}}]}),app.component("gameCanvas",{template:'<canvas id="{{$ctrl.config.id}}" width="{{$ctrl.config.width}}" height="{{$ctrl.config.height}}"></canvas>',controller:["$cookies",function(i){this.config={id:"canvas1",width:screen.width,height:"500px"},this.$onInit=function(){game.setCanvas(new canvasClass(this.config.id)),game.isMobile()&&(game.canvas.container.width=window.innerWidth,game.canvas.container.height=window.innerHeight,input.mobile=!0),loadImages(library.images,loadingDemo)}}]});