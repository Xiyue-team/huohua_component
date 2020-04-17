<template>
  <div class="noselect app5" id="app">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div class="view_space">
        <canvas id="renderCanvas" :style="viewSize"></canvas>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <ui-btn size="big">按钮</ui-btn>
        <ui-btn type="blue" size="big">按钮</ui-btn>
        <ui-btn type="play" v-model="played"></ui-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  import uiGroup from '@/components/UI/uiGroup';//单选组
  import uiSlider from '@/components/UI/uiSlider';//滑块
  export default {
    name: 'app',
    components: {uiHead, uiBtn, uiGroup, uiSlider},
    data(){
      return {
        camera: null,
        canvas: null,
        engine: null,
        scene: null,
        light: null,
        title: '标题',
        played: true,
        viewSize: {
          width: (window.innerWidth - 326) + 'px',
          height: (window.innerWidth - 326) * 9 / 16 + 'px',
        },//区域大小
        BtnSpaceStyle:'flex',
        options2: {
          title: '标题',//设置默认标题
          min: 0,//设置最小值，默认0
          max: 5.0,//设置最大值，默认100
          interval: 0.1,//设置每次滑动的间距刻度
          scale: ['0', '5'],//首尾的刻度
        },
      }
    },
    created(){
      document.title = this.title;
      this.getViewSize();

    },
    mounted(){
      //页面加载检测是否支持babylon
      if (!BABYLON.Engine.isSupported()) {
        alert('不支持BABYLON')
      } else {
        this.init();
      };

      this.setSideStyle()

    },
    computed: {},
    watch: {
      played(){
        console.log('改变了')
      }
    },
    methods: {
      //计算侧边
      setSideStyle(){
        const el =document.getElementById('btn_space')
        if(el && el.scrollHeight>el.offsetHeight){
          this.BtnSpaceStyle = 'block'
        }else{
          this.BtnSpaceStyle = 'flex'
        }
      },

      //计算区块大小
      getViewSize(){
        const ratio = {x: 16, y: 9};
        const h1 = (window.innerWidth - 326) * ratio.y / ratio.x;
        const h2 = window.innerHeight - 84 - 40 - 72
        if (h1 >= h2) {
          this.viewSize = {
            width: h2 * ratio.x / ratio.y + 'px',
            height: h2 + 'px'
          }
        } else {
          this.viewSize = {
            width: (window.innerWidth - 326) + 'px',
            height: h1 + 'px'
          }
        }
      },

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
        const vm = this;
        window.addEventListener('resize', function () {
          vm.getViewSize();//计算视图区大小
          vm.setSideStyle();//计算操作区大小
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
  .app5 .container {
    width: calc(100% - 280px);
    float: left;
    height: 100%;
  }

  .app5 .container h3 {
    font-size: 24px;
    color: #000;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
  }

  .app5 .app_aside {
    float: left;
    width: 280px;
    background-color: #F7F7F7;
    height: 100%;
    box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);
  }

  .app5  canvas {
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    padding: 10px;
  }

  .app5 .view_space {
    margin: 40px 22px 84px 22px;
    width: calc(100% - 46px);
    height: calc(100% - 196px);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .app5 .insp-wrapper {
    width: 100%;
    height: 100%;
  }

  .app5 .aside_reset {
    margin: 20px 24px;
    float: right;
  }

  .app5 .btn_space {
    padding:20px;
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

  .app5 .btn_space .UI-btn {
    margin-bottom: 10px;
  }
</style>
