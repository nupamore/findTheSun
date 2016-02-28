
(function(){

this.readySprites = {};
this.sprites = {};
this.allSprites = {};
var spriteId = 0;

var UPDATE_TIME = 10;

this.canvas = document.getElementById('canvas');
this.ctx = canvas.getContext('2d');

this.Camera = {
  target: { x:0, y:0, state:'false', moveSpeed:0 },
  marginX : 200,
  marginY : 50,
  x: 0,
  y: 0,
  set: function (x,y) {
    var d;
    var move;

    if(Camera.target.state=='false'){
      return;
    }

    if(x||y){
      for(var i in allSprites){
        if(allSprites[i].tag=='background') continue;
        allSprites[i].x -= x;
        allSprites[i].y -= y;
      }
      Camera.x += x;
      Camera.y += y;
      return;
    }

    // x
    if(Camera.target.state.match('rightwalk')){
      d = Math.abs(Camera.target.x - Camera.marginX);
      move = Math.pow((d/300),3)*(Camera.target.moveSpeed/10);
      if(!(d<100)){
        for(var i in allSprites){
          if(allSprites[i].tag=='background') continue;
          allSprites[i].x -= move;
        }
        Camera.x += move;
      }
    }
    else if(Camera.target.state.match('leftwalk')){
      d = Math.abs(Camera.target.x - canvas.width + Camera.marginX);
      move = Math.pow((d/300),3)*(Camera.target.moveSpeed/10);
      if(!(d>700 || d<-100)){
        for(var i in allSprites){
          if(allSprites[i].tag=='background') continue;
          allSprites[i].x += move;
        }
        Camera.x -= move;
      }
    }

    // y
    d = Camera.target.y - canvas.height/2 - Camera.marginY;
    move = Math.pow((d/300),3)*10;
    for(var i in allSprites){
      if(allSprites[i].tag=='background') continue;
      allSprites[i].y -= move;
    }
    Camera.y += move;
  }

};


var updateInterval = setInterval(function(){
  for(var j in readySprites){
    if(readySprites[j].x<1100){
      sprites[j] = readySprites[j];
      delete readySprites[j];
    }
  }
  for(var j in sprites){
    for(var u in sprites[j].updates){
      sprites[j].updates[u]();
    }
  }
  Camera.set();
}, UPDATE_TIME);
// draw
var drawInterval = function(){
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  for(var i in sprites){
    for(var r in sprites[i].renderers){
      sprites[i].renderers[r]();
    }
  }
  requestAnimationFrame(drawInterval);
};
drawInterval();

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
  my.jump = true;
  my.state = 'right';
  my.moveSpeed = 1;


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
  my.starts.push(function(){
    my.ani.interval();
  });
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
      my.ay+=0.2;
    }

    // collider before
    my.collider();
    // collider after

    // player
    if(my.tag == 'player'){

      if(LEFT_ARROW){
        my.state = 'leftwalk';
      }else if(my.state == 'leftwalk'){
        my.state = 'left';
      }
      if(RIGHT_ARROW){
        my.state = 'rightwalk';
      }else if(my.state == 'rightwalk'){
        my.state = 'right';
      }
      if(UP_ARROW){
        my.state = 'jump';
        UP_ARROW = false;
      }else if(my.state == 'jump'){
        my.state = 'nojump';
      }
    }

    if(my.state == 'leftwalk'){
      my.x += (-0.1 * my.moveSpeed);
    }
    if(my.state == 'rightwalk')
      my.x += (0.1 * my.moveSpeed);
    if(my.state == 'jump' && !my.jump){
      /* 이거 엔진거 아님 */
      BGM.sePlay(4,10);
      /* 이거 엔진거 아님 */
      my.ay = -6;
      my.jump = true;
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
    // static check
    if( !my.collision ) return;
    if( my.static ) return;

    for(var i in sprites){
      if(!sprites[i].collision) continue;
      if(sprites[i].id == my.id) continue;

      if(sprites[i].x >= my.x && sprites[i].x < (my.x + my.width)){
        if(sprites[i].y >= my.y && sprites[i].y < (my.y + my.height)){
          if((sprites[i].x + sprites[i].width) >= (my.x + my.width)){    // 밑바닥이 붙었을 때
            if((my.y + my.height) - sprites[i].y < (my.x + my.width) - sprites[i].x +1){   // x축 침범 크기와 y축 침범 크기 비교
              my.emitCrash('bottom', sprites[i]);
              sprites[i].emitCrash('top', my);
            }
            else{
              my.emitCrash('right', sprites[i]);
              sprites[i].emitCrash('left', my);
            }
          }
        }
        else if(my.y > sprites[i].y && my.y < (sprites[i].y + sprites[i].height)){
          if((sprites[i].y + sprites[i].height) - my.y < (my.x + my.width) - sprites[i].x){
            my.emitCrash('top', sprites[i]);
            sprites[i].emitCrash('bottom', my);
          }
          else{
            my.emitCrash('right', sprites[i]);
            sprites[i].emitCrash('left', my);
          }
        }
      }
      else if(sprites[i].x < my.x && my.x < (sprites[i].x + sprites[i].width) -3){
        if(sprites[i].y > my.y && sprites[i].y < (my.y + my.height)){
          if(sprites[i].y - (my.y + my.height) > sprites[i].x - (my.x + my.width))
            if((my.y + my.height) - sprites[i].y < (sprites[i].x + sprites[i].width) - my.x){
              my.emitCrash('bottom', sprites[i]);
              sprites[i].emitCrash('top', my);
            }
            else{
              my.emitCrash('left', sprites[i]);
              sprites[i].emitCrash('right', my);
            }
        }
        else if(my.y > sprites[i].y && my.y < (sprites[i].y + sprites[i].height)){
          if((sprites[i].y + sprites[i].height) - my.y < (sprites[i].x + sprites[i].width) - my.x){
            my.emitCrash('top', sprites[i]);
            sprites[i].emitCrash('bottom', my);
          }
          else{
            my.emitCrash('left', sprites[i]);
            sprites[i].emitCrash('right', my);
          }
        }
      }
    }
  };

  my.crashes = [];
  // default
  my.crashes.push(function(direction, target){
    if(my.static) return;

    switch(direction){
      case 'bottom':
        my.y = target.y - my.height;
        my.ay = 0;
        my.jump = false;
      break;
      case 'top':
        my.y = target.y + target.height;
        my.ay = 0;
      break;
      case 'left': my.x = target.x + target.width; break;
      case 'right': my.x = target.x - my.width; break;
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
  my.emitCrash = function(direction, target){
    for(var c in my.crashes){
      my.crashes[c](direction, target);
    }
    return my;
  };
  /* collider end */

  my.draw = function(x,y){
    my.x = x || my.x;
    my.y = y || my.y;

    for(var s in my.starts){
      my.starts[s]();
    }
    readySprites[my.id] = my;
    return my;
  };

  my.deads = [];
  my.dead = function(){
    for(var i in my.intervals){
      clearInterval(my.intervals[i]);
    }

    for(var d in my.deads){
      my.deads[d]();
    }
    delete sprites[my.id];
    return my;
  };
  my.onDead = function(callback){
    for(var d in my.deads){
      if(String(my.deads[d]) == String(callback)){
        return;
      }
    }
    my.deads.push(callback);
    return my;
  };

  my.remove = function(method){
    my[method] = [];
    return my;
  };


  my.ani = {
    img: false,
    frame: 0,
    line: 0,
    repeat: true,
    interval: function(){}
  };
  my.animate = function(img, x, y, s, frame, collider){
    my.ani.img = img;

    my.ani.interval = function(){
      my.setInterval(function(){
        if(my.ani.repeat == true){
          my.ani.frame++;
          if(my.ani.frame >= (frame||5))
            my.ani.frame = 0;
        }else if(my.ani.repeat == false){
          if(my.ani.frame < frame)
            my.ani.frame++;
          if(my.ani.frame >= (frame||5)){
            my.ani.frame = frame - 1 ;
          }
        }
      }, UPDATE_TIME*10);
    };

    my.renderer(function(){

      // left
      if(my.state == 'leftwalk'){
        my.ani.line = s.leftRun;
      }
      if(my.state == 'left'){
        my.ani.line = s.left;
      }
      // right
      if(my.state == 'rightwalk'){
        my.ani.line = s.rightRun;
      }
      if(my.state == 'right'){
        my.ani.line = s.right;
      }
      // jump
      if(my.jump && (my.ani.line == s.left || my.ani.line == s.leftRun)){
        my.ani.line = s.leftJump;
      }
      else if(!my.jump && my.ani.line == s.leftJump){
        my.ani.line = s.left;
      }
      else if(my.jump && (my.ani.line == s.right || my.ani.line == s.rightRun)){
        my.ani.line = s.rightJump;
      }
      else if(!my.jump && my.ani.line == s.rightJump){
        my.ani.line = s.right;
      }
      // behave
      if(my.state == 'leftbehave'){
        my.ani.line = s.leftbehave;
      }
      if(my.state == 'rightbehave'){
        my.ani.line = s.rightbehave;
      }

      if(!collider){
        my.ani.x = my.x;
        my.ani.y = my.y;
        my.ani.width = my.width;
        my.ani.height = my.height;
      }
      else{
        my.ani.x = my.x-collider[3];
        my.ani.y = my.y-collider[0];
        my.ani.width = my.width+collider[1]+collider[3];
        my.ani.height = my.height+collider[2]+collider[0];
      }

      ctx.drawImage(my.ani.img, my.ani.frame*x, my.ani.line*y, x, y, my.ani.x, my.ani.y, my.ani.width, my.ani.height);
      //ctx.strokeRect(my.x, my.y, my.width, my.height);
    });


    return my;
  };

  my.intervals = [];
  my.setInterval = function(interval, time){
    my.intervals.push(setInterval(interval, time));
    return my;
  };




  callback(my);
  allSprites[my.id] = my;
  return my;
};


// event

this.LEFT_ARROW = false;   //37
this.RIGHT_ARROW = false;  //39
this.UP_ARROW = false;     //38

document.body.addEventListener("keydown",function(){
  switch(event.keyCode){
    case 37: LEFT_ARROW = true; RIGHT_ARROW = false;  event.preventDefault(); break;
    case 38: UP_ARROW = true;                         event.preventDefault(); break;
    case 39: RIGHT_ARROW = true; LEFT_ARROW = false;  event.preventDefault(); break;
    case 40:                                          event.preventDefault(); break;
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
