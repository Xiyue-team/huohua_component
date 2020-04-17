<template>
    <div id="app" class="noselect">
        <div class="container" :style="bg">
            <!--头部-->
            <h3 v-html="title" class="app_title"></h3>
            <!--视图区-->
            <div class="ViewSpace">
                <div class="viewBox" :style='[zoom]'>
                    <div class="tableDiv">
                        <div class="tableLeft">
                            <span style="color:#a1cdff;font-size: 12px;height:48px;width: 100%;display: block;line-height: 48px;border-bottom: 1px solid #68707a;">
                                第一个字母
                            </span>
                            <span style="font-size: 16px;height:96px;width: 100%;display: block;line-height: 96px;border-bottom: 1px solid #68707a;" v-bind:class="{ 'bgActive':rows != -1 && rows/4 <= 1 }">
                                U
                            </span>
                            <span style="font-size: 16px;height:96px;width: 100%;display: block;line-height: 96px;border-bottom: 1px solid #68707a;" v-bind:class="{ 'bgActive': rows/4 <= 2 && rows/4 > 1 }">
                                C
                            </span>
                            <span style="font-size: 16px;height:96px;width: 100%;display: block;line-height: 96px;border-bottom: 1px solid #68707a;" v-bind:class="{ 'bgActive': rows/4 <= 3 && rows/4 > 2}">
                                A
                            </span>
                            <span style="font-size: 16px;height:96px;width: 100%;display: block;line-height: 96px" v-bind:class="{ 'bgActive': rows/4 <= 4 && rows/4 > 3}">
                                G
                            </span>
                        </div>
                        <div class="tableTop">
                            <span style="width: 399px;display: block;height: 24px;border-bottom: 1px solid #68707a;font-size: 12px;color:#a1cdff">第二个字母</span>
                            <span style="width: 100px;height: 24px;line-height: 24px;float: left;display: block;border-right: 1px solid #68707a;" v-bind:class="{'bgActive': 0== columns}">U</span>
                            <span style="width: 99px;height: 24px;line-height: 24px;float: left;display: block;border-right: 1px solid #68707a;" v-bind:class="{'bgActive':1== columns}">C</span>
                            <span style="width: 99px;height: 24px;line-height: 24px;float: left;display: block;border-right: 1px solid #68707a;"v-bind:class="{'bgActive': 2== columns}">A</span>
                            <span style="width: 99px;height: 24px;line-height: 24px;float: left;display: block;" v-bind:class="{'bgActive':3== columns}">G</span>
                        </div>
                        <div class="tableRight">
                            <span style="color:#a1cdff;font-size: 12px;height:48px;width: 100%;display: block;line-height: 48px;border-bottom: 1px solid #68707a;">
                                第三个字母
                            </span>
                            <span style="font-size: 16px;height:24px;width: 100%;display: block;line-height: 24px;border-bottom: 1px solid #68707a;" v-for="(item,index) in arr1" v-bind:class="{ 'bgActive': rows-1 == index }">
                                {{item}}
                            </span>
                            <span style="font-size: 16px;height:24px;width: 100%;display: block;line-height: 24px;" v-bind:class="{ 'bgActive': rows-1 == 15 }">
                                G
                            </span>
                        </div>
                        <div class="tableMid">
                            <div v-for="(item,index) in arr">
                                <span v-for="(i,index1) in item" @click="getSpan(index,index1,i)" :style="rows == index && columns == index1?spanBg:''">{{i}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="resultDiv">
                        <img :src="resultBg" alt="" class="resultBg">
                        <img :src="blueBg" alt="" class="blueBg">
                        <div class="base" v-if="result.length != 0">
                            <span :style="result1[0]?'backgroundImage:url(static/UI/' + result1[0] + '1.png)':''">{{result1[0]}}</span>
                            <span :style="result1[1]?'backgroundImage:url(static/UI/' + result1[1] + '1.png)':''">{{result1[1]}}</span>
                            <span :style="result1[2]?'backgroundImage:url(static/UI/' + result1[2] + '1.png)':''">{{result1[2]}}</span>
                            <span :style="result[0]?'backgroundImage:url(static/UI/' + result[0] + '.png)':''">{{result[0]}}</span>
                            <span :style="result[1]?'backgroundImage:url(static/UI/' + result[1] + '.png)':''">{{result[1]}}</span>
                            <span :style="result[2]?'backgroundImage:url(static/UI/' + result[2] + '.png)':''">{{result[2]}}</span>
                        </div>
                        <div class="base1" v-if="result.length == 0">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <span>mRNA</span>
                        <div class="tRNAIMG" :style="tRNAIMG" v-if="!end" v-bind:class="{'three':threeTrue,'four':!threeTrue}">
                            <p>{{acid}}</p>
                        </div>
                        <div class="tRNA" :style="tRNA" v-if="!end">
                            <span>tRNA</span>
                        </div>
                        <div class="endDiv" v-if="end" :style="endDiv"></div>
                    </div>
                </div>
            </div>
        </div>
        <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget" id="button0"></ui-btn>
    </div>
</template>
<script type="text/javascript">
    import uiBtn from '@/components/UI/uiBtn'; //按钮
    export default {
        name: 'app',
        components: {
            uiBtn,
        },
        data() {
            return {
                title: '密码子表',
                zoom: {}, //区域大小
                bg: {
                    backgroundImage: 'url(static/UI/bg.png)'
                },
                tRNAIMG: {
                    backgroundImage: 'url(static/UI/yellow.png)'
                },
                spanBg:{
                    backgroundImage: 'url(static/UI/spanBg.png)',
                    color:'#fff'
                },
                resultBg: 'static/UI/1.png',
                blueBg: 'static/UI/blue.png',
                result: [],
                result1: [],
                tRNA: {
                    backgroundImage: 'url(static/UI/tRNA.png)'
                },
                endDiv: {
                    backgroundImage: 'url(static/UI/2.png)'
                },
                acid:'',
                end:false,
                threeTrue:false,
                arr1:['U','C','A','G','U','C','A','G','U','C','A','G','U','C','A'],
                arr: {
                    1:['苯丙氨酸', '丝氨酸', '酪氨酸', '半胱氨酸'],
                    2:['苯丙氨酸', '丝氨酸', '酪氨酸', '半胱氨酸'],
                    3:['亮氨酸', '丝氨酸', '终止', '终止'],
                    4:['亮氨酸', '丝氨酸', '终止', '色氨酸'],
                    5:['亮氨酸', '脯氨酸', '组氨酸', '精氨酸'],
                    6:['亮氨酸', '脯氨酸', '组氨酸', '精氨酸'],
                    7:['亮氨酸', '脯氨酸', '谷氨酰胺', '精氨酸'],
                    8:['亮氨酸', '脯氨酸', '谷氨酰胺', '精氨酸'],
                    9:['异亮氨酸', '苏氨酸', '天冬酰胺', '丝氨酸'],
                    10:['异亮氨酸', '苏氨酸', '天冬酰胺', '丝氨酸'],
                    11:['异亮氨酸', '苏氨酸', '赖氨酸', '精氨酸'],
                    12:['甲硫氨酸(起始)', '苏氨酸', '赖氨酸', '精氨酸'],
                    13:['缬氨酸', '丙氨酸', '天冬氨酸', '甘氨酸'],
                    14:['缬氨酸', '丙氨酸', '天冬氨酸', '甘氨酸'],
                    15:['缬氨酸', '丙氨酸', '谷氨酸', '甘氨酸'],
                    16:['缬氨酸(起始)', '丙氨酸', '谷氨酸', '甘氨酸'],
                },
                rows:-1,
                columns:-1,
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
        watch: {},
        methods: {
            getSpan(index,index1,value){
                this.rows = index;
                this.columns = index1;
                //密码子
                if(index/4 <= 1){
                    this.result[0] = 'U';
                }else if(index/4 > 1 && index/4 <= 2){
                    this.result[0] = 'C';
                }else if(index/4 > 2 && index/4 <= 3){
                    this.result[0] = 'A';
                }else if(index/4 > 3 && index/4 <= 4){
                    this.result[0] = 'G';
                }
                if(index1 == 0){
                    this.result[1] = 'U';
                }else if(index1 == 1){
                    this.result[1] = 'C';
                }else if(index1 == 2){
                    this.result[1] = 'A';
                }else if(index1 == 3){
                    this.result[1] = 'G';
                }
                if(index%4 == 1){
                    this.result[2] = 'U';
                }else if(index%4 == 2){
                    this.result[2] = 'C';
                }else if(index%4 == 3){
                    this.result[2] = 'A';
                }else if(index%4 == 0){
                    this.result[2] = 'G';
                }
                if(value === '终止'){
                    this.end = true;
                    this.result1 = [];
                    return;
                }else {
                    this.end = false;
                }
                this.acid = value;
                if(value === '甲硫氨酸(起始)'){
                    this.acid = '甲硫氨酸';
                }else if(value === '缬氨酸(起始)'){
                    this.acid = '缬氨酸';
                }
                if(this.acid.length == 3){
                    this.threeTrue = true;
                }else if(this.acid.length == 4){
                    this.threeTrue = false;
                }
                //反密码子
                if (this.result[0] === 'A') {
                    this.result1[0] = 'U';
                } else if (this.result[0] === 'U') {
                    this.result1[0] = 'A';
                } else if (this.result[0] === 'C') {
                    this.result1[0] = 'G';
                } else if (this.result[0] === 'G') {
                    this.result1[0] = 'C';
                }
                if (this.result[1] === 'A') {
                    this.result1[1] = 'U';
                } else if (this.result[1] === 'U') {
                    this.result1[1] = 'A';
                } else if (this.result[1] === 'C') {
                    this.result1[1] = 'G';
                } else if (this.result[1] === 'G') {
                    this.result1[1] = 'C';
                }
                if (this.result[2] === 'A') {
                    this.result1[2] = 'U';
                } else if (this.result[2] === 'U') {
                    this.result1[2] = 'A';
                } else if (this.result[2] === 'C') {
                    this.result1[2] = 'G';
                } else if (this.result[2] === 'G') {
                    this.result1[2] = 'C';
                }
            },
            //计算区块大小
            getViewSize() {
                const W = window.innerWidth - 48;
                const H = window.innerHeight - 72;
                if (W / H >= 965 / 432) {
                    this.zoom = {
                        zoom: H / 432
                    }
                } else {
                    this.zoom = {
                        zoom: W / 965
                    }
                }
            },
            //重置
            resetWidget() {
                this.rows=-1;
                this.columns=-1;
                this.result=[];
                this.result1=[];
                this.acid='';
                this.end=false;
                this.threeTrue=false;
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

    .container {
        width: 100%;
        float: left;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .container h3 {
        font-size: 24px;
        color: #000;
        line-height: 1.0;
        padding: 24px;
        font-weight: normal;
    }

    .aside_reset {
        margin: 20px 24px;
        float: right;
    }

    #button0 {
        position: fixed;
        right: 0;
        top: 0;
    }

    .ViewSpace {
        width: calc(100% - 48px);
        margin: 0 24px;
        height: calc(100% - 72px);
        position: relative;
    }

    .ViewSpace .viewBox {
        width: 965px;
        height: 462px;
        padding: 10px 0;
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        margin: auto;
    }

    .tableDiv {
        width: 600px;
        height: 432px;
        position: relative;
        float: left;
        background-image: -webkit-linear-gradient(-59deg, #485563 0%, #29323C 100%);
        background-image: linear-gradient(-59deg, #485563 0%, #29323C 100%);
        border-radius: 6px;
        -moz-box-shadow:2px 20px 80px #000;
        -webkit-box-shadow:2px 20px 80px #000;
        box-shadow:2px 20px 80px #000;
    }

    .resultDiv {
        width: 344px;
        height: 432px;
        position: relative;
        float: right;
        border-radius: 5px;
        background-image: -webkit-linear-gradient(to top, #2a333d, #3e4a57);
        background-image: linear-gradient(to top, #2a333d, #3e4a57);
        overflow: hidden;
        -moz-box-shadow:2px 20px 80px #000;
        -webkit-box-shadow:2px 20px 80px #000;
        box-shadow:2px 20px 80px #000;
    }

    .resultBg {
        position: absolute;
        bottom: 20px;
        width: 344px;
        height: 168px;
    }

    .blueBg {
        position: absolute;
        bottom: 8px;
        width: 370px;
        height: 24px;
        z-index: 1;
        left: -13px;
    }

    .base {
        width: 78px;
        height: 64px;
        position: absolute;
        bottom: 29px;
        z-index: 2;
        left: 128px;
    }
    .base1 {
        width: 100px;
        height: 69px;
        position: absolute;
        bottom: 29px;
        z-index: 2;
        left: 128px;
    }

    .base span {
        height: 38px;
        float: left;
        width: 18px;
        background-image: -webkit-linear-gradient(to top, #fff, #8f8f8f);
        background-image: linear-gradient(to top, #fff, #8f8f8f);
        margin-right: 12px;
        color: #ffffff;
        font-size: 18px;
        text-align: center;
        line-height: 35px;
    }
    .base1 span {
        height: 38px;
        float: left;
        width: 18px;
        background-image: -webkit-linear-gradient(to top, #2a333d, #3e4a57);
        background-image: linear-gradient(to top, #2a333d, #3e4a57);
        margin-right: 12px;
    }

    .base span:nth-child(3n) {
        margin-right: 0;
    }

    .base span:nth-child(4) {
        margin-top: -12px;
        line-height: 48px;
    }

    .base span:nth-child(5) {
        margin-top: -12px;
        line-height: 48px;
    }

    .base span:nth-child(6) {
        margin-top: -12px;
        line-height: 48px;
    }

    .tRNA {
        width: 321px;
        height: 323px;
        position: relative;
        margin: 26px 5px auto auto;
        background-size: 100% 100%;
        z-index: 10;
        overflow: hidden;
    }
    .tRNA span{
        font-family: PingFangSC-Medium;
        font-size: 22px;
        color: #FFFFFF;
        position: relative;
        display: block;
        margin: 70px auto auto 15px;
    }
    .resultDiv>span{
        font-family: PingFangSC-Medium;
        font-size: 22px;
        color: #FFFFFF;
        position: absolute;
        display: block;
        bottom: 35px;
        right: 30px;
    }
    .resultDiv img:nth-child(2){
        z-index: 10;
    }
    .tRNAIMG{
        z-index: 20;
        width: 62px;
        height: 62px;
        position: absolute;
        left: 156px;
        top: 7px;
        background-size: 100% 100%;
    }
    .tRNAIMG p{
        font-family: PingFangSC-Medium;
        color: #FFFFFF;
        text-shadow: 0 1px 3px rgba(0,0,0,0.50);
        width: 50px;
        height: 50px;
        margin: 6px 6px;
        text-align: center;
    }
    .three{
        font-size: 16px;
        line-height: 50px;
    }
    .four{
        font-size: 17px;
        line-height: 24px;
    }
    .endDiv {
        z-index: 10;
        position: relative;
        width: 220px;
        height: 264px;
        background-size: 100% 100%;
        margin: 86px auto auto auto
    }
    .tableLeft{
        width: 100px;
        height: 100%;
        text-align: center;
        color: #6f757d;
        float: left;
    }
    .tableTop{
        width: 400px;
        height: 47px;
        text-align: center;
        line-height: 24px;
        color: #6f757d;
        float: left;
        border-left: 1px solid #68707a;
        border-right: 1px solid #68707a;
    }
    .tableRight{
        width: 100px;
        height: 100%;
        float: right;
        text-align: center;
        color: #6f757d;
    }
    .tableMid{
        text-align: center;
        line-height: 24px;
        width: 400px;
        height: 385px;
        float: left;
        border: 1px solid #50E3C2;
        box-shadow: inset 0 0 9px 0 rgba(161,205,255,0.50);
    }
    .tableMid div{
        width: 397px;
        height: 24px;
        border-bottom: 1px solid rgb(104, 112, 122);
        overflow: hidden;
    }
    .tableMid div:last-child{
        border-bottom: 0;
    }
    .tableMid div:last-child span{
        height: 23px;
    }
    .tableMid div span:last-child{
        width: 100px;
    }
    .tableMid div span{
        width: 99px;
        height: 24px;
        display: block;
        float: left;
        text-align: center;
        font-size: 12px;
        color: #6f757d;
        border-left: 1px solid rgb(104, 112, 122);
        cursor:pointer;
        background-position: top left;
        background-size: contain;
        background-repeat: no-repeat;
        background-origin: border-box;
    }
    .tableMid div span:first-child{
        border-left: 0;
    }
    .bgActive{
        background: rgba(0,0,0,0.60);
        color:#ffffff;
    }
</style>