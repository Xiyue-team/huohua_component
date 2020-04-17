/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/23 13: 23
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {RightAngle3dModel} from './RightAngle3dModel';

export class CartesianXiViewHandler extends CommonViewHandler implements ViewHandler {

   public mountaion: RightAngle3dModel;
    falg: any = false;
    constructor(vm: Vue) {
        super(vm);
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
         this.mountaion = new RightAngle3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    resize():  void {  //resize

        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
       this.mountaion.resize(width, height);
    }

    reset():  void {  //reset
        this.viewModel.$data.originPonit = false;
        this.viewModel.$data.zoxPlane = false;
        this.viewModel.$data.yozPlane = false;
        this.viewModel.$data.xoyPlane = false;
        this.viewModel.$data.axisColor = false;
        this.viewModel.$data.fuzhuXian = false;

        this.mountaion.axisUtils.changePoint = [80, 80 , 0];
        // this.mountaion.axisUtils.signStart = [[1, 1 , 1 ] , [ 1 , 1 , 0],
        //     [ 1 , 0, 1], [1, 0 , 0], [ 0, 1, 1], [0, 1 , 0], [0, 0 , 1], [ 0, 0 , 0]];
        this.mountaion.axisUtils.nowSignStart = [[ 1, 1 , 0] , [1, 0 , 1], [ 1, 0 , 0],
            [ 0, 1 , 1], [ 0, 1 , 0], [ 0, 0 , 1], [ 0, 0 , 0]];
        this.mountaion.axisUtils.count = 2;

        // this.mountaion.pointP = null;
       this.mountaion.createPointP();
        this.mountaion.createFuZhuXian();
        this.mountaion.resetCamera();
    }

    show (value: any) { //显示坐标原点
        this.mountaion.sphere.visible = value;
    }
    showPlane(value: any, k: any) {  //显示平面
       switch (k) {
           case 1:
               this.mountaion.xoyPlane.visible = value;
               break;
           case 2:
               this.mountaion.yozPlane.visible = value;
               break;
           case 3:
               this.mountaion.zoxPlane.visible = value;
               break;
       }
    }

    showAxis (value: any) { //显示坐标轴
        if (value) {
            this.mountaion.scene.remove(this.mountaion.obj1);
            this.mountaion.createAxis('red');
        } else {
            this.mountaion.scene.remove(this.mountaion.obj1);
            this.mountaion.createAxis('');
        }

    }

    showFuZhuXian (value: any) {  //显示辅助线
        if (value) {
            this.mountaion.showFuzhuXian = true;
            this.mountaion.obj5.visible = this.mountaion.showFuzhuXian;
        } else {
            this.mountaion.showFuzhuXian = false;
            this.mountaion.obj5.visible = this.mountaion.showFuzhuXian;
        }
    }

}
