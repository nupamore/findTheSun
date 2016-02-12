(function(){

  this.Animate = function(iname){
      my.img = new Image();
      my.img.src = iname;

      my.frame = 0;
      my.state = 0;

      setInterval(function(){
        my.frame++;
        if(my.frame>5)
          my.frame=0;
      }, 100);

      my.renderer(function(){
        ctx.drawImage(my.img, my.frame*34, my.state*37, 34, 37, my.x, my.y, my.width, my.height);
      })

      if(my.userControl){
        document.body.addEventListener("keydown",function(){
          switch(event.keyCode){
            case 37: my.state = 0; break;
            case 38: my.state = 1; break;
            case 39: my.state = 2; break;
            case 40: break;
          }
        });
      }
  };


})();
