import { MeshBuilder, LinesMesh, Color4, Color3, Scene } from '@babylonjs/core/Legacy/legacy';
import { FormulasUtils } from './FormulasUtils';

export class FormulaLineUtils {
    static GetDivideUpdateLine(startX: number, endX: number, w: number, a: number, color: Color3, edgesWidth: number,
        Lines: LinesMesh, scene: Scene, layerMask?: number): LinesMesh {

        const vertices = FormulasUtils.GetDivideXVertices(-startX, -endX, w, a);
        const vertices2 = FormulasUtils.GetDivideXVertices(startX, endX, w, a);
        Lines = MeshBuilder.CreateLineSystem('lines', {
            lines: [vertices, vertices2], updatable: true, instance: Lines
        }, scene);
        Lines.color = color;
        Lines.isPickable = false;
        Lines.alpha = 0;
        Lines.alwaysSelectAsActiveMesh = true;
        Lines.enableEdgesRendering();
        Lines.edgesColor = Color4.FromColor3(color, 1);
        Lines.edgesWidth = edgesWidth;
        if (layerMask) {
            Lines.layerMask = layerMask;
        }
        return Lines;
    }

    static GetDivideUpdateL(startX: number, endX: number, w: number, a: number, color: Color3, edgesWidth: number,
        Lines: LinesMesh, scene: Scene, layerMask?: number): LinesMesh {

        const vertices = FormulasUtils.GetDivideXVertices(startX, endX, w, a);
        Lines = MeshBuilder.CreateLines('lines', { points: vertices, updatable: true, instance: Lines }, scene);
        Lines.color = color;
        Lines.isPickable = false;
        Lines.alpha = 0;
        Lines.alwaysSelectAsActiveMesh = true;
        Lines.enableEdgesRendering();
        Lines.edgesColor = Color4.FromColor3(color, 1);
        Lines.edgesWidth = edgesWidth;
        if (layerMask) {
            Lines.layerMask = layerMask;
        }
        return Lines;
    }


    static GetX2Line(startX: number, w: number, a: number, color: Color3, edgesWidth: number, Lines: LinesMesh,
        scene: Scene, layerMask?: number): LinesMesh {
        const vertices = FormulasUtils.GetX2Vertices(startX, w, a);
        Lines = MeshBuilder.CreateLines('lines', { points: vertices, updatable: true, instance: Lines }, scene);
        Lines.color = color;
        Lines.isPickable = false;
        Lines.alpha = 0;
        Lines.enableEdgesRendering();
        Lines.edgesColor = Color4.FromColor3(color, 1);
        Lines.edgesWidth = edgesWidth;
        if (layerMask) {
            Lines.layerMask = layerMask;
        }
        return Lines;
    }

    static GetXLine(startX: number, w: number, a: number, color: Color3, edgesWidth: number, Lines: LinesMesh,
        scene: Scene, layerMask?: number): LinesMesh {
        const vertices = FormulasUtils.GetXVertices(startX, w, a);
        Lines = MeshBuilder.CreateLines('lines', { points: vertices, updatable: true, instance: Lines }, scene);
        Lines.color = color;
        Lines.isPickable = false;
        Lines.alpha = 0;
        Lines.enableEdgesRendering();
        Lines.edgesColor = Color4.FromColor3(color, 1);
        Lines.edgesWidth = edgesWidth;
        if (layerMask) {
            Lines.layerMask = layerMask;
        }
        return Lines;
    }



}
