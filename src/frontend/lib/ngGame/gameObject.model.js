function object_model(){
    this.img = null;
    this.name = '';
    this.id = Math.random().toString(36).substr(2);
    this.width, this.height = null;
    this.phisics = {
        gravity: 0,
        movable: 0,
        velX: 0,
        velY:0,
        speed:0
    }
    this.status = null;
    this.isStatic = null;
}