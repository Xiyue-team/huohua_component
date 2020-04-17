import {Camera, Renderer} from 'three';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import {LineModel} from './LineModel';
import {NullEngine} from 'babylonjs';

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
    obj: any;
    //滑点 初始位置 当前位置
    private lastPointX: number;
    private lastPointY: number;
    private currentPointX: number;
    private currentPointY: number;

    //滑点控制器
    private imgControl = false;
    public pointModel: any;
    //旋转角
    angle: any = 0;
    public name: string;

    dragControls: any;


    //Dom的宽高
    private domWidth = document.getElementById('Container').getBoundingClientRect().width;
    private domHeight = document.getElementById('Container').getBoundingClientRect().height;


    //构造函数
    /**
     * @param line 直线
     * @param sliderPoint 滑点
     * @param controlPoint 控制点
     */
    constructor(sliderPoint: any, name: string, OBJ: any) {
        this.sliderPoint = sliderPoint ? sliderPoint : undefined;
        this.obj = OBJ;
        this.name = name;
    }

    initEvent(carmea: Camera, renderer: Renderer) {
        if (this.sliderPoint) {
            // this.initSliderPointMouseEvent(carmea);
            // this.initSliderPointTouchEvent(carmea);

            this.initControlPointDragEvent(this.sliderPoint, carmea, renderer, this.name);
        }

    }


    //初始化滑点鼠标事件
    private initSliderPointMouseEvent(carmea: Camera) {

        (this.sliderPoint as any).on('mousedown', (event: any) => {
            this.sliderPointMouseDown(carmea, event);

        });
        (this.sliderPoint as any).on('mouseup', (event: any) => {
            this.sliderPointMouseUp(carmea, event);
        });
        (this.sliderPoint as any).on('mouseout', (event: any) => {
            this.sliderPointMouseOut(carmea, event);
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
        (this.sliderPoint as any).on('touchend', (event: any) => {
            this.sliderPointTouchEnd(carmea, event);
        });

    }


    //初始化控制点的drag事件
    private initControlPointDragEvent(controls: any, camera: Camera, renderer: Renderer, name: string) {

        if (!this.sliderPoint || (this.sliderPoint.material as any).opacity === 0) {
            return;
        }

        this.dragControls = new dragcontrols([controls], camera, renderer.domElement);

        this.dragControls.addEventListener('dragstart', () => {

        });
        this.dragControls.addEventListener('drag', () => {

            const mouseArr = {} as any;
            mouseArr.x = controls.position.x;
            mouseArr.y = controls.position.y;

            if (name === 'F1' || name === 'F2') {
                LineModel.handleFocusDrag(mouseArr, name, this.obj);
            }
            if (name === 'M') {
                LineModel.handleMpointDrag(mouseArr, name, this.obj);
            }

        });
        this.dragControls.addEventListener('dragend', () => {
            const mouseArr = {} as any;
            mouseArr.x = controls.position.x;
            mouseArr.y = controls.position.y;
            LineModel.pointDragStop(mouseArr);

        });

    }


    //控制点拖拽开始事件
    controlPointDragStart(controls: any) {
        controls.enabled = false;

    }

    controlPointDragStartCallback() {

    }

    //控制点拖拽事件
    controlPointDrag() {

    }

    controlPointDragCallback() {

    }

    //控制点拖拽事件
    controlPointDragEnd(controls: any) {
        controls.enabled = true;

    }


    //滑点鼠标压下事件
    sliderPointMouseDown(camera: Camera, event: any) {
        this.imgControl = true;

    }


    //滑点鼠标松开事件
    sliderPointMouseUp(camera: Camera, event: any) {

    }

    //滑点鼠标松开的回调函数
    // sliderPointMouseUpCallback() {
    //
    // }


    //滑点鼠标离开事件
    sliderPointMouseOut(camera: Camera, event: any) {

        this.imgControl = false;


    }

    //滑点鼠标离开回调函数
    // sliderPointMouseOutCallback() {
    //
    // }

    //滑点鼠标离开事件
    sliderPointMouseMove(camera: Camera, event: any) {

    }

    //滑点鼠标移动的回调函数
    // sliderPointMouseMoveCallback() {
    //
    // }


    //滑点触摸开始事件
    sliderPointTouchStart(camera: Camera, event: any) {

        this.imgControl = true;


    }


    //滑点触摸结束事件
    sliderPointTouchEnd(camera: Camera, event: any) {
        this.imgControl = false;


    }

    //滑点触摸结束回调函数


    //滑点触摸移动事件
    sliderPointTouchMove(camera: Camera, event: any) {


    }


}
