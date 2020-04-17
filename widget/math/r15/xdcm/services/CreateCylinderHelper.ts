import * as THREE from 'three';

/**
 * 此类用于创建柱体的侧面
 */
export class CreateCylinderHelper {

    private vertices: any = [];

    private faces: any = [];

    private centerAngle = Math.PI / 3 * 2;

    /*
    segment： 底面边数
    height： 高度
    angle：画多少角度
     */
    addCylinder (segment: any, height: number, angle: number) {
        this.centerAngle = angle;

        const pointArray = this.pointXY(segment);

        const geometry = new THREE.Geometry();

        this.vertices = [];
        this.faces = [];

        this.vertices = this.addPoint(pointArray, height);

        geometry.vertices = this.vertices;

        for (let i = 0; i < this.vertices.length - 1 + (pointArray.length) * 2; i++) {
            if (i < this.vertices.length - 3) {
                // 画侧面
                this.faces[i] = new THREE.Face3(i, i + 1, i + 2);
            }
        }

        geometry.faces = this.faces;

        // 生成法向量
        geometry.computeFaceNormals();

        return geometry;
    }

    //得到顶点初始的x坐标和z坐标
    private pointXY(value: any) {
        //初始角度
        let angle = -Math.PI * 34 / 24;

        //点的数组
        const pointArray = [];

        let x = 0;
        let y = -2;

        for (let i = 0; i < value; i++) {

            x = 2 * Math.cos(angle);
            y = 2 * Math.sin(angle);
            if (i < value / 6) {
                y = 2 * Math.sin(-Math.PI * 34 / 24 - this.centerAngle / 6);
            } else {
                y = 2 * Math.sin(angle);
            }


            pointArray[i] = [x, y];
            angle = angle - this.centerAngle / value;
        }
        return pointArray;
    }

    // 得到顶点的xyz坐标
    private addPoint(pointArray: any, height: number) {
        const pyramidPoint = [];
        const radius = 60;

        let x1 = 0;
        let z1 = 0;

        for (let i = 0; i < pointArray.length * 2; i += 2 ) {
            x1 = pointArray[i / 2][0] * radius - 44;
            z1 = -pointArray[i / 2][1] * radius + 119;


            if (i < pointArray.length * 2 / 6) {
                pyramidPoint[i] = new THREE.Vector3(x1, height / 2,
                    z1);
                pyramidPoint[i + 1] = new THREE.Vector3(x1, -height / 2,
                    z1);
            } else {
                pyramidPoint[i] = new THREE.Vector3(x1, Math.sqrt(-1 * 2 * x1 + 150) + 34.3, z1);
                pyramidPoint[i + 1] = new THREE.Vector3(x1, Math.sqrt(-1 * 2 * x1 + 150) - 65.5, z1);
            }

        }
        return pyramidPoint;
    }

}



