import {Utils} from './Utils';
import * as THREE from 'three';
import {Camera, DoubleSide, Renderer, Scene} from 'three';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';

const dragcontrols = require('three-dragcontrols').default;

/**
 * 直线对象类
 */
export class LineObject {

    //属性
    //直线的圆弧
    static arcLine: any;
    static jpoint: any;

    static rightAngle1: any;
    static rightAngle2: any;

    browserInfo: BrowserInfo;
    //直线
    line: any;
    //滑点
    sliderPoint: any;
    //箭头图片
    arrowImg: any;
    //直线标识文字
    lineText: any;
    //直线倾斜角
    slope: any;
    //旋转角
    angle: any = 0;
    //θ的文字
    thetaAngle: any;

    //箭头 初始位置 当前位置
    private lastPointX: number;
    private lastPointY: number;
    private currentPointX: number;
    private currentPointY: number;

    //滑点控制器
    dragControls: any;
    dragControls2: any;
    //箭头控制器
    imgControl = false;

    //Dom的宽高
    private domWidth = document.getElementById('3dContainer').getBoundingClientRect().width;
    private domHeight = document.getElementById('3dContainer').getBoundingClientRect().height;

    constructor() {
        this.browserInfo = BrowserUtil.getBrowserInfo();
    }

    //创建滑点
    createSliderPoint(r: number, x: number, y: number, color: any, opacity: number) {
        const sliderPoint = Utils.createPoint(r, color, x, y, opacity);
        return sliderPoint;
    }

    //创建直线
    createLine(angle: number, x1: number, y1: number, x2: number,
               y2: number, x3: number, y3: number, x4: number, y4: number, color: any) {

        const line = Utils.createLine1(x1, y1, x2, y2, x3, y3, x4, y4, color);
        line.rotateZ(angle);
        return line;
    }

    //创建箭头图片
    createArrow(jiantou: any, width: number, height: number, x: number, y: number) {
        const arrowImg = Utils.createImg(width, height, jiantou as any, x, y);
        const plane1 = Utils.createPlane(50, 50, 'red', 0);
        arrowImg.add(plane1);
        return arrowImg;
    }

    //创建直线文字
    createText(text: any, x: number, y: number) {
        this.lineText = Utils.createText(text, x, y, 0, '#0094FF');
        return this.lineText;
    }

    //创建交点
    createJPoint(lineObj1: LineObject, lineObj2: LineObject, scene: Scene) {
        const point = Utils.lineIntersection(lineObj1, lineObj2);
        if (LineObject.jpoint && LineObject.jpoint != null) {
            scene.remove(LineObject.jpoint);
            LineObject.jpoint.geometry.dispose();
            LineObject.jpoint.material.dispose();
        }
        LineObject.jpoint = Utils.createPoint(2, '#000000', point.x, point.y, 0);
        this.thetaAngle = Utils.createText('θ', -2, 0, 0, '#FF001F');
        LineObject.jpoint.add(this.thetaAngle);
        scene.add(LineObject.jpoint);
    }

    //方法

