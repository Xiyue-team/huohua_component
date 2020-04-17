<template>
    <div id="app" class="noselect">
        <div id="loading" v-if="loadingF">
            <div>loading...</div>
        </div>
        <div class="container">
            <!--头部-->
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
            <div id="renderCanvas">
                <div id="mb"></div>
            </div>
        </div>
        <!--返回按钮-->
        <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
        <!--侧边按钮区-->
        <div id="ctrl">
            <div id="radioG" :class="{op:op}">
                <p class="titleG">电子数量</p>
                <div>
                    <div @click="radioC(1)" :class="{checked:radio1}">
                        <p>1</p>
                        <span><em></em></span>
                    </div>
                    <div @click="radioC(2)" :class="{checked:radio2}">
                        <p>100</p>
                        <span><em></em></span>
                    </div>
                    <div @click="radioC(3)" :class="{checked:radio3}">
                        <p>3000</p>
                        <span><em></em></span>
                    </div>
                    <div @click="radioC(4)" :class="{checked:radio4}">
                        <p>7000</p>
                        <span><em></em></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import uiHead from '@/components/UI/uiHead'; //头部
    import uiBtn from '@/components/UI/uiBtn'; //按钮
    export default {
        name: 'app',
        components: {
            uiHead,
            uiBtn,
        },
        data() {
            return {
                title: '电子双缝干涉实验',
                TO: null,
                radio1: true,
                radio2: false,
                radio3: false,
                radio4: false,
                value: 1,
                op: false,
                loadingF:true,
                rArray: [-249, -230, -193, -169, -137, -107, -78, -46, -19, 19, 46, 78, 107, 137, 169, 193, 230, 249],
            }
        },
        created() {
            document.title = this.title;
        },
        mounted() {
            //禁止选择
            document.onselectstart = function () {
                return false;
            };
            this.TO = this.init();
        },
        computed: {},
        watch: {},
        methods: {
            radioC(num) {
                this.radio1 = false;
                this.radio2 = false;
                this.radio3 = false;
                this.radio4 = false;
                this.value = num;
                this['radio' + num] = true;
            },
            reset() {
                this.TO.reset();
            },
            init() {
                var scene = null,
                    camera = null,
                    renderer = null,
                    mainWidth = null,
                    mainHeight = null,
                    selectobjs = [],
                    selectobj = null,
                    raycaster = new THREE.Raycaster(),
                    mousedownflag = false;
                renderer = new THREE.WebGLRenderer({
                    antialias: true,
                    alpha: true
                });
                var offsetLeft = parseInt($('#renderCanvas').offset().left);
                var offsetTop = parseInt($('#renderCanvas').offset().top);
                mainWidth = $('#renderCanvas').width();
                mainHeight = $('#renderCanvas').height();
                scene = new THREE.Scene();
                var sc = 1.5;
                camera = new THREE.OrthographicCamera(-mainWidth / sc, mainWidth / sc, mainHeight / sc, -mainHeight / sc, 0, 10000);
                camera.position.x = 0;
                camera.position.y = 0;
                camera.position.z = 1000;
                camera.lookAt(scene.position);
                scene.add(camera);
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setClearColor(0xffffff, 0);
                renderer.setSize(mainWidth, mainHeight);
                $("#renderCanvas").append(renderer.domElement);

                var OBJ = new THREE.Group();
                scene.add(OBJ);

                $('#mb').css('left',window.innerWidth/2+244+'px');

                var loader = new THREE.TextureLoader();
                //创建平面
                var createP = (W, H, src) => {
                    var geometry = new THREE.PlaneGeometry(W, H, 1, 1);
                    var material = new THREE.MeshBasicMaterial({map: loader.load(src), transparent: true});
                    return new THREE.Mesh(geometry, material);
                }
                var zq = './static/UI/zq.png';
                var text = './static/UI/text.png';
                var fx = './static/UI/fx.png';

                //发射器
                var ctrl = createP(180 * 0.65, 160 * 0.65, zq);
                ctrl.position.x = -500;
                ctrl.position.y = -18;
                selectobjs.push(ctrl);
                scene.add(ctrl);

                //双缝
                var FX = createP(12, 500, fx);
                scene.add(FX);


                var Text = createP(364 * 0.6, 120 * 0.6, text);
                Text.position.set(-500, 80, 5);
                scene.add(Text);

                //电子
                var DZ = createP(100, 100, './static/UI/fire.png');
                DZ.position.set(-460, 0, -10);

                //生成亮斑
                let LBPlane = createP(2, 2, './static/UI/point.png');

                var imgI2=1;
                var PIC2 = [];
                var loadImg2=()=>{
                    loader.load('./static/img2/' + imgI2 + '.png',(texture)=>{
                        PIC2[imgI2]=texture;
                        imgI2++;
                        if(imgI2<=4){
                            loadImg2();
                        }else{
                            loadImg1();
                        }
                    })
                }
                loadImg2();

                var imgI=26;
                var PIC = [];
                var loadImg1=()=>{
                    loader.load('./static/img/a' + imgI + '.png',(texture)=>{
                        PIC[27-imgI]=texture;
                        imgI--;
                        if(imgI>0){
                            loadImg1();
                        }else{
                            this.loadingF=false;
                        }
                    })
                }

                var anP = createP(1350 * 0.45, 436, './static/img/a26.png');
                anP.rotation.z = -Math.PI / 2;
                anP.position.z = -10;
                anP.position.x = 208;
                anP.visible = false;
                scene.add(anP);

                //生成m-n的随机数
                let RandomMN = (m, n) => {
                    return Math.random() * (n - m + 1) + m;
                }

                var ClearAll = false;
                //生成结束点
                let stopN = 0;
                let pointGroup=new THREE.Group();
                OBJ.add(pointGroup);
                let pointArr=[];
                let createPoint = () => {
                    if(ClearAll){
                        return;
                    }
                    let x, y;
                    stopN++;
                    let index = Math.floor(Math.random() * this.rArray.length);
                    let y0;
                    let y1;
                    if (stopN >= 7) {
                        stopN = 0;
                        if (index % 2 == 0) {
                            if (index != 16) {
                                index++;
                            } else {
                                index--;
                            }
                        }
                        y0 = this.rArray[index];
                        y1 = this.rArray[index + 1];
                        y = RandomMN(y0, y1);
                    } else {
                        if (index % 2 != 0) {
                            index--;
                        }
                        y0 = this.rArray[index];
                        y1 = this.rArray[index + 1];
                        y = RandomMN(y0, y1);
                    }
                    x = RandomMN(328, 402);
                    var len=pointArr.length;
                    pointArr[len] = LBPlane.clone();
                    pointArr[len].position.set(x, y, 0);
                    pointGroup.add(pointArr[len]);
                    if(di%50==0){
                        OBJ.remove(pointGroup);
                        pointGroup=new THREE.Group();
                        OBJ.add(pointGroup);
                        let geometry=new THREE.Geometry();
                        for(var j=0;j<pointArr.length;j++){
                            pointArr[j].updateMatrix();
                            geometry.merge(pointArr[j].geometry,pointArr[j].matrix);
                        }
                        var mesh=new THREE.Mesh(geometry,LBPlane.material);
                        OBJ.add(mesh);
                        pointArr=[];
                    }
                }

                var anF = false;
                var num,di;
                //发射电子
                var FS = (style) => {
                    if (anF) {
                        return;
                    }
                    anF = true;
                    di = 0;
                    num = 0;
                    var SET = null;
                    if (style == 1) {
                        num = 1;
                    } else if (style == 2) {
                        num = 100;
                    } else if (style == 3) {
                        num = 250;
                    } else if (style == 4) {
                        num = 450;
                    }
                    var an = () => {
                        if (di >= num || ClearAll) {
                            cancelAnimationFrame(SET);
                            return;
                        }
                        di++;
                        var dz = DZ.clone();
                        OBJ.add(dz);
                        if (di === 1) {
                            if (num == 1) {
                                Move(dz, true);
                            } else {
                                Move(dz, true, num);
                            }
                        } else {
                            Move(dz, false, num);
                        }
                        SET = requestAnimationFrame(an);
                    }
                    an();
                }

                //电子移动
                var Move = (obj, first, num) => {
                    var SET = null;
                    var i = obj.position.x;
                    var an = () => {
                        if (i >= 0 || ClearAll) {
                            OBJ.remove(obj);
                            cancelAnimationFrame(SET);
                            if (first) {
                                playAn(num);
                            } else {
                                if (num == 100) {
                                    createPoint();
                                } else {
                                    for (var j = 0; j < 5; j++) {
                                        createPoint();
                                    }
                                }
                            }
                            return;
                        }
                        i += 30;
                        obj.position.x = i;
                        SET = requestAnimationFrame(an);
                    }
                    an();
                }

                var isFirst = false;
                var SET2 = null;
                var SET3 = null;
                var playAn = (num) => {
                    isFirst = false;
                    var i = 0;
                    var num2 = num;
                    var posx = -460;
                    anP.visible = true;
                    var an = () => {
                        if (i >= 16 && num2) {
                            createPoint();
                            var j = 0;
                            var step=0;
                            var an2 = () => {
                                step++;
                                if (di == num2) {
                                    posx += 30;
                                    if (ClearAll) {
                                        cancelAnimationFrame(SET2);
                                        return;
                                    }
                                    if (posx >= 0) {
                                        cancelAnimationFrame(SET2);
                                        num2 = 0;
                                        i = 16;
                                        an();
                                        return;
                                    }
                                }
                                if(step>=3){
                                    step=0;
                                    if (j >= 4) {
                                        j = 0;
                                    }
                                    j++;
                                    anP.material.map=PIC2[j];
                                }
                                SET2 = requestAnimationFrame(an2);
                            }
                            an2();
                            return;
                        } else if (i >= 16 && !isFirst) {
                            isFirst = true;
                            createPoint();
                        }
                        if (i >= 26 || ClearAll) {
                            ClearAll=true;
                            cancelAnimationFrame(SET3);
                            anF = false;
                            this.op = false;
                            return;
                        }
                        i++;
                        anP.material.map=PIC[i];
                        SET3 = requestAnimationFrame(an);
                    }
                    an();
                }

                var animate = () => {
                    requestAnimationFrame(animate);
                    renderer.clear();
                    renderer.render(scene, camera);
                };
                animate();

                window.addEventListener('resize', () => {
                    offsetLeft = parseInt($('#renderCanvas').offset().left);
                    offsetTop = parseInt($('#renderCanvas').offset().top);
                    mainWidth = $('#renderCanvas').width();
                    mainHeight = $('#renderCanvas').height();
                    camera.left = -mainWidth / sc;
                    camera.right = mainWidth / sc;
                    camera.top = mainHeight / sc;
                    camera.bottom = -mainHeight / sc;
                    camera.updateProjectionMatrix();
                    renderer.setSize(mainWidth, mainHeight);
                });
                let onDocumentMouseDown = (event) => {
                    event.preventDefault();
                    let mouse = {};
                    mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
                    mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
                    raycaster.setFromCamera(mouse, camera);
                    let intersects = raycaster.intersectObjects(selectobjs);
                    if (intersects.length > 0) {
                        selectobj = intersects[0].object;
                        mousedownflag = true;
                    }
                };
                let onDocumentMouseUp = (event) => {
                    event.preventDefault();
                    Up();
                };
                let onDocumentTouchStart = (event) => {
                    event.preventDefault();
                    if (event.touches.length === 1) {
                        let mouse = {};
                        mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
                        mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
                        raycaster.setFromCamera(mouse, camera);
                        let intersects = raycaster.intersectObjects(selectobjs);
                        if (intersects.length > 0) {
                            selectobj = intersects[0].object;
                            mousedownflag = true;
                        }
                    }
                };
                let onDocumentTouchEnd = (event) => {
                    event.preventDefault();
                    Up();
                };

                let Up = () => {
                    if (mousedownflag) {
                        if (Text != null) {
                            scene.remove(Text);
                            Text = null;
                        }
                        if (anF) {
                            return;
                        }
                        ClearAll = false;
                        FS(this.value);
                        if (!this.radio1) {
                            this.op = true;
                        }
                        mousedownflag = false;
                        selectobj = null;
                    }
                }
                renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
                renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
                renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
                renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
                var resetWidget = () => {
                    ClearAll = true;
                    cancelAnimationFrame(SET2);
                    cancelAnimationFrame(SET3);
                    this.radio1 = true;
                    this.radio2 = false;
                    this.radio3 = false;
                    this.radio4 = false;
                    this.value = 1;
                    anP.visible=false;
                    this.op = false;
                    anF = false;
                    isFirst = false;
                    scene.remove(OBJ);
                    OBJ = new THREE.Group();
                    pointGroup=new THREE.Group();
                    OBJ.add(pointGroup);
                    pointArr=[];
                    scene.add(OBJ);
                };
                var TO = function () {
                    return {
                        reset: resetWidget
                    }
                }
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

    input, button {
        outline: none;
        -webkit-appearance: none;
        border-radius: 0;
    }

    /*盒模型，padding尺寸不用再减去*/

    *, *:before, *:after {
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
        position: relative;
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

    /*内容区*/

    .container {
        width: 100%;
        height: 100%;
        background-image: -webkit-radial-gradient(circle at center, #490188, #04163E);
        background-image: radial-gradient(circle at center, #490188, #04163E);
    }

    .container h3 {
        font-size: 24px;
        line-height: 1.0;
        padding: 24px;
        position: absolute;
        top: 0;
        z-index: 999;
        color: #ffffff;
        font-weight: normal;
        background-color: transparent;
    }

    #renderCanvas {
        width: 100%;
        height: 100%;
        outline: none;
        position: absolute;
        top: 0;
        overflow: hidden;
    }
    #mb{
        width:60px;
        height:376px;
        position:absolute;
        top:0;
        bottom:0;
        margin: auto;
        z-index: 566;
        background: #000;
    }

    canvas {
        position: absolute;
        z-index: 666;
    }

    .aside_reset {
        margin: 20px 24px;
        float: right;
    }

    #app .aside_reset {
        position: fixed;
        right: 0;
        top: 0;
        z-index: 999;
    }

    #ctrl {
        position: absolute;
        bottom: 20px;
        right: 20px;
        z-index: 999;
    }

    #radioG {
        width: 240px;
        height: 108px;
        background: rgba(74, 74, 74, 0.60);
        border: 0 solid rgba(0, 0, 0, 0.10);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
        border-radius: 6px;
        display: inline-block;
    }

    #radioG .titleG {
        height: 16px;
        line-height: 16px;
        margin-top: 14px;
        text-align: center;
        color: #fff;
    }

    #radioG > div {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        margin-top: 18px;
    }

    #radioG > div > div {
        width: 48px;
        height: 60px;
        cursor: pointer;
    }

    #radioG > div > div > p {
        height: 16px;
        line-height: 16px;
        text-align: center;
        color: #B8B8B8;
    }

    #radioG > div > div span {
        display: inline-block;
        width: 24px;
        height: 24px;
        opacity: 0.5;
        background: #E6E6E6;
        border-radius: 50%;
        float: left;
        transition: all 0.2s;
        margin: 8px 0 0 12px;
    }

    #radioG > div > div.checked span {
        background-color: #5caefd;
        opacity: 1;
    }

    #radioG > div > div.checked p {
        color: #fff;
    }

    #radioG > div > div span em {
        transition: all 0.1s 0.2s;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: block;
        margin: 7px auto;
    }

    #radioG > div > div.checked span em {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fff;
        display: block;
        margin: 7px auto;
    }

    .op {
        pointer-events: none;
        opacity: 0.5;
    }
    #loading{
        width:100%;
        height:100%;
        position:absolute;
        z-index: 1000;
        top:0;
        left: 0;
        background: #fff;
    }
    #loading>div{
        height:30px;
        width:100px;
        position: absolute;
        top:50%;
        text-align: center;
        line-height: 30px;
        left: 0;
        right: 0;
        margin: auto;
        transform: translateY(-50%);
    }
</style>
