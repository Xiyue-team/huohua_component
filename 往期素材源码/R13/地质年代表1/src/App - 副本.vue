<template>
    <div id="app" class="noselect">
        <!--头部-->
        <h3 v-html="title" class="app_title"></h3>
        <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
        <div class="container" :style="'height:'+H+'px'">
            <!--视图区-->
            <div class="View" :style="'width:'+VW+'px;height:'+VH+'px'" id="scaleWrap">
                <div class="ViewSpace" :style="'transform: scale('+zoomF+')'">
                    <div class="axis" >
                        <div class="slideWrap" v-show='slideToggle'> 
                             <ul class="slide clearfix">
                                <li v-for="item in slides">
                                    <img :src="item.img" alt="">
                                </li>
                            </ul>
                        </div>
                        <div class="mask" :style="'left:'+maskX+'px'"></div>
                        <img src="static/UI/left.png" draggable="false" class="leftAxis AxisItem">
                        <img src="static/UI/right.png" draggable="false" class="rightAxis AxisItem" :style="'left:'+leftX+'px'">
                        <img src="static/UI/bottom.png" draggable="false" class="book" :style="'width:'+leftW+'px'">
                        <div style="width:100%; height:8px; background-color:#fff; position:absolute; z-index:4; bottom:50px; left:-5px;"></div>
                        <!-- -->
                        <div class="bottomWrap">
                            <div class="text">
                                <p>距今年代</p>
                                <span>(Ma)</span>
                            </div>
                            <div class="timeAxis" :style="' width:703px;height:7px;position:relative;bottom:8px;background-image:url(./static/UI/start.png);'">
                                 <div :style="'width:'+value+'px;background-image:url(./static/UI/end.png);'"></div>
                            </div>
                             <ui-btn type="play" v-model="played" class="playBtn"></ui-btn>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import uiBtn from '@/components/UI/uiBtn'; //按钮
    import adaptive from '@/components/adaptive'
  
    export default {
        name: 'app',
        components: {
            uiBtn,
        },
        data() {
            return {
                title: '地质年代表_时间轴',
                H:window.innerHeight-72,
                played: true,
                VW:0,
                VH:0,
                zoomF:0,
                value:0,
                leftX:0,  
                leftW:62,  
                op:0,
                timer:null,
                timer1:null,
                timer2:null,
                toggle:false,
                ele:null,
                maskX:400,
                slideToggle:false,
                slides:[
                    {img:'static/img/1.jpg'},
                    {img:'static/img/2.jpg'},
                    {img:'static/img/3.jpg'},
                    {img:'static/img/4.jpg'},
                    {img:'static/img/5.jpg'},
                    {img:'static/img/6.jpg'},
                    {img:'static/img/7.jpg'},
                    {img:'static/img/8.jpg'},
                    {img:'static/img/9.jpg'},
                    {img:'static/img/10.jpg'},
                    {img:'static/img/11.jpg'},
                ]
            }
        },
        created() {
            document.title = this.title;
        },
        mounted() {
           
            this.getViewSize();
            window.addEventListener('resize', () => {
                this.getViewSize();
                 this.control();
            })
        },
        computed: {},
        watch: {
            played(){
                if(!this.played){   
                    let animate =() =>{
                         let stepX =(892-this.leftX)/80
                        let stepW =(956-this.leftW)/80;
                        let stepM =(920-this.maskX)/80;
                        stepX = stepX > 0 ? Math.ceil(stepX) : Math.floor(stepX);
                        stepW = stepW > 0 ? Math.ceil(stepW) : Math.floor(stepW);
                        stepM = stepM > 0 ? Math.ceil(stepM) : Math.floor(stepM);
                         if(this.leftX>=892 && this.leftW>=956){
                             clearTimeout(this.timer);
                             return;
                        }
                        if(this.leftX>=322){
                            this.slideToggle=true;
                            this.maskX = this.maskX + stepM;

                        }
                        this.leftX = this.leftX + stepX;
                        this.leftW = this.leftW + stepW;
                        this.timer=setTimeout(animate,80);
                    }
                    animate();
                    let axioAn =()=>{
                        if(this.value >=703){
                            clearTimeout(this.timer1);
                            return;
                        }
                        this.value++;
                        this.timer1 = setTimeout(axioAn,120);
                    };
                    axioAn();

                    let slideAn =()=>{
                       let oDiv = document.querySelector('.slideWrap');
                       let oUl = document.querySelector('.slide');
                       let aLi = document.querySelectorAll('li');
                       let speed =-3;
                       oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px'+170+'px';
                       
                       if(oUl.offsetLeft<=-5850){
                        clearTimeout(this.timer2);
                        return;
                       }
                        oUl.style.left = oUl.offsetLeft + speed + 'px';
                        // console.log(oUl.offsetLeft,-oUl.offsetWidth);
                        console.log(-oUl.offsetWidth);
                        this.timer2 = setTimeout(slideAn,30);
                    }
                    slideAn();
                }else{
                    clearTimeout(this.timer);
                    clearTimeout(this.timer1);
                    clearTimeout(this.timer2);
                }
            }
        },
        methods: {
            //计算区块大小
            getViewSize() {
                var W=window.innerWidth;
                var H=window.innerHeight-72;
                this.H=H;
                if(W/H>976/485){
                    this.VW=parseInt(976*H/485);
                    this.VH=H;
                    this.zoomF=(H/485).toFixed(2);
                }else{
                    this.VW=W;
                    this.VH=parseInt(485*W/976);
                    this.zoomF=(W/976).toFixed(2);
                }
            },
             control() {
                this.ele = document.querySelector("#scaleWrap");
                Transform(this.ele);
                adaptive.pageStyle(this.ele)
            },

            //重置
            resetWidget() {
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
        width:976px;
        height: 485px;
        padding: 10px;
        transform-origin: top left;
    }
     .ViewSpace>img{
        position:absolute;
        display: block;
        width: 100%;
        height: 100%;
    }
    .axis{
        position: relative;
        width: 100%;
        height: 100%;
        
    }
    .axis .book{
        position: absolute;
        display: block;
        height: 396px;
        top:16px;
        left: 0;
        z-index: 6;
        overflow: hidden;
    }
   
    .AxisItem{
        width: 64px;
        position:absolute;
        height: 414px;
        top: 0;
        z-index: 9;
    }
    .leftAxis{
        left: -1px;
    }

    .ViewSpace>h3{
        position: absolute;
        bottom:0;
        width: 230px;
        left:160px;
    }
    .bottomWrap{
        position: absolute;
        bottom: 0;
        left: 60px;
    }
    .bottomWrap > div{
        display: inline-block;

    }
    .text{
        width: 76px;
        height: 40px;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #000000;
        text-align: center;
    }
    .text p{
        line-height: 25px;
    }
    .text span{
        line-height: 12px;
    }
    .timeAxis,.timeAxis>div{
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-position: 0 0;
        background-origin: content-box;
    }
    .timeAxis>div{
        height: 100%;
        position: absolute;
        top:0;
        left: 0;
    }
    .playBtn{
        position: relative;
        right: -50px;
    }
    
    .slideWrap{
        position: relative;
        width: 99.8%;
        height: 338px;
        z-index: 7;
        top: 45px;
        overflow: hidden;
        
        
    }
    .slideWrap ul{
        width: 6781px !important;
        position: absolute;
        left: 0;
        top: 0;
        _height:1px;
        overflow: hidden;
    }
    .mask{
        width: 601px;
        height: 340px;
        background-color: #fff;
        position: absolute;
        z-index: 8;
        top: 45px;
        left: 400px;
    }
    .slide li{
        width: 601px;
        float: left;
    }
    .slide img{
        display: block; 
        width: 100%;
        height: 100%;
        transform: translateX(170px);
    }
    .clearfix { zoom:1; }
    .clearfix:after { content:''; display:block; clear:both; }
</style>