    //初始化箭头鼠标拖动事件
    initArrowRotateEvent(scene: any, camera: any, falg: boolean, initAngle: number, lineObj1: LineObject, lineObj2: LineObject) {

        (this.arrowImg as any).on('mousedown', (event: any) => {
            const mousePointX = (event as any).data.originalEvent.clientX;
            const mousePointY = (event as any).data.originalEvent.clientY;

            this.lastPointX = Utils.getMousePos(event, mousePointX, mousePointY, camera, this.domWidth, this.domHeight).x;
            this.lastPointY = Utils.getMousePos(event, mousePointX, mousePointY, camera, this.domWidth, this.domHeight).y;
            this.imgControl = true;

            if (falg) {
                const e = scene.children[2];
                scene.children[2] = scene.children[1];
                scene.children[1] = e;
            }

        });

        (this.arrowImg as any).on('mouseup', () => {
            this.imgControl = false;
            if (falg) {

                const e = scene.children[2];
                scene.children[2] = scene.children[1];
                scene.children[1] = e;
            }
        });

        (this.arrowImg as any).on('mouseout', () => {
            this.imgControl = false;
            if (falg) {

                const e = scene.children[2];
                scene.children[2] = scene.children[1];
                scene.children[1] = e;
            }
        });

        (this.arrowImg as any).on('mousemove', (event: any) => {

            if (this.imgControl) {


                const mousePointX = (event as any).data.originalEvent.clientX;
                const mousePointY = (event as any).data.originalEvent.clientY;

                this.currentPointX = Utils.getMousePos(event, mousePointX, mousePointY, camera, this.domWidth, this.domHeight).x;
                this.currentPointY = Utils.getMousePos(event, mousePointX, mousePointY, camera, this.domWidth, this.domHeight).y;
                const sliderPoint = {x: this.sliderPoint.position.x, y: this.sliderPoint.position.y};

                //旋转角
                const xzAngle1 = Utils.getAngle(sliderPoint, this.lastPointX, this.lastPointY, this.currentPointX, this.currentPointY);

                //判断旋转方向顺时针或逆时针
                const fxp = Utils.isClockwise(this.sliderPoint, this.lastPointX, this.lastPointY, this.currentPointX, this.currentPointY);
                if (fxp) {  //逆时针
                    this.sliderPoint.rotateZ(xzAngle1);
                    if (this.angle >= Math.PI * 2) { //旋转角大于360 取余
                        this.angle = this.angle % (Math.PI * 2);
                    }
                    this.lineText.rotateZ(-xzAngle1);
                    this.angle += xzAngle1;
                } else {  //顺时针
                    this.sliderPoint.rotateZ(-xzAngle1);
                    if (this.angle < (-Math.PI * 2)) { //旋转角小于360 取余
                        this.angle = this.angle % (Math.PI * 2);
                    }
                    this.lineText.rotateZ(xzAngle1);
                    this.angle -= xzAngle1;
                }

                const point = Utils.lineIntersection(lineObj1, lineObj2);
                LineObject.jpoint.position.set(point.x, point.y, 0);
                 //计算倾斜角
                this.slope = Utils.getSlope1(this.angle, initAngle);
                // //重绘圆弧
                //
                this.resetArclineAngle(lineObj1, lineObj2, scene);
                // //删除直角标志
                this.removeRightAngle(scene);
                // //更新侧边栏表格的数据
                this.updateTableData(lineObj1, lineObj2, scene);


                this.lastPointX = this.currentPointX;
                this.lastPointY = this.currentPointY;
            }
        });
    }

