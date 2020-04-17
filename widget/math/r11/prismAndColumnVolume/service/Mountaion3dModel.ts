import * as THREE from 'three';
import {
    LineSegments,
    WebGLRenderer
} from 'three';

import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {Mesh} from 'three';
import {PerspectiveCamera} from 'three';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';


const OBJLoader = require('three-obj-loader');


const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
/*require('imports?THREE=three!exports?THREE.OrbitControls!../../node_modules\/three\/examples\/js\/loaders\/OBJLoader');*/
export class Mountaion3dModel extends ThreeBase {

    planeMesh: Mesh;

    private geometry: any;
    private material: any;
    private cylinder: any;

    private edgenum: any        = 4;
    private modeheight  = 5;
    private area = 3;

    private edges: any;
    private line: any;
    private numth1: any;
    private mheight: any        = 0;

    private pointArray: any;
    private slantAngle: any     = 90;
    control = false;
    controlAnimation = false;
    animationclose = false;

    private topArray: any;
    private bottomArray: any;
    private orbit: any;

    private cameraPosition: any;
    private cameraRotation: any;
    private circle = 60;

    private isMobile = BrowserUtil.getBrowserInfo().isSmallDevice;

    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene, this.camera );
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
        this.fov     = !fov    ? this.fov       : fov;
        this.near    = !near   ? this.near      : near;
        this.far     = !far    ? this.far       : fov;
        this.width   = !width  ? window.innerWidth     : width;
        this.height  = !height ? window.innerHeight    : height;
        this.domElement = domElement;
       // console.log("init Simple3DModel constructor");
        this.init();

    }
    async init() {
        this.initScene();
        this.initCamera();
        this.getCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        //this.customGemotry();
        this.initprism();
        this.getpointX(this.edgenum);
        this.render();

    }


    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {

        const scale = this.isMobile ? 12 : 30;
        const left    = this.width / - scale;
        const right   = this.width / scale;
        const top     = this.height / scale;
        const bottom  = this.height / - scale;
        const near    = 1;
        const far     = 1000;
        this.camera =  new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 40, 55);
    }

    //记录摄像机初始位置
    getCamera() {
        this.cameraPosition = this.camera.position;
        this.cameraRotation = this.camera.rotation;
    }

     //初始化摄像机位置
     resetCamera() {
         this.orbit.object.lookAt(new THREE.Vector3(0, 0, 0));
         this.orbit.object.position.set(0, 40, 55);
         this.orbit.reset();
     }


    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true } );
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
        this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;

        //orbit.maxPolarAngle = Math.PI * 0.5;
        //设置相机距离原点的最远距离
        this.orbit.minDistance = 50;
        this.orbit.maxDistance = 70;

        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否自动旋转
        //orbit.autoRotate = true;
        this.orbit.minAzimuthAngle = -Math.PI * 2;
        this.orbit.maxAzimuthAngle = Math.PI * 2;

        //orbit.minPolarAngle = ; // radians
        this.orbit.maxPolarAngle = Math.PI; // radians

        //是否开启右键拖拽
        this.orbit.enablePan = false;
    }


    /**
     * 初始化光源
     */
    initLight(): void {
        this.lights = [];

        this.scene.add( new THREE.AmbientLight( 0x666666 ) );
        this.lights[0] = new THREE.DirectionalLight( 0xdfebff, 1 );
        this.lights[0].position.set( 50, 200, 100 );
        this.lights[0].position.multiplyScalar( 1.3 );
        this.scene.add( this.lights[0] );
    }


    //获取滑条棱数修改模型
    edge(num: any ) {
        this.cylinder.position.y = 0;
        if (num === '+∞') {
            this.numth1 = num;
            this.edgenum = this.circle;
            this.disposeLine();
            //this.updateLines2th((new THREE.CylinderGeometry( this.area, this.area, this.modeheight, this.edgenum)));
        } else {
            this.numth1 = null;
            this.edgenum = num;
            this.removeCircle();
            this.removeBotCir();
            this.updateLines1th((new THREE.CylinderGeometry( this.area, this.area, this.modeheight, this.edgenum)));
        }
        this.updateGroupGeometry(this.cylinder, (new THREE.CylinderGeometry( this.area, this.area, this.modeheight, this.edgenum)));



    }


    //获取底面积滑条修改模型底面积
    areaEvent(num: number ) {
        this.cylinder.position.y = 0;
        this.area = num;

        //this.updateEdges(this.edges,(new THREE.CylinderGeometry( this.area,this.area, this.modeheight,this.edgenum)));
        if (this.numth1 === '+∞') {
            this.disposeLine();
           // this.updateLines2th((new THREE.CylinderGeometry( this.area, this.area, this.modeheight, this.edgenum)));
        } else {
            this.updateLines1th((new THREE.CylinderGeometry( this.area, this.area, this.modeheight, this.edgenum)));
        }
        this.updateGroupGeometry(this.cylinder, (new THREE.CylinderGeometry( this.area, this.area, this.modeheight, this.edgenum)));

    }


    //获取高度滑条数据修改模型高度
    heightEvent(num: number ) {
        this.cylinder.position.y = 0;
        this.modeheight = num;
        this.updateGroupGeometry(this.cylinder, (new THREE.CylinderGeometry( this.area, this.area, this.modeheight, this.edgenum)));

        //this.updateEdges(this.edges,(new THREE.CylinderGeometry( this.area,this.area, this.modeheight,this.edgenum)));
        if (this.numth1 === '+∞') {
            this.disposeLine();
            //this.updateLines2th((new THREE.CylinderGeometry( this.area, this.area, this.modeheight, this.edgenum)));
        } else {
            this.updateLines1th((new THREE.CylinderGeometry( this.area, this.area, this.modeheight, this.edgenum)));
            this.updateGroupGeometry(this.cylinder, (new THREE.CylinderGeometry( this.area, this.area, this.modeheight, this.edgenum)));
        }

    }

    /**
     * 获取初始几何体的顶点坐标
     * @param num
     */
    getpointX(num: any ) {
        this.pointArray = [];
        let i;
        if (num === '+∞') {
            num = this.edgenum;
            for (i = 0; i <= num; i++) {
                this.pointArray[i] = this.cylinder.geometry.vertices[i].x;
                if (i === num) {
                    this.pointArray[i] = this.cylinder.geometry.vertices[num * 2].x;
                }
            }
        } else {
            for (i = 0; i <= num; i++) {
                this.pointArray[i] = this.cylinder.geometry.vertices[i].x;
                if (i === num) {
                    this.pointArray[i] = this.cylinder.geometry.vertices[num * 2].x;
                }
            }
        }

    }


    /**
     * 传入倾斜角度数使几何体倾斜
     * @param {number} num
     */
    angleEvent(num: number ) {
        // Math.tan(num)/this.modeheight;
        //当前倾斜角度
        if (num === 0) {
            this.slantAngle = 0.14;
        } else {
            this.slantAngle = num;
        }
        this.updateGroupGeometry(this.cylinder, (new THREE.CylinderGeometry( this.area, this.area, this.modeheight, this.edgenum)));
    }

    //实现注满液体按钮
    liquid() {
        this.animationclose = false;
        this.controlAnimation = true;
        //将几何体变扁并将几何体移动到线框底部
            if (this.control === false ) {
                this.cylinder.position.y = 0;
                this.mheight = 0;
                this.updategeometry1th(this.cylinder);
                if (this.cylinder.position.y === 0) {
                    this.cylinder.position.y -= 0;
                }
            }


        //调整几何体顶点位置并调整几何体的高度形成动画效果
       const intervalId = setInterval(() => {
            if (this.animationclose) {
                this.mheight = this.modeheight - 0.1;
                this.cylinder.position.y = -0.1 + this.modeheight / 2;
                clearInterval(intervalId);
            }
            if (this.control) {
                clearInterval(intervalId);
                this.cylinder.position.y = this.modeheight / 2;
                this.mheight = this.modeheight;
                this.control = false;
                this.controlAnimation = false;
                (window as any).viewHandler.viewModel.$data.disabledReset = false;
            } else {
                this.mheight += 0.1;
                //当前模型高度+0.1大于滑条高度且小于滑条高度时将当前模型高度值强行设置为当前滑条高度
                if (this.mheight + 0.1 >= this.modeheight && this.mheight <= this.modeheight) {
                    // console.log(this.mheight +"--" +this.modeheight);
                    this.mheight = this.modeheight;
                    if (this.modeheight > 1 && this.modeheight < 5) {
                        this.cylinder.position.y += 0.05;
                    }
                }
                this.updategeometry2th(this.cylinder, this.mheight);
                this.cylinder.position.y += 0.05;
                this.show3DVolume();

                if (this.mheight >= this.modeheight) {
                   // console.log(this.mheight +"==" +this.modeheight);
                    this.mheight = this.modeheight;
                    this.controlAnimation = false;
                    (window as any).viewHandler.viewModel.$data.disabledReset = false ;
                    clearInterval(intervalId);
                }
            }
       }, 100);

    }


    //显示当前3D模型的体积
    show3DVolume() {
        const display = document.getElementById('shownum');
        /*display.value*/
            if (this.animationclose) {
                (display as HTMLInputElement).value = '0';
            } else {
                const num = this.mheight * this.area;
                (display as HTMLInputElement).value = num.toFixed(2) + '';
            }

    }

    //初始化几何体
    initprism() {
        this.edgenum    = 4;
        this.area       = 10;
        this.modeheight = 5;
        this.geometry = new THREE.CylinderGeometry( this.area, this.area, this.modeheight, this.edgenum);
        //let material1th = new THREE.MeshLambertMaterial({color: 0x4A90E2,opacity:0.5});

        this.material = new THREE.MeshBasicMaterial( {color: 0x4a90e2, transparent : true, opacity : 0.2, side : THREE.DoubleSide} );
        this.cylinder = new THREE.Mesh( this.geometry, this.material );
/*        let cylinder1th = new THREE.Mesh(this.geometry,material1th);
        this.scene.add(cylinder1th);*/
        this.edges    = new THREE.EdgesGeometry(this.geometry, 1);
        this.line     = new THREE.LineSegments( this.edges, new THREE.LineBasicMaterial( { color: 0x4A90E2 } ) );
        this.cylinder.position.y = this.modeheight / 2;
        this.line.position.y = this.modeheight / 2;
        this.scene.add( this.cylinder );
        //this.scene.add(this.wireframe);
         this.scene.add(this.line);
    }

    //获取数据重构几何体
    updateGroupGeometry( cylinder: any, geometry: any ) {
        cylinder.geometry.dispose();
        cylinder.geometry = geometry;
        this.line.position.y = this.modeheight / 2;
        this.getAngle();
    }

    //获取倾斜角改变几何模型的倾斜角度
    getAngle() {
        this.getpointX(this.edgenum);
        let i;
        for (i = 0; i <= this.edgenum; i++) {
            if ( i === this.edgenum) {
                this.cylinder.geometry.vertices[this.edgenum * 2].x = this.pointArray[i];
            } else {
                this.cylinder.geometry.vertices[i].x = this.pointArray[i];
            }
        }
        let j;
        for (j = 0; j <= this.edgenum; j++) {
        if (j === this.edgenum) {
        this.cylinder.geometry.vertices[j * 2].x += Math.tan((Math.PI / 180 * 90) - (Math.PI / 180 * this.slantAngle)) * this.modeheight;
        } else {
        this.cylinder.geometry.vertices[j].x += Math.tan((Math.PI / 180 * 90) - (Math.PI / 180 * this.slantAngle)) * this.modeheight;
        }

        }
        this.cylinder.geometry.verticesNeedUpdate = true;
        if (this.edgenum === this.circle) {
            this.disposeLine();
            this.updateLines2th(this.cylinder.geometry);
           /* this.line.geometry.dispose();*/
           /* this.cylinder.position.y = this.modeheight / 2;*/

        } else {
            this.updateLines1th(this.cylinder.geometry);
        }
    }

    //绘制出几何体边框
    updateLines1th(geometry: any ) {

        this.line.geometry.dispose();
        this.line.geometry = new THREE.EdgesGeometry(geometry, 0.1);
        this.cylinder.position.y = this.modeheight / 2;
    }


    //绘制出圆柱体边框
    updateLines2th(geometry: any ) {
        this.line.geometry.dispose();
        this.line.geometry = new THREE.EdgesGeometry(geometry, 90);
        this.cylinder.position.y = this.modeheight / 2;
        //this.changColumnBorder();
    }

    //将几何体变扁实现动画效果
    updategeometry1th(cylinder: any ) {
        cylinder.geometry.dispose();
        cylinder.geometry = new THREE.CylinderGeometry( this.area, this.area, 0.1, this.edgenum);

    }

    //实现按钮的动画效果
    updategeometry2th(cylinder: any , modeheight: number) {
        cylinder.geometry.dispose();
        cylinder.geometry = new THREE.CylinderGeometry( this.area, this.area, modeheight, this.edgenum);
        let i;
        for ( i = 0; i <= this.edgenum; i++) {
            if (i === this.edgenum) {
                this.cylinder.geometry.vertices[this.edgenum * 2].x = this.pointArray[i];
            } else {
                this.cylinder.geometry.vertices[i].x = this.pointArray[i];
            }
        }
        let j;
        for ( j = 0 ; j <= this.edgenum; j++) {
            if ( j === this.edgenum) {
                this.cylinder.geometry.vertices[j * 2].x += Math.tan((Math.PI / 180 * 90) - (Math.PI / 180 * this.slantAngle)) * modeheight;
            } else {
                this.cylinder.geometry.vertices[j].x += Math.tan((Math.PI / 180 * 90) - (Math.PI / 180 * this.slantAngle)) * modeheight;
            }

        }
        this.cylinder.geometry.verticesNeedUpdate = true;
    }

    //初始化显示框内的数字
    resetNum() {
        const display = document.getElementById('shownum');
        (display as HTMLInputElement).value = '0';
    }

    setControl(control: boolean ) {
        if (this.controlAnimation) {
            this.control = control;
        }

    }


    //绘制圆柱的上边框
    createCircleLine() {
        //创建一个圆的模型
        const geometry1 = new THREE.CircleBufferGeometry( this.area, this.edgenum );
        const l1        = new THREE.EdgesGeometry(geometry1, 90);
        const line1     = new THREE.LineSegments( l1,  new THREE.LineBasicMaterial(  { color:  0x4A90E2 } ) );

        line1.name = 'tempLine';
        line1.position.y = this.modeheight;
        line1.position.x = Math.tan((Math.PI / 180 * 90) - (Math.PI / 180 * this.slantAngle)) * this.modeheight;
        line1.rotateX(Math.PI / 180 * 90);
        this.scene.add(line1);

    }


    removeCircle() {
        this.scene.traverse((child: any) => {
            if (child instanceof LineSegments && child.name === 'tempLine') {
                this.scene.remove(child);
                child.geometry.dispose();

            }
        });
    }


    //绘制圆柱的下边框
    createBotCir() {
    const geometry2 = new THREE.CircleBufferGeometry( this.area, this.edgenum );
    const l2        = new THREE.EdgesGeometry(geometry2, 90);
    const line2     = new THREE.LineSegments( l2,  new THREE.LineBasicMaterial({ color:  0x4A90E2 }) );
    line2.name = 'botcircleline';
    line2.position.y = 0;
    line2.rotateX(Math.PI / 180 * 90);
    this.scene.add(line2);
    }

    //删除圆柱的下边框
    removeBotCir() {
        this.scene.traverse((child1: any) => {
            if (child1 instanceof LineSegments && child1.name === 'botcircleline') {
                this.scene.remove(child1);
                child1.geometry.dispose();
            }
        });
    }


    disposeLine() {

        this.removeCircle();
        this.removeBotCir();
        this.createBotCir();
        this.createCircleLine();
    }

    resize(width: number , height: number ) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width, height );
    }

}
