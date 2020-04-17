import { TransformNode, Scene, Vector3, Color3, StandardMaterial, Mesh } from '@babylonjs/core/Legacy/legacy';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { MaterialLab } from '../../../../babylon/util/MaterialLab';
/**
 *笑脸类
 *@since 2.0
 *@author apen
 *@Date 2019/6/19 21:10
 */

export class Face extends TransformNode {
    mat: StandardMaterial;
    lines: Mesh[] = [];
    constructor(name: string, scene: Scene) {
        super(name, scene);

    }

    /**
     * 创建笑脸
     * @param price 
     * @param position 
     */
    createLine(color: Color3, edgesWidth: number): Face {
        this.mat = MaterialLab.CreateLightMaterial(color, this._scene);
        const angline = Mesh.CreateDisc('s', 1, 360);
        angline.material = this.mat;
        angline.position = new Vector3(-2, 1, 0);
        angline.setParent(this);
        const angline2 = angline.clone('2', this);
        angline2.position = new Vector3(2, 1, 0);

        const v = FormulasUtils.GetCircleVertices(5, 360);
        const li = LinesBuild.CreateLines(v, color, edgesWidth, this._scene);
        li.setParent(this);

        const v3 = FormulasUtils.GetArcUpdateVertices(3, 180, 360);
        const li3 = LinesBuild.CreateLines(v3, color, edgesWidth, this._scene);
        li3.setParent(this);
        li3.position = new Vector3(0, -1.2, 0);
        this.lines.push(li, angline, angline2, li3);
        return this;
    }

    setMeshVisible(v: boolean) {
        for (let i = 0; i < this.lines.length; i++) {
            this.lines[i].isVisible = v;
        }
    }

}
