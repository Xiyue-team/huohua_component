<template>
    <div id="app">
        <div class="control-container">
            <p>圆的面积探究</p>
            <i id="clear"><img class="btn" src="static/image/chongzhi.png" /></i>
        </div>
        <div id="main_right">
            <div id="ctrl">
                <div class="slider">
                    <div class="slider1 s1 sliderDiv">
                        <div class="sliderTitle">
                            分割线n
                        </div>
                        <div class="sliderContainer">
                            <div class="line">
                                <div class="lineLeft"></div>
                                <!-- <div class="lineMiddle"></div> -->
                                <div class="dashed"></div>
                                <div class="dashed"></div>
                                <div class="dashed"></div>
                                <div class="dashed"></div>
                                <div class="dashed"></div>
                            </div>
                            <input id="slider1">
                            <div class="bd">
                                <span>3</span>
                                <span style="float: right;">+∞</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='check'>
                <div>组合</div>
                <span>
                    <span></span>
                </span>
            </div>
        </div>
        <div class="renderCanvas-container">
            <canvas id="renderCanvas" touch-action="none" width="1920" height="1080" tabindex="1" style="opacity: 1;"></canvas>
        </div>
        <div id="notSupported" class="hidden">loading...</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isMob: /iPad|Android/g.test(navigator.userAgent),
            canvas: null,
            checked: false,
            sceneChecked: false,
        };
    },
    methods: {
        init() {
            // Launch render loop
            this.canvas = document.getElementById("renderCanvas");
            var engine = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
            var thiz = this;
            window.addEventListener("resize", () => {
                $('.renderCanvas-container').height($(window).height() - 76);
                engine.resize();
            });

            if (!BABYLON.Engine.isSupported()) {
                //TODO显示webgl不支持信息
            } else {
                var scene = this.loadCustomScene(this.createScene, () => {

                }, engine);
                var renderFunction = function() {
                    // Fps
                    // Render scene
                    if (scene) {
                        if (scene.activeCamera) {
                            scene.render();
                        }
                        // Streams
                        if (scene.useDelayedTextureLoading) {
                            var waiting = scene.getWaitingItemsCount();
                            if (waiting <= 0) {
                                document.getElementById("notSupported").className = "hidden";
                            }
                        } else if (!thiz.sceneChecked) {
                            var remaining = scene.getWaitingItemsCount();
                            if (remaining === 0) {
                                thiz.sceneChecked = true;
                                document.getElementById("notSupported").className = "hidden";
                            }
                        }
                    }
                };
                engine.runRenderLoop(renderFunction);
            }

            $('.renderCanvas-container').height($(window).height() - 76);
            engine.resize();
        },
        // Render loop

        loadCustomScene(demoConstructor, then, engine) {
            // engine.displayLoadingUI();
            document.getElementById("notSupported").className = "";
            var scene = demoConstructor(engine);
            if (scene.activeCamera) {
                scene.activeCamera.attachControl(this.canvas, false);
            }
            scene.executeWhenReady(() => {
                this.canvas.style.opacity = 1;
                // engine.hideLoadingUI();
                if (then) {
                    then(scene);
                }
            });
            return scene;
        },
        createScene(engine) {
            var thiz = this;
            function drawcircle(r, ang, y) {
                var x = r * Math.cos(ang * Math.PI / 180);
                var z = r * Math.sin(ang * Math.PI / 180);
                return new BABYLON.Vector3(x, y, z);
            }

            function setvertices(r, value, y) {
                var vertices = [];
                for (var i = 0; i <= value; i++) {
                    vertices.push(drawcircle(r, i, y));
                }
                return vertices;
            }

            function createcircle(r, value, y, position, color) {
                var vertices = setvertices(r, value, y);
                var circle = BABYLON.MeshBuilder.CreateLines("lines", { points: vertices, updatable: true, instance: circle }, scene);
                circle.color = color;
                circle.position = position;
                return circle;
            }

            function createsector(r, value, y, position, color) {
                var vertices = [];
                vertices.push(new BABYLON.Vector3(0, 0, 0));

                for (var i = 0; i <= value; i++) {
                    vertices.push(drawcircle(r, i, y));
                }
                vertices.push(drawcircle(r, value, y));
                vertices.push(new BABYLON.Vector3(0, 0, 0));
                var sector = BABYLON.MeshBuilder.CreateLines("lines", { points: vertices, updatable: true, instance: sector }, scene);
                sector.color = color;
                sector.position = position;
                return sector;
            }
            function createline(r, value, y, position, color) {
                var vertices = [];
                vertices.push(new BABYLON.Vector3(0, 0, 0));
                vertices.push(drawcircle(r, value, y));
                var line = BABYLON.MeshBuilder.CreateLines("lines", { points: vertices, updatable: true, instance: line }, scene);
                line.color = color;
                line.position = position;
                return line;
            }


            var r = 50;
            var slidervalue = 3;
            var dishalf = 120;
            var PI = Math.PI;
            var linecolor = new BABYLON.Color3(0.3,0.3,0.3);

            var canvas = engine.getRenderingCanvas();
            engine.enableOfflineSupport = false;

            var scene = new BABYLON.Scene(engine);
            scene.clearColor.set(0.99, 0.99, 0.99, 1);

            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
            light.intensity = 1;

            var camera = new BABYLON.TargetCamera("", new BABYLON.Vector3(0, 300, 0), scene);
            camera.setTarget(new BABYLON.Vector3(0, 0, 0));
            camera.attachControl(canvas, false);
            camera.layerMask = 2;
            scene.activeCamera = camera;

            var ground = new BABYLON.Mesh("p", scene);
            ground.position = new BABYLON.Vector3(0, 0, 0);

            var groundright = new BABYLON.Mesh("p", scene);
            groundright.position = new BABYLON.Vector3(0, 0, 0);

            var circle = createcircle(r, 360, 0, new BABYLON.Vector3(-dishalf, 0, 0), linecolor);
            onValueChange(slidervalue);

            function onValueChange(value) {
                ground.dispose();
                slidervalue = Math.floor(value);
                var line = createline(r, 360 / slidervalue, 0, new BABYLON.Vector3(-dishalf, 0, 0), linecolor);
                var i;
                for (i = 0; i < slidervalue; i++) {
                    var se = line.clone("s");
                    se.rotation = new BABYLON.Vector3(0, 2 * i * PI / slidervalue, 0);
                    se.setParent(ground);
                }
                line.dispose();
                if (firsttouch == false) {
                    combination();
                }
            }
            var firsttouch = true;
            function combination() {

                groundright.dispose();
                groundright.position = new BABYLON.Vector3(0, 0, 0);
                var sector = createsector(r, 360 / slidervalue, 0, new BABYLON.Vector3(0, 0, 0), linecolor);
                sector.rotation = new BABYLON.Vector3(0, PI / slidervalue + PI / 2, 0);
                sector.position = new BABYLON.Vector3(0, 0, r / 2);

                var groundsector = new BABYLON.Mesh("p", scene);
                groundsector.position = new BABYLON.Vector3(0, 0, 0);
                sector.setParent(groundsector);

                var pos = drawcircle(r, 360 / 2 / slidervalue, 0);
                var va = r * r - pos.z * pos.z;
                var posx = 0;
                var i;
                for (i = 0; i < slidervalue; i++) {
                    var se = groundsector.clone("s");
                    if (i % 2 == 0) {
                        se.rotation = new BABYLON.Vector3(0, PI, 0);
                        se.position = new BABYLON.Vector3(posx, 0, 0);
                    } else {
                        se.position = new BABYLON.Vector3(posx, 0, -r + Math.sqrt(va));
                    }
                    posx += pos.z;
                    se.setParent(groundright);
                }
                posx = 0;
                groundright.position = new BABYLON.Vector3(0, 0, 0);
                groundsector.dispose();
            }

            var alpha = 0;
            $('#clear').on('click', function() {
                $('#slider1').value = 3;
                $('.s1 .sliderLeft').width(0);
                $('.s1 .xdsoft_range2dslider_runner').css('left', '0px');
                $('.s1 .xdsoft_slider_label').text('3');
                $('#check>span').css('background', '#F0F0F0').children().css({ 'left': '2px', 'right': 'auto' });
                firsttouch = true;
                slidervalue = 3;
                onValueChange(slidervalue);
                groundright.dispose();
                thiz.checked = false;
            });
            $('#slider1').range2DSlider({
                template: 'horizontal',
                value: [[3, 0]],
                width: 130,
                showLegend: false,
                onlyGridPoint: true,
                round: true,
                axis: [[3, 50]],
                printLabel: function(val) {
                    var v = parseInt(val[0]);
                    onValueChange(v);
                    return v;
                }
            });
            var check = function() {
                if (thiz.checked) {
                    $('#check>span').css('background', '#F0F0F0').children().css({ 'left': '2px', 'right': 'auto' });
                    thiz.checked = false;
                    firsttouch = true;
                    groundright.dispose();
                } else {
                    $('#check>span').css('background', '#5CAEFD').children().css({ 'right': '2px', 'left': 'auto' });
                    thiz.checked = true;
                    firsttouch = false;
                    combination();
                }
            };
            if (this.isMob) {
                $('#check').on('touchstart', check);
            } else {
                $('#check').on('click', check);
            }
            scene.registerBeforeRender(function() {
                alpha += 0.002;
            });
            return scene;
        }
    },
    mounted() {
        this.init();

    }
}
</script>

