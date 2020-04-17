import * as THREE from 'three';
import {SpriteText2D} from 'three-text2d';

export class DyxyUtils {

    //创建面的方法
    static createPlane(width: number, height: number , color: any, opacity: number) {
        const geometry = new THREE.PlaneGeometry( width, height, 32 );
        const material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide, transparent: true , opacity: opacity} );
        const plane = new THREE.Mesh( geometry, material );
        return plane;
    }

    //创建球的方法
    static createSphere(d: number, color: any, opacity: number) {
        const geometry = new THREE.SphereBufferGeometry( d, 32, 32 );
        const material = new THREE.MeshPhongMaterial( {color: color,  specular: '#ffffff', shininess: 30, side: THREE.FrontSide} );
        const sphere = new THREE.Mesh( geometry, material );
        return sphere;
    }

    //创建不透明点的方法
    static createPoint(d: number, color: any) {
        const geometry = new THREE.SphereBufferGeometry( d, 32, 32 );
        const material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide} );
        const point = new THREE.Mesh( geometry, material );
        return point;
    }

    //创建圆形面的方法
    static createCircle(d: number, color: any) {
        const geometry = new THREE.CircleBufferGeometry( d, 32 );
        const material = new THREE.MeshBasicMaterial( { color: color, side: THREE.DoubleSide, depthTest: false, transparent: true , opacity: 0.5} );
        const circle = new THREE.Mesh( geometry, material );
        return circle;
    }

    //创建文字的说法
    static createText(texts: any , x: any, y: any, z: any, color: any ) {
        const textStyle = {font:  'italic 50px "Times New Roman"' , fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.3, 0.3, 0.3);
        text.position.set(x, y, z);
        text.material.depthTest = false;
        return text;
    }

    //画线的方法
    static createLine(color: any, vector1: any, vector2: any) {
        const material = new THREE.LineBasicMaterial({
            color: color, side: THREE.DoubleSide, transparent: true , opacity: 0.4
        });
        const geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3( vector1[0], vector1[1], vector1[2]),
            new THREE.Vector3( vector2[0], vector2[1], vector2[2])
        );
        const line = new THREE.Line( geometry, material );
        return line;
    }
}
