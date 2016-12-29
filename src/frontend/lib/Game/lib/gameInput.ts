/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class gameInput
{
    key_a=65;
    key_b=66;
    key_c=67;
    key_d=68;
    key_e=69;
    key_f=70;
    key_g=71;
    key_h=72;
    key_i=73;
    key_j=74;        
    key_k=75;        
    key_l=76;        
    key_m=77;        
    key_n=78;        
    key_o=79;        
    key_p=80;        
    key_q=81;        
    key_r=82;        
    key_s=83;        
    key_t=84;        
    key_u=85;        
    key_v=86;        
    key_w=87;        
    key_x=88;        
    key_y=89;        
    key_z=90;        
    key_left=37;        
    key_up=38;        
    key_right=39;        
    key_down=40;        
    key_space=32;        
    key_enter=13;
    key_backspace=8;
    key_F3= 114;
    key_F4= 115;
    key_F5= 116;
    prevent_default=false;
    key_code=[];
    key_press=[];
    mouse= {
        x: 0,
        y: 0,
        clicked: false,
        down: false
    };
    move={left:false, up:false, right:false, down:false, attack:false};
    actions={btnStart:false};
    // Areas (objects) on the screen that can be touched
    touchableAreas= [];
    touchableAreasCount= 0;
    // Multi-touch
    touches= [];
    // Canvas offset on page (for coverting touch coordinates)
    offsetX= 0;
    offsetY= 0;
    mobile= false;
    parent = null;
    self = window.input;
    constructor(game){
        this.parent = game;
       console.log(this.parent);
    }
    movingKeyMappingDown(){
        var self = window.input;
        if (self.key_code[38]===true || self.key_code[87]===true) self.move.up = true;
        if (self.key_code[self.key_down]===true || self.key_code[self.key_s]===true) self.move.down = true;
        if (self.key_code[39]===true || self.key_code[68]===true) self.move.right = true;
                if (self.key_code[37]===true || self.key_code[65]===true) self.move.left = true;
                if (self.key_code[self.key_c]===true ) self.move.attack = true;
        console.log(self.move);
    };
    movingKeyMappingUp(){
        var self = window.input;
        if (self.key_code[38]===false || self.key_code[87]===false) self.move.up = false;
        if (self.key_code[self.key_down]===false || self.key_code[self.key_s]===false) self.move.down = false;
        if (self.key_code[39]===false || self.key_code[68]===false) self.move.right = false;
                if (self.key_code[37]===false || self.key_code[65]===false) self.move.left = false;
                if (self.key_code[self.key_c]===false ) self.move.attack = false;
    };
    movingTouchMappingDown(){
            var self = window.input;
            var topy=self.parent.canvas.container.height;
                var topx=self.parent.canvas.container.width;
                if (self.touchSection(0,150,topy-90, topy-45)) self.move.up = true;
                if (self.touchSection(0,75,topy-40, topy)) self.move.left = true;
                if (self.touchSection(76,150,topy-39, topy)) self.move.right = true;
                if (self.touchSection(topx-100,topx,topy-90, topy)) self.move.attack = true;
    };
    movingTouchMappingUp(){
        var self = window.input;
        var topy=self.parent.canvas.container.height;
        var topx=self.parent.canvas.container.width;
        if (!self.touchSection(0,90,topy-60, topy-40)) self.move.up = false;
        if (!self.touchSection(0,50,topy-39, topy)) self.move.left = false;
        if (!self.touchSection(60,90,topy-39, topy)) self.move.right = false;
        if (!self.touchSection(topx-100,topx,topy-60, topy)) self.move.attack = false;
        };
    actionTouchMappingDown(){
        var self = window.input;
        var btnStart = {x1:0, y1:0, x2:self.parent.canvas.container.width, y2:self.parent.canvas.container.height};
        if (self.touchSection(btnStart.x1,btnStart.x2,btnStart.y1, btnStart.y2)) self.actions.btnStart = true;
        console.log(self.move);

    };
    actionTouchMappingUp(){
        var self = window.input;
        var btnStart = {x1:0, y1:0, x2:self.parent.canvas.container.width, y2:self.parent.canvas.container.height};
        if (!self.touchSection(btnStart.x1,btnStart.x2,btnStart.y1, btnStart.y2)) self.actions.btnStart = false;
    };
    cinematicsTouchMappingDown(){
        var self = window.input;
        var topy=self.parent.canvas.container.height;
        var topx=self.parent.canvas.container.width;
        // abstraer las direcciones espaciales de las opciones.
        if (self.touchSection(0,180,topy-100, topy-50)) self.move.up = true;
        if (self.touchSection(0,180,topy-49, topy)){
            self.move.down = true;
        }
        if (self.touchSection(topx-100,topx,topy-60, topy)) self.move.attack = true;
    };
    cinematicsTouchMappingUp(){
        var self = window.input;
        var topy=self.parent.canvas.container.height;
        var topx=self.parent.canvas.container.width;
        // abstraer las direcciones espaciales de las opciones.
        if (!self.touchSection(0,180,topy-100, topy-50)) self.move.up = false;
        if (!self.touchSection(0,180,topy-49, topy)){
                    self.move.down = false;
        }
        if (!self.touchSection(topx-100,topx,topy-60, topy)) self.move.attack = false;
    };
    onKeyDown(event, preventDefault){
        var self = window.input;
        self.prevent_default = preventDefault ? true : false;
        self.key_code[event.keyCode]=true;
        self.movingKeyMappingDown();
        if(self.prevent_default && self.key_code[114] )   event.preventDefault();
        return true;
    };
    onKeyUp(event){
        var self = window.input;
        self.key_code[event.keyCode] = false;
        self.movingKeyMappingUp();
        return true;
    }; 
    mouseMove(event, preventDefault){
        var self = window.input;
        self.mouse.x = event.offsetX;
        self.mouse.y = event.offsetY;
        self.mouse.clicked = (event.which == 1 && !self.mouse.down);
        self.mouse.down = ( event.which == 1 );
        console.log(self.mouse);
    };
    mouseDown(event, preventDefault){
        var self = window.input;
        self.mouse.clicked = !self.mouse.down;
        self.mouse.down = true;
        console.log(self.mouse);
    };
    mouseUp(event, preventDefault){
        var self = window.input;
        self.mouse.clicked = false;
        self.mouse.down = false;
    };
    touchSection(x1,x2,y1,y2){
        var self = window.input;
        for(var c=0; c < self.touches.length; c++){
            var actualx = self.touches[c].clientX;
            var actualy = self.touches[c].clientY;
            if( actualx >=x1 && actualx <=x2
                && actualy >=y1 && actualy <=y2 ) {
                    return true;
                }
        }
    };
    clearKeys(){
        var self = window.input;
        self.key_code=[];
        self.key_press=[];
        self.touches=[];
        self.cinematicsTouchMappingUp();
        self.movingTouchMappingUp();
    };
    isTouching(x, y, shapeA) {
        var self = window.input;
        // get the vectors to check against
        var vX = (shapeA.position.x + (shapeA.width / 2)) - x,
            vY = (shapeA.position.y + (shapeA.height / 2)) - y,
                // add the half widths and half heights of the objects
                hWidths = (shapeA.width / 2),
                hHeights = (shapeA.height / 2),
                colDir = null;
        // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
        if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
            // figures out on which side we are colliding (top, bottom, left, or right)
            var oX = hWidths - Math.abs(vX),
                oY = hHeights - Math.abs(vY);
            if (oX >= oY) {
                if (vY > 0) {
                    colDir = "t";
                } else {
                    colDir = "b";
                }
            } else {
                if (vX > 0) {
                    colDir = "l";
                } else {
                    colDir = "r";
                }
            }
        }
        return colDir;
    };
    setTouchEvents() {
        var self = window.input;
        var _this = self;

        var setTouches = function(e){
            // Microsoft always has to have their own stuff...
            if( window.navigator.msPointerEnabled &&
                !! e.clientX &&
                e.pointerType === e.MSPOINTER_TYPE_TOUCH
                ){
                _this.touches[ e.pointerId ] = {
                    clientX: e.clientX,
                    clientY: e.clientY
                };
            } else _this.touches = e.touches || [];
            if(self.parent.isMobile()){
                if(self.parent.titleScreen===true){
                    _this.actionTouchMappingDown();
                }else if(self.parent.cinematics===true){
                    _this.cinematicsTouchMappingDown();
                }else{
                    _this.movingTouchMappingDown();
                }
            }
        };

        var touchStart = function( e ) {
            if( _this.paused ) _this.paused = false;
            e.preventDefault();
            setTouches(e);
        };
        var touchEnd = function( e ) {
            e.preventDefault();
                _this.move.attack = false;
            if( window.navigator.msPointerEnabled &&
                e.pointerType === e.MSPOINTER_TYPE_TOUCH ) {
                delete _this.touches[ e.pointerId ];
            } else _this.touches = e.touches || [];
            if(self.parent.isMobile()){
                if(self.parent.titleScreen===true){
                    _this.actionTouchMappingUp();
                }else if(self.parent.cinematics===true){
                    _this.cinematicsTouchMappingUp();
                }else{
                    _this.movingTouchMappingUp();
                }
            }
        };

        var touchMove = function( e ) {
            e.preventDefault();
            setTouches(e);
        };

        document.body.addEventListener('touchstart', touchStart, false);
        document.body.addEventListener('touchend', touchEnd);
        document.body.addEventListener('touchmove', touchMove);

        if( window.navigator.msPointerEnabled ) {
            document.body.addEventListener('MSPointerDown', touchStart);
            document.body.addEventListener('MSPointerUp', touchEnd);
            document.body.addEventListener('MSPointerMove', touchMove);
        }
    };
    toKeyString(keycode){
        var self = window.input;
        switch(keycode){
            case self.key_left:
                    return 'LEFT';
            case self.key_up:
                    return 'UP';
            case self.key_down:
                    return 'DOWN';
            case self.key_right:
                    return 'RIGHT';
            case self.key_space:
                    return 'SPACE';
            case self.key_enter:
                    return 'ENTER';
            case self.key_backspace:
                    return 'BACKSPACE';                        
            default:   
                    return String.fromCharCode(self.key_code);
        }
    }
}




