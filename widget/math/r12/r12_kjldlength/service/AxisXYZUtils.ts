
import * as THREE from 'three';
import { SpriteText2D, textAlign } from 'three-text2d';
import {DashLine} from './DashLine';

export  class AxisXYZUtils {
    private dashLine = new DashLine();

    changePoint1: Array<any> = [100, 100 , 0];
    changePoint2: Array<any> = [300, 300 , 300];
    ponitP: any;
 //   arrayStart: Array<any> = [ 100, 100 , 0];
    signStart1: Array<any> = [[1, 1 , 1 ] , [ 1 , 1 , 0], [ 1 , 0, 1], [1, 0 , 0], [ 0, 1, 1], [0, 1 , 0], [0, 0 , 1], [ 0, 0 , 0]];
    nowSignStart: Array<any> = [[ 1, 1 , 0] , [1, 0 , 1], [ 1, 0 , 0], [ 0, 1 , 1], [ 0, 1 , 0], [ 0, 0 , 1], [ 0, 0 , 0]];
    nowSignStart1 = [[1, 1 , 0], [1, 0, 1], [1, 0, 0], [0, 1, 1], [0, 1, 0], [0, 0, 1], [0, 0, 0]];

    signStart2 = [[1, 1 , 1], [1, 1 , 0], [1, 0, 1], [1, 0, 0] , [0, 1, 1], [0, 1, 0], [0, 0, 1], [0, 0, 0]];
    nowSignStart2 = [[1, 1, 0], [1, 0, 1], [1, 0, 0], [0, 1, 1], [0, 1, 0], [0, 0, 1], [0, 0, 0]];
    public count1 = 2;
    public count2 = 2;


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
        lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color  }));

        return lineMesh;
    }

    createLine(vertices: any , color: any) {
        let lineMesh: any;
        lineMesh = this.dashLine.addLine(vertices[0], vertices[1], color, 6, false);
        return lineMesh;
    }

    createDashLineMesh (vertices: any , color: any) {  //创建虚线
        let lineDashMesh: any;
        const geometryLine: any = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        geometryLine.vertices = vertices;
        // lineDashMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
        //     color: color,
        //     transparent: true,
        //     opacity: 0.8,
        //     // scale: 2,
        //     dashSize: 10,
        //     gapSize: 10,
        // }));
        // lineDashMesh.polygonOffset = true;
        // lineDashMesh.polygonOffsetFactor = -0.5;
       //  lineDashMesh.side = THREE.FrontSide; //只显示外面
       // lineDashMesh.computeLineDistances();
        lineDashMesh = this.dashLine.addLine(vertices[0], vertices[1], color, 3, true);
        return lineDashMesh;
    }

    labelAxis(start: any , stepSize: any , stop: any , color: any , objs: any) {     //画刻度

        let textStyle = {};
        let text: any = {};
        let line: any = null;
        let vertices: any = null;
        // label x axis:
        textStyle = {align: textAlign.center, font: 'Italic 100px "Times New Roman"', fillStyle: '#000000', antialias: true};
        for (let i = start; i <= stop; i = i + stepSize) {
            if (i === 0) {
                text = new SpriteText2D('O', textStyle);
                text.position.x = i - 20;
                text.position.y = 0;
                text.scale.set(0.5, 0.5 , 0.5);
                objs.add(text);
            }

            vertices = [];

            vertices.push(new THREE.Vector3(i , 0 , 0 ));
            vertices.push(new THREE.Vector3(i, 10 , 0));

            line = this.createLineMesh(vertices, '#000');
            objs.add(line);
        }
        // textStyle = {align: textAlign.center, font: 'Italic 48px "Times New Roman"', fillStyle: '#000000', antialias: true};
        // text = new SpriteText2D('x', textStyle);
        // text.scale.set(0.5, 0.5 , 0.5);
        // text.position.x = stop + 50;
        // text.position.y = -15;
        // objs.add(text);

        // label y axis:
       // textStyle = {align: textAlign.center, font: '24px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for ( let i = start; i <= stop; i = i + stepSize) {
            if (i === 0) { continue; }

            vertices = [];

            vertices.push(new THREE.Vector3(0, i , 0));
            vertices.push(new THREE.Vector3(-10, i , 0));

            line = this.createLineMesh(vertices , '#000');
            objs.add(line);
        }
        // text = new SpriteText2D('z', textStyle);
        // text.position.x = -15;
        // //text.position.y = stop - 50;
        // text.position.y = stop + 50;
        // text.position.z = 0.2;
        // text.scale.set(0.5, 0.5 , 0.5);
        // objs.add(text);

        for ( let i = start; i <= stop; i = i + stepSize) {
            if (i === 0) {  continue; }
            vertices = [];
            vertices.push(new THREE.Vector3(0 , 10 , i ));
            vertices.push(new THREE.Vector3(0, 0 , i));

            line = this.createLineMesh(vertices, '#000');
            objs.add(line);
        }
        // text = new SpriteText2D('y', textStyle);
        // text.position.x = 0;
        // text.position.y = -15;
        // text.position.z = -stop - 50;
        // text.scale.set(0.5, 0.5 , 0.5);
        // objs.add(text);
    }


    createSphere(coordinate: any, radius: any , color: any) {    //创建球
        let x: any;
        let y: any;
        const sphereG = new THREE.SphereGeometry(radius, 15, 15, 0, 2 * Math.PI, 0, 2 * Math.PI);
        const sphereM = new THREE.MeshBasicMaterial({color: color});
        const sphere = new THREE.Mesh(sphereG, sphereM) ;
        x = coordinate[0];
        y = coordinate[1];
        sphere.position.x = x;
        sphere.position.y = y;
        sphere.position.z = coordinate[2];
        sphere.scale.x = 0.8;
        sphere.scale.y = 0.8;
        sphere.scale.z = 0.8;

        return sphere;
    }


    //  createPlane(width: any , height: any , color: any) { //创建面
    //     // var mesh = new THREE.Group();
    //     // var i,line=null,vertices=[];
    //     // for(i=-width/2;i<=width/2;){
    //     //     vertices=[];
    //     //     vertices.push(new THREE.Vector3(i,height/2,0));
    //     //     vertices.push(new THREE.Vector3(i,-height/2,0));
    //     //     line = createLineMesh(vertices,color,2);
    //     //     mesh.add(line);
    //     //     i=i+100;
    //     // }
    //     //
    //     // for(i=-height/2;i<=height/2;){
    //     //     vertices=[];
    //     //     vertices.push(new THREE.Vector3(width/2,i,0));
    //     //     vertices.push(new THREE.Vector3(-width/2,i,0));
    //     //     line = createLineMesh(vertices,color,2);
    //     //     mesh.add(line);
    //     //     i=i+100;
    //     // }
    //     const obj = new THREE.PlaneGeometry(width , height);
    //     const material = new THREE.MeshBasicMaterial({color: color, opacity: 0.8, transparent: true , side: THREE.DoubleSide});
    //     const mesh = new THREE.Mesh(obj , material);
    //     // mesh.scale.x = 0.5;
    //     //  mesh.scale.y = 0.5;
    //     //  mesh.scale.z = 0.5;
    //     return mesh;
    // }

    initPointP(value: any) {  //初始化点
        if (value === 'M') {  // M点
            this.ponitP = this.createSphere(this.changePoint1, 20, 0x78cdf8);
            return this.ponitP;
        } else {  //N点
            this.ponitP = this.createSphere(this.changePoint2, 20, 0x78cdf8);
            return this.ponitP;
        }

    }

     layoutPointAndText(pointM: any ,  pointN: any,  dotM: any, dotN: any) {  //布局文字和点
         pointM.position.x = this.changePoint1[0];
         pointM.position.y = this.changePoint1[2];
         pointM.position.z = -this.changePoint1[1];

         pointN.position.x = this.changePoint2[0];
         pointN.position.y = this.changePoint2[2];
         pointN.position.z = -this.changePoint2[1];


         dotM.text = '( ' + (this.changePoint1[0] / 50).toFixed(0) + ' , ' +
             '' + (this.changePoint1[1] / 50).toFixed(0) + ' , ' + (this.changePoint1[2] / 50).toFixed(0) + ')';
         dotN.text = '(' + (this.changePoint2[0] / 50).toFixed(0) + ' , '
             + (this.changePoint2[1] / 50).toFixed(0) + ' , ' + (this.changePoint2[2] / 50).toFixed(0) + ')';

         // txtM.text = '( ' + (this.changePoint1[0] / 50).toFixed(0) + ' , ' +
         // '' + (this.changePoint1[1] / 50).toFixed(0) + ' , ' + (this.changePoint1[2] / 50).toFixed(0) + ')';
         // txtN.text = '(' + (this.changePoint2[0] / 50).toFixed(0) + ' , '
         //     + (this.changePoint2[1] / 50).toFixed(0) + ' , ' + (this.changePoint2[2] / 50).toFixed(0) + ')'.toString();

         // textM.position.x = this.changePoint1[0] - 30;
         // textM.position.y =  this.changePoint1[2] + 80;
         // textM.position.z = -this.changePoint1[1] + 0;
         // groupM.position.x = this.changePoint1[0] + 10;
         // groupM.position.y =  this.changePoint1[2] + 40;
         // groupM.position.z = -this.changePoint1[1] + 0;

         // textN.position.x = this.changePoint2[0] + 10;
         // textN.position.y =  this.changePoint2[2] + 80;
         // textN.position.z = -this.changePoint2[1];
         // txtN.position.x = this.changePoint2[0];
         // txtN.position.y =  this.changePoint2[2] + 40;
         // txtN.position.z = -this.changePoint2[1];

         // textN.scale.set(0.1 , 0.1, 0.1);
         // textM.scale.set(0.1 , 0.1, 0.1);
         // if (lineMN != null) {
         //     this.scene.remove(lineMN);
         // }

         // const vertices: Array<any> = [];
         // vertices.push(new THREE.Vector3(this.changePoint1[0], this.changePoint1[2], -this.changePoint1[1]));
         // vertices.push(new THREE.Vector3(this.changePoint2[0], this.changePoint2[2], -this.changePoint2[1]));
         //    const lineMN = this.createLineMesh(vertices, '#000', 3);
         //    return lineMN;
      //   this.scene.add(lineMN);
    }

    createLineMN (lineMN: any, screen: any) { //创建MN线段
        if (lineMN != null) {
            screen.remove(lineMN);
        }
        const vertices: Array<any> = [];
        vertices.push(new THREE.Vector3(this.changePoint1[0], this.changePoint1[2], -this.changePoint1[1]));
        vertices.push(new THREE.Vector3(this.changePoint2[0], this.changePoint2[2], -this.changePoint2[1]));
        lineMN = this.createLine(vertices, '#000');

        return lineMN;
    }

    createFuZhuXian(objs2: any , scene: any ) {    //创建辅助线一
        if (objs2 != null ) {
            scene.remove(objs2);
        }
        objs2 = new THREE.Group();

        const array1: Array<any> = [];
        const array2 = [];
        let  array = [0, 0 , 0];
         let   vertices = [];

        array[0] = this.changePoint1[0];
        array[1] = this.changePoint1[2];
        array[2] = -this.changePoint1[1];
        array1.push(array);
        array = [0, 0 , 0];
        array[0] = this.changePoint2[0];
        array[1] = this.changePoint1[2];
        array[2] = -this.changePoint1[1];
        array1.push(array);
        array = [0 , 0 , 0];
        array[0] = this.changePoint2[0];
        array[1] = this.changePoint2[2];
        array[2] = -this.changePoint1[1];
        array1.push(array);
        array = [0 , 0 , 0];
        array[0] = this.changePoint1[0];
        array[1] = this.changePoint2[2];
        array[2] = -this.changePoint1[1];
        array1.push(array);

        vertices = [];
        vertices.push(new THREE.Vector3(array1[0][0], array1[0][1] , array1[0][2]));
        vertices.push(new THREE.Vector3(array1[1][0], array1[1][1], array1[1][2]));
        let line = this.createDashLineMesh(vertices, '#000');
        objs2.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(array1[1][0], array1[1][1] , array1[1][2]));
        vertices.push(new THREE.Vector3(array1[2][0], array1[2][1] , array1[2][2]));
        line = this.createDashLineMesh(vertices, '#000');
        objs2.add(line);


        vertices = [];
        vertices.push(new THREE.Vector3(array1[2][0], array1[2][1] , array1[2][2]));
        vertices.push(new THREE.Vector3(array1[3][0], array1[3][1] , array1[3][2]));
        line = this.createDashLineMesh(vertices, '#000');
        objs2.add(line);
        //
        vertices = [];
        vertices.push(new THREE.Vector3(array1[0][0], array1[0][1], array1[0][2]));
        vertices.push(new THREE.Vector3(array1[3][0], array1[3][1], array1[3][2]));
        line = this.createDashLineMesh(vertices, '#000');
        objs2.add(line);


        array = [0, 0 , 0];
        array[0] = this.changePoint1[0];
        array[1] = this.changePoint1[2];
        array[2] = -this.changePoint2[1];
        array2.push(array);
        array = [0, 0 , 0];
        array[0] = this.changePoint2[0];
        array[1] = this.changePoint1[2];
        array[2] = -this.changePoint2[1];
        array2.push(array);
        array = [0 , 0 , 0];
        array[0] = this.changePoint2[0];
        array[1] = this.changePoint2[2];
        array[2] = -this.changePoint2[1];
        array2.push(array);
        array = [0 , 0 , 0];
        array[0] = this.changePoint1[0];
        array[1] = this.changePoint2[2];
        array[2] = -this.changePoint2[1];
        array2.push(array);

        vertices = [];
        vertices.push(new THREE.Vector3(array2[0][0], array2[0][1], array2[0][2]));
        vertices.push(new THREE.Vector3(array2[1][0], array2[1][1], array2[1][2]));
        line = this.createDashLineMesh(vertices, '#000');
        objs2.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(array2[1][0], array2[1][1], array2[1][2]));
        vertices.push(new THREE.Vector3(array2[2][0], array2[2][1], array2[2][2]));
        line = this.createDashLineMesh(vertices, '#000');
        objs2.add(line);


        vertices = [];
        vertices.push(new THREE.Vector3(array2[2][0], array2[2][1], array2[2][2]));
        vertices.push(new THREE.Vector3(array2[3][0], array2[3][1], array2[3][2]));
        line = this.createDashLineMesh(vertices, '#000');
        objs2.add(line);
        //
        vertices = [];
        vertices.push(new THREE.Vector3(array2[0][0], array2[0][1], array2[0][2]));
        vertices.push(new THREE.Vector3(array2[3][0], array2[3][1], array2[3][2]));
        line = this.createDashLineMesh(vertices, '#000');
        objs2.add(line);


        vertices = [];
        vertices.push(new THREE.Vector3(array1[0][0], array1[0][1], array1[0][2]));
        vertices.push(new THREE.Vector3(array2[0][0], array2[0][1], array2[0][2]));
        line = this.createDashLineMesh(vertices, '#000');
        objs2.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(array1[1][0], array1[1][1], array1[1][2]));
        vertices.push(new THREE.Vector3(array2[1][0], array2[1][1], array2[1][2]));
        line = this.createDashLineMesh(vertices, '#000');
        objs2.add(line);


        vertices = [];
        vertices.push(new THREE.Vector3(array1[3][0], array1[3][1], array1[3][2]));
        vertices.push(new THREE.Vector3(array2[3][0], array2[3][1], array2[3][2]));
        line = this.createDashLineMesh(vertices, '#000');
        objs2.add(line);
        //
        vertices = [];
        vertices.push(new THREE.Vector3(array1[2][0], array1[2][1], array1[2][2]));
        vertices.push(new THREE.Vector3(array2[2][0], array2[2][1], array2[2][2]));
        line = this.createDashLineMesh(vertices, '#000');
        objs2.add(line);


        return objs2;
    }

    createFuZhuXian2 (objs: any, scene: any) {     //创建辅助线二
        if (objs != null) {
            scene.remove(objs);
        }
        objs = new THREE.Group();

        const array1: Array<any> = [];
        const array2 = [];
        let  array = [0, 0 , 0];
        let   vertices = [];
        let line = null;

        array[0] = this.changePoint1[0];
        array[1] = this.changePoint1[2];
        array[2] = -this.changePoint1[1];
        array1.push(array);
        array = [0, 0 , 0];
        array[0] = this.changePoint2[0];
        array[1] = this.changePoint1[2];
        array[2] = -this.changePoint1[1];
        array1.push(array);
        array = [ 0, 0 , 0];
        array[0] = this.changePoint2[0];
        array[1] = this.changePoint2[2];
        array[2] = -this.changePoint1[1];
        array1.push(array);
        array = [0, 0, 0];
        array[0] = this.changePoint1[0];
        array[1] = this.changePoint2[2];
        array[2] = -this.changePoint1[1];
        array1.push(array);


        array = [0, 0, 0];
        array[0] = this.changePoint1[0];
        array[1] = this.changePoint1[2];
        array[2] = -this.changePoint2[1];
        array2.push(array);
        array = [0, 0, 0];
        array[0] = this.changePoint2[0];
        array[1] = this.changePoint1[2];
        array[2] = -this.changePoint2[1];
        array2.push(array);
        array = [0, 0, 0];
        array[0] = this.changePoint2[0];
        array[1] = this.changePoint2[2];
        array[2] = -this.changePoint2[1];
        array2.push(array);
        array = [0, 0, 0];
        array[0] = this.changePoint1[0];
        array[1] = this.changePoint2[2];
        array[2] = -this.changePoint2[1];
        array2.push(array);


        //创建z轴

        vertices = [];
        vertices.push(new THREE.Vector3(array1[0][0], array1[0][1], array1[0][2]));
        vertices.push(new THREE.Vector3(0, 0, array1[1][2]));
        line = this.createDashLineMesh(vertices, 'red');
        objs.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(array2[2][0], array2[2][1], array2[2][2]));
        vertices.push(new THREE.Vector3(0, 0, array2[1][2]));
        line = this.createDashLineMesh(vertices, 'red');
        objs.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(0, 0, array1[1][2]));
        vertices.push(new THREE.Vector3(0, 0, array2[1][2]));
        line = this.createLineMesh(vertices, 'red');
        objs.add(line);

        //创建x轴
        vertices = [];
        vertices.push(new THREE.Vector3(array2[2][0], array2[2][1], array2[2][2]));
        vertices.push(new THREE.Vector3(array2[2][0], 0, 0));
        line = this.createDashLineMesh(vertices, 'blue');
        objs.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(array1[0][0], array1[0][1], array1[0][2]));
        vertices.push(new THREE.Vector3(array2[3][0], 0, 0));
        line = this.createDashLineMesh(vertices, 'blue');
        objs.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(array2[2][0], 0, 0));
        vertices.push(new THREE.Vector3(array2[3][0], 0, 0));
        line = this.createLineMesh(vertices, 'blue');
        objs.add(line);

        //创建y轴
        vertices = [];

        vertices.push(new THREE.Vector3(array1[0][0], array1[0][1], array1[0][2]));
        vertices.push(new THREE.Vector3(0, array1[1][1], 0));
        line = this.createDashLineMesh(vertices, 'green');
        objs.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(array2[2][0], array2[2][1], array2[2][2]));
        vertices.push(new THREE.Vector3(0, array2[2][1], 0));
        line = this.createDashLineMesh(vertices, 'green');
        objs.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(0, array2[1][1], 0));
        vertices.push(new THREE.Vector3(0, array2[2][1], 0));
        line = this.createLineMesh(vertices, 'green');
        objs.add(line);

        return objs;
    }

    productPointM() {
        let i;
        let array = [];
        this.count1++;

        let num = Math.floor(Math.random() * this.nowSignStart1.length);
        array = this.nowSignStart1[num];
        this.nowSignStart1.splice(num, 1);

        for (i = 0 ; i < 3 ; i++) {
            num = Math.round(Math.random() * 10);
            if (array[i] === 1) {
                this.changePoint1[i] = num * 50;
            } else {
                this.changePoint1[i] = -num * 50;
            }
        }

        if (this.count1 > 8) {
            this.count1 = 1;
            this.nowSignStart1 = [];
            for ( i = 0; i < this.signStart1.length; i++) {
                array = [this.signStart1[i][0], this.signStart1[i][1], this.signStart1[i][2]];
                this.nowSignStart1.push(array);
            }
        }
    }

    productPointN() {
        let i;
        let array = [];
        this.count2++;

        let num = Math.floor(Math.random() * this.nowSignStart2.length);
        array =  this.nowSignStart2[num];
        this.nowSignStart2.splice(num, 1);

        for ( i = 0; i < 3 ; i ++) {
            num = Math.random() * 10;
            if (array[i] === 1) {
                this.changePoint2[i] = num * 50;
            } else {
                this.changePoint2[i] = -num * 50;
            }
        }

        if (this.count2 > 8) {
            this.count2 = 1;
            this.nowSignStart2 = [];
            for ( i = 0; i < this.signStart2.length; i ++) {
                array = [this.signStart2[i][0], this.signStart2[i][1], this.signStart2[i][2]];
                this.nowSignStart2.push(array);
            }
        }
    }

    createXYZText (textCon: any) {
        const textStyle = {align: textAlign.center, font: 'italic 100px "Times New Roman"', fillStyle: '#000000', antialias: true};
        const text = new SpriteText2D(textCon, textStyle);
        return text;
    }
}


