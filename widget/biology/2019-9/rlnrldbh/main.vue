<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout  >
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div class="content" :style="{zoom:zoom1}">
                    <img class="backGround"  src="./sub_static/UI/bj.png" >
                    <div class="start">
                        <img src="./sub_static/UI/st.png"/>
                        <div class="x_title">{{buttonText[0]}}</div>
                        <div class="y_title">{{buttonText[1]}}</div>
                        <!--四个热点右边的文字-->
                        <div class="text1">{{buttonText[2]}}</div>
                        <div class="text2">{{buttonText[3]}}</div>
                        <div class="text3">{{buttonText[4]}}</div>
                        <div class="text4">{{buttonText[5]}}</div>
                        <!--四个热点-->
                        <div class="hot1" @click="getEvent(1)" v-show="have1"><img src="./sub_static/UI/yuan.png"/></div>
                        <div class="big1"  v-show="!have1"><img src="./sub_static/UI/hot.png"/></div>
                        <div class="hot2" @click="getEvent(2)" v-show="have2"><img src="./sub_static/UI/yuan.png"/></div>
                        <div class="big2"  v-show="!have2"><img src="./sub_static/UI/hot.png"/></div>
                        <div class="hot3" @click="getEvent(3)" v-show="have3"><img src="./sub_static/UI/yuan.png"/></div>
                        <div class="big3"  v-show="!have3"><img src="./sub_static/UI/hot.png"/></div>
                        <div class="hot4" @click="getEvent(4)" v-show="have4"><img src="./sub_static/UI/yuan.png"/></div>
                        <div class="big4"  v-show="!have4"><img src="./sub_static/UI/hot.png"/></div>
                        <!--四个热点对应的图片-->
                        <div class="one_img" v-show="!have1">
                            <img src="./sub_static/UI/1_1.png"/>
                        </div>
                        <div class="two_img" v-show="!have2">
                            <img src="./sub_static/UI/2_1.png"/>
                        </div>
                        <div class="three_img" v-show="!have3">
                            <img src="./sub_static/UI/3_1.png"/>
                        </div>
                        <div class="four_img" v-show="!have4">
                            <img src="./sub_static/UI/4_1.png"/>
                        </div>
                        <!--最右边四个框里面的文字-->
                        <div class="one_text" v-show="!have1">
                            <img src="./sub_static/UI/num_t.png"/>
                            <div class="one_text_list">{{buttonText[6]}}</div>
                        </div>
                        <div class="two_text" v-show="!have2">
                            <img src="./sub_static/UI/num_t.png"/>
                            <div class="two_text_list">{{buttonText[7]}}</div>
                        </div>
                        <div class="three_text" v-show="!have3">
                            <img src="./sub_static/UI/num_t.png"/>
                            <div class="three_text_list">{{buttonText[8]}}</div>
                        </div>
                        <div class="four_text" v-show="!have4">
                            <img src="./sub_static/UI/num_t.png"/>
                            <div class="four_text_list">{{buttonText[9]}}</div>
                        </div>

                        <!--框外面的内容-->
                        <div class="one_w" v-show="!have1"><img src="./sub_static/UI/1.png"/></div>
                        <div class="two_w" v-show="!have2"><img src="./sub_static/UI/2.png"/></div>
                        <div class="three_w" v-show="!have3"><img src="./sub_static/UI/3.png"/></div>
                        <div class="four_w" v-show="!have4"><img src="./sub_static/UI/4.png"/></div>
                    </div>

                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                </div>
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import Component from 'vue-class-component';
    import {MainVueComponent} from './mainVueComponent';

    @Component({
        components: {
            fullScreensLayout,
        },
    })
    export default class App extends MainVueComponent {
    }
</script>

