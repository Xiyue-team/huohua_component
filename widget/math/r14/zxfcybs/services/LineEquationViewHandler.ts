/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/7/3 15:38
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';

import {LineEquation3dModel} from './LineEquation3dModel';
import {Vector3} from 'three';
export class LineEquationViewHandler extends CommonViewHandler implements ViewHandler {


     lineEquationModel: LineEquation3dModel;

    //直线
    line: any;
    //直线的开始点
    startPoint: any;
    //直线的结束点
    endPoint: any;

    //拖动滑条重新计算开始点坐标
    x1: number;
    y1: number;

    //直线长度
    r: number;


    constructor(vm: Vue) {
        super(vm);
    }



    /**
     * 初始化对象
     */
    initElement() {

    }
    beforeRenderElement():  void {
        //throw new Error('Method not implemented.');
    }
    domReady():  void {
        super.domReady();
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
        this.lineEquationModel = new LineEquation3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }








    /**
     * 滑动滑块触触发事件
     * @param {number} slidernumber1
     * @param {number} slidernumber2
     * @param {number} slidernumber3
     */
    slider1Event(slidernumber1: number, slidernumber2: number, slidernumber3: number) {

        //计算长度
        // const r = (Math.sqrt(Math.pow(69, 2) + Math.pow(69, 2)));
        const r = (Math.sqrt(Math.pow(139, 2) + Math.pow(139, 2)));
        // 计算斜率
        const k = -(slidernumber1 / slidernumber2);
        //计算角度
        const angle = Math.atan(k);

        if (slidernumber2 !== 0) {
            //滑条B值不为零时
            //计算B点坐标
            const y = r * Math.sin(angle);
            const x = r * Math.cos(angle);
            //结束点
            this.endPoint = new Vector3(x, y, 0);
            //计算A点坐标
            if (slidernumber1 > 0) { //滑条值A 大于 零
                if (slidernumber2 > 0) { //滑条值B 大于零
                    this.y1 = r * Math.sin(Math.PI - Math.abs(angle));
                    this.x1 = r * Math.cos(Math.PI - Math.abs(angle));
                    this.startPoint = new Vector3(this.x1, this.y1, 0);
                    this.lineEquationModel.resetDrawLine(this.startPoint, this.endPoint);
                } else {
                    this.y1 = r * Math.sin(Math.PI + Math.abs(angle));
                    this.x1 = r * Math.cos(Math.PI + Math.abs(angle));
                    this.startPoint = new Vector3(this.x1, this.y1, 0);
                    this.lineEquationModel.resetDrawLine(this.startPoint, this.endPoint);
                }
            } else {  //滑条A值 小于零时
                if (slidernumber2 < 0) { //滑条B值 小于零
                    this.y1 = r * Math.sin(Math.PI - Math.abs(angle));
                    this.x1 = r * Math.cos(Math.PI - Math.abs(angle));
                    this.startPoint = new Vector3(this.x1, this.y1, 0);
                    this.lineEquationModel.resetDrawLine(this.startPoint, this.endPoint);
                } else {
                    this.y1 = r * Math.sin(Math.PI + Math.abs(angle));
                    this.x1 = r * Math.cos(Math.PI + Math.abs(angle));
                    this.startPoint = new Vector3(this.x1, this.y1, 0);
                    this.lineEquationModel.resetDrawLine(this.startPoint, this.endPoint);
                }
            }
            if (slidernumber3 !== 0) { //滑条C不为零时
                console.log('4565');
                this.startPoint = new Vector3(this.x1, this.y1 + ((-slidernumber3 / slidernumber2) * 10), 0);
                this.endPoint = new Vector3(x, y + ((-slidernumber3 / slidernumber2) * 10), 0);
                this.lineEquationModel.resetDrawLine(this.startPoint, this.endPoint);
            }


        } else if (slidernumber1 !== 0) { //滑条A值不为零时
            this.startPoint = new Vector3(-(slidernumber3 / slidernumber1) * 10, -r, 0);
            this.endPoint = new Vector3(-(slidernumber3 / slidernumber1) * 10, r, 0);
            this.lineEquationModel.resetDrawLine(this.startPoint, this.endPoint);

        } else if (slidernumber2 === 0 && slidernumber1 === 0) {
            //滑动条A，B 值均为零 直线不存在;
            this.startPoint = new Vector3(0, 0, 0);
            this.endPoint = new Vector3(0, 0, 0);
            this.lineEquationModel.resetDrawLine(this.startPoint, this.endPoint);
            this.viewModel.$data.numberA = '';
            this.viewModel.$data.numberB = '';
            this.viewModel.$data.numberOne = '不存在';

        }
        //如果滑条B值等于零
        this.panDuanMethods(slidernumber1, slidernumber2, slidernumber3);
    }
    /**
     *判断滑条B值是否为零
     * @param {number} slidernumber1
     * @param {number} slidernumber2
     * @param {number} slidernumber3
     */
    panDuanMethods(slidernumber1: number, slidernumber2: number, slidernumber3: number) {
        if (slidernumber2 === 0 ) { //滑条B值为零
            this.viewModel.$data.jieju =  '不存在';
            this.viewModel.$data.xielv =  '不存在';
            this.lineEquationModel.jpoint.position.set(0, 0, 0 );
            this.lineEquationModel.jpoint.visible = false;

            //斜率不存在情况下 移除倾斜角
            this.lineEquationModel.removeQxAngle();
            const x = -(slidernumber3 / slidernumber1) * 10;
            this.lineEquationModel.removeRightAngle();
            this.lineEquationModel.createRightAngle(x, 0, 0);
        } else {
            this.viewModel.$data.jieju = -parseFloat((slidernumber3 / slidernumber2).toFixed(2));
            this.viewModel.$data.xielv = -parseFloat((slidernumber1 / slidernumber2).toFixed(2));
            this.lineEquationModel.jpoint.visible = true;
            this.lineEquationModel.jpoint.position.set(0, this.viewModel.$data.jieju * 10, 0);

            //绘制倾斜角
            let angle;
            if (this.viewModel.$data.xielv >= 0) {
                angle = Math.atan(this.viewModel.$data.xielv);
            } else {
                angle = Math.atan(this.viewModel.$data.xielv) + Math.PI;
            }
            const x = -(slidernumber3 / slidernumber1) * 10;
            this.lineEquationModel.removeRightAngle();
            this.lineEquationModel.resetQxAngle(angle, x, 0, 0);
        }

        if (slidernumber2 === 0 && slidernumber1 === 0) {
            //移除直角
            this.lineEquationModel.removeRightAngle();
        }
    }




    /**
     * 重置窗口大小
     */
    resize():  void {
        Detector.forceMobildLandscape();

    }

    /**
     * 重置
     */
    reset():  void {
            this.lineEquationModel.resetModelPosition();
    }

    runTest():  void {
    }

}
