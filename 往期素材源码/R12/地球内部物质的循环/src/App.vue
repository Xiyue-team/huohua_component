<template>
    <div id="app" class="noselect">
        <div v-show="blueN!=0" :style="'width:100%;height:100%;position:absolute;z-index:9;top:0;'">
            <div id="videoView"></div>
            <div id="videoM" :style="'transform: scale('+zoomF+');left:'+(W+148-850*zoomF)/2+'px;top:'+(H+90-478*zoomF)/2+'px;'">
                <img :src="src" draggable="false">
                <div :style="'width:35px;height:35px;position:absolute;top:15px;right:15px;cursor: pointer; background-color:red;background:#fff;border-radius:50%;'" @click="closeV">
                    <img src="static/UI/close.png" :style="'width:100%;display:block;'">
                </div>
            </div>
        </div>
        <!--头部-->
        <h3 v-html="title" class="app_title"></h3>
        <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
        <div class="ctrl" :style="'width:148px;padding:24px;position:absolute;right:0;height:'+H+'px'">
            <div style="width:100%;height:204px;position:absolute;top:0;bottom:0;margin:auto;">
                <ui-btn @click.native="choose(1)" :type="blue1" style="width:100px;margin:6px 0;">沉积岩</ui-btn>
                <ui-btn @click.native="choose(2)" :type="blue2" style="width:100px;margin:6px 0;">变质岩</ui-btn>
                <ui-btn @click.native="choose(3)" :type="blue3" style="width:100px;margin:6px 0;">岩浆</ui-btn>
            </div>
        </div>
        <div class="container" :style="'width:'+W+'px;height:'+H+'px'">
            <!--视图区-->
            <div class="View" :style="'width:'+VW+'px;height:'+VH+'px;'">
                <div class="ViewSpace" :style="'transform: scale('+zoomF+');'">
                    <div class="viewM" :style="'width:663px;height:430px;position:absolute;top:10px;left:13px;background-image:url(./static/UI/bg1.png);'">
                        <div :style="'width:'+value+'px;background-image:url(./static/UI/bg2.png);'"></div>
                        <p :style="'left:99px;top:341px;'">岩浆</p>
                        <p :style="'left:221px;top:368px;'">变质岩</p>
                        <p :style="'left:462px;top:296px;'">沉积岩</p>
                    </div>
                    <ui-slider v-if="zoomF"
                       :min="0"
                       :max="663"
                       v-model="value"
                       :zoom="zoomF"
                       :noBlueProcess="true"
                       :clickable="false"
                       :speed="0"
                       :style="'position: absolute;top:360px;left:-10px;z-index:1;'"></ui-slider>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import uiBtn from '@/components/UI/uiBtn'; //按钮
    import uiSlider from '@/components/UI/uiSlider'; //按钮
    export default {
        name: 'app',
        components: {
            uiBtn,
            uiSlider
        },
        data() {
            return {
                title: '地球内部物质的循环',
                H:window.innerHeight-72,
                W:window.innerHeight-148,
                VW:0,
                VH:0,
                zoomF:0,
                blue1:'',
                blue2:'',
                blue3:'',
                blueN:0,
                value:1,
                timer:null,
                src:'static/img/0.jpg',
                num: 0,
                totalNum: '',
                prefix: '',
                prefixO: ''
            }
        },
        created() {
            document.title = this.title;
        },
        mounted() {
            this.getViewSize();
            this.src = 'static/img/0.jpg';
            window.addEventListener('resize', () => {
                this.getViewSize();
            })
        },
        computed: {},
        watch: {

        },
        methods: {
            choose(v){
                this.blue1='';
                this.blue2='';
                this.blue3='';
                this['blue'+v]='blue';
                this.blueN=v;
                this.value=v;
                clearTimeout(this.timer);
                if(v==1){
                    this.totalNum = 163;
                    this.prefix = 'a';
                    this.imgAni('a');
                }
                else if(v==2){
                    this.totalNum = 159;
                    this.prefix = 'b';
                    this.imgAni('b');
                }
                else{
                    this.totalNum = 132;
                    this.prefix = 'c';
                    this.imgAni('c');
                }
            },
            closeV(){
                clearTimeout(this.timer);
                this['blue'+this.blueN]='';
                this.blueN=0;
                this.num= 0;
                this.src = 'static/img/0.jpg';
                this.totalNum= '';
                this.prefix= '';
                this.prefixO= '';
            },
            //计算区块大小
            getViewSize() {
                var W=window.innerWidth-148;
                var H=window.innerHeight-90;
                this.H=H;
                this.W=W;
                if(W/H>690/490){
                    this.VW=parseInt(690*H/490)*0.9;
                    this.VH=H*0.9;
                    this.zoomF=(H/490).toFixed(2)*0.9;
                }else{
                    this.VW=W*0.9;
                    this.VH=parseInt(490*W/690)*0.9;
                    this.zoomF=(W/690).toFixed(2)*0.9;
                }
            },
            imgAni(type) {
              let thiz = this;
              if (type != this.prefixO) {
                this.num = 0;
              }
              this.prefixO = type;

              function ani() {
                if (thiz.num > thiz.totalNum) {
                  thiz.num = 0;
                  thiz.timer=null;
                  return;
                }
                thiz.preloadImage(`static/img/${thiz.prefix+thiz.num}.jpg`).then((path) => {
                  if(thiz.timer!=null){
                    thiz.src = path;
                  }
                });
                thiz.num++;
                thiz.timer = setTimeout(ani, 80);
              }
              ani();
            },

            preloadImage(path) {
              return new Promise((resolve, reject) => {
                let image = new Image();
                image.onload = () => resolve(path);
                image.onerror = reject;
                image.src = path;
              })
            },

            //重置
            resetWidget() {
                this.value=1;
                this.blueN=0;
                this.blue1='';
                this.blue2='';
                this.blue3='';
                this.num= 0;
                this.totalNum= '';
                this.prefix= '';
                this.prefixO= '';
                this.src = 'static/img/0.jpg';
            },
        },
    }
