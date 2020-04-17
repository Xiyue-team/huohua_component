<template>
    <div id="app" class="noselect">
        <div class="container">
            <!--头部-->
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
            <canvas id="renderCanvas"></canvas>
            <div class="showM">
                <div v-show="choose" class="show">
                    <div v-show="src3" style="position: absolute;bottom:20px;left:20px;width: 450px;height: 145px;background-color: #fff;z-index: 999;"></div>
                    <div v-show="src5" style="position: absolute;bottom:10px;left:20px;width: 450px;height: 130px;background-color: #fff;z-index: 999;"></div>
                    <div v-show="src5" style="position: absolute;top:20px;left:20px;width: 450px;height: 130px;background-color: #fff;z-index: 999;"></div>
                    <div v-show="blue2" style="position: absolute;bottom:-3.5px;left:20px;width: 450px;height: 185px;background-color: #fff;z-index: 999;"></div>
                    <div :style="'overflow:hidden;width:350px;height:350px;position:absolute; top:'+top+'px'">
                        <img :src="src" class="YY" style="width: auto;height: 350px;position: absolute;z-index:1;" v-show="src">
                        <img :src="src2" style="width: auto;height: 350px;position: absolute;" v-show="src2">
                        <img :src="src3" class="YY1" style="width: auto;height: 350px;position: absolute;left:-40.5px;z-index:1;" v-show="src3">
                        <img :src="src3" class="YY5" style="width: auto;height: 350px;position: absolute;left:-644px;z-index:1;" v-show="src3">
                        <img :src="src5" class="YY3" style="width: auto;height: 900px;position: absolute;bottom:-201px;left:-30px;z-index:1;" v-show="src5">
                        <img :src="src6" class="YY4" style="width: auto;height: 900px;position: absolute;bottom:-201px;left:-30px;" v-show="src6">
                    </div>
                    <div class="show1" v-show="blue1" style="top:120px;">
                         <img :src="src4" class="YY2" style="width: auto;height: 350px;position: absolute;left:-62.5px;" v-show="src4">
                    </div>
                    <div class="show3" v-show="blue3">
                        <span style="top:152px;left:43px;" v-text="s31+'°'"></span>
                        <span style="top:152px;left:98px;" v-text="s32+'°'"></span>
                        <span style="top:152px;left:162px;" v-text="s33+'°'"></span>
                        <span style="top:152px;left:227px;" v-text="s34+'°'"></span>
                        <span style="top:152px;left:284px;" v-text="s35+'°'"></span>
                        <span style="top:152px;left:333px;" v-text="s36+'°'"></span>
                        <span style="top:-20px;left:165px;" v-text="s37+'°'"></span>
                        <span style="top:10px;left:275px;" v-text="s38+'°'"></span>
                        <span style="top:67px;left:330px;" v-text="s39+'°'"></span>
                        <span style="bottom:67px;left:330px;" v-text="s310+'°'"></span>
                        <span style="bottom:10px;left:275px;" v-text="s311+'°'"></span>
                        <span style="bottom:-20px;left:165px;" v-text="s312+'°'"></span>
                        <img v-show="switch_checked" src="static/UI/1.gif" style="width: 50px;height: auto;transform: rotate(-36deg);position:absolute;left:150px;top:-54px;">
                    </div>
                    <div class="show4" v-show="blue4">
                        <span style="top:-20px;left:165px;" v-text="s41+'°'"></span>
                        <span style="top:-5px;left:243px;" v-text="s42+'°'"></span>
                        <span style="top:35px;left:302px;" v-text="s43+'°'"></span>
                        <span style="top:163px;left:355px;" v-text="s44+'°'"></span>
                        <span style="top:269px;left:323px;" v-text="s45+'°'"></span>
                        <span style="top:325px;left:265px;" v-text="s46+'°'"></span>
                        <span style="bottom:-20px;left:165px;" v-text="s47+'°'"></span>
                        <span style="top:325px;right:265px;" v-text="s48+'°'"></span>
                        <span style="top:273px;right:317px;" v-text="s49+'°'"></span>
                        <span style="top:163px;right:355px;" v-text="s410+'°'"></span>
                        <span style="top:35px;right:302px;" v-text="s411+'°'"></span>
                        <span style="top:-5px;right:243px;" v-text="s412+'°'"></span>
                        <img v-show="switch_checked" src="static/UI/1.gif" style="width: 50px;height: auto;transform: rotate(-143deg) scaleY(-1);position:absolute;left:150px;bottom:-50px;">
                    </div>
                </div>
            </div>
        </div>
        <!--侧边按钮区-->
        <div class="app_aside">
            <!--重制按钮-->
            <ui-btn type="reset1" class="aside_reset"></ui-btn>
            <!--清除浮动-->
            <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
                <ui-btn size="big" :type="blue1" @click.native="btnClick(1)">圆柱视图</ui-btn>
                <ui-btn size="big" :type="blue2" @click.native="btnClick(2)">极地视图</ui-btn>
                <ui-btn size="big" :type="blue3" @click.native="btnClick(3)">侧视图</ui-btn>
                <ui-btn size="big" :type="blue4" @click.native="btnClick(4)">斜俯视图</ui-btn>
                <ui-btn size="big" :type="blue5" @click.native="btnClick(5)" style="margin-bottom: 40px;">侧俯视图</ui-btn>
                <ui-btn type="switch" v-model="switch_checked" @click.native="startA" >自转</ui-btn>
            </div>
        </div>
        <div id="notSupported" class="hidden">loading...</div>
    </div>
