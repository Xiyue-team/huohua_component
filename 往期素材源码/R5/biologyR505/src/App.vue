<template>
    <div id="app" class="noselect">
        <div class="container">
            <!--头部-->
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
          <div class="view_space" >
            <div id="renderCanvas" :style="[zoom]">
                <div class="left clearfix">
                    <div class="left-item">
                        <img id="greenImg" :src="src" />
                    </div>
                    <div class="left-item">
                        <img id="yellowImg" :src="src1" />
                    </div>
                </div>
                <div class="right">
                    <div class="rightBox">
                        <div class="x">
                            <div class="tr"></div>
                        </div>
                        <div class="dd dd1" :style="'height:'+(counter1/count)*100+'%'">
                            <span>DD</span>
                        </div>
                        <div class="dd dd2 " :style="'height:'+(counter2/count)*100+'%'">
                            <span>Dd</span>
                        </div>
                        <div class="dd dd3" :style="'height:'+(counter3/count)*100+'%'">
                            <span>dd</span>
                        </div>
                        <div class="textx">
                            <span>基因型</span>
                        </div>
                        <div class="y">
                            <div class="tr"></div>
                        </div>
                        <div class="texty"><span>概率</span></div>
                        <div class="line line25"><i>25%</i><span></span></div>
                        <div class="line line50"><i>50%</i><span></span></div>
                        <div class="line line75"><i>75%</i><span></span></div>
                        <div class="line line100"><i>100%</i><span></span></div>

                    </div>

                </div>
            </div>
          </div>
        </div>
        <!--侧边按钮区-->
        <div class="app_aside">
            <!--重制按钮-->
            <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
            <!--清除浮动-->

            <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
                <table class="tab">
                    <tr><th>抽取结果</th><th>次数</th></tr>
                    <tr><td>DD</td><td>{{counter1}}</td></tr>
                    <tr><td>Dd</td><td>{{counter2}}</td></tr>
                    <tr><td>dd</td><td>{{counter3}}</td></tr>
                    <tr><td>总次数</td><td>{{count}}</td></tr>
                </table>

                <ui-btn size="big" :type="blue1"  @click.native="blueClick(1)">抽取</ui-btn>
                <ui-btn size="big" :type="blue2"  @click.native="blueClick(2)">自动抽取</ui-btn>
            </div>
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
                title: '性状分离比的模拟实验',
                viewSize: {
                  width: (window.innerWidth - 346) + 'px',
                  height: (window.innerWidth - 346) * 9 / 16 + 'px',
                },//区域大小
                BtnSpaceStyle: 'flex',
                count: 0,
                click:true,
                number:0,
                timer:null,
                zoom:{},
                blue1:'',
                blue2:'',
                pause:null,
                counter1: 0,
                counter2: 0,
                counter3: 0,
                src:'static/images/greenDefault.png',
                src1:'static/images/yellowDefault.png'
            }
        },
        created(){
            document.title = this.title;
            this.getViewSize()
        },
        mounted(){
          this.resize();
          this.setSideStyle();
        },
        computed: {},
        methods: {
            blueClick(val){
                let num =Math.floor(Math.random()*4);
                let _this = this;
                if(val == 1){
                    if(this.click){
                        this.blue1='blue';
                        this.blue2='';
                        if(num == 0){
                            this.ImgL('static/images/greenGifA.gif',function(){
                                $('#greenImg').attr('src', 'static/images/greenGifA.gif');
                            });
                            this.ImgL('static/images/yellowGifA.gif',function(){
                                $('#yellowImg').attr('src', 'static/images/yellowGifA.gif');
                            });
                        }else if(num == 1 || num == 2){
                            var A=Math.random()*2;
                            if(A>1){
                                this.ImgL('static/images/greenGifA.gif',function(){
                                    $('#greenImg').attr('src', 'static/images/greenGifA.gif');
                                });
                                this.ImgL('static/images/yellowGifB.gif',function(){
                                    $('#yellowImg').attr('src', 'static/images/yellowGifB.gif');
                                });
                            }else{
                                this.ImgL('static/images/greenGifB.gif',function(){
                                    $('#greenImg').attr('src', 'static/images/greenGifB.gif');
                                });
                                this.ImgL('static/images/yellowGifA.gif',function(){
                                    $('#yellowImg').attr('src', 'static/images/yellowGifA.gif');
                                });
                            }
                        }else if(num == 3){
                            this.ImgL('static/images/greenGifB.gif',function(){
                                $('#greenImg').attr('src', 'static/images/greenGifB.gif');
                            });
                            this.ImgL('static/images/yellowGifB.gif',function(){
                                $('#yellowImg').attr('src', 'static/images/yellowGifB.gif');
                            });
                        }
                        this.pause = setTimeout(()=>{
                            if(num == 0){
                                _this.counter1=_this.counter1+1;
                            }else if(num == 1 || num==2){
                                _this.counter2=_this.counter2+1;
                            }else if(num == 3){
                                _this.counter3=_this.counter3+1;
                            }
                            _this.count = _this.counter1+_this.counter2+_this.counter3;
                            _this.blue1='';
                            _this.click = true;
                            clearTimeout(this.pause);
                        },2000);
                    }
                        this.click =false;

                }else if (val == 2) {
                    this.click = false;
                    this.number=this.count;
                    clearInterval(this.timer);
                    this.timer=setInterval(this.autoPlay,50);
                }
            },
            autoPlay(){
                this.blue2='blue';
                this.blue1='';
                let num =Math.floor(Math.random()*4);
                if(num == 0){
                    this.ImgL('static/images/greenA.png',function(){
                        $('#greenImg').attr('src', 'static/images/greenA.png');
                    });
                    this.ImgL('static/images/yellowA.png',function(){
                        $('#yellowImg').attr('src', 'static/images/yellowA.png');
                    });
                    this.counter1=this.counter1+1;
                }else if(num == 1 || num==2){
                    let A=Math.random()*2;
                    if(A>1){
                        this.ImgL('static/images/greenA.png',function(){
                            $('#greenImg').attr('src', 'static/images/greenA.png');
                        });
                        this.ImgL('static/images/yellowB.png',function(){
                            $('#yellowImg').attr('src', 'static/images/yellowB.png');
                        });
                    }else{
                        this.ImgL('static/images/greenB.png',function(){
                            $('#greenImg').attr('src', 'static/images/greenB.png');
                        });
                        this.ImgL('static/images/yellowA.png',function(){
                            $('#yellowImg').attr('src', 'static/images/yellowA.png');
                        });
                    }
                    this.counter2=this.counter2+1;
                }
                else if(num == 3){
                    this.ImgL('static/images/greenB.png',function(){
                        $('#greenImg').attr('src', 'static/images/greenB.png');
                    });
                    this.ImgL('static/images/yellowB.png',function(){
                        $('#yellowImg').attr('src', 'static/images/yellowB.png');
                    });
                    this.counter3=this.counter3+1;
                }
                this.count = this.counter1+this.counter2+this.counter3;
                if(this.count%100==0){
                    clearInterval(this.timer);
                    this.blue2='';
                    this.click = true;
                }


            },
            ImgL(src, callback){
                var img = new Image();
                img.src = src;
                img.onload = function () {
                    callback && callback();
                }
            },
            //计算侧边
            setSideStyle(){
                const el = document.getElementById('btn_space')
                if (el && el.scrollHeight > el.offsetHeight) {
                    this.BtnSpaceStyle = 'block'
                } else {
                    this.BtnSpaceStyle = 'flex'
                }
            },

          //计算区块大小
          getViewSize(){
              const W = window.innerWidth - 280;
              const H = window.innerHeight - 72;
              if (W/H >= 740/420) {
                  this.zoom = {
                      zoom: H/420
                  }
              } else {
                  this.zoom = {
                      zoom: W/740
                  }
              }
          },


            //窗口大小更改
            resize(){
              const vm = this;
              window.addEventListener('resize', function () {
                vm.getViewSize();//计算视图区大小
                vm.setSideStyle();//计算操作区大小
              })
            },

            //重置
            resetWidget(){
                clearInterval(this.timer);
                clearTimeout(this.pause);
                this.ImgL('static/images/greenDefault.png',function(){
                    $('#greenImg').attr('src', 'static/images/greenDefault.png');
                });
                this.ImgL('static/images/yellowDefault.png',function(){
                    $('#yellowImg').attr('src', 'static/images/yellowDefault.png');
                });
                this.blue1="";
                this.blue2="";
                this.counter1=0;
                this.counter2=0;
                this.counter3=0;
                this.count=0;
                this.click = true;
                $('.dd').css('height','0');
            }
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
    .view_space {
        width: 100%;
        height: calc(100% - 72px);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .view_space #renderCanvas{
        position: relative;
        width:740px;
        height: 420px;
        padding:20px 0;
    }
    .left{
        float: left;
        width: 50%;
        height: 100%;
        border: 1px solid rgba(0, 0, 0, 0.15);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        border-radius: 6px;
        padding: 10px;
    }

    .left-item{
      float: left;
      width: 50%;
      height: 100%;

    }
    .left-item img{
      width: 100%;
      height: 100%;
    }

    .right{
        float: right;
        width: 45%;
        height: 320px;
        padding-top:8%;
        padding-left: 5%;

    }
    .rightBox{
        width: 100%;
        height: 100%;
        position: relative;
        top: 15%;
    }
    .right .x,
    .right .x .tr,
    .right .y,
    .right .y .tr,
    .right .dd,
    .right  span,
    .right .textx,
    .right .line,
    .right .texty,
    .right .line i
    {
        position: absolute;
    }
    .right .x{
        position: absolute;
        width: 90%;
        height: 2px;
        left: 0;
        bottom: 0;
        background-color: #000;
    }
    .right .y{
        width: 2px;
        height: 130%;
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: #000;
    }
    .right .x .tr{
        width: 0;
        height: 0;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-left: 10px solid #000;
        position: absolute;
        top: -3px;
        right: -10px;
    }
    .right .y .tr{
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 10px solid #000;
        position: absolute;
        top: -3px;
        left: -3px;
    }
    .right .dd{
        width: 12%;
        height: 0;
        bottom: 2px;
        background-color: #4A90E2;
        transition: .35s;
    }
    .right .dd1{left: 10%;}
    .right .dd2{  left: 30%; }
    .right .dd3{  left: 50%; }

    .right .dd span{
        width: 100%;
        bottom: -25px;
        text-align: center;
    }
    .right .textx{
        width: 30%;
        height: 10%;
        bottom: 2.5%;
        right: 8%;
    }
   .right .textx span{
        width: 100%;
        bottom: -32px;
        text-align: center;
    }

   .right .line{
       left: -40px;
       bottom: -20px;
   }
   .right .line25{bottom: 25%;}
   .right .line50{bottom: 50%;}
   .right .line75{bottom: 75%;}
   .right .line100{bottom: 100%;}

   .right .line i{
        left: -8px;
        width: 36px;
        bottom: -7px;
        font-style: normal;
        font-size: 14px;
    }
    .right .line100 i{
        left: -14px;
    }
   .right .line span{
       left:31px;
       bottom: 0;
       width: 9px;
       height: 2px;
       background-color: #000;
   }

   .right .texty{
       bottom: 118%;
       left: -45px;
   }
    .right .texty span{
        position: static;
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

    .view_space {
      margin: 50px 32px 92px 32px;
      width: calc(100% - 66px);
      height: calc(100% - 214px);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
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
    .tab{
        width: 240px;
        height: 186px;
        background: #fff;
        text-align: center;
        border-radius: 6px;
        border-collapse: collapse;
        margin-bottom: 40px;
    }
    .tab tr:first-child{
        border-bottom:1px solid #f7f7f7;
    }
    .tab th:first-child,
    .tab tr td:first-child
    {
        border-right:1px solid #f7f7f7;
    }
    .tab td{
        width: 50%;

    }

    .btn_space .UI-btn {
        margin-bottom: 20px;

    }
    .clearfix{
        zoom: 1;
    }
    .clearfix:after{
        content: '';
        height: 0;
        visibility: hidden;
        clear: both;
    }


</style>
