import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import common from "./CommonForThree";
import * as img2 from '../sub_static/2.png';
import * as img1 from '../sub_static/123.png';

export class YzModel extends ThreeBase {


    browserInfo: BrowserInfo;

    public orbit: any;
    groupHArry :any;
    groupHModel = new THREE.Group();
    groupMesh = new THREE.Group();
    CircleG = new THREE.CircleGeometry(1.2, 4);
    CircleM = new THREE.MeshBasicMaterial({color: '#000'});
    circleBase = new THREE.Mesh(this.CircleG, this.CircleM);
    penPoint = common.createImg([0, 0,1], 500, 500, img1);
    private penPoint2 = common.createImg([0, 0,1], 360, 360, img2);
    C = new THREE.Mesh(new THREE.CircleGeometry(3, 36), new THREE.MeshBasicMaterial({color: '#A4003F'}));
    ST :any;
    SA :any;
    clickNum = 0;
    num = 0;
    tabF = true;
    isShow = false;
    private ellipsePointArr: Array < any > = [];
    private circle: any;
    private pointArr: any = [];
    private pointGroup = new THREE.Group();
    public timer: any;



    private render = () => {
        // if(this.tabF){
            requestAnimationFrame( this.render );
        // }

        this.camera.lookAt(this.scene.position);
        this.renderer.render( this.scene, this.camera );

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
        // this.initControl();
        this.render();
        this.initBasci();
        this.initEllipsePos()
    }


    /**
     *
     * 初始化场景
     */
    initScene(): void {
        this.scene = new THREE.Scene();
        this.groupHArry = []
        this.scene.add(this.pointGroup,this.penPoint);
        this.penPoint.visible = this.isShow
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {
        if (this.height < 500) {
            this.camera =   new THREE.OrthographicCamera(this.width / -0.6 , this.width / 0.6 , this.height / 0.6 , this.height / -0.6, 1, 2000);
        }else{
            this.camera =   new THREE.OrthographicCamera(this.width / -2.5 , this.width / 2.5 , this.height / 2.5 , this.height / -2.5, 1, 2000);
        }

        this.camera.position.set(0, 100, 500);
        this.resetModel();

       
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
        this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
        this.orbit.saveState ();
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        // //是否可以缩放
        this.orbit.enableZoom = false;
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

    /**
     * 初始化光源
     */
    initLight(): void {

         }
    initBasci(){
       this.scene.add(this.C);
       this.C.position.set(0,0,0)
    }
    initEllipsePos() {
        // let x = 1
        // let y = 1
        for (let i = 90; i < 456; i += 4) {
            let x =16* Math.cos(Math.PI * i / 180);
            let y = 16*  Math.sin(Math.PI * i / 180);

            this.ellipsePointArr.push({ x, y, z: 0 });

        }

    }
    drawEllipseHandle() {
       let bool = true
        if (bool) {
            this.drawEllipseAni(10, 10);

        } else {
            clearTimeout(this.timer);
            this.scene.remove(this.circle);
        }
    }
    drawEllipseAni(a: number, b: number) {
        let num = 0;
        let thiz =this
        function move() {
            if (num > 90) {
                clearTimeout(thiz.timer);

                thiz.pointGroup.remove(...thiz.pointArr);
                thiz.pointArr = [];
                return;
            }
            thiz.scene.remove(thiz.circle);

            const pointArr = thiz.ellipsePointArr.slice(90 - num, 120);
            // const pointArr = thiz.ellipsePointArr

            thiz.circle = common.drawDashOrLine(pointArr);
            thiz.circle.scale.set(a, b, 2);
            thiz.scene.add(thiz.circle);
            num++;
            thiz.timer = setTimeout(move, 30);
        }
        move();
    }

    add1() {
        if (this.num >= 3000) {
            return;
        }
        this.tabF = true;
        if (this.clickNum < 15) {
            this.cc(50);
        } else if (this.clickNum < 30) {
            this.cc(70);
        } else if (this.clickNum < 40) {
            this.cc(90);
        } else if (this.clickNum < 50) {
            this.cc(110);
        } else if (this.clickNum < 60) {
            this.cc(130);
        } else {
            this.cc(170);
        }
        this.clickNum++;
        this.num++;
        this.render();
        clearTimeout(this.ST);
        clearInterval(this.SA);
        let thiz =this
        this.ST = setTimeout(function () {
            if (thiz.tabF) {
                thiz.render();
                let an = function () {
                    if (thiz.tabF == false || thiz.num >= 6000) {
                        cancelAnimationFrame(thiz.SA);
                        return;
                    }
                    for (var i = 0; i < 4; i++) {
                        thiz.cc(50);
                    }
                    for (var i = 0; i < 3; i++) {
                        thiz. cc(70);
                    }
                    for (var i = 0; i < 2; i++) {
                        thiz.cc(90);
                    }
                    thiz.cc(110);
                    thiz.cc(130);
                    thiz.cc(150);
                    thiz.cc(170);
                    thiz.num += 14;
                    thiz.SA = requestAnimationFrame(an);
                };
                an();
            } else {
                clearTimeout(thiz.ST);
            }
        }, 500);
    }
    initImage(a:boolean){
        this.penPoint.visible = a
        console.log(a)
        if(!a){
            clearTimeout(this.timer);
            this.scene.remove(this.circle)
        }
    }
   remove1(){
       this.tabF = false;
       this.num = 0;
       this.clickNum = 0;
       console.log(this.scene)
       clearTimeout(this.timer);
       // this.scene.remove(this.groupHModel, this.groupMesh);
       this.scene = null;
       this.initScene();
       this.initLight();
       this.initBasci()
       this.render();

       this.groupHArry = [];
       this.groupHModel = null;
       this.groupMesh = null;
       this.groupHModel = new THREE.Group();
       this.groupMesh = new THREE.Group();
       this.scene.add(this.groupHModel, this.groupMesh);


   }
   createCircle(x:number, y:number) {
        let L = this.groupHArry.length;
       this. groupHArry[L] = this.circleBase.clone();
       this.groupHArry[L].position.set(x, y, 0);
       this.groupHModel.add(this.groupHArry[L]);
        if (this.groupHArry.length % 100 == 0) {
            // this.scene.remove(this.groupHModel);
            let geometry = new THREE.Geometry();
            for (let j = 0; j < this.groupHArry.length; j++) {
                this.groupHArry[j].updateMatrix();
                geometry.merge(this.groupHArry[j].geometry, this.groupHArry[j].matrix);
            }
            let pGM = new THREE.Mesh(geometry, this.CircleM);
            this.groupMesh.add(pGM);
            this.groupHArry = [];
            this.groupHModel = new THREE.Group();
            this.scene.add(this.groupHModel);
        }
    }
    cc(r:number) {
        let ang = Math.random() * Math.PI * 2;
        let R = Math.random() * r;
        let x = Math.cos(ang) * R;
        let y = Math.sin(ang) * R;
        this.createCircle(x, y);
    }
    addBall(){
        this.scene.add(this.penPoint2)
    }

    //重置材料
    initMaterial() {

    }


    //加载动画
    init3DModel() {
        
    }

    // 开始动画
    startCuttingAnimation() {
        
    }

    // 重置动画
    resetModel() {
        this.camera.lookAt(0, 0, 0);
    }


    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(100, 100, 200);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }

}
