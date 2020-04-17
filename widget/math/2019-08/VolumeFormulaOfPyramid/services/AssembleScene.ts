import Vue from 'vue';
import {
    Vector3, HemisphericLight, DirectionalLight, Mesh, Scene,
    AbstractMesh, Engine, ArcRotateCamera, SceneLoader, Camera, Quaternion
} from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders';
import * as GUI from '@babylonjs/gui';
import { ViewModel } from '../ViewModel';
import { Base3DScene } from '../../../../babylon/template/Base3DScene';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import * as box from '../sub_static/pyramid.glb';

import * as s from '../sub_static/s.png';
import * as s1 from '../sub_static/s1.png';
import * as s2 from '../sub_static/s2.png';
import * as s3 from '../sub_static/s3.png';
import { GLTFFileLoader } from '@babylonjs/loaders';
/**
 *初始化3d场景类
 *@since 2.0
 *@author apen
 *@Date 2019/5/14 10:10
 */
export class AssembleScene extends Base3DScene {
    viewModel: ViewModel;
    distance = 0; //相机距离
    advancedTexture: GUI.AdvancedDynamicTexture;
    camera: ArcRotateCamera;

    //长方形
    box: AbstractMesh;
    boxMeshA: Mesh;
    boxA: GUI.TextBlock;
    boxMeshB: Mesh;
    boxB: GUI.TextBlock;
    boxMeshC: Mesh;
    boxC: GUI.TextBlock;
    boxS: GUI.Image;
    //四棱锥1
    pyramid1: AbstractMesh;
    pyramidm1: AbstractMesh;
    pyramid1MeshA: Mesh;
    pyramid1A: GUI.TextBlock;
    pyramid1MeshB: Mesh;
    pyramid1B: GUI.TextBlock;
    pyramid1MeshC: Mesh;
    pyramid1C: GUI.TextBlock;
    pyramid1S: GUI.Image;
    pyramidf1: AbstractMesh;
    pyramidb1: AbstractMesh;
    //四棱锥2
    pyramid2: AbstractMesh;
    pyramidm2: AbstractMesh;
    pyramid2MeshA: Mesh;
    pyramid2A: GUI.TextBlock;
    pyramid2MeshB: Mesh;
    pyramid2B: GUI.TextBlock;
    pyramid2MeshC: Mesh;
    pyramid2C: GUI.TextBlock;
    pyramid2S: GUI.Image;
    pyramidf2: AbstractMesh;
    pyramidb2: AbstractMesh;
    //四棱锥3
    pyramid3: AbstractMesh;
    pyramidm3: AbstractMesh;
    pyramid3MeshA: Mesh;
    pyramid3A: GUI.TextBlock;
    pyramid3MeshB: Mesh;
    pyramid3B: GUI.TextBlock;
    pyramid3MeshC: Mesh;
    pyramid3C: GUI.TextBlock;
    pyramid3S: GUI.Image;
    pyramidf3: AbstractMesh;
    pyramidb3: AbstractMesh;

    pyramid1MeshS: AbstractMesh;
    pyramid2MeshS: AbstractMesh;
    pyramid3MeshS: AbstractMesh;
    orthoX: number;
    orthoY: number;
    constructor(vm: Vue) {
        super();
        this.viewModel = vm as ViewModel;
        this.init();
    }

    /**
     * 创建灯光阴影
     * @param scene 
     */
    createLight(scene: Scene) {
        const HemisphericLight1 = new HemisphericLight('HLight', new Vector3(0, 1, 0), scene);
        HemisphericLight1.intensity = 1;
        const dLight = new DirectionalLight('DLight', new Vector3(0, 0.6, 0.4), scene);
        dLight.intensity = 0.8;
        new DirectionalLight('DiLight', new Vector3(0, -0.6, -0.4), scene);
        new DirectionalLight('DiLight', new Vector3(10, 0.6, -0.4), scene);
    }