    //初始化箭头触摸拖动事件
    initTouchArrow1Event(scene: any, camera: any, falg: boolean, initAngle: number, lineObj1: LineObject, lineObj2: LineObject) {
        (this.arrowImg as any).on('touchstart', (event: any) => {
          let TouchPX: number;
          let TouchPY: number;

          if ((event as any).data.originalEvent.clientX === undefined) {
            TouchPX = (event as any).data.originalEvent.changedTouches[0].clientX;
            TouchPY = (event as any).data.originalEvent.changedTouches[0].clientY;
          } else {
            TouchPX = (event as any).data.originalEvent.clientX;
            TouchPY = (event as any).data.originalEvent.clientY;
          }

            this.lastPointX = Utils.getMousePos(event, TouchPX, TouchPY, camera, this.domWidth, this.domHeight).x;
            this.lastPointY = Utils.getMousePos(event, TouchPX, TouchPY, camera, this.domWidth, this.domHeight).y;
            this.imgControl = true;

            if (falg) {
                const e = scene.children[2];
                scene.children[2] = scene.children[1];
                scene.children[1] = e;
            }
        });

        (this.arrowImg as any).on('touchend', () => {
            this.imgControl = false;
            if (falg) {
                const e = scene.children[2];
                scene.children[2] = scene.children[1];
                scene.children[1] = e;
            }
        });

        (this.arrowImg as any).on('touchmove', (event: any) => {

            if (this.imgControl) {

              let TouchPX: number;
              let TouchPY: number;

              if ((event as any).data.originalEvent.clientX === undefined) {
                TouchPX = (event as any).data.originalEvent.changedTouches[0].clientX;
                TouchPY = (event as any).data.originalEvent.changedTouches[0].clientY;
              } else {
                TouchPX = (event as any).data.originalEvent.clientX;
                TouchPY = (event as any).data.originalEvent.clientY;
              }


                this.currentPointX = Utils.getMousePos(event, TouchPX, TouchPY, camera, this.domWidth, this.domHeight).x;
                this.currentPointY = Utils.getMousePos(event, TouchPX, TouchPY, camera, this.domWidth, this.domHeight).y;
                const sliderPoint = {x: this.sliderPoint.position.x, y: this.sliderPoint.position.y};

                //旋转角
                const xzAngle = Utils.getAngle(sliderPoint, this.lastPointX, this.lastPointY, this.currentPointX, this.currentPointY);
                //判断旋转方向顺时针或逆时针
                const fxq = Utils.isClockwise(this.sliderPoint, this.lastPointX, this.lastPointY, this.currentPointX, this.currentPointY);

                if (fxq) {  //逆时针

                    this.sliderPoint.rotateZ(xzAngle);
                    if (this.angle >= Math.PI * 2) { //旋转角大于360 取余
                        this.angle = this.angle % (Math.PI * 2);
                    }
                    this.lineText.rotateZ(-xzAngle);
                    this.angle += xzAngle;
                } else {  //顺时针
                    this.sliderPoint.rotateZ(-xzAngle);
                    if (this.angle < (-Math.PI * 2)) { //旋转角小于360 取余
                        this.angle = this.angle % (Math.PI * 2);
                    }
                    this.lineText.rotateZ(xzAngle);
                    this.angle -= xzAngle;
                }
                const point = Utils.lineIntersection(lineObj1, lineObj2);
                LineObject.jpoint.position.set(point.x, point.y, 0);

                //计算倾斜角
                this.slope = Utils.getSlope1(this.angle, initAngle);
                //重绘圆弧
                this.resetArclineAngle(lineObj1, lineObj2, scene);
                //删除直角标志
                this.removeRightAngle(scene);
                //更新侧边栏表格的数据
                this.updateTableData(lineObj1, lineObj2, scene);

                this.lastPointX = this.currentPointX;
                this.lastPointY = this.currentPointY;
            }
        });
    }

    //初始化滑点事件
    initSlider1Event(camera: Camera, renderer: Renderer, controls: any,
                     lineObj1: LineObject, lineObj2: LineObject, scene: Scene, falg: boolean) {
        //绑定拖动滑点1
        if (falg) {
            this.dragControls = new dragcontrols([lineObj1.sliderPoint], camera, renderer.domElement);
            this.dragControls2 = new dragcontrols([lineObj2.sliderPoint], camera, renderer.domElement);
        } else {
            this.dragControls = new dragcontrols([lineObj2.sliderPoint], camera, renderer.domElement);
            this.dragControls2 = new dragcontrols([lineObj1.sliderPoint], camera, renderer.domElement);
        }

        this.dragControls.addEventListener('dragstart', () => {
            controls.enabled = false;
        });

        this.dragControls.addEventListener('drag', () => {
            if (this.browserInfo.os === 'Android' || this.browserInfo.os === 'iOS') {
                const distance = Math.sqrt(Math.pow((lineObj1.sliderPoint.position.x - lineObj2.sliderPoint.position.x), 2) +
                    Math.pow((lineObj1.sliderPoint.position.y - lineObj2.sliderPoint.position.y), 2));
                if (distance <= 8) {
                    this.dragControls2.deactivate();
                } else {
                    this.dragControls2.activate();
                }
            } else {
                const distance = Math.sqrt(Math.pow((lineObj1.sliderPoint.position.x - lineObj2.sliderPoint.position.x), 2) +
                    Math.pow((lineObj1.sliderPoint.position.y - lineObj2.sliderPoint.position.y), 2));

                if (distance <= 1.5) {
                    this.dragControls2.deactivate();
                } else {
                    this.dragControls2.activate();
                }
            }

            // //移动交点
            const point = Utils.lineIntersection(lineObj1, lineObj2);
            LineObject.jpoint.position.set(point.x, point.y, 0);
            //平移重新绘制角度
            this.resetArclineAngle(lineObj1, lineObj2, scene);
            const xielv1 = parseFloat((lineObj1.slope * 180 / Math.PI).toFixed(0));
            const xielv2 = parseFloat((lineObj2.slope * 180 / Math.PI).toFixed(0));
            if (xielv1 !== 90 && xielv1 !== -90 && xielv2 !== 90 && xielv2 !== -90) {
                (window as any).viewHandler.viewModel.$data.xielvchenji = parseFloat((Math.tan(xielv1 * Math.PI / 180) *
                    Math.tan(xielv2 * Math.PI / 180)).toFixed(2));
                if (parseFloat((Math.tan(xielv1 * Math.PI / 180) *
                    Math.tan(xielv2 * Math.PI / 180)).toFixed(2)) === -1) {
                    const points = Utils.lineIntersection(lineObj1, lineObj2);
                    this.createRight1(lineObj1, lineObj2, points.x, points.y, this.browserInfo, scene);
                }
            }

            if ((xielv2 === 180 || xielv2 === 90 || xielv2 === 0) && xielv1 === 90) {
                this.createRight2(lineObj1, lineObj2, this.browserInfo, scene);
            }
            if ((xielv1 === 180 || xielv1 === 90 || xielv1 === 0) && xielv2 === 90) {
                this.createRight2(lineObj2, lineObj1, this.browserInfo, scene);
            }
        });

        this.dragControls.addEventListener('dragend', () => {
            controls.enabled = true;
        });

    }

