import {Vector3, Scene, Mesh, Node, Color3 } from '@babylonjs/core/Legacy/legacy';
import { Image, AdvancedDynamicTexture } from '@babylonjs/gui';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';


export class Dot extends Mesh {
    private Arrow: Mesh; //向量箭头
    private goAngle: Vector3;
    private advancedTexture: AdvancedDynamicTexture;
    private texture: string;
    private label: Image;
    private curreentPos: Vector3;

    constructor(name: string, texture: string, advancedTexture: AdvancedDynamicTexture, scene: Scene,
        parent?: Node, source?: Mesh, doNotCloneChildren?: boolean, clonePhysicsImpostor?: boolean) {
        super(name, scene, parent, source, doNotCloneChildren, clonePhysicsImpostor);
        this.Arrow = new Mesh('arrow');
        this.advancedTexture = advancedTexture;
        this.texture = texture;
    }

    initValue(color: Color3, goPos: Vector3): Dot {
        this.curreentPos = new Vector3(goPos.x, 5, 0);
        this.isVisible = false;
        const Options = { height: '24px', width: '24px', color: '#FFFFFF' };
        this.label = LabelUtils.CreateImageLabel(this.advancedTexture, this.Arrow, this.texture, Options);
        this.label.isVisible = false;
        this.goAngle = goPos;
        this.setArrowPos(new Vector3(goPos.x, 5, 0));
        this.position = new Vector3(goPos.x, 5, 0);
        return this;
    }

    setLabelVisible(isV: boolean) {
        this.label.isVisible = isV;
    }

    updateArrow(length: number) {
        const pos = new Vector3(this.position.clone().x, this.position.clone().y - length, 0);
        if (pos.y - this.goAngle.y > 0.01) {
            this.Arrow.position = pos;
        } else {
            this.Arrow.position = this.goAngle;
        }
    }

    setArrowPos(arrowPos: Vector3): Dot {
        this.Arrow.position = arrowPos;
        return this;
    }

    reset() {
        this.setLabelVisible(false);
        this.setArrowPos(this.curreentPos.clone());
    }
}
