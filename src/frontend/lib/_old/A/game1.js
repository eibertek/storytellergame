/*
Primer juego
*/
// Nivel 1:
var library = {};
var rootimg = '/assets/img/';
library.images = [{ name:'citybackground', src:rootimg +'citybackground.png'},
                 { name:'cityclouds', src:rootimg +'cityclouds.png'},
                 { name: 'trashcan', src:rootimg +'trashcan.PNG'},
               { name:'char1', src:rootimg +'char1.png' },
               { name: 'enemy1', src:rootimg +'enemy1.png'},
               { name: 'blood', src:rootimg +'blood.png'},
               { name: 'boss', src:rootimg +'boss.png' },
               { name: 'enemy2', src:rootimg +'enemy2.png' },
               { name: 'skeleton', src:rootimg +'skeleton.png' },
               { name: 'coinBig', src:rootimg +'coin.png' },
               { name: 'coin', src:rootimg +'coin2.png' },
               { name: 'bcgIntro', src:rootimg +'bcgIntro.jpg' },
               { name: 'btnStart', src:rootimg +'btnstart.png' },
               { name: 'logo', src:rootimg +'Logo name.png' },
               { name: 'winnerMessage', src:rootimg +'winner message.png' },
               { name: 'keysControl', src:rootimg +'keys.png' },
               { name: 'keysControl2', src:rootimg +'shadowkeys.png' },
               { name: 'attackButton', src:rootimg +'attack.png' },
               { name: 'explosion', src:rootimg +'explosion.png' },
               { name: 'life', src:rootimg +'heart.png' }];
library.total = library.images.length;
library.count = 0;
library.percentFull = 0;
library.loadImages = {};

setupCanvas = function() {
   game.enableMouse();
   game.enableInput();
   startGame();
   game.renderMainScreen();
//   game.render();
} 

function loadingDemo(images){
              library.count++;
              library.percentFull = library.count * 100  / library.total;
              library.loadImages = images;
              loadBar(library.percentFull, screenGame);;
};
function loadBar(percent, callback){
    game.canvas.ctx.clearRect(0, 0, game.canvas.container.width, game.canvas.container.height);
    game.canvas.drawRect(new game.canvas.vector(game.canvas.container.width/2 - 200,
                                                game.canvas.container.height/2 - 45),
                            90, 400,{color:'#FF0000', name:name});
    game.canvas.fillRect(new game.canvas.vector(game.canvas.container.width/2 - 200,
                                                game.canvas.container.height/2 - 45),
                        90, percent*400 / 100,{color:'#FF0000', name:name});
    if(percent==100) callback();
}

function screenGame(){
    setupCanvas();
  //  $(document).append("<button onclick='alert(\"hola\")'></button>");
}

  if(game.isMobile() && screen.orientation.angle==0){
      alert("Please use in Landscape :)");
      window.location.reload();
  }
// Listen for orientation changes
window.addEventListener("orientationchange", function(e) {
  // Announce the new orientation number
  if(screen.orientation.angle==0){
      alert("Please use in Landscape :)");
  } 
      window.location.reload();  
}, false);

function startGame(){
    Level0();
    if(game.isMobile()){
        loadControllers();
    }
 //   Test();
    game.enableInput();
}

function reset(){
    window.location.reload();
}
function finishGame(win){
            game.disableInput();
            game.canvas.ctx.clearRect(0, 0, game.canvas.container.width, game.canvas.container.height);
            if(win!==true){
                game.canvas.drawText('You Lose',{color:'#000', x:game.canvas.container.width/3});
            }else{
                game.canvas.drawText('Finish!!',{color:'#000', x:game.canvas.container.width/3});
                game.canvas.drawImage(library.loadImages.winnerMessage,1,10,650,296,{});
            }
            window.setTimeout(reset,5000);
            //agregar boton Restart
}
/*     ****************************************************         */
/*game.setCanvas(new canvasClass('canvas_ppg'));
if(game.isMobile()){
    game.canvas.container.width  = window.innerWidth;
    game.canvas.container.height = window.innerHeight;
    input.mobile=true;
}
loadImages(library.images, loadingDemo);


(function() {
    try {
        var $_console$$ = console;
        Object.defineProperty(window, "console", {
            get: function() {
                if ($_console$$._commandLineAPI)
                    throw "Sorry, for security reasons, the script console is deactivated on eibertek.com";
                return $_console$$
            },
            set: function($val$$) {
                $_console$$ = $val$$
            }
        })
    } catch ($ignore$$) {
    }
})();
*/