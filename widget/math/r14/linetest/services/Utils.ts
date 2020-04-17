
import * as THREE from 'three';
import {SpriteText2D} from 'three-text2d';
import {Vector3} from 'three';
import {DashLine} from '../../../../../src/three/component/DashLine';

export class Utils {

    private static dashLine = new DashLine();
    //创建一个点
    static createPoint(r: number, color: string, x: number , y: number, opacity: number) {
        const geometry = new THREE.CircleBufferGeometry(r, 32);
        const material = new THREE.MeshBasicMaterial({transparent: true , color: color, opacity: opacity});
        const circle = new THREE.Mesh(geometry, material);
        circle.position.set(x, y , 0);
        return circle;
    }

    static createPoint1(r: number, color: string, x: number , y: number) {
        const geometry = new THREE.CircleBufferGeometry(r, 32);
        const material = new THREE.MeshBasicMaterial({transparent: true , color: color, opacity: 1});
        const circle = new THREE.Mesh(geometry, material);
        circle.position.set(x, y , 0);
        return circle;
    }

    //创建一条线
    static createLine(width: number, height: number, color: string) {
        const geometry = new THREE.PlaneBufferGeometry(width, height, 32);
        const material = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide});
        const plane = new THREE.Mesh(geometry, material);
        return plane;
    }

    //创建一个三角形
    static createTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: string) {
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
        const material = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide});
        const triangle = new THREE.Mesh(geometry, material);
        return triangle;
    }

    //创建英文文字的方法
    //创建英文文字的方法
    static createText(texts: string, x: number, y: number, z: number, color: string) {
        const textStyle = {font: 'italic 50px "Times New Roman"', fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.15, 0.15, 0.15);
        text.position.set(x, y, z);
        text.material.depthTest = false;
        return text;
    }

    static createText1(texts: string, x: number, y: number, z: number, color: string) {
        const textStyle = {font: '50px Arial', fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.15, 0.15, 0.15);
        text.position.set(x, y, z);
        text.material.depthTest = false;
        return text;
    }

    //创建数字的方法
    //创建数字的方法
    static createNumber(texts: string, x: number, y: number, z: number, color: string) {
        const textStyle = {fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.15, 0.15, 0.15);
        text.position.set(x, y, z);
        text.material.depthTest = false;
        return text;
    }

    static createNumber2(texts: string, x: number, y: number, z: number, color: string) {
        const textStyle = {fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.2, 0.2, 0.2);
        text.position.set(x, y, z);
        text.material.depthTest = false;
        return text;
    }

    //直线
    static createLine1(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, color: string) {
        const geometry = new THREE.Geometry();
        const z = 0;
        const vectors = [];
        vectors.push(new THREE.Vector3(x1, y1, z));
        vectors.push(new THREE.Vector3(x2, y2, z));
        vectors.push(new THREE.Vector3(x3, y3, z));
        vectors.push(new THREE.Vector3(x4, y4, z));
        geometry.vertices = vectors;
        const face = [new THREE.Face3(0, 1, 2),
            new THREE.Face3(2, 1, 3)];
        geometry.faces = face;
        geometry.computeFaceNormals();
        const material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide} );
        const triangle = new THREE.Mesh(geometry, material);
        return triangle;
    }

    //创建图片
    static createImg(width: number, height: number, img: any, x: number, y: number) {
        const loader = new THREE.TextureLoader();
        const floorTexture = loader.load(img as any);
        const geometry = new THREE.PlaneBufferGeometry( width, height, 32 );
        const material = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide, transparent: true, opacity: 1} );
        const plane = new THREE.Mesh( geometry, material );
        plane.position.set(x, y, 0);
        return plane;
    }

    //创建面
   static createPlane(width: number, height: number, color: string, opacity: number) {
        const geometry = new THREE.PlaneBufferGeometry( width, height);
        const material = new THREE.MeshBasicMaterial( {transparent: true, color: color, opacity: opacity} );
        const plane = new THREE.Mesh( geometry, material );
        return plane;
    }


    //创建坐标轴刻度
    static createTicks(board: any) {
        const textArray = [];
        let i;
        let j = -10;
        for (i = 0; i < 5; i++) {
            if ( j === 0) {

                textArray[i] = board.create('text', [j, -0.4, ''], {fixed: true, fontsize: 16, highlight: false});
                textArray[i + 5] = board.create('text', [j, -0.4, ''], {fixed: true, fontsize: 16, highlight: false});
                j += 5;
                continue;
            }
            if (j === -10) {
                textArray[i] = board.create('text', [j - 0.6, -0.4, j.toString()], {fixed: true, fontsize: 16, highlight: false});
                textArray[i + 5] = board.create('text', [-1.2, j, j.toString()], {fixed: true, fontsize: 16, highlight: false});
                j += 5;
                continue;
            }
            textArray[i] = board.create('text', [j - 0.25, -0.4, j.toString()], {fixed: true, fontsize: 16, highlight: false});
            textArray[i + 5] = board.create('text', [-0.8, j, j.toString()], {fixed: true, fontsize: 16, highlight: false});
            j += 5;

        }
        textArray[10] = board.create('text', [-0.4, 1, '1'], {fixed: true, fontsize: 16, highlight: false});
        textArray[11] = board.create('text', [0.8, -0.4, '1'], {fixed: true, fontsize: 16, highlight: false});
        textArray[12] = board.create('text', [-1.3, -0.4, '-1'], {fixed: true, fontsize: 16, highlight: false});
        textArray[13] = board.create('text', [-0.6, -1, '-1'], {fixed: true, fontsize: 16, highlight: false});
        board.create('group', textArray, {fixed: true});
    }

    /**
     *判断直线旋转方向(顺时针还是逆时针旋转)
     * @param slider 滑条
     * @param {number} lastPointX 上一次X值
     * @param {number} lastPointY 下一次Y值
     * @param {number} currentPointX 当前X值
     * @param {number} currentPointY 当前Y值
     * @returns {boolean} ture 逆時針，false 順時針
     */
    static isClockwise(slider: any, lastPointX: number, lastPointY: number, currentPointX: number, currentPointY: number) {
        const circlePoint = {x: slider.position.x, y: slider.position.y};
        const sp = (lastPointX - currentPointX) * (circlePoint.y - currentPointY) -
            (lastPointY - currentPointY) * (circlePoint.x - currentPointX);
        return sp > 0 ? false : true;
    }
    //获取旋转的角度
    static getAngle(sliderPoint: any, lastPointX: number, lastPointY: number, currentPointX: number, currentPointY: number ): number {
        const a = Math.sqrt(Math.pow((lastPointX - sliderPoint.x), 2) +
            Math.pow((lastPointY - sliderPoint.y), 2));
        const b = Math.sqrt(Math.pow((lastPointX - currentPointX), 2) +
            Math.pow((lastPointY - currentPointY), 2));
        const c = Math.sqrt(Math.pow((currentPointX - sliderPoint.x), 2) +
            Math.pow((currentPointY - sliderPoint.y), 2));
        return Math.acos((a * a + c * c - b * b) / (2 * a * c));
    }


    static createRightAngle(startPoint: any, endPoint: any, lineWidth: number) {
        const arry: Array<Vector3> = [];
        // 判断是否是ipad设备
        const line1 = this.dashLine.addLine(startPoint , endPoint , 'red', lineWidth, false);
         console.log('456');
        return line1;

    }

    static getMousePos(event: any, MousePointX: number, MousePointY: number, camera: any, domWidth: number, domHeight: number) {

        const vector = new Vector3();
        vector.set((MousePointX / domWidth) * 2 - 1,
            (-MousePointY / domHeight) * 2 + 1, 0);

        vector.unproject(camera);

        const dir = vector.sub(camera.position).normalize();

        const distance = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));
        return {
            x: pos.x,
            y: pos.y
        };
    }

    static getSlope1 ( rotateAngle: number, initAngle1: number) {
        rotateAngle = rotateAngle * 180 / Math.PI;
        const initAngle = initAngle1;
        let slopeAngle: number;
        // parseFloat((initAngle + rotateAngle).toFixed(0))
        if (parseFloat((initAngle + rotateAngle).toFixed(0)) <= 180) {
            // slopeAngle = parseFloat((initAngle + rotateAngle).toFixed(0));
            slopeAngle = initAngle + rotateAngle;
            // 倾斜角 slopeAngle 等于90
            // if (slopeAngle === 90) {
            //     return Math.PI / 2;
            // }
            if (slopeAngle.toFixed(0) === '90') {
                return Math.PI / 2;
            } else if (slopeAngle.toFixed(0) === '-90') {
                return Math.PI / 2;
            } else if (slopeAngle.toFixed(0) === '-270') {
                return Math.PI / 2;
            }
        } else {
             // slopeAngle = parseFloat(((rotateAngle + initAngle)  - 180).toFixed(0));
           slopeAngle = rotateAngle + initAngle  - 180;
        }
        return slopeAngle * Math.PI / 180;
    }

    static lineIntersection(lineObj1: any, lineObj2: any) {
        const  slider1 = lineObj1.sliderPoint;
        const  slider2 = lineObj2.sliderPoint;
        let x: number;
        let y: number;

        if ( lineObj1.slope === Math.PI / 2 && lineObj2.slope !== Math.PI / 2) {
            y = Math.tan(lineObj2.slope) * (slider1.position.x - slider2.position.x) +
                slider2.position.y;
            // x = (y - slider2.position.y) / Math.tan(lineObj2.slope) + slider2.position.x;
            x = slider1.position.x;
        } else if ( lineObj2.slope === Math.PI / 2 && lineObj1.slope !== Math.PI / 2) {
            y = Math.tan(lineObj1.slope) * (slider2.position.x - slider1.position.x)
                + slider1.position.y;
            // x = (y - slider1.position.y) / Math.tan(lineObj1.slope) + slider1.position.x;
            x = slider2.position.x;
        } else  {
            // x = (Math.tan(lineObj1.slope) * slider1.position.x - slider1.position.y -
            //     Math.tan(lineObj2.slope) * slider2.position.x + slider2.position.y)
            //     / (Math.tan(lineObj1.slope) - Math.tan(lineObj2.slope));
            x = (slider2.position.y - slider1.position.y + (Math.tan(lineObj1.slope) * slider1.position.x) -
                (Math.tan(lineObj2.slope) * slider2.position.x)) / (Math.tan(lineObj1.slope) - Math.tan(lineObj2.slope));

            y = Math.tan(lineObj1.slope) * (x - slider1.position.x) + slider1.position.y;

        }
        return {x , y};

    }


}
