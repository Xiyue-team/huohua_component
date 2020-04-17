<template>
  <div id="app" class="noselect app4">
    <!--头部-->
    <ui-head :title="title">
      <ui-btn type="reset1" @click.native="resetWidget"></ui-btn>
    </ui-head>
    <!--视图区-->
    <div class="container">
      <canvas id="renderCanvas"></canvas>
    </div>
    <div class="operational">

    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  export default {
    name: 'app',
    components: {uiHead, uiBtn},
    data(){
      return {
        camera: null,
        canvas: null,
        engine: null,
        scene: null,
        light: null,
        title: '标题'
      }
    },
    mounted(){
      //页面加载检测是否支持babylon
      if (!BABYLON.Engine.isSupported()) {
        alert('不支持BABYLON')
      } else {
        this.init();
      }
    },
    computed: {},
    methods: {
      //初始化
      init(){
        this.canvas = document.getElementById("renderCanvas");
        //创建模型
        this.createScene();
        //启动
        this.engine.runRenderLoop(() => {
          this.scene.render();
        });
        //窗口更改大小
        this.resize(this.engine)
      },

      //创建模型
      createScene(){
        //设置引擎
        this.engine = new BABYLON.Engine(this.canvas, true);
        //设置场景
        this.scene = new BABYLON.Scene(this.engine);
        //设置相机
        this.camera = new BABYLON.ArcRotateCamera('ArcRotateCamera',
          Math.PI / 2, 1.0, 10, new BABYLON.Vector3.Zero(), this.scene);
        this.camera.attachControl(this.canvas, true);
        //设置灯光
        this.light = new BABYLON.PointLight('PointLight',
          new BABYLON.Vector3(10, 50, 50), this.scene);
        //打开调试器
//                this.scene.debugLayer.show();
      },

      //窗口大小更改
      resize(engine){
        window.addEventListener('resize', function () {
          engine.resize();
        })
      },

      //重置
      resetWidget(){
        console.log('reset')
      }
    },
  }
</script>

<style>


  /*内容区*/
  .app4 .container {
    width: 50%;
    float: left;
    height: calc(100% - 76px);
  }
  .app4 .operational{
    float: left;
    width: 50%;
    height: calc(100% - 76px);
  }

  .app4 canvas {
    width: 100%;
    height: 100%;
  }

  .app4 .insp-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
