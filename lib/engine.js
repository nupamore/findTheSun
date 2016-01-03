
(function(){





var sprites = {};
var spriteId = 0;

var fps = 60;


this.Sprite = function(callback){
  var id = spriteId++;
  var that = new callback();

  that.x = that.x || 0;
  that.y = that.y || 0;
  that.ax = that.ax || 0;
  that.ay = that.ax || 0;

  that.autoAnimator = function(){
    that.x += that.ax;
    that.y += that.ay;

    if(that.gravity){
      that.ay++;
      if(that.y > 400){
        that.y = 400;
        that.ay = 0;
      }
    }
    if(that.userControl){
      if(LEFT_ARROW) that.x += -3;
      if(RIGHT_ARROW) that.x += 3;
      if(UP_ARROW){
        that.ay = -20;
        UP_ARROW = false;
      }
    }
  };
  that.draw = function(){
    sprites[id] = that;
  };
  that.dead = function(){
    delete sprites[id];
  };
  return that;
};


// animate
setInterval(function(){
  for(var i in sprites){
    sprites[i].autoAnimator();
    sprites[i].animator();
  }
}, 10);
// draw
setInterval(function(){
  ctx.beginPath();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fill();
  for(var i in sprites){
    sprites[i].renderer();
  }
}, 1000/fps);




// event
var LEFT_ARROW = false;   //37
var RIGHT_ARROW = false;  //39
var UP_ARROW = false;     //38
var UP_LOCK = false;

document.body.addEventListener("keydown",function(){
  switch(event.keyCode){
    case 37: LEFT_ARROW = true; RIGHT_ARROW = false; break;
    case 38:
      if(!UP_LOCK){
        UP_ARROW = true;
        UP_LOCK = true;
      }
    break;
    case 39: RIGHT_ARROW = true; LEFT_ARROW = false; break;
    case 40: break;
  }
});

document.body.addEventListener("keyup",function(){
  switch(event.keyCode){
    case 37: LEFT_ARROW = false; break;
    case 38: UP_LOCK = false; break;
    case 39: RIGHT_ARROW = false; break;
    case 40: break;
  }
});





})();
