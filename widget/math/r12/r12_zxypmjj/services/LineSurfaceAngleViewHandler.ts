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
import {LineSurfaceAngle3dModel} from './LineSurfaceAngle3dModel';
import {D3Helper} from '../../../../../src/three/util/3DHelper';

export class LineSurfaceAngleViewHandler extends CommonViewHandler implements ViewHandler {
    mountaion: LineSurfaceAngle3dModel;
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
       this.mountaion = new LineSurfaceAngle3dModel(document.getElementById('3dContainer'), fov, width, height, near, far);
        ViewController.getInstance().hideLoading();
    }

    resize():  void {  //resize
        Detector.forceMobildLandscape();
        const width = document.getElementById('3dContainer').clientWidth;
        const height = document.getElementById('3dContainer').clientHeight;
       this.mountaion.resize(width, height);
    }

    reset():  void {  //reset
        this.viewModel.$data.sliderNum = 45;
        this.mountaion.getParameter.angle = 45;
        this.mountaion.rightAngle.visible = false;
        this.mountaion.arcLine.visible = true;
        this.mountaion.lineMesh.rotation.set(0, Math.PI / 4, Math.PI / 180 * this.mountaion.getParameter.angle);
        this.mountaion.createDashLineMesh();
        this.mountaion.createArcLine();
        this.mountaion.resetCamera();
    }


}
