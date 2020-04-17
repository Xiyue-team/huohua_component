export class RandomModel {
    box: any;
    timer1: any;
    speedX: number;
    speedY: number;
    maxHeight: number;
    minHeight: number;
    constructor(x: number, y: number, z: number, scale: number, width: number, height: number, model: any, name: string) {
        this.box = model.clone();
        this.box.position.set(x, y, z);
        this.box.scale.set(scale, scale, scale);
        this.box.name = name;
        // 对象移动动画的步长
        this.speedX = (Math.random() * 5 + 1) * 0.15;
        this.speedY = (Math.random() * 5 + 1) * 0.15;
    }
    // 将对象添加到three场景中
    addSince(scene: any) {
        scene.add(this.box);
    }
    // 将对象从three场景中移出
    removeSince(scene: any) {
        //删除几何体
        this.box.geometry.dispose();
        this.box.material.dispose();
        scene.remove(this.box);
    }
    // 对象自身在统一一个圆形区域范围内移动函数(模拟空气运动)
    selfAirMoveAnimate (startX: number, startY: number, centreX: number, centreY: number, radius: number, rate: number) {
      const [startX1, startY1] = [startX, startY];
      //获得当前对象的left值
      let nowLeft = startX1;
      //获得当前对象的top值
      let nowTop = startY1;
      const self = this;
      //动画进入循环
      function ani() {
        if ( nowLeft > centreX && nowTop < centreY && Math.hypot(nowLeft - centreX, nowTop - centreY) >= radius) {
          self.speedY = (Math.random() * 2 + 1) * 0.5;
          self.speedX = -(Math.random() * 2 + 1) * 0.5;
        } else if (nowLeft < centreX && nowTop > centreY && Math.hypot(nowLeft - centreX, nowTop - centreY) >= radius) {
          self.speedY = -(Math.random() * 2 + 1) * 0.5;
          self.speedX = (Math.random() * 2 + 1) * 0.5;
        } else if (nowLeft > centreX && nowTop > centreY && Math.hypot(nowLeft - centreX, nowTop - centreY) >= radius) {
          self.speedY = -(Math.random() * 2 + 1) * 0.5;
          self.speedX = -(Math.random() * 2 + 1) * 0.5;
        } else if (nowLeft < centreX && nowTop < centreY && Math.hypot(nowLeft - centreX, nowTop - centreY) >= radius) {
          self.speedY = (Math.random() * 2 + 1) * 0.5;
          self.speedX = (Math.random() * 2 + 1) * 0.5;
        }
        nowLeft += self.speedX * rate;
        nowTop += self.speedY * rate;
        self.box.position.x = nowLeft;
        self.box.position.y = nowTop;
        self.timer1 = requestAnimationFrame(ani);
      }
      ani();
    }
    // 停止对象在同一圆形区域范围内移动函数及改变透明度函数
    stopMoveAnimate () {
      cancelAnimationFrame(this.timer1);
    }

}



