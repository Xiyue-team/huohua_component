import * as THREE from 'three';
import {
    Euler, WebGLRenderer, Quaternion, Object3D
} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera, Scene} from 'three';
import * as EMDPath from '../sub_static/easyModeD/jd.gltf';
import * as EMDBin from '../sub_static/easyModeD/jd.bin';
import * as EMLPath from '../sub_static/easyModeL/jllls.gltf';
import * as EMLBin from '../sub_static/easyModeL/jllls.bin';


import * as EMD1 from '../sub_static/easyModeD/Material126_baseColor.png';
import * as EMD2 from '../sub_static/easyModeD/Material8254_baseColor.png';
import * as EMD3 from '../sub_static/easyModeD/Material8255_baseColor.png';
import * as EMD4 from '../sub_static/easyModeD/Material8256_baseColor.png';
import * as EMD5 from '../sub_static/easyModeD/Material8257_baseColor.png';

import * as EML1 from '../sub_static/easyModeL/Material126_baseColor.png';
import * as EML2 from '../sub_static/easyModeL/Material8254_baseColor.png';
import * as EML3 from '../sub_static/easyModeL/Material8255_baseColor.png';
import * as EML4 from '../sub_static/easyModeL/Material8256_baseColor.png';
import * as EML5 from '../sub_static/easyModeL/Material8257_baseColor.png';


import * as dgPath from '../sub_static/D-glyceraldehyde/dgys.gltf';
import * as dgBin from '../sub_static/D-glyceraldehyde/dgys.bin';
import * as lgPath from '../sub_static/L-glyceraldehyde/lgysss.gltf';
import * as lgBin from '../sub_static/L-glyceraldehyde/lgysss.bin';


import * as dg1 from '../sub_static/D-glyceraldehyde/Material126_baseColor.png';
import * as dg2 from '../sub_static/D-glyceraldehyde/Material5077_baseColor.png';
import * as dg3 from '../sub_static/D-glyceraldehyde/Material5078_baseColor.png';

import * as lg1 from '../sub_static/L-glyceraldehyde/Material126_baseColor.png';
import * as lg2 from '../sub_static/L-glyceraldehyde/Material5077_baseColor.png';
import * as lg3 from '../sub_static/L-glyceraldehyde/Material5078_baseColor.png';


import * as mirror from '../sub_static/mirror.png';
import {SpriteText2D} from 'three-text2d';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';


const OBJLoader = require('three-obj-loader');

const Interaction = require('three.interaction');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);

/*require('imports?THREE=three!exports?THREE.OrbitControls!../../node_modules\/three\/examples\/js\/loaders\/OBJLoader');*/
export class Dl1th3dModel extends ThreeBase {

    private orbit: any;

    private child1: any;
    private child2: any;
    private child3: any;

    private child4: any;
    private child5: any;
    private child6: any;

    private isDragging = false;
    private isTouching = false;

    private previousMousePositionX = 0;
    private previousMousePositionY = 0;
    private previousTouchPositionX = 0;
    private previousTouchPositionY = 0;

    private color: String = '#000000';

    private mirrorMesh: any;
    private vMirror: any;

    private obj1: any;
    private obj2: any;

    private geometry: any = new THREE.PlaneBufferGeometry(60, 70);
    private material: any = new THREE.MeshBasicMaterial({color: 0xffff00, visible: false});