    //两条直线斜率都存在 ， 绘制直角1
    createRight1(lineObj1: LineObject, lineObj2: LineObject, x: number, y: number, browserInfo: any, scene: Scene) {
        this.removeArcLine(scene);
        this.removeRightAngle(scene);
        const slope1 = lineObj1.slope;
        const slope2 = lineObj2.slope;

        const qPointX = x + Math.sqrt(36 / (Math.pow(Math.tan(slope1), 2) + 1));
        const qPointY = Math.tan(slope1) * Math.sqrt(25 / (Math.pow(Math.tan(slope1), 2) + 1)) + y;


        const pPointX = x + Math.sqrt(36 / (Math.pow(Math.tan(slope2), 2) + 1));
        const pPointY = Math.tan(slope2) * Math.sqrt(36 / (Math.pow(Math.tan(slope2), 2) + 1)) + y;


        const mPointX = (qPointY - pPointY + (Math.tan(slope1) * pPointX) - (Math.tan(slope2) * qPointX)) /
            (Math.tan(slope1) - Math.tan(slope2));
        const mPointY = Math.tan(slope1) * (mPointX - pPointX) + pPointY;

        //绘制直角
        if (browserInfo.isIpad) {
            LineObject.rightAngle1 = Utils.createRightAngle(new THREE.Vector3(qPointX, qPointY, 0),
                new THREE.Vector3(mPointX, mPointY, 0), 3);
            LineObject.rightAngle2 = Utils.createRightAngle(new THREE.Vector3(mPointX, mPointY, 0),
                new THREE.Vector3(pPointX, pPointY, 0), 3);
        } else {
            LineObject.rightAngle1 = Utils.createRightAngle(new THREE.Vector3(qPointX, qPointY, 0),
                new THREE.Vector3(mPointX, mPointY, 0), 1600);
            LineObject.rightAngle2 = Utils.createRightAngle(new THREE.Vector3(mPointX, mPointY, 0),
                new THREE.Vector3(pPointX, pPointY, 0), 1600);
        }
        scene.add(LineObject.rightAngle1);
        scene.add(LineObject.rightAngle2);
    }

