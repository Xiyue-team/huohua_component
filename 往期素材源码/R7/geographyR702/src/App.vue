<template>
    <div id="app" class="noselect">
        <div class="container" :style="'position: relative;'">
            <!--头部-->
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
            <div id='show' :style="'position: absolute;width:740px;height:440px;top:0px;bottom:0;right:0;left:0;margin:auto;'">
            	<div class="view_space" :style="'background-image:url(./static/image/a'+num+'.png);margin: 20px;margin-bottom:20px;'"></div>
            </div>
            <ui-slider id='slider' value="1"
                       :min="1"
                       :max="90"
                       :boxWidth="W"
                       :boxHeight="70"
                       :title="false"
                       :tooltip="false"
                       :timeLine="false"
                       :speed='0'
                       v-model='value'
                       :label="['五月中旬','六月中旬','七月中旬']" :style="'position: absolute;right:'+R+'px;z-index:999;'">
            </ui-slider>
        </div>
        <!--侧边按钮区-->
        <div class="app_aside">
            <!--重制按钮-->
            <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
            <!--清除浮动-->
            <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
                <div style='width: 240px;height: 200px;'>
                	<img src="../static/image/bj.png" style='width: 240px;height: 200px;'/>
                </div>
                <ui-btn type="play" v-model="played" style='margin:50px auto;'></ui-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import uiHead from '@/components/UI/uiHead';//头部
    import uiBtn from '@/components/UI/uiBtn';//按钮
    import uiSlider from '@/components/UI/uiSlider';//滑块
    export default {
        name: 'app',
        components: {uiHead, uiBtn, uiSlider},
        data(){
            return {
                title:'江淮准静止锋的移动路径',
                BtnSpaceStyle: 'flex',
                played:true,
                num:1,
                value:1,
                W:(window.innerWidth-280)/(window.innerHeight-140)>740/440?600*(window.innerHeight-140)/440:600*(window.innerWidth-280)/740,
                R:(window.innerWidth-280)/(window.innerHeight-140)>740/440?(window.innerWidth-280-700*(window.innerHeight-140)/440)/2:(window.innerWidth-280-700*(window.innerWidth-280)/740)/2,
                TM:null,
            }
        },
        created(){
            document.title = this.title;
        },
        watch:{
        	value(v){
        		var I=new Image();
        		I.src='./static/image/a'+v+'.png';
        		var thiz=this;
        		I.onload=function(){
        			thiz.num=v;
        		}
        		if(v==90){
        		   $('#s1').css('background','#5caefd')
        		   $('#s2').css('background','#5caefd')
        		   $('#s3').css('background','#5caefd')
                }else if(v>45&&v<90){
                   $('#s1').css('background','#5caefd')
                   $('#s2').css('background','#5caefd')
                   $('#s3').css('background','#f0f0f0')
                }else if(v>=1&&v<45){
                   $('#s1').css('background','#5caefd')
                   $('#s2').css('background','#f0f0f0')
                   $('#s3').css('background','#f0f0f0')
                }
        	},
        	played(){
        		var thiz=this;
        		if(!this.played){
        		    if(thiz.value==90){
                        thiz.value=1;
                    }
        			this.TM=setInterval(function(){
        				if(thiz.value==90){
                            thiz.played=true;
        					clearInterval(thiz.TM);
        				}
        				thiz.value++;
        			},100)
        		}else{
        			clearInterval(thiz.TM);
        		}
        	}
        },
        mounted(){
          this.setSideStyle();
          $('#slider').append('<div id="sliderP"><span id="s1"></span><span id="s2"></span><span id="s3"></span></div>');
          window.addEventListener('resize', ()=>{
              this.setSideStyle();
          });
        },
        methods: {
            //计算侧边
            setSideStyle(){
                const el = document.getElementById('btn_space');
                if (el && el.scrollHeight > el.offsetHeight) {
                    this.BtnSpaceStyle = 'block';
                } else {
                    this.BtnSpaceStyle = 'flex';
                }
                var W=window.innerWidth-280;
                var H=window.innerHeight-140;
                var zoom;
                if( W/H > 740/440){
                	zoom=H/440;
                }else{
                	zoom=W/740;
                }
                $('#show').css('zoom',zoom);
                this.W=600*zoom;
                this.R=(window.innerWidth-280-700*zoom)/2;
                var T=(window.innerHeight-440*zoom)/2+420*zoom;
                $('#slider').css('top',T+'px');
            },
            //重置
            resetWidget(){
              clearInterval(this.TM);
              this.value=1;
              this.num=1;
              this.played=true;

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
	.vue-slider{
		margin:45px auto !important;
	}
	.ui-label{
		margin:auto !important;
		width:95% !important;
		top:15px !important;
	}
    .ui-dot{
        top:-20px !important;
    }
	.ui-label li{
		color:#000 !important;
	}
    #slider{
        position: relative;
    }
    #slider>div#sliderP{
        position: absolute;
        background: transparent;
        top:42px;
        width:calc(100% - 44px);
        height: 14px;
    }
    #slider>div#sliderP>span{
        display: inline-block;
        width:14px;
        height: 14px;
        background: #f0f0f0;
        border-radius: 50%;
        position: absolute;
        top:-1px;
    }
    #slider>div#sliderP>span#s1{
        left:-6px;
    }
    #slider>div#sliderP>span#s2{
        left:0px;
        right: 0px;
        margin: auto;
    }
    #slider>div#sliderP>span#s3{
        right:-6px;
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
    #renderCanvas {
        border: 1px solid rgba(0, 0, 0, 0.15);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        border-radius: 6px;
        padding: 10px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-origin: content-box;
    }
    .canvas_item{
      float: left;
      width: 50%;
      height: 50%;
    }
    .canvas_item img{
      width: 100%;
      height: 100%;
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
      width: 700px;
      height: 380px;
      padding: 10px;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,0.20);
      border-radius: 5px;
      background-origin: content-box;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      margin: 0 auto;
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

</style>
