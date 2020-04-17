import * as THREE from 'three';
import {SpriteText2D} from 'three-text2d';
import {DashLineUtils} from '../../../r13/dyxy/services/DashLineUtils';
export class Utils {
    private dashLineUtil = new DashLineUtils();
    //创建一个点
    static createPoint(r: number, color: string, x: number, y: number) {
        const geometry = new THREE.CircleBufferGeometry( r, 32 );
        const material = new THREE.MeshBasicMaterial( { color: color } );
        const circle = new THREE.Mesh( geometry, material );
        circle.position.set(x, y, 0);
        return circle;
    }

    static createPoint1(r: number, color: string, x: number, y: number) {
        const geometry = new THREE.CircleBufferGeometry( r, 32 );
        const material = new THREE.MeshBasicMaterial( { color: color , transparent: true, opacity: 0} );
        const circle = new THREE.Mesh( geometry, material );
        circle.position.set(x, y, 0);
        return circle;
    }

    //创建一条线
    static createLine(width: number, height: number, color: string) {
        const geometry = new THREE.PlaneBufferGeometry( width, height, 32 );
        const material = new THREE.MeshBasicMaterial( { color: color, side: THREE.DoubleSide } );
        const plane = new THREE.Mesh( geometry, material );
        return plane;
    }

    //创建一个滑点识别区域
    static createEventRange(width: number, height: number, color: string, opacity: number) {
        const geometry = new THREE.PlaneBufferGeometry( width, height, 32 );
        const material = new THREE.MeshBasicMaterial( { color: color, side: THREE.DoubleSide, transparent: true, opacity: opacity } );
        const plane = new THREE.Mesh( geometry, material );
        return plane;
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
        const material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide} );
        const triangle = new THREE.Mesh(geometry, material);
        return triangle;
    }

    //创建一个矩形
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

    //创建英文文字的方法
    static createText(texts: any , x: any, y: any, z: any, color: any ) {
        const textStyle = {font:  'italic 50px "Times New Roman"' , fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.15, 0.15, 0.15);
        text.position.set(x, y, z);
        text.material.depthTest = false;
        return text;
    }
    //创建数字的方法
    static createNumber(texts: any , x: any, y: any, z: any, color: any ) {
        const textStyle = { fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.15, 0.15, 0.15);
        text.position.set(x, y, z);
        text.material.depthTest = false;
        return text;
    }

    //创建一条虚线的方法
    createDashLine(x1: number, y1: number, x2: number, y2: number, color: string, width: number) {
        const point1 = new THREE.Vector3(x1, y1, 0);
        const point2 = new THREE.Vector3(x2, y2, 0);
        const dashLine = this.dashLineUtil.addLine(point1, point2, color, width, true);
        return dashLine;
    }
}
