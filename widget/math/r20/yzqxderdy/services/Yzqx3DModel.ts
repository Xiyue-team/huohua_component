import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import { Tydy3dModel } from './Tydy3dModel';
import { Pwxdy3dModel } from './Pwxdy3dModel';
import { Sqxdy3dModel } from './Sqxdy3dModel';

export class Yzqx3DModel {

  scene: any;
  camera: any;
  renderer: any;

  tydy: Tydy3dModel;
  pwxdy: Pwxdy3dModel;
  sqxdy: Sqxdy3dModel;

  constructor(scene?: any , camera?: any, renderer?: any) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.initAxis();

    this.tydy = new Tydy3dModel(scene, camera, renderer);
    this.scene.add(this.tydy.obj1);
    this.scene.add(this.tydy.obj2);
    this.tydy.obj1.visible = true;
    this.tydy.obj2.visible = false;

    this.pwxdy = new Pwxdy3dModel(scene, camera, renderer);
    this.scene.add(this.pwxdy.obj1);
    this.scene.add(this.pwxdy.obj2);
    this.scene.add(this.pwxdy.obj3);
    this.scene.add(this.pwxdy.obj4);
    this.pwxdy.obj1.visible = false;
    this.pwxdy.obj2.visible = false;
    this.pwxdy.obj3.visible = false;
    this.pwxdy.obj4.visible = false;

    this.sqxdy = new Sqxdy3dModel(scene, camera, renderer);
    this.scene.add(this.sqxdy.obj1);
    this.scene.add(this.sqxdy.obj2);
    this.sqxdy.obj1.visible = false;
    this.sqxdy.obj2.visible = false;
  }

  // 初始化坐标轴
  initAxis() {
    const axis = AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'] } as any);
    this.scene.add(axis);
  }

  // 公式1被点击事件
  firstEquationEvent () {
      // 显示场景1
      this.tydy.obj1.visible = true;
      this.tydy.obj2.visible = false;
      this.pwxdy.obj1.visible = false;
      this.pwxdy.obj2.visible = false;
      this.pwxdy.obj3.visible = false;
      this.pwxdy.obj4.visible = false;
      this.sqxdy.obj1.visible = false;
      this.sqxdy.obj2.visible = false;
      this.pwxdy.reset();
      this.sqxdy.reset();
      (window as any).viewHandler.viewModel.$data.animationCtrl = true;
      (window as any).viewHandler.viewModel.$data.disableButtonDraw = false;
      (window as any).viewHandler.viewModel.$data.disableButtonShow = false;
      (window as any).viewHandler.viewModel.$data.disableButtonSelect = false;
  }

  // 公式2被点击事件
  secondEquationEvent () {
      this.tydy.obj1.visible = false;
      this.tydy.obj2.visible = false;
      this.pwxdy.obj1.visible = true;
      this.pwxdy.obj2.visible = false;
      this.pwxdy.obj3.visible = false;
      this.pwxdy.obj4.visible = false;
      this.sqxdy.obj1.visible = false;
      this.sqxdy.obj2.visible = false;
      this.tydy.reset();
      this.sqxdy.reset();
      (window as any).viewHandler.viewModel.$data.showColor = true;
      (window as any).viewHandler.viewModel.$data.animationCtrl = true;
      (window as any).viewHandler.viewModel.$data.disableButtonDraw = false;
      (window as any).viewHandler.viewModel.$data.disableButtonShow = false;
      (window as any).viewHandler.viewModel.$data.disableButtonSelect = false;
  }

  // 公式3被点击事件
  thirdEquationEvent () {
      // 显示场景3
      this.tydy.obj1.visible = false;
      this.tydy.obj2.visible = false;
      this.pwxdy.obj1.visible = false;
      this.pwxdy.obj2.visible = false;
      this.pwxdy.obj3.visible = false;
      this.pwxdy.obj4.visible = false;
      this.sqxdy.obj1.visible = true;
      this.sqxdy.obj2.visible = false;
      this.pwxdy.reset();
      this.tydy.reset();
      (window as any).viewHandler.viewModel.$data.animationCtrl = true;
      (window as any).viewHandler.viewModel.$data.disableButtonDraw = false;
      (window as any).viewHandler.viewModel.$data.disableButtonShow = false;
      (window as any).viewHandler.viewModel.$data.disableButtonSelect = false;
  }
}

