import {
    Vector3, Scene, TransformNode, Mesh, Color3, LinesMesh, Matrix, MeshBuilder, AbstractMesh, InstancedMesh
} from '@babylonjs/core/Legacy/legacy';
import { AdvancedDynamicTexture, Rectangle, TextBlock } from '@babylonjs/gui';

import { MaterialLab } from '../../../../babylon/util/MaterialLab';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';
import { Vector3Utils } from '../../../../babylon/util/Vector3Utils';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import { Utils } from './Utils';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';

export class SunAngle extends TransformNode {

    earthGroup: TransformNode;
    directPoint: Mesh = null;
    r: number;
    isSelfRotate = false;
    isPubRotate = false;
    alpha = 0;
    angleTip: Mesh = null;
    earthAxis: Mesh = null;
    edgesWidth = 4;
    li: LinesMesh;
    angleText: TextBlock;
    goneButton: Rectangle;
    m: AbstractMesh[]=[];
    constructor(name: string, r: number, advancedTexture: AdvancedDynamicTexture, scene?: Scene, isPure?: boolean) {
        super(name, scene, isPure);
        this.r = r;

        const mat = MaterialLab.CreateLightMaterial(new Color3(1, 0, 0), scene);
        this.directPoint = Mesh.CreateSphere('directPoint', 8, 0.1, scene);
        this.directPoint.material = mat;

        this.angleTip = new Mesh('s');
        this.angleTip.position = new Vector3(0, -0.7, r + 0.7 + 0.3);
        const options = {
            height: 80, width: 80, color: '#ffff00',
            fontSize: '24px', fontFamily: '', fontStyle: ''
        };
        this.angleText = LabelUtils.CreateLabel(advancedTexture, this.angleTip, '90°', options);
        this.earthGroup = new TransformNode('earthGroup');
        this.directPoint.setParent(this.earthGroup);
        this.angleTip.setParent(this.earthGroup);
        this.directPoint.position = new Vector3(0, 0, this.r);
        this.li = this.CreateWarpAndWeft(Color3.Yellow(), this.r + 0.2, 5, scene);
        Utils.SetMeshVisible([this.li], false);
        this.li.setParent(this.earthGroup);
        this.earthGroup.setParent(this);
        scene.registerBeforeRender(() => {
            this.lookAt(Vector3.Zero());
            // this.updateMessage();
        });
        this.setVisible(false);
    }
 
    CreateWarpAndWeft(color: Color3, r: number, l: number, scene: Scene): LinesMesh {
        const s = MaterialLab.CreateLightMaterial(Color3.Yellow(), scene);
        const yaxi = Mesh.CreateCylinder('y', 0.5, 0, 0.2, 16, 1, scene);
        yaxi.material = s;
        const vertices = [];
        const pos1 = FormulasUtils.GetCirclePoint(r, -23.5);
        const pos2 = FormulasUtils.GetCirclePoint(r, 23.5);
        const pos3 = FormulasUtils.GetCirclePoint(r, -66.5);
        const pos4 = FormulasUtils.GetCirclePoint(r, 66.5);
        yaxi.position = new Vector3(0, pos1.y, pos1.x);
        yaxi.rotation.x = -Math.PI / 2;

        const arrow2 = yaxi.createInstance('a');
        arrow2.position = new Vector3(0, pos2.y, pos2.x);

        const arrow3 = yaxi.createInstance('a');
        arrow3.position = new Vector3(0, pos3.y, pos3.x);

        const arrow4 = yaxi.createInstance('a');
        arrow4.position = new Vector3(0, pos4.y, pos4.x);

        const arrow5 = yaxi.createInstance('a');
        arrow5.position = new Vector3(0, -r, 0);

        const arrow6 = yaxi.createInstance('a');
        arrow6.position = new Vector3(0, r, 0);

        const arrow7 = yaxi.createInstance('a');
        arrow7.position = new Vector3(0, 0, r);
        vertices.push([new Vector3(0, r, 0), new Vector3(0, r, l)]);
        vertices.push([new Vector3(0, pos1.y, pos1.x), new Vector3(0, pos1.y, pos1.x + l)]);
        vertices.push([new Vector3(0, pos2.y, pos2.x), new Vector3(0, pos2.y, pos2.x + l)]);
        vertices.push([new Vector3(0, pos3.y, pos3.x), new Vector3(0, pos3.y, pos3.x + l)]);
        vertices.push([new Vector3(0, pos4.y, pos4.x), new Vector3(0, pos4.y, pos4.x + l)]);
        vertices.push([new Vector3(0, -r, 0), new Vector3(0, -r, l)]);
        vertices.push([new Vector3(0, 0, r), new Vector3(0, 0, r + l)]);
        vertices.push([new Vector3(0, 0, r + 0.3), new Vector3(0, -1, r + 0.3)]);
        vertices.push([new Vector3(0, -0.2, r + 0.3), new Vector3(0, -0.2, r + 0.2 + 0.3), new Vector3(0, 0, r + 0.2 + 0.3)]);
        const Lines = MeshBuilder.CreateLineSystem('warpAndWeft', { lines: vertices }, scene);
        Lines.isPickable = false;
        Lines.color = color;
        yaxi.setParent(Lines);
        arrow2.setParent(Lines);
        arrow3.setParent(Lines);
        arrow4.setParent(Lines);
        arrow5.setParent(Lines);
        arrow6.setParent(Lines);
        arrow7.setParent(Lines);
        this.m.push(yaxi, arrow2, arrow3, arrow4, arrow5, arrow6, arrow7);
        return Lines;
    }

    /**
     * 画弧
     * @param origin 
     * @param vector1 
     * @param vector2 
     * @param radius 
     */
    showAngleSector(origin: Vector3, vector1: Vector3, vector2: Vector3, radius: number) {
        radius = radius || 1;
        const cross = Vector3.Cross(vector1, vector2);
        const dotv = Vector3.Dot(vector1, vector2);
        const angle = Math.acos(dotv / (vector1.length() * vector2.length()));
        const points = [];
        const minNb = 20;
        const factor = 2;
        let nbPoints = Math.floor(radius * angle * factor);
        nbPoints = (nbPoints < minNb) ? minNb : nbPoints;

        const firstPoint = ((Vector3.Normalize(vector1)).scale(radius));
        const lastPoint = ((Vector3.Normalize(vector2)).scale(radius));
        let matrix: Matrix;
        const ang = angle / nbPoints;
        let rotated: Vector3;
        for (let i = 0; i < nbPoints; i++) {
            matrix = Matrix.RotationAxis(cross, ang * i);
            rotated = Vector3.TransformCoordinates(firstPoint, matrix);
            points.push(rotated.add(origin));
        }
        points.push(lastPoint.add(origin));
        return points;
    }

    /**
     * 设置可见性
     * @param isv 
     */
    setVisible(isv: boolean): SunAngle {
        Utils.SetMeshVisible([this.li, this.directPoint], isv);
        Utils.SetMeshVisible(this.m, isv);
        this.angleText.isVisible = isv;
        return this;
    }

    /**
     * 设置按钮可见性
     * @param isVisible 
     */
    setButtonVisible(isVisible: boolean): SunAngle {
        this.goneButton.isVisible = isVisible;
        return this;
    }

    /**
     * 设置公转
     * @param active 
     */
    setPubRotate(active: boolean): SunAngle {
        this.isPubRotate = active;
        return this;
    }

    /**
     * 设置自转
     * @param active 
     */
    setSelfRotate(active: boolean): SunAngle {
        this.isSelfRotate = active;
        this.earthAxis.isVisible = active;
        return this;
    }

}

