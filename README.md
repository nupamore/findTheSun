# Engine API

## Sprite()
### field
- id
- gravity
- static
- collision
- userControl
- x
- y
- width
- height
- ax
- ay

### method
- start( callback )  
  draw() 가 호출될 때 callback 호출  

- update( callback )  
  0.01초마다 callback 호출  

- renderer( callback )  
  프레임마다 callback 호출  

- onCrash( callback( direction, target ) )  
  충돌시 callback 호출  
  direction = 방향  
  target = 충돌한 물체  

- emitCrash( direction, target )  
  충돌이벤트를 발생시킴  

- draw( x, y )  
  해당 좌표에 그리기를 시작함
- end()  
  그리기 중단

---

## BGM
### method

---
