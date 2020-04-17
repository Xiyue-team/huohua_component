import {Camera, Renderer} from 'three';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';

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

    //属性
    //滑点
    sliderPoint: any;
    //控制点
    controlPoint: any;
    //直线
    line: any;

    //滑点 初始位置 当前位置
    private lastPointX: number;
    private lastPointY: number;
    private currentPointX: number;
    private currentPointY: number;

    //滑点控制器
    private imgControl = false;

    //旋转角
    angle: any = 0;


    dragControls: any;


    //Dom的宽高
    private domWidth = document.getElementById('3dContainer').getBoundingClientRect().width;
    private domHeight = document.getElementById('3dContainer').getBoundingClientRect().height;

    //构造函数
    /**
     * @param line 直线
     * @param sliderPoint 滑点
     * @param controlPoint 控制点
     */
    constructor(line: any, sliderPoint?: any, controlPoint?: any) {
        this.line = line;
        this.sliderPoint = sliderPoint ? sliderPoint : undefined;
        this.controlPoint = controlPoint ? controlPoint : undefined;
    }


    initEvent(carmea: Camera, renderer: Renderer, controls: any) {

        if (this.sliderPoint) {
            this.initSliderPointMouseEvent(carmea);
            this.initSliderPointTouchEvent(carmea);
        }
        this.initControlPointDragEvent(controls, carmea, renderer);

    }


    //初始化滑点鼠标事件
    private initSliderPointMouseEvent(carmea: Camera) {

        (this.sliderPoint as any).on('mousedown', (event: any) => {
            this.sliderPointMouseDown(carmea, event);
        });
        (this.sliderPoint as any).on('mouseup', () => {
            this.sliderPointMouseUp();
        });
        (this.sliderPoint as any).on('mouseout', () => {
            this.sliderPointMouseOut();
        });
        (this.sliderPoint as any).on('mousemove', (event: any) => {
            this.sliderPointMouseMove(carmea, event);
        });

    }

    //初始化的滑点触摸事件
    private initSliderPointTouchEvent(carmea: Camera) {

        (this.sliderPoint as any).on('touchstart', (event: any) => {
            this.sliderPointTouchStart(carmea, event);
        });
        (this.sliderPoint as any).on('touchmove', (event: any) => {
            this.sliderPointTouchMove(carmea, event);
        });
        (this.sliderPoint as any).on('touchend', () => {
            this.sliderPointTouchEnd();
        });

    }


    //初始化控制点的drag事件
    private initControlPointDragEvent(controls: any, camera: Camera, renderer: Renderer) {

        if (!this.controlPoint || (this.controlPoint.material as any).opacity === 0) {
            return;
        }

        this.dragControls = new dragcontrols([this.controlPoint], camera, renderer.domElement);

        this.dragControls.addEventListener('dragstart', () => {
            this.controlPointDragStart(controls);
        });
        this.dragControls.addEventListener('drag', () => {
            this.controlPointDrag();
        });
        this.dragControls.addEventListener('dragend', () => {
            this.controlPointDragEnd(controls);
        });

    }


    //控制点拖拽开始事件
    controlPointDragStart(controls: any) {
        controls.enabled = false;
        this.controlPointDragStartCallback();
    }

    controlPointDragStartCallback() {

    }

    //控制点拖拽事件
    controlPointDrag() {
        this.controlPointDragCallback();
    }

    controlPointDragCallback() {

    }

    //控制点拖拽事件
    controlPointDragEnd(controls: any) {
        controls.enabled = true;
        this.controlPointDragEndCallback();
    }

    controlPointDragEndCallback() {

    }

    //滑点鼠标压下事件
    sliderPointMouseDown(camera: Camera, event: any) {

        const mousePointX = (event as any).data.originalEvent.clientX;
        const mousePointY = (event as any).data.originalEvent.clientY;

        this.lastPointX = ThreeUtil.getMousePos(event, mousePointX, mousePointY, camera, this.domWidth, this.domHeight).x;
        this.lastPointY = ThreeUtil.getMousePos(event, mousePointX, mousePointY, camera, this.domWidth, this.domHeight).y;
        this.imgControl = true;

        this.sliderPointMouseDownCallback();
    }

    //滑点鼠标压下的回调函数
    sliderPointMouseDownCallback() {

    }

    //滑点鼠标松开事件
    sliderPointMouseUp() {
        this.imgControl = false;
        this.sliderPointMouseUpCallback();
    }

    //滑点鼠标松开的回调函数
    sliderPointMouseUpCallback() {

    }


    //滑点鼠标离开事件
    sliderPointMouseOut() {

        this.imgControl = false;
        this.sliderPointMouseOutCallback();

    }

    //滑点鼠标离开回调函数
    sliderPointMouseOutCallback() {

    }

    //滑点鼠标离开事件
    sliderPointMouseMove(camera: Camera, event: any) {

        if (this.imgControl === false) {
            return;
        }
        const mousePointX = (event as any).data.originalEvent.clientX;
        const mousePointY = (event as any).data.originalEvent.clientY;

        this.currentPointX = ThreeUtil.getMousePos(event, mousePointX, mousePointY, camera, this.domWidth, this.domHeight).x;
        this.currentPointY = ThreeUtil.getMousePos(event, mousePointX, mousePointY, camera, this.domWidth, this.domHeight).y;
        const controlPoint = {x: this.controlPoint.position.x, y: this.controlPoint.position.y};

        //旋转角
        const xzAngle1 = ThreeUtil.getAngle(controlPoint, this.lastPointX, this.lastPointY, this.currentPointX, this.currentPointY);

        //判断旋转方向顺时针或逆时针
        const direction = ThreeUtil.isClockwise(this.controlPoint, this.lastPointX,
            this.lastPointY, this.currentPointX, this.currentPointY);

        if (direction) {  //逆时针
            this.controlPoint.rotateZ(xzAngle1);
            if (this.angle >= Math.PI * 2) { //旋转角大于360 取余
                this.angle = this.angle % (Math.PI * 2);
            }
            this.angle += xzAngle1;
        } else {  //顺时针
            this.controlPoint.rotateZ(-xzAngle1);
            if (this.angle < (-Math.PI * 2)) { //旋转角小于360 取余
                this.angle = this.angle % (Math.PI * 2);
            }
            this.angle -= xzAngle1;
        }

        this.lastPointX = this.currentPointX;
        this.lastPointY = this.currentPointY;

        this.sliderPointMouseMoveCallback();

    }

    //滑点鼠标移动的回调函数
    sliderPointMouseMoveCallback() {

    }


    //滑点触摸开始事件
    sliderPointTouchStart(camera: Camera, event: any) {
        const TouchPX = (event as any).data.originalEvent.changedTouches[0].clientX;
        const TouchPY = (event as any).data.originalEvent.changedTouches[0].clientY;

        this.lastPointX = ThreeUtil.getMousePos(event, TouchPX, TouchPY, camera, this.domWidth, this.domHeight).x;
        this.lastPointY = ThreeUtil.getMousePos(event, TouchPX, TouchPY, camera, this.domWidth, this.domHeight).y;
        this.imgControl = true;

        this.sliderPointTouchStartCallback();
    }

    // 滑点触摸开始的回调函数
    sliderPointTouchStartCallback() {

    }

    //滑点触摸结束事件
    sliderPointTouchEnd() {
        this.imgControl = false;
        this.sliderPointTouchEndCallback();
    }

    //滑点触摸结束回调函数
    sliderPointTouchEndCallback() {

    }

    //滑点触摸移动事件
    sliderPointTouchMove(camera: Camera, event: any) {
        if (this.imgControl === false) {
            return;
        }
        const TouchPX = (event as any).data.originalEvent.changedTouches[0].clientX;
        const TouchPY = (event as any).data.originalEvent.changedTouches[0].clientY;


        this.currentPointX = ThreeUtil.getMousePos(event, TouchPX, TouchPY, camera, this.domWidth, this.domHeight).x;
        this.currentPointY = ThreeUtil.getMousePos(event, TouchPX, TouchPY, camera, this.domWidth, this.domHeight).y;
        const sliderPoint = {x: this.controlPoint.position.x, y: this.controlPoint.position.y};

        //旋转角
        const xzAngle = ThreeUtil.getAngle(sliderPoint, this.lastPointX, this.lastPointY, this.currentPointX, this.currentPointY);
        //判断旋转方向顺时针或逆时针
        const direction = ThreeUtil.isClockwise(this.controlPoint, this.lastPointX, this.lastPointY,
            this.currentPointX, this.currentPointY);

        if (direction) {  //逆时针
            this.controlPoint.rotateZ(xzAngle);
            if (this.angle >= Math.PI * 2) { //旋转角大于360 取余
                this.angle = this.angle % (Math.PI * 2);
            }
            this.angle += xzAngle;
        } else {  //顺时针
            this.controlPoint.rotateZ(-xzAngle);
            if (this.angle < (-Math.PI * 2)) { //旋转角小于360 取余
                this.angle = this.angle % (Math.PI * 2);
            }
            this.angle -= xzAngle;
        }

        this.lastPointX = this.currentPointX;
        this.lastPointY = this.currentPointY;

        this.sliderPointTouchMoveCallback();
    }

    // 滑点触摸移动回调
    sliderPointTouchMoveCallback() {

    }


}
