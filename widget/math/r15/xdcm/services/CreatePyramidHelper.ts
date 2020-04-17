import * as THREE from 'three';

/**
 * 此类用于创建锥体的侧面
 */
export class CreatePyramidHelper {

    private vertices: any = [];

    private faces: any = [];

    private centerAngle = Math.PI / 3 * 2;

    // 绘制圆锥面
    addPyramid (segment: any, height: number, angle: number) {
        this.centerAngle = angle;

        const pointArray = this.pointXY(segment);
        const geometry = new THREE.Geometry();

        this.vertices = [];
        this.faces = [];

        this.vertices = this.addPoint(pointArray, height);

        geometry.vertices = this.vertices;

        for (let i = 0; i < this.vertices.length - 1 + (pointArray.length) * 2; i++) {
            if (i < this.vertices.length - 1) {
                // 画侧面
                if (i === (this.vertices.length - 3)) {
                    this.faces[i] = new THREE.Face3(1, i, i + 1);
                } else if (i === (this.vertices.length - 2)) {
                    this.faces[i] = new THREE.Face3(0, 1, i - 1);
                } else {
                    this.faces[i] = new THREE.Face3(i, i + 1, i + 2);
                }
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
        let angle = -Math.PI * 28.25 / 24;

        //点的数组
        const pointArray = [];

        let x = 0;
        let y = -2;

        for (let i = 0; i < value; i++) {
            x = 2 * Math.cos(angle);
            y = 2 * Math.sin(angle);

            pointArray[i] = [x, y];
            angle = angle - this.centerAngle / value;
        }
        return pointArray;
    }

    // 得到顶点的xyz坐标
    private addPoint(pointArray: any, height: number) {
        const pyramidPoint = [];

        // 顶尖高度剪掉的长度
        const length = 20;
        let angle = Math.PI;

        for (let i = 0; i < pointArray.length * 2; i += 2 ) {

            pyramidPoint[i] = new THREE.Vector3(pointArray[i / 2][0] * 30 - 24, height / 2 - length * Math.sin(angle),
                    -pointArray[i / 2][1] * 30 + 30.5);

            pyramidPoint[i + 1] = new THREE.Vector3(pointArray[0 / 2][0] * 30 - 24, -height / 2, -pointArray[0 / 2][1] * 30 + 30.5);

            angle = angle - this.centerAngle / pointArray.length;
        }

        return pyramidPoint;
    }
}


