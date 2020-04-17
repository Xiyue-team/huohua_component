//FIXME 删除不用包
import {Utils} from './Utils';
import * as whiteBacteria from '../sub_static/UI/white-bacteria.png';
export class RandomDot {
    //FIXME 变量名注释
    box: any;
    timer: any;
    timer1: any;
    timer2: any;
    timer3: any;
    x1: any;
    y1: any;

    //FIXME 增加代码步骤注释
    // 随机生成一个对象类
    constructor(x: number, y: number, ) {
        // const geometry = new THREE.BoxGeometry( 1, 2, 0 );
        // const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        this.box = Utils.createImg(x, y, 0, 3, 6, whiteBacteria);
        this.x1 = x;
        this.y1 = y;
        // 对象加载后自身旋转蠕动动画
        this.rotateAnimate(- Math.PI / 3, Math.PI * Math.random() * 2);
        // 对象加载后的一定范围内无规则运动动画
        this.selfMoveAnimate(x, y);
    }
    // 将新创建的类添加进three场景中
    addSince(scene: any) {
        scene.add(this.box);
    }

    //FIXME 参数增加数据类型
    // 对象由一个位置移动到目标位置的移动动画
    moveAnimate(startX: number, startY: number, endX: number, endY: number) {
        const disX = endX - startX;
        const disY = endY - startY;
        const dis = Math.hypot(disX, disY);
        const stepX = disX / dis * 0.5;
        const stepY = disY / dis * 0.5;
        const thiz = this;
        //FIXME 增加业务代码注释
        function ani() {
            if (Math.abs(endX - startX) < 1 && Math.abs(endY - startY)) {
                thiz.box.position.set(endX, endY, 0);
                cancelAnimationFrame(thiz.timer);
                return;
            }
            startX += stepX;
            startY += stepY;
            thiz.box.position.set(startX, startY, 0);
            thiz.timer = requestAnimationFrame(ani);
        }
        ani();
    }
    // 自身蠕动动画
    rotateAnimate( startAngle: number, endAngle: number) {
        const disAngle = endAngle - startAngle;
        const stepAngle = disAngle / 180;
        const thiz = this;
        let  mark1 = false;
        thiz.box.rotation.z = - Math.PI / 3;
        function ani1() {
            clearTimeout(thiz.timer2);
            if (mark1) {
                startAngle -= stepAngle;
            } else if ( !mark1) {
                startAngle += stepAngle;
            }
            if (startAngle >= Math.PI * Math.random() * 2) {
                mark1 = true;
            } else if (startAngle <= - Math.PI / 3) {
                mark1 = false;
            }
            thiz.box.rotation.z = startAngle;
            thiz.timer1 = requestAnimationFrame(ani1);
        }
        thiz.timer2 = setTimeout(ani1, Math.random() * 3000);
    }

    // 对象自身在一个范围内移动
    //FIXME 变量名注释
    selfMoveAnimate (startX: number, startY: number) {
        const [startX1, startY1] = [startX, startY];
        let speedX = (Math.random() * 10 + 1) * 0.005;
        let speedY = (Math.random() * 10 + 1) * 0.005;
        //获得当前box的left值
        let nowLeft = startX1;
        //获得当前box的top值
        let nowTop = startY1;
        //获得小球x轴最大的移动距离
        const maxWidth = 3;
        //获得小球y轴最大的移动距离
        const maxHeight = 3;
        const thiz = this;
        //动画进入循环
        function ani3() {
            //改变小球的left值
            nowLeft += speedX;
            //当小球到达最右边时,获得的速度需要变为负值
            if (nowLeft >= startX1 + maxWidth) {
                speedX = (Math.random() * 10 + 1) * 0.005;
                speedX = -speedX;
            }
            //当小球再次到达最左边的时候,获得的速度是正值
            if (nowLeft <= startX1 - maxWidth) {
                speedX = (Math.random() * 10 + 1) * 0.005;
            }
            //为小球设置left值
            thiz.box.position.x = nowLeft;
            //改变小球的top值
            nowTop += speedY;
            //当小球到达最底部的时候,速度变成负值
            if (nowTop >= startY1 + maxHeight) {
                speedY = (Math.random() * 10 + 1) * 0.005;
                speedY = -speedY;
            }
            //当小球再次到达最顶部小球的速度为正值
            if (nowTop <= startY1 - maxHeight) {
                speedY = (Math.random() * 10 + 1) * 0.005;
            }
            //为小球设置top值
            thiz.box.position.y = nowTop;
            thiz.timer3 = requestAnimationFrame(ani3);
        }
        ani3();
    }
    stopMoveAnimate () {
        cancelAnimationFrame(this.timer3);
    }
    stopMoveAnimate1 () {
        cancelAnimationFrame(this.timer);
    }
}



