import {SpriteText2D} from 'three-text2d';
import * as THREE from 'three';

export class MmczUtils {

    constructor() {

    }
    /*
  * 传入字 和坐标 及颜色创建文字
  * */
    createText(texts: any , x: any, y: any, z: any, color: any ) {
        const textStyle = {font:  'Italic 50px "Times New Roman"' , fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.4, 0.4, 0.4);
        text.position.set(x, y, z);
        return text;
    }

    /*
    * 创建一个面
    * */
    createPlane(width: number, height: number , color: any, opacity: number) {
        const geometry = new THREE.PlaneGeometry( width, height, 32 );
        const material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide, transparent: true , opacity: opacity} );
        const plane = new THREE.Mesh( geometry, material );
        return plane;
    }


    /*
    * 创建一条线
    * */
    createLine(length: any, color: any, size: number) {
        const geometryLine = new THREE.CylinderBufferGeometry( size, size, length );
        const materialLine = new THREE.MeshBasicMaterial( {color: color} );
        const line =  new THREE.Mesh( geometryLine, materialLine );
        return line;
    }
}
