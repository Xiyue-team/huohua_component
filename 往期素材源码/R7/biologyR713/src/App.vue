<template>
    <div id="app" class="noselect">
        <div class="container">
            <!--头部-->
            <h3 v-html="title" class="app_title"></h3>
            <!--视图区-->
            <div class="ViewSpace" >
              <div :style="[zoom]" class="viewBox">
                <div class="wrap">
                  <div class="leftWrap">
                    <img :src="img1">
                  </div>
                  <div class="rightWrap">
                    <img :src="img2">
                    <ui-btn type="play" v-model="played" id="button1" v-show="played" @click.native="isPlay"></ui-btn>
                  </div>
                </div>
                
              </div>
            </div>
        </div>
        
        <!--侧边按钮区-->
        <div class="app_aside">
            <!--重制按钮-->
            <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget" id="button0"></ui-btn>
            <!--清除浮动-->
            <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
              <div class="side-gif">
                <img :src="img3">
              </div>
              <ui-btn :type="blue1" size="big" @click.native="btnClick(1)" :class = "{whiteColor: blue1 ==='blue'}" id="button2">滴加0.3g/mL蔗糖溶液</ui-btn>
              <ui-btn :type='blue2' size="big" @click.native="btnClick(2)" :class = "{whiteColor: blue2 ==='blue'}" style="margin-bottom: 50px;" id="button3">滴加清水</ui-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import uiBtn from '@/components/UI/uiBtn'; //按钮
    import uiSlider from '@/components/UI/uiSlider';
    export default {
      name: 'app',
      components: {
        uiBtn,
        uiSlider
      },
      data() {
        return {
          title: '植物细胞的质壁分离',
          BtnSpaceStyle: 'flex',
          zoom: {}, //区域大小
          blue1: '',
          blue2: '',
          img1:'static/img/separate0.png',
          img2:'static/img/cell0.png',
          img3:'static/img/bg2.png',
          timer:null,
          played:false,
          blue:0,
          isPlayed:false,
        }
      },
      created() {
        document.title = this.title;
      },
      mounted() {
        this.resize();
        this.setSideStyle();
        this.getViewSize();
      },
      computed: {},
      watch: {
      },
      methods: {
        isPlay(){
          this.played = false;
          if(this.blue1 =='blue'){
            this.setImgUrl(1);
          }else if(this.blue2 == 'blue'){
            this.setImgUrl(2);
          }
        },
        btnClick(val){
          this.bg = '';
          if(val==this.blue||this.isPlayed){
            return;
          }
          this.blue=val;
          this.played = false;
          this.setImgUrl(val);
        },
        setImgUrl(val){
          clearTimeout(this.timer);
          let thiz = this;
          let arr1 = [
            'static/img/separate1.gif?'+Math.random(),
            'static/img/cell1.gif?'+Math.random(),
            'static/img/water1.gif?'+Math.random()
          ];
          let arr2 = [
            'static/img/separate2.gif?'+Math.random(),
            'static/img/cell2.gif?'+Math.random(),
            'static/img/water2.gif?'+Math.random()
          ]
          if(val===1) {
            this.blue1 = 'blue';
            this.blue2 = '';
           this.imgL(arr1[0], (src)=> {
             this.img1=src;
             this.isPlayed=true;
           })
           this.imgL(arr1[1], (src)=> {
              this.img2=src;
              this.isPlayed=true;
           })
          this.imgL(arr1[2], (src)=> {
              this.img3=src;
              this.isPlayed=true;
           })
          }else if(val === 2){
            this.blue2 = 'blue';
            this.blue1 = '';
            this.imgL(arr2[0], (src)=> {
             this.img1=src;
             this.isPlayed=true;
           })
           this.imgL(arr2[1], (src)=> {
              this.img2=src;
              this.isPlayed=true;
           })
          this.imgL(arr2[2], (src)=> {
              this.img3=src;
              this.isPlayed=true;
           })
          }
          if(!this.played){
            this.timer = setTimeout(()=>{
              this.played= true;
              this.isPlayed=false;
            },3600)
          }
        },
        imgL(src, callback) {
          var img = new Image();
          img.src = src;
          img.onload = function () {
            callback && callback(img.src);
          }
        },
        //计算侧边
        setSideStyle() {
          const el = document.getElementById('btn_space')
          if (el && el.scrollHeight > el.offsetHeight) {
            this.BtnSpaceStyle = 'block'
          } else {
            this.BtnSpaceStyle = 'flex'
          }
        },

        //计算区块大小
        getViewSize() {
          const W = window.innerWidth - 280;
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
          window.addEventListener('resize', function() {
            vm.setSideStyle();
            vm.getViewSize();
          })
        },

        //重置
        resetWidget() {
          this.blue1='';
          this.blue2= '';
          this.img1='static/img/separate0.png';
          this.img2='static/img/cell0.png';
          this.img3='static/img/bg2.png';
          this.played=false;
          this.blue=0;
          this.isPlayed=false;
          clearTimeout(this.timer);
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
        width: calc(100% - 280px);
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
        width: 280px;
        background-color: #F7F7F7;
        height: 100%;
        box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);
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
        align-items: center;
        justify-content: center;
        flex-direction: column;
        overflow: hidden;
        overflow-y: auto;
    }

    .btn_space .UI-btn {
      margin-bottom: 15px;
      line-height: 44px;
    }
    .btn_space .UI-btn.disabled{
      opacity: 0.5;
      cursor: not-allowed;
    }
    .btn_space .side-gif {
      width:240px;
      height:240px;
      background: #fff;
      padding:10px;
      border: 1px solid rgba(215,215,215,0.40);
      box-shadow: 0 1px 2px 0 rgba(159,159,159,0.50);
      border-radius: 6px;
      margin-bottom:30px;
    }

    .side-gif img {
      width:220px;
      height:220px;
    }
    .btn_space h3{
      font-size: 18px;
      font-weight: normal;
      color: #333;
      margin-bottom: 15px;
      text-align: center;
    }
    .UI-btn.btn-blue{
      color: #000;
    }
    .UI-btn.btn-blue.whiteColor {
      color:#fff;
    }
    sup{
      font-size: 14px;
      color: #373334;
    }
    sup.small{
      color: #FF546B;
    }

    /*视图区*/
    .ViewSpace {
      width: 100%;
      height: calc(100% - 72px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ViewSpace .viewBox{
      position: relative;
      width:744px;
      height: 505px;
      padding:20px 0;
    }
     
    .viewBox .wrap {
      display: flex;
      align-items: center;
      /*justify-content: space-between;*/
      padding:0 12px;
      margin:0 auto;
      width:700px;
      height: 410px;
      border: 1px solid rgba(207,207,207,0.41);
      box-shadow: 0 1px 2px 0 rgba(167,167,167,0.50);
      border-radius: 6px;
    }
    /*.wrap.bg {
      background: url('../static/img/bg1.png') no-repeat;
      background-origin: center;
      background-size: cover;
    }*/
    .viewBox .leftWrap {
      position: relative;
      width:260px;
      height:384px;
    }
    .viewBox .leftWrap:after {
      content: "叶肉细胞";
      position: absolute;
      bottom:10px;
      left: 50%;
      transform: translateX(-50%);
    }
    .viewBox .leftWrap img {
      height:100%;
      width:100%;
    }
    .viewBox .rightWrap {
      position: relative;
      width:400px;
      height:236px;
    }
    .viewBox .rightWrap:after {
      content: "洋葱鳞片叶外表皮细胞";
      position: absolute;
      bottom:-30px;
      left: 50%;
      transform: translateX(-50%);
    }
    #button1 {
      position: absolute;
      right:0;
      bottom:-130px;
      zoom:0.5;
    }
    .viewBox .rightWrap > img {
      height:100%;
      width:100%;
    }
</style>
