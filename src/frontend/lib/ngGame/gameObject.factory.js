angular.module('game').factory('gameObject', ['$window','spritemanager', function(win, spritemanager) {
    var rect = {x:5, y:5, width: 131, height: 154, orientation:1, velocity:1, name:'SQ'};
    var go = function(x,y){
      this.values = {};
      this.model = null;
      this.init = function(x,y) {
                    this.values = rect;
                    this.values.x = x;
                    this.values.y = y;
                    this.model = new creature_model();
                    return this;
        };
       this.init(x,y);
    }
    return go;
}]);