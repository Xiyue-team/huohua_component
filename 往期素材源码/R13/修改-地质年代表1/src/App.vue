<template>
    <div id="app" class="noselect"> 
        <div class="landscape-tip" v-if="!isLandscape">
            <div class="landscape-content"><img src="../static/UI/cover1.png" draggable="false">
            </div>
        </div>
        <transition name="fade">
            <div class="mobile-tip" v-if="hiddenMobTip">建议您在电脑或平板上打开，以获取最佳的演示效果</div>
        </transition>
        <!--头部-->
        <h3 v-html="title" class="app_title"></h3>
        <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
        <div class="container" :style="'height:'+H+'px'">
            <!--视图区-->
            <div class="View" :style="'width:'+VW+'px;height:'+VH+'px'" id="scaleWrap">
                <div class="ViewSpace" :style="'transform: scale('+zoomF+')'">

                    <div class="axis" >
                        <div class="slideWrap"> 
                           <ul class="slide clearfix">
                            <li v-for="item in slides">
                                <img :src="item.img" draggable="false">
                            </li>
                        </ul>
                    </div>
                    <div class="mask" :style="'left:'+maskLeft+'px'"></div>
                    <img src="static/UI/left.png" draggable="false" class="leftAxis AxisItem">
                    <img src="static/UI/right.png" draggable="false" class="rightAxis AxisItem" :style="'left:'+axisLeft+'px'">
                    <img src="static/UI/bottom.png" draggable="false" class="book">
                    <!-- <div class="bottomWrap">
                        <div class="text">
                            <p>距今年代</p>
                            <span>(Ma)</span>
                        </div>
                        <div class="timeAxis" :style="' width:615px;height:8px;position:relative;top:15px;background-image:url(./static/UI/start.png);'">
                             <div :style="'width:'+value+'px;background-image:url(./static/UI/end.png);'"></div>
                        </div>
                        <ui-btn type="play" v-model="played" class="playBtn"></ui-btn>
                    </div> -->
                    <div class="bottomWrap">
                        <div class="timeAxis" :style="' width:710px;height:47px;position:relative;top:15px;background-image:url(./static/UI/timeAxis.png);'">
                            <ui-slider ref="test" class="footerSlider" :zoom="zoomF"  :speed="0" :box="false" :boxWidth="710"  :boxHeight="0" :title="false" :tooltip="false" :noBlueProcess="true" :dragable="mark1" :min="0" :max="710" :clickable="mark2" v-model='value'>
                            </ui-slider>
                        </div>
                        <ui-btn type="play" v-model="played" class="playBtn"></ui-btn>
                        <div id="picture" class="prompt_picture" v-show="show" :style="'background-image:url(./static/UI/'+number+'.png);'">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
