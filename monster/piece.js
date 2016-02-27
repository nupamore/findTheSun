var insertRank = function(player, level, death, time){
  $.ajax({
    dataType: 'jsonp',
    data: 'rank={"player":"'+player+'", "level":'+level+', "death":'+death+', "time":'+time+'}',
    jsonp: 'callback',
    url: 'http://nupa.fun25.co.kr:17903/insert?callback=?',
    success: function(data) {
      console.log(data);
    }
  });
};

var Piece = function(x, y){
  var piece = new Sprite(function(my){

    my.x = x;
    my.y = y;
    my.width = 32;
    my.height = 32;

    my.tag = 'star';
    my.gravity = false;
    var directSW = false;

    my.update(function(){
      if(directSW == false){
        my.y -= 0.3;
      }else if(directSW == true){
        my.y += 0.3;
      }
    });

    my.start(function(){
      my.setInterval(function(){
        if(directSW == false){
          directSW = true;
        }else if(directSW == true){
          directSW = false;
        }
      }, 800);
    });

    my.renderer(function(){
      ctx.drawImage(resource.piece, my.x, my.y, my.width, my.height);
    });

    my.remove('crashes');

    my.onCrash(function(direction, target){
      if(target.tag == 'player'){
        my.dead();
        target.havepiece += 1;
      }

      if(target.havepiece == 4){
        if(clearStage < level){
          clearStage = level;
          localStorage.setItem('clearStage', clearStage);
          localStorage.getItem('clearStage');
        }
        target.tag = 'clear';
        target.state = 'jump';
        my.dead();

        if(level<4){
          setTimeout(function(){
            location.reload();
          }, 3000);
        }
        else{
          setTimeout(function(){
            var name = prompt('이름을 입력해주세요','');
            insertRank(name, level, player.death, player.time);
            location.reload();
          }, 1000);
        }
      }

      if(target.tag=='ball') return;
      if(target.tag=='monster') return;

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
        case 'right': my.x = target.x - my.width; break;
        case 'left': my.x = target.x + target.width; break;
      }

    });

  });

  return piece;
};
