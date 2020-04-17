import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);

import * as redImage from '../sub_static/red.png';
import * as blueImage from '../sub_static/blue.png';
import * as greenImage from '../sub_static/green.png';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';

export class Ddzb3dModel extends ThreeBase {


    planeMesh: Mesh;
    private orbit: any;
    private text1: any;
    private text2: any;
    private text3: any;
    private text4: any;
    private text5: any;
    private point: THREE.Mesh;
    private line1: any;
    private line2: any;
    private line3: any;
    private blue: THREE.Mesh;
    private red: THREE.Mesh;
    private green: THREE.Mesh;
    static loadImage() {
        const array = [blueImage, greenImage, redImage];
        console.log(array);
    }
    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene,  this.camera );
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
        this.fov     = !fov    ? this.fov       :  fov;
        this.near    = !near   ? this.near      :  near;
        this.far     = !far    ? this.far       :  fov;
        this.width   = !width  ? window.innerWidth     :  width;
        this.height  = !height ? window.innerHeight    :  height;
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
        this.createAxis();
        this.createWord();
        this.render();
    }


    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );
    }

    initLight() {
        this.lights = [];
        this.lights.push(new THREE.AmbientLight( 0xffffff, 0.4));
        this.scene.add(this.lights[0]);
        const directionalLight4 = new THREE.HemisphereLight( '#ffffff', '#ffffff', 0.7 );
        directionalLight4.color.setHSL(.6, 1, .6);
        directionalLight4.groundColor.setHSL(.095, 1, .75);
        directionalLight4.position.set(0, 0, 0);
        this.scene.add( directionalLight4 );
        const c = new THREE.DirectionalLight('#F0F0F0', 0.05);
        c.position.set(200, 200, 100);
        const u = new THREE.DirectionalLight('#F0F0F0', 0.05);
        u.position.set(-200, -200, -100);
        this.scene.add( c );
        this.scene.add( u );
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        const scale = BrowserUtil.getBrowserInfo().isSmallDevice ? 2 : 6;
        const left    = this.width / - scale;
        const right   = this.width / scale;
        const top     = this.height / scale;
        const bottom  = this.height / - scale;
        const near    = -600;
        const far     = 1000;
        this.camera =  new THREE.OrthographicCamera(left,  right,  top,  bottom,  near,  far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(51,  28,  -37);
    }


    //重置摄像机位置
    resetCamera() {
        for (let i = 0; i < 20; i++) {
            this.orbit.reset();
        }
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer( { antialias:  true } );
        }  else  {
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
        this.orbit = new OrbitControls( this.camera,  this.renderer.domElement );
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //设置相机距离原点的最远距离
        this.orbit.minDistance = 50;
        this.orbit.maxDistance = 70;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //是否自动旋转
        this.orbit.minAzimuthAngle = -Math.PI * 2;
        this.orbit.maxAzimuthAngle = Math.PI * 2;

        this.orbit.maxPolarAngle = Math.PI; // radians

        //是否开启右键拖拽
        this.orbit.enablePan = false;
        this.orbit.enableZoom = false;
    }


    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    //创建坐标轴
    createAxis() {
        const scale = 0.5;
        const color = '#000000';
        const XAxis = ThreeUtil.createCylinder(scale, scale, 200, color);
        const YAxis = ThreeUtil.createCylinder(scale, scale, 200, color);
        const ZAxis = ThreeUtil.createCylinder(scale, scale, 200, color);
        const XArrow = ThreeUtil.createCone(scale * 2, scale * 8, color, 100, 0, 0);
        const YArrow = ThreeUtil.createCone(scale * 2, scale * 8, color, 0, 100, 0);
        const ZArrow = ThreeUtil.createCone(scale * 2, scale * 8, color, 0, 0, -100);
        YAxis.rotateZ(Math.PI / 2);
        ZAxis.rotateX(Math.PI / 2);
        XArrow.rotateZ(-Math.PI / 2);
        ZArrow.rotateX(-Math.PI / 2);
        this.scene.add(XAxis);
        this.scene.add(YAxis);
        this.scene.add(ZAxis);
        this.scene.add(XArrow);
        this.scene.add(YArrow);
        this.scene.add(ZArrow);
    }

    //创建随机点
    createRandomPoint(lineControl: boolean) {
        if (!this.point) {
            const geometry = new THREE.SphereBufferGeometry( 2, 32, 32 );
            const material = new THREE.MeshPhongMaterial( {color: '#afadff',  specular: '#ffffff', shininess: 30, side: THREE.FrontSide} );
            this.point = new THREE.Mesh( geometry, material );
            this.point.position.set(this.getRandomNumber(), this.getRandomNumber(), this.getRandomNumber());
            this.text5.text = 'p(' + (this.point.position.x / 10) + ',' + (-this.point.position.z / 10) +
                ',' + (this.point.position.y / 10) + ')';
            this.point.add(this.text5);
            this.scene.add(this.point);
        } else {
            this.hidePoint(true);
            this.point.position.set(this.getRandomNumber(), this.getRandomNumber(), this.getRandomNumber());
            this.text5.text = 'p(' + (this.point.position.x / 10) + ',' + (-this.point.position.z / 10) +
                ',' + (this.point.position.y / 10) + ')';
            if (lineControl) {
                this.loadPointImage();
                this.removeLines();
                this.createLine();
            }
        }
    }

    //获取随机数方法
    getRandomNumber() {
        const min = Math.ceil(-100);
        const max = Math.floor(100);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //隐藏点方法
    hidePoint(isShow: boolean) {
        this.point.visible = isShow;
    }

    //加载线顶端的图片
   loadPointImage() {
       if (!this.blue) {
           const scale = 6.8;
           this.blue = ThreeUtil.createImg(scale, scale, blueImage);
           this.red = ThreeUtil.createImg(scale, scale, redImage);
           this.green = ThreeUtil.createImg(scale, scale, greenImage);
           this.green.rotateY(Math.PI / 2);
           this.blue.rotateX(Math.PI / 2);
           this.resetPointImagePosition();
           this.scene.add(this.blue);
           this.scene.add(this.red);
           this.scene.add(this.green);
       } else {
           this.hidePointImage(true);
           this.resetPointImagePosition();
       }
   }

   hidePointImage(isShow: boolean) {
        this.blue.visible = isShow;
        this.red.visible = isShow;
        this.green.visible = isShow;
   }

   resetPointImagePosition() {
       this.blue.position.set(this.point.position.x, 0, this.point.position.z);
       this.red.position.set(this.point.position.x, this.point.position.y, 0);
       this.green.position.set(0, this.point.position.y, this.point.position.z);
   }

    //通过随机点坐标连线的方法
    createLine() {
        this.line1 = ThreeUtil.createDashLine(new THREE.Vector3(this.point.position.x, this.point.position.y, this.point.position.z),
            new THREE.Vector3(0, this.point.position.y, this.point.position.z), '#67C600', 5, 1);
        this.line2 = ThreeUtil.createDashLine(new THREE.Vector3(this.point.position.x, this.point.position.y, this.point.position.z),
            new THREE.Vector3(this.point.position.x, 0, this.point.position.z), '#148DE6', 5, 1);
        this.line3 = ThreeUtil.createDashLine(new THREE.Vector3(this.point.position.x, this.point.position.y, this.point.position.z),
            new THREE.Vector3(this.point.position.x, this.point.position.y, 0), '#EA6417', 5, 1);
        this.scene.add(this.line1);
        this.scene.add(this.line2);
        this.scene.add(this.line3);
    }

    removeLines() {
        this.removeLine(this.line1);
        this.removeLine(this.line2);
        this.removeLine(this.line3);
        this.line1 = null;
        this.line2 = null;
        this.line3 = null;
    }

    //删除线的方法
    removeLine(obj: THREE.Mesh) {
        this.scene.remove(obj);
        obj.geometry.dispose();
        (obj.material as any).dispose();
    }

    //重置场景方法
    reset() {
        if (!this.point) {
            return;
        }
        this.hidePoint(false);
    }

    createWord() {
        const scale = 0.2;
         this.text1 = ThreeUtil.createNewRomanText('x', 100, 0, 0, '#000000', scale);
         this.text2 = ThreeUtil.createNewRomanText('y', 0, 0, -100, '#000000', scale);
         this.text3 = ThreeUtil.createNewRomanText('z', 0, 110, 0, '#000000', scale);
         this.text4 = ThreeUtil.createNewRomanText('o', 5, 0, 0, '#000000', scale);
         this.scene.add(this.text1);
         this.scene.add(this.text2);
         this.scene.add(this.text3);
         this.scene.add(this.text4);
         this.text5 = ThreeUtil.createNormalText('P(0,0,0)', 0, 10, 0, '#000000', scale / 2);

    }

}




