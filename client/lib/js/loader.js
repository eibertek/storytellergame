function sound(n){this.sound=document.createElement("audio"),this.sound.src=n,this.sound.setAttribute("preload","auto"),this.sound.setAttribute("controls","none"),this.sound.style.display="none",document.body.appendChild(this.sound),this.play=function(){this.sound.play()},this.stop=function(){this.sound.pause()}}function loadImages(n,e){var o={},t=0;for(var i in n)t++;for(var a=0;a<n.length;a++)tmp=n[a],o[tmp.name]=new Image,o[tmp.name].onload=function(){e(o)},o[tmp.name].name=tmp.name,o[tmp.name].src=tmp.src}function getImage(n){for(var e=0;e<library.loadImages.length;e++)if("char1"==library.loadImages[e].name)return library.loadImages[e];return!1}!function(){var n=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;window.requestAnimationFrame=n}();var handlerKeyDown=function(n){input.onKeyDown(n)},handlerKeyUp=function(n){input.onKeyUp(n)},handlerMouseMove=function(n){input.mouseMove(n)},handlerMouseDown=function(n){input.mouseDown(n)},handlerMouseUp=function(n){input.mouseUp(n)};