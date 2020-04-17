<template>
    <div class="renderCanvas" id="renderCanvas" ref="renderCanvas"> </div>
</template>
<script>
/* eslint-disable */
/* global THREE:true */
import common from '../assets/js/common.js';
import Bus from '../assets/js/bus.js'
const PEN_H = 30;
const RETINA_POS = 258;
const MIDPOS = 106;
export default {
    props: {},
    data() {
        return {
            radio: 0,
            checked: false
        }
    },
    created() {
        this.line_width = 2;
        this.count = 0;
        this.comObj = {};
        this.concaveImg = new THREE.TextureLoader().load(require('../assets/img/concave.png'));
        this.convexImg = new THREE.TextureLoader().load(require('../assets/img/convex.png'));
        this.limitPos = [
            [-600, -200],
            [-600, -200],
            [-600, -200]
        ];
        this.focusOfIntervals = [
            [-550, -250],
            [-290, -200],
            [-600, -400]
        ]
        this.pen_x = -350;
        this.oldX = this.pen_x
        // 晶状体位置
        this.lentilXPos = 140;
        this.currentLimitPos = this.limitPos[0];
        Bus.$on('sendValue', (index) => {
            this.radioChange(index);
        });
        Bus.$on('checkValue', (bool) => {
            this.checked = bool;
        });
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            this.line_width = 1;
        } else {
            this.line_width = 2;
        }
    },
    watch: {
        radio(index) {
            if (!index) {
                this.comObj.mirrorImg.visible = false;
            } else {
                if (this.checked) {
                    this.comObj.mirrorImg.material.map = this.radio === 1 ? this.concaveImg : this.convexImg;
                }
            }
            this.currentLimitPos = this.limitPos[index];
            if (!this.checked) {
                this.focusOfInterval = index !== 0 ? index === 1 ? this.focusOfIntervals[1] : this.focusOfIntervals[2] : this.focusOfIntervals[0];
            }
            this.movePen(this.comObj.penImg.position.x, 0, this.currentLimitPos);
        },
        checked(bool) {
            if (bool) {
                this.focusOfInterval = this.focusOfIntervals[0]
            } else if (!bool) {
                this.focusOfInterval = this.radio !== 0 ? this.radio === 1 ? this.focusOfIntervals[1] : this.focusOfIntervals[2] : this.focusOfIntervals[0];
            }
            this.comObj.mirrorImg.material.map = this.radio === 1 ? this.concaveImg : this.convexImg;
            this.comObj.mirrorImg.visible = bool;
            this.movePen(this.comObj.penImg.position.x, 0, this.currentLimitPos);
        }
    },
    mounted() {
        let renderCanvas = this.$refs.renderCanvas;
        this.width = renderCanvas.getBoundingClientRect().width;
        this.height = renderCanvas.getBoundingClientRect().height;
        this.left = renderCanvas.getBoundingClientRect().left;
        this.top = renderCanvas.getBoundingClientRect().top;
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.scene = new THREE.Scene();
        this.scene.position.x = 100;
        this.camera = new THREE.PerspectiveCamera(55, this.width / this.height, 1, 10000);
        this.camera.position.set(0, 0, 600);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(this.width, this.height);
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate = false;
        this.controls.enablePan = false;
        this.controls.minDistance = 300;
        this.controls.maxDistance = 800;
        // this.scene.add(this.camera);
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
        this.movePen(this.oldX, 0, this.currentLimitPos);
        window.addEventListener('resize', this.resize);
        Bus.$on('reset', this.reset);
    },
    methods: {
        // 初始化场景
        init() {
            this.focusOfInterval = this.focusOfIntervals[0]
            this.cornea = common.drawCircleLine(40)
            this.hyperopia = common.drawCircleLine(100)
            this.cornea.position.set(140, 0, 1)
            this.hyperopia.position.set(-MIDPOS, 0, 1)
            this.cornea.material.depthTest = true
            this.comObj.eyeImg = common.createImg([200, 0, 0], 200, 200, require('../assets/img/eye.png'));
            this.scene.add(this.comObj.eyeImg);
            this.comObj.lentilImg = common.createImg([140, 0, 1], 25, 100, require('../assets/img/lentil.png'));
            this.scene.add(this.comObj.lentilImg);
            this.comObj.mirrorImg = common.createImg([0, 0, 0], 20, 80, require('../assets/img/convex.png'));
            this.comObj.mirrorImg.visible = false;
            this.scene.add(this.comObj.mirrorImg);
            // 可移动的笔
            this.comObj.penImg = common.createImg([-300, 0, 0], PEN_H / 2, PEN_H * 2, require('../assets/img/pen.png'));
            this.comObj.reversalPenImg = this.comObj.penImg.clone();
            this.comObj.reversalPenImg.rotation.z = Math.PI;
            this.comObj.reversalPenImg.position.set(258, 0, 4);
            this.scene.add(this.comObj.reversalPenImg);
            this.selectobjs.push(this.comObj.penImg);
            this.scene.add(this.comObj.penImg);
            // this.scene.add(this.cornea, this.hyperopia)
        },
        radioChange(index) {
            this.radio = index;
            this.checked = false;
        },
        movePen(x, y, limit) {
            x = x < limit[1] ? x < limit[0] ? limit[0] : x : limit[1];
            this.pen_x = x;
            this.comObj.penImg.position.x = this.pen_x;
            let scaleX = 2 - (0.6 / (limit[1] - limit[0]) * (-this.pen_x + limit[1]) + 0.7);
            let pos = this.scaleLentil(scaleX);
            this.drawLines(this.pen_x, pos);
        },
        //视网膜成像的变化
        changeReversalPen({
            reversalPenH = 0,
            x = 0,
            pos = 0
        } = {}) {
            let posP = 0;
            if (this.radio === 0 || this.checked) {
                this.comObj.reversalPenImg.scale.set(reversalPenH / PEN_H, reversalPenH / PEN_H, reversalPenH / PEN_H);
                this.comObj.reversalPenImg.position.x = pos;
            } else {
                if (x >= this.focusOfInterval[0] && x <= this.focusOfInterval[1]) {
                    posP = this.radio === 2 ? 258 : (258 + (this.focusOfInterval[0] + 150 + 100) / 200 * 10);
                    pos = this.radio === 2 ? pos : (258 + (x + 150) / 200 * 10);
                } else if (x > this.focusOfInterval[1]) {
                    posP = this.radio === 2 ? pos : (258 + (x - 150 + 150 + 100) / 200 * 10);
                    pos = this.radio === 2 ? pos : (258 + (x + 150) / 200 * 10);
                } else {
                    posP = this.radio === 2 ? pos : (258 + (x + 150 + 100) / 200 * 10);
                    pos = this.radio === 2 ? pos : (258 + (x + 150) / 200 * 10);
                }
                this.comObj.reversalPenImg.position.x = posP;
                let scale = PEN_H / (105 - x) * (pos - 105);
                this.comObj.reversalPenImg.scale.set(scale / PEN_H, scale / PEN_H, scale / PEN_H);
            }
        },
        // 缩放晶状体
        scaleLentil(scaleX) {
            if (this.radio == 0) {
                scaleX = scaleX;

            } else if (this.radio == 2) {
                scaleX = scaleX * 0.8;
                scaleX = scaleX<0.7?0.7:scaleX;
            } else if (this.radio == 1) {
                scaleX *= 1.2;
                scaleX = scaleX>1.3?1.3:scaleX;
            }
            this.comObj.lentilImg.scale.set(scaleX, 1, 1);
            let pos = 140 + (scaleX - 1) * 12.5;
            this.comObj.lentilImg.position.x = pos;
            return pos;
        },
        // 创建线段
        drawLines(x, lentilPos) {
            if (this.comObj.lineTop) {
                this.scene.remove(this.comObj.lineTop, this.comObj.lineBottom);
            }
            let posArr1 = [];
            let posArr2 = [];
            let pos = 0
            if (x >= this.focusOfInterval[0] && x <= this.focusOfInterval[1]) {
                pos = RETINA_POS;
            } else if (x > this.focusOfInterval[1]) {
                pos = (this.radio === 2 && !this.checked) ? (RETINA_POS + 10 + (x - 150 + 400) / 150 * 10) : RETINA_POS;
                pos = (this.radio === 0 || this.checked) ? (RETINA_POS + 5 + (x - 200 + 400) / 50 * 5) : pos;
            } else {
                pos = (this.radio === 2 && !this.checked) ? (RETINA_POS + 10 + (x + 400) / 150 * 10) : RETINA_POS;
                pos = (this.radio === 0 || this.checked) ? (RETINA_POS + 5 + (x + 100 + 400) / 50 * 5) : pos;
            }
            let reversalPenH = PEN_H / (105 - x) * (pos - 105);
            if (this.checked) {
                let [refractiveStartY2, refractiveEndY2] = this.calcPosByRefractive([x, PEN_H, 2], [pos, 0, 2], 1.62, 0, 105);
                let [refractiveStartY, refractiveEndY] = this.calcPosByRefractive([0, refractiveStartY2, 2], [pos, 0, 2], 1.37, MIDPOS, lentilPos);
                let [refractiveStartY3, refractiveEndY3] = this.calcPosByRefractive([x, PEN_H, 2], [pos, -reversalPenH, 2], 1.62, 0, MIDPOS);
                let [refractiveStartY1, refractiveEndY1] = this.calcPosByRefractive([x, refractiveStartY3, 2], [pos, -reversalPenH, 2], 1.37, MIDPOS, lentilPos);
                posArr1.push(
                    [x, PEN_H, 1], [0, refractiveStartY2, 1], [MIDPOS, refractiveEndY2, 1], [lentilPos, refractiveStartY, 1], [pos, -reversalPenH, 1], [lentilPos, refractiveEndY1, 1], [MIDPOS, refractiveEndY3, 1], [0, refractiveStartY3, 1], [x, PEN_H, 1]);
                posArr2.push(
                    [x, -PEN_H, 1], [0, -refractiveStartY2, 1], [MIDPOS, -refractiveEndY2, 1], [lentilPos, -refractiveStartY, 1], [pos, reversalPenH, 1], )
            } else {
                let [refractiveStartY, refractiveEndY] = this.calcPosByRefractive([x, PEN_H, 2], [pos, 0, 2], 1.37, MIDPOS, lentilPos);
                let [refractiveStartY1, refractiveEndY1] = this.calcPosByRefractive([x, PEN_H, 2], [pos, -reversalPenH, 2], 1.37, MIDPOS, lentilPos);
                posArr1.push(
                    [x, PEN_H, 1], [MIDPOS, refractiveStartY, 1], [lentilPos, refractiveEndY, 1], [pos, -reversalPenH, 1], [lentilPos, refractiveEndY1, 1], [MIDPOS, refractiveStartY1, 1], [x, PEN_H, 1], );
                posArr2.push(
                    [pos, reversalPenH, 1], [lentilPos, -refractiveEndY, 1], [MIDPOS, -refractiveStartY, 1], [x, -PEN_H, 1])
            }
            // 计算倒立影像的高度
            this.comObj.lineTop = common.createStraightLine([...posArr1], {
                color: '#4A90E2',
                width: this.line_width
            });
            this.comObj.lineBottom = common.createStraightLine([...posArr2], {
                color: '#4A90E2',
                width: this.line_width
            });
            this.scene.add(this.comObj.lineTop, this.comObj.lineBottom);
            this.changeReversalPen({
                reversalPenH,
                x,
                pos
            });
        },
        // 根据折射率计算点的位置
        calcPosByRefractive(startPos, endPos, refractive, refractiveStartX, refractiveEndX) {
            let [x1, y1, z1] = startPos;
            let [x2, y2, z2] = endPos;
            // 求出入射光线的斜率
            let k = (y1 - y2) / (x1 - x2);
            k = Math.round(k * 1000) / 1000
            // 根据斜截式求出b 
            let b = y2 - k * x2;
            // 计算折射点y的坐标
            let refractiveStartY = k * refractiveStartX + b;
            // 求入射弧度
            let rad = Math.atan(k);
            if (refractive === 1.37) {
                let qk = (refractiveStartY) / (refractiveStartX - 145) // 与切线垂直半径斜率
                rad = rad + Math.atan(qk)
            } else if (refractive === 1.62 && this.radio == 1) {
                // 近视
                let qk = (refractiveStartY) / (refractiveStartX + MIDPOS) // 与切线垂直半径斜率
                rad = rad + Math.atan(qk)
            } else if (refractive === 1.62 && this.radio == 2) {
                // 远视
                let qk = (refractiveStartY) / (refractiveStartX - 90) // 与切线垂直半径斜率
                rad = rad + Math.atan(qk)
            }
            // 求折射弧度
            let rad1 = Math.asin(Math.sin(rad) / refractive);
            // 计算折射终点坐标
            let k1 = Math.tan(rad1);
            let b1 = refractiveStartY - k1 * refractiveStartX;
            let refractiveEndY = k1 * refractiveEndX + b1;
            if (this.checked && this.radio == 2 && refractive == 1.37) {
                refractiveStartY = -refractiveStartY;
            }
            return [refractiveStartY, refractiveEndY];
        },
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
                this.mousedownflag = true;
                this.renderer.domElement.addEventListener('mousemove', this.onDocumentMouseMove, false);
                window.addEventListener('mouseup', this.onDocumentMouseUp, false);
                this.renderer.domElement.addEventListener('touchmove', this.onDocumentTouchMove, false);
                this.renderer.domElement.addEventListener('touchend', this.onDocumentMouseUp, false);
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
                    this.oldX = x
                    this.oldY = y
                    this.movePen(x - 100, y, this.currentLimitPos);
                }
            }
        },
        reset() {
            this.movePen(-350, 0, this.currentLimitPos);
            this.camera.position.set(0, 0, 600);
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
