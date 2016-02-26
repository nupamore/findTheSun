

var player;
var level;

var gameStart = function(lv){

  // 스프라이트 비우기
  sprites = {};
  allSprites = {};

  level = lv || 1;

  for(var i in sprites){
    sprites[i].dead();
  }
  initMap();

  player = new Sprite(function(my){

    my.width = 20;
    my.height = 60;

    my.gravity = true;
    my.tag = 'player';
    my.moveSpeed = 20;
    my.havepiece = 0;

    my.animate(resource.player, 133, 191, {
      left: 2,
      leftRun: 3,
      leftJump: 5,
      right: 0,
      rightRun: 1,
      rightJump: 4
    }, 8, [10,15,0,15]);

    my.onDead(function(){
      setTimeout(gameStart, 100);
    });

    my.remove('crashes');
    my.onCrash(function(direction, target){
      if(target.tag == 'water'){
        my.x -= 0.45;
        if(my.ay>1){
          my.ay -= 0.2;
        }
        else if(my.ay<-1){
          my.ay += 0.2;
        }
        my.jump = false;
        return;
      }
      if(target.tag == 'ball'){
        my.dead();
        return;
      }
      if(target.tag == 'branch'){
        if(direction=='bottom' && my.ay>0 && (my.y+my.height)<target.y+10){
          my.y = target.y - my.height;
          my.ay = 0;
          my.jump = false;
          setTimeout(function(){
            target.dead();
          },1000)
          setTimeout(function(){
            target.draw();
          },3000)
        }
      }
      else{
        switch(direction){
          case 'bottom':
            my.y = target.y - my.height;
            my.ay = 0;
            if(target.tag == 'star'){
              my.jump = true;
            }else{
              my.jump = false;
            }
          break;
          case 'top':
            my.y = target.y + target.height;
            my.ay = 0;
          break;
          case 'right': my.x = target.x - my.width; break;
          case 'left': my.x = target.x + target.width; break;
        }
      }

    });

  }).draw(100,200);


  new Weed(600 + Math.random()*600,300);
  new Mouse(400 + Math.random()*600,300,10+Math.random()*10);

  new Weed(1500 + Math.random()*1600,300);

  new Beetle(4400 + Math.random()*50, 400);

  new Weed(7000 + Math.random()*500,100);

  new Bat(7300 + Math.random()*600,650+Math.random()*50);

  new Weed(9000 + Math.random()*600,50);
  new Mouse(9300 + Math.random()*400,300,10+Math.random()*10);

  if(level != 1){
    new Mouse(500,400,20);
    new Mouse(700,400,15);
    new Mouse(300,400);
    new Mouse(300,400,17);
    new Beetle(4450, 400);
    new Beetle(1000, 400);
    new Weed(1200,300);
    new Bat(800,400);
  }

  new Piece(1290, 420);
  new Piece(3250, 330);
  new Piece(5940, 200);
  new Piece(8300, 50);
  new Piece(10450, 450);

  Camera.target = player;
};
