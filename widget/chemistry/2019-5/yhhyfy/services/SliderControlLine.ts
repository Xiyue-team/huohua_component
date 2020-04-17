import {
    Camera,
    Renderer
  } from 'three';
  import {
    ThreeUtil
  } from '../../../../../src/three/util/ThreeUtil';
  import {
    SgdhhModel
  } from './SgdhhModel';
  const dragcontrols = require('three-dragcontrols').default;
  /**
  * 直线类对象
  * 主要属性
  * 1.滑点   旋转直线
  * 2.控制点 平移直线
  * 3.直线
  *
  * 这个类主要用来给直线上的滑点绑定鼠标事件，触摸事件,
  * 给直线上控点绑定拖拽事件
  *
  *
  */
  export class SliderControlLine {
    controlPoint: any;
    //Dom的宽高
    private domWidth = document.getElementById('3dContainer').getBoundingClientRect().width;
    private domHeight = document.getElementById('3dContainer').getBoundingClientRect().height;
    private moveFlag = true;
    dragControls: any;
    private noDrag: boolean;
    private SgdhhModel: any;
    //构造函数
    /**
     * @param line 直线
     * @param controlPoint 滑点
     * @param controlPoint 控制点
     */
    constructor(controlPoint: any, ow: SgdhhModel, noDrag?: boolean) {
        this.controlPoint = controlPoint;
        this.noDrag = noDrag;
        this.SgdhhModel = ow;
    }
    initEvent(camera: Camera, renderer: Renderer) {
        if (this.noDrag) {
            this.initMouseEvent(camera, this.controlPoint);
            this.initTouchEvent(camera, this.controlPoint);
        } else {
            this.initDragEvent(this.controlPoint, camera, renderer);
        }
        return this.dragControls;
    }
    //初始化滑点鼠标事件
    private initMouseEvent(camera: Camera, controlPoint: any) {
        (controlPoint as any).on('mousedown', (event: any) => {
            this.MouseDown(camera, event, controlPoint.name);
        });
        (controlPoint as any).on('mouseup', () => {
            this.MouseUp();
        });
        (controlPoint as any).on('mouseout', () => {
            this.MouseOut();
        });
        (controlPoint as any).on('mousemove', (event: any) => {
            this.MouseMove(camera, event, controlPoint.name);
        });
    }
    //初始化的滑点触摸事件
    private initTouchEvent(camera: Camera, controlPoint: any) {
        (controlPoint as any).on('touchstart', (event: any) => {
            this.TouchStart(camera, event, controlPoint.name);
        });
        (controlPoint as any).on('touchmove', (event: any) => {
            this.TouchMove(camera, event, controlPoint.name);
        });
        (controlPoint as any).on('touchend', () => {
            this.TouchEnd();
        });
    }
    private initDragEvent(controlPoint: any, camera: Camera, renderer: Renderer) {
        this.dragControls = new dragcontrols(controlPoint, camera, renderer.domElement);
        this.dragControls.addEventListener('dragstart', (obj: any) => {
            this.SgdhhModel.downHandle(obj.object.name);
        });
        this.dragControls.addEventListener('drag', (obj: any) => {
            const mousePosArr = {} as any;
            const object = obj.object;
            mousePosArr.x = object.position.x;
            mousePosArr.y = object.position.y;
            this.SgdhhModel.moveHandle();
        });
        this.dragControls.addEventListener('dragend', () => {
        });
    }
  
    //滑点鼠标压下事件
    MouseDown(camera: Camera, event: any, name: string) {
        this.moveFlag = true;
    }
    //滑点鼠标松开事件
    MouseUp() {
        this.moveFlag = false;
    }
    //滑点鼠标离开事件
    MouseOut() {
        this.moveFlag = false;
    }
    //滑点鼠标离开事件
    MouseMove(camera: Camera, event: any, name: string) {
        if (!this.moveFlag) { return false; }
        const mousePointX = (event as any).data.originalEvent.clientX;
        const mousePointY = (event as any).data.originalEvent.clientY;
        const mousePosArr = ThreeUtil.getMousePos(event, mousePointX, mousePointY, camera, this.domWidth, this.domHeight);
        this.SgdhhModel.moveHandle(mousePosArr, name);
    }
    //滑点触摸开始事件
    TouchStart(camera: Camera, event: any, name: string) {
        this.moveFlag = true;
    }
    //滑点触摸结束事件
    TouchEnd() {
        this.moveFlag = false;
    }
    //滑点触摸移动事件
    TouchMove(camera: Camera, event: any, name: string) {
        if (!this.moveFlag) { return false; }
        const mousePointX = (event as any).data.originalEvent.changedTouches[0].clientX;
        const mousePointY = (event as any).data.originalEvent.changedTouches[0].clientY;
        const mousePosArr = ThreeUtil.getMousePos(event, mousePointX, mousePointY, camera, this.domWidth, this.domHeight);
        this.SgdhhModel.moveHandle(mousePosArr, name);
    }
  }
