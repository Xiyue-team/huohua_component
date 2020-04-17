<template>
    <div>
        <div class="control-container">
            <p>地球自转的方向</p>
            <i id="clear"><img class="btn" src="static/image/chongzhi.png" /></i>
        </div>
        <div class="renderCanvas-container">
            <canvas id="renderCanvas" touch-action="none" width="1920" height="1080" tabindex="1" style="opacity: 1;"></canvas>
        </div>
        <div id='check'>
            <img id="cleard" class="checkbtn" src="static/image/gray.png" />
        </div>
        <div id='check2'>
            <img id="cleard2" class="checkbtn" src="static/image/stop.png" />
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
      checked: true,
      checked2: true,
      sceneChecked: false
    };
  },
  methods: {
    init() {
      this.canvas = document.getElementById("renderCanvas");
      var engine = new BABYLON.Engine(this.canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true
      });
      var thiz = this;
      if (!BABYLON.Engine.isSupported()) {
        //TODO显示webgl不支持信息
      } else {
        var scene = this.loadCustomScene(this.createScene, engine);
        var renderTimes=0;
        var renderFunction = function() {
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
      engine.resize();
    },
    // Render loop
    loadCustomScene(demoConstructor, engine) {
      document.getElementById("notSupported").className = "";
      var scene = demoConstructor(engine);
      scene.executeWhenReady(() => {
        this.canvas.style.opacity = 1;
      });
      return scene;
    },
    createScene(engine) {
      var JSONData =
{"producer":{"name":"Blender","version":"2.78 (sub 0)","exporter_version":"5.4.0","file":"points.babylon"},
"autoClear":true,"clearColor":[0.0509,0.0509,0.0509],"ambientColor":[0,0,0],"gravity":[0,-9.81,0],
"materials":[{"name":"points.lambert1.001","id":"points.lambert1.001","ambient":[0.5,0.5,0.5],"diffuse":[0.4,0.4,0.4],"specular":[0.5,0.5,0.5],"emissive":[0,0,0],"specularPower":49,"alpha":1,"backFaceCulling":true,"checkReadyOnlyOnce":false,"maxSimultaneousLights":4}],
"multiMaterials":[],
"skeletons":[],
"meshes":[{"name":"group11","id":"group11","position":[0,0,0],"rotation":[-1.5708,0,0],"scaling":[0.01,0.01,0.01],"isVisible":false,"isEnabled":true,"checkCollisions":false,"billboardMode":0,"receiveShadows":false,"tags":""},{"name":"W_30_S_75_","id":"W_30_S_75_","parentId":"group11","materialId":"points.lambert1.001","billboardMode":0,"position":[0.6724,0.3882,-2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_30_S_60_","id":"W_30_S_60_","parentId":"group11","materialId":"points.lambert1.001","billboardMode":0,"position":[1.299,0.75,-2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_30_S_45_","id":"W_30_S_45_","parentId":"group11","materialId":"points.lambert1.001","billboardMode":0,"position":[1.8371,1.0607,-2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_30_S_30_","id":"W_30_S_30_","parentId":"group11","materialId":"points.lambert1.001","billboardMode":0,"position":[2.25,1.299,-1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_30_S_15_","id":"W_30_S_15_","parentId":"group11","materialId":"points.lambert1.001","billboardMode":0,"position":[2.5095,1.4489,-0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_30_N_0_","id":"W_30_N_0_","parentId":"group11","materialId":"points.lambert1.001","billboardMode":0,"position":[2.5981,1.5,0],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_30_N_15_","id":"W_30_N_15_","parentId":"group11","materialId":"points.lambert1.001","billboardMode":0,"position":[2.5095,1.4489,0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_30_N_30_","id":"W_30_N_30_","parentId":"group11","materialId":"points.lambert1.001","billboardMode":0,"position":[2.25,1.299,1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_30_N_45_","id":"W_30_N_45_","parentId":"group11","materialId":"points.lambert1.001","billboardMode":0,"position":[1.8371,1.0607,2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_30_N_60_","id":"W_30_N_60_","parentId":"group11","materialId":"points.lambert1.001","billboardMode":0,"position":[1.299,0.75,2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_30_N_75_","id":"W_30_N_75_","parentId":"group11","materialId":"points.lambert1.001","billboardMode":0,"position":[0.6724,0.3882,2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"group10","id":"group10","position":[0,0,0],"rotation":[-1.5708,0,0],"scaling":[0.01,0.01,0.01],"isVisible":false,"isEnabled":true,"checkCollisions":false,"billboardMode":0,"receiveShadows":false,"tags":""},{"name":"W_60_N_75_","id":"W_60_N_75_","parentId":"group10","materialId":"points.lambert1.001","billboardMode":0,"position":[0.3882,0.6724,2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_60_N_60_","id":"W_60_N_60_","parentId":"group10","materialId":"points.lambert1.001","billboardMode":0,"position":[0.75,1.299,2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_60_N_45_","id":"W_60_N_45_","parentId":"group10","materialId":"points.lambert1.001","billboardMode":0,"position":[1.0607,1.8371,2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_60_N_30_","id":"W_60_N_30_","parentId":"group10","materialId":"points.lambert1.001","billboardMode":0,"position":[1.299,2.25,1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_60_N_15_","id":"W_60_N_15_","parentId":"group10","materialId":"points.lambert1.001","billboardMode":0,"position":[1.4489,2.5095,0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_60_N_0_","id":"W_60_N_0_","parentId":"group10","materialId":"points.lambert1.001","billboardMode":0,"position":[1.5,2.5981,0],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_60_S_15_","id":"W_60_S_15_","parentId":"group10","materialId":"points.lambert1.001","billboardMode":0,"position":[1.4489,2.5095,-0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_60_S_30_","id":"W_60_S_30_","parentId":"group10","materialId":"points.lambert1.001","billboardMode":0,"position":[1.299,2.25,-1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_60_S_45_","id":"W_60_S_45_","parentId":"group10","materialId":"points.lambert1.001","billboardMode":0,"position":[1.0607,1.8371,-2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_60_S_60_","id":"W_60_S_60_","parentId":"group10","materialId":"points.lambert1.001","billboardMode":0,"position":[0.75,1.299,-2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_60_S_75_","id":"W_60_S_75_","parentId":"group10","materialId":"points.lambert1.001","billboardMode":0,"position":[0.3882,0.6724,-2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"group9","id":"group9","position":[0,0,0],"rotation":[-1.5708,0,0],"scaling":[0.01,0.01,0.01],"isVisible":false,"isEnabled":true,"checkCollisions":false,"billboardMode":0,"receiveShadows":false,"tags":""},{"name":"W_90_N_75_","id":"W_90_N_75_","parentId":"group9","materialId":"points.lambert1.001","billboardMode":0,"position":[0,0.7765,2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_90_N_60_","id":"W_90_N_60_","parentId":"group9","materialId":"points.lambert1.001","billboardMode":0,"position":[0,1.5,2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_90_N_45_","id":"W_90_N_45_","parentId":"group9","materialId":"points.lambert1.001","billboardMode":0,"position":[0,2.1213,2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_90_N_30_","id":"W_90_N_30_","parentId":"group9","materialId":"points.lambert1.001","billboardMode":0,"position":[0,2.5981,1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_90_N_15_","id":"W_90_N_15_","parentId":"group9","materialId":"points.lambert1.001","billboardMode":0,"position":[0,2.8978,0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_90_N_0_","id":"W_90_N_0_","parentId":"group9","materialId":"points.lambert1.001","billboardMode":0,"position":[0,3,0],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_90_S_15_","id":"W_90_S_15_","parentId":"group9","materialId":"points.lambert1.001","billboardMode":0,"position":[0,2.8978,-0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_90_S_30_","id":"W_90_S_30_","parentId":"group9","materialId":"points.lambert1.001","billboardMode":0,"position":[0,2.5981,-1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_90_S_45_","id":"W_90_S_45_","parentId":"group9","materialId":"points.lambert1.001","billboardMode":0,"position":[0,2.1213,-2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_90_S_60_","id":"W_90_S_60_","parentId":"group9","materialId":"points.lambert1.001","billboardMode":0,"position":[0,1.5,-2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_90_S_75_","id":"W_90_S_75_","parentId":"group9","materialId":"points.lambert1.001","billboardMode":0,"position":[0,0.7765,-2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"group8","id":"group8","position":[0,0,0],"rotation":[-1.5708,0,0],"scaling":[0.01,0.01,0.01],"isVisible":false,"isEnabled":true,"checkCollisions":false,"billboardMode":0,"receiveShadows":false,"tags":""},{"name":"W_120_N_75_","id":"W_120_N_75_","parentId":"group8","materialId":"points.lambert1.001","billboardMode":0,"position":[-0.3882,0.6724,2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_120_N_60_","id":"W_120_N_60_","parentId":"group8","materialId":"points.lambert1.001","billboardMode":0,"position":[-0.75,1.299,2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_120_N_45_","id":"W_120_N_45_","parentId":"group8","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.0607,1.8371,2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_120_N_30_","id":"W_120_N_30_","parentId":"group8","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.299,2.25,1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_120_N_15_","id":"W_120_N_15_","parentId":"group8","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.4489,2.5095,0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_120_N_0_","id":"W_120_N_0_","parentId":"group8","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.5,2.5981,0],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_120_S_15_","id":"W_120_S_15_","parentId":"group8","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.4489,2.5095,-0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_120_S_30_","id":"W_120_S_30_","parentId":"group8","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.299,2.25,-1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_120_S_45_","id":"W_120_S_45_","parentId":"group8","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.0607,1.8371,-2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_120_S_60_","id":"W_120_S_60_","parentId":"group8","materialId":"points.lambert1.001","billboardMode":0,"position":[-0.75,1.299,-2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_120_S_75_","id":"W_120_S_75_","parentId":"group8","materialId":"points.lambert1.001","billboardMode":0,"position":[-0.3882,0.6724,-2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"group7","id":"group7","position":[0,0,0],"rotation":[-1.5708,0,0],"scaling":[0.01,0.01,0.01],"isVisible":false,"isEnabled":true,"checkCollisions":false,"billboardMode":0,"receiveShadows":false,"tags":""},{"name":"W_150_N_75_","id":"W_150_N_75_","parentId":"group7","materialId":"points.lambert1.001","billboardMode":0,"position":[-0.6724,0.3882,2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_150_N_60_","id":"W_150_N_60_","parentId":"group7","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.299,0.75,2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_150_N_45_","id":"W_150_N_45_","parentId":"group7","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.8371,1.0607,2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_150_N_30_","id":"W_150_N_30_","parentId":"group7","materialId":"points.lambert1.001","billboardMode":0,"position":[-2.25,1.299,1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_150_N_15_","id":"W_150_N_15_","parentId":"group7","materialId":"points.lambert1.001","billboardMode":0,"position":[-2.5095,1.4489,0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_150_N_0_","id":"W_150_N_0_","parentId":"group7","materialId":"points.lambert1.001","billboardMode":0,"position":[-2.5981,1.5,0],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_150_S_15_","id":"W_150_S_15_","parentId":"group7","materialId":"points.lambert1.001","billboardMode":0,"position":[-2.5095,1.4489,-0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_150_S_30_","id":"W_150_S_30_","parentId":"group7","materialId":"points.lambert1.001","billboardMode":0,"position":[-2.25,1.299,-1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_150_S_45_","id":"W_150_S_45_","parentId":"group7","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.8371,1.0607,-2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_150_S_60_","id":"W_150_S_60_","parentId":"group7","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.299,0.75,-2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"W_150_S_75_","id":"W_150_S_75_","parentId":"group7","materialId":"points.lambert1.001","billboardMode":0,"position":[-0.6724,0.3882,-2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"group6","id":"group6","position":[0,0,0],"rotation":[-1.5708,0,0],"scaling":[0.01,0.01,0.01],"isVisible":false,"isEnabled":true,"checkCollisions":false,"billboardMode":0,"receiveShadows":false,"tags":""},{"name":"E_180_N_75_","id":"E_180_N_75_","parentId":"group6","materialId":"points.lambert1.001","billboardMode":0,"position":[-0.7765,0,2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_180_N_60_","id":"E_180_N_60_","parentId":"group6","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.5,0,2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_180_N_45_","id":"E_180_N_45_","parentId":"group6","materialId":"points.lambert1.001","billboardMode":0,"position":[-2.1213,0,2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_180_N_30_","id":"E_180_N_30_","parentId":"group6","materialId":"points.lambert1.001","billboardMode":0,"position":[-2.5981,0,1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_180_N_15_","id":"E_180_N_15_","parentId":"group6","materialId":"points.lambert1.001","billboardMode":0,"position":[-2.8978,0,0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_180_N_0_","id":"E_180_N_0_","parentId":"group6","materialId":"points.lambert1.001","billboardMode":0,"position":[-3,0,0],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_180_S_15_","id":"E_180_S_15_","parentId":"group6","materialId":"points.lambert1.001","billboardMode":0,"position":[-2.8978,0,-0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_180_S_30_","id":"E_180_S_30_","parentId":"group6","materialId":"points.lambert1.001","billboardMode":0,"position":[-2.5981,0,-1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_180_S_45_","id":"E_180_S_45_","parentId":"group6","materialId":"points.lambert1.001","billboardMode":0,"position":[-2.1213,0,-2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_180_S_60_","id":"E_180_S_60_","parentId":"group6","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.5,0,-2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_180_S_75_","id":"E_180_S_75_","parentId":"group6","materialId":"points.lambert1.001","billboardMode":0,"position":[-0.7765,0,-2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"group5","id":"group5","position":[0,0,0],"rotation":[-1.5708,0,0],"scaling":[0.01,0.01,0.01],"isVisible":false,"isEnabled":true,"checkCollisions":false,"billboardMode":0,"receiveShadows":false,"tags":""},{"name":"E_150_N_75_","id":"E_150_N_75_","parentId":"group5","materialId":"points.lambert1.001","billboardMode":0,"position":[-0.6724,-0.3882,2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_150_N_60_","id":"E_150_N_60_","parentId":"group5","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.299,-0.75,2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_150_N_45_","id":"E_150_N_45_","parentId":"group5","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.8371,-1.0607,2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_150_N_30_","id":"E_150_N_30_","parentId":"group5","materialId":"points.lambert1.001","billboardMode":0,"position":[-2.25,-1.299,1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_150_N_15_","id":"E_150_N_15_","parentId":"group5","materialId":"points.lambert1.001","billboardMode":0,"position":[-2.5095,-1.4489,0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_150_N_0_","id":"E_150_N_0_","parentId":"group5","materialId":"points.lambert1.001","billboardMode":0,"position":[-2.5981,-1.5,0],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_150_S_15_","id":"E_150_S_15_","parentId":"group5","materialId":"points.lambert1.001","billboardMode":0,"position":[-2.5095,-1.4489,-0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_150_S_30_","id":"E_150_S_30_","parentId":"group5","materialId":"points.lambert1.001","billboardMode":0,"position":[-2.25,-1.299,-1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_150_S_45_","id":"E_150_S_45_","parentId":"group5","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.8371,-1.0607,-2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_150_S_60_","id":"E_150_S_60_","parentId":"group5","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.299,-0.75,-2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_150_S_75_","id":"E_150_S_75_","parentId":"group5","materialId":"points.lambert1.001","billboardMode":0,"position":[-0.6724,-0.3882,-2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"group4","id":"group4","position":[0,0,0],"rotation":[-1.5708,0,0],"scaling":[0.01,0.01,0.01],"isVisible":false,"isEnabled":true,"checkCollisions":false,"billboardMode":0,"receiveShadows":false,"tags":""},{"name":"E_120_N_75_","id":"E_120_N_75_","parentId":"group4","materialId":"points.lambert1.001","billboardMode":0,"position":[-0.3882,-0.6724,2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_120_N_60_","id":"E_120_N_60_","parentId":"group4","materialId":"points.lambert1.001","billboardMode":0,"position":[-0.75,-1.299,2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_120_N_45_","id":"E_120_N_45_","parentId":"group4","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.0607,-1.8371,2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_120_N_30_","id":"E_120_N_30_","parentId":"group4","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.299,-2.25,1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_120_N_15_","id":"E_120_N_15_","parentId":"group4","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.4489,-2.5095,0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_120_N_0_","id":"E_120_N_0_","parentId":"group4","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.5,-2.5981,0],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_120_S_15_","id":"E_120_S_15_","parentId":"group4","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.4489,-2.5095,-0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_120_S_30_","id":"E_120_S_30_","parentId":"group4","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.299,-2.25,-1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_120_S_45_","id":"E_120_S_45_","parentId":"group4","materialId":"points.lambert1.001","billboardMode":0,"position":[-1.0607,-1.8371,-2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_120_S_60_","id":"E_120_S_60_","parentId":"group4","materialId":"points.lambert1.001","billboardMode":0,"position":[-0.75,-1.299,-2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_120_S_75_","id":"E_120_S_75_","parentId":"group4","materialId":"points.lambert1.001","billboardMode":0,"position":[-0.3882,-0.6724,-2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"group3","id":"group3","position":[0,0,0],"rotation":[-1.5708,0,0],"scaling":[0.01,0.01,0.01],"isVisible":false,"isEnabled":true,"checkCollisions":false,"billboardMode":0,"receiveShadows":false,"tags":""},{"name":"E_90_N_75_","id":"E_90_N_75_","parentId":"group3","materialId":"points.lambert1.001","billboardMode":0,"position":[0,-0.7765,2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_90_N_60_","id":"E_90_N_60_","parentId":"group3","materialId":"points.lambert1.001","billboardMode":0,"position":[0,-1.5,2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_90_N_45_","id":"E_90_N_45_","parentId":"group3","materialId":"points.lambert1.001","billboardMode":0,"position":[0,-2.1213,2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_90_N_30_","id":"E_90_N_30_","parentId":"group3","materialId":"points.lambert1.001","billboardMode":0,"position":[0,-2.5981,1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_90_N_15_","id":"E_90_N_15_","parentId":"group3","materialId":"points.lambert1.001","billboardMode":0,"position":[0,-2.8978,0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_90_N_0_","id":"E_90_N_0_","parentId":"group3","materialId":"points.lambert1.001","billboardMode":0,"position":[0,-3,0],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_90_S_15_","id":"E_90_S_15_","parentId":"group3","materialId":"points.lambert1.001","billboardMode":0,"position":[0,-2.8978,-0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_90_S_30_","id":"E_90_S_30_","parentId":"group3","materialId":"points.lambert1.001","billboardMode":0,"position":[0,-2.5981,-1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_90_S_45_","id":"E_90_S_45_","parentId":"group3","materialId":"points.lambert1.001","billboardMode":0,"position":[0,-2.1213,-2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_90_S_60_","id":"E_90_S_60_","parentId":"group3","materialId":"points.lambert1.001","billboardMode":0,"position":[0,-1.5,-2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_90_S_75_","id":"E_90_S_75_","parentId":"group3","materialId":"points.lambert1.001","billboardMode":0,"position":[0,-0.7765,-2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"group2","id":"group2","position":[0,0,0],"rotation":[-1.5708,0,0],"scaling":[0.01,0.01,0.01],"isVisible":false,"isEnabled":true,"checkCollisions":false,"billboardMode":0,"receiveShadows":false,"tags":""},{"name":"E_60_N_75_","id":"E_60_N_75_","parentId":"group2","materialId":"points.lambert1.001","billboardMode":0,"position":[0.3882,-0.6724,2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_60_N_60_","id":"E_60_N_60_","parentId":"group2","materialId":"points.lambert1.001","billboardMode":0,"position":[0.75,-1.299,2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_60_N_45_","id":"E_60_N_45_","parentId":"group2","materialId":"points.lambert1.001","billboardMode":0,"position":[1.0607,-1.8371,2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_60_N_30_","id":"E_60_N_30_","parentId":"group2","materialId":"points.lambert1.001","billboardMode":0,"position":[1.299,-2.25,1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_60_N_15_","id":"E_60_N_15_","parentId":"group2","materialId":"points.lambert1.001","billboardMode":0,"position":[1.4489,-2.5095,0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_60_N_0_","id":"E_60_N_0_","parentId":"group2","materialId":"points.lambert1.001","billboardMode":0,"position":[1.5,-2.5981,0],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_60_S_15_","id":"E_60_S_15_","parentId":"group2","materialId":"points.lambert1.001","billboardMode":0,"position":[1.4489,-2.5095,-0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_60_S_30_","id":"E_60_S_30_","parentId":"group2","materialId":"points.lambert1.001","billboardMode":0,"position":[1.299,-2.25,-1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_60_S_45_","id":"E_60_S_45_","parentId":"group2","materialId":"points.lambert1.001","billboardMode":0,"position":[1.0607,-1.8371,-2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_60_S_60_","id":"E_60_S_60_","parentId":"group2","materialId":"points.lambert1.001","billboardMode":0,"position":[0.75,-1.299,-2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_60_S_75_","id":"E_60_S_75_","parentId":"group2","materialId":"points.lambert1.001","billboardMode":0,"position":[0.3882,-0.6724,-2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"group1","id":"group1","position":[0,0,0],"rotation":[-1.5708,0,0],"scaling":[0.01,0.01,0.01],"isVisible":false,"isEnabled":true,"checkCollisions":false,"billboardMode":0,"receiveShadows":false,"tags":""},{"name":"E_30_S_75_","id":"E_30_S_75_","parentId":"group1","materialId":"points.lambert1.001","billboardMode":0,"position":[0.6724,-0.3882,-2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_30_S_60_","id":"E_30_S_60_","parentId":"group1","materialId":"points.lambert1.001","billboardMode":0,"position":[1.299,-0.75,-2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_30_S_45_","id":"E_30_S_45_","parentId":"group1","materialId":"points.lambert1.001","billboardMode":0,"position":[1.8371,-1.0607,-2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_30_S_30_","id":"E_30_S_30_","parentId":"group1","materialId":"points.lambert1.001","billboardMode":0,"position":[2.25,-1.299,-1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_30_S_15_","id":"E_30_S_15_","parentId":"group1","materialId":"points.lambert1.001","billboardMode":0,"position":[2.5095,-1.4489,-0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_30_N_0_","id":"E_30_N_0_","parentId":"group1","materialId":"points.lambert1.001","billboardMode":0,"position":[2.5981,-1.5,0],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_30_N_15_","id":"E_30_N_15_","parentId":"group1","materialId":"points.lambert1.001","billboardMode":0,"position":[2.5095,-1.4489,0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_30_N_30_","id":"E_30_N_30_","parentId":"group1","materialId":"points.lambert1.001","billboardMode":0,"position":[2.25,-1.299,1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_30_N_45_","id":"E_30_N_45_","parentId":"group1","materialId":"points.lambert1.001","billboardMode":0,"position":[1.8371,-1.0607,2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_30_N_60_","id":"E_30_N_60_","parentId":"group1","materialId":"points.lambert1.001","billboardMode":0,"position":[1.299,-0.75,2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_30_N_75_","id":"E_30_N_75_","parentId":"group1","materialId":"points.lambert1.001","billboardMode":0,"position":[0.6724,-0.3882,2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"group","id":"group","position":[0,0,0],"rotation":[-1.5708,0,0],"scaling":[0.01,0.01,0.01],"isVisible":false,"isEnabled":true,"checkCollisions":false,"billboardMode":0,"receiveShadows":false,"tags":""},{"name":"E_0_S_75_","id":"E_0_S_75_","parentId":"group","materialId":"points.lambert1.001","billboardMode":0,"position":[0.7765,0,-2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_0_S_60_","id":"E_0_S_60_","parentId":"group","materialId":"points.lambert1.001","billboardMode":0,"position":[1.5,0,-2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_0_S_45_","id":"E_0_S_45_","parentId":"group","materialId":"points.lambert1.001","billboardMode":0,"position":[2.1213,0,-2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_0_S_30_","id":"E_0_S_30_","parentId":"group","materialId":"points.lambert1.001","billboardMode":0,"position":[2.5981,0,-1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_0_S_15_","id":"E_0_S_15_","parentId":"group","materialId":"points.lambert1.001","billboardMode":0,"position":[2.8978,0,-0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_0_N_0_","id":"E_0_N_0_","parentId":"group","materialId":"points.lambert1.001","billboardMode":0,"position":[3,0,0],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_0_N_15_","id":"E_0_N_15_","parentId":"group","materialId":"points.lambert1.001","billboardMode":0,"position":[2.8978,0,0.7765],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_0_N_30_","id":"E_0_N_30_","parentId":"group","materialId":"points.lambert1.001","billboardMode":0,"position":[2.5981,0,1.5],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_0_N_45_","id":"E_0_N_45_","parentId":"group","materialId":"points.lambert1.001","billboardMode":0,"position":[2.1213,0,2.1213],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_0_N_60_","id":"E_0_N_60_","parentId":"group","materialId":"points.lambert1.001","billboardMode":0,"position":[1.5,0,2.5981],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
,{"name":"E_0_N_75_","id":"E_0_N_75_","parentId":"group","materialId":"points.lambert1.001","billboardMode":0,"position":[0.7765,0,2.8978],"rotation":[0,0,0],"scaling":[1,1,1],"isVisible":true,"freezeWorldMatrix":false,"isEnabled":true,"checkCollisions":false,"receiveShadows":false,"tags":""
,"positions":[0,0,0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759,0,0.1,-0.0759,0.1,-0.0575,-0.0759,-0.1,-0.0575,-0.0759,0,0.1,-0.0759]
,"normals":[0,0.025,0.9997,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347,0,0.9378,-0.347,0.8282,-0.46,-0.3201,-0.8282,-0.46,-0.3201,0,0.9378,-0.347]
,"uvs":[0.5,0.3333,0.625,0.75,0.375,0.75,0.5,1,0.5,0,0.875,0,0.125,0,0.5,0]
,"indices":[0,1,2,2,1,3,4,5,0,6,7,0]
,"subMeshes":[{"materialIndex":0,"verticesStart":0,"verticesCount":8,"indexStart":0,"indexCount":12}]
,"instances":[]}
],
"morphTargetManagers":[],
"cameras":[{"name":"Camera","id":"Camera","position":[7.4811,5.3437,-6.5076],"rotation":[0.4615,-0.8149,0],"fov":0.8576,"minZ":0.1,"maxZ":100,"speed":1,"inertia":0.9,"checkCollisions":false,"applyGravity":false,"ellipsoid":[0.2,0.9,0.2],"cameraRigMode":0,"interaxial_distance":0.0637,"type":"UniversalCamera"}],"activeCamera":"Camera",
"lights":[{"name":"Lamp","id":"Lamp","type":0,"position":[4.0762,5.9039,1.0055],"intensity":1,"diffuse":[1,1,1],"specular":[1,1,1]}],
"shadowGenerators":[]
};
      var strData = JSON.stringify(JSONData);
      var customVertexShader =
        "precision highp float;\r\nattribute vec3 position;\r\nattribute vec3 normal;\r\nattribute vec2 uv;\r\nuniform mat4 worldViewProjection;\r\nvarying vec3 vPosition;\r\nvarying vec3 vNormal;\r\nvarying vec2 vUV;\r\nvoid main(void) {\r\nvec4 outPosition = worldViewProjection * vec4(position, 1.0);\r\ngl_Position = outPosition;\r\nvUV = uv;\r\nvPosition = position;\r\nvNormal = normal;\r\n}\r\n";
      var earthFragmentShader =
        "precision highp float;\r\nvarying vec3 vPosition;\r\nvarying vec3 vNormal;\r\nvarying vec2 vUV;\r\nuniform mat4 world;\r\nuniform vec3 cameraPosition;\r\nuniform vec3 LightPosition;\r\nuniform sampler2D daySampler;\r\nuniform sampler2D nightSampler;\r\nuniform float intsmooth;\r\nuniform float intsmootht;\r\nvoid main(void) {\r\nvec3 vPositionW = vec3(world * vec4(vPosition, 1.0));\r\nvec3 lightVectorW = normalize(LightPosition - vec3(0.,0.,0.));\r\nvec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));\r\nvec3 viewDirectionW = normalize(cameraPosition - vPositionW);\r\nvec4 daycolor = texture2D(daySampler, vUV).rgba;\r\nvec4 nightcolor = texture2D(nightSampler, vUV).rgba;\r\nfloat ndl = max(0., dot(vNormalW, lightVectorW)) * intsmooth;\r\nfloat ndlt = max(0., dot(vNormalW, lightVectorW)) * intsmootht;\r\nvec3 angleW = normalize(viewDirectionW + lightVectorW);\r\nfloat specComp = max(0., dot(vNormalW, angleW));\r\nspecComp = pow(specComp, max(1., 64.)) *0.1;\r\nvec4 color=vec4(0.,0.,0.,0.);\r\nif (nightcolor.r*(1.-ndlt)>=0.3) {\r\nnightcolor.rgb=nightcolor.rgb*1.5;\r\nnightcolor.rg=nightcolor.rg+vec2(0.2,0.2);\r\n\r\n}else{\r\nnightcolor.rgb=nightcolor.rgb*0.1;\r\n\r\n}daycolor.rgb =nightcolor.rgb*(1.-ndl)+ daycolor.rgb* ndl + vec3(specComp);\r\ngl_FragColor = vec4(daycolor);\r\n}\r\n";
      var cloudFragmentShader =
        "precision highp float;\r\nvarying vec3 vPosition;\r\nvarying vec3 vNormal;\r\nvarying vec2 vUV;\r\nuniform mat4 world;\r\nuniform vec3 cameraPosition;\r\nuniform vec3 LightPosition;\r\nuniform sampler2D textureSampler;\r\nuniform float mixsmooth;\r\nuniform float intsmooth;\r\nvoid main(void) {\r\nvec3 vPositionW = vec3(world * vec4(vPosition, 1.0));\r\nvec3 lightVectorW = normalize(LightPosition - vec3(0.,0.,0.));\r\nvec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));\r\nvec3 viewDirectionW = normalize(cameraPosition - vPositionW);\r\nvec4 color = texture2D(textureSampler, vUV).rgba;\r\nfloat ndl = max(0., dot(vNormalW, lightVectorW));\r\nvec3 angleW = normalize(viewDirectionW + lightVectorW);\r\nfloat specComp = max(0., dot(vNormalW, angleW));\r\nspecComp = pow(specComp, max(1., 64.)) * 0.1;\r\ncolor.rgb =color.rgb*mixsmooth+color.rgb* ndl+specComp;\r\ngl_FragColor = vec4(color);\r\n}\r\n";
      var planVertexShader =
        "precision highp float;\r\nattribute vec3 position;\r\nattribute vec3 normal;\r\nattribute vec2 uv;\r\nuniform mat4 worldViewProjection;\r\nvarying vec3 vPosition;\r\nvarying vec3 vNormal;\r\nvarying vec2 vUV;\r\nvoid main(void) {\r\nvec4 outPosition = worldViewProjection * vec4(position, 1.0);\r\ngl_Position = outPosition;\r\nvUV = uv;\r\nvPosition = position;\r\nvNormal = normal;\r\n}\r\n";
      var planFragmentShader =
        "precision highp float;\r\nvarying vec3 vPosition;\r\nvarying vec3 vNormal;\r\nvarying vec2 vUV;\r\nuniform mat4 world;\r\nuniform sampler2D textureSampler;\r\nvoid main(void) {\r\n vec4 color = texture2D(textureSampler, vUV).rgba;\r\ngl_FragColor = vec4(color);\r\n}\r\n";
      var earthforMaterial;
      var cloudMaterial;
      var RecognitionBox;
      var RecognitionBoxcontroller;
      var cylinder;
      var earth;
      var cloud;
      var thiz = this;
      var linecolor = new BABYLON.Color3(1, 1, 1);
      var DashedLineColor = new BABYLON.Color3(1, 1, 0);
      var blacklinecolor = new BABYLON.Color3(0, 0, 0);
      var r = 3;
      var lineradius = r + 0.01;
      var startingPoint;
      var rotstartingPoint;
      var currentMesh;
      var groundplan;
      var RecognitionBoxTexture;
      var WarpPoints = [];
      var WarpLabelWithPoint = [];
      var WeftLabelWithPoint = [];
      var alpha = 0;
      var bata = 0;
      var showWarpWeft = false;
      var sb;

      this.canvas = engine.getRenderingCanvas();
      engine.enableOfflineSupport = false;

      var scene = new BABYLON.Scene(engine);
      scene.clearColor.set(0, 0, 0, 1);

      var advancedTexture8 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
      advancedTexture8.layer.layerMask = 0x80000000;
      var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
      advancedTexture.layer.layerMask = 0x40000000;

      var light = new BABYLON.HemisphericLight("light",new BABYLON.Vector3(0, 0, -1),scene );
      light.intensity = 1;
      var boxp = new BABYLON.Mesh("p", scene);
      boxp.isVisible = false;
      var light1 = boxp.clone("p");
      light1.position = new BABYLON.Vector3(1, 0, 0);

      var camera = new BABYLON.TargetCamera( "Camera", new BABYLON.Vector3(0, 0, -12),scene );
      var camera1 = new BABYLON.TargetCamera("Camera1", new BABYLON.Vector3(0, 0, -15),scene );
      camera1.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

      var cameraForDetail = new BABYLON.FreeCamera( "cameraForDetail", new BABYLON.Vector3(0, 0, -10), scene);
      cameraForDetail.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

      camera.layerMask = 0x20000000; //天空
      cameraForDetail.layerMask = 0x80000000;//经纬网
      camera1.layerMask = 0x10000000; //

      camera1.viewport = new BABYLON.Viewport(0.5, 0.2, 0.6, 0.6);
      cameraForDetail.viewport = new BABYLON.Viewport(0.05, 0.25, 0.5, 0.5);

      scene.activeCameras.push(camera);
      scene.activeCameras.push(cameraForDetail);
      scene.activeCameras.push(camera1);


      var earthgroupAngle =boxp.clone("p");// new BABYLON.Mesh("p", scene);
      earthgroupAngle.position = new BABYLON.Vector3(0, 0, 0);
      //地球node
      var earthgroup =boxp.clone("p");
      earthgroup.position = new BABYLON.Vector3(0, 0, 0);
      //地球node
      var earthgroupcloud = boxp.clone("p");
      earthgroupcloud.position = new BABYLON.Vector3(0, 0, 0);

      var earthgroupAngleparent = boxp.clone("p");
      earthgroupAngleparent.position = new BABYLON.Vector3(0, 0, 0);

      light1.setParent(earthgroupAngle);
      earthgroup.setParent(earthgroupAngle);
      earthgroupAngle.setParent(earthgroupAngleparent);

      function ResizeCamera() {
        sb = engine.getRenderHeight() / engine.getRenderWidth();
        camera1.orthoTop = 8 * sb;
        camera1.orthoBottom = -sb * 8;
        camera1.orthoLeft = -8;
        camera1.orthoRight = 8;
        cameraForDetail.orthoTop = sb;
        cameraForDetail.orthoBottom = -sb;
        cameraForDetail.orthoLeft = -1;
        cameraForDetail.orthoRight = 1;
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
        for (var i = 0; i <= value; i += 3 / r) {
          vertices.push(drawcircle(r, i, y, axis));
        }
        vertices.push(drawcircle(r, value, y, axis));
        return vertices;
      }
      //画出可更新的圆，并设置颜色
      function createCircle(layerMask, r, value, y, color, scene, axis) {
        var vertices = setvertices(r, value, y, axis);
        var circle = BABYLON.MeshBuilder.CreateLines( "lines", { points: vertices }, scene);
        circle.color = color;
        circle.layerMask = layerMask;
        return circle;
      }
      //画出可更新的圆，并设置颜色
      function createDashedCircle(layerMask, r, value, y, color, scene, axis) {
        var vertices = setvertices(r, value, y, axis);
        var Dashedcircle = BABYLON.Mesh.CreateDashedLines("lines",vertices,10,10,vertices.length,scene,true,Dashedcircle);
        Dashedcircle.color = color;
        Dashedcircle.layerMask = layerMask;
        return Dashedcircle;
      }
      //创建纬线
      function CreateWeft(layerMask, r, percentPI, color) {
        for (var i= 0; i < 90; i += percentPI) {
          if (i != 0) {
            CreateWeftLine(layerMask, i, r, 360, color);
            CreateWeftLine(layerMask, i, r, 360, color, true);
          }
        }
      }

      function CreateWeftLine(layerMask, earthangle, r, angle, color, pos) {
        //earthangle地球从赤道开始角度
        var x = Math.cos(earthangle * Math.PI / 180) * r; //所算出x值
        if (pos) {
          var y = Math.sqrt(r * r - x * x); //所算出y值
        } else {
          var y = -Math.sqrt(r * r - x * x); //所算出y值
        }
        var circle = createCircle(layerMask, x, angle, y, color);
        circle.setParent(earthgroup);
      }
      //创建纬线（虚线）
      function CreateDashedWeft(layerMask, earthangle, r, angle, color, pos) {
        //earthangle地球从赤道开始角度
        var x = Math.cos(earthangle * Math.PI / 180) * r; //所算出x值
        if (pos) {
          var y = Math.sqrt(r * r - x * x); //所算出y值
        } else {
          var y = -Math.sqrt(r * r - x * x); //所算出y值
        }
        var Dashedcircle = createDashedCircle(layerMask, x, angle, y, color);
        Dashedcircle.setParent(earthgroup);
      }
      //创建经线
      function createWarp(layerMask, r, percentPI, color) {
        for (var i = 0; i < Math.PI; i += Math.PI / percentPI) {
          var ncircles = createCircle(layerMask, r, 360, 0, color, scene, "x");
          var rot = new BABYLON.Vector3(0, i, 0);
          ncircles.rotation = rot;
          ncircles.setParent(earthgroup);
        }
      }

      function CreateSky() {
        var tex = new BABYLON.Texture("static/image/SPACE006SX.jpg", scene);
        var material2 = new BABYLON.StandardMaterial("kosh2", scene);
        var skybox = BABYLON.Mesh.CreateSphere("skyBox", 50, 2000, scene);
        material2.diffuseTexture = tex;
        material2.emissiveTexture = tex;
        material2.backFaceCulling = false;
        skybox.material = material2;
        skybox.layerMask = 0x20000000;
        skybox.setParent(earthgroupAngle);
      }
      //画地球//画地球云图
      function CreateEarthAndCloud() {
        //画地球
        var daySampler = new BABYLON.Texture("./static/earth/day.jpg", scene);
        var nightSampler = new BABYLON.Texture("./static/earth/night.jpg",scene);
        BABYLON.Effect.ShadersStore["earthVertexShader"] = customVertexShader;
        BABYLON.Effect.ShadersStore["earthFragmentShader"] = earthFragmentShader;
        earthforMaterial = new BABYLON.ShaderMaterial("shader", scene,
          { vertex: "earth", fragment: "earth" },
          { attributes: ["position", "normal", "uv"],
            uniforms: ["world","worldView","worldViewProjection","view","projection"] });
        earthforMaterial.setTexture("daySampler", daySampler);
        earthforMaterial.setTexture("nightSampler", nightSampler);
        earthforMaterial.setVector3( "cameraPosition",scene.activeCamera.position);
        earthforMaterial.setFloat("intsmooth", 1); //晨昏线明显度
        earthforMaterial.setFloat("intsmootht", 5); //晨昏线明显度
        earthforMaterial.setVector3("LightPosition", light1.getWorldMatrix().getTranslation());
        earthforMaterial.backFaceCulling = false;
        earth = BABYLON.Mesh.CreateSphere("earthmesh", 32, 2 * r, scene);
        earth.material = earthforMaterial;
        earth.rotation = new BABYLON.Vector3(0, 0, Math.PI);
        earth.layerMask = 0x10000000;
        earth.setParent(earthgroup);
        //画地球云图
        var planTexture = new BABYLON.Texture("./static/earth/cloud.png",scene);
        BABYLON.Effect.ShadersStore["plansVertexShader"] = customVertexShader;
        BABYLON.Effect.ShadersStore[ "plansFragmentShader"] = cloudFragmentShader;
        cloudMaterial = new BABYLON.ShaderMaterial("shader",scene,
          { vertex: "plans", fragment: "plans" },
          { attributes: ["position", "normal", "uv"],
            uniforms: ["world","worldView","worldViewProjection","view","projection"],
            needAlphaBlending: true});
        cloudMaterial.setTexture("textureSampler", planTexture);
        cloudMaterial.setVector3("cameraPosition", scene.activeCamera.position);
        cloudMaterial.setFloat("mixsmooth", 0.1); //云图阴影叠加值
        cloudMaterial.setFloat("intsmooth", 3); //晨昏线明显度
        cloudMaterial.setVector3("LightPosition", light1.getWorldMatrix().getTranslation());
        cloudMaterial.backFaceCulling = false;
        cloud = BABYLON.Mesh.CreateSphere("earth", 32, 2 * r + 0.1, scene);
        cloud.material = cloudMaterial;
        cloud.rotation = new BABYLON.Vector3(0, 0, Math.PI);
        cloud.layerMask = 0x10000000;
        cloud.setParent(earthgroupcloud);
        earthgroupcloud.setParent(earthgroup);
      }

      function CreateRecognition() {
        var planTexture1 = new BABYLON.Texture( "./static/image/getscreen.png", scene);
        BABYLON.Effect.ShadersStore["planVertexShader"] = planVertexShader;
        BABYLON.Effect.ShadersStore["planFragmentShader"] = planFragmentShader;
        var materialplans = new BABYLON.ShaderMaterial("shader", scene,
          { vertex: "plan", fragment: "plan" },
          { attributes: ["position", "normal", "uv"],
            uniforms: [ "world","worldView","worldViewProjection","view","projection"],
            needAlphaBlending: true});
        materialplans.setTexture("textureSampler", planTexture1);
        materialplans.backFaceCulling = false;
        RecognitionBox = BABYLON.Mesh.CreatePlane("controller", 2, scene);
        RecognitionBox.isVisible = false;
        RecognitionBoxTexture = BABYLON.Mesh.CreatePlane("ncontroller",2, scene);
        RecognitionBoxTexture.material = materialplans;
        RecognitionBoxTexture.scaling = new BABYLON.Vector3(1, sb, 1);
        RecognitionBoxTexture.layerMask = 0x10000000;
        RecognitionBoxTexture.position = new BABYLON.Vector3(0, 0, 0);
        RecognitionBoxTexture.setParent(RecognitionBox);
        RecognitionBox.position = new BABYLON.Vector3(0, 0, -10);
        RecognitionBox.scaling = new BABYLON.Vector3(0, 0, 0);
        RecognitionBox.layerMask = 0x10000000;
      }
      function CreateCylinder() {
        cylinder = BABYLON.Mesh.CreateCylinder("cylinder",2 *  r + 1.2, 0.05, 0.05,16, 1,scene);
        var cylinderMat = new BABYLON.StandardMaterial("cylinder", scene);
        cylinderMat.emissiveColor = BABYLON.Color3.Gray();
        cylinder.material = cylinderMat;
        cylinder.layerMask = 0x10000000;
        cylinder.setParent(earthgroup);
      }
      function CraeteWilteBG() {
        groundplan = BABYLON.Mesh.CreatePlane("ground", 20, scene, false);
        groundplan.position.z = 0;
        var materialSphere3 = new BABYLON.StandardMaterial("texture3", scene);
        materialSphere3.diffuseColor = new BABYLON.Color3(1, 1, 1);
        groundplan.material = materialSphere3;
        groundplan.layerMask = 0x80000000;
      }

       function CreateLabeltwo(text,box) {
        var label = new BABYLON.GUI.Rectangle("label");
        label.height = "48px";
        label.alpha =0;
        label.width = "220px";
        label.cornerRadius = 20;
        label.thickness = 0;
        label.linkOffsetY = 0;
        advancedTexture.addControl(label);
        label.linkWithMesh(box);
        var text1 = new BABYLON.GUI.TextBlock();
        text1.text = text;
        text1.color = "black";
        text1.fontSize = "36px";
        label.addControl(text1);
        var allmessage = [label, text1, box];
        return allmessage;
      }

      var labelmessage = new BABYLON.GUI.Rectangle("message");
      labelmessage.height = "800px";
      labelmessage.alpha = 1;
      labelmessage.width = "700px";
      labelmessage.cornerRadius = 20;
      labelmessage.thickness = 0;
      labelmessage.linkOffsetY = 0;
      labelmessage.top = "0";
      labelmessage.zIndex = 5;
      labelmessage.verticalAlignment =BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
      advancedTexture8.addControl(labelmessage);
      var message = new BABYLON.GUI.TextBlock();
      message.text = "请点击放大镜，获取图像";
      message.color = "#9B9B9B";
      message.fontSize = "60px";
      labelmessage.addControl(message);

      // var fps = new BABYLON.GUI.Rectangle("message");
      // fps.height = "800px";
      // fps.alpha = 1;
      // fps.width = "700px";
      // fps.cornerRadius = 20;
      // fps.thickness = 0;
      // fps.linkOffsetY = 0;
      // fps.top = "0";
      // fps.zIndex = 5;
      // fps.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
      // advancedTexture.addControl(fps);
      // var fpsmessage = new BABYLON.GUI.TextBlock();
      // fpsmessage.text = "fps";
      // fpsmessage.color = "#9B9B9B";
      // fpsmessage.fontSize = "45px";
      // fps.addControl(fpsmessage);

    CreateWeft(0x10000000, lineradius, 15, linecolor); //创建纬线：0°至南北纬90°，间隔15°；
    CreateDashedWeft( 0x10000000, 23.26, lineradius, 360, DashedLineColor, true); //创建回归线：0°至南北纬90°，间隔30°；
    CreateDashedWeft(0x10000000, 23.26, lineradius, 360, DashedLineColor);
    CreateDashedWeft(0x10000000, 66.74, lineradius, 360, DashedLineColor); //创建极圈：0°至南北纬90°，间隔30°；
    CreateDashedWeft( 0x10000000, 66.74, lineradius, 360, DashedLineColor,true );
    CreateWeftLine(0x10000000, 0, lineradius, 360, DashedLineColor, true);
    createWarp(0x10000000, lineradius, 12, linecolor); //创建经线：起始线0°至180°，间隔30°；

    CreateWeft(0x40000000, lineradius, 15, blacklinecolor); //创建纬线：0°至南北纬90°，间隔15°；
    CreateDashedWeft(0x40000000, 23.26,lineradius, 360,blacklinecolor,true ); //创建回归线：0°至南北纬90°，间隔30°；
    CreateDashedWeft(0x40000000, 23.26, lineradius, 360, blacklinecolor);
    CreateDashedWeft(0x40000000, 66.74, lineradius, 360, blacklinecolor); //创建极圈：0°至南北纬90°，间隔30°；
    CreateDashedWeft(0x40000000,66.74, lineradius,360, blacklinecolor,true);
    CreateWeftLine(0x40000000, 0, lineradius, 360, blacklinecolor, true);
    createWarp(0x40000000, lineradius, 12, blacklinecolor); //创建经线：起始线0°至180°，间隔30°；

    ResizeCamera();
    CreateEarthAndCloud();
    CreateSky();
    CreateCylinder();
    CreateRecognition();
    CraeteWilteBG();


BABYLON.SceneLoader.ImportMesh("","","data:"+ strData, scene, function(newMeshes, particleSystems, skeletons) {
           for (var i = 0; i < newMeshes.length; i++) {
            newMeshes[i].isVisible = false;
            newMeshes[i].scaling=new BABYLON.Vector3(1,1,1);
            newMeshes[i].setParent(earthgroup);
            if(newMeshes[i].name.indexOf("group")!=-1){
            }else{
            var sbarr= newMeshes[i].name.split("_");
            // console.log("["+sbarr[1] + "°"+sbarr[0] + "," +sbarr[3]+ "°"+sbarr[2] + "]");
            var allmessage2 = CreateLabeltwo("["+sbarr[1] + "°"+sbarr[0] + "," +sbarr[3]+ "°"+sbarr[2] + "]",newMeshes[i]);
            WarpLabelWithPoint.push(allmessage2);
            }
        }
              earthgroupAngle.rotation = new BABYLON.Vector3( 0, 0,-Math.PI / 180 * 23.26 );
        });


     //模型导入
    // BABYLON.SceneLoader.ImportMesh("", "./static/", "points.babylon", scene, function (newMeshes, particleSystems, skeletons) {
    //     for (var i = 0; i < newMeshes.length; i++) {
    //         newMeshes[i].isVisible = false;
    //         newMeshes[i].scaling=new BABYLON.Vector3(1,1,1);
    //         newMeshes[i].setParent(earthgroup);
    //         if(newMeshes[i].name.indexOf("group")!=-1){
    //         }else{
    //         var sbarr= newMeshes[i].name.split("_");
    //         console.log("["+sbarr[1] + "°"+sbarr[0] + "," +sbarr[3]+ "°"+sbarr[2] + "]");
    //         var allmessage2 = CreateLabeltwo("["+sbarr[1] + "°"+sbarr[0] + "," +sbarr[3]+ "°"+sbarr[2] + "]",newMeshes[i]);
    //         WarpLabelWithPoint.push(allmessage2);
    //         }
    //     }
    //           earthgroupAngle.rotation = new BABYLON.Vector3( 0, 0,-Math.PI / 180 * 23.26 );
    // });

      function UpdatePointLocation() {
          for (var bb = 0; bb < WarpLabelWithPoint.length; bb++) {
               if ( WarpLabelWithPoint[bb][2].getWorldMatrix().getTranslation().x >cameraForDetail.position.x + 1 ||
                    WarpLabelWithPoint[bb][2].getWorldMatrix().getTranslation().x <cameraForDetail.position.x - 1 ||
                    WarpLabelWithPoint[bb][2].getWorldMatrix().getTranslation().y >cameraForDetail.position.y + sb ||
                    WarpLabelWithPoint[bb][2].getWorldMatrix().getTranslation().y <cameraForDetail.position.y - sb||
                    WarpLabelWithPoint[bb][2].getWorldMatrix().getTranslation().z > -0.01) {
                    WarpLabelWithPoint[bb][0].alpha = 0;
                }else{
                    WarpLabelWithPoint[bb][0].alpha = 1;
                }
          }
      }

      var ncircles = createCircle( 0x40000000,lineradius, 360, 0, blacklinecolor, scene, "x");
      var rot = new BABYLON.Vector3(0, Math.PI / 2, 0);
      ncircles.rotation = rot;
      // Events
      var ground = BABYLON.Mesh.CreateGround("ground", 2 * r + 3.2,2 * r + 3.2,1, scene, false );
      ground.rotation.x = -1 / 180 * 90 * Math.PI;
      ground.isVisible = false;

      camera1.attachControl(this.canvas, false);

      function getGroundPosition() {
        var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function(mesh) {
          return mesh == ground;
        });
        if (pickinfo.hit) {
          return pickinfo.pickedPoint;
        }
        return null;
      }
      var hasCurrentMesh = false;
      function onPointerDown(evt) {
        if (evt.button !== 0) {
          return;
        }
        var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function( mesh) {
          return mesh !== ground;
        });
        if (pickInfo.hit) {
          if (hasCurrentMesh == false) {
            currentMesh = pickInfo.pickedMesh;
          }
          if (currentMesh.name == "controller") {
            hasCurrentMesh = true;
            startingPoint = getGroundPosition(evt);
            if (startingPoint) {
              currentMesh.position.x = startingPoint.x;
              currentMesh.position.y = startingPoint.y;
              camera1.detachControl(thiz.canvas);
            }
          } else {
            rotstartingPoint = getGroundPosition(evt);
          }
        }
      }

      function onPointerUp() {
        if (startingPoint) {
          camera1.attachControl(thiz.canvas, true);
          startingPoint = null;
          hasCurrentMesh = false;
          return;
        }
        if (rotstartingPoint) {
          rotstartingPoint = null;
          return;
        }
      }

      function onPointerMove(evt) {
        if (rotstartingPoint) {
          var current1 = getGroundPosition(evt);
          if (current1) {
            var diff = current1.subtract(rotstartingPoint);
            earthgroupAngleparent.addRotation(diff.y, -diff.x, 0);
            rotstartingPoint = current1;
          }
        }
        if (!startingPoint) {
          return;
        }
        var current = getGroundPosition(evt);
        if (!current) {
          if (startingPoint) {
            camera1.attachControl(thiz.canvas, true);
            startingPoint = null;
            hasCurrentMesh = false;
            return;
          }
          return;
        }

        if (startingPoint.x <= r && startingPoint.x >= -r) {
          currentMesh.position.x = startingPoint.x;
        } else if (startingPoint.x > r) {
          currentMesh.position.x = r;
        } else if (startingPoint.x < -r) {
          currentMesh.position.x = -r;
        }
        if (startingPoint.y <= r && startingPoint.y >= -r) {
          currentMesh.position.y = startingPoint.y;
        } else if (startingPoint.y > r) {
          currentMesh.position.y = r;
        } else if (startingPoint.y < -r) {
          currentMesh.position.y = -r;
        }
        cameraForDetail.position.x = currentMesh.position.x;
        cameraForDetail.position.y = currentMesh.position.y;
        startingPoint = current;
      }

      thiz.canvas.addEventListener("pointerdown", onPointerDown, false);
      thiz.canvas.addEventListener("pointerup", onPointerUp, false);
      thiz.canvas.addEventListener("pointermove", onPointerMove, false);

      scene.onDispose = function() {
        thiz.canvas.removeEventListener("pointerdown", onPointerDown);
        thiz.canvas.removeEventListener("pointerup", onPointerUp);
        thiz.canvas.removeEventListener("pointermove", onPointerMove);
      };

      camera1.attachControl(this.canvas, false);
      var earthgrouprotation = true;

      scene.registerBeforeRender(function() {
        if (bata % 20 == 0 && showWarpWeft == true) {
          UpdatePointLocation();
          bata = 0;
        }
        // fpsmessage.text = engine.getFps().toFixed() + " fps";
        bata++;
        var activeCameraPosition = scene.activeCamera.position;
        cloudMaterial.setVector3("cameraPosition", activeCameraPosition);
        cloudMaterial.setVector3("LightPosition",light1.getWorldMatrix().getTranslation());
        earthforMaterial.setVector3("cameraPosition", activeCameraPosition);
        earthforMaterial.setVector3( "LightPosition", light1.getWorldMatrix().getTranslation());
        if (earthgrouprotation == true) {
          earthgroupcloud.rotation = new BABYLON.Vector3(0, alpha * 0.2, 0);
          earthgroup.rotation = new BABYLON.Vector3(0, -alpha*1.7, 0);
          alpha += 0.002;
        }
      });

      function check() {
        if (thiz.checked) {
          showWarpWeft = true;
          groundplan.layerMask = 0x40000000;
          cameraForDetail.layerMask = 0x40000000;
          RecognitionBox.scaling = new BABYLON.Vector3(1, 1, 1);
          document.getElementById("cleard").src = "static/image/blue.png";
          thiz.checked = false;
        } else {
          showWarpWeft = false;
          groundplan.layerMask = 0x80000000;
          cameraForDetail.layerMask = 0x80000000;
          RecognitionBox.scaling = new BABYLON.Vector3(0, 0, 0);
          document.getElementById("cleard").src = "static/image/gray.png";
          thiz.checked = true;
        }
      }

      function check2() {
        if (thiz.checked2) {
          earthgrouprotation = false;
          document.getElementById("cleard2").src = "static/image/cotinue.png";
          thiz.checked2 = false;
        } else {
          earthgrouprotation = true;
          document.getElementById("cleard2").src = "static/image/stop.png";
          thiz.checked2 = true;
        }
      }

      function reset() {
        earthgrouprotation = true;
        thiz.checked2 = true;
        thiz.checked = true;
        showWarpWeft = false;
        groundplan.layerMask = 0x80000000;
        cameraForDetail.layerMask = 0x80000000;
        RecognitionBox.scaling = new BABYLON.Vector3(0, 0, 0);
        document.getElementById("cleard2").src = "static/image/stop.png";
        document.getElementById("cleard").src = "static/image/gray.png";
        RecognitionBox.position = new BABYLON.Vector3(0, 0, -10);
        earthgroup.rotation = new BABYLON.Vector3(0, 0, 0);
        earthgroupAngleparent.rotation = new BABYLON.Vector3(0, 0, 0);
      }

      if (this.isMob) {
        $("#check").on("touchstart", check);
        $("#check2").on("touchstart", check2);
        $("#clear").on("touchstart", reset);
      } else {
        $("#check").on("click", check);
        $("#check2").on("click", check2);
        $("#clear").on("click", reset);
      }
      window.addEventListener("resize", () => {
        engine.resize();
        ResizeCamera();
        RecognitionBoxTexture.scaling = new BABYLON.Vector3(1, sb, 1);
      });
      return scene;
    }
  },
  mounted() {
    this.init();
  }
};
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
  position: fixed;
  top: 0;
  width: 100%;
  height: 76px;
  padding: 0;
  margin: 0;
  color: #ffffff;
  z-index: 999;
  background-color: transparent;
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
  -ms-touch-action: none;
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
  color: #232f32;
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
}

#renderCanvas {
  width: 100%;
  height: 100%;
  outline: 0;
}

#fps {
  position: absolute;
  right: 20px;
  top: 5em;
  font-size: 20px;
  color: #fff;
  text-shadow: 2px 2px 0 #000;
}

.hidden {
  display: none;
}

#check {
  /* background: #fff; */
  border: 0 solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  width: 48px;
  height: 40px;
  font-size: 14px;
  line-height: 48px;
  position: fixed;
  right: 24px;
  bottom: 28px;
  z-index: 999;
}

#check2 {
  /* background: #fff; */
  border: 0 solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  width: 48px;
  height: 40px;
  font-size: 14px;
  line-height: 48px;
  position: fixed;
  right: 77px;
  bottom: 28px;
  z-index: 999;
}

.checkbtn {
  width: 100%;
  height: 100%;
}
</style>
