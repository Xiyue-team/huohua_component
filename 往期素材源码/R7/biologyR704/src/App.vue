<template>
  <div id="app" class="noselect">
    <!--头部-->
    <ui-head :title="title" style="background-color: #fff; box-shadow:none;">
      <!--<ui-btn type="reset1" @click.native="resetWidget" id="button1"></ui-btn>-->
    </ui-head>
    <!--模型区域-->
    <div class="container">
      <div id="renderCanvas">
          <div class="render-item">
            <p class="img-box">
              <img src="static/img/one.png" alt="">
            </p>
            <ui-btn  size="big" @click.native="blueClick(1)" id="button1">人类红绿色盲</ui-btn>
          </div>
          <div class="render-item">
            <p class="img-box">
              <img src="static/img/two.png" alt="">
            </p>
            <ui-btn  size="big" @click.native="blueClick(2)" id="button2">抗维生素D佝偻病</ui-btn>
          </div>
          <div class="render-item">
            <p class="img-box">
              <img src="static/img/three.png" alt="">
            </p>
            <ui-btn  size="big" @click.native="blueClick(3)" id="button3">血友病</ui-btn>

          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  export default {
    name: 'app',
    components: {uiHead,uiBtn},
    data(){
      return{
        title:'常见人类伴性遗传病的遗传方式',
        link:[
          {
              href:'./static/dist1/index.html',
          },
          {
              href:'./static/dist2/index.html',
          },
          {
              href:'./static/dist3/index.html',
          }
        ]
      }
    },
    mounted(){
      this.resize();
      this.getViewSize();
    },
    computed:{},
    created() {
      document.title = this.title;
    },
    methods: {

      blueClick(val) {
         if(val == 1){
            window.location.href = this.link[0].href;
         }else if(val == 2){
           window.location.href = this.link[1].href;
         }else{
           window.location.href = this.link[2].href;
         }
      },
      //计算区块大小
      getViewSize() {
        const W = window.innerWidth;
        const H = window.innerHeight - 72;
        if (W / H >= 744 / 505) {
          this.zoom = {
            zoom: H / 505
          }
        } else {
          this.zoom = {
            zoom: W / 744
          }
        }
      },
      //窗口大小更改
      resize() {
        const vm = this;
        window.addEventListener('resize', function () {
          vm.getViewSize();
        })
      },

    },
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  li{
    list-style: none;
  }
  input,button{
    outline: none;
    -webkit-appearance: none;
    border-radius: 0;
  }
  canvas{
    outline: none;
  }
  /*盒模型，padding尺寸不用再减去*/
  *,
  *:before,
  *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  }
  html,body,#app{
    width:100%;
    height: 100%;
    overflow: hidden;
    font-family: "PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;
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
  .container{
    width:100%;
    height: calc(100% - 76px);
  }
  #renderCanvas{
    display:flex;
    align-items: center;/*垂直居中*/
    justify-content: center;/*水平居中*/
    width:100%;
    height:100%;
  }
  .img-box{
    width: 240px;
    height: 155px;
    margin-bottom: 21px;
  }
  .img-box img{
    display: block;
    width: 100%;
    height: 100%;
  }

  .render-item{
    margin-right: 4.9%;
    text-align: center;
    margin-bottom: 50px;
  }
  .render-item > div{
    border: 0 solid rgba(0,0,0,0.06);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.18);
    border-radius: 6px;
  }
  /*.render-item p{*/
    /*width: 150px;*/
    /*height: 42px;*/
    /*margin: 17px auto 0;*/
    /*line-height: 21px;*/
    /*font-size: 15px;*/
    /*color: #000000;*/
  /*}*/
</style>
