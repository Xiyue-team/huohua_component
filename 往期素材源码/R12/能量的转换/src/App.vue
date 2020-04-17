<template>
    <div id="app" class="noselect">
        <!--头部-->
        <h3 v-html="title" class="app_title"></h3>
        <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
        <div class="container" :style="'height:'+H+'px'">
            <!--视图区-->
            <div class="View" :style="'width:'+VW+'px;height:'+VH+'px'">
                <div class="ViewSpace" :style="'transform: scale('+zoomF+')'">
                    <div id="btn" v-show="!clickF" @click="animatePlay"></div>
                    <img id="ts" v-show="!clickF" src="static/UI/ts.png">
                    <img id="view" :src="src">
                    <div id="bg">
                        <img src="static/UI/bg.png">
                        <div style="position: absolute;z-index:1;top:10px;left:30px;background: #fff;width:70px;height:100px;"></div>
                        <div id="line" v-show="DNF">
                            <div :style="'height:'+H1+'px;background:#ffda66;'"></div>
                            <div :style="'height:'+H2+'px;background:#f4b183;'"></div>
                        </div>
                    </div>
                    <ui-btn type="play" v-show="!isEnd" v-model="played" :style="'position:absolute;right:20px;bottom:20px;'"></ui-btn>
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
                title: '能量的转换',
                H:0,
                VW:0,
                VH:0,
                zoomF:1,
                src:'static/img/1.png',
                clickF:false,
                SET:null,
                H1:0,
                H2:0,
                DNF:false,
                time:200,
                played:true,
                iNum:1,
                isEnd:true
            }
        },
        created() {
            document.title = this.title;
        },
        mounted() {
            this.getViewSize();
            var userA=navigator.userAgent;
            this.time=(userA.includes('HUAWEIM2') || userA.includes('HUAWEI M2'))?180:200
            window.addEventListener('resize', () => {
                this.getViewSize();
            })
        },
        computed: {},
        watch: {
            played(v){
                if(v&&this.clickF){
                    this.animatePlay();
                }

            }
        },
        methods: {
            //计算区块大小
            getViewSize() {
                var W=window.innerWidth;
                var H=window.innerHeight-72;
                this.H=H;
                if(W/H>1016/450){
                    this.VW=parseInt(1016*H/450);
                    this.VH=H;
                    this.zoomF=(H-40)/410;
                }else{
                    this.VW=W;
                    this.VH=parseInt(450*W/1016);
                    this.zoomF=(W-40)/976;
                }
            },
            animatePlay(){
                this.clickF=true;
                this.isEnd=false;
                var i=this.iNum;
                var an=()=>{
                    this.iNum=i;
                    this.SET=setTimeout(()=>{
                        if(i>=57){
                            this.isEnd=true;
                        }
                        if(i>=57 || !this.clickF || !this.played){
                            clearTimeout(this.SET);
                            this.SET=null;
                            return;
                        }
                        i++;
                        if(i>40){
                           var src='static/img/'+(80-i)+'.png';
                        }else{
                           var src='static/img/'+i+'.png';
                        }
                        this.imgLoad(src,()=>{
                            if(i>4&&i<=14){
                                this.DNF=true;
                                this.H1+=8;
                            }else if(i>14&&i<=22){
                                this.H1-=10;
                            }else if(i>22&&i<=40){
                                this.H2+=40/9;
                            }else if(i>40&&i<=57){
                                this.H2-=80/17;
                            }
                            this.clickF && an();
                        });
                    },this.time);
                }
                an();
            },
            imgLoad(src,callback){
                var img=new Image();
                img.onload=()=>{
                    if(this.clickF)this.src=img.src;
                    callback && callback();
                }
                img.src=src;
            },
            //重置
            resetWidget() {
                clearTimeout(this.SET);
                this.SET=null;
                this.iNum=1;
                this.src='static/img/1.png';
                this.clickF=false;
                this.isEnd=true;
                this.played=true;
                this.H1=0;
                this.H2=0;
                this.DNF=false;
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
        background-position: center bottom;
        background-repeat: no-repeat;
        background-size: cover;
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
        padding:20px;
        margin: auto;
    }
    .ViewSpace{
        width:976px;
        height: 410px;
        padding: 10px;
        transform-origin: top left;
        background: #FFFFFF;
        border: 1px solid rgba(121,121,121,0.27);
        box-shadow: 0 1px 3px 0 rgba(168,168,168,0.60);
        border-radius: 6px;
    }
    .ViewSpace>img#view{
        width: 100%;
        height:100%;
    }
    .ViewSpace>img#ts{
        width: 89px;
        height:38px;
        position: absolute;
        top:45px;
        left:60px;
    }
    #btn{
        width: 70px;
        height: 70px;
        position: absolute;
        top:70px;
        left:70px;
        border-radius: 10px;
        cursor: pointer;
    }
    #bg{
        width:158px;
        height:128px;
        position: absolute;
        right:8%;
        top:50%;
        transform: translateY(-50%)  scale(1.8);
        /*right:35px;*/
        /*bottom:31px;*/
    }
    #bg>img{
        width: 158px;
        height: 128px;
        position: absolute;
        z-index: 3;
    }
    #line{
        width: 25px;
        height: 80px;
        position:absolute;
        bottom:20px;
        left:48px;
        z-index: 2;
        background: #5b9bd5;
        border: 0;
    }
    #line>div{
        width: 100%;
    }
</style>