</template>

<script>
    import uiHead from '@/components/UI/uiHead';//头部
    import uiBtn from '@/components/UI/uiBtn';//按钮
    export default {
        name: 'app',
        components: {uiHead, uiBtn},
        data() {
            return {
                title: '局部经纬网视图的判读',
                BtnSpaceStyle: 'flex',
                switch_checked:false,
                blue1:'',
                blue2:'',
                blue3:'',
                blue4:'',
                blue5:'',
                choose:false,
                SET:null,
                top:75,
                ang:0,

                src:'',
                src2:'',
                src3:'',
                src4:'',
                src5:'',
                src6:'',

                s31:0,
                s32:30,
                s33:60,
                s34:90,
                s35:120,
                s36:150,
                s37:90,
                s38:60,
                s39:30,
                s310:30,
                s311:60,
                s312:90,
                s31f:30,
                s32f:-30,
                s33f:-30,
                s34f:-30,
                s35f:-30,
                s36f:-30,

                s41:180,
                s42:150,
                s43:120,
                s44:90,
                s45:60,
                s46:30,
                s47:0,
                s48:30,
                s49:60,
                s410:90,
                s411:120,
                s412:150,
                s41f:-30,
                s42f:30,
                s43f:30,
                s44f:30,
                s45f:30,
                s46f:30,
                s47f:30,
                s48f:-30,
                s49f:-30,
                s410f:-30,
                s411f:-30,
                s412f:-30,
            }
        },
        created() {
            document.title = this.title;
        },
        mounted() {
            //页面加载检测是否支持babylon
            if (!BABYLON.Engine.isSupported()) {
                alert('不支持BABYLON')
            } else {
                this.init();
            }
            this.setSideStyle()
        },
        methods: {
            btnClick(index){
                if(this['blue'+index]!=''){
                    return;
                }
                $('canvas').css({'opacity':'0','zIndex':'555'});
                this.blue1='';
                this.blue2='';
                this.blue3='';
                this.blue4='';
                this.blue5='';
                this['blue'+index]='blue';
                this.choose=true;
                this.src='';
                this.src2='';
                this.src3='';
                this.src4='';
                this.src5='';
                this.src6='';
                this.top=75;
                $('.YY1').css('left','-40px');
                $('.YY5').css('left','-643.5px');
                $('.YY').css('transform','rotate(0deg)');
                $('.YY3').css('transform','rotate(0deg)');
                clearInterval(this.SET);
                var W=$('.showM').width();
                var H=$('.showM').height();
                var zoom;
                if(W/H>500/500){
                    zoom=H/500;
                }else{
                    zoom=W/500;
                }
                switch (index){
                    case 1:
                        this.src3='static/UI/1.png';
                        this.src4='static/UI/1x.png';
                        this.top=120;
                        zoom=zoom-0.1;
                        break;
                    case 2:
                        this.src='static/UI/2.png';
                        this.src2='static/UI/2x.png';
                        this.top=143;
                        zoom=zoom+0.2;
                        this.ang=0;
                        break;
                    case 3:
                        this.src='static/UI/3.png';
                        this.src2='static/UI/3x.png';
                        this.s31=0;
                        this.s32=30;
                        this.s33=60;
                        this.s34=90;
                        this.s35=120;
                        this.s36=150;
                        this.s31f=30;
                        this.s32f=-30;
                        this.s33f=-30;
                        this.s34f=-30;
                        this.s35f=-30;
                        this.s36f=-30;
                        zoom=zoom-0.1;
                        break;
                    case 4:
                        this.src='static/UI/4.png';
                        this.src2='static/UI/4x.png';
                        this.s41=180;
                        this.s42=150;
                        this.s43=120;
                        this.s44=90;
                        this.s45=60;
                        this.s46=30;
                        this.s47=0;
                        this.s48=30;
                        this.s49=60;
                        this.s410=90;
                        this.s411=120;
                        this.s412=150;
                        this.s41f=-30;
                        this.s42f=30;
                        this.s43f=30;
                        this.s44f=30;
                        this.s45f=30;
                        this.s46f=30;
                        this.s47f=30;
                        this.s48f=-30;
                        this.s49f=-30;
                        this.s410f=-30;
                        this.s411f=-30;
                        this.s412f=-30;
                        zoom=zoom-0.1;
                        break;
                    case 5:
                        this.src5='static/UI/5.png';
                        this.src6='static/UI/5x.png';
                        zoom=zoom-0.1;
                        this.ang=0;
                        break;
                }
                $('.show').css('zoom',zoom);
                this.startA();
            },
            startA(){
                if(this.switch_checked){
                    if(this.blue3!=''||this.blue4!=''){
                        this.SET=setInterval(()=>{
                            if(this.blue3!=''){
                                var s3=this.AN(this.s31,this.s31f);
                                this.s31=s3[0];
                                this.s31f=s3[1];
                                s3=this.AN(this.s32,this.s32f);
                                this.s32=s3[0];
                                this.s32f=s3[1];
                                s3=this.AN(this.s33,this.s33f);
                                this.s33=s3[0];
                                this.s33f=s3[1];
                                s3=this.AN(this.s34,this.s34f);
                                this.s34=s3[0];
                                this.s34f=s3[1];
                                s3=this.AN(this.s35,this.s35f);
                                this.s35=s3[0];
                                this.s35f=s3[1];
                                s3=this.AN(this.s36,this.s36f);
                                this.s36=s3[0];
                                this.s36f=s3[1];
                            }else if(this.blue4!=''){
                                var s4=this.AN(this.s41,this.s41f);
                                this.s41=s4[0];
                                this.s41f=s4[1];
                                s4=this.AN(this.s42,this.s42f);
                                this.s42=s4[0];
                                this.s42f=s4[1];
                                s4=this.AN(this.s43,this.s43f);
                                this.s43=s4[0];
                                this.s43f=s4[1];
                                s4=this.AN(this.s44,this.s44f);
                                this.s44=s4[0];
                                this.s44f=s4[1];
                                s4=this.AN(this.s45,this.s45f);
                                this.s45=s4[0];
                                this.s45f=s4[1];
                                s4=this.AN(this.s46,this.s46f);
                                this.s46=s4[0];
                                this.s46f=s4[1];
                                s4=this.AN(this.s47,this.s47f);
                                this.s47=s4[0];
                                this.s47f=s4[1];
                                s4=this.AN(this.s48,this.s48f);
                                this.s48=s4[0];
                                this.s48f=s4[1];
                                s4=this.AN(this.s49,this.s49f);
                                this.s49=s4[0];
                                this.s49f=s4[1];
                                s4=this.AN(this.s410,this.s410f);
                                this.s410=s4[0];
                                this.s410f=s4[1];
                                s4=this.AN(this.s411,this.s411f);
                                this.s411=s4[0];
                                this.s411f=s4[1];
                                s4=this.AN(this.s412,this.s412f);
                                this.s412=s4[0];
                                this.s412f=s4[1];
                            }
                        },1000);
                    }else{
                        this.SET=setInterval(()=>{
                            if(this.blue1!=''){
                                var l1=parseFloat($('.YY1').css('left'))+1;
                                var l2=parseFloat($('.YY5').css('left'))+1;
                                if(l1>330){
                                    $('.YY1').css('left',(l1-1208)+'px');
                                }else if(l2>330){
                                    $('.YY5').css('left',(l2-1208)+'px');
                                }else{
                                    $('.YY1').css('left',l1+'px');
                                    $('.YY5').css('left',l2+'px');
                                }
                            }else if(this.blue2!=''){
                                this.ang +=0.2;
                                $('.YY').css('transform','rotate('+this.ang+'deg)');
                            }else if(this.blue5!=''){
                                this.ang +=0.2;
                                $('.YY3').css('transform','rotate('+this.ang+'deg)');
                            }
                        },40);
                    }
                }else{
                    clearInterval(this.SET);
                }
            },
            AN(num,d){
                if(num==180){
                    d=-30;
                }else if(num==0){
                    d=30;
                }
                num +=d;
                return [num,d];
            },
            //计算侧边
            setSideStyle() {
                const el = document.getElementById('btn_space')
                if (el && el.scrollHeight > el.offsetHeight) {
                    this.BtnSpaceStyle = 'block'
                } else {
                    this.BtnSpaceStyle = 'flex'
                }
                var W=$('.showM').width();
                var H=$('.showM').height();
                var zoom;
                if(W/H>500/500){
                    zoom=H/500;
                }else{
                    zoom=W/500;
                }
                $('.show').css('zoom',zoom);
            },
            //初始化
            init() {
                var thiz=this;
               var canvas = document.getElementById("renderCanvas");
                var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
                if (!BABYLON.Engine.isSupported()) {
                } else {
                    var scene = this.loadCustomScene(this.createScene, (scene) => {

                    }, engine);
				 var renderTimes=0;
					
                    var renderFunction = function() {
                        var sceneChecked = null;
                        if(thiz.choose){
                            return;
                        }
                        if (scene) {
                            if (scene.activeCamera) { 
							renderTimes++;
			                    if(renderTimes%4!=0)return;
                                scene.render();
                            }
                            if (scene.useDelayedTextureLoading) {
                                var waiting = scene.getWaitingItemsCount();
                                if (waiting <= 0) {
                                    document.getElementById("notSupported").className = "hidden";
                                }
                            } else if (!sceneChecked) {
                                var remaining = scene.getWaitingItemsCount();
                                if (remaining == 0) {
                                    document.getElementById("notSupported").className = "hidden";
                                }
                            }
                        }
                    };
                    engine.runRenderLoop(renderFunction);
                    engine.resize();
                    window.addEventListener("resize", () => {
                        engine.resize();
                        this.setSideStyle();
                    });
                }
            },
            loadCustomScene(demoConstructor, then, engine) {
                var canvas=document.getElementById("renderCanvas");
                document.getElementById("notSupported").className = "";
                var scene = demoConstructor(engine);
                if (scene.activeCamera) {
                    scene.activeCamera.attachControl(canvas, false);
                }
                scene.executeWhenReady(() => {
                    canvas.style.opacity = 1;
                    if (then) {
                        then(scene);
                    }
                });
                return scene;
            },

            createScene(engine) {

                var earthFragmentShader = "precision highp float;\r\n" +
                    "varying vec3 vPosition;\r\n" +
                    "varying vec3 vNormal;\r\n" +
                    "varying vec2 vUV;\r\n" +
                    "uniform mat4 world;\r\n" +
                    "uniform vec3 cameraPosition;\r\n" +
                    "uniform vec3 lightVectorW;\r\n" +
                    "uniform sampler2D daySampler;\r\n" +
                    "uniform sampler2D nightSampler;\r\n" +
                    "uniform float intsmooth;\r\n" +
                    "uniform float intsmootht;\r\n" +
                    "void main(void) {\r\n" +
                    "vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));\r\n" +
                    "vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));\r\n" +
                    "vec3 viewDirectionW = normalize(cameraPosition - vPositionW);\r\n" +
                    "vec4 daycolor = texture2D(daySampler, vUV).rgba;\r\n" +
                    "vec4 nightcolor = texture2D(nightSampler, vUV).rgba;\r\n" +
                    "float ndl = max(0., dot(vNormalW, lightVectorW)) * intsmooth;\r\n" +
                    "float ndlt = max(0., dot(vNormalW, lightVectorW)) * intsmootht;\r\n" +
                    "vec3 angleW = normalize(viewDirectionW + lightVectorW);\r\n" +
                    "float specComp = max(0., dot(vNormalW, angleW));\r\n" +
                    "specComp = pow(specComp, max(1., 64.)) *0.1;\r\n" +
                    "vec4 color=vec4(0.,0.,0.,0.);\r\n" +
                    "if (nightcolor.r*(1.-ndlt)>=0.3) {\r\n" +
                    "nightcolor.rgb=nightcolor.rgb*1.5;\r\n" +
                    "nightcolor.rg=nightcolor.rg+vec2(0.2,0.2);\r\n" +
                    "\r\n}else{\r\n" +
                    "nightcolor.rgb=nightcolor.rgb*0.1;\r\n" +
                    "\r\n}" +
                    "daycolor.rgb =nightcolor.rgb*(1.-ndl)+ daycolor.rgb* ndl + vec3(specComp);\r\n" +
                    "gl_FragColor = vec4(daycolor);\r\n}\r\n";
                var customVertexShader = "precision highp float;\r\n" +
                    "attribute vec3 position;\r\n" +
                    "attribute vec3 normal;\r\n" +
                    "attribute vec2 uv;\r\n" +
                    "uniform mat4 worldViewProjection;\r\n" +
                    "varying vec3 vPosition;\r\n" +
                    "varying vec3 vNormal;\r\n" +
                    "varying vec2 vUV;\r\n" +
                    "void main(void) {\r\n" +
                    "vec4 outPosition = worldViewProjection * vec4(position, 1.0);\r\n" +
                    "gl_Position = outPosition;\r\n" +
                    "vUV = uv;\r\n" +
                    "vPosition = position;\r\n" +
                    "vNormal = normal;\r\n}\r\n";
                var customFragmentShader = "precision highp float;\r\n" +
                    "varying vec3 vPosition;\r\n" +
                    "varying vec3 vNormal;\r\n" +
                    "varying vec2 vUV;\r\n" +
                    "uniform mat4 world;\r\n" +
                    "uniform vec3 cameraPosition;\r\n" +
                    "uniform vec3 lightVectorW;\r\n" +
                    "uniform sampler2D textureSampler;\r\n" +
                    "uniform float mixsmooth;\r\n" +
                    "uniform float intsmooth;\r\n" +
                    "uniform float time;\r\n" +
                    "void main(void) {\r\n" +
                    "vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));\r\n" +
                    "vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));\r\n" +
                    "vec3 viewDirectionW = normalize(cameraPosition - vPositionW);\r\n" +
                    // "vec2 UV = vec2(vUV.x+sin(time)*0.1+sin(vPosition.x)*0.01,vUV.y);\r\n" +
                    "vec4 color = texture2D(textureSampler, vUV).rgba;\r\n" +
                    "float ndl = max(0., dot(vNormalW, lightVectorW)) * intsmooth;\r\n" +
                    "vec3 angleW = normalize(viewDirectionW + lightVectorW);\r\n" +
                    "float specComp = max(0., dot(vNormalW, angleW));\r\n" +
                    "specComp = pow(specComp, max(1., 64.)) * 0.1;\r\n" +
                    "color.rgb =color.rgb*mixsmooth+ color.rgb* ndl + vec3(specComp);\r\n" +
                    "gl_FragColor = vec4(color);\r\n}\r\n";


                var r = 3;//球的半径
                var canvas = engine.getRenderingCanvas();
                engine.enableOfflineSupport = false;
                var scene = new BABYLON.Scene(engine);

                var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
                light.intensity = 0.1;

                var light1 = new BABYLON.DirectionalLight("Omni2", new BABYLON.Vector3(1, 0, 0), scene);
                light1.intensity = 1;

                var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI/2, Math.PI / 2, 12, BABYLON.Vector3.Zero(), scene);
                camera.attachControl(canvas, false);
                camera.lowerRadiusLimit = 12;
                camera.upperRadiusLimit = 12;
                camera.minZ = 1.0;
                camera.layerMask = 2;
                scene.activeCamera = camera;
                scene.clearColor = new BABYLON.Color3(0, 0, 0.6);

                // Skybox
                var tex = new BABYLON.Texture("static/SPACE006SX.jpg", scene);
                var material2 = new BABYLON.StandardMaterial("kosh2", scene);
                var skybox = BABYLON.Mesh.CreateSphere("skyBox", 50, 2000, scene);
                material2.diffuseTexture = tex;
                material2.emissiveTexture = tex;
                material2.backFaceCulling = false;
                skybox.material = material2;

                //地球node
                var earthgroup = new BABYLON.Mesh("g", scene);
                earthgroup.position = new BABYLON.Vector3(0, 0, 0);
                //地球node
                var earthgroupcloud = new BABYLON.Mesh("g", scene);
                earthgroupcloud.position = new BABYLON.Vector3(0, 0, 0);
                //地球角度偏移node
                var earthgroupAngle = new BABYLON.Mesh("g", scene);
                earthgroupAngle.position = new BABYLON.Vector3(0, 0, 0);

                function createtext(mesh, name) {
                    var plane = BABYLON.Mesh.CreatePlane("plane", 8);
                    plane.rotation = mesh.rotation;
                    plane.parent = mesh;
                    var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
                    var panel2 = new BABYLON.GUI.StackPanel();
                    panel2.top = "0px";
                    advancedTexture2.addControl(panel2);
                    var text1 = new BABYLON.GUI.TextBlock();
                    text1.text = name;
                    text1.fontSize = "14px"
                    text1.color = "#fff";
                    panel2.addControl(text1);
                }
                function createWefttext(mesh, name) {
                    var plane = BABYLON.Mesh.CreatePlane("plane", 8);
                    plane.rotation = new BABYLON.Vector3(mesh.rotation.x, -Math.PI / 2, 0);
                    if (name == "国际日期变更线") {
                        plane.rotation = new BABYLON.Vector3(Math.PI+mesh.rotation.x, -Math.PI / 2,Math.PI/2);
                    }else if (name == "本初子午线") {
                        plane.rotation = new BABYLON.Vector3(Math.PI+mesh.rotation.x, Math.PI / 2,Math.PI/2);
                    }
                    var plane1 = new BABYLON.Mesh("plane", scene);
                    plane1.rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
                    plane.setParent(plane1);
                    mesh.rotation = new BABYLON.Vector3(0, 0, 0);
                    plane1.parent = mesh;
                    var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
                    var panel2 = new BABYLON.GUI.StackPanel();
                    panel2.top = "0px";
                    advancedTexture2.addControl(panel2);
                    var text1 = new BABYLON.GUI.TextBlock();
                    text1.text = name;
                    text1.fontSize = "14px"
                    text1.color = "#fff";
                    panel2.addControl(text1);
                }
                //根据半径、角度求圆上的点，并设置坐标轴及轴上的值
                function drawcircle(r, ang, axisvalue, axis) {
                    var x = r * Math.cos(ang * Math.PI / 180);
                    var y = r * Math.sin(ang * Math.PI / 180);
                    if (axis == "x") {
                        return new BABYLON.Vector3(axisvalue, x, y);
                    } else if (axis == "z") {
                        return new BABYLON.Vector3(x, y, axisvalue);
                    } else {
                        return new BABYLON.Vector3(x, axisvalue, y);
                    }
                }
                //设置将要画圆的坐标集
                function setvertices(r, value, y, axis) {
                    var vertices = [];
                    for (var i = 0; i <= value; i+=3/r) {
                        vertices.push(drawcircle(r, i, y, axis));
                    }
                    vertices.push(drawcircle(r, value, y, axis));
                    return vertices;
                }
                //画出可更新的圆，并设置颜色
                function createCircle(r, value, y, color, scene, axis) {
                    var vertices = setvertices(r, value, y, axis);
                    var circle = BABYLON.MeshBuilder.CreateLines("lines", {
                        points: vertices,
                        updatable: true,
                        instance: circle
                    }, scene);
                    circle.color = color;
                    return circle;
                }
                //画出可更新的圆，并设置颜色
                function createDashedCircle(r, value, y, color, scene, axis) {
                    var vertices = setvertices(r, value, y, axis);
                    var Dashedcircle = BABYLON.Mesh.CreateDashedLines("lines", vertices, 10, 10, vertices.length, scene, true, Dashedcircle);
                    Dashedcircle.color = color;
                    return Dashedcircle;
                }
                var i;
                //创建纬线
                function CreateWeft(r, percentPI, color) {
                    for (i = 0; i < 90; i += percentPI) {
                        if (i == 0) {
                            CreateWeftLine(i, r, 360, color);
                        } else {
                            CreateWeftLine(i, r, 360, color);
                            CreateWeftLine(i, r, 360, color, true);
                        }
                    }
                }
                //创建纬线标签
                function CreateWeftLabel(r, percentPI) {
                    for (i = 0; i < 90; i += percentPI) {
                        if (i == 0) {
                            //CreateWeftLineLabel(i, r);
                        } else {
                            CreateWeftLineLabel(i, r);
                            CreateWeftLineLabel(i, r, true);
                        }
                    }
                }
                function CreateWeftLineLabel(earthangle, r, pos) {
                    //earthangle地球从赤道开始角度
                    var x = Math.cos(earthangle * Math.PI / 180) * r;//所算出x值
                    var rot = new BABYLON.Vector3(earthangle * Math.PI / 180, 0, 0);
                    if (pos) {
                        var y = Math.sqrt(r * r - x * x);//所算出y值
                    } else {
                        var y = -Math.sqrt(r * r - x * x);//所算出y值
                        rot = new BABYLON.Vector3(-earthangle * Math.PI / 180, 0, 0);
                    }

                    var circledot = new BABYLON.Mesh("g", scene);
                    circledot.rotation = rot;
                    circledot.position = new BABYLON.Vector3(x, y, 0);


                    if (earthangle == 23.26 && pos) {
                        createWefttext(circledot, "北回归线");
                    } else if (earthangle == 23.26 && !pos) {
                        createWefttext(circledot, "南回归线");
                    } else if (earthangle == 66.74 && pos) {
                        createWefttext(circledot, "北极圈");
                    } else if (earthangle == 66.74 && !pos) {
                        createWefttext(circledot, "南极圈");
                    } else if (earthangle == 31.1 && pos) {
                        circledot.position = new BABYLON.Vector3(-x, y, 0);
                        circledot.rotation = new BABYLON.Vector3(-earthangle * Math.PI / 180, Math.PI, 0);
                        createWefttext(circledot, "国际日期变更线");
                    } else if (earthangle == 7.2 && pos) {
                        circledot.rotation = new BABYLON.Vector3(-earthangle * Math.PI / 180, Math.PI, 0);
                        createWefttext(circledot, "本初子午线");
                    } else {
                        createWefttext(circledot, earthangle + "°");
                    }

                    circledot.setParent(earthgroup);
                }
                function CreateWeftLine(earthangle, r, angle, color, pos) {
                    //earthangle地球从赤道开始角度
                    var x = Math.cos(earthangle * Math.PI / 180) * r;//所算出x值
                    if (pos) {
                        var y = Math.sqrt(r * r - x * x);//所算出y值
                    } else {
                        var y = -Math.sqrt(r * r - x * x);//所算出y值
                    }
                    var circle = createCircle(x, angle, y, color);
                    circle.setParent(earthgroup);
                }
                //创建纬线（虚线）
                function CreateDashedWeft(earthangle, r, angle, color, pos) {
                    //earthangle地球从赤道开始角度
                    var x = Math.cos(earthangle * Math.PI / 180) * r;//所算出x值
                    if (pos) {
                        var y = Math.sqrt(r * r - x * x);//所算出y值
                    } else {
                        var y = -Math.sqrt(r * r - x * x);//所算出y值
                    }
                    var Dashedcircle = createDashedCircle(x, angle, y, color);
                    Dashedcircle.setParent(earthgroup);
                }
                //创建经线
                function createWarp(r, percentPI, color) {

                    for (i = 0; i < Math.PI; i += Math.PI / percentPI) {
                        var ncircles = createCircle(r, 360, 0, color, scene, "x");
                        var rot = new BABYLON.Vector3(0, i, 0);
                        ncircles.rotation = rot;
                        ncircles.setParent(earthgroup);
                    }
                }

                //设置将要画国际日期变更线的坐标集
                function setDateChangevertices(r, value, y) {
                    var verty = [];
                    for (var i = 0; i <= value; i++) {
                        var varr = r / 180 * 2 * i - r;
                        var yv = Math.sqrt(r * r - varr * varr);
                        verty.push(yv);
                    }
                    var rotangle = 0;
                    var vertices = [];
                    for (var i = 0; i <= value; i++) {
                        var va = r / 180 * 2 * i - r;
                        if (i >= 20 && i < 25) {
                            rotangle = rotangle + 1;
                        } else if (i >= 60 && i < 70) {
                            rotangle = rotangle - 0.5;
                        } else if (i >= 160 && i < 163) {
                            rotangle = rotangle - 2.8;
                        } else if (i >= 163 && i < 169) {
                            rotangle = rotangle + 1.77;
                        } else if (i >= 169 && i < 174) {
                            rotangle = rotangle + 1.80;
                        } else if (i >= 177 && i < 178) {
                            rotangle = rotangle - 11;
                        }
                        vertices.push(drawcircle(verty[i], rotangle, va));
                    }
                    return vertices;
                }

                //创建国际日期变更线
                function createDateChangeLine(r, value, y, color, scene) {
                    var vertices = setDateChangevertices(r, value, y);
                    var circle = BABYLON.MeshBuilder.CreateLines("lines", {
                        points: vertices, updatable: true, instance: circle
                    }, scene);
                    circle.color = color;
                    circle.rotation.y = Math.PI;
                    circle.setParent(earthgroup);
                }


                //创建经线
                function createWarpLabel(r, percentPI) {
                    var anglev = 0;
                    for (i = 0; i < 2 * Math.PI; i += Math.PI / percentPI) {
                        var vall = i / 2 + Math.PI / 4;
                        var rot = new BABYLON.Vector3(0, -vall, 0);
                        var x = r * Math.cos(i);
                        var z = r * Math.sin(i);

                        var circledot = new BABYLON.Mesh("g", scene);
                        circledot.rotation = rot;
                        circledot.position = new BABYLON.Vector3(x, 0, z);

                        if (anglev < 180 && anglev > 0) {
                            createtext(circledot, anglev + "°");
                        } else if (anglev == 180) {
                            var va = 360 - anglev;
                            createtext(circledot, "东经" + va + "°西经");
                        } else if (anglev == 0) {
                            createtext(circledot, "西经" + anglev + "°东经");
                        } else {
                            var va = 360 - anglev;
                            createtext(circledot, va + "°");
                        }
                        circledot.setParent(earthgroup);
                        anglev += 6 / percentPI * 30;
                    }
                }
                //画地轴
                function CreateAxisLine(radius, parent) {
                    var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 2 * radius, 0.05, 0.05, 16, 1, scene);
                    var cylinderMat = new BABYLON.StandardMaterial("cylinder", scene);
                    cylinderMat.emissiveColor = BABYLON.Color3.Gray();
                    cylinder.material = cylinderMat;
                    cylinder.setParent(parent);
                }
                var linecolor = new BABYLON.Color3(0.5, 0.5, 0.5);
                var DashedLineColor = new BABYLON.Color3(0.8, 0.8, 0);
                var lineradius = r + 0.01;
                CreateAxisLine(r+1, earthgroup);
                CreateWeft(lineradius, 15, linecolor);//创建纬线：0°至南北纬90°，间隔15°；
                // CreateWeft(lineradius,30, linecolor);//创建纬线：0°至南北纬90°，间隔30°；
                CreateDashedWeft(23.26, lineradius, 360, DashedLineColor, true);//创建回归线：0°至南北纬90°，间隔30°；
                CreateDashedWeft(23.26, lineradius, 360, DashedLineColor);
                CreateDashedWeft(66.74, lineradius, 360, DashedLineColor);//创建极圈：0°至南北纬90°，间隔30°；
                CreateDashedWeft(66.74, lineradius, 360, DashedLineColor, true);
                createWarp(lineradius, 12, linecolor);//创建经线：起始线0°至180°，间隔30°；

//                CreateWeftLabel(lineradius, 15);
//                CreateWeftLineLabel(23.26, lineradius);
//                CreateWeftLineLabel(23.26, lineradius, true);
//                CreateWeftLineLabel(66.74, lineradius);
//                CreateWeftLineLabel(66.74, lineradius, true);
//                createWarpLabel(lineradius, 12);//创建经线标签：起始线0°至180°，间隔30°；
//                CreateWeftLineLabel(31.1, lineradius, true);//国际日期变更线
//                CreateWeftLineLabel(7.2, lineradius, true);//本初子午线
                createDateChangeLine(r + 0.02, 180, 0, DashedLineColor, scene);

                //画地球
//                var diffusetex = new BABYLON.Texture("static/earth/earth8k.jpg", scene);
                var daySampler = new BABYLON.Texture("static/earth/earth8k.jpg", scene);
                var nightSampler = new BABYLON.Texture("static/earth/night.jpg", scene);
//                var NRMtex = new BABYLON.Texture("static/earth/earth8k_NRM.jpg", scene);

                BABYLON.Effect.ShadersStore["earthVertexShader"] = customVertexShader;
                BABYLON.Effect.ShadersStore["earthFragmentShader"] = earthFragmentShader;
                var earthforMaterial = new BABYLON.ShaderMaterial("shader", scene, { vertex: "earth", fragment: "earth", }, { attributes: ["position", "normal", "uv"], uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"] });
                earthforMaterial.setTexture("daySampler", daySampler);
                earthforMaterial.setTexture("nightSampler", nightSampler);
                earthforMaterial.setVector3("cameraPosition", scene.activeCamera.position);
                earthforMaterial.setFloat("intsmooth", 1);//晨昏线明显度
                earthforMaterial.setFloat("intsmootht", 5);//晨昏线明显度
                earthforMaterial.setVector3("lightVectorW", new BABYLON.Vector3(-light1.direction.x, -light1.direction.y, -light1.direction.z));
                earthforMaterial.backFaceCulling = false;

                // var earthMaterial = new BABYLON.StandardMaterial("earth", scene);
                // earthMaterial.diffuseTexture = diffusetex;
                // earthMaterial.specularColor = new BABYLON.Color3(0., 0., 0.);

                var earth = BABYLON.Mesh.CreateSphere("earth", 32, 2 * r, scene);
                earth.material = earthforMaterial;
                earth.rotation = new BABYLON.Vector3(0, 0, Math.PI);
                earth.setParent(earthgroup);

                //画地球云图
                var planTexture = new BABYLON.Texture("static/earth/cloud.png", scene);
                BABYLON.Effect.ShadersStore["planVertexShader"] = customVertexShader;
                BABYLON.Effect.ShadersStore["planFragmentShader"] = customFragmentShader;
                var cloudMaterial = new BABYLON.ShaderMaterial("shader", scene, { vertex: "plan", fragment: "plan", }, { attributes: ["position", "normal", "uv"], uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"], needAlphaBlending: true });
                cloudMaterial.setTexture("textureSampler", planTexture);
                cloudMaterial.setVector3("cameraPosition", scene.activeCamera.position);
                cloudMaterial.setFloat("mixsmooth", 0.1);//云图阴影叠加值
                cloudMaterial.setFloat("intsmooth", 3.);//晨昏线明显度
                cloudMaterial.setFloat("time", 0);//晨昏线明显度
                cloudMaterial.setVector3("lightVectorW", new BABYLON.Vector3(-light1.direction.x, -light1.direction.y, -light1.direction.z));
                cloudMaterial.backFaceCulling = false;

                var cloud = BABYLON.Mesh.CreateSphere("earth", 32, 2 * r + 0.1, scene);
                cloud.material = cloudMaterial;
                cloud.rotation = new BABYLON.Vector3(0, 0, Math.PI);
                cloud.setParent(earthgroupcloud);
                earthgroupcloud.setParent(earthgroup);
                //地球偏移node偏移
                earthgroup.setParent(earthgroupAngle);
                earthgroupAngle.rotation = new BABYLON.Vector3(0, 0, Math.PI / 180 * 23.26);

                var alpha = 0;
                scene.registerBeforeRender(()=>{
                    if(!this.choose&&this.switch_checked){
                        var activeCameraPosition = scene.activeCamera.position;
                        var direction = new BABYLON.Vector3(-light1.direction.x, -light1.direction.y, -light1.direction.z);
                        cloudMaterial.setVector3("cameraPosition", activeCameraPosition);
                        cloudMaterial.setVector3("lightVectorW", direction);
                        cloudMaterial.setFloat("time", alpha);//晨昏线明显度
                        earthforMaterial.setVector3("cameraPosition", activeCameraPosition);
                        earthforMaterial.setVector3("lightVectorW", direction);

                        earthgroupcloud.rotation = new BABYLON.Vector3(0, alpha * 0.2, 0);
                        earthgroup.rotation = new BABYLON.Vector3(0, alpha, 0);
                        alpha -= 0.002;
                    }
                });
                var click;
                var isMob = /iPad|Android/g.test(navigator.userAgent);
                if(!isMob){
                    click='click'
                }else{
                    click='touchstart'
                }
                $('.aside_reset').on(click,()=>{
                    this.switch_checked=false;
                    this.blue1='';
                    this.blue2='';
                    this.blue3='';
                    this.blue4='';
                    this.blue5='';
                    this.src='';
                    this.src2='';
                    this.src3='';
                    this.src4='';
                    this.src5='';
                    this.src6='';
                    this.choose=false;
                    this.ang=0;
                    this.s31f=30;
                    this.s32f=-30;
                    this.s33f=-30;
                    this.s34f=-30;
                    this.s35f=-30;
                    this.s36f=-30;
                    this.s41f=-30;
                    this.s42f=30;
                    this.s43f=30;
                    this.s44f=30;
                    this.s45f=30;
                    this.s46f=30;
                    this.s47f=30;
                    this.s48f=-30;
                    this.s49f=-30;
                    this.s410f=-30;
                    this.s411f=-30;
                    this.s412f=-30;
                    $('canvas').css({'opacity':'1','zIndex':'999'});
                    clearInterval(this.SET);
                    camera.radius=12;
                    camera.alpha=Math.PI/2;
                    camera.beta=Math.PI/2;
                    earthgroupcloud.rotation = new BABYLON.Vector3(0, 0, 0);
                    earthgroup.rotation = new BABYLON.Vector3(0, 0, 0);
                });
                return scene;
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

    canvas {
        outline: none;
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
        touch-action: none;
        -ms-touch-action: none;
    }

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        position: relative;
    }

    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently not supported by any browser */
    }

    /*ui*/
    .UI-camera {
        width: 80px;
        height: 80px;
        cursor: pointer;
    }

    /*内容区*/
    .container {
        width: calc(100% - 280px);
        float: left;
        height: 100%;
        overflow: hidden;
        position: relative;
    }

    .container h3 {
        font-size: 24px;
        color: #000;
        line-height: 1.0;
        padding: 24px;
        font-weight: normal;
        outline: none;
    }

    .app_aside {
        float: left;
        width: 280px;
        background-color: #F7F7F7;
        height: 100%;
        box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);
    }
    .container>div{
        width: 100%;
        height: calc(100% - 72px);
        position: absolute;
        top:72px;
        z-index: 666;
    }
    canvas {
        width: 100%;
        height: calc(100% - 72px);
        position: absolute;
        top:72px;
        z-index: 999;
    }

    .insp-wrapper {
        width: 100%;
        height: 100%;
    }

    .aside_reset {
        margin: 20px 24px;
        float: right;
    }

    .btn_space {
        padding: 20px;
        width: 100%;
        height: calc(100% - 80px);
        clear: both;
        /*display: flex;*/
        /*align-items: center;*/
        justify-content: center;
        flex-direction: column;
        overflow: hidden;
        overflow-y: auto;
    }

    .btn_space .UI-btn {
        margin-bottom: 20px;
    }
    .show{
        width: 500px;
        height: 500px;
        padding: 75px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        overflow: hidden;
    }
    .show>div{
        width: 350px;
        height:350px;
        position: absolute;
    }
    .show>div>span{
        display: inline-block;
        width: 32px;
        height: 22px;
        position: absolute;
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
        cursor: default;
        z-index: 9999;
    }
    .hidden {
        display: none
    }
</style>