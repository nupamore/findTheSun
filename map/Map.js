
for(var i=0; i<10; i++){
  new Sprite(function(my){
    my.width = 50;
    my.height = 50;
    my.static = true;

    my.renderer(function(){
      ctx.beginPath();
        ctx.fillStyle = "rgba(0,0,0,100)";
        ctx.rect(my.x, my.y, my.width, my.height);
        ctx.stroke();
    });

    my.draw(i*(my.width+1)+250, 500);

  });
}

for(var i=0; i<5; i++){
  new Sprite(function(my){
    my.width = 50;
    my.height = 50;
    my.static = true;

    my.renderer(function(){
      ctx.beginPath();
        ctx.fillStyle = "rgba(0,0,0,100)";
        ctx.rect(my.x, my.y, my.width, my.height);
        ctx.stroke();
    });

    my.draw(i*(my.width+1), 450);

  });
}

for(var i=0; i<10; i++){
  new Sprite(function(my){
    my.width = 50;
    my.height = 50;
    my.static = true;

    my.renderer(function(){
      ctx.beginPath();
        ctx.fillStyle = "rgba(0,0,0,100)";
        ctx.rect(my.x, my.y, my.width, my.height);
        ctx.stroke();
    });

    my.draw(i*(my.width+1)+750, 450);

  });
}
