import {Camera, Renderer} from 'three';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import {MicroscopeModel} from './MicroscopeModel';
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
    //滑点控制器
    private imgControl = false;
    //旋转角
    angle: any = 0;
    dragControls: any;
    //Dom的宽高
    private domWidth = document.getElementById('Container').getBoundingClientRect().width;
    private domHeight = document.getElementById('Container').getBoundingClientRect().height;
    private microscopeModel: MicroscopeModel;
    //构造函数
    /**
     * @param line 直线
     * @param sliderPoint 滑点
     * @param controlPoint 控制点
     */
    constructor(sliderPoint: any, OBJ: any) {
        this.sliderPoint = sliderPoint ? sliderPoint : undefined;
        this.obj = OBJ;
        this.init();
    }

    init() {
        const fov = 30;
        const near = 1;
        const far = 3000;
        const width = document.getElementById('Container').clientWidth;
        const height = document.getElementById('Container').clientHeight;
        this.microscopeModel = new MicroscopeModel(document.getElementById('Container'), fov, width, height, near, far);
    }

    initEvent(carmea: Camera, renderer: Renderer) {
        if (this.sliderPoint) {
            this.initControlPointDragEvent(this.sliderPoint, carmea, renderer);
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
        (this.sliderPoint as any).on('touchend', (event: any) => {
            this.sliderPointTouchEnd(carmea, event);
        });
    }

    //初始化控制点的drag事件
    private initControlPointDragEvent(controls: any, camera: Camera, renderer: Renderer) {
        this.dragControls = new dragcontrols([controls], camera, renderer.domElement);
        this.dragControls.addEventListener('dragstart', () => {

        });
        this.dragControls.addEventListener('drag', () => {
            const mouseArr = {} as any;
            mouseArr.x = controls.position.x;
            mouseArr.y = controls.position.y;
            if ((window as any).viewHandler.viewModel.$data.step1 === true) {
                this.microscopeModel.reflectorHandler(mouseArr, this.obj);
            }
            if ((window as any).viewHandler.viewModel.$data.step3 === true) {
                this.microscopeModel.bigHandler(mouseArr, this.obj);
            }
            if (this.obj.smallControlPoint1) {
                this.microscopeModel.smallHandlerX10(mouseArr, this.obj);
            }
            if ( this.obj.smallControlPoint2) {
                this.microscopeModel.smallHandlerX40(mouseArr, this.obj);
            }
        });
        this.dragControls.addEventListener('dragend', () => {
            this.microscopeModel.judgeReflectorPosition(null, this.obj);
            if ((window as any).viewHandler.viewModel.$data.step3 === true) {
                this.microscopeModel.judgeBigPosition(null, this.obj);
            }
            if (this.obj.smallControlPoint1) {
                this.microscopeModel.judgeSmallPosition(null, this.obj);
            }
            if ( this.obj.smallControlPoint2) {
                this.microscopeModel.judgeSmallPositionX40(null, this.obj);
            }
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
        this.imgControl = true;
    }

    //滑点鼠标松开事件
    sliderPointMouseUp(camera: Camera, event: any) {
        this.imgControl = false;
        this.microscopeModel.judgeReflectorPosition(null, this.obj);
        if ((window as any).viewHandler.viewModel.$data.step3 === true) {
            this.microscopeModel.judgeBigPosition(null, this.obj);
        }
        if ((window as any).viewHandler.viewModel.$data.step5 === true && this.obj.smallControlPoint1) {
            this.microscopeModel.judgeSmallPosition(null, this.obj);
        }
        if ((window as any).viewHandler.viewModel.$data.step5 === true && this.obj.smallControlPoint2) {
            this.microscopeModel.judgeSmallPositionX40(null, this.obj);
        }
    }
    //滑点鼠标离开事件
    sliderPointMouseOut() {
        this.imgControl = false;
        this.microscopeModel.judgeReflectorPosition(null, this.obj);
        if ((window as any).viewHandler.viewModel.$data.step3 === true) {
            this.microscopeModel.judgeBigPosition(null, this.obj);
        }
        if ((window as any).viewHandler.viewModel.$data.step5 === true && this.obj.smallControlPoint1) {
            this.microscopeModel.judgeSmallPosition(null, this.obj);
        }
        if ((window as any).viewHandler.viewModel.$data.step5 === true && this.obj.smallControlPoint2) {
            this.microscopeModel.judgeSmallPositionX40(null, this.obj);
        }
    }
    //滑点鼠标离开事件
    sliderPointMouseMove(camera: Camera, event: any) {
        if (this.imgControl === false) {
            return;
        }
        const mousePointX = (event as any).data.originalEvent.clientX;
        const mousePointY = (event as any).data.originalEvent.clientY;
        const mouseArr = ThreeUtil.getMousePos(event, mousePointX, mousePointY, camera, this.domWidth, this.domHeight);
        if ((window as any).viewHandler.viewModel.$data.step1 === true) {
            this.microscopeModel.reflectorHandler(mouseArr, this.obj);
        }
        if ((window as any).viewHandler.viewModel.$data.step3 === true) {
            this.microscopeModel.bigHandler(mouseArr, this.obj);
        }
        if ((window as any).viewHandler.viewModel.$data.step5 === true && this.obj.smallControlPoint1) {
            this.microscopeModel.smallHandlerX10(mouseArr, this.obj);
        }
        if ((window as any).viewHandler.viewModel.$data.step5 === true && this.obj.smallControlPoint2) {
            this.microscopeModel.smallHandlerX40(mouseArr, this.obj);
        }
    }
    //滑点触摸开始事件
    sliderPointTouchStart(camera: Camera, event: any) {
        this.imgControl = true;
    }
    //滑点触摸结束事件
    sliderPointTouchEnd(camera: Camera, event: any) {
        this.imgControl = false;
    }
    //滑点触摸移动事件
    sliderPointTouchMove(camera: Camera, event: any) {
        if (this.imgControl === false) {
            return;
        }
        const TouchPX = (event as any).data.originalEvent.changedTouches[0].clientX;
        const TouchPY = (event as any).data.originalEvent.changedTouches[0].clientY;
        const mouseArr = ThreeUtil.getMousePos(event, TouchPX, TouchPY, camera, this.domWidth, this.domHeight);
        this.microscopeModel.reflectorHandler(mouseArr, this.obj);
        if ((window as any).viewHandler.viewModel.$data.step3 === true) {
            this.microscopeModel.bigHandler(mouseArr, this.obj);
        }
        if ((window as any).viewHandler.viewModel.$data.step5 === true && this.obj.smallControlPoint1) {
            this.microscopeModel.smallHandlerX10(mouseArr, this.obj);
        }
        if ((window as any).viewHandler.viewModel.$data.step5 === true && this.obj.smallControlPoint2) {
            this.microscopeModel.smallHandlerX40(mouseArr, this.obj);
        }
    }
}
