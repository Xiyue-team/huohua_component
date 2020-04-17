<template>
    <div id="app" class="noselect">
        <!--<audio id="voice" src="static/UI/sy.mp3" controls="controls" loop="loop" :style="'pointer-events:none;opacity:0;position:absolute;top:0px;z-index:99;'"></audio>-->
        <!--头部-->
        <h3 v-html="title" class="app_title"></h3>
        <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
        <div class="container" :style="'height:'+H+'px'">
            <!--视图区-->
            <div class="View" :style="'width:'+VW+'px;height:'+VH+'px'">
                <div class="ViewSpace" :style="'transform: scale('+zoomF+')'">
                    <img src="static/UI/1.png" draggable="false" style="pointer-events:none;width:386px;height:359px;z-index:3;">
                    <img src="static/UI/2.png" draggable="false" style="pointer-events:none;width:176px;height:43px;left:386px;top:300px;z-index:2;" >
                    <img :src="src" draggable="false" style="pointer-events:none;width:auto;height:98px;left:226px;top:67px;z-index:1;" >
                    <img src="static/UI/ts.png" v-show="!draged" draggable="false" style="pointer-events:none;width:auto;height:40px;left:507px;top:257px;z-index:1;">
                    <ui-slider v-if="zoomF"
                       :min="0"
                       :max="120"
                       v-model="value"
                       :zoom="zoomF"
                       :noBlueProcess="true"
                       :clickable="false"
                       :speed="0"
                       :style="'position: absolute;top:213px;right:35px;z-index:1;'"></ui-slider>
                    <h3>空气含量：{{Math.floor((120-value)/1.2)}}%</h3>
                </div>
            </div>
        </div>
        <ui-btn type="switch" v-model="switch_checked" @click.native="checked" :style="'position:absolute;right:24px;bottom:20px;width:120px;'">响铃</ui-btn>
    </div>
</template>
<script type="text/javascript">
    import uiBtn from '@/components/UI/uiBtn'; //按钮
    import uiSlider from '@/components/UI/uiSlider'; //按钮
    import buzz from 'buzz';
    var sounds = [
        new buzz.sound("static/sounds/1L.mp3", {preload: true, loop: true}),
        new buzz.sound("static/sounds/2L.mp3", {preload: true, loop: true}),
        new buzz.sound("static/sounds/3L.mp3", {preload: true, loop: true}),
        new buzz.sound("static/sounds/4L.mp3", {preload: true, loop: true}),
        new buzz.sound("static/sounds/5L.mp3", {preload: true, loop: true}),
        new buzz.sound("static/sounds/6L.mp3", {preload: true, loop: true}),
        new buzz.sound("static/sounds/7L.mp3", {preload: true, loop: true}),
        new buzz.sound("static/sounds/8L.mp3", {preload: true, loop: true}),
        new buzz.sound("static/sounds/9L.mp3", {preload: true, loop: true}),
        new buzz.sound("static/sounds/10L.mp3", {preload: true, loop: true}),
        new buzz.sound("static/sounds/11L.mp3", {preload: true, loop: true}),
        new buzz.sound("static/sounds/12L.mp3", {preload: true, loop: true})];
    var floor = sounds.length, playing = false;
    // Loop重播时,结尾跳到开头有顿挫声,将各个音轨起始点交错排布,以使接缝不易察觉。
    for (var ci in sounds) {
        sounds[ci].setTime(0.5 * ci + 1);
        sounds[ci].mute();
        sounds[ci].play();
    }
    export default {
        name: 'app',
        components: {
            uiBtn,
            uiSlider
        },
        data() {
            return {
                title: '声音的传播',
                H:window.innerHeight-72,
                VW:0,
                VH:0,
                zoomF:0,
                value:0,
                src:'static/UI/3.png',
                switch_checked:false,
                draged:false
            }
        },
        created() {
            document.title = this.title;
        },
        mounted() {
            this.getViewSize();
            window.addEventListener('resize', () => {
                this.getViewSize();
            })
        },
        computed: {},
        watch: {
            value(v){
                if(!this.draged && v!=0){
                    this.draged=true;
                }
                if(v!=12){
                    floor=Math.floor((120-v)/10)+1;
                    if(this.switch_checked){
                        this.volume();
                    }
                }else{
                    this.pauseAll();
                }
            },
        },
        methods: {
            checked(){
                var v=this.switch_checked;
                if(v){
                    this.src='static/UI/3.gif';
                    this.playAll();
                }else{
                    this.src='static/UI/3.png';
                    this.pauseAll();
                }
            },
            playAll() {
                playing = true;
                // 传入指令音轨层号,层号越高音量越高
                for (var i = sounds.length; i > 0; i--) { // 1 - 12
                    if (i > (floor - 12) && i <= floor) {
                        sounds[i - 1].unmute();
                    } else {
                        sounds[i - 1].mute();
                    }
                }
            },
            pauseAll() {
                playing = false;
                // 传入指令音轨层号,层号越高音量越高
                for (var i in sounds) {
                    sounds[i].mute();
                }
            },
            volume() {
                if (floor > 12)floor = 12;
                if (floor < 0)floor = 0;
                this.playAll();
            },
            //计算区块大小
            getViewSize() {
                var W=window.innerWidth;
                var H=window.innerHeight-72;
                this.H=H;
                if(W/H>750/430){
                    this.VW=parseInt(750*H/430);
                    this.VH=H;
                    this.zoomF=(H/430).toFixed(2);
                }else{
                    this.VW=W;
                    this.VH=parseInt(430*W/750);
                    this.zoomF=(W/750).toFixed(2);
                }
            },
            //重置
            resetWidget() {
                this.switch_checked=false;
                this.value=0;
                this.pauseAll();
                this.src='static/UI/3.png';
                this.draged=false;
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
        width:750px;
        height: 430px;
        padding: 10px;
        transform-origin: top left;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
    }
    .ViewSpace>img{
        position:absolute;
    }
    .ViewSpace>h3{
        position: absolute;
        bottom:0;
        width: 230px;
        left:160px;
    }
</style>