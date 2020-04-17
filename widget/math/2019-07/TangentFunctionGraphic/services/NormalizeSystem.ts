import * as GUI from '@babylonjs/gui';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';
import {Color3, Color4, Mesh, MeshBuilder, Scene, StandardMaterial, TransformNode, Vector3} from '@babylonjs/core/Legacy/legacy';

export class NormalizeSystem {

    /** 创建坐标系线条
     * @param color 颜色
     * @param edgesWidth 边宽
     * @param scene 场景
     * @returns
     */
    static CreateNormalizeSystem3(color: string, edgesWidth: number, scene: Scene): TransformNode {
        const root: TransformNode = new TransformNode('root');
        const z = 0;
        const step = 1;
        const color3 = Color3.FromHexString(color);
        const stepLength = 2;
        const points: Array<Array<Vector3>> = [];
        const pointsX = [], pointsY = [];
        for (let i = 0; i < step * 2 + 1; i++) {
            pointsX.push(new Vector3((i - step) * stepLength, 0, z));
            pointsY.push(new Vector3(0, (i - step) * stepLength, z));
        }

        points.push(
            [
                pointsX[0].add(new Vector3(-2, 0, 0)),
                pointsX[pointsX.length - 1].add(new Vector3(2, 0, 0))
            ],
            [
                pointsY[0].add(new Vector3(0, -2, 0)),
                pointsY[pointsY.length - 1].add(new Vector3(0, 2, 0))
            ]);

        const liX = MeshBuilder.CreateLines('li', { points: points[0], updatable: true }, scene);
        const liY = MeshBuilder.CreateLines('li', { points: points[1], updatable: true }, scene);
        liX.color = liY.color = color3;

        liX.enableEdgesRendering();
        liY.enableEdgesRendering();
        liX.setParent(root);
        liY.setParent(root);
        liX.edgesColor = liY.edgesColor = new Color4(color3.r, color3.g, color3.b, 1);
        liX.edgesWidth = liY.edgesWidth = edgesWidth;

        const mat = new StandardMaterial('', scene);
        mat.specularColor = new Color3(0, 0, 0);
        mat.diffuseColor = color3;
        mat.emissiveColor = color3;
        return root;
    }

    /** 创建坐标系线条
     * @param color 颜色
     * @param labelcolor
     * @param fontSize 字号
     * @param edgesWidth 边宽
     * @param advancedTexture GUI载体
     * @param scene 场景
     * @param fontFamily
     * @param fontStyle
     * @returns
     */
    static CreateNormalizeSystem5(color: string, labelcolor: string, edgesWidth: number,
        advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene, 
        fontSize: string | number, fontFamily: string, fontStyle: string, 
        ): TransformNode {
        const root: TransformNode = new TransformNode('root');
        const z = 0;
        const step = 1;
        const color3: Color3 = Color3.FromHexString(color);
        const stepLength = 5;
        const points: Array<Array<Vector3>> = [];
        const pointsX = [], pointsY = [];


        for (let i = 0; i < step * 2 + 1; i++) {
            pointsX.push(new Vector3((i - step) * stepLength, 0, z));
            pointsY.push(new Vector3(0, (i - step) * stepLength, z));
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
        O.position = new Vector3(0, 0.1, 0);
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
        liX.edgesColor = liY.edgesColor = new Color4(color3.r, color3.g, color3.b, 1);
        liX.edgesWidth = liY.edgesWidth = edgesWidth;

        const mat = new StandardMaterial('', scene);
        mat.specularColor = new Color3(0, 0, 0);
        mat.diffuseColor = color3;
        mat.emissiveColor = color3;
        const yaxi = Mesh.CreateCylinder('y', 0.3, 0, 0.3, 4, 1, scene);
        const xaxi = yaxi.clone('x');
        yaxi.setParent(root);
        xaxi.setParent(root);
        xaxi.rotation = new Vector3(0, 0, -Math.PI / 2);
        xaxi.position = points[0][1];
        xaxi.material = yaxi.material = mat;
        yaxi.position = points[1][1];
        return root;
    }
}
