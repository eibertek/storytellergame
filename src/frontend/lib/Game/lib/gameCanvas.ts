/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class gameCanvas
{
    container = null;
    ctx = null;
    constructor(containerId){
        this.container = document.getElementById(containerId);
        console.log(containerId,this.container);
        this.ctx = this.container.getContext('2d');
        return this;
    }
    drawLine(origin, destiny, options){
        this.ctx.beginPath();
        if(origin instanceof gameVector){
            this.ctx.moveTo(origin.x,origin.y);
            this.ctx.lineTo(destiny.x,destiny.y);
            if( typeof(options) != "undefined" ){
                this.ctx.strokeStyle=options.color;
            }else{
                this.ctx.strokeStyle="#000";
            }
            this.ctx.stroke();
            this.ctx.closePath();
        }else{
            throw new Error('los objetos deben ser vectores');
        };        
    };    
    drawRect(origin, height, width, options){
        if(origin instanceof gameVector){
            this.ctx.beginPath();
    //        this.ctx.globalCompositeOperation='destination-over';
            this.ctx.rect(origin.x,origin.y,width,height);
            this.ctx.strokeStyle=options.color;
            this.ctx.stroke();
            this.ctx.font = '10px Arial';
            this.ctx.strokeText(options.name,origin.x,origin.y+height+10);
            this.ctx.closePath();
        }
    };
    fillRect(origin, height, width, options){
        if(origin instanceof gameVector){
            this.ctx.fillStyle=options.color;
            this.ctx.fillRect(origin.x,origin.y,width,height);
        }
    };
    drawImage(img, posx, posy, width, height, options){
        if(img===null || img=="") return false;
        if( typeof(options.repeatX) != "undefined" ){
            var totalwidth = width;
            this.ctx.drawImage(img, posx, posy, img.width, height);
            var drawedWidth=img.width;
            while(totalwidth>0){
                this.ctx.drawImage(img, drawedWidth-6 + posx, posy, img.width, height);
                totalwidth-=img.width;
                drawedWidth+=img.width;
            }
         }else{
            this.ctx.drawImage(img, posx, posy, width, height);
         }
    };
    drawSpriteImage(img, sx, sy, sw, sh, x, y, w, h){
        if(img===null || img=="") return false;
        this.ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
    };      
    drawChar(origin, imgOptions, options){
        if(origin instanceof gameVector){
            this.ctx.drawImage(imgOptions.img, 
                               origin.x, 
                               origin.y, 
                               imgOptions.srcwdth, 
                               imgOptions.srchght,
                               0,
                               0,
                               imgOptions.srcwdth, 
                               imgOptions.srchght                               
                               );
            this.ctx.beginPath();
            this.ctx.strokeStyle=options.color;
            this.ctx.stroke();
            this.ctx.font = '10px Arial';
            this.ctx.strokeText(options.name,origin.x,origin.y+imgOptions.srchght+10);
            this.ctx.closePath();
        }
    };
    drawText(text, options){
            this.ctx.beginPath();
            this.ctx.strokeStyle='#000';
           if(typeof(options.font)!= "undefined"){
                this.ctx.font = options.font;
            }else{
                this.ctx.font = '50px Arial';                
            }   
            let positionX = this.container.width/2-50;
            let positionY = this.container.height/2;
            if(typeof(options.color)!= "undefined"){
                this.ctx.fillStyle = options.color;
            }
            if(typeof(options.x)!= "undefined"){
                positionX = options.x;
            }
            if(typeof(options.y)!= "undefined"){
                positionY = options.y;
            }            
            this.ctx.fillText(text,positionX, positionY);
            this.ctx.closePath();
    };
    clearAll(){
       this.ctx.clearRect(0, 0, this.container.width, this.container.height); 
    }
    setImgOptions = function(img, originX, originY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight, textEnabled){
        return {
            img: img, 
            srcx: originX, 
            srcy: originY, 
            srcwdth: sourceWidth, 
            srchght: sourceHeight,
            destX: destinationX, 
            destY: destinationY,
            destwdth: destinationWidth, 
            desthght: destinationHeight,
            text: textEnabled
        }
        
    };
    
}


