import * as THREE from 'three';
import {TweenMax} from 'gsap';
import {Utils} from './Utils';
export class RandomDot {
    box: any;
    timer: any;
    timer1: any;
    timer2: any;
    timer3: any;
    timer4: any;
    speedX: number;
    speedY: number;
    mark: boolean;
    constructor(x: number, y: number, z: number, width: number, height: number, image: any, name: string) {
        this.box = Utils.createImg(x, y, z, width, height, image);
        this.box.name = name;
        // if (name === 'CH3COO' || name === 'H3O2') {
        //     this.mark = false;
        // } else {
        //     this.mark = true;
        // }
        // 对象移动动画的步长
        this.speedX = (Math.random() * 10 + 1) * 0.05;
        this.speedY = (Math.random() * 10 + 1) * 0.05;
    }
    // 将对象添加到three场景中
    addSince(scene: any) {
        scene.add(this.box);
    }
    // 将对象从three场景中移出
    removeSince(scene: any) {
        scene.remove(this.box);
    }
    // 一个位置移动到另一个位置的移动动画函数
    moveAnimate(startX: number, startY: number, endX: number, endY: number) {
        const disX = endX - startX;
        const disY = endY - startY;
        const dis = Math.hypot(disX, disY);
        const stepX = disX / dis * 0.5;
        const stepY = disY / dis * 0.5;
        const thiz = this;
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
    // 对象自身左右蠕动动画函数
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
    // 对象自身在一个方形区域范围内移动，且运动到一个半径radius的圆外后隐藏该对象的函数
    selfMoveAnimate1 (startX: number, startY: number, centreX: number, centreY: number, radius: number) {
        const [startX1, startY1] = [startX, startY];
        //获得当前box的left值
        let nowLeft = startX1;
        //获得当前box的top值
        let nowTop = startY1;
        //获得小球x轴最大的移动距离
        const maxWidth = -53;
        const minWidth = -245;
        //获得小球y轴最大的移动距离
        const maxHeight = 73;
        const minHeight = -95;
        const thiz = this;
        thiz.speedX = (Math.random() * 10 + 1) * 0.05;
        thiz.speedY = (Math.random() * 10 + 1) * 0.05;
        //动画进入循环
        function ani2() {
            //改变小球的left值
            nowLeft += thiz.speedX;
            //当小球到达最右边时,获得的速度需要变为负值
            if (nowLeft >= maxWidth) {
                thiz.speedX = (Math.random() * 10 + 1) * 0.05;
                thiz.speedX = -thiz.speedX;
            }
            //当小球再次到达最左边的时候,获得的速度是正值
            if (nowLeft <= minWidth) {
                thiz.speedX = (Math.random() * 10 + 1) * 0.05;
            }
            //为小球设置left值
            thiz.box.position.x = nowLeft;
            //改变小球的top值
            nowTop += thiz.speedY;
            //当小球到达最底部的时候,速度变成负值
            if (nowTop >= maxHeight) {
                thiz.speedY = (Math.random() * 10 + 1) * 0.05;
                thiz.speedY = -thiz.speedY;
            }
            //当小球再次到达最顶部小球的速度为正值
            if (nowTop <= minHeight) {
                thiz.speedY = (Math.random() * 10 + 1) * 0.05;
            }
            // 判断超出区域的时候让对象隐藏
            if ( nowLeft > -56 || nowLeft < -243 || nowTop > 78 || nowTop < -100 ) {
                thiz.box.visible = false;
            } else {
                thiz.box.visible = true;
            }
            //为小球设置top值
            thiz.box.position.y = nowTop;
            thiz.timer3 = requestAnimationFrame(ani2);
        }
        ani2();
    }

    // 对象自身在统一一个圆形区域范围内移动函数
    selfMoveAnimate (startX: number, startY: number, centreX: number, centreY: number, radius: number) {
        const [startX1, startY1] = [startX, startY];
        //获得当前对象的left值
        let nowLeft = startX1;
        //获得当前对象的top值
        let nowTop = startY1;
        const thiz = this;
        //动画进入循环
        function ani3() {
            if ( nowLeft > centreX && nowTop < centreY && Math.hypot(nowLeft - centreX, nowTop - centreY) >= radius) {
                thiz.speedY = (Math.random() * 10 + 1) * 0.03;
                thiz.speedX = -(Math.random() * 10 + 1) * 0.03;
            } else if (nowLeft < centreX && nowTop > centreY && Math.hypot(nowLeft - centreX, nowTop - centreY) >= radius) {
                thiz.speedY = -(Math.random() * 10 + 1) * 0.03;
                thiz.speedX = (Math.random() * 10 + 1) * 0.03;
            } else if (nowLeft > centreX && nowTop > centreY && Math.hypot(nowLeft - centreX, nowTop - centreY) >= radius) {
                thiz.speedY = -(Math.random() * 10 + 1) * 0.03;
                thiz.speedX = -(Math.random() * 10 + 1) * 0.03;
            } else if (nowLeft < centreX && nowTop < centreY && Math.hypot(nowLeft - centreX, nowTop - centreY) >= radius) {
                thiz.speedY = (Math.random() * 10 + 1) * 0.03;
                thiz.speedX = (Math.random() * 10 + 1) * 0.03;
            }
            nowLeft += thiz.speedX;
            nowTop += thiz.speedY;
            thiz.box.position.x = nowLeft;
            thiz.box.position.y = nowTop;
            thiz.timer4 = requestAnimationFrame(ani3);
        }
        ani3();
    }
    // 停止对象在同一圆形区域范围内移动函数
    stopMoveAnimate () {
        cancelAnimationFrame(this.timer4);
    }

}



