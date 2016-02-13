
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

for(var i=0; i<10; i++){
  var g = ground();
  g.draw(i*(g.width)+250, 500);
}

for(var i=0; i<5; i++){
  var g = ground();
  g.draw(i*(g.width), 450);
}

for(var i=0; i<10; i++){
  var g = ground();
  g.draw(i*(g.width)+750, 450);
}
