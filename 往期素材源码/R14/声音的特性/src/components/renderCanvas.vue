<template>
    <div class="renderCanvas" id="renderCanvas" ref="renderCanvas">
    </div>
</template>
<script>
/* global THREE:true */
import common from '../assets/js/common.js';
import Bus from '../assets/js/bus.js';
export default {
    props: {},
    data() {
        return {
            curIndex: 6,
            isPlay: false
        }
    },
    created() {},
    watch: {
        // 当前音频
        curIndex(val) {
            Bus.$emit('changeSound', val);
            this.scaleX = 1 / (6 - val);
            this.comObj.curve.scale.set(this.scaleX, 1 + this.scaleY, 1);
            this.comObj.touchImgB.position.x = this.scaleX * 90;
            this.sliderXHandle(val * 30 + 30);
        }
    },
    mounted() {
        // 变量
        this.comObj = {};
        this.comObj.switch = false;
        this.scaleY = 0;
        this.scaleX = 1;
        this.count = 0;
        this.range = 1;
        this.waveInterval = 300;
        this.redMouseImg = new THREE.TextureLoader().load(require('../assets/img/redmouse.png'));
        this.greenMouseImg = new THREE.TextureLoader().load(require('../assets/img/greenmouse.png'));
        let renderCanvas = this.$refs.renderCanvas;
        this.width = renderCanvas.getBoundingClientRect().width;
        this.height = renderCanvas.getBoundingClientRect().height;
        this.left = renderCanvas.getBoundingClientRect().left;
        this.top = renderCanvas.getBoundingClientRect().top;
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 1, 10000);
        this.camera.position.set(0, 0, 800);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(this.width, this.height);
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate = false;
        this.controls.enablePan = false;
        this.controls.minDistance = 500;
        this.controls.maxDistance = 900;
        this.scene.add(this.camera);
        renderCanvas.appendChild(this.renderer.domElement);
        this.selectobjs = [];
        this.selectobj = null;
        this.raycaster = new THREE.Raycaster();
        this.plane = new THREE.Plane();
        this.offset = new THREE.Vector3();
        this.intersection = new THREE.Vector3();
        this.mouse = new THREE.Vector2();
        this.INTERSECTED = null;
        this.mousedownflag = false;
        this.init();
        this.animate();
        this.renderer.domElement.addEventListener('mousedown', this.onDocumentMouseDown, false);
        this.renderer.domElement.addEventListener('touchstart', this.onDocumentTouchStart, false);
        Bus.$on('reset', this.reset);
        Bus.$on('hiddenTip', this.hiddenTip);
        window.addEventListener('resize', this.resize);
    },
    methods: {
        // 初始化场景
        init() {
            this.comObj.axis = this.drawAxis();
            this.scene.add(this.comObj.axis);
            // 曲线
            let pointArr = [];
            for (let i = 0; i <= 1080; i += 4) {
                pointArr.push(i, Math.sin(common.radian(i)) * 100, -2);
            }
            this.comObj.curve = common.createLineMesh(pointArr, {
                color: '#F32D17',
                width: 3
            });
            this.scene.add(this.comObj.curve);
            // 横向滑条
            this.comObj.touchImgA = common.createImg([180, 0, 1], 60, 30, require('../assets/img/arrow.png'));
            this.comObj.touchImgA.name = 'A';
            // 纵向滑条
            this.comObj.touchImgB = common.createImg([90, 100, 1], 60, 30, require('../assets/img/arrow.png'));
            this.comObj.touchImgB.rotation.z = Math.PI / 2;
            this.comObj.touchImgB.name = 'B';
            this.selectobjs.push(this.comObj.touchImgA, this.comObj.touchImgB);
            this.scene.add(this.comObj.touchImgA, this.comObj.touchImgB);
            // 遮住曲线的plane
            this.comObj.maskPlane = common.createPlane(1000, 500, {
                color: '#fff'
            });
            this.comObj.maskPlane.position.set(681, 0, -1);
            this.scene.add(this.comObj.maskPlane);
            // 喇叭
            this.comObj.trumpet = common.createImg([-300, 0, 0], 125, 125, require('../assets/img/trumpet.png'));
            this.comObj.trumpet.name = 'trumpet';
            this.selectobjs.push(this.comObj.trumpet);
            // 喇叭口
            this.comObj.trumpetMouse = common.createImg([-298, 0, 1], 20, 41, require('../assets/img/redmouse.png'))
            this.scene.add(this.comObj.trumpet, this.comObj.trumpetMouse);
            this.drawWave();
            // tip
            this.comObj.tip = common.createImg([-298, 100, 1], 256, 64, require('../assets/img/tip1.png'));
            this.scene.add(this.comObj.tip);
            this.moveHandle('A', 150, 0);
        },
        hiddenTip() {
            setTimeout(() => {
                this.scene.remove(this.comObj.tip);
            }, 3000);
        },
        // 坐标轴
        drawAxis() {
            let group = new THREE.Group();
            let line = common.createLineMesh([-50, 0, 0, 300, 0, 0]);
            group.add(line);
            line = common.createLineMesh([0, 200, 0, 0, -200, 0]);
            group.add(line);
            line = common.createLineMesh([180, 200, 0, 180, -200, 0], {
                color: '#696969',
                style: 2
            });
            group.add(line);
            let shape = new THREE.Shape();
            shape.moveTo(0, 6);
            shape.lineTo(-4, -6);
            shape.lineTo(4, -6);
            shape.lineTo(0, 6);
            let triangleG = new THREE.ShapeGeometry(shape);
            let triangleM = new THREE.MeshBasicMaterial({
                color: 0x000000
            });
            let triangle = new THREE.Mesh(triangleG, triangleM);
            let triangleC = triangle.clone();
            triangle.position.y = 205;
            triangleC.position.x = 305;
            triangleC.rotation.z = -Math.PI / 2;
            group.add(triangle, triangleC);
            return group;
        },
        // 创建声波
        drawWave() {
            this.waveArr = [];
            let wave = null;
            for (let i = 1; i < 4; i++) {
                wave = common.createImg([-200 + (i - 1) * 30, 0, 0], 60, 120, require(`../assets/img/wave${i}.png`));
                wave.visible = false;
                this.waveArr.push(wave);
            }
            this.scene.add(...this.waveArr);
        },
        // 声波动画
        waveAni() {
            let num = 0;
            let thiz = this;

            function show() {
                num++;
                num = num % 4;
                if (num === 0) {
                    thiz.waveArr.forEach((value) => {
                        value.visible = false;
                    })
                } else {
                    thiz.waveArr[num - 1].visible = true;
                }
                thiz.comObj.waveTimer = setTimeout(show, thiz.waveInterval);
            }
            show();
        },
        // 喇叭口震动幅度频率动画
        trumpetMouseAni() {
            let isOpen = false;
            let thiz = this;

            function shake() {
                isOpen = !isOpen;
                thiz.comObj.trumpetMouse.position.x = isOpen ? -298 : -298 + thiz.range;
                thiz.comObj.trumpetMouseTimer = setTimeout(shake, thiz.waveInterval - 30);
            }
            shake();
        },
        // 移动场景滑条操作
        moveHandle(name, x, y) {
            if (name === 'A') {
                x = x > 30 ? x > 180 ? 180 : x : 30;
                this.comObj.touchImgA.position.x = x;
                this.curIndex = Math.floor((x - 15) / 30);
            } else if (name === 'B') {
                y = y > 50 ? y > 150 ? 150 : y : 50;
                this.comObj.touchImgB.position.y = y;
                this.scaleY = (y - 100) / 100;
                this.comObj.curve.scale.set(this.scaleX, 1 + this.scaleY, 1);
                this.sliderYHandle(y);
                Bus.$emit('changeVolume', y);
            }
        },
        sliderXHandle(x) {
            this.waveInterval = x * 2 + 30;
        },
        sliderYHandle(y) {
            this.range = 3 / 100 * (y - 100) + 1;
        },
        // 处理喇叭点击
        trumpetHandleClick(isOpen) {
            if (isOpen) {
                this.comObj.trumpetMouse.material.map = this.greenMouseImg;
                this.waveAni();
                this.trumpetMouseAni();
            } else {
                clearTimeout(this.comObj.waveTimer);
                clearTimeout(this.comObj.trumpetMouseTimer);
                this.comObj.trumpetMouse.position.x = -298;
                this.waveArr.forEach((value) => {
                    value.visible = false;
                })
                this.comObj.trumpetMouse.material.map = this.redMouseImg;
            }
        },
        // three渲染
        animate() {
            requestAnimationFrame(this.animate);
            if (this.count) {
                this.count = ++this.count % 2;
                return;
            } else {
                this.count++;
            }
            this.renderer.clear();
            this.renderer.render(this.scene, this.camera);
        },
        onDocumentMouseDown(event) {
            event.preventDefault();
            let mouse = {};
            mouse.x = ((event.clientX - this.left) / this.width) * 2 - 1;
            mouse.y = -((event.clientY - this.top) / this.height) * 2 + 1;
            this.mousedownHandle(mouse);
        },
        onDocumentTouchStart(event) {
            event.preventDefault();
            let mouse = {};
            mouse.x = ((event.touches[0].pageX - this.left) / this.width) * 2 - 1;
            mouse.y = -((event.touches[0].pageY - this.top) / this.height) * 2 + 1;
            this.mousedownHandle(mouse);
        },
        onDocumentMouseMove(event) {
            event.preventDefault();
            let mouse = {};
            mouse.x = ((event.clientX - this.left) / this.width) * 2 - 1;
            mouse.y = -((event.clientY - this.top) / this.height) * 2 + 1;
            this.mouseMoveHandle(mouse);
        },
        onDocumentTouchMove(event) {
            event.preventDefault();
            let mouse = {};
            mouse.x = ((event.touches[0].pageX - this.left) / this.width) * 2 - 1;
            mouse.y = -((event.touches[0].pageY - this.top) / this.height) * 2 + 1;
            this.mouseMoveHandle(mouse);
        },
        onDocumentMouseUp(event) {
            event.preventDefault();
            this.mousedownflag = false;
            this.selectobj = null;
            // this.comObj.touchImgA.position.x = this.curIndex * 30 + 30;
            this.renderer.domElement.removeEventListener('mousemove', this.onDocumentMouseMove);
            window.removeEventListener('mouseup', this.onDocumentMouseUp);
            this.renderer.domElement.removeEventListener('touchmove', this.onDocumentTouchMove);
            this.renderer.domElement.removeEventListener('touchend', this.onDocumentMouseUp);
        },
        mousedownHandle(mouse) {
            this.raycaster.setFromCamera(mouse, this.camera);
            let intersects = this.raycaster.intersectObjects(this.selectobjs);
            if (intersects.length > 0) {
                this.selectobj = intersects[0].object;
                if (this.selectobj.name === 'trumpet') {
                    this.comObj.switch = !this.comObj.switch;
                    this.isPlay = this.comObj.switch;
                    this.trumpetHandleClick(this.comObj.switch);
                    Bus.$emit('openSound', this.comObj.switch, true);
                } else {
                    this.mousedownflag = true;
                    this.renderer.domElement.addEventListener('mousemove', this.onDocumentMouseMove, false);
                    window.addEventListener('mouseup', this.onDocumentMouseUp, false);
                    this.renderer.domElement.addEventListener('touchmove', this.onDocumentTouchMove, false);
                    this.renderer.domElement.addEventListener('touchend', this.onDocumentMouseUp, false);
                }
            }
        },
        mouseMoveHandle(mouse) {
            this.raycaster.setFromCamera(mouse, this.camera);
            let intersects = this.raycaster.intersectObjects(this.selectobjs);
            if (intersects.length > 0) {
                if (this.INTERSECTED !== intersects[0].object) {
                    this.INTERSECTED = intersects[0].object;
                    this.plane.setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(this.plane.normal), this.INTERSECTED.position);
                }
            }
            if (this.mousedownflag) {
                if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)) {
                    let obj = this.intersection.sub(this.offset),
                        x, y;
                    x = obj.x;
                    y = obj.y;
                    this.moveHandle(this.selectobj.name, x, y);
                }
            }
        },
        // 重置
        reset() {
            this.moveHandle('A', 150, 0);
            this.moveHandle('B', 150, 100);
            this.comObj.switch = false;
            Bus.$emit('openSound', this.comObj.switch, this.isPlay);
            this.isPlay = false;
            this.trumpetHandleClick(false);
            this.camera.position.set(0, 0, 800);
            this.camera.lookAt(0, 0, 0);
        },
        resize() {
            let renderCanvas = this.$refs.renderCanvas;
            if (renderCanvas) {
                this.width = renderCanvas.getBoundingClientRect().width;
                this.height = renderCanvas.getBoundingClientRect().height;
                this.camera.aspect = this.width / this.height;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(this.width, this.height);
            }
        }
    }
}

</script>
<style scoped>
div {}

</style>
