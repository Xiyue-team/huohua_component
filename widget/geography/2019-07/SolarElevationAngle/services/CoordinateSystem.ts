import { Mesh, StandardMaterial, TransformNode, Scene, Vector3 } from '@babylonjs/core/Legacy/legacy';
import { Utils } from './Utils';
import * as plan from '../sub_static/image/plan.png';

export class System extends TransformNode {
    ground: Mesh;
    constructor(name: string, scene?: Scene, isPure?: boolean) {
        super(name, scene, isPure);
        const GroundMat = Utils.CreateGroundMat(plan, scene);
        this.createCoordinateSystemOne(GroundMat, scene);
    }

    setVisible(isVisible: boolean) {
        this.ground.isVisible = isVisible;
    }

    setPos(pos: Vector3): System {
        this.position = pos;
        return this;
    }
    setParentZ(root: TransformNode): System {
        this.setParent(root);
        return this;
    }
    /** 创建坐标系线条 
     * @param scene 场景
     * @returns 
     */
    createCoordinateSystemOne(GroundMat: StandardMaterial, scene: Scene) {
        this.ground = Mesh.CreateGround('ground', 2, 2, 4, scene);
        this.ground.material = GroundMat;
        this.ground.isPickable = false;
        this.ground.rotation.x = Math.PI / 2;
        this.ground.setParent(this);
    }

}