    initMesh() {
        this.box = new Mesh('boxMeshA');
        this.pyramid1 = new Mesh('boxMeshB');
        this.pyramid2 = new Mesh('boxMeshC');
        this.pyramid3 = new Mesh('boxMeshC');

        this.boxMeshA = new Mesh('boxMeshA');
        this.boxMeshB = new Mesh('boxMeshB');
        this.boxMeshC = new Mesh('boxMeshC');
        this.pyramid1MeshA = new Mesh('pyramid1MeshA');
        this.pyramid1MeshB = new Mesh('pyramid1MeshB');
        this.pyramid1MeshC = new Mesh('pyramid1MeshC');

        this.pyramid2MeshA = new Mesh('pyramid2MeshA');
        this.pyramid2MeshB = new Mesh('pyramid2MeshB');
        this.pyramid2MeshC = new Mesh('pyramid2MeshC');

        this.pyramid3MeshA = new Mesh('pyramid3MeshA');
        this.pyramid3MeshB = new Mesh('pyramid3MeshB');
        this.pyramid3MeshC = new Mesh('pyramid3MeshC');

        this.pyramid1MeshS = new Mesh('pyramid1MeshS');
        this.pyramid2MeshS = new Mesh('pyramid2MeshS');
        this.pyramid3MeshS = new Mesh('pyramid3MeshS');

        this.boxMeshA.position = new Vector3(0, -3, -4);
        this.pyramid1MeshA.position = new Vector3(0, 3, 4);
        this.pyramid2MeshA.position = new Vector3(0, 3, -4);
        this.pyramid3MeshA.position = new Vector3(0, -3, 4);

        this.boxMeshB.position = new Vector3(5, 0, -4);
        this.pyramid1MeshB.position = new Vector3(5, 0, 4);
        this.pyramid2MeshB.position = new Vector3(-5, 0, -4);
        this.pyramid3MeshB.position = new Vector3(-5, 0, 4);

        this.boxMeshC.position = new Vector3(5, -3, 0);
        this.pyramid1MeshC.position = new Vector3(5, 3, 0);
        this.pyramid2MeshC.position = new Vector3(-5, 3, 0);
        this.pyramid3MeshC.position = new Vector3(-5, -3, 0);

        this.pyramid1MeshS.position = new Vector3(2.5, 0, 2);
        this.pyramid2MeshS.position = new Vector3(-2.5, 0, -2);
        this.pyramid3MeshS.position = new Vector3(-2.5, 0, 2);
    }

    setMeshParent() {
        this.boxMeshA.setParent(this.box);
        this.boxMeshB.setParent(this.box);
        this.boxMeshC.setParent(this.box);

        this.pyramid1MeshA.setParent(this.pyramid1);
        this.pyramid1MeshB.setParent(this.pyramid1);
        this.pyramid1MeshC.setParent(this.pyramid1);

        this.pyramid2MeshA.setParent(this.pyramid2);
        this.pyramid2MeshB.setParent(this.pyramid2);
        this.pyramid2MeshC.setParent(this.pyramid2);

        this.pyramid3MeshA.setParent(this.pyramid3);
        this.pyramid3MeshB.setParent(this.pyramid3);
        this.pyramid3MeshC.setParent(this.pyramid3);

        this.pyramid1MeshS.setParent(this.pyramid1);
        this.pyramid2MeshS.setParent(this.pyramid2);
        this.pyramid3MeshS.setParent(this.pyramid3);
    }

