import * as THREE from 'three';
import {SpriteText2D} from 'three-text2d';

export class Utils {
    //创建一个点
    static createPoint(r: number, color: string, x: number, y: number) {
        const geometry = new THREE.CircleBufferGeometry(r, 32);
        const material = new THREE.MeshBasicMaterial({color: color});
        const circle = new THREE.Mesh(geometry, material);
        circle.position.set(x, y, 1);
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
    static createText(texts: string, x: number, y: number, z: number, color: string) {
        const textStyle = {font: 'italic 50px "Times New Roman"', fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.15, 0.15, 0.15);
        text.position.set(x, y, z);
        text.material.depthTest = false;
        return text;
    }

    static createText2(texts: string, x: number, y: number, z: number, color: string) {
        const textStyle = {font: 'italic 50px "Times New Roman"', fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.2, 0.2, 0.2);
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
        const material = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide});
        const triangle = new THREE.Mesh(geometry, material);
        return triangle;
    }

    //带贴图的面片
    static createImg(x: number, y: number, z: number, width: number, height: number, src: any) {
        const geometry = new THREE.PlaneBufferGeometry(width, height);
        const texture = new THREE.TextureLoader().load(src);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(x, y, z);
        return plane;
    }

}
