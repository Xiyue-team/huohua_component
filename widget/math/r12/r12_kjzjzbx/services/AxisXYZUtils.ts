
import * as THREE from 'three';
import { SpriteText2D, textAlign } from 'three-text2d';
import {DashLine} from '../../../../../src/three/component/DashLine';

export  class AxisXYZUtils {

    changePoint: Array<any> = [80, 80 , 0];
    ponitP: any;
    signStart: Array<any> = [[1, 1 , 1 ] , [ 1 , 1 , 0], [ 1 , 0, 1], [1, 0 , 0], [ 0, 1, 1], [0, 1 , 0], [0, 0 , 1], [ 0, 0 , 0]];
    nowSignStart: Array<any> = [[ 1, 1 , 0] , [1, 0 , 1], [ 1, 0 , 0], [ 0, 1 , 1], [ 0, 1 , 0], [ 0, 0 , 1], [ 0, 0 , 0]];
    public count = 2;

    private dashLine = new DashLine();

    createAxisY(startPoint: any, endPoint: any , color: any, objs: any) { //创建X轴
        let vertices = [];

        vertices.push(new THREE.Vector3(startPoint.x, startPoint.y, startPoint.z));
        vertices.push(new THREE.Vector3(endPoint.x, endPoint.y, endPoint.z));

        let line = this.createLineMesh(vertices, color);
        objs.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(5 , 0 , -endPoint.z + 20));
        vertices.push(new THREE.Vector3(0, 0 , -endPoint.z));
        line = this.createLineMesh(vertices, color );
        objs.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(-5, 0 , -endPoint.z + 20));
        vertices.push(new THREE.Vector3(0 , 0 , -endPoint.z));
        line = this.createLineMesh(vertices, color );
        objs.add(line);
    }

    createAxisX (startPoint: any, endPoint: any , color: any, objs: any) { //创建Y轴
        let vertices = [];

        vertices.push(new THREE.Vector3(startPoint.x, startPoint.y, startPoint.z));
        vertices.push(new THREE.Vector3(endPoint.x, endPoint.y, endPoint.z));

        let line = this.createLineMesh(vertices, color);
        objs.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(endPoint.x - 20, 5, 0));
        vertices.push(new THREE.Vector3(endPoint.x, 0, 0));
        line = this.createLineMesh(vertices, color );
        objs.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(endPoint.x - 20, -5, 0));
        vertices.push(new THREE.Vector3(endPoint.x, 0, 0));
        line = this.createLineMesh(vertices, color );
        objs.add(line);
    }

    createAxisZ (startPoint: any, endPoint: any , color: any, objs: any) { //创建Z轴
        let vertices = [];

        vertices.push(new THREE.Vector3(startPoint.x, startPoint.y, startPoint.z));
        vertices.push(new THREE.Vector3(endPoint.x, endPoint.y, endPoint.z));

        let line = this.createLineMesh(vertices, color);
        objs.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(5, endPoint.y - 20, 0));
        vertices.push(new THREE.Vector3(0, endPoint.y, 0));
        line = this.createLineMesh(vertices, color );
        objs.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(-5, endPoint.y - 20, 0));
        vertices.push(new THREE.Vector3(0, endPoint.y, 0));
        line = this.createLineMesh(vertices, color );
        objs.add(line);
    }

    createLineMesh (vertices: any , color: any) {  //创建实线
        let lineMesh: any;
        const geometryLine: any = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        geometryLine.vertices = vertices;
        // lineMesh  = this.dashLine.addLine(vertices[0], vertices[1],
        //     '#000000', 3, false);
       lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color, linewidth: 1, }));
        return lineMesh;
    }

    createDashLineMesh (vertices: any , color: any) {  //创建虚线
        let lineDashMesh: any;
        // const geometryLine: any = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        // geometryLine.vertices = vertices;
        // lineDashMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
        //     color: color,
        //     opacity: 0.8,
        //     dashSize: 10,
        //     gapSize: 10,
        // }));
        // lineDashMesh.computeLineDistances();
        // return lineDashMesh;

        lineDashMesh = this.dashLine.addLine(vertices[0], vertices[1], color, 3, true);

        return lineDashMesh;
    }

    createCircle() {
        const geometry = new THREE.CircleBufferGeometry( 5, 32 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        const circle = new THREE.Mesh( geometry, material );
        return circle;
        // scene.add( circle );
    }

    labelAxis(start: any , stepSize: any , stop: any , color: any , objs: any) { //画刻度

        let textStyle = {};
        let text: any = {};
        let line: any = null;
        let vertices: any = null;
        // label x axis:
        textStyle = {align: textAlign.center, font: 'Italic 100px "Times New Roman"', fillStyle: '#000000',
            antialias: true};
        for (let i = start; i <= stop; i = i + stepSize) {
            if (i === 0) {
                text = new SpriteText2D('O', textStyle);
                text.position.x = i - 22;
                text.position.y = 0;
                objs.add(text);
                text.scale.set(0.5, 0.5 , 0.5);
            }

            vertices = [];

            vertices.push(new THREE.Vector3(i , 0 , 0 ));
            vertices.push(new THREE.Vector3(i, 10 , 0));

            line = this.createLineMesh(vertices, '#000');
            objs.add(line);
        }
        textStyle = {align: textAlign.center, font: 'Italic 100px "Times New Roman"', fillStyle: '#000000', antialias: true};
        text = new SpriteText2D('x', textStyle);
        text.position.x = stop + 50;
        text.position.y = -15;
        text.scale.set(0.5, 0.5, 0.5);
        objs.add(text);

        // label y axis:
      //  textStyle = {align: textAlign.center, font: '20px Times New Roman', fillStyle: '#000000', antialias: true};
        for ( let i = start; i <= stop; i = i + stepSize) {
            if (i === 0) { continue; }

            vertices = [];

            vertices.push(new THREE.Vector3(0, i , 0));
            vertices.push(new THREE.Vector3(-10, i , 0));

            line = this.createLineMesh(vertices , '#000');
            objs.add(line);
        }
        text = new SpriteText2D('z', textStyle);
        text.position.x = -15;
        //text.position.y = stop - 50;
        text.position.y = stop + 50;
        text.position.z = 0.2;
        text.scale.set(0.5, 0.5, 0.5);
        objs.add(text);

        for ( let i = start; i <= stop; i = i + stepSize) {
            if (i === 0) {  continue; }
            vertices = [];
            vertices.push(new THREE.Vector3(0 , 10 , i ));
            vertices.push(new THREE.Vector3(0, 0 , i));

            line = this.createLineMesh(vertices, '#000');
            objs.add(line);
        }
        text = new SpriteText2D('y', textStyle);
        text.position.x = 0;
        text.position.y = -15;
        text.position.z = -stop - 50;
        text.scale.set(0.5, 0.5, 0.5);
        objs.add(text);
    }

    createSphere(coordinate: any, radius: any , color: any) {   //创建球
        let x: any;
        let y: any;
        const sphereG = new THREE.SphereGeometry(radius, 15, 15, 0, 2 * Math.PI, 0, 2 * Math.PI);
        const sphereM = new THREE.MeshBasicMaterial({color: color});
        const sphere = new THREE.Mesh(sphereG, sphereM) ;
        x = coordinate[0];
        y = coordinate[1];
        sphere.position.x = x;
        sphere.position.y = y + 10;
        sphere.position.z = coordinate[2];
        sphere.scale.x = 0.6;
        sphere.scale.y = 0.6;
        sphere.scale.z = 0.6;

        return sphere;
    }

     createPlane(width: any , height: any , color: any) {  //创建面
        const obj = new THREE.PlaneGeometry(width , height);
        const material = new THREE.MeshBasicMaterial({color: color, opacity: 0.6, transparent: true , side: THREE.DoubleSide});
        const mesh = new THREE.Mesh(obj , material);
        // mesh.position.x = -0.5;
        return mesh;
    }

    initPointP() { //初始化P点
        this.ponitP = this.createSphere(this.changePoint, 15, 0x3396C8);
        return this.ponitP;
    }

    layoutPointAndText (pointP: any , textP: any) { //布局文字和点
        pointP.position.x = this.changePoint[0];
        pointP.position.y = this.changePoint[2];
        pointP.position.z = -this.changePoint[1];

        textP.text = 'P(' + (this.changePoint[0] / 50).toFixed(0) + ' , ' +
            (this.changePoint[1] / 50).toFixed(0) + ' , ' + (this.changePoint[2] / 50).toFixed(0) + ')';

        textP.position.x = this.changePoint[0];
        textP.position.y =  this.changePoint[2] + 60;
        textP.position.z = -this.changePoint[1];
    }

    createFuzhuLines (objs5: any , screen: any) {  //  //创建辅助线
        if (objs5 !== null) {
            screen.remove(objs5);
        }
        objs5 = new THREE.Group();
        let vertices = []; //存放辅助线的开始点和结束点
        vertices.push(new THREE.Vector3(this.changePoint[0] , this.changePoint[2] , -this.changePoint[1]));
        vertices.push(new THREE.Vector3(this.changePoint[0], 0 , -this.changePoint[1]));
        let line = this.createDashLineMesh(vertices, '#000');
        objs5.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(this.changePoint[0], this.changePoint[2], - this.changePoint[1]));
        vertices.push(new THREE.Vector3(this.changePoint[0], this.changePoint[2], 0));
        line = this.createDashLineMesh(vertices, '#000');
        objs5.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(this.changePoint[0], this.changePoint[2] , -this.changePoint[1]));
        vertices.push(new THREE.Vector3(0, this.changePoint[2] , - this.changePoint[1]));
        line = this.createDashLineMesh(vertices, '#000');
        objs5.add(line);
       return objs5;
    }

    productRandomPoint () {     //生成随机点
        let i;
        let array = [];
        this.count++;

        let num = Math.floor(Math.random() * this.nowSignStart.length);
        array = this.nowSignStart[num];
        this.nowSignStart.splice(num, 1);

        for (i = 0; i < 3 ; i++) {
            num = Math.random() * 10;
            if (array[i] === 1) {
                this.changePoint[i] = num * 50;
            } else {
                this.changePoint[i] = - num * 50;
            }
        }
        if ( this.count > 8) {
            this.count = 1;
            this.nowSignStart = [];
            for ( i = 0; i < this.signStart.length; i ++) {
                array = [this.signStart[i][0] , this.signStart[i][1], this.signStart[i][2]];
               this. nowSignStart.push(array);
            }
        }
    }

}


