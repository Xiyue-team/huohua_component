import * as THREE from 'three';
import {
    WebGLRenderer
} from 'three';
import {
    ThreeBase
} from '../../../../../src/three/template/ThreeBase';
import {
    PerspectiveCamera
} from 'three';
import {ModelLoad} from './ModelLoad';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
const OrbitControls = require('three-orbitcontrols');
import {
    BrowserInfo
} from '../../../../../src/model/BrowserInfo';
import {
    BrowserUtil
} from '../../../../../src/util/BrowserUtil';
import {
    SliderControlLine
} from './SliderControlLine';

import {
    AxisUtil
} from '../../../../../src/three/util/AxisUtil';
import common from './CommonForThree';

let thiz: any = null;
OBJLoader(THREE);
let THERR1 = require('./three');
import shader from './bShader';
import {join} from 'path';

let a = require('./aaa.json');
let CopyShader = require('./CopyShader');
let EffectComposer = require('./EffectComposer');
let FXAAShader = require('./FXAAShader');
let OutlinePass = require('./OutlinePass');
let RenderPass = require('./RenderPass');
let ShaderPass = require('./ShaderPass');
let img1 = require('../sub_static/122.png');
let img2 = require('../sub_static/2.png');

export class Line3dModel extends ThreeBase {

    /**
     * @param {domElement} domElement
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
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.init();
    }

    browserInfo: BrowserInfo;
    private controls: any;
    cubeCamera1: any;
    cubeCamera2: any;
    teuxe: any;
    fourView: any;
    material: any;
    public orbit: any;
    helpBox: any;
    model4X: any;
    downLine: any;
    midLine: any;
    midLined: any;
    foure: any;
    composer: any;
    renderPass: any;
    outlinePass: any;
    effectFXAA: any;
    num1: number;
    imgO: any;
    imgS: any;
    jiaodian: any;
    private vertexShader1 = [
        'varying vec3	vVertexWorldPosition;',
        'varying vec3	vVertexNormal;',

        'varying vec4	vFragColor;',

        'void main(){',
        '	vVertexNormal	= normalize(normalMatrix * normal);', //将法线转换到视图坐标系中

        '	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;', //将顶点转换到世界坐标系中

        '	// set gl_Position',
        '	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
        '}'

    ].join('\n');
    private fragmentShader2 = [
        'uniform vec3	glowColor;',
        'uniform float	coeficient;',
        'uniform float	power;',

        'varying vec3	vVertexNormal;',
        'varying vec3	vVertexWorldPosition;',

        'varying vec4	vFragColor;',

        'void main(){',
        '	vec3 worldVertexToCamera= cameraPosition - vVertexWorldPosition;',	//世界坐标系中顶点位置到相机位置到的距离
        '	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldVertexToCamera, 0.0)).xyz;', //视图坐标系中从相机位置到顶点位置的距离
        '	viewCameraToVertex	= normalize(viewCameraToVertex);', //规一化
        '	float intensity		= coeficient + dot(vVertexNormal, viewCameraToVertex);',
        '	if(intensity > 0.55){ intensity = 0.55;}',
        '	gl_FragColor		= vec4(glowColor, intensity);',
        '}'//vVertexNormal视图坐标系中点的法向量
        //viewCameraToVertex视图坐标系中点到摄像机的距离向量
        //dot点乘得到它们的夹角的cos值
        //从中心向外面角度越来越大（从锐角到钝角）从cos函数也可以知道这个值由负变正，不透明度最终从高到低
    ].join('\n');

    private glow: any;
    a: any;
    count = 0;
    fLine: any;
    model = new ModelLoad();
    shaderSettings = {
        rings: 3,
        samples: 4
    };

    private vertexShader = 'varying vec2 vUv;\n' +
        '        varying vec4 vposition;\n' +
        '        void main()\n' +
        '        {\n' +
        '            vUv = uv;\n' +
        '            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n' +
        '            vposition = modelMatrix * vec4(position, 1.0);\n' +
        '            gl_Position = projectionMatrix * mvPosition;\n' +
        '        }';
    private fragmentShader = ' varying vec2 vUv;\n' +
        'uniform sampler2D tDiffuse;' +
        'uniform float h;' +
        'uniform float v;' +
        'varying vec4 vposition;\n' +
        'uniform vec4 Projection;\n' +
        'uniform vec4 color;\n' +
        'void main( void ) {\n' +
        'if(vposition.z>Projection.x||vposition.z<Projection.y\n' +
        '   ||vposition.y>Projection.z||vposition.y<Projection.w\n' +
        '){\n' +
        '  discard;\n' +
        ' }\n' +
        '  gl_FragColor = color;\n' +
        '  }';

    static downHandle(name: string) {
        thiz.orbit.enableRotate = false;

    }

    static upHandle() {
        thiz.orbit.enableRotate = true;
    }

    static moveHandle(arr: any, object: any) {
        let mark = 0;
        if (object.name === 'xkcx_hengla_4_0' ||
            object.name === 'xkcx_hengla_4_1' || object.name === 'xkcx_hengla_4_2' || object.name === 'xkcx_hengla_4_3') {

            thiz.model.obj1.children[0].children[0].children[4].children[0].position.x = arr.x;
            thiz.model.obj1.children[0].children[0].children[4].children[1].position.x = arr.x;
            thiz.model.obj1.children[0].children[0].children[4].children[3].position.x = arr.x;
            thiz.model.obj1.children[0].children[0].children[4].children[2].position.x = arr.x;
            thiz.model.obj1.children[0].children[0].children[0].position.x = arr.x - 30;
            thiz.foure.position.x = thiz.model.obj1.children[0].children[0].children[0].position.x;
            thiz.a.position.x = thiz.model.obj1.children[0].children[0].children[0].position.x;
            mark  = 1;


        } else {
            thiz.fourView.position.x = arr.x - 0.1;
            thiz.imgO.position.x = arr.x - 0.1;
            thiz.model.obj1.children[0].children[0].children[2].position.x = arr.x;
            thiz.model.obj1.children[0].children[0].children[6].position.x = arr.x;
            mark  = 2;
        }

        this.option(mark);

    }

    //参数
    static option(mark:any) {
        let wuju = thiz.model.obj1.children[0].children[0].children[0].position.x;
        let xiangju = thiz.model.obj1.children[0].children[0].children[6].position.x;

        thiz.downLineD(wuju, xiangju, thiz.downLine);
        thiz.imgO.material.opacity = Math.abs(thiz.jiaodian[0] - xiangju) * 0.05;
        console.log( thiz.imgO.material.opacity, thiz.jiaodian[0]);

        let w = Math.abs(wuju);
        let xi = Math.abs(xiangju);

        let material1 = new THERR1.ShaderMaterial({
            uniforms: {
                Projection: {value: new THERR1.Vector4(11, -11.2, 36.519, 11)},
                color: {value: new THERR1.Vector4(255, 255, 0, 1)}
            },
            vertexShader: thiz.vertexShader,
            fragmentShader: thiz.fragmentShader
        });
        let material2 = new THERR1.ShaderMaterial({
            uniforms: {
                Projection: {value: new THERR1.Vector4(7, -6.2, 31.5, 18)},
                color: {value: new THERR1.Vector4(255, 255, 0, 1)}
            },
            vertexShader: thiz.vertexShader,
            fragmentShader: thiz.fragmentShader
        });

        if (Math.round(wuju) === -15) {
            thiz.fLine.visible = false;
            thiz.downLine.visible = false;
            thiz.midLine.visible = false;
            thiz.midLined.visible = false;
            thiz.fourView.visible = false;
            thiz.imgO.visible = false;
        } else if (Math.round(wuju) > -15) {
            thiz.fourView.material = material2;
            thiz.imgO.rotation.x = 0;
            thiz.imgO.rotation.y = Math.PI / 2 ;
            thiz.imgO.position.x = -2;
            thiz.fourView.position.x = -2;
            thiz.fourView.rotation.z = 0;
            thiz.fLine.visible = false;
            thiz.downLine.visible = false;
            thiz.midLine.visible = false;
            thiz.midLined.visible = false;
            thiz.fourView.visible = false;
            thiz.imgO.visible = true;

        } else if (Math.round(wuju) < -15) {
            if (thiz.fourView.rotation.z !== -Math.PI) {
                thiz.fourView.rotateZ(-Math.PI);

            }
            thiz.imgO.rotation.x = Math.PI;
            thiz.imgO.rotation.y = -Math.PI / 2 ;

            thiz.fourView.material = material1;

            thiz.fourView.position.x = xiangju - 0.1;
            thiz.imgO.position.x = xiangju - 0.2;
            thiz.fourView.visible = true;
            thiz.imgO.visible = true;
            thiz.fLine.visible = true;
            thiz.downLine.visible = true;
            thiz.midLine.visible = true;
            thiz.midLined.visible = true;
        }

        thiz.fLine = common.scaleLine([wuju, 24.6, 0], [xiangju, 24.6, 0], thiz.fLine);
        let viewHeight = 24.6 - (-0.524 * xiangju + 32.46);

        let scale = viewHeight / 7.86;
        if ( mark === 2 && Math.round(wuju) > -15 ) {
        } else {
            thiz.fourView.scale.set(0.5, scale, scale);
            thiz.imgO.scale.set(scale, scale, 1);
            thiz.fourView.position.z = 1.1 - (5.3 - (5.3 * scale)) / 4;
            thiz.imgO.position.z = 1.1 - (5.3 - (5.3 * scale)) / 4;
            if (Math.round(wuju) > -15) {
                thiz.fourView.position.y = 20.64 + (viewHeight - 7.86) / 2;
                thiz.imgO.position.y = 20.64 + (viewHeight - 7.86) / 2;
            } else {
                thiz.fourView.position.y = 20.64 - (viewHeight - 7.86) / 2;
                thiz.imgO.position.y = 20.64 - (viewHeight - 7.86) / 2;
            }
        }



        thiz.midLine = common.scaleLine([wuju, 24.6 + 7.86, 0], [0, 24.6 + 7.86, 0], thiz.midLine);

        thiz.midLined = common.scaleLine([0, 24.6 + 7.86, 0], [xiangju, -0.524 * xiangju + 32.46, 0], thiz.midLined);
    }

    private render = () => {

        requestAnimationFrame(this.render);
        if (this.count % 2 === 0) {
            this.material.envMap = this.cubeCamera1.renderTarget.texture;

            this.cubeCamera2.update(this.renderer, this.scene);
        } else {
            this.material.envMap = this.cubeCamera2.renderTarget.texture;

            this.cubeCamera1.update(this.renderer, this.scene);
        }
        this.material.envMap.mapping = THERR1.CubeRefractionMapping;
        this.count++;
        this.renderer.render(this.scene, this.camera);
        // this.scene.frustumCulled = false

        if (this.num1 === 1) {
            this.composer.render();
        }
    }

    init() {

        thiz = this;
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initModelInput();
        this.initWebGLRenderer();
        this.tbctrl();
        this.initControl();
        this.initElement(this.controls);
        // const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.render();

    }

    initScene(): void {
        this.scene = new THERR1.Scene();
        this.scene.background = new THERR1.Color(0x111);
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near = 0.1;
        const far = 1000;
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THERR1.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 170);
        this.cubeCamera1 = new THERR1.CubeCamera(5, 10000, 1024);
        this.cubeCamera1.renderTarget.texture.minFilter = THERR1.LinearMipMapLinearFilter;
        this.scene.add(this.cubeCamera1);
        this.cubeCamera2 = new THERR1.CubeCamera(5, 10000, 1024);
        this.cubeCamera2.renderTarget.texture.minFilter = THERR1.LinearMipMapLinearFilter;
        this.cubeCamera1.position.set(0, 28.5, 0);
        this.cubeCamera2.position.set(0, 28.5, 0);
        this.scene.add(this.cubeCamera2);
        this.material = new THERR1.MeshBasicMaterial({
            color: 0xffffff,
            refractionRatio: 0.5, reflectivity: 0.5, combine: THERR1.MixOperation,
            envMap: this.cubeCamera2.renderTarget.texture
        });
        // this.material.envMap.mapping = THREE.CubeRefractionMapping;

    }

    initModelInput() {
        this.model.initScene1().then(() => {
            this.model.obj1.visible = true;
            this.model.obj1.children[0].children[0].traverse((gra: any) => {
                gra.bVisible = false;
                if (gra.name === 'tutoujing') {
                    gra.material = new THERR1.MeshBasicMaterial({
                        envMap: this.cubeCamera1.renderTarget.texture,
                    });
                }
                if (gra.type === 'Mesh' && gra.name !== 'tutoujing') {
                    let acolor = gra.material.color;

                    if (gra.name === 'xkcx_4') {
                        gra.material = new THERR1.MeshBasicMaterial({
                            map: null,
                            color: '#ffff00',
                            side: THERR1.FrontSide,
                            transparent: true,
                        });
                        gra.position.set(-30, 28.5, 1.1);
                        this.fourView = gra.clone();
                        // this.fourView.computeBoundingSphere();
                        this.model4X = new THERR1.Group();
                        this.fourView.geometry.computeBoundingSphere();
                        this.fourView.geometry.center();
                        this.fourView.position.set(29.9, 28.5 - 7.86, 1.1);
                        this.model4X.position.set(30, 0, 0);
                        this.foure = gra.clone();

                        // @ts-ignore
                        let material = new THERR1.ShaderMaterial({
                            uniforms: {

                                textureWidth: {value: 1.0},
                                textureHeight: {value: 1.0},
                                Projection: {value: new THERR1.Vector4(11, -11.2, 36.519, 11)},
                                color: {value: new THERR1.Vector4(255, 150, 0, 1)},

                            },
                            vertexShader: this.vertexShader,
                            fragmentShader: this.fragmentShader,

                        });
                        this.fourView.material = material;
                        this.fourView.scale.set(0.5, 1, 1);
                        let helper = new THERR1.BoxHelper(this.fourView, 0xffff00);
                        // this.scene.add( helper );
                        helper.update();
                        // thiz.fourView.position.y = thiz.fourView.position.y+(7.86*1.2/2)
                        this.fourView.rotateZ(-Math.PI);
                        this.scene.add(this.fourView);
                        gra.visible = false;

                    } else if (gra.name === 'xkcx_guanzi') {
                        gra.material = new THERR1.MeshPhongMaterial({
                            map: null,
                            color: '#252525',
                            side: THERR1.FrontSide,
                        });
                    } else if (gra.name === 'xkcx_guangping') {
                        gra.material = new THERR1.MeshPhongMaterial({
                            map: null,
                            color: '#8b8b8b',
                            side: THERR1.FrontSide,

                        });
                    } else if (gra.name === 'xkcx_chizi_0') {
                        gra.material = new THERR1.MeshPhongMaterial({
                            map: null,
                            color: '#252525',
                            side: THERR1.FrontSide,

                        });
                    } else if (gra.name === 'xkcx_chizi_1') {
                        gra.material = new THERR1.MeshPhongMaterial({
                            map: null,
                            color: '#8b8b8b',
                            side: THERR1.FrontSide,

                        });
                    } else {
                        gra.material = new THERR1.MeshPhongMaterial({
                            map: null,
                            color: '#252525',
                            side: THERR1.FrontSide,

                        });
                    }


                }
            });

            this.scene.add(this.model.obj1);

            this.scene.remove(this.model.obj1.children[0].children[1]);
            this.scene.add(this.model.second);

            this.composer = new THERR1.EffectComposer(this.renderer);
            let renderPass = new THERR1.RenderPass(this.scene, this.camera);
            this.composer.addPass(renderPass);

            let obj3d = new THERR1.Object3D();
            let light = new THERR1.Group();
            this.a = thiz.model.obj1.children[0].children[0].children[0].clone();
            console.log();
            // this.a.material.color = '#ffff00'
            // thiz.model.obj1.children[0].children[0].children[0].visible = false;
            this.a.visible = true;
            this.a.name = 1;
            let select = [];
            obj3d.add(this.a);
            light.add(obj3d);
            select.push(light);
            this.outlinePass = new THERR1.OutlinePass(new
            THERR1.Vector2(window.innerWidth , window.innerHeight ), this.scene, this.camera, select);
            this.scene.add(light);
            this.composer.addPass(this.outlinePass);
            this.outlinePass.edgeStrength = 4;
            this.outlinePass.edgeGlow = 0;
            this.outlinePass.edgeThickness = 6;
            this.outlinePass.visibleEdgeColor.set('#ffa412');

            let effectFXAA = new THERR1.ShaderPass(THERR1.FXAAShader);
            effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
            effectFXAA.renderToScreen = true;
            this.composer.addPass(effectFXAA);
            this.num1 = 1;
            this.initMobile();
            this.render();

        });
    }

    initControl(): void {
        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbit.saveState();
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        // //是否可以缩放
        this.orbit.enableZoom = true;
        this.orbit.enableRotate = true;
        //是否自动旋转
        // this.orbit.autoRotate = true;
        //设置相机距离原点的最远距离
        this.orbit.minDistance = 1;
        //设置相机距离原点的最远距离
        this.orbit.maxDistance = 4000;

        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //是否自动旋转
        this.orbit.minAzimuthAngle = -Math.PI * 2;
        this.orbit.maxAzimuthAngle = Math.PI * 2;

        this.orbit.maxPolarAngle = Math.PI;

        //是否开启右键拖拽
        this.orbit.enablePan = false;
    }

    //初始化摄像机位置
    resetCamera() {
        this.controls.reset();
    }

    //初始化移动元素
    initMobile() {
        this.imgO = common.createImg([0, 0, 0], 5.3 * 1.1, 7.854 * 1.1, img1);
        this.imgO.position.set(29.8 , (28.5 - 7.86), 1.1);
        this.imgO.rotateY(Math.PI / 2);
        this.imgO.rotateX(Math.PI);

        this.scene.add(this.imgO);
        this.imgO.material.opacity = 0;
        this.teuxe = new THERR1.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
            minFilter: THERR1.LinearFilter,
            magFilter: THERR1.NearestFilter
        });
        new SliderControlLine([this.model.obj1.children[0].children[0].children[4].children[0],
            this.model.obj1.children[0].children[0].children[4].children[3],
            this.model.obj1.children[0].children[0].children[4].children[2], this.helpBox]).initEvent(this.camera, this.renderer);
    }

    // 初始化场景元素
    initElement(controls: any) {
        this.helpBox = new THERR1.Mesh(new THERR1.BoxGeometry(8, 25, 20), new THERR1.MeshPhongMaterial({
            transparent: true,
            opacity: 0
        }));
        this.helpBox.position.set(30, 0, 0);
        this.scene.add(this.helpBox);
        this.fLine = common.drawUnitLine();
        this.fLine = common.scaleLine([30, 24.6, 0], [-30, 24.6, 0], this.fLine);
        this.downLine = common.drawUnitLine();
        this.downLineD(-30, 30, this.downLine);
        this.midLine = common.drawUnitLine();
        this.midLine = common.scaleLine([-30, 24.6 + 7.86, 0], [0, 24.6 + 7.86, 0], this.midLine);
        this.midLined = common.drawUnitLine();
        this.midLined = common.scaleLine([0, 24.6 + 7.86, 0], [30, 24.6 - 7.86, 0], this.midLined);
        this.scene.add(this.fLine, this.midLine, this.midLined, this.downLine);


        this.getJiaoDian(0, 24.6 + 7.86, 30, 24.6 - 7.86, -30, 24.6 + 7.86, 30, 24.6 - 7.86);

    }

    getJiaoDian(x0: any, y0: any, x1: any, y1: any, x2: any, y2: any, x3: any, y3: any) {
        let y = ((y0 - y1) * (y3 - y2) * x0 +
            (y3 - y2) * (x1 - x0) * y0 +
            (y1 - y0) * (y3 - y2) * x2 + (x2 - x3) * (y1 - y0) * y2) / ((x1 - x0) * (y3 - y2) + (y0 - y1) * (x3 - x2));
        let x = x2 + (x3 - x2) * (y - y2) / (y3 - y2);

        this.jiaodian = [x, y];
    }

    downLineD(start: number, endX: number, line: any) {
        common.scaleLine([start, 24.6 + 7.86, 0], [endX, endX * ((24.6 + 7.86) - (24.6)) / start + 24.6, 0], line);
        this.getJiaoDian(0, 24.6 + 7.86, 30, 24.6 - 7.86, start, 24.6 + 7.86, endX, endX * ((24.6 + 7.86) - (24.6)) / start + 24.6);
        return 24.6 - (endX * ((24.6 + 7.86) - (24.6)) / start + 24.6);
    }

    /*；
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({
                antialias: true
            });
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as any).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    /**
     * 初始化控制器
     * 使用该控制器需要在render中调用update方法
     */
    tbctrl() {
        this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = 3;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = true;
        this.controls.noPan = true;
        this.controls.noRotate = true;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
    }

    /**
     * 初始化光源
     */
    initLight(): void {

        this.scene.add(new THREE.AmbientLight(0x222222));
        let pointLight1 = new THREE.PointLight(0xffffff, 0.2);
        pointLight1.position.set(1500, 10, 0);
        pointLight1.castShadow = false;
        this.scene.add(pointLight1);
        let pointLight2 = new THREE.PointLight(0xffffff, 0.2);
        pointLight2.position.set(-1500, 0, 0);
        this.scene.add(pointLight2);
        let pointLight3 = new THREE.PointLight(0xffffff, 1);
        pointLight3.position.set(0, -10, -150);
        this.scene.add(pointLight3);
        let pointLight4 = new THREE.PointLight(0xffffff, 1);
        pointLight4.position.set(0, -10, 150);
        this.scene.add(pointLight4);


    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    /**
     *  重置模型位置
     */
    resetModelPosition() {


    }

}
