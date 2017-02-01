
var Bat = function(x, y, speed){
  var bat = new Sprite(function(my){

    my.x = x;
    my.y = y;
    my.width = 40;
    my.height = 22;
    my.moveSpeed = speed || 10;
    my.tag = 'monster';
    my.jump = false;

    my.gravity = false;
    var directSW = false;

    my.animate(resource.bat, 220, 167, {
      left: 0,
      leftRun: 0,
      leftJump: 0,
      right: 0,
      rightRun: 1,
      rightJump: 0
    }, 5,[14,8,4,8]);

    my.start(function(){
      directSW = false;
      my.x = x;
      my.y = y;
      my.setInterval(function(){
        if(directSW == false){
          my.state = 'rightwalk';
        }else if(directSW == true){
          my.state = 'leftwalk';
        }
      }, 100);

      my.setInterval(function(){
        if(directSW == false){
          directSW = true;
        }else if(directSW == true){
          directSW = false;
        }
      }, 1000);
    });

    my.remove('crashes');

    my.onCrash(function(direction, target){

      if(target.tag == 'player'){
        if(direction == 'top'){
          BGM.sePlay(2,10);
          my.dead();
        }else{
          target.dead();
        }
      }


      if(target.tag=='ball') return;
      if(target.tag=='monster') return;
      if(target.tag=='water') return;

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

  return bat;
};
