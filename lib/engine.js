
(function(){


var sprites = {};
var spriteId = 0;

var fps = 60;
var UPDATE_TIME = 10;

var map = 0;

this.canvas = document.getElementById('canvas');
this.ctx = canvas.getContext('2d');


this.Sprite = function(callback){
  var my = {};
  my.id = spriteId++;

  my.gravity = false;
  my.static = false;
  my.collision = true;
  my.userControl = false;

  my.width = 0;
  my.height = 0;
  my.x = 0;
  my.y = 0;
  my.ax = 0;
  my.ay = 0;
  my.crash = false;


  /* start */
  my.starts = [];
  // default
  my.starts.push(function(){});
  my.start = function(callback){
    for(var s in my.starts){
      if(String(my.starts[s]) == String(callback))
        return;
    }
    my.starts.push(callback);
    return my;
  };
  /* start end */


  /* update */
  my.updates = [];
  // default
  my.updates.push(function(){
    my.x += my.ax;
    my.y += my.ay;

    // gravity
    if(my.gravity){
      my.ay+=0.1;
    }

    // collider before
    my.crash = my.collider();
    // collider after

    // userControl
    if(my.userControl){
      if(LEFT_ARROW)
        my.x += -1;
      if(RIGHT_ARROW)
        my.x += 1;
      if(UP_ARROW && my.crash){
        my.ay = -4;
        UP_ARROW = false;
      }else{
        UP_ARROW = false;
      }
    }
  });
  my.update = function(callback){
    for(var u in my.crashes){
      if(String(my.updates[u]) == String(callback)){
        return;
      }
    }
    my.updates.push(callback);
    return my;
  };
  /* update end */


  /* render */
  my.renderers = [];
  // default
  my.renderers.push(function(){
/*    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,100)";
    ctx.rect(my.x, my.y, my.width, my.height);
    ctx.stroke();*/
  });
  my.renderer = function(callback){
    for(var r in my.renderers){
      if(String(my.renderers[r]) == String(callback))
        return;
    }
    my.renderers.push(callback);
    return my;
  };
  /* render end */


  /* collider */
  my.collider = function(){
    // static check
    if( !my.collision ) return;
    if( my.static ) return;

    for(var i in sprites){
      if(!sprites[i].collision) continue;
      if(sprites[i].id == my.id) continue;

      if(sprites[i].x > my.x && sprites[i].x < (my.x + my.width)){
        if(sprites[i].y > my.y && sprites[i].y < (my.y + my.height)){
          if((sprites[i].x + sprites[i].width) >= (my.x + my.width)){    // 밑바닥이 붙었을 때
            if((my.y + my.height) - sprites[i].y < (my.x + my.width) - sprites[i].x){   // x축 침범 크기와 y축 침범 크기 비교
              my.emitCrash('bottom', sprites[i]);
              return true;
            }
            else{
              my.emitCrash('left', sprites[i]);
              return true;
            }
          }
        }
        else if(my.y > sprites[i].y && my.y < (sprites[i].y + sprites[i].height)){
          if((sprites[i].x + sprites[i].width) > (my.x + my.width)){
            my.emitCrash('top', sprites[i]);
            return true;
          }
          else{
            my.emitCrash('left', sprites[i]);
            return true;
          }
        }
      }
      else if(sprites[i].x < my.x && my.x < (sprites[i].x + sprites[i].width)){
        if(sprites[i].y > my.y && sprites[i].y < (my.y + my.height)){
          if(sprites[i].y - (my.y + my.height) > sprites[i].x - (my.x + my.width))
            if((my.y + my.height) - sprites[i].y < (sprites[i].x + sprites[i].width) - my.x){
              my.emitCrash('bottom', sprites[i]);
              return true;
            }
            else{
              my.emitCrash('right', sprites[i]);
              return true;
            }
        }
        else if(my.y > sprites[i].y && my.y < (sprites[i].y + sprites[i].height)){
          if((sprites[i].y + sprites[i].height) - my.y < (sprites[i].x + sprites[i].width) - my.x){
            my.emitCrash('top', sprites[i]);
            return true;
          }
          else{
            my.emitCrash('right', sprites[i]);
            return true;
          }
        }
      }
    }
    return false;
  };

  my.crashes = [];
  // default
  my.crashes.push(function(type, target){
    switch(type){
      case 'bottom':
        my.y = target.y - my.height;
        my.ay = 0;
      break;
      case 'top':
        my.y = target.y + target.height;
        my.ay = 0;
      break;
      case 'left': my.x = target.x - my.width; break;
      case 'right': my.x = target.x + target.width; break;
    }
  });
  my.onCrash = function(callback){
    for(var c in my.crashes){
      if(String(my.crashes[c]) == String(callback)){
        return;
      }
    }
    my.crashes.push(callback);
    return my;
  };
  my.emitCrash = function(type, target){
    for(var c in my.crashes){
      my.crashes[c](type, target);
    }
    return my;
  };
  /* collider end */


  my.draw = function(x,y){
    my.x = x;
    my.y = y;

    for(var s in my.starts){
      my.starts[s]();
    }
    sprites[my.id] = my;
    return my;
  };

  my.dead = function(){
    delete sprites[my.id];
    return my;
  };


  my.animate = function(src, x, y, callback){
      my.img = new Image();
      my.img.src = src;

      my.frame = 0;
      my.state = 0;

      setInterval(function(){
        my.frame++;
        if(my.frame>5)
          my.frame=0;
      }, 100);

      my.renderer(function(){
        callback();
        ctx.drawImage(my.img, my.frame*x, my.state*y, x, y, my.x, my.y, my.width, my.height);
      });


      return my;
  };





  callback(my);
  return my;
};






// update
setInterval(function(){
  for(var j in sprites){
    for(var u in sprites[j].updates){
      sprites[j].updates[u]();
    }
  }
}, UPDATE_TIME);
// draw
setInterval(function(){
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  for(var i in sprites){
    for(var r in sprites[i].renderers){
      sprites[i].renderers[r]();
    }
  }
}, 1000/fps);

// event

this.LEFT_ARROW = false;   //37
this.RIGHT_ARROW = false;  //39
this.UP_ARROW = false;     //38
this.UP_LOCK = false;

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
