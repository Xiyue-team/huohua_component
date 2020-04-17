/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16:52
 */
import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {SpreadAnimation} from '../../../../../src/three/component/SpreadAnimation';

export class FourPrism3DModel extends ThreeBase {
    browserInfo: BrowserInfo;

    private orbit: any;

    private threePyram: SpreadAnimation;

    private clickBoolern = true;

    private staticModel: any;
    private dynamicModel: any;

    private switchVisible = true;
    private switchVisible2 = true;

    private render = () => {
        this.renderer.render(this.scene, this.camera);
        setTimeout(this.render, 28);

        if (this.camera.position.x > -15 &&  this.camera.position.x < 15
            && this.camera.position.y > 180 && this.camera.position.y < 415
            && this.camera.position.z > -15 &&  this.camera.position.z < 15) {

            if (this.switchVisible) {
                for (let i = 0; i < 4; i++) {
                    this.dynamicModel.children[i].children[0].children[0].visible = false;
                    this.staticModel.children[i].children[0].children[0].visible = false;
                }
                this.switchVisible = false;
            }

        } else {
            if (this.switchVisible === false) {
                for (let i = 0; i < 4; i++) {
                    this.dynamicModel.children[i].children[0].children[0].visible = true;
                    this.staticModel.children[i].children[0].children[0].visible = true;
                }

                this.switchVisible = true;
            }

        }

        if (this.camera.position.x > -15 &&  this.camera.position.x < 15
            && this.camera.position.y > -415 && this.camera.position.y < -185
            && this.camera.position.z > -15 &&  this.camera.position.z < 15) {

            if (this.switchVisible2) {
                for (let i = 0; i < 4; i++) {
                    this.dynamicModel.children[i].children[0].children[0].visible = false;
                    this.staticModel.children[i].children[0].children[0].visible = false;
                }

                this.dynamicModel.children[0].children[0].children[2].children[0].children[0].visible = false;
                this.staticModel.children[0].children[0].children[2].children[0].children[0].visible = false;

                this.switchVisible2 = false;
            }

        } else {
            if (this.switchVisible2 === false) {
                for (let i = 0; i < 4; i++) {
                    this.dynamicModel.children[i].children[0].children[0].visible = true;
                    this.staticModel.children[i].children[0].children[0].visible = true;
                }
                this.dynamicModel.children[0].children[0].children[2].children[0].children[0].visible = true;
                this.staticModel.children[0].children[0].children[2].children[0].children[0].visible = true;
                this.switchVisible2 = true;
            }

        }
    }

