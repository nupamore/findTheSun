# Engine API

## Sprite()
### field
- Setting
  - id
  - width
  - height
- Switch
  - gravity - 중력가속도
  - static - 충돌시 밀려남
  - collision - 충돌감지
  - userControl - 키보드방향키 연결
- State
  - x
  - y
  - ax - 가속도
  - ay
  - crash - 충돌상태
  - jump - 점프상태
  - state - 방향상태

### method
- start( callback )  
  draw() 가 호출될 때 callback 호출  

- update( callback )  
  0.01초마다 callback 호출  

- renderer( callback )  
  프레임마다 callback 호출  

- onCrash( callback( direction, target ) )  
  - 충돌시 callback 호출  
  - direction - 방향  
  - target - 충돌한 물체


- emitCrash( direction, target )  
  충돌이벤트를 발생시킴  

- animate( imgSrc, width, height, state , frame)   
  스프라이트의 애니메이션을 설정한다.  
  - imgSrc - 파일명
  - width, height - 프레임 한 장의 크기
  - state = { left, leftRun, leftJump, right, rightRun, rightJump }  
    해당 상태의 라인 번호
  - frame - 상태 하나의 프레임 개수



- draw( x, y )  
  해당 좌표에 그리기를 시작함
- dead()  
  그리기 중단

---
## Camera
### field
  - target - 카메라의 중심이 되는 게임object 지정  
  - marginX, marginY - 캔버스 여백 수치 지정

### method
  - set - target에 맞춰 Camera 세팅

---

## BGM
### method

---
