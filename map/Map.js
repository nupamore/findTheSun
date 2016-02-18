
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

  //stage 2
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

  for(var i=0; i<3; i++){
    var g = branch();
    g.draw(3650, 470-(i*100));
  }

  for(var i=0; i<6; i++){
    var g = inground();
    g.draw(3700, 525-(i*50));
  }

  for(var i=0; i<8; i++){
    var g = ground();
    g.draw(3700+(i*g.width), 225);
  }

  for(var i=0; i<6; i++){
    var g = inground();
    g.draw(4050, 525-(i*50));
  }

  for(var i=0; i<3; i++){
    var g = branch();
    g.draw(4100, 470-(i*100));
  }

  for(var i=0; i<8; i++){
    var g = ground();
    g.draw(4100+(i*g.width), 525);
  }

  for(var i=0; i<10; i++){
    var g = inground();
    g.draw(4275, 370-(i*50));
  }

  for(var i=0; i<2; i++){
    var g = branch();
    g.draw(4225, 400-(i*100));
  }

  for(var i=0; i<2; i++){
    var g = branch();
    g.draw(4325, 400-(i*100));
  }

  for(var i=0; i<6; i++){
    var g = inground();
    g.draw(4500, 525-(i*50));
  }

  for(var i=0; i<3; i++){
    var g = branch();
    g.draw(4450, 470-(i*100));
  }

  for(var i=0; i<8; i++){
    var g = ground();
    g.draw(4500+(i*g.width), 225);
  }

  for(var i=0; i<6; i++){
    var g = inground();
    g.draw(4800, 525-(i*50));
  }

  for(var i=0; i<5; i++){
    var g = ground();
    g.draw(4850+(i*g.width), 525);
  }

  for(var i=0; i<5; i++){
    var g = ground();
    g.draw(5100+(i*g.width), 475);
  }

  for(var i=0; i<5; i++){
    var g = ground();
    g.draw(5350+(i*g.width), 425);
  }

  for(var i=0; i<5; i++){
    var g = ground();
    g.draw(5600+(i*g.width), 375);
  }

  for(var i=0; i<5; i++){
    var g = ground();
    g.draw(5000+(i*(g.width+100)), 225);
  }

};
