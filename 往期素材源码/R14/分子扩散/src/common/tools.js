function createSphere(radius, segX, color) {
  let gemo = new THREE.CircleGeometry(radius, segX);
  // let texture=new THREE.TextureLoader().load('static/img/ball1.png');
  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;
  let material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
  });
  let Mesh = new THREE.Mesh(gemo, material);
  return Mesh
}
function createBall(radius, segX, color, R1, R2, V) {
  let tm = null;
  let that = this;
  let ball = createSphere(radius, segX, color);
  R1 = R1 || 30;
  R2 = R2 || 50;
  V = V || 0.05;
  ball.createRadom = function(min, max, flag) {
    let range,number;
    if (flag) {
       range= max - min + 1;
       number = Math.floor(Math.random() * range) + min;
    }
    else {
       range = max - min;
       number = (Math.random() * range + min).toFixed(2);
    }
    return number
  };
  ball.getPos = function(List) {

    let index = List.indexOf(ball);
    let arr = {};
    let r = this.createRadom(0, R1 - 2, false);
    let ag = this.createRadom(0, 360, true);
    let angle = ag / 180 * Math.PI;
    arr.x = r * Math.cos(angle);
    arr.y = r * Math.sin(angle);
    ball.x = parseInt(arr.x);
    ball.y = parseInt(arr.y);
    if (index === 0) {
      return arr
    }
    else {
      for (let i = 0; i < index; i++) {

        if (i === index) {
          continue
        }
        else {
          let x1 = ball.x - List[i].x;
          let y1 = ball.y - List[i].y;
          if ((Math.pow(x1, 2) + Math.pow(y1, 2)) < 320) {
            return ball.getPos(List);
          }
        }

      }
      ball.position.set(arr.x, arr.y, 590);
      return arr
    }
  };

  ball.createSpeed = function () {
    let ap = this.createRadom(0, 360, true);
    let angle = ap / 180 * Math.PI;
    let obj = {};
    obj.Vx = V * Math.cos(angle).toFixed(2);
    obj.Vy = V * Math.sin(angle).toFixed(2);
    obj.ang = ap;
    return obj
  };

  ball.getNum = function(List) {
    ball.pos = ball.getPos(List);
    let speed = this.createSpeed();
    ball.vx =speed.Vx;
    ball.vy =speed.Vy;
  };

  ball.Move = function(List) {

    let index=List.indexOf(ball);
    let L=List.length;
    clearTimeout(tm);
    function run() {
      ball.x += ball.vx;
      ball.y += ball.vy;
      ball.position.set(ball.x, ball.y, 590);
      for (let i = L-1; i >=0; i--) {
        if (i ===index) {
          continue
        }
        let x1 = ball.x - List[i].x;
        let y1 = ball.y - List[i].y;
        if ((Math.pow(x1, 2) + Math.pow(y1, 2)) < 256) {
          ball.vx = -ball.vx;
          ball.vy = -ball.vy;
          ball.x += ball.vx;
          ball.y += ball.vy;
          ball.position.set(ball.x, ball.y, 590);
          List[i].vx=-List[i].vx;
          List[i].vy=-List[i].vy;
          List[i].x+=List[i].vx;
          List[i].y+=List[i].vy;
          List[i].position.set(List[i].x, List[i].y, 590);

          let speed = ball.createSpeed();
          ball.vx =speed.Vx;
          ball.vy =speed.Vy;
          ball.x += ball.vx/2;
          ball.y += ball.vy/2;
          ball.position.set(ball.x, ball.y, 590);
        }
      }
      if ((Math.pow(ball.x, 2) + Math.pow(ball.y, 2)) >= (Math.pow(160, 2))) {
        ball.vx = -ball.vx;
        ball.vy = -ball.vy;
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.position.set(ball.x, ball.y, 590);
      }
      tm = setTimeout(run, that.Speed);
    }
    run();
  };
  return ball;
}

let tools = {
  createBall
};
export default tools;

