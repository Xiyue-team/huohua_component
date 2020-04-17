import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {TwoPointDistance3DModel} from './TwoPointDistance3DModel';

export class TwoPointDistanceViewHandler extends CommonViewHandler implements ViewHandler {
    public mountaion: TwoPointDistance3DModel;
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
        this.mountaion = new TwoPointDistance3DModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }


    resize():  void {  //resize

        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
       this.mountaion.resize(width, height);
    }

    reset(): void {  //重置页面

        this.viewModel.$data.AuxiliarylineOne = false;
        this.mountaion.showLine1 = false;
        this.viewModel.$data.AuxiliarylineTwo = false;
        this.mountaion.showLine2 = false;
        this.viewModel.$data.showImage = false;

       this.mountaion.axisUtils.changePoint1 = [100, 100, 0];
        this.mountaion.axisUtils.changePoint2 = [300, 300, 300];
        this.mountaion.axisUtils.signStart1 = [[1, 1 , 1], [ 1, 1, 0], [1, 0, 1], [1 , 0 , 0],
            [0 , 1 , 1], [0 , 1, 0], [0, 0, 1], [0 , 0 , 0]];
        this.mountaion.axisUtils. nowSignStart1 = [[1, 1 , 0], [1, 0 , 1], [1, 0 , 0], [0 , 1 , 1],
            [0 , 1 , 0], [0 , 0 , 1], [0 , 0 , 0]];
        this.mountaion.axisUtils.count1 = 2;
        this.mountaion.axisUtils.signStart2 = [[1, 1, 1], [1, 1, 0], [1, 0, 1], [1, 0, 0], [0, 1, 1],
            [0, 1, 0], [0, 0, 1], [0, 0, 0]];
        this.mountaion.axisUtils.nowSignStart2 = [[1, 1, 0] , [1 , 0 , 1], [1 , 0 , 0], [ 0, 1 , 1 ],
            [0 , 1 , 0], [0 , 0 , 1], [ 0, 0 , 0]];
        this.mountaion.axisUtils.count2 = 2;
     //   this.mountaion.createAxis('');
        this.mountaion.createPointMN();
        this.mountaion.createLineMN();
        this.mountaion.createFuZhuXian();
        this.mountaion.createFuZhuXian2();
        this.mountaion.resetCamera();

    }

    showImage (value: any): void {  //显示公式图片
        this.mountaion.showLine1 = value;
        this.viewModel.$data.showImage = this.mountaion.showLine1;
    }

    showFuZhuXian1 (value: any) {  //显示辅助线一
        this.mountaion.showLine1 = value;
        this.mountaion.fuzhuxian1.visible =  this.mountaion.showLine1;
    }

    showFuZhuXian2 (value: any) { //显示辅助线二
        this.mountaion.showLine2 = value;
        this.mountaion.fuzhuxian2.visible =  this.mountaion.showLine2;
    }
    // productPointM() {
    //     this.mountaion.productPointM();
    // }
    //
    // productPointN() {
    //     this.mountaion.productPointN();
    // }


}
