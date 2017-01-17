angular.module('game').factory('gameObject', ['$window','spritemanager', function(win, spritemanager) {
    var go = function(a){
      this.extends = creature_model;
      this.extends.width = a.width;
      this.extends.height = a.height;
      this.extends.img= a.img;
      this.extends.x = a.x;
      this.extends.y = a.y;
      this.init = function(a) {
                    if(this.extends != null && typeof this.extends != undefined ){
                        for (var attrname in this.extends)
                            this[attrname]= this.extends[attrname];
                    }
                    this.physics.velX = Math.random()*10;
                    this.spritesheet = new spritemanager(this.img, this.width, this.height);
                    this.spritesheet.idle = new this.spritesheet.Animation( 14, 1, 1, true);
          console.log(this, a);
                    return this;
        };
       this.init(a);
    }
    return go;
}]);