    initGUI(advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene) {
        const options = {
            height: 40, width: 40, color: '#FFFFFF',
            fontSize: '36px', fontFamily: 'Times New Roman', fontStyle: 'italic'
        };

        const ImageOptions = { height: '40px', width: '40px', color: '#FFFFFF' };
        if (this.isMob && !(window as any)['env'].browserInfo.isSmallDevice) {
            ImageOptions.height = ImageOptions.width = '80px';
            options.width = options.height = 80;
            options.fontSize = '72px';
        }

        this.boxA = LabelUtils.CreateLabel(advancedTexture, this.boxMeshA, 'a', options);
        this.boxB = LabelUtils.CreateLabel(advancedTexture, this.boxMeshB, 'b', options);
        this.boxC = LabelUtils.CreateLabel(advancedTexture, this.boxMeshC, 'c', options);

        this.pyramid1A = LabelUtils.CreateLabel(advancedTexture, this.pyramid1MeshA, 'a', options);
        this.pyramid1B = LabelUtils.CreateLabel(advancedTexture, this.pyramid1MeshB, 'b', options);
        this.pyramid1C = LabelUtils.CreateLabel(advancedTexture, this.pyramid1MeshC, 'c', options);

        this.pyramid2A = LabelUtils.CreateLabel(advancedTexture, this.pyramid2MeshA, 'a', options);
        this.pyramid2B = LabelUtils.CreateLabel(advancedTexture, this.pyramid2MeshB, 'b', options);
        this.pyramid2C = LabelUtils.CreateLabel(advancedTexture, this.pyramid2MeshC, 'c', options);

        this.pyramid3A = LabelUtils.CreateLabel(advancedTexture, this.pyramid3MeshA, 'a', options);
        this.pyramid3B = LabelUtils.CreateLabel(advancedTexture, this.pyramid3MeshB, 'b', options);
        this.pyramid3C = LabelUtils.CreateLabel(advancedTexture, this.pyramid3MeshC, 'c', options);
        this.boxS = LabelUtils.CreateImageLabel(advancedTexture, this.box, `${s}`, ImageOptions);
        this.pyramid1S = LabelUtils.CreateImageLabel(advancedTexture, this.pyramid1MeshS, `${s1}`, ImageOptions);
        this.pyramid2S = LabelUtils.CreateImageLabel(advancedTexture, this.pyramid2MeshS, `${s2}`, ImageOptions);
        this.pyramid3S = LabelUtils.CreateImageLabel(advancedTexture, this.pyramid3MeshS, `${s3}`, ImageOptions);
    }

    /** 
     * 创建场景
     */
    createScene(engine: Engine): Scene {
        const scene = new Scene(engine);
        scene.clearColor.set(0.2, 0.2, 0.2, 1);
        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.camera = this.createArcRotateCamera(scene);
        this.camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        this.initMesh();
        this.createLight(scene);
        GLTFFileLoader.HomogeneousCoordinates = false;
        SceneLoader.ImportMesh('', box.replace('pyramid.glb', ''), `pyramid.glb`, scene,
            (meshes) => { this.importMeshSuccess(meshes, scene); });
        return scene;
    }

    changeCamera(orthoY: number) {
        this.orthoY = orthoY;
        this.camera.orthoTop = this.orthoY;
        this.camera.orthoBottom = -this.orthoY;
        this.orthoX = this.orthoY * this.Container.clientWidth / this.Container.clientHeight;
        this.camera.orthoLeft = -this.orthoX;
        this.camera.orthoRight = this.orthoX;
    }
    /**
     * 创建相机
     * @param scene 
     */
    createArcRotateCamera(scene: Scene): ArcRotateCamera {
        const camera = new ArcRotateCamera('Camera', 0, 0, 10, new Vector3(0, 0, 0), scene);
        camera.minZ = 0.01;
        camera.lowerRadiusLimit = 25;
        camera.upperRadiusLimit = 60;
        scene.activeCameras.push(camera);
        return camera;
    }

