
var Weed = function(x, y){
  var weed = new Sprite(function(my){

    my.width = 32;
    my.height = 32;

    my.gravity = false;

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

    my.ani.repeat = true;

    my.remove('crashes');

    my.onCrash(function(direction, target){

      if(target.tag == 'player'){
        if(direction == 'top'){
          my.dead();
          clearInterval(ballshot);
        }else {
          target.dead();
        }
      }


      if(target.tag=='ball') return;

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
        case 'left': my.x = target.x - my.width; break;
        case 'right': my.x = target.x + target.width; break;
      }

    });

  }).draw(x, y);

  var ballshot = setInterval(function(){
    if(sprites[weed.id] && sprites[player.id]){    // 잡초와 플레이어가 존재할때만
      new Sprite(function(my){
        my.width = 20;
        my.height = 20;
        my.tag = 'ball';

        var xup = weed.x - player.x;
        var yup = weed.y - player.y;

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

        my.ax = -xup/distance;
        my.ay = -yup/distance;

        my.gravity = false;


        my.renderer(function(){
          my.img = new Image();
          my.img.src = 'a.png';
          ctx.drawImage(my.img, my.x, my.y, my.width, my.height);
        });

        my.remove('crashes');

        setTimeout( my.dead, 3000 );

      }).draw(weed.x, weed.y);
    }
  }, 2000);

  return weed;
};
