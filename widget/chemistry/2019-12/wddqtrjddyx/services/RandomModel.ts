import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
export class RandomModel {
    box: any;
    timer1: any;
    speedX: number;
    speedY: number;
    maxHeight: number;
    minHeight: number;
    constructor(x: number, y: number, z: number, width: number, height: number, image: any, name: string) {
        this.box = ThreeUtil.createImg(width, height, image, x, y, z);
        this.box.rotation.z = Math.PI * Math.random() * 4;
        this.box.scale.set(1.4, 1.4, 1.4);
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
        scene.remove(this.box);
    }
    //对象自身在一个方形区域范围内移动
    selfMoveAnimate (startX: number, startY: number, maxWidth: number, minWidth: number,
                     maxHeight: number, minHeight: number, rate: number) {
      const [startX1, startY1] = [startX, startY];
      //获得当前box的left值
      let nowLeft = startX1;
      //获得当前box的top值
      let nowTop = startY1;
      const self = this;
      self.speedX = (Math.random() * 5 + 1) ;
      self.speedY = (Math.random() * 5 + 1) ;

      //动画进入循环
      function ani() {
        //当小球到达最右边时,获得的速度需要变为负值
        if (nowLeft >= maxWidth) {
          self.speedX = (Math.random() * 5 + 1) * 0.1;
          self.speedX = -self.speedX;
        }
        //当小球再次到达最左边的时候,获得的速度是正值
        if (nowLeft <= minWidth) {
          self.speedX = (Math.random() * 5 + 1) * 0.1;
        }

        //当小球到达最顶部的时候,速度变成负值
        if ( nowTop >= maxHeight) {
          self.speedY = (Math.random() * 5 + 1) * 0.1;
          self.speedY = -self.speedY;
        }
        //当小球再次到达最底部小球的速度为正值
        if ( nowTop <= minHeight) {
          self.speedY = (Math.random() * 5 + 1) * 0.1;
        }

        nowLeft += self.speedX * rate;
        nowTop  += self.speedY * rate;
        //为小球设置left值
        self.box.position.x = nowLeft;
        //为小球设置top值
        self.box.position.y = nowTop;
        if (self.box.position.y >= 220 ) {
          self.box.visible = false;
        } else {
          self.box.visible = true;
        }
        self.timer1 = requestAnimationFrame(ani);
      }
      ani();
    }
    // 停止对象在同一圆形区域范围内移动函数及改变透明度函数
    stopMoveAnimate () {
        cancelAnimationFrame(this.timer1);
    }

}



