import * as THREE from 'three';

export class RiShiHelper {
  // 用于计算过圆外一点的圆的切线方程斜率
  getEquationSlope(x0: number, y0: number, x1: number, y1: number, r: number) {
    // x0: 圆外一点的x坐标
    // y0：圆外一点的y坐标
    // r: 圆心到直线的距离 即半径
    //  x1: 圆心x坐标
    //  y1： 圆心y坐标


    const k = [];
    const a = (x1 - x0) * (x1 - x0) - r * r;
    const b = -2 * (x1 - x0) * (y1 - y0);
    const c = (y1 - y0) * (y1 - y0) - r * r;

    k[0] = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    k[1] = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);

    return k;
  }


  //画切线
  createEquationLine(point1: THREE.Vector3, point2: THREE.Vector3) {
    const material = new THREE.LineDashedMaterial({
      color: '#fff',
      transparent: true,
      opacity: 0.6
    });

    const geometry = new THREE.Geometry();

    geometry.vertices = [point1, point2];
    const equationLine = new THREE.LineSegments(geometry, material);
    equationLine.visible = true;
    equationLine.computeLineDistances();
    return equationLine;
  }

  // 删除切线
  removeEquationLine(point1: THREE.Vector3, point2: THREE.Vector3, mesh: THREE.Mesh) {
    const geometry = new THREE.Geometry();
    geometry.vertices = [point1, point2];

    mesh.geometry.dispose();
    mesh.geometry = geometry;
    (mesh as any).computeLineDistances();
  }

  // 画投影区域
  createTriangle(point1: any, point2: any, point3: any) {
    const geometry = new THREE.Geometry();
    const vertices = [point1, point2, point3];

    geometry.vertices = vertices;

    const faces = [new THREE.Face3(0, 1, 2)];
    geometry.faces = faces;

    const material = new THREE.MeshBasicMaterial( {color: '#FEEDD1', side: THREE.DoubleSide,
      transparent: true, opacity: 0.0, depthWrite: false} );

    const triangle = new THREE.Mesh(geometry, material);

    return triangle ;
  }

  removeTriangle(point1: any, point2: any, point3: any, mesh: THREE.Mesh) {
    const geometry = new THREE.Geometry();
    geometry.vertices = [point1, point2, point3];
    geometry.faces = [new THREE.Face3(0, 1, 2)];

    mesh.geometry.dispose();
    mesh.geometry = geometry;
  }


  createShadow(point1: any, point2: any, point3: any, point4: any, opacity: number) {
    // point1: 开始上
    // point2: 开始下
    // point3: 终点上
    // point4: 终点下

    const geometry = new THREE.Geometry();
    const vertices = [point1, point2, point3, point4];

    geometry.vertices = vertices;

    const faces = [new THREE.Face3(0, 1, 2), new THREE.Face3(3, 1, 2)];
    geometry.faces = faces;

    const material = new THREE.MeshBasicMaterial( {color: '#434343', side: THREE.DoubleSide,
      transparent: true, opacity: opacity, depthWrite: false} );

    const mesh = new THREE.Mesh(geometry, material);

    return mesh ;
  }

  removeShadow(point1: any, point2: any, point3: any, point4: any, mesh: THREE.Mesh) {
    const geometry = new THREE.Geometry();
    geometry.vertices = [point1, point2, point3, point4];
    geometry.faces = [new THREE.Face3(0, 1, 2), new THREE.Face3(3, 1, 2)];

    mesh.geometry.dispose();
    mesh.geometry = geometry;
  }

}

