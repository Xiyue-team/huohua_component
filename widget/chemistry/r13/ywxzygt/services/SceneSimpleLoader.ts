import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import {BabylonBase} from '../../../../../src/babylon/template/BabylonBase';
import * as Hammer from 'hammerjs';

const yWan1 = require('../sub_static/obj/yiwan/Y02.json');
import * as c_png from '../sub_static/obj/yiwan/C.png';
import * as h_png from '../sub_static/obj/yiwan/H.png';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import { BrowserInfo } from '../../../../../src/model/BrowserInfo';

export class SceneSimpleLoader extends BabylonBase {
  public canvas: HTMLCanvasElement;
  public scene: BABYLON.Scene;
  public camera: BABYLON.Camera;
  public light: BABYLON.Light;
  public model: any;
  public hammerManger: any;
  public qqCameraIsPinch = true;
  private pointerButton = false;
  private browserInfo: BrowserInfo;
  private lastPoint = {x : 0, y : 0};

  constructor() {
    super();
    this.browserInfo = BrowserUtil.getBrowserInfo();
  }

  async createScene() {
    //场景
    this.scene = this.initScene();
    //灯光
    this.light = this.initLight(new BABYLON.Vector3(0, 1, 0), this.scene);

    const skyLight = new BABYLON.HemisphericLight('skyLight', new BABYLON.Vector3(0, -1, 0), this.scene);
    skyLight.intensity = 0.5;

    //摄像机
    this.camera = this.initRotateCamera(new BABYLON.Vector3(0, 0, 20), this.scene, 10, 5);
    this.engine.setHardwareScalingLevel(0.4);
    this.resetEvent();

    //加载模型
    yWan1.materials[0].diffuseTexture.name = c_png;
    yWan1.materials[1].diffuseTexture.name = h_png;
    yWan1.materials[2].diffuseTexture.name = c_png;
    yWan1.materials[3].diffuseTexture.name = h_png;
    this.model = await this.importModel(yWan1);
    this.model.isPickable = true;

    const yWan2 = this.model.clone('babylon_Model_01');
    yWan2.isPickable = false;
    yWan2.rotationQuaternion.w = -yWan2.rotationQuaternion.w;
    yWan2.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.LOCAL);

    this.scene.freezeActiveMeshes();

