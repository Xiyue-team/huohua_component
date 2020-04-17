import {
    Vector3, Scene, TransformNode, Mesh, Color3, InstancedMesh, Ray
} from '@babylonjs/core/Legacy/legacy';
import { AdvancedDynamicTexture, Rectangle } from '@babylonjs/gui';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { Utils } from './Utils';
import { AssembleScene } from './AssembleScene';

export class Timer extends TransformNode {
    isMob: any = /iPad|iPhone|Android/g.test(navigator.userAgent);
    timer0: Rectangle;
    timer6: Rectangle;
    timer12: Rectangle;
    timer18: Rectangle;

    timer0Node: Mesh;
    timer6Node: InstancedMesh;
    timer12Node: InstancedMesh;
    timer18Node: InstancedMesh;
    r: number;
    labelVisible = false;

    constructor(name: string, r: number, advancedTexture: AdvancedDynamicTexture,
        scene?: Scene, isPure?: boolean) {
        super(name, scene, isPure);
        this.r = r;
        const mat = MaterialLab.CreateLightMaterial(new Color3(1, 0, 0), scene);
        this.timer0Node = Mesh.CreateSphere('timer0Node', 8, 0.4, scene);
        this.timer0Node.material = mat;
        this.timer6Node = this.timer0Node.createInstance('timer6Node');
        this.timer12Node = this.timer0Node.createInstance('timer12Node');
        this.timer18Node = this.timer0Node.createInstance('timer18Node');
        this.timer0Node.setParent(this);
        this.timer6Node.setParent(this);
        this.timer12Node.setParent(this);
        this.timer18Node.setParent(this);
        this.timer0Node.isPickable = this.timer6Node.isPickable = this.timer12Node.isPickable = this.timer18Node.isPickable = false;
        this.timer0Node.position = new Vector3(0, 0, -this.r);
        this.timer6Node.position = new Vector3(this.r, 0, 0);
        this.timer12Node.position = new Vector3(0, 0, this.r);
        this.timer18Node.position = new Vector3(-this.r, 0, 0);
        const options = { height: 30, width: 70, color: '#353535', fontSize: '18px', fontFamily: '', fontStyle: '' };
        this.timer0 = Utils.CreateTimerLabel(advancedTexture, this.timer0Node, '0:00', options);
        this.timer6 = Utils.CreateTimerLabel(advancedTexture, this.timer6Node, '6:00', options);
        this.timer12 = Utils.CreateTimerLabel(advancedTexture, this.timer12Node, '12:00', options);
        this.timer18 = Utils.CreateTimerLabel(advancedTexture, this.timer18Node, '18:00', options);
        scene.registerBeforeRender(() => {
            if (!AssembleScene.instance.viewModel.isPuclicRotate && this.labelVisible) {
                this.setVisible(this.timer0Node, this.timer0);
                this.setVisible(this.timer6Node, this.timer6);
                this.setVisible(this.timer12Node, this.timer12);
                this.setVisible(this.timer18Node, this.timer18);
            }
            this.lookAt(Vector3.Zero());
        });
        this.setLabelVisible(false);
    }

    /**
     * 设置标签可见
     * @param look 
     * @param re 
     */
    setVisible(look: TransformNode, re: Rectangle) {
        re.isVisible = this.rayCast(look.getAbsolutePosition()) === null;
    }

    /**
     * 投影
     */
    rayCast(vec: Vector3): Vector3 {
        const cameraPos = AssembleScene.instance.travelCamera.position.clone();
        const direction = Vector3.Normalize(cameraPos.subtract(vec));
        const length = 200;
        const ray = new Ray(vec, direction, length);
        const hit = this._scene.pickWithRay(ray);
        if (hit.pickedMesh) {
            if (vec.clone().subtract(cameraPos).length() > vec.clone().subtract(hit.pickedPoint).length()) {
                return vec;
            }
            return null;
        }
        return null;
    }

    /**
     * 整体设置标签可见
     * @param isV 
     */
    setLabelVisible(isV: boolean) {
        this.labelVisible = isV;
        Utils.SetGUIVisible([this.timer0, this.timer6, this.timer12, this.timer18], isV);
        Utils.SetMeshVisible([this.timer0Node, this.timer6Node, this.timer12Node, this.timer18Node], isV);
    }
}