    /**
     *
     * @param {Element} domElement   渲染element
     * @param {number} fov    视角
     * @param {number} width  实际显示宽
     * @param {number} height 实际显示高
     * @param {number} near   距离镜头最近距离
     * @param {number} far    距离镜头最远距离
     */
    constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
        super();
        this.fov     = !fov    ? this.fov       : fov;
        this.near    = !near   ? this.near      : near;
        this.far     = !far    ? this.far       : fov;
        this.width   = !width  ? window.innerWidth     : width;
        this.height  = !height ? window.innerHeight    : height;
        this.domElement = domElement;
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.init();

    }
     init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.init3DModel();


        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.render();
    }


    /**
     *
     * 初始化场景
     */
    initScene(): void {
        this.scene = new THREE.Scene();
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {
        this.camera =  new THREE.PerspectiveCamera(45, this.width / this.height, 1, 5000);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(100, 100, -400);
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if ( this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor('#FFFFFF' , 1 );

        this.renderer.setSize(this.width , this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        this.orbit = new OrbitControls( this.camera,  this.renderer.domElement );
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;

        //设置相机距离原点的最远距离
        this.orbit.minDistance = 200;
        this.orbit.maxDistance = 400;

        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //是否自动旋转
        this.orbit.minAzimuthAngle = -Math.PI * 2;
        this.orbit.maxAzimuthAngle = Math.PI * 2;

        this.orbit.maxPolarAngle = Math.PI;

        //是否开启右键拖拽
        this.orbit.enablePan = false;
    }

    /**
     * 初始化光源
     */
    initLight(): void {

        const light = new THREE.HemisphereLight( '#ffeeee', '#8FA6D5', 1 );
        light.position.set(0, 50, 0);
        this.scene.add( light );

        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.1);
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( -100, 0, 0 );
        dirLight.position.multiplyScalar( 30 );
        this.scene.add( dirLight );
    }

    async init3DModel() {
        this.threePyram = new SpreadAnimation();

        const segment = 4;
        const topRadius = 30;

        this.staticModel = (new SpreadAnimation()).addRotationCenterPoint({
            topRadius: topRadius,
            bottomRadius: 30,
            height: 100,
            segment: segment,
            planColor: '#8FA6D5',
            lineColor: '#000000'
        });
        this.staticModel.visible = false;
        this.scene.add(this.staticModel);

        this.dynamicModel =  this.threePyram.addRotationCenterPoint({
            topRadius: topRadius,
            bottomRadius: 30,
            height: 100,
            segment: segment,
            animationTime: 1.5,
            planColor: '#6384C5',
            lineColor: '#000000'
        });

        this.scene.add(this.dynamicModel);
        let clearTimeout1: any;
        let clearTimeout2: any;

        const mousedownXY: any = [];
        const mouseupXY: any = [];

        // 鼠标事件
        (this.dynamicModel as any as any).on('mousedown', (event: any) => {
            mousedownXY[0] = (event as any).data.originalEvent.clientX;
            mousedownXY[1] = (event as any).data.originalEvent.clientY;
        });

        (this.dynamicModel as any as any).on('mouseup', (event: any) => {
            mouseupXY[0] = (event as any).data.originalEvent.clientX;
            mouseupXY[1] = (event as any).data.originalEvent.clientY;

            if (mousedownXY[0] === mouseupXY[0] && mousedownXY[1] === mouseupXY[1]) {
                // 鼠标按下和松开在同一个位置执行动画
                if (this.clickBoolern === true) {
                    this.staticModel.visible = true;
                    clearTimeout(clearTimeout1);
                    clearTimeout(clearTimeout2);
                    this.threePyram.startAnimation();
                    this.clickBoolern = false;
                } else {
                    clearTimeout1 = setTimeout(() => {
                        this.staticModel.visible = false;
                    }, 1500);
                    this.threePyram.reverseAnimation();
                    this.clickBoolern = true;
                }
            }
        });

        (this.staticModel as any as any).on('mousedown', (event: any) => {
            mousedownXY[0] = (event as any).data.originalEvent.clientX;
            mousedownXY[1] = (event as any).data.originalEvent.clientY;
        });

        (this.staticModel as any as any).on('mouseup', (event: any) => {
            mouseupXY[0] = (event as any).data.originalEvent.clientX;
            mouseupXY[1] = (event as any).data.originalEvent.clientY;

            if (mousedownXY[0] === mouseupXY[0] && mousedownXY[1] === mouseupXY[1]) {
                // 鼠标按下和松开在同一个位置执行动画
                if (this.clickBoolern === true) {
                    this.staticModel.visible = true;
                    clearTimeout(clearTimeout1);
                    clearTimeout(clearTimeout2);
                    this.threePyram.startAnimation();
                    this.clickBoolern = false;
                } else {
                    clearTimeout2 = setTimeout(() => {
                        this.staticModel.visible = false;
                    }, 1500);
                    this.threePyram.reverseAnimation();
                    this.clickBoolern = true;
                }
            }
        });


        // 触摸事件
        const touchstartXY: any = [];
        const touchendXY: any = [];
        (this.dynamicModel as any as any).on('touchstart', (event: any) => {
            touchstartXY[0] = (event as any).data.originalEvent.changedTouches[0].clientX;
            touchstartXY[1] = (event as any).data.originalEvent.changedTouches[0].clientY;
        });

        (this.dynamicModel as any as any).on('touchend', (event: any) => {
            touchendXY[0] = (event as any).data.originalEvent.changedTouches[0].clientX;
            touchendXY[1] = (event as any).data.originalEvent.changedTouches[0].clientY;
            if (touchstartXY[0] === touchendXY[0] && touchstartXY[1] === touchendXY[1]) {
                // 鼠标按下和松开在同一个位置执行动画
                if (this.clickBoolern === true) {
                    this.staticModel.visible = true;
                    clearTimeout(clearTimeout1);
                    clearTimeout(clearTimeout2);
                    this.threePyram.startAnimation();
                    this.clickBoolern = false;
                } else {
                    clearTimeout1 = setTimeout(() => {
                        this.staticModel.visible = false;
                    }, 1500);
                    this.threePyram.reverseAnimation();
                    this.clickBoolern = true;
                }
            }
        });

        (this.staticModel as any as any).on('touchstart', (event: any) => {
            touchstartXY[0] = (event as any).data.originalEvent.changedTouches[0].clientX;
            touchstartXY[1] = (event as any).data.originalEvent.changedTouches[0].clientY;
        });

        (this.staticModel as any as any).on('touchend', (event: any) => {
            touchendXY[0] = (event as any).data.originalEvent.changedTouches[0].clientX;
            touchendXY[1] = (event as any).data.originalEvent.changedTouches[0].clientY;

            if (touchstartXY[0] === touchendXY[0] && touchstartXY[1] === touchendXY[1]) {
                // 鼠标按下和松开在同一个位置执行动画
                if (this.clickBoolern === true) {
                    this.staticModel.visible = true;
                    clearTimeout(clearTimeout1);
                    clearTimeout(clearTimeout2);
                    this.threePyram.startAnimation();
                    this.clickBoolern = false;
                } else {
                    clearTimeout2 = setTimeout(() => {
                        this.staticModel.visible = false;
                    }, 1500);
                    this.threePyram.reverseAnimation();
                    this.clickBoolern = true;
                }
            }
        });
    }
    
    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    reset() {

        this.clickBoolern = true;
        this.threePyram.resetAnimation();
        this.staticModel.visible = false;
        this.resetCamera();
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(100, 100, -400);

        for (let i = 0; i < 21; i++) {
            this.orbit.reset();
        }
    }
}