<style>
html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
iframe,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
button,
input,
textarea,
th,
td,
fieldset {
    margin: 0;
    padding: 0;
    border: none;
}

html {
    font: 14px/1.5 "微软雅黑", "宋体", "sans-serif";
    background-color: #ffffff;
    word-break: break-all;
    color: #545454;
    overflow-y: scroll;
}

ol,
ul {
    list-style: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

img {
    width: 100%;
    border: 0;
}

a {
    text-decoration: none;
    color: #545454;
}

.control-container {
    position: absolute;
    top: 0;
    width: 100%;
    height: 76px;
    padding: 0;
    margin: 0;
    color: #333;
    background-color: #ffffff;
}

.control-container p {
    position: absolute;
    left: 24px;
    top: 24px;
    font-size: 24px;
}

.btn {
    position: absolute;
    width: 48px;
    height: 40px;
    right: 20px;
    top: 18px;
    cursor: pointer;
}

@media (width: 370px) and (height: 246px) {
    .three {
        margin: 0;
    }

    .control-container,
    .three .three-controller {
        display: none;
    }
}

body,
html {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
    position: fixed;
    font-family: "Segoe WP", "Segoe UI", Verdana, Arial;
    touch-action: none;
    -ms-touch-action: none
}

.renderCanvas-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    /* background-color: #ffffff; */
}

