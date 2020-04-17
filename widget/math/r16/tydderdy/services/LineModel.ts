import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {ViewController} from '../../../../../src/core/ViewController';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {DashLine} from '../../../../../src/three/component/DashLine';
import {AxisUtil} from '../../../../../src/three/util/AxisUtil';
import commonForThree from './commonForThree';
import {SliderControlLine} from './SliderControlLine';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';

const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
let that: any = null;
OBJLoader(THREE);

export class LineModel extends ThreeBase {
    browserInfo: BrowserInfo;
    //控制对象
    private orbit: any;
    dashLine: DashLine;
    public pointF1: any;
    public pointF2: any;
    public pointGroup1: any;
    public pointGroup2: any;
    public pointGroup3: any;

    //d1组
    public pointGroup4: any;
    //d2组
    public pointGroup5: any;
    public pointGroup6: any;


    //保存准线公式文字
    public formulaTextGroup: any;
    //保存左上角公式文字组
    public pointM: any;
    public val: number;
    //准线
    public neatLine: any;
    public lineD1: any;
    public lineD2: any;
    public timer: any;
    public circle: any;

    //能否留点
    private canHavePoint: boolean;
    /**
     *
     * @param {number} fov    视角
     * @param {number} width  实际显示宽
     * @param {number} height 实际显示高
     * @param {number} near   距离镜头最近距离
     * @param {number} far    距离镜头最远距离
     */

