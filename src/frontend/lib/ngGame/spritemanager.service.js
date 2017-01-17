angular.module('game', ['ngCookies'])
.service('spritemanager',[ function(image, frameWidth, frameHeight){
    return function(image, frameWidth, frameHeight){
        this.spriteSheet = null;
        this.image = image;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        var root = this;
        this.init = function() {
            root.framesPerRow = Math.floor(root.image.width / root.frameWidth);
            root.spriteSheet = this;
        }

        this.Animation = function(frameSpeed, startFrame, endFrame, runOnce) {
            var animationSequence = [];  // array holding the order of the animation
            var currentFrame = 1;        // the current frame to draw
            var counter = 0;             // keep track of frame rate
            this.endAnimation=false;
            this.debugInfo = [];
            self = this;
            var runOnceTemp = (typeof(runOnce) !== "undefined") ? runOnce  : false;
            // create the sequence of frame numbers for the animation
            for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++){
                animationSequence.push(frameNumber);
           //     console.log(frameNumber, currentFrame, animationSequence);
            }
            // Update the animation
            this.update = function() {
                if(runOnceTemp && self.endAnimation){
                    self.debugInfo = [self.endAnimation,currentFrame, endFrame];
                    return false;
                }
                // update to the next frame if it is time
                if (counter == (frameSpeed - 1))
                    currentFrame = (currentFrame + 1) % animationSequence.length;
                counter = (counter + 1) % frameSpeed;
            };

            // draw the current frame
            this.draw = function(x, y) {
                // get the row and col of the frame
                var row = Math.floor(animationSequence[currentFrame] / root.framesPerRow);
                var col = Math.floor(animationSequence[currentFrame] % root.framesPerRow);
                return { img:root.image,
                        sx:col*0, // desplazamiento en x interno
                        sy:row * 0,  // desplazamiento en y interno
                        sw:root.frameWidth, //dimenxion x interna
                        sh:root.frameHeight, // dimension y interna
                        x:x,
                        y:y,
                        w:root.frameWidth,
                        h:root.frameHeight
                }
            };

            this.reset = function(){
                self.endAnimation=false;
                currentFrame = 0;
                counter = 0;
            };
        };
        this.init();
        return this;
    }
    }]
);