#notSupported {
    color: #232F32;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: #ffffff;
    text-align: center;
    padding-top: 0;
    font-size: 30px;
    z-index: 3;
    cursor: default
}

#renderCanvas {
    width: 100%;
    height: 100%;
    outline: 0
}

#fps {
    position: absolute;
    right: 20px;
    top: 5em;
    font-size: 20px;
    color: #fff;
    text-shadow: 2px 2px 0 #000
}

.hidden {
    display: none
}


#main_right {
    width: 385px;
    height: 105px;
    background: #FFFFFF;
    border-radius: 6px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    position: absolute;
    right: 24px;
    bottom: 24px;
    z-index: 999;
    float: right;
}



#ctrl {
    height: 100%;
    width: 265px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 20px;
    margin: auto;
}

#ctrl .slider {
    height: 100%;
    width: 265px;
      background: #FFFFFF;
}

#ctrl .sliderDiv {
    height: 100%;
    width: 265px;
    position: relative;
    background: #FFFFFF;
    border: 0 solid rgba(0, 0, 0, 0.06);
    /* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08); */
    /* border-radius: 6px;
    margin-bottom: 20px; */
}

#ctrl .sliderTitle {
    padding-top: 10px;
    text-align: center;
    font-size: 16px;
}

#ctrl .sliderContainer {
    position: absolute;
    top: 81px;
}

#ctrl .sliderContainer .bd {
    width: 210px;
    height: 16px;
    position: absolute;
    left: 16px;
    top: -35px;
    margin: auto;
    color: #999;
    font-size: 14px;
}

#check {
    background: #fff;
    border: 1px 0 0 0 solid rgba(0, 0, 0, 0.06);
    width: 100px;
    height: 100%;
    position: absolute;
    right: 0px;
    bottom: 0px;
    z-index: 999;
    border-left: 1px solid #f8f8f8;
    border-radius: 0 6px 6px 0;
    cursor: pointer;
}

#check>div {
    width: 100%;
    height:50px;
    font-size: 16px;
    padding-top: 10px;
    text-align: center;
    position: absolute;
    right: 0px;
    top: 0px;
}

#check>span {
    width: 40px;
    height: 24px;
    background: #F0F0F0;
    border-radius: 13px;
    position: absolute;
    right: 30px;
    bottom: 20px;
}

#check>span>span {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #FFFFFF;
    border: 0 solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    position: absolute;
    top: 2px;
    left: 2px;
}

#ctrl .xdsoft_range2dslider_box {
    margin: 0 17px;
}

#ctrl .xdsoft_slider_label_top {
    width: 34px !important;
    height: 24px !important;
    background: #FFFFFF !important;
    border: 0 solid rgba(0, 0, 0, 0.06) !important;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12) !important;
    border-radius: 4px !important;
    color: #4c4c4c;
    font-size: 14px;
    line-height: 24px;
    /*display: none;*/
}

.xdsoft_range2dslider_box {
    background-color: transparent !important;
}

.xdsoft_range2dslider_runner {
    bottom: -2px !important;
}

@media(max-width: 720px) {
    #title {
        font-size: 22px;
    }
    #main_left .an div span {
        font-size: 1.3em;
    }
}

@media(max-width: 655px) {
    #title {
        font-size: 20px;
    }
    #main_left .an div span {
        font-size: 1.1em;
    }
}





/*控件线条问题*/

.line {
    width: 206px;
    height: 6px;
    display: flex;
    position: absolute;
    left: 17px;
}

.line .lineLeft {
    width: 133px;
    background-color: #d3d4d1;
}

.line .lineMiddle {
    width: 3px;
    background-color: #000;
}

.line .dashed {
    width: 8px;
    margin: 0 3px;
    border-radius: 2.5px;
    background-color: #d3d4d1;
}
</style>