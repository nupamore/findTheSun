
(function(){


var sprites = {};
var spriteId = 0;

var fps = 60;
var UPDATE_TIME = 10;

this.canvas = document.getElementById('canvas');
this.ctx = canvas.getContext('2d');


this.Sprite = function(callback){
  var my = {};
  my.id = spriteId++;
  my.tag = 'default';

  my.gravity = false;
  my.static = false;
  my.collision = true;

  my.width = 0;
  my.height = 0;
  my.x = 0;
  my.y = 0;
  my.ax = 0;
  my.ay = 0;
  my.crash = false;
  my.jump = false;


  /* start */
  my.starts = [];
  my.start = function(callback){
    for(var s in my.starts){
      if(String(my.starts[s]) == String(callback))
        return;
    }
    my.starts.push(callback);
    return my;
  };
  // default
  my.starts.push(function(){});
  /* start end */


  /* update */
  my.updates = [];
  my.update = function(callback){
    for(var u in my.crashes){
      if(String(my.updates[u]) == String(callback)){
        return;
      }
    }
    my.updates.push(callback);
    return my;
  };
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

    // player
    if(my.tag=='player'){
      if(LEFT_ARROW)
        my.x += -1;
      if(RIGHT_ARROW)
        my.x += 1;
      if(UP_ARROW && !my.jump){
        my.ay = -4;
        my.jump = true;
      }
      if(UP_ARROW){
        UP_ARROW = false;
      }
    }
  });
  /* update end */


  /* render */
  my.renderers = [];
  my.renderer = function(callback){
    for(var r in my.renderers){
      if(String(my.renderers[r]) == String(callback))
        return;
    }
    my.renderers.push(callback);
    return my;
  };
  // default
  my.renderers.push(function(){
  });
  /* render end */


  /* collider */
  my.collider = function(){
    var crash = false;
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
              crash = true;
            }
            else{
              my.emitCrash('left', sprites[i]);
              crash = true;
            }
          }
        }
        else if(my.y > sprites[i].y && my.y < (sprites[i].y + sprites[i].height)){
          if((sprites[i].x + sprites[i].width) > (my.x + my.width)){
            my.emitCrash('top', sprites[i]);
            crash = true;
          }
          else{
            my.emitCrash('left', sprites[i]);
            crash = true;
          }
        }
      }
      else if(sprites[i].x < my.x && my.x < (sprites[i].x + sprites[i].width)){
        if(sprites[i].y > my.y && sprites[i].y < (my.y + my.height)){
          if(sprites[i].y - (my.y + my.height) > sprites[i].x - (my.x + my.width))
            if((my.y + my.height) - sprites[i].y < (sprites[i].x + sprites[i].width) - my.x){
              my.emitCrash('bottom', sprites[i]);
              crash = true;
            }
            else{
              my.emitCrash('right', sprites[i]);
              crash = true;
            }
        }
        else if(my.y > sprites[i].y && my.y < (sprites[i].y + sprites[i].height)){
          if((sprites[i].y + sprites[i].height) - my.y < (sprites[i].x + sprites[i].width) - my.x){
            my.emitCrash('top', sprites[i]);
            crash = true;
          }
          else{
            my.emitCrash('right', sprites[i]);
            crash = true;
          }
        }
      }
    }
    return crash;
  };

  my.crashes = [];
  // default
  my.crashes.push(function(type, target){
    switch(type){
      case 'bottom':
        my.y = target.y - my.height;
        my.ay = 0;
        my.jump = false;
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


  my.animate = function(src, x, y, s, frame){
      my.img = new Image();
      my.img.src = src;

      my.frame = 0;
      my.state = 0;

      setInterval(function(){
        my.frame++;
        if(my.frame > (frame||5))
          my.frame=0;
      }, UPDATE_TIME*10);

      my.renderer(function(){
        if(my.tag=='player'){
          // left
          if(LEFT_ARROW){
            my.state = s.leftRun;
          }
          else if(my.state == s.leftRun){
            my.state = s.left;
          }
          // right
          if(RIGHT_ARROW){
            my.state = s.rightRun;
          }
          else if(my.state == s.rightRun){
            my.state = s.right;
          }
          // jump
          if(my.jump && (my.state == s.left || my.state == s.leftRun)){
            my.state = s.leftJump;
          }
          else if(!my.jump && my.state == s.leftJump){
            my.state = s.left;
          }
          else if(my.jump && (my.state == s.right || my.state == s.rightRun)){
            my.state = s.rightJump;
          }
          else if(!my.jump && my.state == s.rightJump){
            my.state = s.right;
          }
        }
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

document.body.addEventListener("keydown",function(){
  switch(event.keyCode){
    case 37: LEFT_ARROW = true; RIGHT_ARROW = false; break;
    case 38: UP_ARROW = true; break;
    case 39: RIGHT_ARROW = true; LEFT_ARROW = false; break;
    case 40: break;
  }
});

document.body.addEventListener("keyup",function(){
  switch(event.keyCode){
    case 37: LEFT_ARROW = false; break;
    case 38: break;
    case 39: RIGHT_ARROW = false; break;
    case 40: break;
  }
});




})();



// BGM
(function(){


var bgm = new Array();
var se = new Array();



var fadetime;

var bgmName;
var bgmNum;
var bgmLoop;
var bgmVolume;

this.BGM = {};


//BGM 등록(파일이름,BGM번호지정)

BGM.new = function(bgmName,bgmNum){

	bgm[bgmNum] = new Audio(bgmName);

}

//BGM 시작(등록된BGM번호,볼륨,반복여부[true/false])
BGM.play = function(bgmNum,bgmVolume,bgmLoop){
	bgm[bgmNum].volume = (bgmVolume || 5)/10;
	bgm[bgmNum].play();
	bgm[bgmNum].loop = bgmLoop || false;
}


//BGM 일시정지(현재 재생중인 BGM번호)
BGM.pause = function(bgmNum){
	bgm[bgmNum].pause();
}
//BGM 정지(현재 재생중인 BGM번호)
BGM.stop = function(bgmNum){
	bgm[bgmNum].pause();
	bgm[bgmNum].currentTime = 0;
	bgm[bgmNum].volume = 1;

}

//BGM 볼륨조절(현재 재생중인 BGM번호,목표볼륨,볼륨조절까지 걸리는 시간)

BGM.control = function(bgmNum,bgmVolume,fadetime){
	if(bgm[bgmNum].volume *10 > bgmVolume){

		var fadeInterval = setInterval(function(){

		var fadepower = Math.ceil((bgm[bgmNum].volume -= 0.01)*100);
		console.log(fadepower);

		if((fadepower-1)/10 == bgmVolume){
			bgm[bgmNum].volume = bgmVolume/10;
			clearInterval(fadeInterval);
		}

	},fadetime);

	}
	else if(bgm[bgmNum].volume *10 < bgmVolume){

		var fadeInterval = setInterval(function(){

		var fadepower = Math.ceil((bgm[bgmNum].volume += 0.01)*100);
		console.log(fadepower);

		if(fadepower/10 == bgmVolume){
			console.log(fadepower);

			bgm[bgmNum].volume = bgmVolume/10;
			clearInterval(fadeInterval);
		}

	},fadetime);
	}
}

//BGM 페이드 아웃(재생중인 BGM 번호,페이드 아웃까지 걸리는 시간)


BGM.fadeOut = function(bgmNum,fadetime){

	this.bgm[bgmNum] = bgm[bgmNum];

	var fadeInterval = setInterval(function(){

		var fadepower = Math.ceil((bgm[bgmNum].volume -= 0.01)*100);


		if(fadepower == 1){
			bgm[bgmNum].volume = 0;
			bgmStop(bgmNum);
			clearInterval(fadeInterval);
		}

	},fadetime);



}

//BGM 페이드 인(재생중인 BGM 번호,페이드 인까지 걸리는 시간)

BGM.fadeIn = function(bgmNum,bgmVolume,fadetime,bgmLoop){
this.bgm[bgmNum] = bgm[bgmNum];
bgm[bgmNum].loop = bgmLoop;
bgm[bgmNum].volume = 0;
bgm[bgmNum].play();



	var fadeInterval = setInterval(function(){

		var fadepower = Math.ceil((bgm[bgmNum].volume += 0.01)*100);


		if(fadepower/10 == bgmVolume){
			bgm[bgmNum].volume = bgmVolume/10;
			clearInterval(fadeInterval);
		}

	},fadetime);



}



//----------------------------------------------------------------------------------------------------------------------


//SE 등록

BGM.newSe = function(seName,seNum){


	se[seNum] = new Audio(seName);

}


//SE 재생

BGM.sePlay = function(seNum,seVolume){
  var temp = new Audio(se[seNum].src);
  temp.volume = seVolume/10;
	temp.play();
}


})();
