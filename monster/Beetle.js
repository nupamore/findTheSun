var Beetle = function(x, y){
  var beetle = new Sprite(function(my){

    my.x = x;
    my.y = y;
    my.width = 20;
    my.height = 30;
    my.moveSpeed = 3;
    my.tag = 'monster';
    my.state = 'left';
    my.gravity = true;

    var dx, dy;

    var interval;

    my.start(function(){
      my.x = x;
      my.y = y;
      my.ax = 0;
      interval = setInterval(function(){
        var dx = Math.abs(my.x - player.x);
        var dy = Math.abs(player.y - my.y);
        if(dx < 400 && dy < 100){
          if(my.x - player.x > 0){
            my.state = 'leftwalk';
            if(my.ax>-3.5) my.ax -= 0.06;
            if(!my.jump && my.ax>2 && my.ax<2.1){
              my.ay = -4;
              my.jump = true;
            }
          }
          if(my.x - player.x < 0){
            my.state = 'rightwalk';
            if(my.ax<3.5) my.ax += 0.06;
            if(!my.jump && my.ax>2 && my.ax<2.1){
              my.ay = -4;
              my.jump = true;
            }
          }
        }
      }, 10);
    });

    my.animate(resource.beetle, 137, 191, {
      left: 1,
      leftRun: 1,
      leftJump: 1,
      right: 0,
      rightRun: 0,
      rightJump: 0
    }, 10, [10,5,0,5]);

    my.remove('crashes');

    my.onCrash(function(direction, target){

      if(target.tag == 'player'){
        if(direction == 'top'){
          my.dead();
          clearInterval(interval);
        }else{
          target.dead();
          clearInterval(interval);
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
        case 'right': my.x = target.x - my.width; my.ax = 0; break;
        case 'left': my.x = target.x + target.width; my.ax = 0; break;
      }

    });


  });

  return beetle;
};
