<template>
    <div id="app" class="noselect">
        <div class="container">
            <!--头部-->
            <h3 v-text="title" class="app_title" style="color: black"></h3>
            <!--视图区-->
            <modify-device @isLandscape="changeLandscape"></modify-device>
            <div id="renderCanvas"></div>
        </div>
        <!--侧边按钮区-->
        <div class="ctrl">
            <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
        </div>
    </div>
</template>
<script>
import common from '@/common/common'; //引入公共函数;
import modifyDevice from '@/components/UI/modifyDevice';//横屏竖屏提醒
import uiBtn from '@/components/UI/uiBtn'; //按钮
export default {
    name: 'app',
    components: {
        modifyDevice,
        uiBtn,
    },
    data() {
        return {
            title: '回声的产生',
            isLandscape: true,
            TO: null
        }
    },
    created() {
        document.title = this.title;
    },
    mounted() {
        //禁止选择
        document.onselectstart = function() {
            return false;
        };
        this.TO = this.init();
    },
    computed: {},
    watch: {},
    methods: {
        reset() {
            this.TO.reset();
        },
        changeLandscape(bool) {
            this.isLandscape = bool;
        },
        init() {
            var scene = new THREE.Scene(),
                camera = null,
                plane = new THREE.Plane(),
                intersection = new THREE.Vector3(),
                mousedownflag = false,
                moveX = -160,
                selectobjs = [],
                selectobj = null,
                comObj = {},
                raycaster = new THREE.Raycaster(),
                mouse = new THREE.Vector2(),
                shadow = null,
                // isMob = /iPad|Android/g.test(navigator.userAgent),
                context = null,
                mainWidth = $('#renderCanvas').width(),
                mainHeight = $('#renderCanvas').height(),
                offset = new THREE.Vector3(),
                offsetLeft = parseInt($('#renderCanvas').offset().left),
                offsetTop = parseInt($('#renderCanvas').offset().top),
                renderer = new THREE.WebGLRenderer({antialias: true,alpha: true,});

            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0xffffff, 0);
            renderer.toneMapping = THREE.LinearToneMapping;
            renderer.setSize(mainWidth, mainHeight);
            renderer.shadowMap.enabled = true;
            renderer.shadowMapSoft = true;

            camera = new THREE.PerspectiveCamera(65, mainWidth / mainHeight, 0.1, 10000);
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 800;
            camera.lookAt(scene.position);

            let pointLight = new THREE.PointLight(0xD3D3D3, 1, 4000);
            pointLight.position.set(-1200, 800, 200);
            scene.add(pointLight);

            // let spotLight = new THREE.SpotLight(0xD3D3D3, 1, 4000);
            // spotLight.position.set(-1200, 2500, 200);
            // spotLight.castShadow = true;
            // spotLight.shadow.mapSize.width = 5000;
            // spotLight.shadow.mapSize.height = 5000;
            // scene.add(spotLight);

            let ambientlight = new THREE.AmbientLight(0xcccccc);
            scene.add(ambientlight);

            let controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.enableZoom = true;
            controls.enableRotate = false;
            controls.enablePan = false;
            controls.minDistance = 600;
            controls.maxDistance = 800;
            $("#renderCanvas").append(renderer.domElement);

            renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
            // renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
            // renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
            renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
            // renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
            // document.addEventListener('touchend', onDocumentTouchEnd, false);
            // 事件函数
            function onDocumentMouseDown(event) {
                event.preventDefault();
                mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
                mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
                mousedownHandle(mouse);
            }

            function onDocumentTouchStart(event) {
                event.preventDefault();
                mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
                mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
                mousedownHandle(mouse);
            }

            function onDocumentMouseMove(event) {
                event.preventDefault();
                mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
                mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
                mouseMoveHandle(mouse);
            }

            function onDocumentTouchMove(event) {
                event.preventDefault();
                mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
                mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
                mouseMoveHandle(mouse);
            }

            function onDocumentMouseUp(event) {
                event.preventDefault();
                mousedownflag = false;
                selectobj = null;
                renderer.domElement.removeEventListener('mousemove', onDocumentMouseMove);
                renderer.domElement.removeEventListener('mouseup', onDocumentMouseUp);
                renderer.domElement.removeEventListener('touchmove', onDocumentTouchMove);
                renderer.domElement.removeEventListener('touchend', onDocumentMouseUp);
            }

            function mousedownHandle(mouse) {
                raycaster.setFromCamera(mouse, camera);
                let intersects = raycaster.intersectObjects(selectobjs);
                if (intersects.length > 0) {
                    removeLine();
                    selectobj = intersects[0].object;
                    let selectobjName = selectobj.name;
                    if (selectobjName.includes('gongImg')) {
                        gongMouseAni();
                        let moveDiest = parseInt(-moveX / 60);
                        difGongWave(moveDiest - 1, moveDiest + 2, -70 * moveDiest);
                    } else {
                        mousedownflag = true;
                        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
                        renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
                        renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
                        renderer.domElement.addEventListener('touchend', onDocumentMouseUp, false);
                    }
                }
            }

            function mouseMoveHandle(mouse) {
                raycaster.setFromCamera(mouse, camera);
                let intersects = raycaster.intersectObjects(selectobjs);
                if (intersects.length > 0) {
                    removeLine();
                    let INTERSECTED = null;
                    if (INTERSECTED != intersects[0].object) {
                        INTERSECTED = intersects[0].object;
                        plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
                    }
                }
                if (mousedownflag) {
                    if (raycaster.ray.intersectPlane(plane, intersection)) {
                        let obj = intersection.sub(offset),
                            x;
                        moveX = obj.x.toFixed(1) - 0;
                        move(moveX);
                    }
                }
            }

            var initScene = () => {
                //地面
                let planeGeometry = new THREE.PlaneGeometry(1000, 250, );
                let planeMaterial = new THREE.MeshLambertMaterial({
                    color: '#808080',
                    side: THREE.DoubleSide
                });
                let plane = new THREE.Mesh(planeGeometry, planeMaterial);
                plane.receiveShadow = true;
                plane.rotation.x = 0.5 * Math.PI;
                plane.position.x = 0;
                plane.position.y = -200;
                plane.position.z = 0;
                scene.add(plane);

                // 墙体
                comObj.box = common.createBox(30, 400, 250, { color: '#D3D3D3' });
                comObj.box.castShadow = true;
                comObj.box.position.x = -160;
                comObj.box.position.y = 0;
                comObj.box.position.z = 0;
                comObj.box.name = 'wall';
                selectobjs.push(comObj.box);
                scene.add(comObj.box);

                //墙体阴影
                let shadowGeometry = new THREE.PlaneGeometry(200, 250, );
                let shadowMaterial = new THREE.MeshLambertMaterial({
                    color: '#696969',
                    side: THREE.DoubleSide
                });
                shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
                shadow.receiveShadow = true;
                shadow.rotation.x = 0.5 * Math.PI;
                shadow.position.x = -45;
                shadow.position.y = -200;
                shadow.position.z = 0;
                scene.add(shadow);


                // 锣杆
                comObj.tipImg = common.createImg([65, -50, 0], 358, 538, 'static/UI/gong2.png');
                comObj.tipImg.scale.set(0.5, 0.5, 0.5);
                scene.add(comObj.tipImg);
                // 锣体
                comObj.gongImg = common.createImg([40, 0, 0], 170, 170, 'static/UI/gong1.png');
                comObj.gongImg.scale.set(0.5, 0.5, 0.5);
                comObj.gongImg.name = 'gongImg';
                selectobjs.push(comObj.gongImg);
                scene.add(comObj.gongImg);
                //人
                comObj.tipImg = common.createImg([250, -115, 0], 90, 181, 'static/UI/person.png');
                comObj.tipImg.scale.set(1, 1, 1);
                scene.add(comObj.tipImg);
                //提示：墙壁可左右拖动
                comObj.prompt1Img = common.createImg([-200, 310, 0], 292, 120, 'static/UI/prompt1.png');
                comObj.prompt1Img.scale.set(0.9, 0.9, 0.9);
                scene.add(comObj.prompt1Img);
                //提示：敲击铜锣试一试
                comObj.prompt2Img = common.createImg([42, 140, 0], 292, 120, 'static/UI/prompt2.png');
                comObj.prompt2Img.scale.set(0.9, 0.9, 0.9);
                scene.add(comObj.prompt2Img);
            }
            initScene();
            // 移动墙的位置
            let move = (v) => {
                if (v < -400) {
                    moveX = -400;
                } else if (v > -100) {
                    moveX = -100;
                }
                comObj.box.position.x = moveX;
                // console.log(shadow);
                shadow.position.x = moveX+100;
                comObj.prompt1Img.visible = false;
            }
            // 锣抖动动画
            function gongMouseAni() {
                let timer1 = null;
                let number = 1;
                function gongmove() {
                    if (number < 0) {
                        clearTimeout(timer1);
                        return;
                    }
                    comObj.gongImg.position.set(5 * number + 40, 3 * number, 0);
                    number--;
                    timer1 = setTimeout(gongmove, 300);
                }
                gongmove();
            }
            
            // 创建声波
            let wave1 = null;
            if (window.ismob) {
                wave1 = common.CircleLine(30, { color: '#696969', line_width: 1, isLay: false }, 226);
            } else {
                wave1 = common.CircleLine(30, { color: '#696969', line_width: 2, isLay: false }, 226);
            }
            wave1.material.depthTest = false;
            wave1.position.set(0, 0, 0);

            let lineArr = [];
            let lineGroup = new THREE.Group();
            scene.add(lineGroup);
            // scene.add(wave1);
            let timer_1 = {};
            let timer_2 = {};
            let timer_3 = {};
            // 创建声波动画
            function gongWave(timer, { count, posX, posY = 0, rotate = 0, startX = 0, startY = 0 } = {}, callback) {
                function cloneWave(wave) {
                    let zoom = 0;
                    let num = 0;
                    function clone() {
                        if (num > count) {
                            clearTimeout(timer.timer);
                            callback && callback();
                            return;
                        }
                        let wave2 = wave.clone();
                        wave2.rotation.z = rotate;
                        wave2.position.set(posX * num + startX, posY * num + startY, 0);
                        wave2.scale.set(zoom + 1, zoom + 1, zoom + 1);
                        lineArr.push(wave2);
                        lineGroup.add(wave2);
                        num++;
                        zoom += 0.2;
                        timer.timer = setTimeout(clone, 200);
                        setTimeout(function() {
                            wave2.visible = false;
                        }, 1000);
                    }
                    clone();
                }
                cloneWave(wave1);
            }
            // 敲锣发出三列声波动画
            function difGongWave(number1, number2, initialposition) {
                if (!source.isStart) {
                    source.start(0, 0, 1);
                    gainNode.gain.value = 0;
                }
                source.isStart = true;
                // playSound(source);
                comObj.prompt2Img.visible = false;
                gongWave(timer_1, { count: number1, posX: -55 }, function() {
                    gongWave(timer_2, { count: number2, posX: 65, startY: -90, rotate: Math.PI, startX: initialposition },
                        function() { playSound(-100 / comObj.box.position.x) }
                    )
                });
                gongWave(timer_3, { count: 4, posX: 25, posY: -10, rotate: Math.PI * 11 / 12, startX: 70, startY: -10 },
                    function() { playSound(1) }
                );
            }
            // 锣的声音
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            context = new AudioContext();
            let soundBuffer = null;
            let source = null;
            var gainNode = context.createGain();

            function loadGongSound(url) {
                let request = new XMLHttpRequest();
                request.open('GET', url, true);
                request.responseType = 'arraybuffer';
                request.onload = function() {
                    context.decodeAudioData(request.response, function(buffer) {
                        soundBuffer = buffer;
                        source = context.createBufferSource();
                        gainNode.connect(context.destination);
                    });
                }
                request.send();
            }
            loadGongSound(require('./sounds/qiaoluo.mp3'));

            function playSound(sound) {
                let source = context.createBufferSource();
                source.buffer = soundBuffer;
                source.connect(gainNode);
                source.start(0, 0, 1);
                gainNode.gain.value = sound;
            }
            // 移除声波
            function removeLine() {
                clearTimeout(timer_1.timer);
                clearTimeout(timer_2.timer);
                clearTimeout(timer_3.timer);
                lineGroup.remove(...lineArr);
                lineArr = [];
                moveX = comObj.box.position.x;
            }
            let animate = () => {
                let count = 0;
                requestAnimationFrame(animate);
                if (count) {
                count = ++count % 2;
                return;
                } else {
                count++;
                }
                renderer.clear();
                //面和实线场景
                renderer.render(scene, camera);
            };
            animate();

            let resizeTimer = null;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    mainWidth = $('#renderCanvas').width();
                    mainHeight = $('#renderCanvas').height();
                    camera.aspect = mainWidth / mainHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(mainWidth, mainHeight);
                    // composer.setSize(mainWidth, mainHeight);
                }, 200)
            });
            var resetWidget = () => {
                comObj.prompt1Img.visible = true;
                comObj.prompt2Img.visible = true;
                comObj.box.position.x = -160;
                shadow.position.x = -45;
                camera.position.z = 800;
                removeLine();
            };
            var TO = function() {
                return {
                    reset: resetWidget,
                    difGongWave,
                    move,
                    removeLine,
                    gongMouseAni
                }
            };
            return TO();
        },
    },
}

