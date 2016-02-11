var Mouse = function(x, y, speed){
  var mouse = new Sprite(function(my){

    my.width = 15;
    my.height = 15;
    my.moveSpeed = speed || 10;

    my.gravity = true;
    my.ani.repeat = true;
    var directSW = true;

    my.update(function(){
      if(directSW == false){
        my.state = 'rightwalk';
      }else if(directSW == true){
        my.state = 'leftwalk';
      }
    });

    my.animate('pikachu.png', 18, 18, {
      left: 0,
      leftRun: 1,
      leftJump: 0,
      right: 0,
      rightRun: 2,
      rightJump: 0,
      leftbehave: 1,
      rightbehave: 2
    }, 4);

    my.remove('crashes');

    my.onCrash(function(direction, target){

      if(target.tag == 'player'){
        if(direction == 'top'){
          my.dead();
        }else {
          target.dead();
        }
      }

      if(target.tag == 'ball') return;

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
        case 'left':
          my.x = target.x + target.width;
          directSW = false;
        break;
        case 'right':
          my.x = target.x - my.width;
          directSW = true;
        break;
      }

    });

  }).draw(x, y);

  return Mouse;
};
