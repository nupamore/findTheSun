var Mouse = function(x, y, speed, w, h){
  var mouse = new Sprite(function(my){

    my.x = x;
    my.y = y;
    my.width = w || 30;
    my.height = h || 30;
    my.moveSpeed = speed || 10;
    my.tag = 'monster';

    my.gravity = true;
    my.ani.repeat = true;
    var directSW = true;

    my.update(function(){
      if(directSW == false){
        my.state = 'rightwalk';
      }else if(directSW == true){
        my.state = 'leftwalk';
      }
      if(my.ay>20) my.dead();
    });

    my.start(function(){
      my.x = x;
      my.y = y;
      my.ay = 0;
    });
    /*
    my.animate(resource.mouse, 18, 18, {
      left: 0,
      leftRun: 1,
      leftJump: 0,
      right: 0,
      rightRun: 2,
      rightJump: 0,
      leftbehave: 1,
      rightbehave: 2
    }, 4);
    */
    my.animate(resource.mouse, 137, 191, {
      left: 1,
      leftRun: 1,
      leftJump: 1,
      right: 0,
      rightRun: 0,
      rightJump: 0
    }, 10, [25,5,0,5]);

    my.remove('crashes');

    my.onCrash(function(direction, target){

      if(target.tag == 'player'){
        if(direction == 'top'){
          my.dead();
        }else {
          target.dead();
        }
      }

      if(target.tag=='water') return;
      if(target.tag == 'ball') return;
      if(target.tag == 'monster') return;

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

  });

  return mouse;
};