    private render = () => {
        this.renderer.render(this.scene, this.camera);
        setTimeout(this.render, 28);

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
        console.log('init Simple3DModel constructor');
        this.init();

    }

    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.preload();
        this.initGltfLoader();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.render();

    }

    preload() {
        console.log(EMDPath);
        console.log(EMDBin);
        console.log(EMLPath);
        console.log(EMLBin);

        console.log(EMD1);
        console.log(EMD2);
        console.log(EMD3);
        console.log(EMD4);
        console.log(EMD5);

        console.log(EML1);
        console.log(EML2);
        console.log(EML3);
        console.log(EML4);
        console.log(EML5);

        console.log(dgPath);
        console.log(dgBin);
        console.log(lgPath);
        console.log(lgBin);

        console.log(dg1);
        console.log(dg2);
        console.log(dg3);

        console.log(lg1);
        console.log(lg2);
        console.log(lg3);

        console.log(mirror);

    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xFFFFFF);
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {
        const left = this.width / -20;
        const right = this.width / 20;
        const top = this.height / 20;
        const bottom = this.height / -20;
        const near = 1;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 20);

        //适配ipad
        if (BrowserUtil.getBrowserInfo().isIpad) {
            (this.camera as THREE.OrthographicCamera).zoom = 0.7;
            (this.camera as THREE.OrthographicCamera).updateProjectionMatrix();
        }

    }


    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({antialias: true});
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
        // this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;

        //orbit.maxPolarAngle = Math.PI * 0.5;
        //设置相机距离原点的最远距离
        // this.orbit.minDistance = 50;
        // this.orbit.maxDistance = 70;

        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否自动旋转
        //orbit.autoRotate = true;
        // this.orbit.minAzimuthAngle = -Math.PI * 2;
        // this.orbit.maxAzimuthAngle = Math.PI * 2;

        //orbit.minPolarAngle = ; // radians
        // this.orbit.maxPolarAngle = Math.PI; // radians

        //是否开启右键拖拽
        this.orbit.enablePan = false;
        //是否开启左键旋转
        this.orbit.enableRotate = false;
        //启用或禁用缩放
        this.orbit.enableZoom = false;
    }


    /**
     * 初始化光源
     */
    initLight(): void {
        this.lights = [];
        this.scene.add(new THREE.AmbientLight(0x666666));
        this.lights[0] = new THREE.DirectionalLight(0xdfebff, 1);
        this.lights[0].position.set(-50, 90, 100);
        this.lights[0].position.multiplyScalar(1.3);
        this.scene.add(this.lights[0]);
    }

    /*
    * 加载3d模型
    * */
    initGltfLoader() {

        this.obj2 = new THREE.Object3D();
        //页面二
        //D/R 模型
        //同步加载
        // const mdr: any = await this.gltfLoader(EMLPath as any);
        //异步加载
        this.gltfLoader(EMLPath as any).then((mdr) => {
            mdr.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    this.child4 = child;
                    this.child4.position.x = -25;
                    this.child4.rotateX(Math.PI / 180 * 90);

                    const group3 = new THREE.Group();
                    const mesh2 = new THREE.Mesh(this.geometry, this.material);
                    mesh2.position.x = -30;

                    const cText3 = this.createText('D-甘油醛', -25, -25, 0, this.color);
                    const cText4 = this.createText('R-甘油醛', -25, -28, 0, this.color);

                    group3.add(this.child4);
                    group3.add(mesh2);
                    this.obj2.add(group3);

                    this.obj2.add(cText3);
                    this.obj2.add(cText4);

                    this.obj2.visible = false;

                    this.scene.add(this.obj2);

                    //鼠标按下
                    (group3 as any).on('mousedown', (event: Event) => {
                        this.isDragging = true;
                    });

                    //鼠标松开
                    (group3 as any).on('mouseup', (event: Event) => {
                        this.isDragging = false;
                    });

                    ( group3 as any).on('mouseout', (event: Event) => {
                        this.isDragging = false;
                    });

                    //鼠标移动
                    (group3 as any).on('mousemove', (event: MouseEvent) => {
                        const deltaMove = {

                            x: (event as any).data.originalEvent.offsetX - this.previousMousePositionX,
                            y: (event as any).data.originalEvent.offsetY - this.previousMousePositionY
                        };
                        if (this.isDragging) {
                            const x = this.toRadians(deltaMove.y * 1);
                            const y = this.toRadians(deltaMove.x * 1);
                            const deltaRotationQuaternion = new Quaternion().setFromEuler(
                                new Euler(x, y, 0, 'XYZ')
                            );

                            const x1 = this.toRadians(deltaMove.y * 1);
                            const y1 = this.toRadians(deltaMove.x * 1);
                            const deltaRotationQuaternionM = new Quaternion().setFromEuler(
                                new Euler(x1, -y1, 0, 'XYZ')
                            );
                            child.quaternion.multiplyQuaternions(deltaRotationQuaternion, child.quaternion);
                            this.child6.quaternion.multiplyQuaternions(deltaRotationQuaternionM, this.child6.quaternion);
                            this.child5.quaternion.multiplyQuaternions(deltaRotationQuaternion, this.child5.quaternion);
                        }

                        this.previousMousePositionX = (event as any).data.originalEvent.offsetX;
                        this.previousMousePositionY = (event as any).data.originalEvent.offsetY;
                    });

                    //触摸开始
                    (group3 as any).on('touchstart', (event: Event) => {
                        this.isTouching = true;
                    });

                    //触摸结束
                    (group3 as any).on('touchend', (event: Event) => {
                        this.isTouching = false;
                    });

                    //触摸移动
                    (group3 as any).on('touchmove', (event: any) => {

                      let TouchPX: number;
                      let TouchPY: number;

                      if ((event as any).data.originalEvent.clientX === undefined) {
                        TouchPX = (event as any).data.originalEvent.changedTouches[0].clientX;
                        TouchPY = (event as any).data.originalEvent.changedTouches[0].clientY;
                      } else {
                        TouchPX = (event as any).data.originalEvent.clientX;
                        TouchPY = (event as any).data.originalEvent.clientY;
                      }

                        const deltaMove = {
                            x: TouchPX - this.previousTouchPositionX,
                            y: TouchPY - this.previousTouchPositionY
                        };

                        if (this.isTouching) {
                            const x = this.toRadians(deltaMove.y * 1);
                            const y = this.toRadians(deltaMove.x * 1);
                            const deltaRotationQuaternion = new Quaternion().setFromEuler(
                                new Euler(x, y, 0, 'XYZ')
                            );

                            const x1 = this.toRadians(deltaMove.y * 1);
                            const y1 = this.toRadians(deltaMove.x * 1);
                            const deltaRotationQuaternionM = new Quaternion().setFromEuler(
                                new Euler(x1, -y1, 0, 'XYZ')
                            );

                            child.quaternion.multiplyQuaternions(deltaRotationQuaternion, child.quaternion);
                            this.child6.quaternion.multiplyQuaternions(deltaRotationQuaternionM, this.child6.quaternion);
                            this.child5.quaternion.multiplyQuaternions(deltaRotationQuaternion, this.child5.quaternion);
                        }

                      if ((event as any).data.originalEvent.clientX === undefined) {
                        TouchPX = (event as any).data.originalEvent.changedTouches[0].clientX;
                        TouchPY = (event as any).data.originalEvent.changedTouches[0].clientY;
                      } else {
                        TouchPX = (event as any).data.originalEvent.clientX;
                        TouchPY = (event as any).data.originalEvent.clientY;
                      }

                    });
                }
            });
        });


        //L-S甘油醛
        // const emd: any = await this.gltfLoader(EMDPath as any);
        this.gltfLoader(EMDPath as any).then((emd) => {
            emd.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    this.child5 = child;
                    this.child5.visible = false;
                    this.child5.position.x = 25;
                    this.child5.rotateX(Math.PI / 180 * 90);

                    const group4 = new THREE.Group();
                    const mesh1 = new THREE.Mesh(this.geometry, this.material);
                    mesh1.position.x = 32;

                    const cText1 = this.createText('L-甘油醛', 25, -25, 0, this.color);
                    const cText2 = this.createText('S-甘油醛', 25, -28, 0, this.color);

                    group4.add(this.child5);
                    group4.add(mesh1);
                    this.obj2.add(group4);

                    this.obj2.add(cText1);
                    this.obj2.add(cText2);
                    this.scene.add(this.obj2);

                    // //鼠标按下
                    (group4 as any).on('mousedown', (event: Event) => {
                        this.isDragging = true;
                    });

                    //鼠标松开
                    (group4 as any).on('mouseup', (event: Event) => {
                        this.isDragging = false;
                    });

                    ( group4 as any).on('mouseout', (event: Event) => {
                        this.isDragging = false;
                    });

                    //点击破碎镜面
                    (group4 as any).on('click', (event: Event) => {
                        this.child5.visible = true;
                        this.child6.visible = false;
                        this.mirrorMesh.visible = false;
                    });


                    //鼠标移动
                    (group4 as any).on('mousemove', (event: MouseEvent) => {

                        const deltaMove = {
                            x: (event as any).data.originalEvent.offsetX - this.previousMousePositionX,
                            y: (event as any).data.originalEvent.offsetY - this.previousMousePositionY
                        };
                        if (this.isDragging) {
                            const x = this.toRadians(deltaMove.y * 1);
                            const y = this.toRadians(deltaMove.x * 1);
                            const deltaRotationQuaternion = new Quaternion().setFromEuler(
                                new Euler(x, y, 0, 'XYZ')
                            );

                            child.quaternion.multiplyQuaternions(deltaRotationQuaternion, child.quaternion);
                            this.child4.quaternion.multiplyQuaternions(deltaRotationQuaternion, this.child4.quaternion);
                        }

                        this.previousMousePositionX = (event as any).data.originalEvent.offsetX;
                        this.previousMousePositionY = (event as any).data.originalEvent.offsetY;
                    });

                    //触摸开始
                    (group4 as any).on('touchstart', (event: Event) => {
                        this.child5.visible = true;
                        this.child6.visible = false;
                        this.mirrorMesh.visible = false;
                        this.isTouching = true;
                    });

                    //触摸结束
                    (group4 as any).on('touchend', (event: Event) => {
                        this.isTouching = false;
                    });

                    //触摸移动
                    (group4 as any).on('touchmove', (event: any) => {

                      let TouchPX: number;
                      let TouchPY: number;

                      if ((event as any).data.originalEvent.clientX === undefined) {
                        TouchPX = (event as any).data.originalEvent.changedTouches[0].clientX;
                        TouchPY = (event as any).data.originalEvent.changedTouches[0].clientY;
                      } else {
                        TouchPX = (event as any).data.originalEvent.clientX;
                        TouchPY = (event as any).data.originalEvent.clientY;
                      }

                        const deltaMove = {
                            x: TouchPX - this.previousTouchPositionX,
                            y: TouchPY - this.previousTouchPositionY
                        };

                        if (this.isTouching) {
                            const x = this.toRadians(deltaMove.y * 1);
                            const y = this.toRadians(deltaMove.x * 1);
                            const deltaRotationQuaternion = new Quaternion().setFromEuler(
                                new Euler(x, y, 0, 'XYZ')
                            );

                            child.quaternion.multiplyQuaternions(deltaRotationQuaternion, child.quaternion);
                            this.child4.quaternion.multiplyQuaternions(deltaRotationQuaternion, this.child4.quaternion);
                        }

                      if ((event as any).data.originalEvent.clientX === undefined) {
                        TouchPX = (event as any).data.originalEvent.changedTouches[0].clientX;
                        TouchPY = (event as any).data.originalEvent.changedTouches[0].clientY;
                      } else {
                        TouchPX = (event as any).data.originalEvent.clientX;
                        TouchPY = (event as any).data.originalEvent.clientY;
                      }

                    });
                }
            });
        });

        //镜内模型
        // const mir: any = await this.gltfLoader(EMDPath as any);
        this.gltfLoader(EMDPath as any).then((mir) => {
            mir.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    this.child6 = child;
                    this.child6.position.x = 25;
                    this.child6.rotateX(90 * Math.PI / 180);
                    this.obj2.add(this.child6);
                    this.scene.add(this.obj2);
                }
            });
        });


        this.obj1 = new THREE.Object3D();
        //页面一
        //D/R甘油醛
        // const dgl: any = await this.gltfLoader(dgPath as any);
        this.gltfLoader(dgPath as any).then((dgl) => {
            dgl.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    this.child1 = child;
                    this.child1.scale.set(0.7, 0.7, 0.7);
                    this.child1.position.x = -25;
                    this.child1.position.z = 0;

                    const group1 = new THREE.Group();
                    const mesh1 = new THREE.Mesh(this.geometry, this.material);
                    mesh1.position.x = -30;

                    const c1Text1 = this.createText('D-甘油醛', -25, -25, 0, this.color);
                    const c1Text2 = this.createText('R-甘油醛', -25, -28, 0, this.color);

                    group1.add(mesh1);
                    group1.add(this.child1);
                    this.obj1.add(group1);

                    this.obj1.add(c1Text1);
                    this.obj1.add(c1Text2);
                    this.scene.add(this.obj1);

                    //鼠标按下
                    ( group1 as any).on('mousedown', (event: Event) => {
                        this.isDragging = true;
                    });

                    //鼠标拿起
                    ( group1 as any).on('mouseup', (event: Event) => {
                        this.isDragging = false;
                    });

                    //鼠标移出
                    ( group1 as any).on('mouseout', (event: Event) => {
                        this.isDragging = false;
                    });

                    //触摸开始
                    ( group1 as any).on('touchstart', (event: Event) => {
                        this.isTouching = true;
                    });

                    //触摸结束
                    ( group1 as any).on('touchend', (event: Event) => {
                        this.isTouching = false;
                    });

                    //触摸移动
                    ( group1 as any).on('touchmove', (event: any) => {
                      let TouchPX: number;
                      let TouchPY: number;

                      if ((event as any).data.originalEvent.clientX === undefined) {
                        TouchPX = (event as any).data.originalEvent.changedTouches[0].clientX;
                        TouchPY = (event as any).data.originalEvent.changedTouches[0].clientY;
                      } else {
                        TouchPX = (event as any).data.originalEvent.clientX;
                        TouchPY = (event as any).data.originalEvent.clientY;
                      }

                        const deltaMove = {
                            x: TouchPX - this.previousTouchPositionX,
                            y: TouchPY - this.previousTouchPositionY
                        };

                        if (this.isTouching) {
                            const x = this.toRadians(deltaMove.y * 1);
                            const y = this.toRadians(deltaMove.x * 1);
                            const deltaRotationQuaternion = new Quaternion().setFromEuler(
                                new Euler(x, y, 0, 'XYZ')
                            );

                            const x1 = this.toRadians(deltaMove.y * 1);
                            const y1 = this.toRadians(deltaMove.x * 1);
                            const deltaRotationQuaternionM = new Quaternion().setFromEuler(
                                new Euler(x1, -y1, 0, 'XYZ')
                            );

                            child.quaternion.multiplyQuaternions(deltaRotationQuaternion, child.quaternion);
                            this.child2.quaternion.multiplyQuaternions(deltaRotationQuaternion, this.child2.quaternion);
                            this.child3.quaternion.multiplyQuaternions(deltaRotationQuaternionM, this.child3.quaternion);
                        }

                      if ((event as any).data.originalEvent.clientX === undefined) {
                        TouchPX = (event as any).data.originalEvent.changedTouches[0].clientX;
                        TouchPY = (event as any).data.originalEvent.changedTouches[0].clientY;
                      } else {
                        TouchPX = (event as any).data.originalEvent.clientX;
                        TouchPY = (event as any).data.originalEvent.clientY;
                      }
                    });

                    //鼠标拖拽
                    ( group1 as any).on('mousemove', (event: MouseEvent) => {
                        const deltaMove = {
                            x: (event as any).data.originalEvent.offsetX - this.previousMousePositionX,
                            y: (event as any).data.originalEvent.offsetY - this.previousMousePositionY
                        };
                        if (this.isDragging) {
                            // console.log('拖动');
                            const x = this.toRadians(deltaMove.y * 1);
                            const y = this.toRadians(deltaMove.x * 1);
                            const deltaRotationQuaternion = new Quaternion().setFromEuler(
                                new Euler(x, y, 0, 'XYZ')
                            );

                            const x1 = this.toRadians(deltaMove.y * 1);
                            const y1 = this.toRadians(deltaMove.x * 1);
                            const deltaRotationQuaternionM = new Quaternion().setFromEuler(
                                new Euler(x1, -y1, 0, 'XYZ')
                            );

                            child.quaternion.multiplyQuaternions(deltaRotationQuaternion, child.quaternion);
                            this.child2.quaternion.multiplyQuaternions(deltaRotationQuaternion, this.child2.quaternion);
                            this.child3.quaternion.multiplyQuaternions(deltaRotationQuaternionM, this.child3.quaternion);
                        }

                        this.previousMousePositionX = (event as any).data.originalEvent.offsetX;
                        this.previousMousePositionY = (event as any).data.originalEvent.offsetY;
                    });
                }
            });
        });


        //L/S甘油醛
        // const lgl: any = await this.gltfLoader(lgPath as any);
        this.gltfLoader(lgPath as any).then((lgl) => {
            lgl.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    this.child2 = child;
                    this.child2.position.x = 25;
                    this.child2.scale.set(0.7, 0.7, 0.7);
                    //L/S甘油醛模型默认不可见
                    this.child2.visible = false;

                    const group2 = new THREE.Group();
                    const mesh1 = new THREE.Mesh(this.geometry, this.material);
                    mesh1.position.x = 32;

                    const c1Text3 = this.createText('L-甘油醛', 25, -25, 0, this.color);
                    const c1Text4 = this.createText('S-甘油醛', 25, -28, 0, this.color);

                    group2.add(mesh1);
                    group2.add(this.child2);

                    this.obj1.add(group2);

                    this.obj1.add(c1Text3);
                    this.obj1.add(c1Text4);

                    this.scene.add(this.obj1);


                    ( group2 as any).on('mousedown', (event: Event) => {
                        this.isDragging = true;
                    });

                    ( group2 as any).on('mouseup', (event: Event) => {
                        this.isDragging = false;
                    });

                    ( group2 as any).on('mouseout', (event: Event) => {
                        this.isDragging = false;
                    });

                    ( group2 as any).on('click', (event: Event) => {
                        this.child2.visible = true;
                        this.child3.visible = false;
                        this.vMirror.visible = false;
                    });

                    ( group2 as any).on('mousemove', (event: MouseEvent) => {
                        // console.log('拖动');
                        const deltaMove = {
                            x: (event as any).data.originalEvent.offsetX - this.previousMousePositionX,
                            y: (event as any).data.originalEvent.offsetY - this.previousMousePositionY
                        };
                        if (this.isDragging) {
                            const x = this.toRadians(deltaMove.y * 1);
                            const y = this.toRadians(deltaMove.x * 1);
                            const deltaRotationQuaternion = new Quaternion().setFromEuler(
                                new Euler(x, y, 0, 'XYZ')
                            );

                            //拖动一个模型，使另一个模型跟着旋转
                            child.quaternion.multiplyQuaternions(deltaRotationQuaternion, child.quaternion);
                            this.child1.quaternion.multiplyQuaternions(deltaRotationQuaternion, this.child1.quaternion);
                        }

                        this.previousMousePositionX = (event as any).data.originalEvent.offsetX;
                        this.previousMousePositionY = (event as any).data.originalEvent.offsetY;
                    });

                    // //触摸开始
                    ( group2 as any).on('touchstart', (event: Event) => {
                        this.child2.visible = true;
                        this.child3.visible = false;
                        this.vMirror.visible = false;
                        this.isTouching = true;
                    });

                    //触摸结束
                    ( group2 as any).on('touchend', (event: Event) => {
                        this.isTouching = false;
                    });

                    //触摸移动
                    ( group2 as any).on('touchmove', (event: Event) => {

                      let TouchPX: number;
                      let TouchPY: number;

                      if ((event as any).data.originalEvent.clientX === undefined) {
                        TouchPX = (event as any).data.originalEvent.changedTouches[0].clientX;
                        TouchPY = (event as any).data.originalEvent.changedTouches[0].clientY;
                      } else {
                        TouchPX = (event as any).data.originalEvent.clientX;
                        TouchPY = (event as any).data.originalEvent.clientY;
                      }

                      const deltaMove = {
                            x: TouchPX - this.previousTouchPositionX,
                            y: TouchPY - this.previousTouchPositionY
                        };
                        if (this.isTouching) {
                            const x = this.toRadians(deltaMove.y * 1);
                            const y = this.toRadians(deltaMove.x * 1);
                            const deltaRotationQuaternion = new Quaternion().setFromEuler(
                                new Euler(x, y, 0, 'XYZ')
                            );
                            child.quaternion.multiplyQuaternions(deltaRotationQuaternion, child.quaternion);
                            this.child1.quaternion.multiplyQuaternions(deltaRotationQuaternion, this.child1.quaternion);
                        }


                      if ((event as any).data.originalEvent.clientX === undefined) {
                        TouchPX = (event as any).data.originalEvent.changedTouches[0].clientX;
                        TouchPY = (event as any).data.originalEvent.changedTouches[0].clientY;
                      } else {
                        TouchPX = (event as any).data.originalEvent.clientX;
                        TouchPY = (event as any).data.originalEvent.clientY;
                      }
                    });

                }

            });
        });


        //镜内模型
        // const mir: any = await this.gltfLoader(lgPath as any);
        this.gltfLoader(lgPath as any).then((mir) => {
            mir.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    this.child3 = child;
                    this.child3.scale.set(0.7, 0.7, 0.7);
                    this.child3.rotateY(180 * Math.PI / 180);
                    this.child3.position.x = 25;
                    this.obj1.add(this.child3);
                    this.scene.add(this.obj1);
                }
            });
        });


        //创建镜子
        //页面二镜子
        const loader = new THREE.TextureLoader();
        const floorTexture = loader.load(mirror as any);
        const geometry = new THREE.PlaneBufferGeometry(42, 52);
        const material = new THREE.MeshPhongMaterial({map: floorTexture, transparent: true, opacity: 0.5});
        this.mirrorMesh = new THREE.Mesh(geometry, material);
        this.mirrorMesh.position.x = 25;
        this.mirrorMesh.position.z = -20;
        this.obj2.add(this.mirrorMesh);
        this.scene.add(this.obj2);

        //页面一镜子
        this.vMirror = new THREE.Mesh(geometry, material);
        this.vMirror.position.x = 25;
        this.vMirror.position.z = -20;
        this.obj1.add(this.vMirror);
        this.scene.add(this.obj1);

    }


    //简化模型的按钮
    axiomEvent(axiom: any) {
        if (axiom === true) {
            this.obj1.visible = false;
            this.obj2.visible = true;
        } else {
            this.obj1.visible = true;
            this.obj2.visible = false;
            this.reset();
        }
    }

    //计算角度方法
    toRadians(angle: number) {
        return angle * (Math.PI / 180);
    }

    toDegrees(angle: number) {
        return angle * (180 / Math.PI);
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    // 创建文字
    createText(texts: any, x: any, y: any, z: any, color: any) {
        const textStyle = {fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.068, 0.068, 0.068);
        text.position.set(x, y, z);
        return text;
    }

    reset() {

        //页面一
        //左侧模型复位且镜面里的模型不会重复出现
        this.child1.rotation.set(0, 0, 0);
        this.child1.updateMatrix();

        //显示镜面
        this.vMirror.visible = true;

        //模型复位且隐形
        this.child2.visible = false;
        this.child2.rotation.set(0, 0, 0);
        this.child2.updateMatrix();

        //镜面里的模型复位且显示
        this.child3.visible = true;
        this.child3.rotation.set(0, -180 * Math.PI / 180, 0);
        this.child3.updateMatrix();


        //页面二
        //左侧模型复位且镜面里的模型不会重复出现
        this.child4.rotation.set(-90 * Math.PI / 180, 0, 0);
        this.child4.updateMatrix();

        //显示镜面
        this.mirrorMesh.visible = true;

        //模型复位且隐形
        this.child5.visible = false;
        this.child5.rotation.set(-90 * Math.PI / 180, 0, 0);
        this.child5.updateMatrix();

        //镜面里的模型复位且显示
        this.child6.visible = true;
        this.child6.rotation.set(-90 * Math.PI / 180, 0, 0);
        this.child6.updateMatrix();
    }

}
