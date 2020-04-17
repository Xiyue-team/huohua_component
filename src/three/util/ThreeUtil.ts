import * as THREE from 'three';
import { MeshText2D, SpriteText2D, textAlign } from 'three-text2d';
import { Mesh, Vector2, Vector3 } from 'three';

export class   ThreeUtil {
  static drawArc(r: number, startAngle: number, angle: number, color: string, opacity?: number) {
    opacity = opacity ? opacity : 1;
    const arcGeometry = new THREE.CircleBufferGeometry(r, 32, startAngle, angle);
    const arcMaterial = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide, transparent: true, opacity: opacity});
    const arcLine = new THREE.Mesh(arcGeometry, arcMaterial);
    return arcLine;
  }
  //创建一条贝塞尔曲线
  static createBezierCurve(curveOption: any, color?: string, pointNumber?: number) {
    const yanse = color ? color : 0x0199ff;
    const pointNum = pointNumber ? pointNumber : 50;
      const curve = new THREE.CubicBezierCurve3(
          new THREE.Vector3( curveOption.x1, curveOption.y1, curveOption.z1),
          new THREE.Vector3( curveOption.x2, curveOption.y2, curveOption.z2),
          new THREE.Vector3( curveOption.x3, curveOption.y3, curveOption.z3),
          new THREE.Vector3( curveOption.x4, curveOption.y4, curveOption.z4)
      );

      const points = curve.getPoints( pointNum );
      const geometry = new THREE.BufferGeometry().setFromPoints( points );
      const material = new THREE.LineBasicMaterial( { color : yanse } );
      const curveObject = new THREE.Line( geometry, material );
      return curveObject;
  }
  //创建一个点
  static createPoint(r: number, color: string, x: number, y: number, opacity: number): Mesh {
    const geometry = new THREE.CircleBufferGeometry(r, 32);
    const material = new THREE.MeshBasicMaterial({ transparent: true, color: color, opacity: opacity });
    const circle = new THREE.Mesh(geometry, material);
    circle.position.set(x, y, 0);
    return circle;
  }

  //创建一条线
  static createLine(width: number, height: number, color: string, opacity?: number): Mesh {
    opacity = opacity ? opacity : 1;
    const geometry = new THREE.PlaneBufferGeometry(width, height, 32);
    const material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: opacity});
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  //创建一条虚线
    static createDashLine(startPoint: THREE.Vector3, endPoint: THREE.Vector3, color: string, dashSize: number, gapSize: number) {
        const geometry = new THREE.Geometry();
        geometry.vertices = [startPoint, endPoint];

        const material = new THREE.LineDashedMaterial({
            color: color,
            dashSize: dashSize,
            gapSize: gapSize,
        });

        const lineMesh = new THREE.LineSegments(geometry, material);
        lineMesh.computeLineDistances();
        return lineMesh;
    }

    //绘制圆形线的方法
  static createCircleLine(x: number, y: number, radius: number, color: string) {
    const curve = new THREE.EllipseCurve(
      0,  0,
      radius, radius,
      0, 2 * Math.PI,
      true,
      0
    );
    const geometry = new THREE.Geometry().setFromPoints( curve.getPoints( 100 ) );
    const circle = ThreeUtil.createTube(geometry.vertices, 0.3, geometry.vertices.length, color);
    circle.position.set(x, y, 0);
    return circle;
  }

  //创建面
  static createPlane(width: number, height: number, color: string, opacity: number, transparent?: boolean): Mesh {
    transparent = transparent === false ? transparent : true;
    const geometry = new THREE.PlaneBufferGeometry( width, height);
    const material = new THREE.MeshBasicMaterial( {transparent: transparent, color: color, opacity: opacity, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    return plane;
  }

  //创建一个球体
  static createSphere(radius: number, color?: string, opacity?: number, x?: number, y?: number, z?: number) {
      color = color ? color : '#000000';
      opacity = opacity ? opacity : 1;
      x = x ? x : 0;
      y = y ? y : 0;
      z = z ? z : 0;
      const geometry = new THREE.SphereGeometry( radius, 32, 32 );
      const material = new THREE.MeshBasicMaterial( { transparent: true, color: color, opacity: opacity} );
      const sphere = new THREE.Mesh( geometry, material );
      sphere.position.set(x, y, z);
      return sphere;
  }

  //创建一个三角形
  static createTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: string, opacity?: number): Mesh {
    opacity = opacity ? opacity : 1;
    const geometry = new THREE.Geometry();
    const z = 0;
    const vectors = [];
    vectors.push(new THREE.Vector3(x1, y1, z));
    vectors.push(new THREE.Vector3(x2, y2, z));
    vectors.push(new THREE.Vector3(x3, y3, z));
    geometry.vertices = vectors;
    const face = [new THREE.Face3(0, 1, 2)];
    geometry.faces = face;
    geometry.computeFaceNormals();
    const material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: opacity });
    return new THREE.Mesh(geometry, material);
  }

  //创建英文文字的方法
  static createNewRomanText(texts: string, x: number, y: number, z: number, color: string, scale: number): SpriteText2D {
    const textStyle = { font: 'italic 50px "Times New Roman"', fillStyle: color, antialias: true };
    const text = new SpriteText2D(texts, textStyle);
    text.scale.set(scale, scale, scale);
    text.position.set(x, y, z);
    text.material.depthTest = false;
    return text;
  }

  //创建普通不斜体英文文字的方法
  static createNewRomanEnText(texts: string, x: number, y: number, z: number, color: string, scale: number): SpriteText2D {
    const textStyle = { font: '50px "Times New Roman"', fillStyle: color, antialias: true };
    const text = new SpriteText2D(texts, textStyle);
    text.scale.set(scale, scale, scale);
    text.position.set(x, y, z);
    text.material.depthTest = false;
    return text;
  }

  //创建普通文字的方法
  static createNormalText(texts: string, x: number, y: number, z: number, color: string, scale?: number): SpriteText2D {
    scale = scale ? scale : 0.15;
    const textStyle = {font: '50px SimHei', fillStyle: color, antialias: true};
    const text = new SpriteText2D(texts, textStyle);
    text.scale.set(scale, scale, scale);
    text.position.set(x, y, z);
    text.material.depthTest = false;
    return text;
  }

  //创建普通文字的方法 中心点在左侧
  static createNormalCenterLeftText(texts: string, x: number, y: number, z: number, color: string, scale?: number): SpriteText2D {
    scale = scale ? scale : 0.15;
    const textStyle = {font: '50px SimHei', fillStyle: color, antialias: true, align: textAlign.left};
    const text = new SpriteText2D(texts, textStyle);
    text.scale.set(scale, scale, scale);
    text.position.set(x, y, z);
    text.material.depthTest = false;
    return text;
  }
  //创建普通文字的方法 中心点在右侧
  static createNormalCenterRightText(texts: string, x: number, y: number, z: number, color: string, scale?: number): SpriteText2D {
    scale = scale ? scale : 0.15;
    const textStyle = {font: '50px SimHei', fillStyle: color, antialias: true, align: textAlign.right};
    const text = new SpriteText2D(texts, textStyle);
    text.scale.set(scale, scale, scale);
    text.position.set(x, y, z);
    text.material.depthTest = false;
    return text;
  }

  //创建数字的方法
  static createNumber(texts: string, x: number, y: number, z: number, color: string, scale: number): SpriteText2D {
    const textStyle = { fillStyle: color, antialias: true };
    const text = new SpriteText2D(texts, textStyle);
    text.scale.set(scale, scale, scale);
    text.position.set(x, y, z);
    text.material.depthTest = false;
    return text;
  }

  /*
  * 创建可以旋转的文字
  * */
  static createText(texts: string, color: string, x?: number, y?: number, z?: number, scale?: number) {
    scale = scale ? scale : 0.15;
    x = x ? x : 0;
    y = y ? y : 0;
    z = z ? z : 0;
    const text = new MeshText2D(texts, { align: textAlign.center, font: '50px SimHei', fillStyle: color, antialias: true });
    text.position.set(x, y, z);
    text.scale.set(scale, scale, scale);
    return text;
  }

  //创建图片
  static createImg(width: number, height: number, img: any, x?: number, y?: number, z?: number): Mesh {
      x = x ? x : 0;
      y = y ? y : 0;
      z = z ? z : 0;
    const loader = new THREE.TextureLoader();
    const floorTexture = loader.load(img as any);
    const geometry = new THREE.PlaneBufferGeometry( width, height, 32 );
    const material = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide, transparent: true, opacity: 1} );
    //关闭THREE.WebGLRenderer: Texture has been resized from (613x345) to (512x256).提示
    material.map.minFilter = THREE.LinearFilter;
    const plane = new THREE.Mesh( geometry, material );
    plane.position.set(x, y, z);
    return plane;
  }

  //创建图片
  static createInstancedImg(width: number, height: number, img: any, x?: number, y?: number, z?: number): Mesh {
    x = x ? x : 0;
    y = y ? y : 0;
    z = z ? z : 0;
    const loader = new THREE.TextureLoader();
    const floorTexture = loader.load(img as any);
    const geometry = new THREE.PlaneBufferGeometry( width, height, 10 );
    const material = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide, transparent: true, opacity: 1} );
    //关闭THREE.WebGLRenderer: Texture has been resized from (613x345) to (512x256).提示
    material.map.minFilter = THREE.LinearFilter;
    const plane = new THREE.Mesh( geometry, material );
    plane.position.set(x, y, z);
    return plane;
  }

  //创建圆锥的方法
    /**
     * @param {number} radius  半径
     * @param {number} height  圆锥高度
     * @param {string} color   圆锥颜色
     * @param {number} x       圆锥X轴坐标
     * @param {number} y       圆锥y轴坐标
     * @param {number} z       圆锥z轴坐标
     * @returns {Mesh}
     */
  static createCone(radius: number, height: number, color: string, x?: number, y?: number, z?: number) {
      x = x ? x : 0;
      y = y ? y : 0;
      z = z ? z : 0;
      const geometry = new THREE.ConeBufferGeometry( radius, height, 32 );
      const material = new THREE.MeshBasicMaterial( {color: color} );
      const cone = new THREE.Mesh( geometry, material );
      cone.position.set(x, y, z);
      return cone;
  }

  //创建圆柱的方法
    /**
     *
     * @param {number} radiusTop     圆柱顶面半径
     * @param {number} radiusBottom  圆柱底面半径
     * @param {number} height        圆柱高度
     * @param {string} color         圆柱颜色
     * @param {number} x             圆柱X轴坐标
     * @param {number} y             圆柱Y轴坐标
     * @param {number} z             圆柱Z轴坐标
     * @returns {Mesh}
     */
  static createCylinder(radiusTop: number, radiusBottom: number, height: number, color: string,
                        x?: number, y?: number, z?: number) {
      x = x ? x : 0;
      y = y ? y : 0;
      z = z ? z : 0;
      const geometry = new THREE.CylinderBufferGeometry( radiusTop, radiusBottom, height, 32 );
      const material = new THREE.MeshBasicMaterial( {color: color, transparent: true} );
      const cylinder = new THREE.Mesh( geometry, material );
      cylinder.position.set(x, y, z);
      return cylinder;
  }

  /**
   *判断直线旋转方向(顺时针还是逆时针旋转)
   * @param slider 滑条
   * @param {number} lastPointX 上一次X值
   * @param {number} lastPointY 上一次Y值
   * @param {number} currentPointX 当前X值
   * @param {number} currentPointY 当前Y值
   * @returns {boolean} ture 逆時針，false 順時針
   *
   */
  static isClockwise(slider: any, lastPointX: number, lastPointY: number, currentPointX: number, currentPointY: number): boolean {
    let circlePoint;
    if (slider.position) {
        circlePoint = { x: slider.position.x, y: slider.position.y };
    } else {
        circlePoint = { x: slider.x, y: slider.y };
    }
    const sp = (lastPointX - currentPointX) * (circlePoint.y - currentPointY) -
      (lastPointY - currentPointY) * (circlePoint.x - currentPointX);
    return sp > 0 ? false : true;
  }



  /**
   *  获取旋转的角度
   * @param controlPoint 控制点对象
   * @param {number} lastPointX  当前对象上一次X轴坐标
   * @param {number} lastPointY  当前对象上一次Y轴坐标
   * @param {number} currentPointX 当前对象X轴坐标
   * @param {number} currentPointY 当前对象Y轴坐标
   * @returns {number}   角度
   */
  static getAngle(controlPoint: any, lastPointX: number, lastPointY: number, currentPointX: number, currentPointY: number): number {
    const a = Math.sqrt(Math.pow((lastPointX - controlPoint.x), 2) +
      Math.pow((lastPointY - controlPoint.y), 2));
    const b = Math.sqrt(Math.pow((lastPointX - currentPointX), 2) +
      Math.pow((lastPointY - currentPointY), 2));
    const c = Math.sqrt(Math.pow((currentPointX - controlPoint.x), 2) +
      Math.pow((currentPointY - controlPoint.y), 2));
    let i = (a * a + c * c - b * b) / (2 * a * c);
    if (i <= -1) {
      i = -1;
    }
    if (i >= 1) {
      i = 1;
    }
    return Math.acos(i);
  }


  /**
   * 世界坐标转换的three.js坐标
   * @param event 事件类型
   * @param {number} MousePointX 当前鼠标X轴坐标
   * @param {number} MousePointY 当前鼠标Y轴坐标
   * @param camera 相机
   * @param {number} domWidth Dom宽度
   * @param {number} domHeight Dom高度
   * @returns {{x: any; y: any}} 返回值
   */
  static getMousePos(event: any, MousePointX: number, MousePointY: number, camera: any, domWidth: number, domHeight: number): Vector2 {


    const vector = new Vector3();
    vector.set((MousePointX / domWidth) * 2 - 1,
      (-MousePointY / domHeight) * 2 + 1, 0);

    vector.unproject(camera);

    const dir = vector.sub(camera.position).normalize();

    const distance = -camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));
    return new Vector2(pos.x, pos.y);
  }

  /**
   * three.js 世界坐标转屏幕坐标
   * z值坐标为相机当前Z轴坐标或-camera.position.z
   */
  static getWorldPosition(x: number, y: number, z: number, camera: THREE.Camera) {
    const worldVector = new THREE.Vector3(
      x,
      y,
      z
    );
    const standardVector = worldVector.project(camera); //世界坐标转标准设备坐标
    const a = window.innerWidth / 2;
    const b = window.innerHeight / 2;
    const xResult = Math.round(standardVector.x * a + a); //标准设备坐标转屏幕坐标
    const yResult = Math.round(-standardVector.y * b + b); //标准设备坐标转屏幕坐标
    const result = {
      x: xResult,
      y: yResult
    };
    return result;
  }

  /**
   * 若两直线相交，求出两直线交点
   * @param lineObj1  直线一对象
   * @param lineObj2  直线二对象
   * @returns {{x: number; y: number}}  交点坐标
   */
  static lineIntersection(lineObj1: any, lineObj2: any): Vector2 {
    const  slider1 = lineObj1.sliderPoint;
    const  slider2 = lineObj2.sliderPoint;
    let x: number;
    let y: number;

    if ( lineObj1.slope === Math.PI / 2 && lineObj2.slope !== Math.PI / 2) {
      y = Math.tan(lineObj2.slope) * (slider1.position.x - slider2.position.x) +
        slider2.position.y;
      x = slider1.position.x;
    } else if ( lineObj2.slope === Math.PI / 2 && lineObj1.slope !== Math.PI / 2) {
      y = Math.tan(lineObj1.slope) * (slider2.position.x - slider1.position.x)
        + slider1.position.y;
      x = slider2.position.x;
    } else  {
      x = (slider2.position.y - slider1.position.y + (Math.tan(lineObj1.slope) * slider1.position.x) -
        (Math.tan(lineObj2.slope) * slider2.position.x)) / (Math.tan(lineObj1.slope) - Math.tan(lineObj2.slope));
      y = Math.tan(lineObj1.slope) * (x - slider1.position.x) + slider1.position.y;
    }
    return new Vector2(x, y);
  }

    //获取随机数方法
    static getRandomNumber(minNumber: number, maxNumber: number) {
        const min = Math.ceil(minNumber);
        const max = Math.floor(maxNumber);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

  //获取两个三维向量之间的夹角
 static getVectorAngle(vector1: THREE.Vector3, vector2: THREE.Vector3) {
      let angle: number;
      vector1.cross(vector2); //用于判断夹角的方向
      if (vector1.z > 0) {
          angle = vector1.angleTo(vector2);
      } else {
          angle = - (vector1.angleTo(vector2));
      }
      return angle;
  }
  //通过点坐标画线
    static createLineforPoint(color: any, vector1: any, vector2: any, transparent?: any, opacity?: any) {
        transparent = transparent ? transparent : true;
        opacity = opacity ? opacity : 1;
        const material = new THREE.LineBasicMaterial({
            color: color, side: THREE.DoubleSide, transparent: transparent , opacity: opacity
        });
        const geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3( vector1[0], vector1[1], vector1[2]),
            new THREE.Vector3( vector2[0], vector2[1], vector2[2])
        );
        const line = new THREE.Line( geometry, material );
        return line;
    }

    //创建一个盒子模型
    static createBox(width: number, height: number, color: string, depth?: number) {
      depth = depth ? depth : 1;
      const geometry = new THREE.BoxBufferGeometry( width, height, depth );
      const material = new THREE.MeshBasicMaterial( {color: color} );
      const cube = new THREE.Mesh( geometry, material );
      return cube;
    }

    //通过点来绘制贝塞尔曲线 （可加粗的管道）
    /**
     * @param {Vector3[]} points    Vector3数组
     * @param {number} radius              半径
     * @param {number} tubularSegments     用多少段管道来绘制曲线
     * @param {string} color               管道颜色
     * @returns {Mesh}
     */
    static createTube(points: THREE.Vector3[], radius: number , tubularSegments: number, color: string) {
        const path = new THREE.CatmullRomCurve3( points );
        //构成横截面的线段
        const radiusSegments = 8;
        //管道打开或者关闭
        const closed = false;
        // geometry
        const geometry1 = new THREE.TubeGeometry( path, tubularSegments, radius, radiusSegments, closed );
        const geometry = new THREE.BufferGeometry().fromGeometry( geometry1 );
        const material = new THREE.MeshBasicMaterial( {
            color: color,
            side: THREE.DoubleSide
        } );
        // mesh
        const spiralCurve = new THREE.Mesh( geometry, material );
        return spiralCurve;
    }


    // 通过传入三个点来计算传入第一个点所在定点的夹角
    /**
     *
     * @param {Vector3} pointA  Vector3数组 夹角所在的点
     * @param {Vector3} pointB  Vector3数组
     * @param {Vector3} pointC  Vector3数组
     * @returns {number} 返回角度制
     */
    static getThreeAngle(pointA: THREE.Vector3, pointB: THREE.Vector3, pointC: THREE.Vector3) {
      const lengthAB = Math.sqrt( Math.pow(pointA.x - pointB.x, 2) +
        Math.pow(pointA.y - pointB.y, 2)),
        lengthAC = Math.sqrt( Math.pow(pointA.x - pointC.x, 2) +
          Math.pow(pointA.y - pointC.y, 2)),
        lengthBC = Math.sqrt( Math.pow(pointB.x - pointC.x, 2) +
          Math.pow(pointB.y - pointC.y, 2));
      const cosA = (Math.pow(lengthAB, 2) + Math.pow(lengthAC, 2) - Math.pow(lengthBC, 2)) /
        (2 * lengthAB * lengthAC);
      const angleA = Math.round( Math.acos(cosA) * 180 / Math.PI );
      return angleA;
    }

    //创建一个点
    static createCircle(r: number, color: string, x: number, y: number, z: number, opacity: number): Mesh {
      const geometry = new THREE.CircleBufferGeometry(r, 32);
      const material = new THREE.MeshBasicMaterial({ transparent: true, color: color, opacity: opacity, side: THREE.DoubleSide });
      const circle = new THREE.Mesh(geometry, material);
      circle.position.set(x, y, z);
      return circle;
    }
}


