import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {AxisUtil} from '../../../../../src/three/util/AxisUtil';
import {SliderControlLine} from './SliderControlLine';
import common from './CommonForThree';
import * as pointImg from '../sub_static/UI/point1.png';
import * as pointImg1 from '../sub_static/UI/point2.png';
import $ from 'jquery-ts';
export class Model extends ThreeBase {
    sliderControlLine: SliderControlLine;
    //2个控制点，0：左圆心，1：右圆心
    private ctrlPoint = common.createImg([-30, 10, 2], 10, 10, pointImg);
    private ctrlPoint2 = common.createImg([30, 10, 2], 10, 10, pointImg1);
    // 创建A/B字母
    private text_A = common.createText('A', [-40, 13, 2], {color: '#C3A6FF', isItalic: true});
    private text_B = common.createText('B', [40, 13, 2], {color: '#6ECFFF', isItalic: true});
    //两个圆
    private circle = common.createStrokeCircle(10, {color: '#C3A6FF'});
    private circle2 = common.createStrokeCircle(10, {color: '#6ECFFF'});
    private circleGroupPos = { x: -30, y: 10 };
    private circleGroupPos2 = { x: 30, y: 10 };
    private radius = 3;
    private radius2 = 3;
    //四条公切线
    private tangentLineOut1 = common.drawUnitLine({color: '#FFD621', isDash: false});
    private tangentLineOut2 = common.drawUnitLine({color: '#FFD621', isDash: false});
    private tangentLineIn1 = common.drawUnitLine({color: '#FFD621', isDash: false});
    private tangentLineIn2 = common.drawUnitLine({color: '#FFD621', isDash: false});
    // 保存半径直线的圆上点坐标  方便两圆相切时候画切线
    private radiusPos: any;
    private radius2Pos: any;

    private lineForRadius = common.drawUnitLine({color: '#0199FF', isDash: true, });
    private lineForRadius2 = common.drawUnitLine({color: '#FF4747', isDash: true, });
    lang = window.env.browserInfo.lang;
    private render = () => {
        this.renderer.render(this.scene, this.camera);
        setTimeout(this.render, 30);
    }