    //两条直线斜率有一条不存在 绘制直角2
    createRight2(lineObj1: LineObject, lineObj2: LineObject, browserInfo: any, scene: Scene) {
        this.removeArcLine(scene);
        this.removeRightAngle(scene);
        const x = lineObj1.sliderPoint.position.x;
        const y = lineObj2.sliderPoint.position.y;
        // const slope1 = lineObj1.slope;
        // const slope2 = lineObj2.slope;
        // if (!(Math.abs(slope1) === Math.PI / 2 && Math.abs(slope2) === Math.PI / 2)) {
        //     LineObject.jpoint.position.set(x, y, 0);
        // }
        const angle = (window as any).viewHandler.viewModel.$data.jangle;
        if (angle === 90) {

            const pPointX = x;
            const pPointY = y + 5;

            const qPointX = x + 5;
            const qPointY = y;

            const mPointX = qPointX;
            const mPointY = pPointY;

            //绘制直角
            if (browserInfo.isIpad) {
                LineObject.rightAngle1 = Utils.createRightAngle(new THREE.Vector3(qPointX, qPointY, 0),
                    new THREE.Vector3(mPointX, mPointY, 0), 3);
                LineObject.rightAngle2 = Utils.createRightAngle(new THREE.Vector3(mPointX, mPointY, 0),
                    new THREE.Vector3(pPointX, pPointY, 0), 3);
            } else {
                LineObject.rightAngle1 = Utils.createRightAngle(new THREE.Vector3(qPointX, qPointY, 0),
                    new THREE.Vector3(mPointX, mPointY, 0), 1600);
                LineObject.rightAngle2 = Utils.createRightAngle(new THREE.Vector3(mPointX, mPointY, 0),
                    new THREE.Vector3(pPointX, pPointY, 0), 1600);
            }

            scene.add(LineObject.rightAngle1);
            scene.add(LineObject.rightAngle2);
        }

    }

    //删除圆弧
    removeArcLine(scene: any) {

        if (LineObject.arcLine != null) {
            scene.remove(LineObject.arcLine);
            LineObject.arcLine.geometry.dispose();
            LineObject.arcLine.material.dispose();
        }

    }

    //删除直角
    removeRightAngle(scene: any) {
        if (LineObject.rightAngle1 && LineObject.rightAngle1 != null) {
            scene.remove(LineObject.rightAngle1);
            LineObject.rightAngle1.geometry.dispose();
            LineObject.rightAngle1.material.dispose();
        }
        if (LineObject.rightAngle2 && LineObject.rightAngle2 != null) {
            scene.remove(LineObject.rightAngle2);
            LineObject.rightAngle2.geometry.dispose();
            LineObject.rightAngle2.material.dispose();
        }
    }

    //重绘圆弧
    /**
     * @param lineObj1 直线1对象
     * @param lineObj2 直线2对象
     * @param scene    场景对象
     */
    resetArclineAngle(lineObj1: any, lineObj2: any, scene: Scene) {
        this.removeArcLine(scene);
        let arcGeometry;

        if (lineObj1.slope < 0 && lineObj1.slope > -Math.PI) {
            lineObj1.slope = lineObj1.slope + Math.PI;
        }

        if (lineObj1.slope < -Math.PI) {
            lineObj1.slope = lineObj1.slope + (Math.PI * 2);
        }

        if (lineObj1.slope > Math.PI) {
            lineObj1.slope = lineObj1.slope - Math.PI;
        }

        if (lineObj2.slope < 0 && lineObj2.slope > -Math.PI) {
            lineObj2.slope = lineObj2.slope + Math.PI;
        }

        if (lineObj2.slope < -Math.PI) {
            lineObj2.slope = lineObj2.slope + (Math.PI * 2);
        }

        if (lineObj2.slope > Math.PI) {
            lineObj2.slope = lineObj2.slope - Math.PI;
        }

        if (lineObj1.slope > lineObj2.slope) {
            if ((lineObj1.slope - lineObj2.slope) > Math.PI / 2) {
                arcGeometry = new THREE.CircleBufferGeometry(10, 32, lineObj1.slope - Math.PI, Math.PI - (lineObj1.slope - lineObj2.slope));
                const jangle = (Math.PI - (lineObj1.slope - lineObj2.slope)) * 180 / Math.PI;
                (window as any).viewHandler.viewModel.$data.jangle = Math.abs(parseFloat(jangle.toFixed(0)));
            } else {
                arcGeometry = new THREE.CircleBufferGeometry(10, 32, lineObj2.slope, lineObj1.slope - lineObj2.slope);
                const jangle = ((lineObj1.slope - lineObj2.slope)) * 180 / Math.PI;
                (window as any).viewHandler.viewModel.$data.jangle = Math.abs(parseFloat(jangle.toFixed(0)));
            }
        } else {

            if ((lineObj2.slope - lineObj1.slope) > Math.PI / 2) {
                arcGeometry = new THREE.CircleBufferGeometry(10, 32, lineObj2.slope - Math.PI, Math.PI - (lineObj2.slope - lineObj1.slope));
                const jangle = (Math.PI - (lineObj2.slope - lineObj1.slope)) * 180 / Math.PI;
                (window as any).viewHandler.viewModel.$data.jangle = Math.abs(parseFloat(jangle.toFixed(0)));
            } else {
                arcGeometry = new THREE.CircleBufferGeometry(10, 32, lineObj1.slope, lineObj2.slope - lineObj1.slope);
                const jangle = ((lineObj2.slope - lineObj1.slope)) * 180 / Math.PI;
                (window as any).viewHandler.viewModel.$data.jangle = Math.abs(parseFloat(jangle.toFixed(0)));
            }
        }
        //直线平行时 两直线夹角等于0
        if (parseFloat((lineObj1.slope * 180 / Math.PI).toFixed(0)) === parseFloat((lineObj2.slope * 180 / Math.PI).toFixed(0))) {
            (window as any).viewHandler.viewModel.$data.jangle = 0;
        }
        const arcMaterial = new THREE.MeshBasicMaterial({
            color: 0xE30000,
            transparent: true,
            opacity: 0.5,
            side: DoubleSide
        });
        LineObject.arcLine = new THREE.Mesh(arcGeometry, arcMaterial);
        LineObject.arcLine.position.setX(Utils.lineIntersection(lineObj1, lineObj2).x);
        LineObject.arcLine.position.setY(Utils.lineIntersection(lineObj1, lineObj2).y);
        scene.add(LineObject.arcLine);

    }

