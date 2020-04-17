import {Scene, Mesh, MeshBuilder, Material} from '@babylonjs/core/Legacy/legacy';

export class MeshsBuild {

    /**
     * 画出可更新的圆，并设置颜色
     * @param r
     * @param ang
     * @param material
     * @param scene 场景
     */
    static CreateCircle(r: number, ang: number, material: Material, scene: Scene): Mesh {
        const circle = MeshBuilder.CreateDisc('disc', {
            radius: r,
            arc: ang / 360,
            tessellation: ang,
            updatable: true,
            sideOrientation: Mesh.DOUBLESIDE
        }, scene);
        circle.material = material;
        return circle;
    }
}
