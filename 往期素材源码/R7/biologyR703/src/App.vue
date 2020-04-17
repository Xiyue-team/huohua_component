<template>
    <div id="app" class="noselect">
        <div class="container" :style="'position: relative;'">
            <!--头部-->
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
            <div id='show' :style="'position: absolute;width:2880px;height:1800px;'">
            	<div class="view_space" :style="'background-image:url(./static/image/bg.png);margin:0 40px;'">
                    <!--漏斗上部-->
                    <div :style="'width:40px;height:'+ldh+'px;background:rgba(217,115,171,0.55);bottom:542px;left:900px;opacity:'+op1+';'"></div>
                    <div :style="'width:40px;height:'+ldh+'px;background:'+colorN+';bottom:542px;left:900px;opacity:'+op2+';'"></div>
                    <!--漏斗下部-->
                    <div :style="ldx!=''?'background-image:url(./static/image/ldx/'+ldx+'.png);opacity:'+op1+';':''"></div>
                    <div :style="ldx1!=''?'background-image:url(./static/image/ldx/'+ldx1+'.png);opacity:'+op2+';':''"></div>
                    <!--烧杯上部-->
                    <div :style="sb!=''?'width:486px;height:'+sbh+'px;bottom:505px;left:684px;background-position:0px 0px;background-size: 100% auto;background-image:url(./static/image/sbs/'+sb+'.png);opacity:'+op3+';':''"></div>
                    <div :style="sb1!=''?'width:486px;height:'+sbh+'px;bottom:505px;left:684px;background-position:0px 0px;background-size: 100% auto;background-image:url(./static/image/sbs/'+sb1+'.png);opacity:'+op4+';':''"></div>
                    <!--烧杯下部-->
                    <div :style="sb!=''?'background-image:url(./static/image/sbx/'+sb+'.png);opacity:'+op3+';':''"></div>
                    <div :style="sb1!=''?'background-image:url(./static/image/sbx/'+sb1+'.png);opacity:'+op4+';':''"></div>
                    <!--过滤材质-->
                    <div :style="cl!=''?'background-image:url(./static/image/'+cl+'.png);':''"></div>
                    <!--顶层图层-->
                    <div :style="'background-image:url(./static/image/bg1.png);'"></div>
                    <div :style="'background-image:url(./static/image/bg2.png);'"></div>
                    <div :style="'background-image:url(./static/image/kuang.png);'"></div>
                    <div :style="gif!=''?'background-image:url('+gif+');':''"></div>
                    <!--播放按钮-->
                    <div id="botton1" v-show="played" @click="play" :style="'position: absolute;width:144px;height:144px;z-index:999;bottom:32px;left:860px;cursor: pointer;'"><img :style="'width:144px;height:144px;'" src="static/UI/play.png"></div>
                    <p :style="'font-size:50px;position: absolute;right:100px;bottom:80px;'">漏斗内溶液：低浓度蔗糖溶液</p>
                </div>
            </div>
            <div id="bj" :style="'width:100%;height:'+H+'px;position: absolute;bottom:'+B+'px;right:'+R+'px;z-index:999;'"><img src="static/image/bj.png" alt="" :style="'float:right;width:auto;height:'+H+'px;'"></div>
        </div>
        <!--侧边按钮区-->
        <div class="app_aside">
            <!--重制按钮-->
            <ui-btn type="reset1"  id="botton2" class="aside_reset" @click.native="resetWidget"></ui-btn>
            <!--清除浮动-->
            <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
                <div id="radioG1" class="radioG" :style="'height:115px;margin-bottom:12px;'">
                    <p>烧杯内溶液</p>
                    <div>
                        <div @click="radioC1(1)" :class="{checked:radio1}">
                            <span><em></em></span>
                            <p>清水</p>
                        </div>
                        <!--<div @click="radioC1(2)" :class="{checked:radio2}">-->
                            <!--<span><em></em></span>-->
                            <!--<p>低浓度蔗糖溶液</p>-->
                        <!--</div>-->
                        <div @click="radioC1(3)" :class="{checked:radio3}">
                            <span><em></em></span>
                            <p>高浓度蔗糖溶液</p>
                        </div>
                        <!--<div @click="radioC1(4)" :class="{checked:radio4}">-->
                            <!--<span><em></em></span>-->
                            <!--<p>低浓度葡萄糖溶液</p>-->
                        <!--</div>-->
                    </div>
                </div>
                <div id="radioG2" class="radioG"  :style="'height:115px;'">
                    <p>密封材料</p>
                    <div>
                        <div @click="radioC2(1)" :class="{checked:radio5}">
                            <span><em></em></span>
                            <p>玻璃纸</p>
                        </div>
                        <div @click="radioC2(2)" :class="{checked:radio6}">
                            <span><em></em></span>
                            <p>纱布</p>
                        </div>
                    </div>
                </div>
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
                title:'渗透现象',
                BtnSpaceStyle: 'flex',
                ldx:'ditang',
                ldx1:'',
                ldh:120,
                op1:1,
                op2:0,
                op3:1,
                op4:0,
                sb:'',
                sb1:'',
                sbh:200,
                bgSB:'',
                cl:'cl1',
                gif:'',
                R:0,
                H:0,
                B:0,
                radio1:false,
                radio2:false,
                radio3:false,
                radio4:false,
                radio5:true,
                radio6:false,
                radioNum1:0,
                radioNum2:1,
                colorN:'rgba(217,115,171,0.55)',
                color:{
                    '11':'rgba(217,115,171,0.55)',
                    '12':'rgba(217,115,171,0.55)',
                    '13':'rgba(214,85,156,0.55)',
                    '14':'rgba(214,85,156,0.55)',
                    '21':'rgba(231,178,214,0.25)',
                    '22':'rgba(217,115,171,0.55)',
                    '23':'rgba(214,85,156,0.55)',
                    '24':'rgba(208,139,127,0.46)'
                },
                src:{
                    1:'shui',
                    2:'ditang',
                    3:'gaotang',
                    4:'putang'
                },//烧杯原始颜色
                src1:{
                    '11':'shui',
                    '12':'ditang',
                    '13':'ditangAgaotang',
                    '14':'putang',
                    '21':'shuiAditang',
                    '22':'ditang',
                    '23':'ditangAgaotang',
                    '24':'putangAtang'
                },//烧杯结果颜色
                src2:{
                    '11':'ditang',
                    '12':'ditang',
                    '13':'ditangAgaotang',
                    '14':'ditangAgaotang',
                    '21':'shuiAditang',
                    '22':'ditang',
                    '23':'ditangAgaotang',
                    '24':'putangAtang'
                },//漏斗结果颜色
                SET:null,
                played:false
            }
        },
        created(){
            document.title = this.title;
        },
        watch:{
            radioNum1(){
                clearInterval(this.SET);
                this.sbh=200;
                this.ldh=120;
                this.op1=1;
                this.op2=0;
                this.op3=1;
                this.op4=0;
                if(this.radioNum1!=0){
                    this.imgL2(this.src[this.radioNum1],()=>{
                        this.imgLG1(()=>{
                            this.sb=this.src[this.radioNum1];
                            this.sb1=this.src1[this.radioNum2+''+this.radioNum1];
                            this.colorN=this.color[this.radioNum2+''+this.radioNum1];
                            this.ldx1=this.src2[this.radioNum2+''+this.radioNum1];
                            this.played=true;
                        });
                    });
                }else{
                    this.sb='';
                }
            },
            radioNum2(){
                clearInterval(this.SET);
                this.sbh=200;
                this.ldh=120;
                this.op1=1;
                this.op2=0;
                this.op3=1;
                this.op4=0;
                this.imgL1('cl'+this.radioNum2,()=>{
                    if(this.radioNum1!=0){
                        this.played=true;
                        this.imgLG1(()=>{
                            this.cl='cl'+this.radioNum2;
                            this.sb1=this.src1[this.radioNum2+''+this.radioNum1];
                            this.colorN=this.color[this.radioNum2+''+this.radioNum1];
                            this.ldx1=this.src2[this.radioNum2+''+this.radioNum1];
                        });
                    }else{
                        this.cl='cl'+this.radioNum2;
                    }
                });
            }
        },
        mounted(){
          this.setSideStyle();
          window.addEventListener('resize', ()=>{
              this.setSideStyle();
          });
        },
        methods: {
            imgLG(callback){
                var I=new Image();
                I.src='./static/image/gif/'+this.radioNum2+this.radioNum1+'.gif?'+Math.random();
                I.onload=()=>{
                    this.gif=I.src;
                    callback();
                }
            },
            imgLG1(callback){
                var I=new Image();
                I.src='./static/image/gif/'+this.radioNum2+this.radioNum1+'.png';
                I.onload=()=>{
                    this.gif=I.src;
                    callback();
                }
            },
            imgL1(src,callback){
                var I=new Image();
                I.src='./static/image/'+src+'.png';
                I.onload=function () {
                   callback();
                }
            },
            imgL2(src,callback){
                var I1=new Image();
                var I2=new Image();
                var f1=false,f2=false;
                I1.src='./static/image/sbx/'+src+'.png';
                I2.src='./static/image/sbs/'+src+'.png';
                I1.onload=function () {
                    f1=true;
                    if(f2){
                        callback();
                    }
                }
                I2.onload=function () {
                    f2=true;
                    if(f1){
                        callback();
                    }
                }
            },
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
                if( W/H > 2880/1680){
                	zoom=H/1680;
                }else{
                	zoom=W/2880;
                }
                var top=(window.innerHeight-1800*zoom)/2;
                var left=(window.innerWidth-280-2880*zoom)/2;
                $('#show').css({'transform':'scale('+zoom+')','transformOrigin':'0px 0px','top':top+'px','left':left+'px'});
                this.R=(window.innerWidth-280-2800*zoom)/2;
                this.H=(window.innerHeight-1600*zoom)/2*0.8;
                this.B=(window.innerHeight-1600*zoom)/2*0.2-5;
                if(this.H>130){
                    this.H=1600*zoom/4;
                    this.B=(window.innerHeight-1600*zoom)/2-this.H;
                }
            },
            radioC1(num){
                this.radio1=false;
                this.radio2=false;
                this.radio3=false;
                this.radio4=false;
                this.radioNum1=num;
                if(num==1){
                    this.radio1=true;
                }else if(num==2){
                    this.radio2=true;
                }else if(num==3){
                    this.radio3=true;
                }else if(num==4){
                    this.radio4=true;
                }
            },
            radioC2(num){
                this.radio5=false;
                this.radio6=false;
                this.radioNum2=num;
                if(num==1){
                    this.radio5=true;
                }else if(num==2){
                    this.radio6=true;
                }
            },
            play(){
                if(this.radioNum1==0){
                    return;
                }
                clearInterval(this.SET);
                this.played=false;
                this.sbh=200;
                this.ldh=120;
                this.op1=1;
                this.op2=0;
                this.op3=1;
                this.op4=0;
                if(this.radioNum2==1){
                    if(this.radioNum1==1){
                        this.imgLG(()=>{
                            var i=0;
                            this.SET=setInterval(()=>{
                                i++;
                                if(i>40){
                                    clearInterval(this.SET);
                                    this.played=true;
                                    return;
                                }
                                this.sbh--;
                                this.ldh+=2;
                                this.op1-=1/100;
                            },100);
                        });
                    }else if(this.radioNum1==2){
                        this.imgLG(()=>{
                            var i=0;
                            this.SET=setInterval(()=>{
                                i++;
                                if(i>40){
                                    clearInterval(this.SET);
                                    this.played=true;
                                    return;
                                }
                            },100);
                        });
                    }else if(this.radioNum1==3){
                        this.imgLG(()=> {
                            var i = 0;
                            this.SET = setInterval(() => {
                                i++;
                                if (i > 40) {
                                    clearInterval(this.SET);
                                    this.played = true;
                                    return;
                                }
                                this.sbh++;
                                this.ldh -= 2;
                                this.op1-=1/40;
                                this.op2+=1/40;
                                this.op3-=1/40;
                                this.op4+=1/40;
                            }, 100);
                        });
                    }else if(this.radioNum1==4){
                        this.imgLG(()=> {
                            var i = 0;
                            this.SET = setInterval(() => {
                                i++;
                                if (i > 20) {
                                    clearInterval(this.SET);
                                    this.played = true;
                                    return;
                                }
                                this.sbh++;
                                this.ldh -= 2;
                                this.op1-=1/40;
                                this.op2+=1/40;
                                this.op3-=1/80;
                            }, 200);
                        });
                    }
                }else if(this.radioNum2==2){
                    if(this.radioNum1==1){
                        this.imgLG(()=>{
                            var i=0;
                            this.SET=setInterval(()=>{
                                i++;
                                if(i>40){
                                    clearInterval(this.SET);
                                    this.played=true;
                                    return;
                                }
                                this.op1-=1/40;
                                this.op2+=1/40;
                                this.op3-=1/40;
                                this.op4+=1/40;
                            },100);
                        });
                    }else if(this.radioNum1==2){
                        this.imgLG(()=>{
                            var i=0;
                            this.SET=setInterval(()=>{
                                i++;
                                if(i>40){
                                    clearInterval(this.SET);
                                    this.played=true;
                                    return;
                                }
                            },100);
                        });
                    }else if(this.radioNum1==3){
                        this.imgLG(()=> {
                            var i = 0;
                            this.SET = setInterval(() => {
                                i++;
                                if (i > 40) {
                                    clearInterval(this.SET);
                                    this.played = true;
                                    return;
                                }
                                this.op1-=1/40;
                                this.op2+=1/40;
                                this.op3-=1/40;
                                this.op4+=1/40;
                            }, 100);
                        });
                    }else if(this.radioNum1==4){
                        this.imgLG(()=> {
                            var i = 0;
                            this.SET = setInterval(() => {
                                i++;
                                if (i > 20) {
                                    clearInterval(this.SET);
                                    this.played = true;
                                    return;
                                }
                                this.op1-=1/20;
                                this.op2+=1/20;
                                this.op3-=1/20;
                                this.op4+=1/20;
                            }, 200);
                        });
                    }
                }
            },
            //重置
            resetWidget(){
                clearInterval(this.SET);
                this.gif='';
                this.radio1=false;
                this.radio2=false;
                this.radio3=false;
                this.radio4=false;
                this.radio5=true;
                this.radio6=false;
                this.radioNum1=0;
                this.radioNum2=1;
                this.played=false
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
	.ui-label li{
		color:#000 !important;
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
      width: 2800px;
      height: 1680px;
      padding: 40px;
      position: relative;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,0.20);
      border-radius: 5px;
      background-origin: content-box;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
    .view_space>div{
        width:calc(100% - 80px);
        height: calc(100% - 80px);
        position: absolute;
        background-color: transparent;
        background-origin: content-box;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
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
        justify-content: center;
        flex-direction: column;
        overflow: hidden;
        overflow-y: auto;
    }
    .btn_space>div{
        width:240px;
        background: #FFFFFF;
        border: 0 solid rgba(0,0,0,0.06);
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08);
        border-radius: 6px;
    }
    .btn_space>div>p{
        height:16px;
        line-height: 16px;
        text-align: center;
        font-size: 14px;
        color: #4D4D4D;
        margin-top: 8px;
    }
    .radioG>div{
        width: 100%;
        /*height: 168px;*/
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        margin-top: 4px;
    }
    .radioG>div>div{
        width: 240px;
        height: 42px;
        line-height: 42px;
        cursor: pointer;
    }
    .radioG>div>div>p{
        display: inline-block;
        height: 42px;
        line-height: 42px;
        font-size: 14px;
        color: #1A1A1A;
        text-align: center;
        margin-left: 12px;
    }
    .radioG>div>div span {
        display: inline-block;
        width: 24px;
        height: 24px;
        background-color: #f0f0f0;
        border-radius: 50%;
        float: left;
        transition: all 0.2s;
        margin: 9px 0 0 14px;
    }
    .radioG>div>div.checked span{
        background-color: #5caefd;
    }
    .radioG>div>div.checked p{
        color:#000;
    }
    .radioG>div>div span em {
        transition: all 0.1s 0.2s;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: block;
        margin: 7px auto;
    }
    .radioG>div>div.checked span em {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fff;
        display: block;
        margin: 7px auto;
    }
</style>
