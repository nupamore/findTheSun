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

    my.setInterval(function(){
      if(directSW == false){
        directSW = true;
      }else if(directSW == true){
        directSW = false;
      }
    }, 800);

    my.renderer(function(){
      ctx.drawImage(resource.piece, my.x, my.y, my.width, my.height);
    });

    my.remove('crashes');

    my.onCrash(function(direction, target){
      if(target.havepiece == 3){
        if(clearStage < level){
          clearStage = level;
          //localStorage.setItem('clearStage', clearStage);
          //localStorage.getItem('clearStage');
        }
      }

      if(target.tag == 'player'){
        my.dead();
        target.havepiece += 1;
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