</script>
<style>
* {
    margin: 0;
    padding: 0;
}

li {
    list-style: none;
}

input,
button {
    outline: none;
    -webkit-appearance: none;
    border-radius: 0;
}


/*盒模型，padding尺寸不用再减去*/

*,
*:before,
*:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
}

html,
body,
#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    /*background-color: #fff;*/
    /*background-image: radial-gradient(circle at center, #174d89, #1a2e45);*/
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.noselect {
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Chrome/Safari/Opera */
    -khtml-user-select: none;
    /* Konqueror */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
    /* Non-prefixed version, currently not supported by any browser */
}

/*ui*/

.UI-camera {
    width: 80px;
    height: 80px;
    cursor: this . pointer;
}


/*内容区*/

.container {
    width: 100%;
    float: left;
    height: 100%;
}

.container h3 {
    position: fixed;
    top: 0;
    left: 0;
    font-size: 24px;
    color: #fff;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
    z-index: 100;
}

#renderCanvas {
    width: 100%;
    height: 100%;
    outline: none;
    position: relative;
    overflow: hidden;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: 0 0;
}

canvas {
    position: absolute;
    z-index: 98;
}

.ctrl {
    /*position: absolute;*/
    bottom: 24px;
    right: 24px;
    width: 240px;
    z-index: 99;
    position: absolute;
}

.aside_reset {
    margin: 20px 24px;
    float: right;
    z-index: 9999;
    position: fixed;
    right: 0;
    top: 0;
}

</style>
