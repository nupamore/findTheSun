
var initMap = function(){
  // background
  new Sprite(function(my){
    my.width = 800;
    my.height = 600;
    my.collision = false;
    my.tag = 'background';

    my.renderer(function(){
      my.ani.img = new Image();
      my.ani.img.src = 'img/background.png';
      ctx.drawImage(my.ani.img, my.x, my.y, my.width, my.height);
    });

    my.draw(0, 0);
  });

  // ground
  var ground = function(){
    return new Sprite(function(my){
      my.width = 50;
      my.height = 50;
      my.static = true;

      my.renderer(function(){
        my.ani.img = new Image();
        my.ani.img.src = 'img/tile.png';
        ctx.drawImage(my.ani.img, 196*1, 196*2, 196, 196, my.x, my.y, my.width, my.height);
      });
    });
  };

  var inground = function(){
    return new Sprite(function(my){
      my.width = 50;
      my.height = 50;
      my.static = true;

      my.renderer(function(){
        my.ani.img = new Image();
        my.ani.img.src = 'img/tile.png';
        ctx.drawImage(my.ani.img, 196*1, 196*3, 196, 196, my.x, my.y, my.width, my.height);
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
        my.ani.img = new Image();
        my.ani.img.src = 'img/tile.png';
        ctx.drawImage(my.ani.img, 196*1, 196*3, 196, 196, my.x, my.y, my.width, my.height);
      });

    });
  };

  for(var i=0; i<10; i++){
    var g = ground();
    g.draw(i*(g.width)+250, 500);
  }

  for(var i=0; i<5; i++){
    var g = ground();
    g.draw(i*(g.width), 450);
  }

  for(var i=0; i<12; i++){
    var g = ground();
    g.draw(i*(g.width)+750, 450);
  }

  for(var i=0; i<7; i++){
    var g = ground();
    g.draw(i*(g.width)+1350, 500);
  }

  for(var i=0; i<6; i++){
    var g = ground();
    g.draw(i*(g.width)+1700, 475);
  }

  for(var i=0; i<10; i++){
    var g = ground();
    g.draw(i*(g.width)+2000, 425);
  }

  for(var i=0; i<8; i++){
    var g = ground();
    g.draw(i*(g.width)+2500, 375);
  }

  for(var i=0; i<8; i++){
    var g = ground();
    g.draw(i*(g.width)+2900, 350);
  }

  for(var i=0; i<4; i++){
    var g = inground();
    g.draw(3250, i*(g.height)+400);
  }

  for(var i=0; i<5; i++){
    var g = ground();
    g.draw(i*(g.width)+3300, 550);
  }

  for(var i=0; i<4; i++){
    var g = ground();
    g.draw(i*(g.width)+3500, 525);
  }

  for(var i=0; i<10; i++){
    var g = branch();
    g.draw(400+(i*50), 450-(i*10));
  }
};
