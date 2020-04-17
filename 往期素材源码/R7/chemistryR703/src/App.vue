<template>
    <div id="app" class="noselect">
        <div class="container">
            <!--头部-->
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
            <div class="ViewSpace" >
              <div :style="[zoom]" class="viewBox">
                  <img id="img" :src="src">
                  <div class="bottom-img">
                      <img :src="src1">
                  </div>
              </div>
            </div>
        </div>
        <!--侧边按钮区-->
        <div class="app_aside">
            <!--重制按钮-->
            <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget" id="button1"></ui-btn>
            <!--清除浮动-->
            <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
                <ui-btn type="checkbox"  v-model="checked1" id="button2">
                    分子极性相同
                </ui-btn>
                <ui-btn type="checkbox" v-model="checked2" style="margin-bottom: 0" id="button3">
                    分子结构相似
                </ui-btn>
                <div id="radioG" style="margin-top: 65px;">
                    <p class="titleG">氢键作用力</p>
                    <div>
                        <div @click="radioC(1)" :class="{checked:radio1}" id="button4">
                            <p>弱</p>
                            <span><em></em></span>
                        </div>
                        <div @click="radioC(2)" :class="{checked:radio2}" id="button5">
                            <p>中</p>
                            <span><em></em></span>
                        </div>
                        <div @click="radioC(3)" :class="{checked:radio3}" id="button6">
                            <p>强</p>
                            <span><em></em></span>
                        </div>
                    </div>
                </div>
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
        title: '溶解性的影响因素',
        BtnSpaceStyle: 'flex',
        zoom: {},//区域大小
        checked1:false,
        checked2:false,
        radio1:false,
        radio2:false,
        radio3:false,
        radio:0,
        src:'static/img/0.gif',
        src1:'static/img/bottom-img.png',
        timer:null,
        num:0
      }
    },
    created(){
      document.title = this.title;
    },
    mounted(){
      this.resize();
      this.setSideStyle();
      this.getViewSize();
    },
    computed: {},
    watch: {
        checked1(){
          this.doImg(1);
        },
        checked2(){
          this.doImg(2);
        },
        radio(){
          this.doImg();
        }
    },
    methods: {
      doImg(n){
        var c1 = this.checked1,c2 = this.checked2,r=this.radio;
        var num=this.num;
        if(n){
          c1?num++:num--;
          c2?num++:num--;
        }
        r==1||r==0?c1&&c2?num=2:c1||c2?num=1:num=0:r==2?c1&&c2?num=3:c1||c2?num=2:num=1:r==3?c1&&c2?num=4:c1||c2?num=3:num=2:'';
        this.num=num;
        this.ImgL('static/img/'+this.num+'.gif?'+Math.random());
      },
      ImgL(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
          $('#img').attr('src', src);
        }
      },
      radioC(val){
        if (val == 1) {
          this.radio1 = true;
          this.radio2 = false;
          this.radio3 = false;
          this.radio = 1;
        }
        else if (val == 2) {
          this.radio2 = true;
          this.radio1 = false;
          this.radio3 = false;
          this.radio = 2;
        }
        else {
          this.radio3 = true;
          this.radio1 = false;
          this.radio2 = false;
          this.radio = 3;
        }
      },
      //计算侧边
      setSideStyle()
      {
        const el = document.getElementById('btn_space');
        if (el && el.scrollHeight > el.offsetHeight) {
          this.BtnSpaceStyle = 'block'
        } else {
          this.BtnSpaceStyle = 'flex'
        }
      }
    ,
      //计算区块大小
      getViewSize(){
        const W = window.innerWidth - 280;
        const H = window.innerHeight - 72;
        if (W / H >= 744 / 505) {
          this.zoom = {zoom: H / 505}
        } else {
          this.zoom = {
            zoom: W / 744
          }
        }
      },
      //窗口大小更改
      resize(){
        const vm = this;
        window.addEventListener('resize', function () {
          vm.setSideStyle();
          vm.getViewSize();
        })
      },
      //重置
      resetWidget(){
        this.ImgL('static/img/0.gif?'+Math.random());
        this.radio=0;
        this.num=0;
        this.checked1=false;
        this.checked2=false;
        this.radio1=false;
        this.radio2=false;
        this.radio3=false;

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


    /*视图区*/
    .ViewSpace {
      width: 100%;
        height: calc(100% - 72px);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
    }
    .ViewSpace .viewBox{
      position: relative;
      width:744px;
      height: 505px;
      padding:20px 0;
    }
    .viewBox>img{
        margin: 0 auto;
        display: block;
        width: 450px;
        height: 450px;
        padding: 5px;
        box-shadow: 0 1px 2px 0 rgba(144,144,144,0.50);
        border-radius: 5px;
    }

    .bottom-img{
        position: absolute;
        bottom: 27px;
        right: 27px;
        width: 95px;
        height: 70px;
    }
    .bottom-img img{
        display: block;
        width: 100%;
        height: 100%;
    }

    #radioG{
        width:240px;
        height:108px;
        background-color: #fff;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        display: inline-block;
    }
    #radioG .titleG{
        height: 16px;
        line-height: 16px;
        margin-top: 14px;
        text-align: center;
    }
    #radioG>div{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        margin-top: 18px;
    }
    #radioG>div>div{
        width: 48px;
        height: 60px;
        cursor: pointer;
    }
    #radioG>div>div>p{
        height: 16px;
        line-height: 16px;
        text-align: center;
        color:#999;
    }
    #radioG>div>div span {
        display: inline-block;
        width: 24px;
        height: 24px;
        background-color: #f0f0f0;
        border-radius: 50%;
        float: left;
        transition: all 0.2s;
        margin: 8px 0 0 12px;
    }
    #radioG>div>div.checked span{
        background-color: #5caefd;
    }
    #radioG>div>div.checked p{
        color:#000;
    }
    #radioG>div>div span em {
        transition: all 0.1s 0.2s;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: block;
        margin: 7px auto;
    }
    #radioG>div>div.checked span em {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fff;
        display: block;
        margin: 7px auto;
    }

</style>