</div>
</template>
<script type="text/javascript">
    import uiBtn from '@/components/UI/uiBtn'; //按钮
    import uiSlider from '@/components/UI/uiSlider';//滑条
    export default {
        name: 'app',
        components: {
            uiBtn, uiSlider
        },
        data() {
            return {
                title: '地质年代表_时间轴',
                H:window.innerHeight-72,
                VW:0,
                VH:0,
                zoomF:0,
                played: true,
                value:0,
                show:false,
                mark1:false,
                mark2:false,
                number:1,
                axisLeft:0,   
                maskLeft:37,
                timer:null,
                timer1:null,
                timer2:null,
                isLandscape: true,
                hiddenMobTip: false,
                sliderPoint: [0, 39, 89, 130],
                index: 0,
                slides:[
                {img:'static/img/1.png'},
                {img:'static/img/2.png'},
                {img:'static/img/3.png'},
                {img:'static/img/4.png'},
                {img:'static/img/5.png'},
                {img:'static/img/6.png'},
                {img:'static/img/7.png'},
                {img:'static/img/8.png'},
                {img:'static/img/9.png'},
                {img:'static/img/10.png'},
                {img:'static/img/11.png'},
                ]
            }
        },
        created() {
            document.title = this.title;
        },
        mounted() {    
            if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                var mql = window.matchMedia("(orientation: portrait)");

                var onMatchMeidaChange = (mql) => {
                    clearTimeout(this.tipTimer);
                    if (mql.matches) {
                    // 竖屏
                    this.isLandscape = false;
                } else {
                    this.isLandscape = true;
                    if (window.innerWidth < 500 || window.innerHeight < 500) {
                        this.hiddenMobTip = true;
                        this.tipTimer = setTimeout(() => {
                            this.hiddenMobTip = false;
                        }, 3000)
                    }
                }
            };
            onMatchMeidaChange(mql);
            mql.addListener(onMatchMeidaChange);
        } else {}
        this.getViewSize();
        window.addEventListener('resize', () => {
            this.getViewSize();
        })
        // 刷新滑条与鼠标位置
        setTimeout(() => {
            this.$refs.test.refresh();
        }, 50)
    },
    computed: {},
    watch: {
        // 添加滑条位置实时显示对应的图片内容的监听事件
        value(v){
            // let num = - v / 0.125;
            // this.oUl.style.left = num + 'px';
            if(v >= 0 && v <= 120){
                this.oUl.style.left = - v / 0.21 + 'px';
                this.show = false;
            }else if(v > 120 && v <= 220){
                this.oUl.style.left = - 570 - (v - 120) / 0.1653 + 'px';
                this.show = false;
            }else if(v > 220 && v <= 265){
                this.oUl.style.left = - 1175 - (v - 220) / 0.075 + 'px';
                this.number = 1;
                $('#picture').css('left', '190px');
                this.show = true;
            }else if(v > 265 && v <= 317){
                this.oUl.style.left = - 1775 - (v - 265) / 0.0867 + 'px';
                this.show = false;
            }else if(v > 317 && v <= 360){
                this.oUl.style.left = - 2375 - (v - 317) / 0.0717 + 'px';
                this.number = 2;
                $('#picture').css('left', '300px');
                this.show = true;
            }else if(v > 360 && v <= 432){
                this.oUl.style.left = - 2975 - (v - 360) / 0.12 + 'px';
                this.show = false;
            }else if(v > 432 && v <= 516){
                this.oUl.style.left = - 3575 - (v - 432) / 0.14 + 'px';
                this.number = 3;
                $('#picture').css('left', '445px');
                this.show = true;
            }else if(v > 516 && v <= 570){
                this.oUl.style.left = - 4175 - (v - 516) / 0.09 + 'px';
                this.number = 4;
                $('#picture').css('left', '520px');
                this.show = true;
            }else if(v > 570 && v <= 610){
                this.oUl.style.left = - 4775 - (v - 570) / 0.066 + 'px';
                this.number = 5;
                $('#picture').css('left', '560px');
                this.show = true;
            }else if(v > 610 && v <= 650){
                this.oUl.style.left = - 5380 - (v - 610) / 0.3333 + 'px';
                this.number = 6;
                $('#picture').css('left', '600px');
                this.show = true;
            }else if(v > 650 && v <= 710){
                this.oUl.style.left = - 5500 - (v - 650) / 0.3333 + 'px';
                this.number = 7;
                $('#picture').css('left', '660px');
                this.show = true;
            }else{
                this.show = false;
            }
        },
        played(){
            if(!this.played){    
                clearInterval(this.timer);
                this.timer=setInterval(()=>{
                    let stepAxis =(892-this.axisLeft)/50;
                    let stepMask =(930-this.maskLeft)/50;
                    stepAxis = stepAxis > 0 ? Math.ceil(stepAxis) : Math.floor(stepAxis);
                    stepMask = stepMask > 0 ? Math.ceil(stepMask) : Math.floor(stepMask);
                    if(this.axisLeft>=892 && this.maskLeft>=930){
                        slideAn();
                        axioAn();
                        clearInterval(this.timer);
                        return;
                    }
                    this.axisLeft = this.axisLeft + stepAxis;
                    this.maskLeft = this.maskLeft + stepMask;
                },60);
                let slideAn=()=>{
                    let oDiv = document.querySelector('.slideWrap');
                    this.oUl = document.querySelector('.slide');
                    let aLi = document.querySelectorAll('li');
                    let speed =-1;
                    speed=speed > 0 ? Math.ceil(speed) : speed;

                    this.oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px'+170+'px';
                    if( this.oUl.offsetLeft<=-5680){
                        window.cancelAnimationFrame(this.timer1);
                        return;
                    }
                    this.oUl.style.left = this.oUl.offsetLeft + speed + 'px';
                    this.timer1 = window.requestAnimationFrame(slideAn);
                };

                let axioAn=()=>{
                    this.mark1 = true;
                    this.mark2 = true;
                    if(this.value >=710){
                        this.value=710;
                        this.played=true;
                        window.cancelAnimationFrame(this.timer2);
                        return;
                    }
                        // this.value+=0.108;
                    // this.value+=0.125;
                    // 判断不同的年代期间设定不同的滑动条的滑动速度；
                    if(this.value >= 0 && this.value <= 120){
                        this.value+=0.21;
                    }else if(this.value > 120 && this.value <= 220){
                        this.value+=0.1653;
                    }else if(this.value > 220 && this.value <= 265){
                        this.value+=0.075;
                    }else if(this.value > 265 && this.value <= 317){
                        this.value+=0.0867;
                    }else if(this.value > 317 && this.value <= 360){
                        this.value+=0.0717;
                    }else if(this.value > 360 && this.value <= 432){
                        this.value+=0.12;
                    }else if(this.value > 432 && this.value <= 516){
                        this.value+=0.14;
                    }else if(this.value > 516 && this.value <= 570){
                        this.value+=0.09;
                    }else if(this.value > 570 && this.value <= 610){
                        this.value+=0.066;
                    }else if(this.value > 610 && this.value <= 710){
                        this.value+=0.3333;
                    }

                    this.timer2 = window.requestAnimationFrame(axioAn);
                    };
                    }else{
                        clearInterval(this.timer);
                        window.cancelAnimationFrame(this.timer1);
                        window.cancelAnimationFrame(this.timer2);
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
            //重置
            resetWidget() {
                this.played=true;
                this.mark1 = false;
                this.mark2 = false;
                clearInterval(this.timer);
                window.cancelAnimationFrame(this.timer1);
                window.cancelAnimationFrame(this.timer2);
                this.value=0;
                this.axisLeft=0;
                // this.oUl.style.left = 0;
                this.maskLeft=37;

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
    /*height: 510px;*/
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
    width: 100%;
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
    bottom: 0px;
    left: 115px;
}
.bottomWrap > div{
    display: inline-block;
}
.prompt_picture {
    top:-20px;
    z-index: 10;
    width:80px;
    height:50px;
    position:absolute;
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-origin: content-box;
}
#picture{ 
    left: 200px;
}
/*.text{
    width: 76px;
    height: 40px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #000000;
    text-align: center;
    }*/
/*.text p{
    line-height: 25px;
}
.text span{
    line-height: 12px;
    }*/
    .timeAxis,.timeAxis>div{
        background-size: 100% auto;
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
        right: -70px;
    }

    .slideWrap{
        position: relative;
        width: 100%;
        height: 338px;
        z-index: 7;
        top: 45px;
        overflow: hidden;
        left: 0;    

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
        width: 920px;
        height: 415px;
        background-color: #fff;
        position: absolute;
        z-index: 8;
        top: 0;
    }
    .slide li{
        width: 601px;
        float: left;
    }
    .slide img{
        pointer-events: none;
        display: block; 
        width: 100%;
        height: 100%;    
    }
    .clearfix { zoom:1; }
    .clearfix:after { content:''; display:block; clear:both; }

    .landscape-tip {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #fff;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .landscape-content {
        width: 80%;
        padding: 32px;
        text-align: center;
        border: 1px solid rgba(0, 0, 0, 0.06);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.09);
        border-radius: 12px;
    }

    .landscape-content img {
        width: 100%;
        height: auto;
    }

    .landscape-content p {
        margin-top: 10px;   
        height: 45px;
        font-size: 0.05rem;
    }

    .mobile-tip {
        position: fixed;
        left: 0;
        top: 24px;
        right: 0;
        margin: 0 auto;
        width: 80%;
        padding: 0 24px;
        line-height: 48px;
        background: #fff;
        border: 1px solid rgba(0, 0, 0, 0.06);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.09);
        border-radius: 100px;
        z-index: 100;
        text-align: center;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: all .5s;
    }

    .fade-enter,
    .fade-leave-to
    /* .fade-leave-active below version 2.1.8 */

    {
        transform: translateY(-30px);
        opacity: 0;
    }

    .footerSlider {
        position: absolute !important;
        bottom: 10px !important;
        left: 0px !important;
        padding: 0 !important;
    /*z-index: 93;
    /*margin: 0 30px;*/
    /*font-size: 16px;*/
}

</style>