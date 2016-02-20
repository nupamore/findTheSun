
var Bat = function(x, y, speed){
  var bat = new Sprite(function(my){

    my.width = 32;
    my.height = 32;
    my.moveSpeed = speed || 10;
    my.tag = 'monster';

    my.gravity = false;
    var directSW = false;

    my.update(function(){
      if(directSW == false){
        my.state = 'rightwalk';
      }else if(directSW == true){
        my.state = 'leftwalk';
      }
    });

    my.setInterval(function(){
      if(directSW == false){
        directSW = true;
      }else if(directSW == true){
        directSW = false;
      }
    }, 1000);

    my.animate('img/pikachu.png', 18, 18, {
      left: 0,
      leftRun: 1,
      leftJump: 0,
      right: 0,
      rightRun: 2,
      rightJump: 0
    }, 4);

    my.remove('crashes');

    my.onCrash(function(direction, target){

      if(target.tag == 'player'){
        if(direction == 'top'){
          my.dead();
        }else{
          target.dead();
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

  }).draw(x, y);

  return Bat;
};
