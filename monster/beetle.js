var Beetle = function(x, y){
  var beetle = new Sprite(function(my){

    my.x = x;
    my.y = y;
    my.width = 30;
    my.height = 25;
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
      my.ay = 0;
    });

    my.update(function(){
      var dx = Math.abs(my.x - player.x);
      var dy = Math.abs(player.y - my.y);
      if(dx < 400 && dy < 100){
        if(my.x - player.x > 0){
          my.state = 'leftwalk';
          if(my.ax>-3.5) my.ax -= 0.03+(dx/40000);
          if(!my.jump && my.ax>-3.1 && my.ax<-3){
            my.ay = -3;
            my.jump = true;
          }
        }
        if(my.x - player.x < 0){
          my.state = 'rightwalk';
          if(my.ax<3.5) my.ax += 0.03+(dx/40000);
          if(!my.jump && my.ax>3 && my.ax<3.1){
            my.ay = -3;
            my.jump = true;
          }
        }
      }
      if(my.ay>20) my.dead();
    });

    my.animate(resource.beetle, 137, 191, {
      left: 1,
      leftRun: 1,
      leftJump: 1,
      right: 0,
      rightRun: 0,
      rightJump: 0
    }, 9, [30,5,0,5]);

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