    private render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
    };

    constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
        super();
        this.fov = !fov ? this.fov : fov;
        this.near = !near ? this.near : near;
        this.far = !far ? this.far : fov;
        this.width = !width ? window.innerWidth : width;
        this.height = !height ? window.innerHeight : height;
        this.domElement = domElement;
        this.browserInfo = BrowserUtil.getBrowserInfo();
        ViewController.getInstance().hideLoading();
        this.val = 4;
        this.init();

    }


    init() {
        // this.dashLine = new DashLine();
        that = this;
        this.canHavePoint = true;
        this.initCamera();
        this.initWebGLRenderer();
        this.initElement();
        this.initScene();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.render();
        this.createAxis(2);
        this.initLine();
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
    }

    initElement() {

    }

    initAction() {

    }

    createAxis(type: number) {
        if (type === 1) {
            this.scene.add(AxisUtil.createAxis({isTicks: true, AxisXNumArray: ['1', '2', '3', '4', '5']} as any));
        }
        else {
            this.scene.add(AxisUtil.createAxis({isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10']} as any));

        }
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        this.camera = new THREE.PerspectiveCamera(45, (this.width) / this.height, 1, 2000);
        this.camera.position.set(0, 0, 300);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    initLine() {

        this.pointGroup1 = new THREE.Group();
        this.pointGroup2 = new THREE.Group();
        this.pointGroup3 = new THREE.Group();
        this.pointGroup4 = new THREE.Group();
        this.pointGroup5 = new THREE.Group();
        this.formulaTextGroup = new THREE.Group();

        //抬手留点组
        this.pointGroup6 = new THREE.Group();


        const imgPoint = require('../sub_static/images/point.png');
        const pen = require('../sub_static/images/renPen.png');
        const f1 = require('../sub_static/images/F1.png');
        const f2 = require('../sub_static/images/F2.png');
        this.pointF1 = this.circleTexture(imgPoint, 10);
        this.pointF2 = this.circleTexture(imgPoint, 10);
        this.pointF1.position.set(-40, 0, 0);
        this.pointF2.position.set(40, 0, 0);
        const val = this.val;
        // const textF1 = commonForThree.createText(`F1`, [70, 45, 0], {'color': '#000', 'isItalic': true, fontSize: 45});
        // const textF2 = commonForThree.createText(`F2`, [70, 45, 0], {'color': '#000', 'isItalic': true, fontSize: 45});

        const textF1 = that.planeTexture(f1, 7, 9);
        const textF2 = that.planeTexture(f2, 7, 9);

        const textF1Pos = commonForThree.createText(`(${-val},0)`, [70, 45, 0], {'color': '#000', 'isItalic': false, fontSize: 40});
        const textF2Pos = commonForThree.createText(`(${val},0)`, [70, 45, 0], {'color': '#000', 'isItalic': false, fontSize: 40});
        textF1.position.set(-45, -10, 0);
        textF2.position.set(42, -10, 0);
        textF1Pos.position.set(-34, -7, 0);
        textF2Pos.position.set(52, -7, 0);
        this.pointGroup1.add(this.pointF1, textF1, textF1Pos);
        this.pointGroup2.add(this.pointF2, textF2, textF2Pos);

        //M点
        this.pointM = this.circleTexture(pen, 7);
        const textM = commonForThree.createText(`M`, [70, 45, 0], {'color': '#000', 'isItalic': true, fontSize: 50});
        this.pointM.position.set(40, 18, 0);
        textM.position.set(35, 35, 0);

        this.pointGroup3.add(this.pointM, textM);
        // this.pointGroup3.position.set(40, 20, 0);
        // textM.position.set(-5, 15, 0);

        this.neatLine = commonForThree.drawUnitLine({'color': '#EC5D57'});
        //准线
        commonForThree.scaleLine([62.5, 100, 0], [62.5, -100, 0], this.neatLine);
        this.scene.add(this.pointGroup1, this.pointGroup2, this.pointGroup3, this.neatLine);


        //d1,d2
        this.lineD1 = commonForThree.drawUnitLine({'width': 1, 'color': '#EC5D57', 'isDash': true});
        this.lineD2 = commonForThree.drawUnitLine({'width': 1, 'color': '#D734FF', 'isDash': true});
        const textD1 = commonForThree.createText(`d₁`, [70, 45, 0], {'color': '#EC5D57', 'isItalic': true, fontSize: 45});
        const textD2 = commonForThree.createText(`d₂`, [70, 45, 0], {'color': '#D734FF', 'isItalic': true, fontSize: 45});
        textD1.position.set(32, 13, 0);
        textD2.position.set(54, 30, 0);
        commonForThree.scaleLine([40, 18, 0], [40, 0, 0], this.lineD1);
        commonForThree.scaleLine([40, 18, 0], [62.5, 18, 0], this.lineD2);

//准线文字,五部分拼凑成
        const neatLineText1 = commonForThree.createText(`x`);
        const neatLineText2 = commonForThree.createText(`=`, [70, 45, 0], {'color': '#000', 'isItalic': false, fontSize: 40});
        const neatLineText3 = commonForThree.createText(`25`, [70, 45, 0], {'color': '#000', 'isItalic': false, fontSize: 40});
        const neatLineText4 = commonForThree.createText(`—`, [70, 45, 0], {'color': '#000', 'isItalic': false, fontSize: 40});
        const neatLineText5 = commonForThree.createText(`4`, [70, 45, 0], {'color': '#000', 'isItalic': false, fontSize: 40});

        this.formulaTextGroup.position.set(70, -60, 0);

        neatLineText2.position.set(5, -1, 0);
        neatLineText3.position.set(11, 3, 0);
        neatLineText4.position.set(11, 0, 0);
        neatLineText5.position.set(11, -5, 0);


        this.formulaTextGroup.add(neatLineText1, neatLineText2, neatLineText3, neatLineText4, neatLineText5);
        this.scene.add(this.formulaTextGroup);


        this.pointGroup4.add(this.lineD1, textD1);
        this.pointGroup5.add(this.lineD2, textD2);
        this.scene.add(this.pointGroup4, this.pointGroup5, this.pointGroup6);


        const touchF1 = new SliderControlLine(this.pointF1, 'F1',
            {
                Group1: this.pointGroup1,
                pointF1: this.pointF1,
                pointF2: this.pointF2,
                neatLine: this.neatLine,
                pointM: this.pointM,
                textM: textM,
                LineD1: this.lineD1,
                LineD2: this.lineD2,
                textD1: textD1,
                textD2: textD2,
            });
        touchF1.initEvent(this.camera, this.renderer);
        const touchF2 = new SliderControlLine(this.pointF2, 'F2',
            {
                Group2: this.pointGroup2,
                pointF1: this.pointF1,
                pointF2: this.pointF2,
                textM: textM,
                neatLine: this.neatLine,
                pointM: this.pointM,
                LineD1: this.lineD1,
                LineD2: this.lineD2,
                textD1: textD1,
                textD2: textD2,
            });
        touchF2.initEvent(this.camera, this.renderer);
        const touchM = new SliderControlLine(this.pointM, 'M',
            {
                Group3: this.pointGroup3,
                pointM: this.pointM,
                LineD1: this.lineD1,
                LineD2: this.lineD2,
                textD1: textD1,
                textD2: textD2,
                pointF2: this.pointGroup2
            });
        touchM.initEvent(this.camera, this.renderer);
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

        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }


    //焦点拖动处理
    static handleFocusDrag(pos: any, name: string, obj: any) {
        const a = (window as any).viewHandler.viewModel.$data.a;
        clearTimeout(that.timer);
        let x = Math.round(pos.x / 10) * 10;
        if (x === (window as any).viewHandler.viewModel.$data.c * 10) {
            obj.pointF1.position.set(x, 0, 0);
            obj.pointF2.position.set(-x, 0, 0);
            return;
        }
        if (name === 'F1') {
            x = x > -40 ? x > -10 ? -10 : x : -40;
            (window as any).viewHandler.viewModel.$data.c = x / 10;
            obj.pointF1.position.set(x, 0, 0);
            obj.pointF2.position.set(-x, 0, 0);

            //准线位置
            const neatLineX = -a * a * 10 / ((window as any).viewHandler.viewModel.$data.c);
            obj.neatLine.position.set(neatLineX, 0, 0);
            that.formulaTextGroup.position.set(neatLineX + 7.5, -60, 0);
            const absC = Math.floor(x / 10);
            that.formulaTextGroup.children[4].text = `${-absC}`;
        } else {
            x = x < 40 ? x < 10 ? 10 : x : 40;
            obj.pointF1.position.set(-x, 0, 0);
            obj.pointF2.position.set(x, 0, 0);
            (window as any).viewHandler.viewModel.$data.c = -x / 10;
            const neatLineX = a * a * 100 / x;
            obj.neatLine.position.set(neatLineX, 0, 0);
            //准线公式文字移动
            that.formulaTextGroup.position.set(neatLineX + 7.5, -60, 0);
            const absC = Math.floor(x / 10);
            that.formulaTextGroup.children[4].text = `${absC}`;

        }

        that.canHavePoint = true;
        //f1,f2文字位置
        const val = Math.floor(Math.abs(x) / 10);
        const x1 = Math.abs(x);
        that.pointGroup1.children[1].position.set(-x1 - 5, -10, 0);
        that.pointGroup1.children[2].position.set(-x1 + 6, -7, 0);
        that.pointGroup1.children[2].text = `(${-val},0)`;
        that.pointGroup2.children[1].position.set(x1 + 2, -10, 0);
        that.pointGroup2.children[2].position.set(x1 + 12, -7, 0);
        that.pointGroup2.children[2].text = `(${val},0)`;
        //清除之前绘制的点

        that.pointGroup6.children = [];

        that.scene.remove(that.pointGroup6);
        if (that.circle) {
            that.scene.remove(that.circle);
        }

        (window as any).viewHandler.viewModel.$data.active = false;

        const absx = Math.abs(x);

        //缩放比例
        const rate = (Math.sqrt(50 * 50 - absx * absx)) / 50;

        //重新调整M点位置和文字位置
        obj.pointM.position.set(40, 30 * rate, 0);
        obj.textM.position.set(35, 30 * rate + 17, 0);
        const posL = a * a * 100 / absx;
        commonForThree.scaleLine([absx, 0, 0], [40, 30 * rate, 0], obj.LineD1);
        commonForThree.scaleLine([40, 30 * rate, 0], [posL, 30 * rate, 0], obj.LineD2);
        const posD2X = (40 + posL) / 2;
        obj.textD2.position.set(posD2X, 30 * rate + 10, 0);
        const posD1X = (40 + absx) / 2;
        const posD1Y = 30 * rate / 2;
        obj.textD1.position.set(posD1X - 6, posD1Y + 5, 0);


    }

    //M点拖动处理

    static handleMpointDrag(pos: any, name: string, obj: any) {
        const x = pos.x;
        const y = pos.y;

        const a = (window as any).viewHandler.viewModel.$data.a * 10;
        const c = (window as any).viewHandler.viewModel.$data.c * 10;
        const b = Math.sqrt(a * a - (c * c));

        const absC = Math.abs(c);

        const rat = b / a;
        const angleRadius = Math.atan2(y / rat, x);


        const angle = angleRadius * 180 / Math.PI;
        const px = a * Math.cos(angleRadius);


        const py = a * Math.sin(angleRadius) * rat;

        obj.pointM.position.set(px, py, 0);
        obj.Group3.children[1].position.set(px - 10, py + 10, 0);
        //调整d1位置

        const posL = a * a / absC;

        commonForThree.scaleLine([absC, 0, 0], [px, py, 0], obj.LineD1);
        commonForThree.scaleLine([px, py, 0], [posL, py, 0], obj.LineD2);
        const posD2X = (px + a * a / absC) / 2;
        obj.textD2.position.set(posD2X, py + 10, 0);
        const posD1X = (px + absC) / 2;
        const posD1Y = py / 2;
        obj.textD1.position.set(posD1X - 10, posD1Y, 0);

        that.scene.add(that.pointGroup6);
    }


    static pointDragStop(pos: any) {

        if (that.canHavePoint) {
            const point = that.addCircle(pos.x, pos.y, 0);
            that.pointGroup6.add(point);
        }

    }


    drawAllEllipse() {

        if (!(window as any).viewHandler.viewModel.$data.active) {
            const posX = that.pointM.position.x;
            const posY = that.pointM.position.y;
            const angleRadius = Math.atan2(posY, posX);
            const angle = angleRadius * 180 / Math.PI;

            const thiz = this;
            const a = (window as any).viewHandler.viewModel.$data.a * 10;
            const absx = Math.abs((window as any).viewHandler.viewModel.$data.c * 10);

            const rate = (Math.sqrt(50 * 50 - absx * absx)) / 50;
            const arr: Array<any> = [];
            for (let i = 35; i < 398; i += 4) {
                const x = a * Math.cos(Math.PI * i / 180);
                const y = a * Math.sin(Math.PI * i / 180) * rate;
                arr.push({x, y, z: 0});
            }
            let num = 0;

            function run() {
                if (num > 90) {
                    clearTimeout(thiz.timer);
                    setTimeout(() => {
                        //清除之前绘制的点
                        that.pointGroup6.children = [];
                        that.scene.remove(that.pointGroup6);
                    }, 100);
                    that.canHavePoint = false;
                    return;
                }
                thiz.scene.remove(thiz.circle);
                const pointArr = arr.slice(90 - num, 91);
                thiz.circle = commonForThree.drawDashOrLine(pointArr);
                const pointObj = arr[90 - num];
                if (pointObj) {
                    const posx = pointObj.x;
                    const posy = pointObj.y;
                    thiz.pointM.position.set(posx, posy, 0);
                    thiz.pointGroup3.children[1].position.set(posx - 5, posy + 17, 0);
                    const posL = a * a / absx;
                    commonForThree.scaleLine([absx, 0, 0], [posx, posy, 0], thiz.lineD1);
                    commonForThree.scaleLine([posx, posy, 0], [posL, posy, 0], thiz.lineD2);
                    const posD2X = (posx + posL) / 2;
                    thiz.pointGroup5.children[1].position.set(posD2X, posy + 10, 0);
                    const posD1X = (posx + absx) / 2;
                    const posD1Y = posy / 2;
                    thiz.pointGroup4.children[1].position.set(posD1X - 6, posD1Y + 5, 0);
                }
                thiz.scene.add(thiz.circle);
                num++;
                thiz.timer = setTimeout(run, 60);

            }

            run();

        }

        (window as any).viewHandler.viewModel.$data.active = true;

    }


    preloadImage(path: any) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image.src);
            image.onerror = reject;
            image.src = path;
        });
    }


    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);

    }


    addCircle(x: number, y: number) {
        const gemo = new THREE.CircleGeometry(1, 36, 36);
        const material = new THREE.MeshBasicMaterial({color: 0x000000});
        const circle = new THREE.Mesh(gemo, material);
        circle.name = 'circlePoint';
        circle.position.set(x, y, 0);
        return circle;
    }

    addTexture(url: any) {
        const loader = new THREE.TextureLoader();
        const texture = loader.load(url);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }

//圆形贴图
    circleTexture(src: any, R: number) {
        const map = this.addTexture(src);
        const gemo = new THREE.CircleGeometry(R, 36, 36);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
            map: map
        });
        const mesh = new THREE.Mesh(gemo, material);
        return mesh;
    }


//圆形贴图
    planeTexture(src: any, W: number, H: number) {
        const map = this.addTexture(src);
        const gemo = new THREE.PlaneGeometry(W, H, 36, 36);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
            map: map
        });
        const mesh = new THREE.Mesh(gemo, material);
        return mesh;
    }

    reset() {
        clearTimeout(this.timer);
        (window as any).viewHandler.viewModel.$data.a = 5;
        (window as any).viewHandler.viewModel.$data.c = 4;
        this.pointF1.position.set(-40, 0, 0);
        this.pointF2.position.set(40, 0, 0);
        this.pointM.position.set(40, 18, 0);
        this.pointGroup3.children[1].position.set(35, 35, 0);
        commonForThree.scaleLine([62.5, 100, 0], [62.5, -100, 0], this.neatLine);

        this.canHavePoint = true;
        this.pointGroup4.children[1].position.set(32, 13, 0);
        this.pointGroup5.children[1].position.set(54, 30, 0);
        commonForThree.scaleLine([40, 18, 0], [40, 0, 0], this.lineD1);
        commonForThree.scaleLine([40, 18, 0], [62.5, 18, 0], this.lineD2);
        this.pointGroup6.children = [];
        this.scene.remove(that.pointGroup6);
        if (this.circle) {
            this.scene.remove(this.circle);
        }
        this.formulaTextGroup.position.set(70, -60, 0);
        this.formulaTextGroup.children[4].text = `4`;
        that.pointGroup1.children[1].position.set(-40, -7, 0);
        that.pointGroup1.children[2].position.set(-29, -7, 0);
        that.pointGroup1.children[2].text = `(-4,0)`;
        that.pointGroup2.children[1].position.set(40, -7, 0);
        that.pointGroup2.children[2].position.set(50, -7, 0);
        that.pointGroup2.children[2].text = `(4,0)`;


        (window as any).viewHandler.viewModel.$data.active = false;
    }

}
