import * as THREE from 'three';
import {TweenMax} from 'gsap';
import {SpreadAnimationHelper} from './SpreadAnimationHelper';

export class SpreadAnimation {

    private animation: any = [];

    private tween = {
        // 侧面旋转角度
        angle: 0,
        // 上底面旋转角度
        topPlanAngle: 0
    };

    private planGroup = new THREE.Object3D();

    constructor() {

    }

    // 画旋转中心点
    addRotationCenterPoint(option: SpreadAnimationOption) {
        option.lineColor = !option.lineColor ?  '#4A90E2' : option.lineColor;
        option.planColor = !option.planColor ?  '#CFEAF8' : option.planColor;
        option.animationTime = !option.animationTime ?  3 : option.animationTime;

        const topRadius = option.topRadius;
        const bottomRadius = option.bottomRadius;
        const height = option.height;
        const segment = option.segment;
        const lineColor = option.lineColor;
        const planColor = option.planColor;

        // 旋转中心点宽度
        const width = 0.01;
        // 旋转中心点高度
        const height2 = 0.01;
        // 旋转中心点数组
        const rotationPoint: any = [];

        const geometry = new THREE.PlaneBufferGeometry( width, height2, 32 );
        const material = new THREE.MeshBasicMaterial( {color:  '#4A90E2', side:  THREE.DoubleSide, transparent: true, opacity: 0.01} );

        // 初始旋转角度
        let startAngle = Math.acos((bottomRadius - topRadius) / height) - Math.PI / 2;
        if ((bottomRadius - topRadius) > height) {
            startAngle = -Math.PI / 2;
        }

        const plan = [];
        const planFrame = [];
        for (let i = 0; i < segment; i++) {
            plan[i] = this.createPlan(topRadius, bottomRadius, height, segment, planColor);
            planFrame[i] = this.createFrame(topRadius, bottomRadius, height, segment, lineColor);

            plan[i].add(planFrame[i][0]);
            plan[i].add(planFrame[i][1]);

        }


        for (let i = 0; i < segment; i++) {
            // 创建多个旋转中心点
            rotationPoint[i] = new THREE.Mesh( geometry, material);

            // 调整初始角度
            rotationPoint[i].rotation.y = 2 * Math.PI * i / segment;
            rotationPoint[i].rotateOnAxis(new THREE.Vector3(0.1, 0, 0).normalize(), startAngle);

            // 调整初始位置
            rotationPoint[i].position.z = Math.cos(2 * Math.PI * i / segment) * bottomRadius;
            rotationPoint[i].position.x = Math.sin(2 * Math.PI * i / segment) * bottomRadius;
            rotationPoint[i].position.y = -height / 2;

            // 添加面到旋转中心点上
            rotationPoint[i].add(plan[i]);

            this.planGroup.add(rotationPoint[i]);
        }

        // 内角和
        const innerCorner = (segment - 2) * Math.PI;
        // 一个角的大小
        const oneInnerCorner = innerCorner / segment;

        // 创建上底面旋转点
        const topRotationPoint = new THREE.Mesh( geometry, material);
        const topPlan = this.createTopSurface(topRadius, height, segment, planColor, lineColor);
        topPlan.rotation.y = -oneInnerCorner / 2 * (segment % 2);
        topPlan.rotation.x = -Math.PI / 2 - startAngle;
        topPlan.position.y = topRadius - (bottomRadius - topRadius) / 2;
        if (bottomRadius === topRadius) {
            topPlan.position.z = height / 2;
        } else {
            topPlan.position.z = height / 2 + topRadius / 10;
        }


        topRotationPoint.add(topPlan);
        this.planGroup.add(topRotationPoint);
        // 设置初始与xz轴水平
        topRotationPoint.rotateOnAxis(new THREE.Vector3(0.1, 0, 0).normalize(),  -Math.PI / 2 );

        // 设置上底面旋转点y轴高度
        topRotationPoint.position.y = height / 2;
        plan[0].add(topRotationPoint);

        if (topRadius === 0) {
            topRotationPoint.visible = false;
        }

        // 创建下底面
        const bottomPlan = this.createBottomSurface(bottomRadius, segment, planColor, lineColor);
        this.planGroup.add(bottomPlan);
        bottomPlan.rotation.x = -Math.PI / 2;
        bottomPlan.rotation.z = -oneInnerCorner / 2;

        bottomPlan.position.y = -height / 2;


        // 旋转动画
        setTimeout(() => {
            this.createAnimation(startAngle, segment, rotationPoint, topRotationPoint, option.animationTime);
        }, 200);


        return this.planGroup;
    }

    private createAnimation(startAngle: number, pointNumber: number, rotationPoint: any, topRotationPoint: any, duration: number) {
        // 侧面展开角度
        let lastAngle = 0;
        let newAngle = 0;

        // 上底面展开角度
        let lastTopAngle = 0;
        let newTopAngle = 0;

        // 旋转动画
        this.animation = TweenMax.to(this.tween, duration, {
            angle: Math.PI / 2 - startAngle,
            topPlanAngle: Math.PI / 2 + startAngle,
            onUpdate: () => {
                newAngle = this.tween.angle;
                newTopAngle = this.tween.topPlanAngle;

                for (let i = 0; i < pointNumber; i++) {
                    rotationPoint[i].rotateOnAxis(new THREE.Vector3(0.1, 0, 0).normalize(), newAngle - lastAngle);
                }

                topRotationPoint.rotateOnAxis(new THREE.Vector3(0.1, 0, 0).normalize(), newTopAngle - lastTopAngle);

                lastTopAngle = newTopAngle;
                lastAngle = newAngle;
            },
            paused: true
        });
    }

