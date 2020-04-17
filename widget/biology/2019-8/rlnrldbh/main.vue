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
                        <div class="one" ><img :src="picture1"/></div>
                        <div class="two"><img :src="picture2"/></div>
                        <div class="three"><img :src="picture3"/></div>
                        <div class="four"><img :src="picture4"/></div>
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
                            <img src="./sub_static/UI/1_3.png"/>
                        </div>
                        <div class="two_img" v-show="!have2">
                            <img src="./sub_static/UI/2_3.png"/>
                        </div>
                        <div class="three_img" v-show="!have3">
                            <img src="./sub_static/UI/3_3.png"/>
                        </div>
                        <div class="four_img" v-show="!have4">
                            <img src="./sub_static/UI/4_3.png"/>
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
                    </div>
                    <!--框外面的内容-->
                    <div class="one_w" v-show="!have1"><img src="./sub_static/UI/1_2.png"/></div>
                    <div class="two_w" v-show="!have2"><img src="./sub_static/UI/2_2.png"/></div>
                    <div class="three_w" v-show="!have3"><img src="./sub_static/UI/3_2.png"/></div>
                    <div class="four_w"v-show="!have4"><img src="./sub_static/UI/4_2.png"/></div>
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
        width: 424px;
        height: 411px;
        position: absolute;
        bottom: 10.6%;
        left: 31.6%;
    }
    .x_title{
        width: 142px;
        height: 25.2px;
        font-size: 20px;
        color: #B1B1B1;
        white-space:nowrap;
        position: absolute;
        left: -142px;
        bottom: 20px;
    }
    .y_title{
        width: 142px;
        height: 25.2px;
        font-size: 20px;
        color: #B1B1B1;
        white-space:nowrap;
        position: absolute;
        top: -28px;
        right: -125px;
    }
    .one{
        width: 85px;
        height: 85px;
        position: absolute;
        left: -94px;
        bottom: 66px;
    }
    .two{
        width: 92px;
        height: 92px;
        position: absolute;
        left: 12px;
        bottom: 137px;
    }
    .three{
        width: 99px;
        height: 99px;
        position: absolute;
        left: 107px;
        bottom: 218px;
    }
    .four{
        width: 110px;
        height: 110px;
        position: absolute;
        left: 205px;
        bottom: 316px;
    }



    /*<!--框外面的内容-->*/
    .one_w{
        width: 76px;
        height: 76px;
        position: absolute;
        left: 15.6%;
        bottom: 40.5%;
    }
    .two_w{
        width: 76px;
        height: 76px;
        position: absolute;
        left: 25.3%;
        bottom: 52.5%;
    }
    .three_w{
        width: 76px;
        height: 76px;
        position: absolute;
        left: 34.3%;
        bottom: 65.7%;
    }
    .four_w{
        width: 76px;
        height: 76px;
        position: absolute;
        left: 43.3%;
        bottom: 79.9%;
    }
    /*<!--四个热点右边的文字-->*/
    .text1{
        width:79px;
        height: 19px;
        font-size: 20px;
        color: #FFFFFF;
        white-space:nowrap;
        position: absolute;
        left: 40px;
        bottom: 78px;
    }
    .text2{
        width:39px;
        height: 19px;
        font-size: 20px;
        color: #FFFFFF;
        white-space:nowrap;
        position: absolute;
        left: 223px;
        bottom: 127px;
    }
    .text3{
        width:59px;
        height: 19px;
        font-size: 20px;
        color: #FFFFFF;
        white-space:nowrap;
        position: absolute;
        left: 302px;
        bottom: 227px;
    }
    .text4{
        width:39px;
        height: 19px;
        font-size: 20px;
        color: #FFFFFF;
        white-space:nowrap;
        position: absolute;
        left: 356px;
        bottom: 339px;
    }
    /*四个热点*/
    .hot1{
        width: 20px;
        height: 20px;
        position: absolute;
        left: 129px;
        bottom: 72px;
        cursor: pointer;
    }
    .big1{
        width: 38px;
        height: 38px;
        position: absolute;
        left: 120px;
        bottom: 63px;
        z-index: 999;
    }
    .hot2{
        width: 20px;
        height: 20px;
        position: absolute;
        left: 287px;
        bottom: 123px;
        cursor: pointer;
    }
    .big2{
        width: 38px;
        height: 38px;
        position: absolute;
        left: 278px;
        bottom: 114px;
        z-index: 999;
    }
    .hot3{
        width: 20px;
        height: 20px;
        position: absolute;
        left: 365px;
        bottom: 222px;
        cursor: pointer;
    }
    .big3{
        width: 38px;
        height: 38px;
        position: absolute;
        left: 356px;
        bottom: 213px;
        z-index: 999;
    }

    .hot4{
        width: 20px;
        height: 20px;
        position: absolute;
        left: 400px;
        bottom: 335px;
        cursor: pointer;
    }
    .big4{
        width: 38px;
        height: 38px;
        position: absolute;
        left: 393px;
        bottom: 326px;
        z-index: 999;
    }

    /*<!--四个热点对应的图片-->*/
    .one_img{
        width: 283px;
        height: 53px;
        position: absolute;
        right: 3px;
        bottom: 30px;
    }
    .two_img{
        width: 260px;
        height: 50px;
        position: absolute;
        right: 3px;
        bottom: 84px;
    }
    .three_img{
        width: 118px;
        height: 98px;
        position: absolute;
        right: 3px;
        bottom: 136px;
    }
    .four_img{
        width: 43px;
        height: 105px;
        position: absolute;
        right: 3px;
        bottom: 240px;
    }

    /*<!--最右边四个框里面的文字-->*/
     .one_text{
         width: 103px;
         height: 33px;
         position: absolute;
         left: 418px;
         bottom: 66px;
     }
     .one_text_list{
         width: 57px;
         height: 32px;
         line-height: 32px;
         white-space: nowrap;
         font-size: 20px;
         color: #FFFFFF;
         position:absolute ;
         left: 28px;
         top: 50%;
         transform: translateY(-50%);
     }
    .two_text{
        width: 103px;
        height: 33px;
        position: absolute;
        left: 418px;
        bottom: 117px;
    }
    .two_text_list{
        width: 59px;
        height: 32px;
        line-height: 32px;
        white-space: nowrap;
        font-size: 20px;
        color: #FFFFFF;
        position:absolute ;
        left: 28px;
        top: 50%;
        transform: translateY(-50%);
    }
    .three_text{
        width: 103px;
        height: 33px;
        position: absolute;
        left: 418px;
        bottom: 217px;
    }
    .three_text_list{
        width: 67px;
        height: 32px;
        line-height: 32px;
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
        left: 418px;
        bottom: 329px;
    }
    .four_text_list{
        width: 67px;
        height: 32px;
        line-height: 32px;
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
    @media ( height : 698px ) {
        .start{
            position: absolute;
            bottom: 20.6%;
        }
    }
    @media ( height : 768px ) {
        .start{
            position: absolute;
            bottom: 20.6%;
        }
    }
</style>
