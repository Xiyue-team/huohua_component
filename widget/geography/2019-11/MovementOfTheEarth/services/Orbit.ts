import {
    Vector3, Scene, Color3, LinesMesh
} from '@babylonjs/core/Legacy/legacy';
import { LinesBuild } from '../../../../babylon/util/LinesBuild';

export class Orbit {

    /**
     * 椭圆坐标方程
     * @param ra 
     * @param rb 
     * @param ang 
     */
    static GetEllipsePoint(ra: number, rb: number, ang: number) {
        const x = ra * Math.cos(ang * Math.PI / 180);
        const z = rb * Math.sin(ang * Math.PI / 180);
        return new Vector3(x, 0, z);
    }

    /**
     * 获取椭圆点集
     * @param ra
     * @param rb
     * @param value
     */
    static GetEllipseVertices(ra: number, rb: number, value: number) {
        const vertices = [];
        for (let i = 0; i <= value; i++) {
            vertices.push(this.GetEllipsePoint(ra, rb, i));
        }
        vertices.push(this.GetEllipsePoint(ra, rb, value));
        return vertices;
    }

    /**
     * 椭圆
     * @param EllipseRa
     * @param EllipseRb
     * @param color
     * @param edgesWidth
     * @param scene
     */
    static CreateEllipse(EllipseRa: number, EllipseRb: number, color: Color3, edgesWidth: number, scene: Scene): LinesMesh {
        const vertices = this.GetEllipseVertices(EllipseRa, EllipseRb, 360);
        return LinesBuild.CreateLines(vertices, color, edgesWidth, scene);
    }
}
