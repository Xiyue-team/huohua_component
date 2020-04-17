import THREE from 'three';
import {SpriteText2D} from 'three-text2d';



export class Utils {
    scale = (window.innerWidth / 1650 - 0.03);
    //创建面板
    static createPlane(image: any, width: number, height: number) {
        const floorTexture = new THREE.TextureLoader().load(image);
        const geometry = new THREE.PlaneBufferGeometry(width, height);
        const material = new THREE.MeshPhongMaterial({map: floorTexture, transparent: true, opacity: 0.5});
        const axis = new THREE.Mesh(geometry, material);
        return axis;
    }

    //创建点
    static createPoint(x: number, y: number, board: any) {
        return board.create('point', [x, y], {visible: false, fixed: true});
    }

    //创建一条线
    static createLine(width: number, height: number, color: string) {
        const geometry = new THREE.PlaneBufferGeometry(width, height, 32);
        const material = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide});
        const plane = new THREE.Mesh(geometry, material);
        return plane;

    }



    //创建直线
    // static createLine(startPoint: any, endPoint: any, board: any) {
    //     const line = board.create('line', [startPoint , endPoint], {straightFirst: false,
    //         straightLast: false, highlight: false, fixed: true, strokeColor: '#0094FF', strokeWidth: 4 });
    //     return line;
    //     //#0094FF
    // }


    //创建坐标轴刻度
    // static createText(board: any) {
    //     const textArray = [];
    //
    //     textArray[0] = board.create('text', [-1.2, -10, '-10'], {fixed: true, fontsize: 16, highlight: false});
    //     textArray[1] = board.create('text', [-0.8, -5, '-5'], {fixed: true, fontsize: 16, highlight: false});
    //     textArray[2] = board.create('text', [-0.6, 5, '5'], {fixed: true, fontsize: 16, highlight: false});
    //     textArray[3] = board.create('text', [-1, 10, '10'], {fixed: true, fontsize: 16, highlight: false});
    //
    //
    //     textArray[4] = board.create('text', [-10.6, -0.5, '-10'], {fixed: true, fontsize: 16, highlight: false});
    //     textArray[5] = board.create('text', [-5.2, -0.5, '-5'], {fixed: true, fontsize: 16, highlight: false});
    //     textArray[6] = board.create('text', [4.8, -0.5, '5'], {fixed: true, fontsize: 16, highlight: false});
    //     textArray[7] = board.create('text', [9.4, -0.5, '10'], {fixed: true, fontsize: 16, highlight: false});
    //
    //     textArray[8] = board.create('text', [-0.5, 1, '1'], {fixed: true, fontsize: 16, highlight: false});
    //     textArray[9] = board.create('text', [0.8, -0.4, '1'], {fixed: true, fontsize: 16, highlight: false});
    //      textArray[10] = board.create('text', [-1.4, -0.4, '-1'], {fixed: true, fontsize: 16, highlight: false});
    //      textArray[11] = board.create('text', [-0.7, -1, '-1'], {fixed: true, fontsize: 16, highlight: false});
    //
    //     board.create('group', textArray, {fixed: true});
    // }
    //创建英文文字的方法
    static createText(texts: string, x: number, y: number, z: number, color: string) {
        const textStyle = {font: 'italic 50px "Times New Roman"', fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.15, 0.15, 0.15);
        text.position.set(x, y, z);
        text.material.depthTest = false;
        return text;
    }
    //创建数字的方法
    static createNumber(texts: string, x: number, y: number, z: number, color: string) {
        const textStyle = {fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.15, 0.15, 0.15);
        text.position.set(x, y, z);
        text.material.depthTest = false;
        return text;
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


    //创建一个点
    static createPoint1(r: number, color: string, x: number , y: number, opacity: number) {
        const geometry = new THREE.CircleBufferGeometry(r, 32);
        const material = new THREE.MeshBasicMaterial({transparent: true , color: color, opacity: opacity});
        const circle = new THREE.Mesh(geometry, material);
        circle.position.set(x, y , 0);
        return circle;
    }


}
