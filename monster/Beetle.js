var Beetle = function(x, y){
  var beetle = new Sprite(function(my){

    my.width = 32;
    my.height = 32;
    my.moveSpeed = 5;
    my.tag = 'monster';
    my.state = 'left';
    my.gravity = true;

    var dx, dy;

    var interval = setInterval(function(){
      var dx = Math.abs(my.x - player.x);
      var dy = Math.abs(player.y - my.y);
      if(dx < 400 && dy < 80){
        if(my.x - player.x > 0){
          my.state = 'leftwalk';
          my.ax -= 0.1;
          if(my.ax>3 && my.ax<3.2) my.ay = -4;
        }
        if(my.x - player.x < 0){
          my.state = 'rightwalk';
          my.ax += 0.1;
          if(my.ax>3 && my.ax<3.2) my.ay = -4;
        }
      }
    }, 10);

    my.animate(resource.beetle, 18, 18, {
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
          clearInterval(interval);
        }else{
          target.dead();
          clearInterval(interval);
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

  return beetle;
};