</script>
<style>
    * {
        margin: 0;
        padding: 0;
        line-height: 0;
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
    h3 {
        font-size: 24px;
        color: #000;
        line-height: 1.0;
        padding: 24px;
        font-weight: normal;
    }
    .container {
        width: 100%;
        position: relative;
    }
    .aside_reset {
        position: fixed;
        right: 0;
        top: 0;
        margin: 20px 24px;
    }
    .View{
        position: absolute;
        left:0;
        right:0;
        top:0;
        bottom:0;
        margin: auto;
    }
    .ViewSpace{
        width:690px;
        height: 510px;
        padding: 10px;
        transform-origin: top left;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
    }
    .ViewSpace div{
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-position: 0 0;
        background-origin: content-box;
    }
    .ViewSpace .viewM div{
        height: 100%;
        position: absolute;
        top:0;
        left: 0;
    }
    .ViewSpace .viewM p{
        font-family: PingFangSC-Medium;
        font-size: 20px;
        line-height: 30px;
        color: #FFFFFF;
        text-shadow: 0 2px 4px rgba(0,0,0,0.50);
        position:absolute;
        z-index: 3;
        width: 70px;
        height: 30px;
        text-align: center;
    }
    #videoView{
        width:100%;
        height:100%;
        position: absolute;
        z-index: 9;
        background-color: #4a4a4a;
        opacity: 0.5;
    }
    #videoM{
        width:850px;
        height: 478px;
        padding: 10px;
        background: #FFFFFF;
        border: 0 solid rgba(0,0,0,0.12);
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
        border-radius: 6px;
        transform-origin: left top;
        position:absolute;
        z-index: 66;
    }
    #videoM>img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .op{
        display: none;
    }
</style>