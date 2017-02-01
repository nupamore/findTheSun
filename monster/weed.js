
var Weed = function(x, y, speed, d, t){
  var ballSpeed = speed || 1;
  var distance = d || 400;
  var time = t || 2000;
  var weed = new Sprite(function(my){

    my.x = x;
    my.y = y;
    my.width = 38;
    my.height = 50;
    my.tag = 'monster';

    my.gravity = true;

    my.animate(resource.weed, 165, 235, {
      left: 0,
      leftRun: 1,
      leftJump: 0,
      right: 0,
      rightRun: 2,
      rightJump: 0,
      leftbehave: 3,
      rightbehave: 1
    }, 10, [20, 10, 0, 8]);

    my.ani.repeat = true;

    my.remove('crashes');

    my.onCrash(function(direction, target){

      if(target.tag == 'player'){
        if(direction == 'top'){
          my.dead();
        }else {
          target.dead();
        }
      }


      if(target.tag=='ball') return;
      if(target.tag == 'monster') return;
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

    my.start(function(){
      setTimeout(function(){
        my.setInterval(function(){
          var dx = Math.abs(weed.x - player.x);
          var dy = Math.abs(weed.y - player.y);
          if(dx < distance && dy < 250 && sprites[weed.id] && sprites[player.id]){    // 잡초와 플레이어가 존재할때만
            var ball = new Sprite(function(my){
              my.width = 16;
              my.height = 16;
              my.tag = 'ball';
              my.static = true;

              var xup = weed.x - player.x;
              var yup = weed.y+(weed.height/2) - (player.y+(player.height/2));


              // 애니메이션 변환
              var before = weed.state;
              if(xup >= 0){
                weed.state = 'leftbehave';
              }
              if(xup < 0){
                weed.state = 'rightbehave';
              }
              weed.ani.repeat = false;

              setTimeout(function(){
                weed.state = before;
                weed.ani.repeat = true;
              }, 600);
              //

              var distance = Math.sqrt(Math.pow(xup, 2) + Math.pow(yup, 2));

              my.ax = -xup/distance * ballSpeed;
              my.ay = -yup/distance * ballSpeed;

              my.gravity = false;


              my.animate(resource.ball, 32, 32, {
                left: 0,
                leftRun: 0,
                leftJump: 0,
                right: 0,
                rightRun: 0,
                rightJump: 0,
                leftbehave: 0,
                rightbehave: 0
              }, 4,[2,2,2,2]);

              my.remove('crashes');

              setTimeout( my.dead, 3000 );

            }).draw(weed.x+(weed.width/4), weed.y+(weed.height/5));
          }
        }, time);
      },400);
    });

  });

  return weed;
};
