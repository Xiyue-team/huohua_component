///<reference path="../../../../../node_modules/@types/three/three-core.d.ts"/>
import * as THREE from 'three';
import {SpriteText2D} from 'three-text2d';
import {Vector3} from 'three';
export class YmzxUtils {
    //传入三个点的坐标返回指定的角的角度 保留两位小数
    //传入三个点的坐标数组
    getAngleByVector(vector1: any, vector2: any, vector3: any) {
        const p1 = new THREE.Vector3(vector1[0], vector1[1], vector1[2]);
        const p2 = new THREE.Vector3(vector2[0], vector2[1], vector2[2]);
        const p3 = new THREE.Vector3(vector3[0], vector3[1], vector3[2]);
        const d1 = new THREE.Vector3();
        const d2 = new THREE.Vector3();
        const d3 = new THREE.Vector3();
        const v1 = d1.subVectors(p3, p1).length();
        const v2 = d2.subVectors(p3, p2).length();
        const v3 = d3.subVectors(p1, p2).length();
        const angle = (Math.acos((Math.pow(v2, 2) + Math.pow(v1, 2) - Math.pow(v3, 2)) / (2 * v2 * v1)) * 180 / Math.PI) .toFixed(2);
        return angle;
    }
    /*
    * 传入点和材质画线的方法
    * */
    createLine( point1: any, point2: any , material: any) {

        const geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3( point1[0], point1[1], point1[2] ),
            new THREE.Vector3( point2[0], point2[1], point2[2] ),
        );
        const line = new THREE.Line( geometry, material );
        return line;
    }

    /*
    * 传入字 和坐标 及颜色创建文字
    * */
    createText(texts: any , x: any, y: any, z: any, color: any ) {
        const textStyle = {font:  'italic 40px "Times New Roman"' , fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.15, 0.15, 0.15);
        text.position.set(x, y, z);
        return text;
    }


    createTextAngle(texts: any , x: any, y: any, z: any, color: any) {
        const textStyle = {font:  ' 30px "Times New Roman"' , fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.3, 0.3, 0.3);
        text.position.set(x, y, z);
        return text;
    }



}
