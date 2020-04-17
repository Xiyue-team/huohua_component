import { Vector3 } from '@babylonjs/core/Legacy/legacy';

export class FormulasUtils {

    static GetDivideXPoint(x: number, w: number, a: number): Vector3 {
        const y = a * 1 / x / w;
        return new Vector3(x, y, 0);
    }
    static GetDivideYPoint(y: number, w: number, a: number): Vector3 {
        const x = w * 1 / y / a;
        return new Vector3(x, y, 0);
    }
    /**
     * 获取Tangent函数坐标点
     * @param Startvalue 
     * @param Endvalue 
     */
    static GetDivideXVertices(Startvalue: number, Endvalue: number, w: number, a: number, stepn: number = 90): Vector3[] {
        const vertices = [];
        if (Startvalue > 0) {
            const step1 = 1 - Startvalue;
            for (let i = 0; i < stepn; i++) {
                const point = FormulasUtils.GetDivideXPoint(Startvalue + i / stepn * step1, w, a);
                if (point.y < 18 && point.y > -18) {
                    vertices.push(point);
                }
            }
            const step2 = Endvalue - 1;
            for (let i = 0; i < stepn; i++) {
                const point = FormulasUtils.GetDivideXPoint(1 + i / stepn * step2, w, a);
                if (point.y < 18 && point.y > -18) {
                    vertices.push(point);
                }
            }
        } else {
            const step1 = -1 - Startvalue;
            for (let i = 0; i < stepn; i++) {
                const point = FormulasUtils.GetDivideXPoint(Startvalue + i / stepn * step1, w, a);
                if (point.y < 18 && point.y > -18) {
                    vertices.push(point);
                }
            }
            const step2 = Endvalue + 1;
            for (let i = 0; i < stepn; i++) {
                const point = FormulasUtils.GetDivideXPoint(-1 + i / stepn * step2, w, a);
                if (point.y < 18 && point.y > -18) {
                    vertices.push(point);
                }
            }
        }
        return vertices;
    }


    static GetX2Point(x: number, w: number, a: number): Vector3 {
        const y = a * Math.pow(x / w, 2);
        return new Vector3(x, y, 0);
    }

    static GetX2PointY(y: number, w: number, a: number) {
        return Math.sqrt(y / a) * w;
    }

    static GetX2Vertices(Startvalue: number, w: number, a: number, stepn: number = 180): Vector3[] {
        const vertices = [];
        let start = FormulasUtils.GetX2PointY(Startvalue, w, a);
        start = start > 12 ? 12 : start;
        const step = start * 2;
        for (let i = 0; i <= stepn; i++) {
            const point = FormulasUtils.GetX2Point(-start + i / stepn * step, w, a);
            vertices.push(point);
        }
        return vertices;
    }

    static GetXPoint(x: number, w: number, a: number): Vector3 {
        const y = a * x / w;
        return new Vector3(x, y, 0);
    }
    static GetXPointY(y: number, w: number, a: number) {
        const x = y / a * w;
        return x;
    }

    static GetXVertices(Startvalue: number, w: number, a: number): Vector3[] {
        const vertices = [];
        let point = FormulasUtils.GetXPoint(Startvalue, w, a);
        if (point.y > Startvalue) {
            point = FormulasUtils.GetXPoint(FormulasUtils.GetXPointY(Startvalue, w, a), w, a);
        }
        vertices.push(point.scale(-1), point);
        return vertices;
    }
}
