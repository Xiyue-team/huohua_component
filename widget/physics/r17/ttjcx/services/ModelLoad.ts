import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import * as THREE from 'three';
import {Scene, Material, DoubleSide} from 'three';
import {ModelAnimationGroup} from '../../../../../src/three/component/ModelAnimationGroup';
import * as mxx from '../sub_static/xkcx.bin';
import * as mx from '../sub_static/xkcx.gltf';

export class ModelLoad extends ThreeBase {
    obj1 = new THREE.Object3D();
    second: any;

    static preload() {
        const modelArray = [
            mxx, mx
        ];
        console.log(modelArray.length);
    }

    constructor() {
        super();
    }

    gemBackMaterial = new THREE.MeshPhysicalMaterial({
        map: null,
        color: '#d9d9d9',
        metalness: 1.0,
        roughness: 0.3,
        opacity: 0.5,
        side: THREE.BackSide,
        transparent: true,
        envMapIntensity: 5,
        premultipliedAlpha: true
        // TODO: Add custom blend mode that modulates background color by this materials color.
    });
    gemFrontMaterial = new THREE.MeshPhysicalMaterial({
        map: null,
        color: '#d9d9d9',
        metalness: 0.2,
        roughness: 0.3,
        opacity: 0.1,
        side: THREE.FrontSide,
        transparent: true,
        envMapIntensity: 5,
        premultipliedAlpha: true
    });

    //加载场景1模型
    async initScene1() {
        const model1: any = await this.gltfLoader(mx as any);
        model1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                console.log(child);
                let mo = child.children[0].children[9];
                (mo as any).material = this.gemBackMaterial;
                this.second = mo.clone();
                (this.second as any).material = this.gemFrontMaterial;
                child.children[0].children[2].position.set(30, 0, 0);
                child.children[0].children[6].position.set(30, 0, 0);
                child.children[0].children[4].position.set(-30, 0, 0);
                child.children[0].children[0].position.set(-30, 0, 0);
                this.obj1.add(child);
            }
        });
    }

}