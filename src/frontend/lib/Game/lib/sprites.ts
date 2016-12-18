
function SpriteSheet(image, frameWidth, frameHeight) {
  this.image = image;
  this.frameWidth = frameWidth;
  this.frameHeight = frameHeight;
 
  // calculate the number of frames in a row after the image loads
  var self = this;
  self.framesPerRow = Math.floor(self.image.width / self.frameWidth);
}

function Animation(spritesheet, frameSpeed, startFrame, endFrame, runOnce) {
 
  var animationSequence = [];  // array holding the order of the animation
  var currentFrame = 0;        // the current frame to draw
  var counter = 0;             // keep track of frame rate
  this.endAnimation=false;
  this.debugInfo = [];
  self = this;
  var runOnceTemp = (typeof(runOnce) !== "undefined") ? runOnce  : false;
  // create the sequence of frame numbers for the animation
  for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
    animationSequence.push(frameNumber);
  // Update the animation
  this.update = function() {
    if(runOnceTemp && self.endAnimation){
        self.debugInfo = [self.endAnimation,currentFrame, endFrame];
        return false;
    }  
    // update to the next frame if it is time
    if (counter == (frameSpeed - 1))
      currentFrame = (currentFrame + 1) % animationSequence.length;
 
    // update the counter
    counter = (counter + 1) % frameSpeed;
    if(currentFrame==endFrame-1)
          self.endAnimation = true;
  };
 
  // draw the current frame
  this.draw = function(x, y) {
    // get the row and col of the frame
    var row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
    var col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);
 //console.log(col, row);
    game.canvas.drawSpriteImage(
      spritesheet.image,
      col * spritesheet.frameWidth, row * spritesheet.frameHeight,
      spritesheet.frameWidth, spritesheet.frameHeight,
      x, y,
      spritesheet.frameWidth, spritesheet.frameHeight);
  };
  
  this.reset = function(){
        self.endAnimation=false;
        currentFrame = 0;
        counter = 0;
  };
}
 