<style scoped="scoped">
    * {
        margin: 0;
        padding: 0;
        touch-action: none;
    }
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    ul, ol, li {
        list-style: none;
    }
    .title_text {
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
        text-align: center;
        line-height: 24px;
        font-family: SourceHanSansSC-Medium;
        font-size: 24px;
        color: #fff;
    }
    img{
         width: 100%;
         height: 100%;
         pointer-events: none;
     }
    .content{
        width: 100%;
        height:100%;
    }
    .start{
        width: 690px;
        height: 446px;
        position: absolute;
        bottom: 9%;
        left: 18.7%;
    }
    .x_title{
        width: 142px;
        height: 25.2px;
        font-size: 20px;
        color: #B1B1B1;
        white-space:nowrap;
        position: absolute;
        left: -6px;
        bottom: 28px;
    }
    .y_title{
        width: 142px;
        height: 25.2px;
        font-size: 20px;
        color: #B1B1B1;
        white-space:nowrap;
        position: absolute;
        top: -7px;
        right: 4px;
    }
    .one_img{
        width: 283px;
        height: 109px;
        position: absolute;
        right: 135px;
        bottom: 36px;
    }
    .two_img{
        width: 283px;
        height: 39px;
        position: absolute;
        right: 135px;
        bottom: 147px;
    }
    .three_img{
        width: 130px;
        height: 98px;
        position: absolute;
        right: 134px;
        bottom: 184px;
    }
    .four_img{
        width: 45px;
        height: 73px;
        position: absolute;
        right: 135px;
        bottom: 282px;
    }


    /*<!--框外面的内容-->*/
    .one_w{
        width: 132px;
        height: 96px;
        position: absolute;
        left: -10px;
        bottom: 139px;
    }
    .two_w{
        width: 132px;
        height: 96px;
        position: absolute;
        left: 88px;
        bottom: 218px;
    }
    .three_w{
        width: 132px;
        height: 96px;
        position: absolute;
        left: 183px;
        bottom: 304px;
    }
    .four_w{
        width: 132px;
        height: 96px;
        position: absolute;
        left: 297px;
        bottom: 386px;
    }
    /*<!--四个热点右边的文字-->*/
    .text1{
        width:79px;
        height: 19px;
        font-size: 20px;
        color: #FFFFFF;
        white-space:nowrap;
        position: absolute;
        left: 174px;
        bottom: 142px;
    }
    .text2{
        width:39px;
        height: 19px;
        font-size: 20px;
        color: #FFFFFF;
        white-space:nowrap;
        position: absolute;
        left: 374px;
        bottom: 184px;
    }
    .text3{
        width:59px;
        height: 19px;
        font-size: 20px;
        color: #FFFFFF;
        white-space:nowrap;
        position: absolute;
        left: 433px;
        bottom: 277px;
    }
    .text4{
        width:39px;
        height: 19px;
        font-size: 20px;
        color: #FFFFFF;
        white-space:nowrap;
        position: absolute;
        left: 488px;
        bottom: 346px;
    }
    /*四个热点*/
    .hot1{
        width: 20px;
        height: 20px;
        position: absolute;
        left: 265px;
        bottom: 137px;
        cursor: pointer;
        z-index: 999;
    }
    .big1{
        width: 38px;
        height: 38px;
        position: absolute;
        left: 254px;
        bottom: 128px;
        z-index: 999;
    }
    .hot2{
        width: 20px;
        height: 20px;
        position: absolute;
        left: 423px;
        bottom: 178px;
        cursor: pointer;
        z-index: 999;
    }
    .big2{
        width: 38px;
        height: 38px;
        position: absolute;
        left: 414px;
        bottom: 169px;
        z-index: 999;
    }
    .hot3{
        width: 20px;
        height: 20px;
        position: absolute;
        left: 501px;
        bottom: 272px;
        cursor: pointer;
        z-index: 999;
    }
    .big3{
        width: 38px;
        height: 38px;
        position: absolute;
        left: 492px;
        bottom: 263px;
        z-index: 999;
    }

    .hot4{
        width: 20px;
        height: 20px;
        position: absolute;
        left: 535px;
        bottom: 342px;
        cursor: pointer;
        z-index: 999;
    }
    .big4{
        width: 38px;
        height: 38px;
        position: absolute;
        left: 526px;
        bottom: 333px;
        z-index: 999;
    }

    /*<!--最右边四个框里面的文字-->*/
     .one_text{
         width: 103px;
         height: 33px;
         position: absolute;
         left: 552px;
         bottom: 128px;
     }
     .one_text_list{
         width: 57px;
         height: 32px;
         line-height: 32px;
         text-align: center;
         white-space: nowrap;
         font-size: 20px;
         color: #FFFFFF;
         position:absolute ;
         left: 33px;
         top: 50%;
         transform: translateY(-50%);
     }
    .two_text{
        width: 103px;
        height: 33px;
        position: absolute;
        left: 552px;
        bottom: 169px;
    }
    .two_text_list{
        width: 59px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        white-space: nowrap;
        font-size: 20px;
        color: #FFFFFF;
        position:absolute ;
        left: 33px;
        top: 50%;
        transform: translateY(-50%);
    }
    .three_text{
        width: 103px;
        height: 33px;
        position: absolute;
        left: 552px;
        bottom: 265px;
    }
    .three_text_list{
        width: 67px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        white-space: nowrap;
        font-size: 20px;
        color: #FFFFFF;
        position:absolute ;
        left: 28px;
        top: 50%;
        transform: translateY(-50%);
    }
    .four_text{
        width: 103px;
        height: 33px;
        position: absolute;
        left: 552px;
        bottom: 336px;
    }
    .four_text_list{
        width: 67px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        white-space: nowrap;
        font-size: 20px;
        color: #FFFFFF;
        position:absolute ;
        left: 28px;
        top: 50%;
        transform: translateY(-50%);
    }
   /*适配各种设备*/
    @media ( max-height : 500px) {
        .btn .btn_3{
            width: 128px;
        }
    }
    @media ( max-height : 300px) {
        .btn .btn_3{
            width: 128px;
        }
        button{
            padding: 13px 3px 11px 3px ;
        }
    }
    @media ( width:1024px) and (height: 698px) {
        .start { 
            position: absolute;
            bottom: 15%;
            left: 18.7%;
        }
    }
    @media ( width:1024px) and (height: 768px) {
        .start { 
            position: absolute;
            bottom: 20%;
            left: 18.7%;
        }
    }
</style>
