/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16:52
 */
import * as THREE from 'three';
import { DoubleSide } from 'three';
import { ThreeBase } from '../../../../src/three/ThreeBase';
const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
import { SpriteText2D } from 'three-text2d';
import { ViewController } from '../../../../src/core/ViewController';
export class Dihedral3DModel extends ThreeBase {
    /**
     *
     * @param {Element} domElement   渲染element
     * @param {number} fov    视角
     * @param {number} width  实际显示宽
     * @param {number} height 实际显示高
     * @param {number} near   距离镜头最近距离
     * @param {number} far    距离镜头最远距离
     */
    constructor(domElement, fov, width, height, near, far) {
        super();
        //棱的默认色
        this.edgeColor = 0x602205;
        this.planeColor = 0x4A90E2;
        //上面动画开关
        this.topAnimationEnable = false;
        this.topPlanePosition = [2.59, 4.48, 0];
        //下底面动画开关
        this.bottomAnimationEnable = false;
        this.bottomPlanePosition = [2.6, 1];
        //角度线开关
        this.lineAnimationEnable = false;
        this.rightAngleLine = [];
        this.render = () => {
            requestAnimationFrame(this.render);
            this.prismAnimation();
            this.topPlaneAnimation();
            this.bottomPlaneAnimation();
            this.lineAnimation();
            this.renderer.render(this.scene, this.camera);
        };
        this.fov = !fov ? this.fov : fov;
        this.near = !near ? this.near : near;
        this.far = !far ? this.far : fov;
        this.width = !width ? window.innerWidth : width;
        this.height = !height ? window.innerHeight : height;
        this.domElement = domElement;
        this.init();
    }
    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initDiheMagentic();
        this.initWebGLRenderer();
        this.initControl();
        this.render();
    }
    /**
     *
     * 初始化场景
     */
    initScene() {
        this.scene = new THREE.Scene();
    }
    /**
     * 初始化镜头
     */
    initCamera() {
        // this.camera = new THREE.PerspectiveCamera(this.fov,this.width/this.height,this.near, this.far);
        // this.camera.position.z = 10;
        this.camera = new THREE.OrthographicCamera(window.innerWidth / -50, window.innerWidth / 50, window.innerHeight / 50, window.innerHeight / -50, 1, 1000);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(31, 23, 42);
    }
    initDiheMagentic() {
        //初始化二面角面
        this.initPlane();
        //初始化二面角的棱
        //this.initEdge();
        //初始化二面角角度线
        this.initLine();
        //初始化文本
        //this.initText();
        //this.initArc();
    }
    //绘制二面角的面
    initPlane() {
        //上面
        const geometry = new THREE.PlaneBufferGeometry(10, 25, 30, 30);
        const material = new THREE.MeshBasicMaterial({ color: this.planeColor, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
        this.topPlane = new THREE.Mesh(geometry, material);
        this.topPlane.rotateX(Math.PI / 2);
        this.topPlane.rotateY(Math.PI / 3);
        this.topPlane.position.set(2.59, 4.48, 0);
        //底面
        const geometryTwo = new THREE.PlaneGeometry(10, 25, 30, 30);
        const materialTwo = new THREE.MeshBasicMaterial({ color: this.planeColor,
            side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
        this.bottomPlane = new THREE.Mesh(geometryTwo, materialTwo);
        this.bottomPlane.rotateX(Math.PI / 2);
        this.bottomPlane.position.setX(2.6);
        this.bottomPlane.position.setY(1);
        this.scene.add(this.bottomPlane);
        //旋转中心点
        const cirGeo = new THREE.PlaneBufferGeometry(.1, .1, .1);
        this.centerMesh = new THREE.Mesh(cirGeo, new THREE.MeshBasicMaterial({ color: this.planeColor, side: THREE.DoubleSide,
            transparent: true, opacity: .01 }));
        this.centerMesh.position.setX(-2.4);
        this.centerMesh.position.setY(1);
        this.centerMesh.add(this.topPlane);
        this.scene.add(this.centerMesh);
        //棱
        const geometryCircle = new THREE.CylinderBufferGeometry(0.1, 0.1, 25, 60, 60);
        const materialCircle = new THREE.MeshBasicMaterial({ color: this.edgeColor });
        this.edge = new THREE.Mesh(geometryCircle, materialCircle);
        this.edge.rotateX(Math.PI / 2);
        this.edge.position.setY(1);
        this.edge.position.setX(-2.4);
        this.scene.add(this.edge);
    }
    //绘制角度线
    initLine() {
        //角度线一
        const geometryLine = new THREE.CylinderBufferGeometry(0.1, 0.1, 6);
        const materialLine = new THREE.MeshBasicMaterial({ color: 0xE30000 });
        const angleLine = new THREE.Mesh(geometryLine, materialLine);
        angleLine.position.set(-2, 0, 0);
        angleLine.rotateZ(Math.PI / 2);
        angleLine.visible = false;
        angleLine.name = 'line1';
        this.topPlane.add(angleLine);
        //角度线二
        //const geometryLineTwo = new THREE.CylinderBufferGeometry( 0.1, 0.1, 5 );
        //const materialLineTwo = new THREE.MeshBasicMaterial( {color: 0xE30000} );
        const anglelineTwo = new THREE.Mesh(geometryLine, materialLine);
        anglelineTwo.position.setX(-2);
        anglelineTwo.rotateZ(Math.PI / 2);
        anglelineTwo.visible = false;
        anglelineTwo.name = 'line2';
        /*  anglelineTwo.position.setY(1);
          anglelineTwo.rotateX(Math.PI / 2);
          anglelineTwo.rotateZ(Math.PI /  3);*/
        this.bottomPlane.add(anglelineTwo);
        //扇形
        const arcGeometry = new THREE.CircleBufferGeometry(2, 32, 0, Math.PI / 3);
        const arcMaterial = new THREE.MeshBasicMaterial({ color: 0xE30000, transparent: true, opacity: 0.5, side: DoubleSide });
        const circle = new THREE.Mesh(arcGeometry, arcMaterial);
        circle.position.setX(-2.3);
        circle.position.setY(1);
        circle.visible = false;
        circle.name = 'arcAngle';
        /*        const lineEdge = new THREE.EdgesGeometry(arcGeometry, 90);
                const lineMaterial = new THREE.MeshBasicMaterial( { color: 0xE30000, side: DoubleSide } );
                const lineMesh = new THREE.Mesh(lineEdge, lineMaterial);
                lineMesh.position.setX(-2.4);
                lineMesh.position.setY(1);
        
                this.scene.add(lineMesh);*/
        this.scene.add(circle);
        //直角
        const geometryRightAngleLine = new THREE.CylinderBufferGeometry(0.1, 0.1, 1.1);
        const materialRightAngleLine = new THREE.MeshBasicMaterial({ color: 0xE30000 });
        this.rightAngleLine[0] = new THREE.Mesh(geometryRightAngleLine, materialRightAngleLine);
        this.rightAngleLine[0].position.set(-1.4, 1.5, 0);
        this.scene.add(this.rightAngleLine[0]);
        this.rightAngleLine[0].visible = false;
        const geometryRightAngleLine2 = new THREE.CylinderBufferGeometry(0.1, 0.1, 1);
        const materialRightAngleLine2 = new THREE.MeshBasicMaterial({ color: 0xE30000 });
        this.rightAngleLine[1] = new THREE.Mesh(geometryRightAngleLine2, materialRightAngleLine2);
        this.rightAngleLine[1].rotateZ(Math.PI / 2);
        this.rightAngleLine[1].position.set(-1.8, 2, 0);
        this.scene.add(this.rightAngleLine[1]);
        this.rightAngleLine[1].visible = false;
        /*const curve = new THREE.SplineCurve( [
            new THREE.Vector2( -2.4, 1 ),
            new THREE.Vector2( -5, 5 ),
            new THREE.Vector2( -0.3, 1 )
        ] );

        const points = curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points as any);

        const material = new THREE.LineBasicMaterial( { color : 0xff0000, side: DoubleSide } );

        const splineObject = new THREE.Line( geometry, material );
        splineObject.computeLineDistances();

        this.scene.add(splineObject);*/
        //角度文字
        const textStyle = { font: '20px Arial', fillStyle: '#BD00D4', antialias: true };
        const text = new SpriteText2D('60°', textStyle);
        text.scale.set(0.05, 0.05, 0.05);
        text.position.setX(2.4);
        text.position.setY(2);
        text.name = 'angleTxt';
        circle.add(text);
        ViewController.getInstance().hideLoading();
        //β文字
        const betaTextStyle = { font: 'italic 24px "Times New Roman"', fillStyle: '#000000', antialias: true };
        const betaText = new SpriteText2D('β', betaTextStyle);
        betaText.scale.set(0.05, 0.05, 0.05);
        betaText.position.setX(4);
        betaText.position.setZ(1);
        betaText.position.setY(12);
        betaText.name = 'betaTxt';
        this.topPlane.add(betaText);
        ViewController.getInstance().hideLoading();
        //α文字
        const alphaTextStyle = { font: 'italic 24px "Times New Roman"', fillStyle: '#000000', antialias: true };
        const alphaText = new SpriteText2D('α', alphaTextStyle);
        alphaText.scale.set(0.05, 0.05, 0.05);
        alphaText.position.setX(4);
        alphaText.position.setZ(-1);
        alphaText.position.setY(-10);
        alphaText.name = 'alphaTxt';
        this.bottomPlane.add(alphaText);
        ViewController.getInstance().hideLoading();
        //O文字
        const oTextStyle = { font: 'italic 24px "Times New Roman"', fillStyle: '#000000', antialias: true };
        const oText = new SpriteText2D('O', oTextStyle);
        oText.scale.set(0.05, 0.05, 0.05);
        oText.position.setX(-3);
        oText.position.setZ(-0.3);
        oText.position.setY(2);
        oText.name = 'oTxt';
        oText.visible = false;
        this.bottomPlane.add(oText);
        ViewController.getInstance().hideLoading();
        //A 文字
        const aTextStyle = { font: 'italic 24px "Times New Roman"', fillStyle: '#1500FF', antialias: true };
        const aText = new SpriteText2D('A', aTextStyle);
        aText.scale.set(0.05, 0.05, 0.05);
        aText.position.setX(2.5);
        aText.position.setZ(1);
        aText.position.setY(1.5);
        aText.name = 'aTxt';
        aText.visible = false;
        this.topPlane.add(aText);
        //B 文字
        const bTextStyle = { font: 'italic 24px "Times New Roman"', fillStyle: '#1500FF', antialias: true };
        const bText = new SpriteText2D('B', bTextStyle);
        bText.scale.set(0.05, 0.05, 0.05);
        bText.position.setX(2.5);
        bText.position.setZ(-0.5);
        bText.position.setY(0.5);
        bText.name = 'bTxt';
        bText.visible = false;
        this.bottomPlane.add(bText);
        ViewController.getInstance().hideLoading();
    }
    /**
     * 初始化渲染器
     */
    initWebGLRenderer() {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
        }
        else {
            this.renderer = new THREE.CanvasRenderer();
        }
        //this.renderer = new THREE.WebGLRenderer({antialias:true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor('#FFFFFF', 1);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }
    /**
     * 初始化控制器
     */
    initControl() {
        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否可以缩放
        this.orbit.enableZoom = true;
        //是否自动旋转
        this.orbit.autoRotate = true;
        //设置相机距离原点的最远距离
        this.orbit.minDistance = 1;
        //设置相机距离原点的最远距离
        this.orbit.maxDistance = 4000;
        //是否开启右键拖拽
        this.orbit.enablePan = false;
    }
    /**
     * 初始化光源
     */
    initLight() {
        //this.lights = [new THREE.DirectionalLight( '#FFFFFF', 1 )];
        this.lights = [];
        this.lights.push(new THREE.PointLight(0xffffff, 1, 0));
        this.lights.push(new THREE.PointLight(0xffffff, 1, 0));
        this.lights.push(new THREE.PointLight(0xffffff, 1, 0));
        this.lights.push(new THREE.AmbientLight(0xffffff, 0.5));
        this.lights[0].position.set(0, 200, 0);
        this.lights[1].position.set(100, 200, 100);
        this.lights[2].position.set(-100, -200, -100);
        this.scene.add(this.lights[0]);
        this.scene.add(this.lights[1]);
        this.scene.add(this.lights[2]);
        //this.scene.add(this.lights[3]);
    }
    resize() {
    }
    /** 启用上面动画 **/
    enableTopPlaneAnimation() {
        this.topAnimationEnable = true;
        this.topPlane.geometry.dispose();
        this.topPlane.geometry = new THREE.PlaneBufferGeometry(0.1, 25, 30, 30);
        this.topPlane.position.setY(0);
        //this.topPlane.position.setX(0.5);
    }
    topPlaneAnimation() {
        const width = this.topPlane.geometry.parameters.width;
        const y = this.topPlane.position.y;
        //console.log(y);
        if (Number.parseInt(width) !== 10 && this.topAnimationEnable === true) {
            this.topPlane.geometry.dispose();
            this.topPlane.geometry = new THREE.PlaneBufferGeometry(width + 0.1, 25, 30, 30);
            if (y >= this.topPlanePosition[1]) {
                this.topPlane.position.setY(this.topPlanePosition[1]);
            }
            else {
                this.topPlane.position.setY(y + 0.05);
            }
        }
    }
    /** 启用下面动画 **/
    enableBottomPlaneAnimation() {
        this.bottomAnimationEnable = true;
        this.bottomPlane.geometry.dispose();
        this.bottomPlane.geometry = new THREE.PlaneGeometry(0.1, 25, 30, 30);
        this.bottomPlane.position.setX(2.6);
    }
    bottomPlaneAnimation() {
        const width = this.bottomPlane.geometry.parameters.width;
        const x = this.bottomPlane.position.x;
        if (Number.parseInt(width) !== 10 && this.bottomAnimationEnable === true) {
            this.bottomPlane.geometry.dispose();
            this.bottomPlane.geometry = new THREE.PlaneBufferGeometry(width + 0.1, 25, 30, 30);
            if (x >= this.bottomPlanePosition[0]) {
                this.bottomPlane.position.setX(this.bottomPlanePosition[0]);
            }
            else {
                this.topPlane.position.setX(x + 0.05);
            }
        }
    }
    /** 启动棱柱动画 **/
    enablePrismAnimation() {
        this.edge.geometry.dispose();
        this.edge.geometry = new THREE.CylinderBufferGeometry(0.1, 0.1, 1, 60, 60);
    }
    /** 棱柱动画 **/
    prismAnimation() {
        if (Number.parseInt(this.edge.geometry.parameters.height) !== 25) {
            const height = this.edge.geometry.parameters.height + 0.26;
            this.edge.geometry.dispose();
            this.edge.geometry = new THREE.CylinderBufferGeometry(0.1, 0.1, height, 60, 60);
            return;
        }
        if (window.viewHandler.viewModel.$data.animationIsRunning === true) {
            window.viewHandler.viewModel.$data.animationIsRunning = false;
            //动画结束后显示α和β 两个面上的字
            this.scene.getObjectByName('alphaTxt').visible = true;
            this.scene.getObjectByName('betaTxt').visible = true;
        }
    }
    //启动初始化动画
    enableInitAnimation() {
        //动画启动时隐藏 α和β 两个面上的字
        this.scene.getObjectByName('alphaTxt').visible = false;
        this.scene.getObjectByName('betaTxt').visible = false;
        this.enablePrismAnimation();
        this.enableBottomPlaneAnimation();
        this.enableTopPlaneAnimation();
    }
    //高亮二面角的棱
    hightlightPrismAnimation() {
        //const preColor = this.edge.material.color.getHex();
        this.edge.material.color.set(0xBD10E0);
        setTimeout(() => {
            this.edge.material.color.set(this.edgeColor);
        }, 800);
        //#BD10E0
    }
    changePlaneColor() {
        this.topPlane.material.color.set(0x1B8B72);
        this.bottomPlane.material.color.set(0xFF5D00);
        setTimeout(() => {
            this.topPlane.material.color.set(this.planeColor);
            this.bottomPlane.material.color.set(this.planeColor);
        }, 800);
    }
    //显示角度的线
    showAngleLine() {
        this.scene.getObjectByName('line1').visible = true;
        this.scene.getObjectByName('line2').visible = true;
        this.lineAnimationEnable = true;
        const line1 = this.scene.getObjectByName('line1');
        line1.geometry.dispose();
        line1.geometry = new THREE.CylinderBufferGeometry(0.1, 0.1, 0.5);
        line1.scale.y = 1;
        const line2 = this.scene.getObjectByName('line2');
        line2.geometry.dispose();
        line2.geometry = new THREE.CylinderBufferGeometry(0.1, 0.1, 0.5);
        line2.scale.y = 1;
    }
    /**
     * 隐藏角度线动画
     */
    hideAngleLine() {
        this.lineAnimationEnable = false;
        this.scene.getObjectByName('line1').visible = false;
        this.scene.getObjectByName('line2').visible = false;
        this.scene.getObjectByName('arcAngle').visible = false;
        this.scene.getObjectByName('oTxt').visible = false;
        this.scene.getObjectByName('aTxt').visible = false;
        this.scene.getObjectByName('bTxt').visible = false;
    }
    /**
     * 角度线动画
     */
    lineAnimation() {
        if (this.lineAnimationEnable === false) {
            return;
        }
        const line1 = this.scene.getObjectByName('line1');
        const line2 = this.scene.getObjectByName('line2');
        if (line1.scale.y <= 14) {
            this.scaleY(line1, line1.scale.y + 0.1);
            this.scaleY(line2, line2.scale.y + 0.1);
        }
        else {
            this.scene.getObjectByName('arcAngle').visible = true;
            this.scene.getObjectByName('oTxt').visible = true;
            this.scene.getObjectByName('aTxt').visible = true;
            this.scene.getObjectByName('bTxt').visible = true;
        }
    }
    scaleY(mesh, scale) {
        mesh.scale.y = scale;
        if (!mesh.geometry.boundingBox) {
            mesh.geometry.computeBoundingBox();
        }
        const height = mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y;
        //height is here the native height of the geometry
        //that does not change with scaling.
        //So we need to multiply with scale again
        mesh.position.x = height * scale / 2 - 5.1;
    }
    /** 旋转平面 **/
    rotatePlane(sliderNum, currentNum) {
        const diffAngle = sliderNum * Math.PI / 180;
        const angle = currentNum * Math.PI / 180;
        this.centerMesh.rotateZ(diffAngle);
        //修改角度
        if (currentNum === 90) {
            const arcMesh = this.scene.getObjectByName('arcAngle');
            arcMesh.geometry.dispose();
            arcMesh.geometry = new THREE.CircleBufferGeometry(2, 32, 0, 0);
            this.rightAngleLine[0].visible = true;
            this.rightAngleLine[1].visible = true;
        }
        else {
            const arcMesh = this.scene.getObjectByName('arcAngle');
            arcMesh.geometry.dispose();
            arcMesh.geometry = new THREE.CircleBufferGeometry(2, 32, 0, angle);
            this.rightAngleLine[0].visible = false;
            this.rightAngleLine[1].visible = false;
        }
        const angleTxt = this.scene.getObjectByName('angleTxt');
        angleTxt.text = currentNum + '°';
    }
    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0, 0, 0));
        this.orbit.object.position.set(-20, 20, 0);
        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }
    resetGeomtry() {
        this.topPlane.geometry.dispose();
        this.topPlane.geometry = new THREE.PlaneBufferGeometry(10, 25, 30, 30);
        this.topPlane.position.setY(this.topPlanePosition[1]);
        this.bottomPlane.geometry.dispose();
        this.bottomPlane.geometry = new THREE.PlaneBufferGeometry(10, 25, 30, 30);
        this.bottomPlane.position.setX(this.bottomPlanePosition[0]);
        this.edge.geometry.dispose();
        this.edge.geometry = new THREE.CylinderBufferGeometry(0.1, 0.1, 25, 60, 60);
    }
}
//# sourceMappingURL=Dihedral3DModel.js.map