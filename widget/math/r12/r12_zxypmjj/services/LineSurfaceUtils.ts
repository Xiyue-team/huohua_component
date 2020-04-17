import * as THREE from 'three';
import {SpriteText2D, textAlign} from 'three-text2d';
import {DashLine} from '../../../../../src/three/component/DashLine';
import {Vector3} from "three";

export  class  LineSurfaceUtils {
    private dashLine = new DashLine();

    a: Array<any> = [];
    createText(texts: any, x: any, y: any, z: any, color: any) {
        const textStyle = {align: textAlign.center, font: 'Italic 48px "Times New Roman"', fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        // text.rotation = threeDimension.camera.rotation;
        // console.log(text.rotation + '123');
        text.position.set(x, y , z);
        text.scale.set(0.5 , 0.5, 0.5);
        return text;
    }

    createLine(length: any, color: any) {
        const line = new THREE.Object3D();
        const l = 4;
        const material = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide, transparent: true, opacity: 0.9});
        const plane1 = new THREE.PlaneGeometry(length, l);
        const mesh1 = new THREE.Mesh(plane1, material);
        mesh1.position.z = -l / 2;

        const plane2 = new THREE.PlaneGeometry(length, l);
        const mesh2 = new THREE.Mesh(plane2, material);
        mesh2.position.z = l / 2;

        const plane3 = new THREE.PlaneGeometry(length, l);
        const mesh3 = new THREE.Mesh(plane3, material);
        mesh3.rotation.x = Math.PI / 2;
        mesh3.position.y = l / 2;

        const plane4 = new THREE.PlaneGeometry(length, l);
        const mesh4 = new THREE.Mesh(plane4, material);
        mesh4.rotation.x = Math.PI / 2;
        mesh4.position.y = -l / 2;

        line.add(mesh1, mesh2, mesh3, mesh4);

        return line;
    }


    //创建虚线
    createDashLine (objs: any) {
        // const geom = new THREE.Geometry();
        const x = objs.length / 2 * Math.cos(Math.PI / 180 * objs.angle) * Math.cos(Math.PI / 4);
        const z = -objs.length / 2 * Math.cos(Math.PI / 180 * objs.angle) * Math.cos(Math.PI / 4);
        // geom.vertices.push(this.vec3(0 , 0 , 0));
        // geom.vertices.push(this.vec3(x, 0, z));
   //     let lineDashMesh: any;
        // lineDashMesh = new THREE.LineSegments(geom, new THREE.LineDashedMaterial({
        //     color: 'red',
        //     opacity: 1,
        //     dashSize: 10,
        //     gapSize: 10,
        // }));
        // lineDashMesh.computeLineDistances();

        objs = this.dashLine.addLine(this.vec3(0 , 0 , 0), this.vec3(x, 0, z), 'red', 3, true);
       // lineDashMesh.dispose();
        return objs;


    }

    createCircle() {
        const geometry = new THREE.CylinderBufferGeometry( 1, 1, 300, 32 );
        geometry.dispose();
        const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        const cylinder = new THREE.Mesh( geometry, material );
        cylinder.position.set(100, 5 , -100);
        cylinder.rotation.z = -Math.PI / 2;
        cylinder.rotation.y = Math.PI / 4;
        return cylinder;
        // scene.add( circle );
    }


    //创建弧线
    createArcLine(objs: any   ) {

        if (objs.angle  === 0) {
            return  null;
        } else {

            const array = [];

            let x;
            let y;
            for (let i = 0; i <= objs.angle; i++) {
                x = 10 * Math.cos(3.14 * i / 180);
                y = Math.sqrt(100 - Math.pow(x, 2));
                array.push(new THREE.Vector3(0, y * 5, x * 4.5));
            }

            const curve = new THREE.CatmullRomCurve3(array);
            const point = curve.getPoints(50);  //
            const geometry = new THREE.BufferGeometry().setFromPoints(point);
            const material = new THREE.LineBasicMaterial({color: '#000000'});
            geometry.dispose();
            const arc = new THREE.Line(geometry, material);
            arc.rotation.y = 125 * 3.14 / 180;
            arc.position.z = -6;
            arc.scale.set(0.5, 0.5 , 0.5);
            return arc;

        }
    }

    vec3(x: any, y: any , z: any) {
        return new THREE.Vector3(x, y, z);
    }

    createLineMesh (vertices: any , color: any) {  //创建实线
        let lineMesh: any;
        const geometryLine: any = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        geometryLine.vertices = vertices;
        lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));

        return lineMesh;
    }

    createRightAngle(startPoint: any, endPoint: any) {
        const arry: Array<Vector3> = [];
        // arry.push(new Vector3(10, 0 , 0));
        // arry.push(new Vector3(10 , 10 , 0));
        const line1 = this.dashLine.addLine(startPoint , endPoint , '#000000', 6, false);
        line1.rotation.y = Math.PI / 4;
        return line1;
        // arry = [];
        // arry.push(new Vector3(0, 10 , 0));
        // arry.push(new Vector3(10, 10 , 0 ));
        // const line2 = this.lineSurfaceUtils.createLineMesh(arry, '#000000');
        // line2.rotation.y = Math.PI / 4;
        // this.scene.add(line2);
    }
}
