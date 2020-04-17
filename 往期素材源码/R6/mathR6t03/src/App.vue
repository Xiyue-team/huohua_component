<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <canvas id="renderCanvas"></canvas>
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset"  id="asideReset"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" >
        <ui-btn type="switch" v-model="switch_checked1">
          x0y
        </ui-btn>
        <ui-btn type="switch" v-model="switch_checked2">
          y0z
        </ui-btn>
        <ui-btn type="switch" v-model="switch_checked3">
          z0x
        </ui-btn>
      </div>
    </div>
  </div>
</template>

<script>
    import uiBtn from '@/components/UI/uiBtn';//按钮
    export default {
        name: 'app',
        components: {uiBtn},
        data(){
            return {
                canvas: null,
                title: '空间直角坐标系-坐标平面',
                switch_checked1:false,
                switch_checked2:false,
                switch_checked3:false,
                show_x0y : false,
                show_y0z : false,
                show_z0x : false,
            }
        },
        created(){
            document.title = this.title;
        },
        methods: {
            //创建模型
            createScene(){
                var customVertexShader = "precision highp float;\r\nattribute vec3 position;\r\nattribute vec3 normal;\r\nattribute vec2 uv;\r\nuniform mat4 worldViewProjection;\r\nvarying vec3 vPosition;\r\nvarying vec3 vNormal;\r\nvarying vec2 vUV;\r\nvoid main(void) {\r\nvec4 outPosition = worldViewProjection * vec4(position, 1.0);\r\ngl_Position = outPosition;\r\nvUV = uv;\r\nvPosition = position;\r\nvNormal = normal;\r\n}\r\n";
                var customFragmentShader2 = "precision highp float;\r\nvarying vec3 vPosition;\r\nvarying vec3 vNormal;\r\nvarying vec2 vUV;\r\nuniform mat4 world;\r\nuniform sampler2D textureSampler;\r\nvoid main(void) {\r\n vec4 color = texture2D(textureSampler, vUV).rgba;\r\ngl_FragColor = vec4(color);\r\n}\r\n";

                var thiz=this;
                //设置引擎
                var engine = new BABYLON.Engine(this.canvas, true);
                //设置场景
                var scene = new BABYLON.Scene(engine);
                scene.clearColor = new BABYLON.Color3(1, 1, 1);
                //设置灯光
                var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 0, 0), scene);
                light.diffuseColor = new BABYLON.Color3(190/255, 188/255, 1);
                var light0 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, -1, 0), scene);
                light0.diffuse = new BABYLON.Color3(190/255, 188/255, 1);
                var light0 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, 1, 0), scene);
                light0.diffuse = new BABYLON.Color3(190/255, 188/255, 1);

                //设置相机
                var camera1 = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI/2, 10, new BABYLON.Vector3(0, 0, 0), scene);
                camera1.lowerRadiusLimit = 30 ;
                camera1.upperRadiusLimit = 30 ;
                camera1.minZ = 1.0;
                camera1.attachControl(this.canvas, true);
                camera1.setPosition(new BABYLON.Vector3(22.79, 11.15, 16.02));
                camera1.layerMask=0x20000000;

                var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI/2, 10, new BABYLON.Vector3(0, 0, 0), scene);
                camera.lowerRadiusLimit = 30 ;
                camera.upperRadiusLimit = 30 ;
                camera.minZ = 1.0;
                camera.setPosition(new BABYLON.Vector3(22.79, 11.15, 16.02));

                camera.attachControl(this.canvas, true);
                camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
                var sb = engine.getRenderHeight() / engine.getRenderWidth();
                camera.orthoTop = sb*24;
                camera.orthoBottom = -sb*24 ;
                camera.orthoLeft = -24;
                camera.orthoRight = 24;
                scene.activeCameras.push(camera);
                scene.activeCameras.push(camera1);
                var length = 10;

                createAxis_X(length,Math.PI/2,scene);
                createAxis_Y(length,Math.PI/2,Math.PI/2,scene);
                createAxis_Z(length,-Math.PI/2,-Math.PI/2,scene);

                var O = new BABYLON.Mesh("p", scene);
                O.position = new BABYLON.Vector3(0.3, -1.2, 0);
                createLabel(O,"0");

                var poly_x;
                var poly_y;
                var poly_z;
                poly_x = BABYLON.Mesh.CreatePlane("plane1", 12.0, scene);
                poly_x.position = new BABYLON.Vector3(0,0,0);
                poly_x.rotation = new BABYLON.Vector3(-Math.PI/2, 0 , 0);

                var planTexture1 = new BABYLON.Texture("./static/image/blue.png", scene);
                BABYLON.Effect.ShadersStore["planVertexShader"] = customVertexShader;
                BABYLON.Effect.ShadersStore["planFragmentShader"] = customFragmentShader2;
                var materialplans = new BABYLON.ShaderMaterial("shader", scene, { vertex: "plan", fragment: "plan", }, { attributes: ["position", "normal", "uv"], uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"], needAlphaBlending: true });
                materialplans.setTexture("textureSampler", planTexture1);
                materialplans.backFaceCulling = false;
                poly_x.material = materialplans;
                poly_x.layerMask=0x20000000;
                poly_x.isVisible=false;

                poly_y = BABYLON.Mesh.CreatePlane("plane1", 12.0, scene);
                poly_y.position = new BABYLON.Vector3(0,0,0);
                poly_y.rotation = new BABYLON.Vector3(0, -Math.PI/2, 0);

                var planTexture1 = new BABYLON.Texture("./static/image/green.png", scene);
                BABYLON.Effect.ShadersStore["planVertexShader"] = customVertexShader;
                BABYLON.Effect.ShadersStore["planFragmentShader"] = customFragmentShader2;
                var materialplans = new BABYLON.ShaderMaterial("shader", scene, { vertex: "plan", fragment: "plan", }, { attributes: ["position", "normal", "uv"], uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"], needAlphaBlending: true });
                materialplans.setTexture("textureSampler", planTexture1);
                materialplans.backFaceCulling = false;
                poly_y.material = materialplans;
                poly_y.layerMask=0x20000000;
                poly_y.isVisible=false;

                poly_z = BABYLON.Mesh.CreatePlane("plane1", 12.0, scene);
                poly_z.position = new BABYLON.Vector3(0,0,0);
                poly_z.rotation = new BABYLON.Vector3(0, 0, -Math.PI/2);

                var planTexture1 = new BABYLON.Texture("./static/image/red.png", scene);
                BABYLON.Effect.ShadersStore["planVertexShader"] = customVertexShader;
                BABYLON.Effect.ShadersStore["planFragmentShader"] = customFragmentShader2;
                var materialplans = new BABYLON.ShaderMaterial("shader", scene, { vertex: "plan", fragment: "plan", }, { attributes: ["position", "normal", "uv"], uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"], needAlphaBlending: true });
                materialplans.setTexture("textureSampler", planTexture1);
                materialplans.backFaceCulling = false;
                poly_z.material = materialplans;
                poly_z.layerMask=0x20000000;
                poly_z.isVisible=false;
                //启动
                engine.runRenderLoop(() => {
                    scene.render();
                    //打开开关
                    if(this.switch_checked1){
                        poly_x.isVisible=true;
                    }else{
                        poly_x.isVisible=false;
                    }
                    if(this.switch_checked2){
                        poly_y.isVisible=true;
                    }else{
                        poly_y.isVisible=false;
                    }
                    if(this.switch_checked3){
                        poly_z.isVisible=true;
                    }else{
                        poly_z.isVisible=false;
                    }
                });
                engine.resize();
                //窗口更改大小
                window.addEventListener('resize', ()=>{
                    engine.resize();
                    var sb = engine.getRenderHeight() / engine.getRenderWidth();
                    this.camera.orthoTop = sb*24;
                    this.camera.orthoBottom = -sb*24 ;
                    this.camera.orthoLeft = -24;
                    this.camera.orthoRight = 24;
                })
                function createCone(name,x1,y1,z1,x2,y2,z2,scene){
                    var cone = BABYLON.Mesh.CreateCylinder("cone",0.35 ,0,0.17,10, scene);
                    var mat = new BABYLON.StandardMaterial("1", scene);
                    mat.diffuseColor =  new BABYLON.Color3(0, 0, 0);
                    mat.specularColor = new BABYLON.Color3(0, 0, 0);
                    cone.material = mat;
                    cone.position = new BABYLON.Vector3(x1, y1, z1);
                    createLabel(cone,name);

                    var polygon_parent = new BABYLON.Mesh("", scene);
                    polygon_parent.position = new BABYLON.Vector3(0, 0, 0);
                    cone.setParent(polygon_parent);
                    polygon_parent.rotation = new BABYLON.Vector3(x2,y2,z2);
                }
                function createCylinder(size,x,y,z,scene){
                    var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", size ,0.07,0.07,10, scene);
                    var mat = new BABYLON.StandardMaterial("2", scene);
                    mat.diffuseColor =  new BABYLON.Color3(0.2, 0.2, 0.2);
                    mat.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
                    cylinder.material = mat;
                    cylinder.position = new BABYLON.Vector3(0, 0, 0);
                    cylinder.rotation = new BABYLON.Vector3(x,y,z);
                }
                function createAxis_X(size,x,scene){
                    createCylinder(size*2,0,0,-x,scene);
                    createCone("x",0,size+.15,0,0,0,-x,scene);
                }
                function createAxis_Y(size,y,z,scene){
                    createCylinder(size*2,0,y,0,scene);
                    createCone("z",0,size+.15,0,0,y,0,scene);
                }
                function createAxis_Z(size,x,y,scene){
                    createCylinder(size*2,0,y,x,scene);
                    createCone("y",0,size+.15,0,0,y,x,scene);
                }
                function createLabel(mesh,name) {
                    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");
                    var label = new BABYLON.GUI.Rectangle(name);
                    label.height = "30px";
                    label.alpha = 1;
                    label.width = "200px";
                    label.cornerRadius = 20;
                    label.thickness = 0;
                    label.linkOffsetY = -20;
                    advancedTexture.addControl(label);
                    label.linkWithMesh(mesh);

                    var text1 = new BABYLON.GUI.TextBlock();
                    text1.text = name;
                    text1.color = "black";
                    label.addControl(text1);
                    return advancedTexture;
                }
                //重置
                function resetWidget(){
                    thiz.switch_checked1 = false;
                    thiz.switch_checked2 = false;
                    thiz.switch_checked3 = false;
                    camera.setPosition(new BABYLON.Vector3(22.79, 11.15, 16.02));
                    camera1.setPosition(new BABYLON.Vector3(22.79, 11.15, 16.02));
                }
                var isMob=/iPad|Android/g.test(navigator.userAgent);
                if(isMob){
                    document.getElementById('asideReset').addEventListener('touchstart',resetWidget);
                }else{
                    document.getElementById('asideReset').addEventListener('click',resetWidget);
                }
            },
        },
        mounted(){
            this.canvas = document.getElementById("renderCanvas");
            //创建模型
            this.createScene();
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
    background-color:#fff;
    touch-action: none;
    -ms-touch-action: none;
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

  /*ui*/
  .UI-camera {
    width: 80px;
    height: 80px;
    cursor: pointer;
  }

  /*内容区*/
  .container {
    width:100%;
    float: left;
    height:100%;
  }
  .container h3{
    font-size: 24px;
    color: #000;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
  }

  canvas {
    width: 100%;
    height: calc(100% - 72px);
  }

  .insp-wrapper {
    width: 100%;
    height: 100%;
  }
  .aside_reset{
    position: absolute;
    top: 20px;
    right:24px;
  }
  .btn_space{
    width: 240px;
    height:110px;
    position:absolute;
    right:24px;
    bottom:64px;
  }
  .btn_space .UI-btn{
    margin-bottom: 10px;
  }
</style>