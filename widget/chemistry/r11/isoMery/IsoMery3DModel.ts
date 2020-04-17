import * as THREE from 'three';
import {Object3D, Scene, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../src/three/template/ThreeBase';
const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
const Interaction = require('three.interaction');
OBJLoader(THREE);


//异戊烷
import * as isoPath from './sub_static/isoPentane/yww.gltf';
import * as isoBin from './sub_static/isoPentane/yiwuwang.bin';
//新戊烷
import * as newPath from './sub_static/newPentane/xww.gltf';
import * as newBin from './sub_static/newPentane/xww.bin';
//正戊烷
import * as nPath from './sub_static/nPentane/zww.gltf';
import * as nBin from './sub_static/nPentane/zww.bin';
//1-丁烯
import * as onebutPath from './sub_static/onebutene/dxq.gltf';
import * as onebutBin from './sub_static/onebutene/dxq.bin';
// //2--丁烯
import * as twobutPath from './sub_static/twobutene/dxw.gltf';
import * as twobutBin from './sub_static/twobutene/dxw.bin';
//2-甲基丙烯
import * as twometPath from './sub_static/twomethylpropene/jjpx.gltf';
import * as twometBin from './sub_static/twomethylpropene/jjpx.bin';
//甲醚
import * as methyPath from './sub_static/methylether/jm.gltf';
import * as methyBin from './sub_static/methylether/jm.bin';
//乙醇
import * as ethPath from './sub_static/ethanol/ycc.gltf';
import * as ethBin from './sub_static/ethanol/ycc.bin';
//顺-2-丁烯
import * as cis2Path from './sub_static/cis2butene/sdx.gltf';
import * as cis2Bin from './sub_static/cis2butene/sdx.bin';
//反-2-丁烯
import * as transPath from './sub_static/trans2butene/fdx.gltf';
import * as transBin from './sub_static/trans2butene/fdx.bin';
//D-甘油醛
import * as dglcePath from './sub_static/dglyceraldehyde/dgys.gltf';
import * as dglceBin from './sub_static/dglyceraldehyde/dgys.bin';
//L-甘油醛
import * as lglcePath from './sub_static/lglyceraldehyde/lgysss.gltf';
import * as lglceBin from './sub_static/lglyceraldehyde/lgysss.bin';

//碳链异构
import * as image1 from './sub_static/isoPentane/Material3809_baseColor.png';
import * as image2 from './sub_static/isoPentane/Material3810_baseColor.png';

import * as image3 from './sub_static/newPentane/Material126_baseColor.png';
import * as image4 from './sub_static/newPentane/Material5077_baseColor.png';

import * as image5 from './sub_static/nPentane/Material126_baseColor.png';
import * as image6 from './sub_static/nPentane/Material5077_baseColor.png';

//位置异构
import * as image7 from './sub_static/onebutene/Material126_baseColor.png';
import * as image8 from './sub_static/onebutene/Material5077_baseColor.png';

import * as image9 from './sub_static/twobutene/Material126_baseColor.png';
import * as image10 from './sub_static/twobutene/Material5077_baseColor.png';

import * as image11 from './sub_static/twomethylpropene/Material126_baseColor.png';
import * as image12 from './sub_static/twomethylpropene/Material5077_baseColor.png';

//官能团异构
import * as image13 from './sub_static/ethanol/Material126_baseColor.png';
import * as image14 from './sub_static/ethanol/Material5077_baseColor.png';
import * as image15 from './sub_static/ethanol/Material5078_baseColor.png';


import * as image16 from './sub_static/methylether/Material126_baseColor.png';
import * as image17 from './sub_static/methylether/Material5077_baseColor.png';
import * as image18 from './sub_static/methylether/Material5078_baseColor.png';

//顺反异构
import * as image19 from './sub_static/cis2butene/Material126_baseColor.png';
import * as image20 from './sub_static/cis2butene/Material5077_baseColor.png';
import * as image21 from './sub_static/trans2butene/Material126_baseColor.png';
import * as image22 from './sub_static/trans2butene/Material5077_baseColor.png';

//对应异构
import * as image23 from './sub_static/dglyceraldehyde/Material126_baseColor.png';
import * as image24 from './sub_static/dglyceraldehyde/Material5077_baseColor.png';
import * as image25 from './sub_static/dglyceraldehyde/Material5078_baseColor.png';

import * as image26 from './sub_static/lglyceraldehyde/Material126_baseColor.png';
import * as image27 from './sub_static/lglyceraldehyde/Material5077_baseColor.png';
import * as image28 from './sub_static/lglyceraldehyde/Material5078_baseColor.png';
import {SpriteText2D, textAlign} from 'three-text2d';

export class IsoMery3DModel extends ThreeBase  {
modelArry: Array<any> = [];
modelArry2: Array<any> = [];
modelArry3: Array<any> = [];
modelArry4: Array<any> = [];
modelArry5: Array<any> = [];
    textArry: Array<SpriteText2D> = [];
    textArry2: Array<SpriteText2D> = [];
    textArry3: Array<SpriteText2D> = [];
    textArry4: Array<SpriteText2D> = [];
    textArry5: Array<SpriteText2D> = [];

    /**
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
        this.init();

    }

    async init() {
        this.preload();
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.render();

    }

    preload() {
        const temp = [];
        temp.push(isoPath);
        temp.push(isoBin);

        temp.push(newPath);
        temp.push(newBin);

        temp.push(nPath);
        temp.push(nBin);

        temp.push(onebutPath);
        temp.push(onebutBin);

        temp.push(twobutPath);
        temp.push(twobutBin);

        temp.push(twometPath);
        temp.push(twometBin);


        temp.push(methyPath);
        temp.push(methyBin);

        temp.push(ethPath);
        temp.push(ethBin);

        temp.push(cis2Path);
        temp.push(cis2Bin);
        temp.push(transPath);
        temp.push(transBin);

        temp.push(dglcePath);
        temp.push(dglceBin);
        temp.push(lglcePath);
        temp.push(lglceBin);
        // console.log(xgPath);
        // console.log(xgBin);


        temp.push(image1);
        temp.push(image2);
        temp.push(image3);
        temp.push(image4);
        temp.push(image5);
        temp.push(image6);
        temp.push(image7);
        temp.push(image8);
        temp.push(image9);
        temp.push(image10);
        temp.push(image11);
        temp.push(image12);
        temp.push(image13);
        temp.push(image14);
        temp.push(image15);
        temp.push(image16);
        temp.push(image17);
        temp.push(image18);
        temp.push(image19);
        temp.push(image20);
        temp.push(image21);
        temp.push(image22);
        temp.push(image23);
        temp.push(image24);
        temp.push(image25);
        temp.push(image26);
        temp.push(image27);
        temp.push(image28);
        console.log('resources count:' + temp.length);


        // console.log(m342);
        // console.log(m343);
        // console.log(m344);
        // console.log(m523);
    }

    initScene(): void {
        this.scene = new THREE.Scene();
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {
        this.camera =  new THREE.PerspectiveCamera(45, this.width / this.height, 1, 5000);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 400);
    }


    /**
     * 加载模型
     * @returns {Promise<void>}
     */
     initGltfLoaderFive() {
        // //D-甘油醛
        this.textArry5[0] = this.createText('D-甘油醛', -50, -40 , 220, '#000000');
        this.scene.add( this.textArry5[0]);
        this.gltfLoader(dglcePath as any).then((dglp) => {
            dglp.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    (child as any).position.set(-50, 0, 220 ) ;
                    this.modelArry5.push(child);
                    this.scene.add(child);
                }
            });
        });

        // //L-甘油醛
        this.textArry5[1] = this.createText('L-甘油醛', 50, -40 , 220, '#000000');
        this.scene.add(this.textArry5[1]);
        this.gltfLoader(lglcePath as any).then((lglp) => {
            lglp.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    (child as any).position.set(50, 0, 220) ;
                    this.modelArry5.push(child);
                    this.scene.add(child);
                }
            });
        });

    }
     initGltfLoaderFour() {
        // //顺-2-丁烯
         this.textArry4[0] = this.createText('顺-2-丁烯', -50, -40 , 220, '#000000');
         this.scene.add(this.textArry4[0]);
        this.gltfLoader(cis2Path as any).then((cist) => {
            cist.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    (child as any).position.set(-50, 0, 220) ;
                    this.modelArry4.push(child);
                    this.scene.add(child);
                }
            });
        });

        // //反-2-丁烯
         this.textArry4[1] = this.createText('反-2-丁烯', 50, -40 , 220, '#000000');
         this.scene.add(this.textArry4[1]);
        this.gltfLoader(transPath as any).then((eths) => {
            eths.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    (child as any).position.set(50, 0, 220) ;
                    this.modelArry4.push(child);
                    this.scene.add(child);
                }
            });
        });

    }
     initGltfLoaderThree() {
        // //甲醚
         this.textArry3[0] = this.createText('甲醚', -60, -40 , 220, '#000000');
         this.scene.add(this.textArry3[0]);
        this.gltfLoader(methyPath as any).then((meth) => {
            meth.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    (child as any).position.set(-50, 0, 250) ;
                    this.modelArry3.push(child);
                    this.scene.add(child);
                }
            });
        });

        // //乙醇
         this.textArry3[1] = this.createText('乙醇', 60, -40 , 220, '#000000');
         this.scene.add(this.textArry3[1]);
        this.gltfLoader(ethPath as any).then((trap) => {
            trap.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    (child as any).position.set(50, 0, 250) ;
                    this.modelArry3.push(child);
                    this.scene.add(child);
                }
            });
        });
    }
    initGLtfLoaderTwo() {

        //1-丁烯
        this.textArry2[0] = this.createText('1-丁烯', -80, -40 , 220, '#000000');
         this.scene.add( this.textArry2[0]);
        this.gltfLoader(onebutPath as any).then((oneb) => {
            oneb.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    (child as any).position.set(-80, 0, 220) ;
                    this.modelArry2.push(child);
                    this.scene.add(child);
                }
            });
        });

        // //2--丁烯
        this.textArry2[1]  = this.createText('2-丁烯', 0, -40 , 220, '#000000');
         this.scene.add(this.textArry2[1] );
        this.gltfLoader(twobutPath as any).then((twob) => {
            twob.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    (child as any).position.set(0, 0, 220) ;
                    this.modelArry2.push(child);
                    this.scene.add(child);
                }
            });
        });
        // //甲基丙烯-2
        this.textArry2[2] = this.createText('2-甲基丙烯', 80, -40 , 220, '#000000');
         this.scene.add(this.textArry2[2]);
        this.gltfLoader(twometPath as any).then((twome) => {
            twome.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    (child as any).position.set(80, 0, 220) ;
                    this.modelArry2.push(child);
                    this.scene.add(child);
                }
            });
        });

    }
     initGltfLoader()  {

        //正戊烷
         this.textArry[0] = this.createText('正戊烷', -80, -40 , 220, '#000000');
         this.scene.add(this.textArry[0]);
        this.gltfLoader(nPath as any).then((nl) => {

            nl.scene.traverse((child: any) => {

                if (child instanceof Scene) {
                    (child as any).position.set(-80, 0, 210);
                    this.modelArry.push(child);
                    this.scene.add(child);
                }
            });

        });
        // //异戊烷
         this.textArry[1] = this.createText('异戊烷', 0, -40 , 220, '#000000');
         this.scene.add(this.textArry[1]);
        this.gltfLoader(isoPath as any).then((iso) => {
            iso.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    (child as any).position.set(0 , 0, 210) ;
                    this.modelArry.push(child);
                    this.scene.add(child);
                }
            });
        });
        // //新戊烷
         this.textArry[2] = this.createText('新戊烷', 80, -40 , 220, '#000000');
         this.scene.add(this.textArry[2]);
        this.gltfLoader(newPath as any).then((newl) => {
            newl.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    (child as any).position.set(80, 0, 210) ;
                    this.modelArry.push(child);
                    this.scene.add(child);
                }
            });
        });
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            //背景透明
            this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true});
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }

        //this.renderer = new THREE.WebGLRenderer({antialias:true});
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor('#FFFFFF' , 0.0);
        this.renderer.setSize(this.width, this.height);
        const element = this.domElement.appendChild(this.renderer.domElement);

    }

    createText(text: string, x: number, y: number, z: number, color: any) {
        const textStyle = {align: textAlign.center, font: '48px "Arial"', fillStyle: '#000000', antialias: true};
        const txt = new SpriteText2D(text, textStyle);
        txt.scale.set(0.1 , 0.1 , 0.1);
        txt.position.set(x, y , z);
        return txt;
    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        const orbit = new OrbitControls( this.camera, this.renderer.domElement );
        orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否可以缩放
        orbit.enableZoom = true;
        //是否自动旋转
        orbit.autoRotate = false;
        //设置相机距离原点的最远距离
        orbit.minDistance = 1;
        //设置相机距离原点的最远距离
        orbit.maxDistance = 4000;

        //是否开启右键拖拽
        orbit.enablePan = false;
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
        this.lights[0].castShadow = true;
        this.lights[0].shadow.mapSize.width = 1024;
        this.lights[0].shadow.mapSize.height = 1024;

        const d = 300;

        (this.lights[0] as any).shadow.camera.left = - d;
        (this.lights[0] as any).shadow.camera.right = d;
        (this.lights[0] as any).shadow.camera.top = d;
        (this.lights[0] as any).shadow.camera.bottom = - d;
        (this.lights[0] as any).shadow.camera.far = 1000;

        this.scene.add( this.lights[0] );

    }

    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene, this.camera );
    }
 }