    //拖动滑条改变的表格中的斜率值，
    updateTableData(lineOjb1: any, lineObj2: LineObject, scene: Scene) {

        const xielv1 = parseFloat((lineOjb1.slope * 180 / Math.PI).toFixed(0));
        const xielv2 = parseFloat((lineObj2.slope * 180 / Math.PI).toFixed(0));

        if (xielv2 !== 90 && xielv2 !== -90) {
            (window as any).viewHandler.viewModel.$data.xielv2 = parseFloat(Math.tan(xielv2 * Math.PI / 180).toFixed(2)) + '';
        } else {
            (window as any).viewHandler.viewModel.$data.xielv2 = '不存在';
        }

        if (xielv1 !== 90 && xielv1 !== -90) {
            (window as any).viewHandler.viewModel.$data.xielv1 = parseFloat(Math.tan(xielv1 * Math.PI / 180).toFixed(2)) + '';
        } else {
            (window as any).viewHandler.viewModel.$data.xielv1 = '不存在';
        }

        if (xielv1 !== 90 && xielv1 !== -90 && xielv2 !== 90 && xielv2 !== -90) {
            (window as any).viewHandler.viewModel.$data.xielvchenji = parseFloat((Math.tan(xielv1 * Math.PI / 180) *
                Math.tan(xielv2 * Math.PI / 180)).toFixed(2));
            if (parseFloat((Math.tan((xielv1) * Math.PI / 180) *
                Math.tan((xielv2) * Math.PI / 180)).toFixed(2)) === -1) {
                const point = Utils.lineIntersection(lineOjb1, lineObj2);
                this.createRight1(lineOjb1, lineObj2, point.x, point.y, this.browserInfo, scene);
            }
        } else {
            (window as any).viewHandler.viewModel.$data.xielvchenji = '不存在';
        }
        if ((xielv2 === 180 || xielv2 === 90 || xielv2 === 0 || xielv2 === -90) && xielv1 === 90) {
            this.createRight2(lineOjb1, lineObj2, this.browserInfo, scene);
        }

        if ((xielv1 === 180 || xielv1 === 90 || xielv1 === 0 || xielv1 === -180 || xielv1 === -90) && xielv2 === 90) {
           this.createRight2(lineObj2, lineOjb1, this.browserInfo, scene);
        }

    }
}

