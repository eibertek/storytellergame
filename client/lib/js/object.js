var object=function(img,gravity,position,width,height,bounds,options){this.img=null,this.name="",this.id=Math.random().toString(36).substr(2),this.gravity=!0,this.position=new game.canvas.vector(0,0),this.width=0,this.height=0,this.bounds={},this.extra={},this.life=0,this.ethereal=!1,this.visible=!1,this.movable=!0,this.grounded=!1,this.creature=!1,this.touched=!1,this.enemyVelocity=3,this.velX=0,this.velY=0,this.speed=3,this.self=this,this.floor=!1,this.limitWall=!1,this.status=null,this.orientation=null,this.objectives=null,this.sprite=null,this.create=function(img,gravity,position,width,height,options){if("undefined"!=typeof img&&null!=img&&(this.img=img),"undefined"!=typeof gravity&&(this.gravity=gravity),"undefined"!=typeof position&&position instanceof game.canvas.vector&&(this.position=position),"undefined"!=typeof width&&(this.width=width),"undefined"!=typeof height&&(this.height=height),"undefined"!=typeof options&&(this.ethereal=options.ethereal,"undefined"!=typeof options.movable&&(this.movable=options.movable),"undefined"!=typeof options.floor&&(this.floor=options.floor),"undefined"!=typeof options.name&&(this.name=options.name),"undefined"!=typeof options.limitWall&&(this.limitWall=options.limitWall),"undefined"!=typeof options.creature&&(this.creature=options.creature),"undefined"!=typeof options.life&&(this.life=options.life),"undefined"!=typeof options.visible?this.visible=options.visible:this.visible=!1,"undefined"!=typeof options.enemyVelocity&&(this.enemyVelocity=options.enemyVelocity),"undefined"!=typeof options.sprite))if(this.sprite=options.sprite,"undefined"!=typeof this.sprite.static&&this.sprite.static);else{with(this.sprite.left)spritesheet=new SpriteSheet(img,spritesheet[0],spritesheet[1]),idle=new Animation(spritesheet,idle[0],idle[1],idle[2]),destroy=new Animation(spritesheet,destroy[0],destroy[1],destroy[2]);with(this.sprite.right)spritesheet=new SpriteSheet(img,spritesheet[0],spritesheet[1]),idle=new Animation(spritesheet,idle[0],idle[1],idle[2]),destroy=new Animation(spritesheet,destroy[0],destroy[1],destroy[2])}},this.animate=function(i,t){if(null===this.sprite)return!1;if(this.sprite.static)game.canvas.drawImage(this.sprite.img,this.self.position.x,this.self.position.y,this.width,this.height,{});else switch(this.orientation==constants.RIGHT?spriteTemp=this.sprite.left:spriteTemp=this.sprite.right,this.status){case constants.IDLE:spriteTemp.idle.update(),spriteTemp.idle.draw(this.self.position.x-10,this.self.position.y-15);break;case constants.DESTROY:spriteTemp.attack.update(),spriteTemp.attack.draw(this.self.position.x-10,this.self.position.y-15);break;default:spriteTemp.idle.update(),spriteTemp.idle.draw(this.self.position.x-10,this.self.position.y-15)}this.movement(t)},this.movement=function(i){this.self.movable&&!this.self.floor&&(this.self.velX*=game.phisics.friction,this.self.velY+=game.phisics.gravity,this.self.grounded=!1,this.colliding(),this.self.grounded&&(this.self.velY=0),this.self.position.y+=this.self.velY),(input.key_code[39]||input.key_code[68]||input.key_code[37]||input.key_code[65])&&(this.touched=!1),game.centered>0&&(this.self.position.x+=this.self.velX-game.centerVelocity)},this.colliding=function(){for(var i=0;i<game.objects.length;i++)if(!game.objects[i].ethereal&&this.self.id!=game.objects[i].id&&!game.objects[i].limitWall){var t=game.colCheck(this.self,game.objects[i]);"l"===t||"r"===t?this.self.velX=0:"b"===t?this.self.grounded=!0:"t"===t&&(this.self.velY*=-1)}},this.create(img,gravity,position,width,height,bounds,options)};