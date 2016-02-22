
var initMap = function(){
  // background
  var back1 = new Sprite(function(my){
    my.width = 800;
    my.height = 600;
    my.collision = false;
    my.tag = 'background';
    my.alp = 1;

    my.renderer(function(){
      my.ani.img = new Image();
      my.ani.img.src = 'img/background1.png';
      ctx.save();
      ctx.globalAlpha = my.alp;
      ctx.drawImage(my.ani.img, my.x, my.y, my.width, my.height);
      ctx.restore();
    });

    my.draw(0, 0);
  });

  var back2 = new Sprite(function(my){
    my.width = 800;
    my.height = 600;
    my.collision = false;
    my.tag = 'background';
    my.alp = 0;

    my.renderer(function(){
      my.ani.img = new Image();
      my.ani.img.src = 'img/background2.png';
      ctx.save();
      if(my.alp < 1.03 && player.havepiece == 1){
        back1.alp -= 0.0001;
        my.alp += 0.01;
        if(back1.alp == 0.3){
          back1.dead();
        }
      }
      ctx.globalAlpha = my.alp;
      ctx.drawImage(my.ani.img, my.x, my.y, my.width, my.height);
      ctx.restore();
    });

    my.draw(0, 0);
  });

  var back3 = new Sprite(function(my){
    my.width = 800;
    my.height = 600;
    my.collision = false;
    my.tag = 'background';
    my.alp = 0;

    my.renderer(function(){
      my.ani.img = new Image();
      my.ani.img.src = 'img/background3.png';
      ctx.save();
      if(my.alp < 1.03 && player.havepiece == 2){
        back2.alp -= 0.0001;
        my.alp += 0.01;
        if(back2.alp == 0.3){
          back2.dead();
        }
      }
      ctx.globalAlpha = my.alp;
      ctx.drawImage(my.ani.img, my.x, my.y, my.width, my.height);
      ctx.restore();
    });

    my.draw(0, 0);
  });

  var back4 = new Sprite(function(my){
    my.width = 800;
    my.height = 600;
    my.collision = false;
    my.tag = 'background';
    my.alp = 0;

    my.renderer(function(){
      my.ani.img = new Image();
      my.ani.img.src = 'img/background4.png';
      ctx.save();
      if(my.alp < 1.03 && player.havepiece == 3){
        back3.alp -= 0.0001;
        my.alp += 0.01;
        if(back3.alp == 0.3){
          back3.dead();
        }
      }
      ctx.globalAlpha = my.alp;
      ctx.drawImage(my.ani.img, my.x, my.y, my.width, my.height);
      ctx.restore();
    });

    my.draw(0, 0);
  });

  var back5 = new Sprite(function(my){
    my.width = 800;
    my.height = 600;
    my.collision = false;
    my.tag = 'background';
    my.alp = 0;

    my.renderer(function(){
      my.ani.img = new Image();
      my.ani.img.src = 'img/background5.png';
      ctx.save();
      if(my.alp < 1.03 && player.havepiece == 4){
        back5.alp -= 0.0001;
        my.alp += 0.01;
        if(back5.alp == 0.3){
          back5.dead();
        }
      }
      ctx.globalAlpha = my.alp;
      ctx.drawImage(my.ani.img, my.x, my.y, my.width, my.height);
      ctx.restore();
    });

    my.draw(0, 0);
  });

  var tileImage = new Image();
  tileImage.src = 'img/tile.png';
  // ground
  var ground = function(){
    return new Sprite(function(my){
      my.width = 50;
      my.height = 50;
      my.static = true;

      my.renderer(function(){
        ctx.drawImage(tileImage, 196*1, 196*2, 196, 196, my.x, my.y, my.width, my.height);
      });
    });
  };

  var inground = function(){
    return new Sprite(function(my){
      my.width = 50;
      my.height = 50;
      my.static = true;

      my.renderer(function(){
        ctx.drawImage(tileImage, 196*1, 196*3, 196, 196, my.x, my.y, my.width, my.height);
      });
    });
  };

  var branch = function(){
    return new Sprite(function(my){
      my.width = 50;
      my.height = 20;
      my.tag = 'branch';
      my.static = true;

      my.renderer(function(){
        ctx.drawImage(tileImage, 196*1, 196*3, 196, 196, my.x, my.y, my.width, my.height);
      });
    });
  };

  var Sground = function(){
    return new Sprite(function(my){
      my.width = 50;
      my.height = 50;
      my.static = true;

      my.renderer(function(){
        ctx.drawImage(tileImage, 0, 196*2, 196, 196, my.x, my.y, my.width, my.height);
      });
    });
  };

  // 한번에 여러개를 그리도록 도와주는 함수
  var drawGroup = function(sprite, count, direction, pos){
    for(var i=0; i<count; i++){
      var spr = sprite();

      if(direction=='right')
        spr.draw(pos.x + (i*spr.width + i*(pos.d||0)), pos.y);
      else if(direction=='left')
        spr.draw(pos.x - (i*spr.width + i*(pos.d||0)), pos.y);
      else if(direction=='down')
        spr.draw(pos.x, pos.y + (i*spr.height + i*(pos.d||0)));
      else if(direction=='up')
        spr.draw(pos.x, pos.y - (i*spr.height + i*(pos.d||0)));
    }
  };

  // stage 1
  drawGroup(ground, 5,  'right', { x: 0,    y: 450 });
  drawGroup(ground, 10, 'right', { x: 250,  y: 500 });
  drawGroup(ground, 12, 'right', { x: 750,  y: 450 });
  drawGroup(ground, 7,  'right', { x: 1350, y: 500 });
  drawGroup(ground, 6,  'right', { x: 1700, y: 475 });
  drawGroup(ground, 10, 'right', { x: 2000, y: 425 });
  drawGroup(ground, 8,  'right', { x: 2500, y: 375 });
  drawGroup(ground, 8,  'right', { x: 2900, y: 350 });

  // stage 2
  drawGroup(inground,4, 'down',  { x: 3250, y: 400 });
  drawGroup(ground, 5,  'right', { x: 3300, y: 550 });
  drawGroup(ground, 4,  'right', { x: 3500, y: 525 });
  drawGroup(branch, 3,  'up',    { x: 3650, y: 470, d: 80 });
  drawGroup(inground,6, 'up',    { x: 3700, y: 525 });
  drawGroup(ground, 8,  'right', { x: 3700, y: 225 });
  drawGroup(inground,6, 'up',    { x: 4050, y: 525 });
  drawGroup(branch, 3,  'up',    { x: 4100, y: 470, d: 80 });
  drawGroup(ground, 8,  'right', { x: 4100, y: 525 });
  drawGroup(inground,10,'up',    { x: 4275, y: 370 });
  drawGroup(branch, 2,  'up',    { x: 4225, y: 400, d: 80 });
  drawGroup(branch, 2,  'up',    { x: 4325, y: 400, d: 80 });
  drawGroup(inground,6, 'up',    { x: 4500, y: 525 });
  drawGroup(branch, 3,  'up',    { x: 4450, y: 470, d: 80 });
  drawGroup(ground, 8,  'right', { x: 4500, y: 225 });
  drawGroup(inground,6, 'up',    { x: 4800, y: 525 });
  drawGroup(ground, 5,  'right', { x: 4850, y: 525 });
  drawGroup(ground, 5,  'right', { x: 5100, y: 475 });
  drawGroup(ground, 5,  'right', { x: 5350, y: 425 });
  drawGroup(ground, 6,  'right', { x: 5600, y: 375 });
  drawGroup(ground, 6,  'right', { x: 5000, y: 225, d: 100 });
  drawGroup(inground, 4,'up',    { x: 5900, y: 375 });
  drawGroup(branch, 2,  'up',    { x: 5850, y: 310, d: 65 });
  drawGroup(Sground, 5, 'right', { x: 5950, y: 225 });

};
