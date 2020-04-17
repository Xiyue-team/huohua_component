/**
 *工具类
 *@since 2.0
 *@author apen
 *@Date 2019/5/30 10:10
 */
import { MeshBuilder, LinesMesh, Vector3, Color3, Color4, Scene } from '@babylonjs/core/Legacy/legacy';
import { FormulasUtils } from '../../../../babylon/Math/FormulasUtils';

export class Utils   {

    static CreateUpdateCircle(r: number, value: number,
        color: Color3, edgesWidth: number, lines: LinesMesh,
        scene: Scene, layerMask?: number): LinesMesh {
        const vertices = this.GetArcUpdateVertices(r, 0, value);
        lines = MeshBuilder.CreateLines('lines', { points: vertices, updatable: true, instance: lines }, scene);
        lines.color = color;
        lines.enableEdgesRendering();
        lines.edgesColor = Color4.FromColor3(color, 1);
        lines.edgesWidth = edgesWidth;
        if (layerMask) {
            lines.layerMask = layerMask;
        }
        return lines;
    }

    static GetArcUpdateVertices(r: number, Startvalue: number, Endvalue: number): Vector3[] {
        const vertices = [];
        const step = Endvalue - Startvalue;
        for (let i = 0; i < 540; i++) {
            vertices.push(FormulasUtils.GetCirclePoint(r + i / 540 * Math.abs(step) / 180, Startvalue + i / 540 * step));
        }
        vertices.push(FormulasUtils.GetCirclePoint(r + Math.abs(step) / 180, Startvalue + step));
        return vertices;
    }

   
}
