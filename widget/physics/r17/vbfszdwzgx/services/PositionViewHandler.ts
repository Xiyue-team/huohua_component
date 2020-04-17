import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {Detector} from '../../../../../src/util/Detector';
import {ViewController} from '../../../../../src/core/ViewController';
import {KonvaViewHandler} from '../../../../../src/core/viewHandler/KonvaViewHandler';
import { Position3dModel } from './Position3dModel';
import {Vbf3dModel} from './Vbf3dModel';
import {Vbf3d2Model} from './Vbf3d2Model';
export class PositionViewHandler extends KonvaViewHandler implements ViewHandler {


  position3dModel: Position3dModel;
  vbf3d: Vbf3dModel;
  vbf3d2: Vbf3d2Model;

  constructor(vm: Vue) {
    super(vm);
  }

  beforeRenderElement():  void {
    //throw new Error('Method not implemented.');
  }

  domReady():  void {
    super.domReady();
    this.position3dModel = new Position3dModel();
      const fov = 30;
      const near = 1;
      const far = 3000;
      const width = 400;
      const height = 400;
      this.vbf3d = new Vbf3dModel(document.getElementById('3dContainer1'), fov, width, height, near, far);
      ViewController.getInstance().hideLoading();
      this.vbf3d2 = new Vbf3d2Model(document.getElementById('3dContainer2'), fov, width, height, near, far);
  }

  resize():  void {
    Detector.forceMobildLandscape();
      const width = 400;
      const height = 400;
      this.vbf3d.resize(width, height);
      this.vbf3d2.resize(width, height);
  }

  reset():  void {
    this.vbf3d.reset();
    this.position3dModel.reset();
    this.viewModel.$data.color1 = false;
    this.viewModel.$data.color2 = false;
    this.viewModel.$data.color3 = false;
    this.viewModel.$data.color4 = false;
    this.viewModel.$data.color5 = false;

    this.viewModel.$data.isdisabled1 = false;
    this.viewModel.$data.isdisabled2 = true;
    this.viewModel.$data.isdisabled3 = true;
    this.viewModel.$data.isdisabled4 = true;
    this.viewModel.$data.isdisabled5 = true;
    this.viewModel.$data.count = 1;
    this.viewModel.$data.direction = [];
    this.viewModel.$data.direction2 = [];
    this.viewModel.$data.direction3 = [];
    this.viewModel.$data.backgroundControl = true;
    this.viewModel.$data.backgroundControl2 = false;
    this.vbf3d.reset();
    this.vbf3d2.reset();
    this.viewModel.$data.isShowControl = true;
    this.viewModel.$data.color6 = false;
    this.viewModel.$data.newTitle6 = '旋转';
  }

}