    private createPlan(topRadius: number, bottomRadius: number, height: number, segment: number, color: any): THREE.Mesh {
        const cubeGeometry = new THREE.Geometry();

        // 内角和
        const innerCorner = (segment - 2) * Math.PI;
        // 一个角的大小
        const oneInnerCorner = innerCorner / segment;

        // 上底边宽度
        const topWidth = topRadius / Math.tan(oneInnerCorner / 2) * 2;
        // 下底边宽度
        const bottomWidth = bottomRadius / Math.tan(oneInnerCorner / 2) * 2;

        const vertices = [
            new THREE.Vector3(topWidth / 2, height / 2, 0),
            new THREE.Vector3(-topWidth / 2, height / 2, 0),
            new THREE.Vector3(-bottomWidth / 2, -height / 2, 0),
            new THREE.Vector3(bottomWidth / 2, -height / 2, 0),
        ];

        cubeGeometry.vertices = vertices;

        const faces = [
            new THREE.Face3(0, 1, 2),
            new THREE.Face3(0, 2, 3),
        ];
        cubeGeometry.faces = faces;

        //生成法向量
        cubeGeometry.computeFaceNormals();

        const materialSphFill = new THREE.MeshPhongMaterial({color : color, specular: '#ffffff', shininess: 30,
            side: THREE.DoubleSide});
        const cubeMaterial = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide} );

        const plan = new THREE.Mesh(cubeGeometry, materialSphFill);

        plan.position.y = height / 2;

        return plan;
    }

    private createBottomSurface(radius: number, segment: number, planColor: any, lineColor: any): THREE.Mesh {
        // 内角和
        const innerCorner = (segment - 2) * Math.PI;
        // 一个角的大小
        const oneInnerCorner = innerCorner / segment;

        const r = radius / Math.sin(oneInnerCorner / 2);
        const geometry = new THREE.CircleBufferGeometry( r, segment );

        const materialSphFill = new THREE.MeshPhongMaterial({color : planColor, specular: '#ffffff', shininess: 30,
            side: THREE.DoubleSide});
        // const material = new THREE.MeshBasicMaterial( { color: planColor, side: THREE.DoubleSide, } );

        const circle = new THREE.Mesh( geometry, materialSphFill );
        console.log('---------------------', circle);

        circle.position.y = radius;
        if (radius !== 0) {
            const edges    = new THREE.EdgesGeometry(geometry, 1);
            const line     = new THREE.LineSegments( edges,  new THREE.LineBasicMaterial(  { color:  lineColor} ) );
            circle.add(line);
        }

        return circle;
    }

    private createTopSurface(topRadius: number, height: number, segment: number, planColor: any, lineColor: any) {
        const cubeGeometry = new THREE.Geometry();

        // 内角和
        const innerCorner = (segment - 2) * Math.PI;
        // 一个角的大小
        const oneInnerCorner = innerCorner / segment;

        const r = topRadius / Math.sin(oneInnerCorner / 2);
        const vertices = [];
        let angle = Math.PI / 2 - Math.PI / segment;
        let x;
        let z;
        for (let i = 0; i < segment; i++) {
            x = Math.sin(angle) * r;
            z = Math.cos(angle) * r;
            vertices[i] = new THREE.Vector3(x, height / 2, z);

            angle += Math.PI * 2 / segment;
        }

        cubeGeometry.vertices = vertices;

        const faces = [];
        for (let i = 0; i < segment - 2; i++) {
            faces[i] = new THREE.Face3(0, i + 1, i + 2);
        }


        cubeGeometry.faces = faces;

        //生成法向量
        cubeGeometry.computeFaceNormals();

        const materialSphFill = new THREE.MeshPhongMaterial({color : planColor, specular: '#ffffff', shininess: 30,
            side: THREE.DoubleSide});
        // const cubeMaterial = new THREE.MeshBasicMaterial( {color: planColor, side: THREE.DoubleSide} );
        const plan = new THREE.Mesh(cubeGeometry, materialSphFill);
        const lineHelper = new SpreadAnimationHelper();
        const line = lineHelper.createLine(vertices, lineColor);
        plan.add(line[0]);
        plan.add(line[1]);

        return plan;
    }

    // 画边框
    private createFrame(topRadius: number, bottomRadius: number, height: number, segment: number, color: any) {
        // 内角和
        const innerCorner = (segment - 2) * Math.PI;
        // 一个角的大小
        const oneInnerCorner = innerCorner / segment;

        // 上底边宽度
        const topWidth = topRadius / Math.tan(oneInnerCorner / 2) * 2;
        // 下底边宽度
        const bottomWidth = bottomRadius / Math.tan(oneInnerCorner / 2) * 2;

        // 画边框用的点
        const vertices2 = [
            new THREE.Vector3(topWidth / 2, height / 2 , 0),
            new THREE.Vector3(-topWidth / 2, height / 2 , 0),
            new THREE.Vector3(-bottomWidth / 2, -height / 2 , 0),
            new THREE.Vector3(bottomWidth / 2, -height / 2 , 0),
        ];
        const lineHelper = new SpreadAnimationHelper();
        const obj = lineHelper.createLine(vertices2, color);

        return obj;
    }

    // 开始动画
    startAnimation() {
        this.animation.play();
    }

    // 反转动画
    reverseAnimation() {
        this.animation.reverse();
    }

    // 重置动画
    resetAnimation() {
        this.animation.progress(0);
        this.animation.pause();
    }
}

class SpreadAnimationOption {
    // 上底面半径（旋转中心点的半径）
    topRadius: number;
    // 下底面半径（旋转中心点的半径）
    bottomRadius: number;
    // 模型的额高度
    height: number;
    // 模型的底面边数
    segment: number;
    // 线框的颜色
    lineColor?: any;
    // 模型的颜色
    planColor?: any;
    // 动画持续时间
    animationTime?: number;
}