    this.fixMobileQQ();
  }

  fixMobileQQ() {
    if (this.browserInfo.os === 'Android' && (this.browserInfo.isQQ || this.browserInfo.isWechat)) {
      this.scene.activeCamera.inputs.remove(this.scene.activeCamera.inputs.attached.pointers);
      this.hammerManger = new Hammer.Manager(this.canvas);
      this.hammerManger.add(new Hammer.Pinch());
      this.hammerManger.add(new Hammer.Pan());

      this.hammerManger.on('pinchin', () => {
        (this.scene.activeCamera as any).inertialRadiusOffset -= 0.03;
      });

      this.hammerManger.on('pinchout', () => {
        (this.scene.activeCamera as any).inertialRadiusOffset += 0.03;
      });

      this.hammerManger.on('panmove', (evt: any) => {
        if (this.qqCameraIsPinch) {
          (this.scene.activeCamera as any).inertialAlphaOffset -= evt.velocityX / 50;
          (this.scene.activeCamera as any).inertialBetaOffset -= evt.velocityY / 50;
        }
      });
    }
  }

  isClockwise(point1: any, point3: any) {
    const circlePoint = {x: this.canvas.clientWidth / 2, y: this.canvas.clientHeight / 2};
    const sp = (point1.x - point3.x) * (circlePoint.y - point3.y) - (point1.y - point3.y) * (circlePoint.x - point3.x);

    return sp <= 0;
  }

  getCameraTheta(): number {
    const theta = (this.camera as any).alpha / Math.PI * 180;
    let result = Math.abs(theta);

    if (result >= 360) {
      result = result % 360;
    }
    return result;
  }

  getEuler(): number {
    let angle;
    const result = this.model.rotationQuaternion;
    result.normalize();
    const euler = result.normalize().toEulerAngles();
    const eulerX = euler.x / Math.PI * 180;
    const eulerY = euler.y / Math.PI * 180;

    if (eulerY > 0) {
      angle = -(eulerX - 90);
    } else {
      angle = (eulerX + 270);
    }
    return angle;
  }

  //point1: 起始点 point2: 圆心 point3: 结束点
  getRotationAngle (point1: any, point3: any) {
    const circlePoint = {x: this.canvas.clientWidth / 2, y: this.canvas.clientHeight / 2};
    const b = (circlePoint.y - point1.y) * (circlePoint.y - point1.y) + (circlePoint.x - point1.x) * (circlePoint.x - point1.x);
    const a = (point3.y - point1.y) * (point3.y - point1.y) + (point3.x - point1.x) * (point3.x - point1.x);
    const c = (point3.y - circlePoint.y) * (point3.y - circlePoint.y) + (point3.x - circlePoint.x) * (point3.x - circlePoint.x);
    const cosa = (b + c - a) / (2 * Math.sqrt(b) * Math.sqrt(c));

    return Math.acos(cosa);
  }

  setModelRotation(theta: number) {
    theta = -theta * (Math.PI / 180);
    this.model.rotate(BABYLON.Axis.Y, theta, BABYLON.Space.LOCAL);
  }

  resetEvent() {
    const onPointerDown = (evt: any) => {
      if (evt.button !== 0) {
        return;
      }
      const pickInfo = this.scene.pick(this.scene.pointerX, this.scene.pointerY,  (mesh: any) => {
        return mesh ;
      } );

      if (pickInfo.hit && pickInfo.pickedMesh.isPickable) {
        this.pointerButton = true;
        this.lastPoint.x = evt.x;
        this.lastPoint.y = evt.y;
        this.qqCameraIsPinch = false;
        this.scene.activeCamera.detachControl(this.canvas);
      }
    };

    const onPointerUp = () => {
      this.pointerButton = false;
      this.qqCameraIsPinch = true;
      this.lastPoint.x = this.lastPoint.y = 0;
      this.scene.activeCamera.attachControl(this.canvas, true);
    };

    const onPointerMove = (evt: any) => {
      let rotateEuler: number;
      if (this.pointerButton) {
        const theta = this.getRotationAngle(this.lastPoint, evt);
        const moveY = evt.y - this.lastPoint.y;
        const cameraAlpha = this.getCameraTheta();
        const isClockwise = this.isClockwise(this.lastPoint, evt);

        if ((cameraAlpha >= 60 && cameraAlpha <= 115) || (cameraAlpha >= 240 && cameraAlpha <= 310) ) {
          isClockwise ? rotateEuler = theta : rotateEuler = -theta;
        } else if (cameraAlpha > 135 && cameraAlpha <= 270) {
          moveY > 0 ? rotateEuler = theta : rotateEuler = -theta;
        } else {
          moveY > 0 ? rotateEuler = -theta : rotateEuler = theta;
        }

        if (isNaN(rotateEuler)) {
            rotateEuler = 0;
        }
        this.model.rotate(BABYLON.Axis.Y, rotateEuler, BABYLON.Space.LOCAL);
        const finalTheat = this.getEuler();

        (window as any).viewHandler.shiNengCanvas.rotNedle(finalTheat);

        this.lastPoint.x = evt.x;
        this.lastPoint.y = evt.y;
      }
    };

    this.canvas.addEventListener('pointerdown', onPointerDown, false);
    this.canvas.addEventListener('pointerup', onPointerUp, false);
    this.canvas.addEventListener('pointermove', onPointerMove, false);

    this.scene.onDispose = () => {
      this.canvas.removeEventListener('pointerdown', onPointerDown);
      this.canvas.removeEventListener('pointerup', onPointerUp);
      this.canvas.removeEventListener('pointermove', onPointerMove);
    };
  }
}

