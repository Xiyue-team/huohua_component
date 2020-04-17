<template>
    <div id="app" class="noselect">
        <div class="container">
            <!--头部-->
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
            <div id="renderCanvas">
                <span class="wd">温度：37℃</span>
                <span class="sc">时长：00：{{fen}}：{{miao}}</span>
                <div class="bgdiv">
                    <div class="bgDiv" :style="renderCanvas"></div>
                </div>
                <canvas id="c"></canvas>
            </div>
        </div>
        <!--侧边按钮区-->
        <div class="app_aside">
            <!--重制按钮-->
            <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
            <!--清除浮动-->
            <span class="btn" @click="btn" >细胞融合</span>
        </div>
    </div>
</template>

<script>
    import uiHead from '@/components/UI/uiHead';//头部
    import uiBtn from '@/components/UI/uiBtn';//按钮
    import uiSlider from '@/components/UI/uiSlider';//滑块
    export default {
        name: 'app',
        components: {uiHead, uiBtn, uiSlider},
        data() {
            return {
                title: '细胞融合',
                radio_checked: false,
                yes: false,
                time: null,
                time2: null,
                time3: null,
                fen: '00',
                miao: '00',
                TO: null,
                renderCanvas: {
                    background: 'url(static/UI/4.png) 55% 56% no-repeat'
                }
            }
        },
        created() {
            document.title = this.title;
        },
        methods: {
            imgL(src, callback) {
                var img = new Image();
                img.src = src;
                img.onload = function () {
                    callback && callback(img.src);
                }
            },
            //计算侧边
            setSideStyle() {
                var W = window.innerWidth - 140;
                var H = window.innerHeight - 72;
                var zoom = 1;
                if (W / H > 1024 / 576) {
                    zoom = H / 576;
                } else {
                    zoom = W / 1024;
                }
                $('.bgdiv').css('zoom', zoom);
                $('canvas').css('zoom',zoom);
                var cW = $('canvas').width();
                var cH = $('canvas').height();
                var leftC = ($('.bgdiv').width() - cW) / 2;
                var topC = ($('.bgdiv').height() - cH) / 2;
                $('canvas').css({'left': leftC + 'px', 'top': topC + 'px'});
            },
            btn() {
                if (this.radio_checked == true) {
                    return
                }
                $('.btn').addClass('active');
                this.radio_checked = true;
                this.imgL('static/UI/1.gif?'+Math.random(), (src) => {
                    this.renderCanvas.background = 'url('+src+') 55% 56% no-repeat';
                });
                this.time3 = setTimeout(() => {
                    $('.bgdiv').fadeOut(50, () => {
                        this.yes = true;
                        var i = 0;
                        this.time = setInterval(() => {
                            if (i >= 40) {
                                clearInterval(this.time);
                                clearInterval(this.time2);
                                this.miao = '00';
                                this.yes = false;
                                return;
                            } else {
                                i++;
                                this.fen = i < 10 ? '0' + i : i;
                            }
                        }, 375);
                        var j = 0;
                        this.time2 = setInterval(() => {
                            if (j >= 60) {
                                j = 0
                            } else {
                                j++;
                                this.miao = j < 10 ? '0' + j : j
                            }
                        }, 6);
                    });
                }, 5600);
            },
            //初始化
            init() {
                var scene, camera, renderer;
                var sphereArr = [];
                var sphereNum = 44;
                var NUM_BOIDS_EXC = sphereNum - 1;
                var MAX_SPEED = 3;
                var radius = 10;
                scene = new THREE.Scene();
                var SCREEN_WIDTH = $('.bgdiv').width(),
                    SCREEN_HEIGHT = $('.bgdiv').height() + 72;
                camera = new THREE.OrthographicCamera(SCREEN_WIDTH / -1.5, SCREEN_WIDTH / 1.5, SCREEN_HEIGHT / 1.5, SCREEN_HEIGHT / -1.5, 1, 1000);
                scene.add(camera);
                camera.position.set(0, 0, 100);
                camera.lookAt(0, 0, 0);

                var planegeometry = new THREE.CircleBufferGeometry(310, 64);
                var planematerial = new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture('./static/UI/1.png'),
                    transparent: true
                });
                var circlePlane = new THREE.Mesh(planegeometry, planematerial);
                scene.add(circlePlane);

                var creatRed = () => {
                    for (var i = 0; i < 25; i++) {
                        var sphereGeometry = new THREE.CircleBufferGeometry(24, 32);
                        var sphereMaterial = new THREE.MeshBasicMaterial({
                            map: THREE.ImageUtils.loadTexture('./static/UI/2.png'),
                            transparent: true
                        });
                        sphereArr[i] = new THREE.Mesh(sphereGeometry, sphereMaterial);
                        var xPos, yPos, zPos = 0;
                        if (i == 0) {
                            xPos = 0;
                            yPos = 0;
                            zPos = 0;
                        } else if (i > 0 && i < 8) {
                            xPos = -30;
                            yPos = -330 + i * 85;
                            sphereArr[i].position.set(xPos, yPos, zPos);
                        } else if (i >= 8 && i < 14) {
                            xPos = -90;
                            yPos = -980 + i * 95;
                            sphereArr[i].position.set(xPos, yPos, zPos);
                        } else if (i >= 14 && i < 19) {
                            xPos = -150;
                            yPos = -1500 + i * 95;
                            sphereArr[i].position.set(xPos, yPos, zPos);
                        } else if (i >= 19 && i < 23) {
                            xPos = -210;
                            yPos = -1950 + i * 95;
                            sphereArr[i].position.set(xPos, yPos, zPos);
                        } else if (i >= 23 && i < 25) {
                            xPos = -260;
                            yPos = -2250 + i * 95;
                            sphereArr[i].position.set(xPos, yPos, zPos);
                        }
                        sphereArr[i].rad = radius * 4.8;
                        sphereArr[i].vx = 0;
                        sphereArr[i].vy = 0;
                        if (i != 0) scene.add(sphereArr[i]);
                    }
                };
                var creatBlue = () => {
                    for (var i = 0; i < 25; i++) {
                        var sphereGeometry = new THREE.CircleBufferGeometry(24, 32);
                        var sphereMaterial = new THREE.MeshBasicMaterial({
                            map: THREE.ImageUtils.loadTexture('./static/UI/3.png'),
                            transparent: true
                        });
                        sphereArr[25 + i] = new THREE.Mesh(sphereGeometry, sphereMaterial);
                        var xPos, yPos, zPos = 0;
                        if (i == 0) {
                            xPos = 0;
                            yPos = 0;
                            zPos = 0;
                        } else if (i > 0 && i < 8) {
                            xPos = 30;
                            yPos = -330 + i * 85;
                            sphereArr[25 + i].position.set(xPos, yPos, zPos);
                        } else if (i >= 8 && i < 14) {
                            xPos = 90;
                            yPos = -980 + i * 95;
                            sphereArr[25 + i].position.set(xPos, yPos, zPos);
                        } else if (i >= 14 && i < 19) {
                            xPos = 150;
                            yPos = -1500 + i * 95;
                            sphereArr[25 + i].position.set(xPos, yPos, zPos);
                        } else if (i >= 19 && i < 23) {
                            xPos = 210;
                            yPos = -1950 + i * 95;
                            sphereArr[25 + i].position.set(xPos, yPos, zPos);
                        } else if (i >= 23 && i < 25) {
                            xPos = 260;
                            yPos = -2250 + i * 95;
                            sphereArr[25 + i].position.set(xPos, yPos, zPos);
                        }

                        sphereArr[25 + i].rad = radius * 4.8;
                        sphereArr[25 + i].vx = 0;
                        sphereArr[25 + i].vy = 0;
                        if (i != 0) scene.add(sphereArr[25 + i]);
                    }
                };
                creatRed();
                creatBlue();
                renderer = new THREE.WebGLRenderer({
                    antialias: true,
                    canvas: document.getElementById('c'),
                    alpha: true
                });
                renderer.setClearColor(0xffffff, 0);
                renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
                var annum = 0;
                var animate = () => {
                    renderer.render(scene, camera);
                    annum++;
                    if (this.yes) {
                        if(annum == 1){
                            update();
                        }
                    }
                    if(annum==4){
                        annum=0;
                    }
                    requestAnimationFrame(animate);
                };
                animate();

                //整体移动
                function update() {
                    for (var i = 1; i < sphereArr.length; i++) {
                        var sphere = sphereArr[i];
//                        rule1(i);
                        rule2(i);
//                        rule3(i);
                        rule4(i);
                        //速度
                        var k = 0.001, k1;
                        if (Math.random() > 0.5) {
                            k1 = 1;
                        } else {
                            k1 = -1;
                        }
                        var forceX = -k * k1 * sphere.position.x;
                        var forceY = -k * k1 * sphere.position.y;

                        sphere.vx += forceX;
                        sphere.vy += forceY;

                        var speed = Math.sqrt(sphere.vx * sphere.vx + sphere.vy * sphere.vy);

                        if (speed >= MAX_SPEED) {
                            var r = MAX_SPEED / speed;
                            sphere.vx *= r;
                            sphere.vy *= r;
                        }
                        sphere.position.x += sphere.vx *2;
                        sphere.position.y += sphere.vy *2;

                    }
                }

//                function rule1(index) {
//                    var c = {
//                        x: 0,
//                        y: 0
//                    };
//
//                    for (var i = 1; i < sphereArr.length; i++) {
//                        if (i != index) {
//                            c.x += sphereArr[i].position.x;
//                            c.y += sphereArr[i].position.y;
//                        }
//                    }
//
//                    c.x = c.x / NUM_BOIDS_EXC;
//                    c.y = c.y / NUM_BOIDS_EXC;
//
//                    sphereArr[index].vx += (c.x - sphereArr[index].position.x) / 1000;
//                    sphereArr[index].vy += (c.y - sphereArr[index].position.y) / 1000;
//                }

                function rule2(index) {
                    for (var i = 0; i < sphereArr.length; i++) {
                        var d = getDistance(sphereArr[i], sphereArr[index]);
                        if (d < sphereArr[index].rad) {
                            sphereArr[index].vx -= sphereArr[i].position.x - sphereArr[index].position.x;
                            sphereArr[index].vy -= sphereArr[i].position.y - sphereArr[index].position.y;
                        }
                    }
                }

//                function rule3(index) {
//                    var pv = {
//                        x: 0,
//                        y: 0,
//                    };
//                    for (var i = 0; i < sphereArr.length; i++) {
//                        if (i != index) {
//                            pv.x += sphereArr[i].vx;
//                            pv.y += sphereArr[i].vy;
//                        }
//                    }
//                    pv.x /= NUM_BOIDS_EXC;
//                    pv.y /= NUM_BOIDS_EXC;
//                    sphereArr[index].vx += (pv.x - sphereArr[index].vx) / 20;
//                    sphereArr[index].vy += (pv.y - sphereArr[index].vy) / 20;
//                }

                function rule4(index) {
                    for (var i = 0; i < sphereArr.length; i++) {
                        var dx = sphereArr[index].position.x;
                        var dy = sphereArr[index].position.y;
                        var r = Math.sqrt(dx * dx + dy * dy);
                        if (r > 280) {
                            var sphere = sphereArr[index];
                            var k = 1;

                            var forceX = -k * sphere.position.x;
                            var forceY = -k * sphere.position.y;

                            sphere.vx += forceX;
                            sphere.vy += forceY;

                            var speed = Math.sqrt(sphere.vx * sphere.vx + sphere.vy * sphere.vy);

                            if (speed >= MAX_SPEED) {
                                var r = MAX_SPEED / speed;
                                sphere.vx *= r;
                                sphere.vy *= r;
                            }
                            sphere.position.x += sphere.vx / 2;
                            sphere.position.y += sphere.vy / 2;
                        }
                    }
                }

                function getDistance(p1, p2) {
                    var dx = p1.position.x - p2.position.x;
                    var dy = p1.position.y - p2.position.y;
                    return Math.sqrt(dx * dx + dy * dy);
                }

                var remove1 = () => {
                    for (var i = 0; i < 50; i++) {
                        scene.remove(sphereArr[i]);
                        // var xPos, yPos, zPos = 0;
                        // if (i == 0) {
                        //     xPos = 0;
                        //     yPos = 0;
                        //     zPos = 0;
                        // } else if (i > 0 && i < 8) {
                        //     xPos = -30;
                        //     yPos = -330 + i * 85;
                        //     sphereArr[i].position.set(xPos, yPos, zPos);
                        // } else if (i >= 8 && i < 14) {
                        //     xPos = -90;
                        //     yPos = -980 + i * 95;
                        //     sphereArr[i].position.set(xPos, yPos, zPos);
                        // } else if (i >= 14 && i < 19) {
                        //     xPos = -150;
                        //     yPos = -1500 + i * 95;
                        //     sphereArr[i].position.set(xPos, yPos, zPos);
                        // } else if (i >= 19 && i < 23) {
                        //     xPos = -210;
                        //     yPos = -1950 + i * 95;
                        //     sphereArr[i].position.set(xPos, yPos, zPos);
                        // } else if (i >= 23 && i < 25) {
                        //     xPos = -260;
                        //     yPos = -2250 + i * 95;
                        //     sphereArr[i].position.set(xPos, yPos, zPos);
                        // }
                    }
                    for (var i = 0; i < 25; i++) {

                        // var xPos, yPos, zPos = 0;
                        // if (i == 0) {
                        //     xPos = 0;
                        //     yPos = 0;
                        //     zPos = 0;
                        // } else if (i > 0 && i < 8) {
                        //     xPos = 30;
                        //     yPos = -330 + i * 85;
                        //     sphereArr[25 + i].position.set(xPos, yPos, zPos);
                        // } else if (i >= 8 && i < 14) {
                        //     xPos = 90;
                        //     yPos = -980 + i * 95;
                        //     sphereArr[25 + i].position.set(xPos, yPos, zPos);
                        // } else if (i >= 14 && i < 19) {
                        //     xPos = 150;
                        //     yPos = -1500 + i * 95;
                        //     sphereArr[25 + i].position.set(xPos, yPos, zPos);
                        // } else if (i >= 19 && i < 23) {
                        //     xPos = 210;
                        //     yPos = -1950 + i * 95;
                        //     sphereArr[25 + i].position.set(xPos, yPos, zPos);
                        // } else if (i >= 23 && i < 25) {
                        //     xPos = 260;
                        //     yPos = -2250 + i * 95;
                        //     sphereArr[25 + i].position.set(xPos, yPos, zPos);
                        // }
                    }
                    this.fen = '00';
                    this.miao = '00';
                }
                var TO = () => {
                    return {
                        remove1: remove1,
                        creatRed: creatRed,
                        creatBlue: creatBlue,
                    }
                };
                return TO();
            },
            //重置
            resetWidget() {
                this.imgL('static/UI/4.png', () => {
                    this.renderCanvas.background = 'url(static/UI/4.png) 55% 56% no-repeat';
                });
                this.TO.remove1();
                this.TO.creatRed();
                this.TO.creatBlue();
                $('.btn').removeClass('active');
                this.radio_checked = false;
                this.yes = false;
                clearInterval(this.time);
                clearInterval(this.time2);
                clearTimeout(this.time3);
                this.time3 = null;
                this.time2 = null;
                this.time1 = null;
                $('.bgdiv').css('display', 'block');
            }
        },
        mounted() {
            this.TO = this.init();
            this.setSideStyle();
            window.onresize = () => {
                this.setSideStyle();
            }
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

    input, button {
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

    html, body, #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        background-color: #fff;
    }

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently not supported by any browser */
    }

    /*内容区*/
    .container {
        width: calc(100% - 140px);
        float: left;
        height: 100%;
    }

    .container h3 {
        font-size: 24px;
        color: #000;
        line-height: 1.0;
        padding: 24px;
        font-weight: normal;
    }

    .app_aside {
        float: left;
        width: 140px;
        height: 100%;
    }

    #renderCanvas {
        width: 100%;
        height: calc(100% - 72px);
        outline: none;
        position: relative;
        overflow: hidden;
    }

    canvas {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .aside_reset {
        margin: 20px 24px;
        float: right;
    }

    .btn {
        position: absolute;
        top: calc(50% - 22px);
        right: 20px;
        height: 44px;
        width: 120px;
        background: #FFFFFF;
        border: 0 solid rgba(0, 0, 0, 0.06);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        line-height: 44px;
        text-align: center;
        color: #000;
        cursor: pointer;
    }

    .active {
        background: #5badfd;
        color: #ffffff;
    }

    .wd {
        z-index: 9;
        position: absolute;
        top: 10px;
        left: 24px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #4A4A4A;
    }

    .sc {
        z-index: 9;
        position: absolute;
        top: 40px;
        left: 24px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #4A4A4A;
    }

    .bgDiv {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 999;
    }

    .bgdiv {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #ffffff;
        z-index: 998;
    }
</style>