    importMeshSuccess(meshes: AbstractMesh[], scene: Scene) {
        for (let i = 0; i < meshes.length; i++) {
            meshes[i].isVisible = true;
            if (meshes[i].name === 'boxf' || meshes[i].name === 'boxb') {
                meshes[i].setParent(this.box);
            } else if (meshes[i].name === 'pyramidb1') {
                this.pyramidb1 = meshes[i];
                this.pyramidb1.setParent(this.pyramid1);
            } else if (meshes[i].name === 'pyramidb2') {
                this.pyramidb2 = meshes[i];
                this.pyramidb2.setParent(this.pyramid2);
            } else if (meshes[i].name === 'pyramidb3') {
                this.pyramidb3 = meshes[i];
                this.pyramidb3.setParent(this.pyramid3);
            } else if (meshes[i].name === 'pyramidf1') {
                this.pyramidf1 = meshes[i];
                this.pyramidf1.setParent(this.pyramid1);
            } else if (meshes[i].name === 'pyramidf2') {
                this.pyramidf2 = meshes[i];
                this.pyramidf2.setParent(this.pyramid2);
            } else if (meshes[i].name === 'pyramidf3') {
                this.pyramidf3 = meshes[i];
                this.pyramidf3.setParent(this.pyramid3);
            } else if (meshes[i].name === 'pyramid1') {
                this.pyramidm1 = meshes[i];
                this.pyramidm1.material.backFaceCulling = false;
                this.pyramidm1.setParent(this.pyramid1);
            } else if (meshes[i].name === 'pyramid2') {
                this.pyramidm2 = meshes[i];
                this.pyramidm2.setParent(this.pyramid2);
            } else if (meshes[i].name === 'pyramid3') {
                this.pyramidm3 = meshes[i];
                this.pyramidm3.setParent(this.pyramid3);
            }
            meshes[i].scaling = Vector3.One();
            meshes[i].rotationQuaternion = new Quaternion(0, 1, 0, 0);
        }

        this.setMeshParent();
        this.initGUI(this.advancedTexture, scene);
        this.reset();
        scene.registerBeforeRender(() => {
            const dis = Vector3.Distance(this.camera.position, Vector3.Zero());
            if (Math.abs(dis - this.distance) > 0.1) {
                this.distance = dis;
                this.changeCamera(dis * 0.3);
            }
        });
    }

    /**
     * 切换按钮
     */
    updateItemValue(isShow: boolean): void {
        this.setGUIVisible([this.boxA, this.boxB, this.boxC, this.boxS], isShow);

        if (this.viewModel.slidervalue1 !== 0) {
            this.setGUIVisible([this.pyramid1A, this.pyramid1B, this.pyramid1C, this.pyramid1S], isShow);
        } else {
            this.setGUIVisible([this.pyramid1A, this.pyramid1B, this.pyramid1C, this.pyramid1S], false);
        }

        if (this.viewModel.slidervalue2 !== 0) {
            this.setGUIVisible([this.pyramid2A, this.pyramid2B, this.pyramid2C, this.pyramid2S], isShow);
        } else {
            this.setGUIVisible([this.pyramid2A, this.pyramid2B, this.pyramid2C, this.pyramid2S], false);
        }

        if (this.viewModel.slidervalue3 !== 0) {
            this.setGUIVisible([this.pyramid3A, this.pyramid3B, this.pyramid3C, this.pyramid3S], isShow);
        } else {
            this.setGUIVisible([this.pyramid3A, this.pyramid3B, this.pyramid3C, this.pyramid3S], false);
        }
    }

    formatter(index: number, e: number) {
        if (index === 1) {
            this.setMeshVisible([this.pyramidf1, this.pyramidb1], e === 0 ? false : true);
            this.pyramid1.position.x = e;
        } else if (index === 2) {
            this.setMeshVisible([this.pyramidf2, this.pyramidb2], e === 0 ? false : true);
            this.pyramid2.position.z = -e;
        } else if (index === 3) {
            this.setMeshVisible([this.pyramidf3, this.pyramidb3], e === 0 ? false : true);
            this.pyramid3.position.x = -e;
        } else if (index === 0) {
            this.setMeshVisible([this.pyramidf1, this.pyramidf2, this.pyramidf3, this.pyramidb1, this.pyramidb2, this.pyramidb3], false);
        }
        this.updateItemValue(this.viewModel.buttonActived);
    }
    /**
     * 重置按钮按下
     */
    reset(): void {
        this.camera.detachControl(this.canvas);
        this.formatter(0, 0);
        this.pyramid1.position.x = 0;
        this.pyramid2.position.z = 0;
        this.pyramid3.position.x = 0;
        this.camera.position = new Vector3(-10, 25, -20);
        this.camera.setTarget(Vector3.Zero());
        this.camera.attachControl(this.canvas, true);
        this.distance = Vector3.Distance(this.camera.position, Vector3.Zero());
        this.changeCamera(this.distance * 0.3);
    }
}