    /**
     *
     * @param {number} fov    视角
     * @param {number} width  实际显示宽
     * @param {number} height 实际显示高
     * @param {number} near   距离镜头最近距离
     * @param {number} far    距离镜头最远距离
     */
    constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
        super();
        this.fov = !fov ? this.fov : fov;
        this.near = !near ? this.near : near;
        this.far = !far ? this.far : fov;
        this.width = !width ? window.innerWidth : width;
        this.height = !height ? window.innerHeight : height;
        this.domElement = domElement;
        this.init();
    }

    init(): void {
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.render();
        this.initElement();
        this.initEvt();
        this.changePosByVue({ x: -3, y: 1 });
        this.changePosByVue2({ x: 3, y: 1 });
    }

    initScene(): void {
        this.scene = new THREE.Scene();
    }
    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near = 0.1;
        const far = 2000;
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 255);
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor('#333');
        this.renderer.setSize(this.width , this.height );
        this.domElement.appendChild(this.renderer.domElement);
    }

    //初始化场景元素
    initElement() {
        //创建一个坐标系
        const Ax = AxisUtil.createAxis({ isTicks: true, AxisXNumArray: [],
            axisColor: '#808080', fontColor: '#808080', numberDepthTest: false} as any);
        this.scene.add(Ax, );
        this.ctrlPoint.name = 'CENTER';
        this.circle.scale.set(3, 3, 3);
        this.ctrlPoint2.name = 'CENTER2';
        this.circle2.scale.set(3, 3, 3);
        this.scene.add(this.circle2, this.ctrlPoint2, this.text_B, this.circle, this.ctrlPoint, this.text_A);
    }
    // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine([this.ctrlPoint2, this.ctrlPoint, ]);
        this.sliderControlLine.setCanvas(this);
        this.sliderControlLine = this.sliderControlLine.initEvent(this.camera, this.renderer);
    }
    showLineEvt () {
        if ((window as any).viewHandler.viewModel.$data.active1) {
            if ((window as any).viewHandler.viewModel.$data.value1 === 0 || (window as any).viewHandler.viewModel.$data.value2 === 0) {
                this.scene.remove(this.tangentLineOut1, this.tangentLineOut2, this.tangentLineIn1, this.tangentLineIn2);
            } else {
                this.scene.add(this.tangentLineOut1, this.tangentLineOut2, this.tangentLineIn1, this.tangentLineIn2);
            }
        } else {
            this.scene.remove(this.tangentLineOut1, this.tangentLineOut2, this.tangentLineIn1, this.tangentLineIn2);
        }
    }

    moveHandle(pos: any, name: string) {
        let { x, y } = pos;
        x = x < 50 ? x < -50 ? -50 : x : 50;
        y = y < 50 ? y < -50 ? -50 : y : 50;
        if (name === 'CENTER') {
            this.changePosByVue({ x: x / 10, y: y / 10 });
        } else if (name === 'CENTER2') {
            this.changePosByVue2({ x: x / 10, y: y / 10 });
        }
    }
    getCircleNumber (val: number) {
        if (val === 1) {
            this.radius = (window as any).viewHandler.viewModel.$data.value1;
            this.changeRadius(this.radius, this.radius2, 0);
        } else {
            this.radius2 = (window as any).viewHandler.viewModel.$data.value2;
            this.changeRadius(this.radius2, this.radius, 2);
        }
    }
    // 设置圆/拖动点/字母的显示隐藏
    elementShow(show: boolean) {
        this.circle2.visible = show;
        this.ctrlPoint2.visible = show;
        this.text_B.visible = show;
        this.circle.visible = show;
        this.ctrlPoint.visible = show;
        this.text_A.visible = show;
    }

    // 改变半径
    changeRadius(radius: number, radius2: number, num ?: number) {
        const circle = num ? this.circle2 : this.circle;
        if (radius === 0) {
            circle.visible = false;
            this.elementShow(false);
            this.scene.remove(this.tangentLineOut1, this.tangentLineOut2, this.tangentLineIn1, this.tangentLineIn2);
        } else {
            if (radius2 === 0) {
                circle.visible = false;
                this.elementShow(false);
                this.scene.remove(this.tangentLineOut1, this.tangentLineOut2, this.tangentLineIn1, this.tangentLineIn2);
            } else {
                circle.visible = true;
                this.elementShow(true);
                if ((window as any).viewHandler.viewModel.$data.active1) {
                    this.scene.add(this.tangentLineOut1, this.tangentLineOut2, this.tangentLineIn1, this.tangentLineIn2);
                }
            }
            circle.scale.set(radius, radius, radius);
        }
        this.drawLineForDisAndRadius(this.circleGroupPos, this.circleGroupPos2, this.radius, this.radius2);
    }
    // 改变左圆位置
    changePosByVue(pos: any) {
        this.circleGroupPos = { x: pos.x * 10, y: pos.y * 10 };
        this.circle.position.set(pos.x * 10, pos.y * 10, 0);
        this.ctrlPoint.position.set(pos.x * 10, pos.y * 10, 2);
        this.text_A.position.set(pos.x * 10 - 10, pos.y * 10 + 3, 2);
        this.drawLineForDisAndRadius(this.circleGroupPos, this.circleGroupPos2, this.radius, this.radius2);
    }

    // 改变右圆位置
    changePosByVue2(pos: any) {
        this.circleGroupPos2 = { x: pos.x * 10, y: pos.y * 10 };
        this.circle2.position.set(pos.x * 10, pos.y * 10, 0);
        this.ctrlPoint2.position.set(pos.x * 10, pos.y * 10, 2);
        this.text_B.position.set(pos.x * 10 + 10, pos.y * 10 + 3, 2);
        this.drawLineForDisAndRadius(this.circleGroupPos, this.circleGroupPos2, this.radius, this.radius2);
    }

    drawLineForDisAndRadius(posC: any, posC2: any, radius: number, radius2: number) {
        const { x, y } = posC;
        const { x: x2, y: y2 } = posC2;
        let dis = Math.hypot(x - x2, y - y2);
        dis = Math.round(dis * 10) / 100;
        // 画两个半径直线
        if (radius) {
            this.radiusPos = this.drawLineForRadius(posC, posC2, radius, this.lineForRadius);
        }
        if (radius2) {
            this.radius2Pos = this.drawLineForRadius(posC2, posC, radius2, this.lineForRadius2);
        }
        this.drawTangentLine(posC, posC2, radius, radius2, dis);
    }
    drawLineForRadius(posC: any, posC2: any, radius: number, line: THREE.Mesh) {
        const { x, y } = posC;
        const { x: x2, y: y2 } = posC2;
        let dis = Math.hypot(x - x2, y - y2);
        dis = Math.round(dis * 10) / 100;
        line.visible = true;
        const factor = radius / dis;
        const corssPointPos = {} as any;
        corssPointPos.x = (x2 - x) * factor + x;
        corssPointPos.y = (y2 - y) * factor + y;
        line = common.scaleLine([x, y, 1], [corssPointPos.x, corssPointPos.y, 1], line);
        return corssPointPos;

    }
    // 画公切线的思路，算出内外公切线交点坐标https://donghaoren.org/blog/2009/circle-common-tangents
    // 根据点与圆的切线关系画出切线
    drawTangentLine(posC: any, posC2: any, radius: number, radius2: number, dis: number) {
        const k = (posC2.y - posC.y) / (posC2.x - posC.x);
        const rad = Math.atan(k);
        // 内公切线
        if (dis === (radius + radius2) || dis === Math.abs(radius - radius2)) {
            this.tangentLineIn2.visible = false;
            this.tangentLineIn1.scale.set(200, 1, 1);
            const radiusPos = radius > radius2 ? this.radiusPos : this.radius2Pos;
            this.tangentLineIn1.position.set(radiusPos.x, radiusPos.y, 1);
            this.tangentLineIn1.rotation.z = Math.PI / 2 + rad;
        } else {
            this.tangentLineIn2.visible = true;
            const corssInPoint = {} as any;
            corssInPoint.x = (radius * posC2.x + radius2 * posC.x) / (radius + radius2);
            corssInPoint.y = (radius * posC2.y + radius2 * posC.y) / (radius + radius2);
            const [contactP, contactP1] = this.calcTangencyPoint(posC, corssInPoint, radius);
            this.tangentLineIn1 = common.scaleLine([contactP.x + posC.x, contactP.y + posC.y, 0], [corssInPoint.x,
                corssInPoint.y, 1
            ], this.tangentLineIn1, 100);
            this.tangentLineIn2 = common.scaleLine([contactP1.x + posC.x, contactP1.y + posC.y, 0], [corssInPoint.x,
                corssInPoint.y, 1
            ], this.tangentLineIn2, 100);
        }
        // 外公切线
        if (dis === Math.abs(radius - radius2)) {
            this.tangentLineOut1.visible = this.tangentLineOut2.visible = false;
        } else {
            this.tangentLineOut1.visible = this.tangentLineOut2.visible = true;
            if (radius === radius2) {
                this.tangentLineOut1.scale.set(300, 1, 1);
                this.tangentLineOut2.scale.set(300, 1, 1);
                // 算倾斜角
                this.tangentLineOut1.rotation.z = this.tangentLineOut2.rotation.z = rad;
                const offsetX = radius * 10 * Math.sin(rad);
                const offsetY = radius * 10 * Math.cos(rad);
                this.tangentLineOut1.position.x = (posC.x + posC2.x) / 2 - offsetX;
                this.tangentLineOut1.position.y = (posC.y + posC2.y) / 2 + offsetY;
                this.tangentLineOut2.position.x = (posC.x + posC2.x) / 2 + offsetX;
                this.tangentLineOut2.position.y = (posC.y + posC2.y) / 2 - offsetY;
            } else {
                const corssOutPoint = {} as any;
                corssOutPoint.x = (radius * posC2.x - radius2 * posC.x) / (radius - radius2);
                corssOutPoint.y = (radius * posC2.y - radius2 * posC.y) / (radius - radius2);
                const [contactP3, contactP4] = this.calcTangencyPoint(posC, corssOutPoint, radius);
                this.tangentLineOut1 = common.scaleLine([contactP3.x + posC.x, contactP3.y + posC.y, 0], [corssOutPoint
                    .x, corssOutPoint.y, 1
                ], this.tangentLineOut1, 100);
                this.tangentLineOut2 = common.scaleLine([contactP4.x + posC.x, contactP4.y + posC.y, 0], [corssOutPoint
                    .x,
                    corssOutPoint.y, 1
                ], this.tangentLineOut2, 100);
            }
        }
        this.calcRelation(posC, posC2, radius, radius2, dis);
    }
    //判断两圆的位置关系
    calcRelation(posC: any, posC2: any, radius: number, radius2: number, dis: number) {
        const circleDis = Math.abs(radius - radius2);
        const circleDis1 = Math.abs(radius + radius2);
       if (dis < circleDis) {
           $('.btn1').text(this.lang.buttonText[3]);
        } else if (dis === circleDis) {
           $('.btn1').text(this.lang.buttonText[4]);
        } else if (dis > circleDis && dis < circleDis1) {
           $('.btn1').text(this.lang.buttonText[5]);
        } else if (dis === circleDis1) {
           $('.btn1').text(this.lang.buttonText[0]);
        } else if (dis > circleDis1) {
           $('.btn1').text(this.lang.buttonText[6]);
        }
    }

    // 计算点到圆的切线
    calcTangencyPoint(posC: any, corssPos: any, radius: number) {
        const { x: cx, y: cy } = posC;
        const { x: px, y: py } = corssPos;
        const nx = px - cx;
        const ny = py - cy;
        const scaleT = radius * 10 / Math.sqrt(nx * nx + ny * ny);
        const corssPointPos = {} as any;
        corssPointPos.x = nx * scaleT;
        corssPointPos.y = ny * scaleT;
        const rad = Math.acos(scaleT);
        const contactP = {} as any;
        contactP.x = corssPointPos.x * Math.cos(rad) - corssPointPos.y * Math.sin(rad);
        contactP.y = corssPointPos.x * Math.sin(rad) + corssPointPos.y * Math.cos(rad);
        const contactP1 = {} as any;
        contactP1.x = corssPointPos.x * Math.cos(-rad) - corssPointPos.y * Math.sin(-rad);
        contactP1.y = corssPointPos.x * Math.sin(-rad) + corssPointPos.y * Math.cos(-rad);
        return [contactP, contactP1, ];
    }
    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    //重置事件
    reset(): void {
        this.changePosByVue({ x: -3, y: 1 });
        this.changePosByVue2({ x: 3, y: 1 });
        this.elementShow(true);
        this.showLineEvt();
    }


}




