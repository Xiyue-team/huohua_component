import {
    Vector3, Color3, Color4, TransformNode, Mesh, LinesMesh, MeshBuilder, StandardMaterial, Scene
} from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';

export class CoordinateSystem {

    /** 创建坐标系线条
     * @param color 颜色
     * @param labelcolor
     * @param fontSize 字号
     * @param edgesWidth 边宽
     * @param advancedTexture GUI载体
     * @param scene 场景
     * @param fontFamily
     * @param fontStyle
     * @param hasNumber
     * @param layerMask 层遮罩
     * @returns
     */
    static CreateNormalizeSystem(color: string, labelcolor: string, edgesWidth: number,
        advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene,
        fontSize: string | number, fontFamily: string, fontStyle: string,
        hasNumber: boolean = true, layerMask?: number): TransformNode {
        const root: TransformNode = new TransformNode('root');
        const z = 0;
        const step = 1;
        const color3: Color3 = Color3.FromHexString(color);
        const stepLength = 10;
        const points: Array<Array<Vector3>> = [];
        const pointsX = [], pointsY = [];
        const options = {
            height: '20px',
            width: '40px',
            color: labelcolor,
            fontSize: fontSize,
            fontFamily: '',
            fontStyle: ''
        };
        for (let i = 0; i < step * 2 + 1; i++) {
            pointsX.push(new Vector3((i - step) * stepLength, 0, z));
            pointsY.push(new Vector3(0, (i - step) * stepLength, z));
        }
        if (hasNumber) {
            const liXno = [], liYno: LinesMesh[] = [];
            for (let p = 0; p < pointsX.length; p++) {
                if (pointsX[p].x !== 0) {
                    liXno[p] = MeshBuilder.CreateLines('no',
                        { points: [pointsX[p], pointsX[p].add(new Vector3(0, 0.4, 0))] }, scene);

                    liYno[p] = MeshBuilder.CreateLines('no',
                        { points: [pointsY[p], pointsY[p].add(new Vector3(0.4, 0, 0))] }, scene);
                    liXno[p].color = liYno[p].color = color3;

                    LabelUtils.CreateLabelWithOffsetCenter(advancedTexture, liXno[p], (pointsX[p].x / stepLength) + '',
                        20 * (pointsY[p].y / stepLength) + 'px', '20px', options);
                    LabelUtils.CreateLabelWithOffsetCenter(advancedTexture, liYno[p], (pointsY[p].y / stepLength) + '',
                        '-20px', -20 * (pointsY[p].y / stepLength) + 'px', options);

                    liXno[p].enableEdgesRendering();
                    liYno[p].enableEdgesRendering();
                    liXno[p].setParent(root);
                    liYno[p].setParent(root);
                    liXno[p].edgesColor = liYno[p].edgesColor = Color4.FromColor3(color3, 1);
                    liXno[p].edgesWidth = liYno[p].edgesWidth = edgesWidth;
                    if (layerMask) {
                        liXno[p].layerMask = liYno[p].layerMask = layerMask;
                    }
                }
            }
        }
        const options2 = {
            height: '20px',
            width: '80px',
            color: labelcolor,
            fontSize: fontSize,
            fontFamily: fontFamily,
            fontStyle: fontStyle
        };
        const O = new Mesh('O');
        O.position = new Vector3(0, 0, 0);
        LabelUtils.CreateLabelWithOffset(advancedTexture, O, 'O', 15, 20, options2);
        O.setParent(root);

        points.push(
            [
                pointsX[0].add(new Vector3(-2, 0, 0)),
                pointsX[pointsX.length - 1].add(new Vector3(2, 0, 0))
            ],
            [
                pointsY[0].add(new Vector3(0, -2, 0)),
                pointsY[pointsY.length - 1].add(new Vector3(0, 2, 0))
            ]);
        const options3 = {
            height: 20,
            width: 20,
            color: color,
            fontSize: fontSize,
            fontFamily: fontFamily,
            fontStyle: fontStyle
        };
        const X = new Mesh('X');
        X.position = points[0][1].add(new Vector3(0, -0.6, 0));
        LabelUtils.CreateLabel(advancedTexture, X, 'x', options3);
        X.setParent(root);
        const Y = new Mesh('Y');
        Y.position = points[1][1].add(new Vector3(-0.6, 0, 0));
        LabelUtils.CreateLabel(advancedTexture, Y, 'y', options3);
        Y.setParent(root);
        const liX = MeshBuilder.CreateLines('li', { points: points[0], updatable: true }, scene);
        const liY = MeshBuilder.CreateLines('li', { points: points[1], updatable: true }, scene);
        liX.color = liY.color = color3;

        liX.enableEdgesRendering();
        liY.enableEdgesRendering();
        liX.setParent(root);
        liY.setParent(root);
        liX.edgesColor = liY.edgesColor = Color4.FromColor3(color3, 1);
        liX.edgesWidth = liY.edgesWidth = edgesWidth;

        const mat = new StandardMaterial('', scene);
        mat.specularColor = new Color3(0, 0, 0);
        mat.diffuseColor = color3;
        mat.emissiveColor = color3;
        const yaxi = Mesh.CreateCylinder('y', 0.5, 0, 0.5, 4, 1, scene);
        const xaxi = yaxi.clone('x');
        yaxi.setParent(root);
        xaxi.setParent(root);
        xaxi.rotation = new Vector3(0, 0, -Math.PI / 2);
        xaxi.position = points[0][1];
        xaxi.material = yaxi.material = mat;
        yaxi.position = points[1][1];
        if (layerMask) {
            xaxi.layerMask = yaxi.layerMask = liX.layerMask = liY.layerMask = O.layerMask = layerMask;
        }
        return root;
    }

}
