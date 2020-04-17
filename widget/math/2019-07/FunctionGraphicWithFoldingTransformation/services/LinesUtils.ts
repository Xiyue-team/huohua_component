import { Vector3, LinesMesh, Color3, Color4, MeshBuilder, Scene } from '@babylonjs/core/Legacy/legacy';


export class LinesUtils {
    static GetX2Line(startX: number, endX: number, color: Color3, edgesWidth: number,
        scene: Scene, layerMask?: number): LinesMesh {
        const vertices = LinesUtils.GetX2Vertices(startX, endX);
        const Lines = MeshBuilder.CreateLines('lines', { points: vertices }, scene);
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

    static GetX2DashedLine(startX: number, endX: number, color: Color3, edgesWidth: number,
        scene: Scene, dashNb: number = 30, layerMask?: number): LinesMesh {
        const vertices = LinesUtils.GetX2Vertices(startX, endX, dashNb);
        const Lines = MeshBuilder.CreateDashedLines('lines', { points: vertices, dashNb: dashNb * 2 }, scene);
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

    static GetX2Point(x: number): Vector3 {
        const y = x * x - x - 2;
        return new Vector3(x, y, 0);
    }

    static GetX2Vertices(Startvalue: number, Endvalue: number, stepn: number = 180): Vector3[] {
        const vertices = [];
        const step = Endvalue - Startvalue;
        for (let i = 0; i < stepn; i++) {
            const point = LinesUtils.GetX2Point(Startvalue + i / stepn * step);
            if (point.y < 10 && point.y > -10) {
                vertices.push(point);
            }
        }
        return vertices;
    }
    static GetX2LineX(startX: number, endX: number, color: Color3, edgesWidth: number,
        scene: Scene, layerMask?: number): LinesMesh {
        const vertices = LinesUtils.GetX2VerticesX(startX, endX);
        const Lines = MeshBuilder.CreateLines('lines', { points: vertices }, scene);
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
    static GetX2VerticesX(Startvalue: number, Endvalue: number, stepn: number = 180): Vector3[] {
        const vertices = [];
        const step = Endvalue - Startvalue;
        for (let i = 0; i < stepn; i++) {
            const point = LinesUtils.GetX2Point(Startvalue + i / stepn * step);
            if (point.y < 10) {
                if (point.y < 0) {
                    point.y = Math.abs(point.y);
                }
                vertices.push(point);
            }
        }
        return vertices;
    }
    static GetX2absPoint(x: number): Vector3 {
        const y = x * x - Math.abs(x) - 2;
        return new Vector3(x, y, 0);
    }
    static GetX2LineY(startX: number, endX: number, color: Color3, edgesWidth: number,
        scene: Scene, layerMask?: number): LinesMesh {
        const vertices = LinesUtils.GetX2VerticesY(startX, endX);
        const Lines = MeshBuilder.CreateLines('lines', { points: vertices }, scene);
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
    static GetX2VerticesY(Startvalue: number, Endvalue: number, stepn: number = 180): Vector3[] {
        const vertices = [];
        const step = Endvalue - Startvalue;
        for (let i = 0; i < stepn; i++) {
            const point = LinesUtils.GetX2absPoint(Startvalue + i / stepn * step);
            if (point.y < 10) {
                vertices.push(point);
            }
        }
        return vertices;
    }
}
