<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=0">
                <div class="content" id="content" >
                    <img src="./sub_static/UI/bj.png"  />
                    <div id="title" class="title_text">{{title}}</div>
                    <!--左边的部分-->
                    <div class="left" :style="{zoom:zoom1}" v-show="showAll">
                        <div class="one" @click="clickImage(1)"><img  :src="img1" /></div>
                        <div class="two" @click="clickImage(2)"><img  :src="img2" /></div>
                        <div class="three" @click="clickImage(3)"><img  :src="img3" /></div>
                        <div class="four" @click="clickImage(4)"><img  :src="img4" /></div>
                        <div class="five">{{text_five}}</div>
                    </div>
                    <!--中间的部分-->
                    <div  class="right" :style="{zoom:zoom1}" v-show="showAll">
                           <div class="rt_left">
                               <img  :src="leftImg" />
                               <div class="videoBox1"  v-show="showVideo1">
                                   <div style="width: 100%; height: 100%">
                                       <video id="my-video1" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                              x-webkit-airplay="true"
                                              preload="true"
                                              x5-playsinline playsinline
                                              webkit-playsinline
                                              data-setup="{}"
                                              ref="icon"
                                              :poster="picture"
                                              style="border: 0.6px solid #DBDBDB;border-radius:50%;object-fit:fill">
                                           <source src="./sub_static/Video/1.mp4" type="video/mp4">
                                       </video>
                                   </div>
                               </div>
                               <div class="bloodTypeTitleA">{{text[0]}}</div>
                           </div>
                           <div class="rt_right">
                               <img  :src="rightImg"  />
                               <div class="videoBox2"  v-show="showVideo2">
                                   <div style="width: 100%; height: 100%">
                                       <video id="my-video2" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                              x-webkit-airplay="true"
                                              preload="true"
                                              x5-playsinline
                                              playsinline
                                              webkit-playsinline
                                              data-setup="{}"
                                              ref="icon"
                                              :poster="picture"
                                              style="border: 0.6px solid #DBDBDB;border-radius:50%;object-fit:fill">
                                           <source src="./sub_static/Video/1.mp4" type="video/mp4">
                                       </video>
                                   </div>
                               </div>
                               <div class="bloodTypeTitleB">{{text[1]}}</div>
                           </div>
                        <!--点击 button 按钮弹出的小提示正确错误弹框-->
                        <div class="tishi_right" v-show="showTishi_right" >
                            <img src="./sub_static/UI/4.png" />
                            <div class="right">{{text[2]}}<br>{{text[3]}}</div>
                        </div>
                        <div class="tishi_error" v-show="showTishi_error" >
                            <img src="./sub_static/UI/5.png" />
                            <div class="error">{{text[4]}}</div>
                        </div>
                    </div>

                    <!--右边的按钮-->
                    <div class="rt_box" id="rt_box"  :style="{zoom:zoom1}">
                        <div class="box_top"  id="box_top">
                            <div class="boxTitle">{{text[5]}}</div>
                            <div class="buttonBox" >
                                <button :class="{an_niu: have,'write':have2, 'bulecomplete': index === ishave}"
                                        v-for="(item, index) in textArr"
                                        :key="index"
                                        :id="'index' + index"
                                        v-text="item"
                                        @click="clickButton(index)"
                                ></button>
                            </div>
                        </div>
                        <div :class="{box_bottom:have,'write2':have2,'bulecomplete2':ischecked}"  @click="getShow">{{text[6]}}</div>
                    </div>

                    <!--点击 血型鉴定表 按钮弹出大的弹框-->
                    <div class="tankuang" v-show="showTankuang" :style="{zoom:zoom1}">
                        <img   src="./sub_static/UI/1.png" />
                        <div class="text1">{{imgText[0]}}</div>
                        <div class="text2">{{imgText[1]}}</div>
                        <div class="text3">{{imgText[2]}}</div>
                        <div class="text4">{{imgText[3]}}</div>
                        <div class="text5">{{imgText[4]}}<br>
                            {{imgText[5]}}</div>
                        <div class="text6">{{imgText[6]}}</div>
                        <div class="text7">{{imgText[7]}}</div>
                        <div class="text8">{{imgText[6]}}</div>
                        <div class="text9">{{imgText[7]}}</div>
                        <div class="text10">{{imgText[8]}}<br>
                                         （{{imgText[9]}}）</div>
                        <div class="text11">{{imgText[7]}}</div>
                        <div class="text12">{{imgText[6]}}</div>
                        <div class="text13">{{imgText[6]}}</div>
                        <div class="text14">{{imgText[7]}}</div>
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
    require('./video-js.css');
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
    }

    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    img{
        width: 100%;
        height: 100%;
        outline: none;
    }
    video{
        outline: none;
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
        color: #FFFFFF;
    }
    .content{
        height:100%;
        width:100%;
    }
    /*左边的部分*/
    .left{
        width: 157px;
        height: 365px;
        position: absolute;
        top: 50%;
        left: 4.3%;
        transform: translateY(-50%);
        display: flex;
        flex-direction:column;
        justify-content:space-between;
        align-items: center;
    }
    .one,.two,.three,.four{
        width: 60px;
        height: 60px;
        cursor: pointer;
    }
    .five{
        width: 120%;
        height: 40px;
        ont-size: 14px;
        color: #FFFFFF;
    }

    /*中间的部分*/
    .right{
        width: 57.5%;
        height: 100%;
        position: absolute;
        left:23.8%;
        top: 0;
    }
    .rt_left{
        width: 220px;
        heigth:220px;
        position: absolute;
        top: 25.2%;
        left: 8.2%;
    }
    .rt_right{
        width: 220px;
        heigth:220px;
        position: absolute;
        top: 25.2%;
        right: 8.2%;
    }
    .bloodTypeTitleA{
        font-size: 24px;
        color: #FFFFFF;
        width: 220px;
        height: 36px;
        position: absolute;
        bottom: -30%;
        left: 50%;
        transform: translateX(-50%);
        line-height: 36px;
        text-align: center;
    }
    .bloodTypeTitleB{
        font-size: 24px;
        color: #FFFFFF;
        width: 220px;
        height: 36px;
        position: absolute;
        bottom: -30%;
        left: 50%;
        transform: translateX(-50%);
        line-height: 36px;
        text-align: center;
    }

    /*右边按钮的部分*/
    .rt_box{
        width: 120px;
        height: 407px;
        position: absolute;
        top: 20.3%;
        right: 6%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:space-between;
    }
    .box_top{
        width: 96px;
        height: 268px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .boxTitle{
        width: 120px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        line-height: 36px;
        text-align: left;
    }
    .buttonBox{
        width: 96px;
        height: 212px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-content: center;
    }
    .an_niu{
        width: 96px;
        height: 38px;
        background: rgba(255,255,255,0.50);
        border: 1px solid #EBEBEB;
        border-radius: 19px;
        font-size: 14px;
        color: #000000;
        text-align: center;
        cursor: pointer;
        display: flex;
        justify-content:center;
        align-items: center;
    }
    .write{
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 19px;
    }
    .bulecomplete{
        background: #0291FF;
        border: 1px solid #EBEBEB;
        border-radius: 21px;
        color: #FFFFFF;
    }
    .box_bottom{
        width: 96px;
        height: 38px;
        background: rgba(255,255,255,0.50);
        border: 1px solid #EBEBEB;
        border-radius: 19px;
        font-size: 14px;
        color: #000000;
        text-align: center;
        line-height: 38px;
        cursor: pointer;
        z-index: 99;
    }
    .write2{
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 19px;
    }
    .bulecomplete2{
        background: #0291FF;
        border: 1px solid #EBEBEB;
        border-radius: 21px;
        color: #FFFFFF;
    }

    .videoBox1 {
        width: 219px;
        height: 219px;
        position: absolute;
        top: 0.5px;
        left: 0.5px;
    }
    .myVideo {
        width: 100%;
        height:100%;
    }
    .videoBox2 {
        width: 219px;
        height: 219px;
        position: absolute;
        top: 0.5px;
        left: 0.5px;
    }
    .tishi_right{
        width: 400px;
        height: 225px;
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translateX(-50%);
    }
    .tishi_right .right{
        width: 176px;
        height: 66px;
        color: #7ED222;
        font-size: 22px;
        position: absolute;
        top: 50%;
        left: 55%;
        transform: translateY(-50%);
    }

    .tishi_error{
        width: 400px;
        height: 225px;
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translateX(-50%);
    }
    .tishi_error .error{
        width: 154px;
        height: 66px;
        color: #FA5A54;
        font-size: 22px;
        position: absolute;
        top: 50%;
        left: 55%;
        transform: translateY(-50%);
    }

    .tankuang{
        width: 890px;
        height: 405px;
        position: absolute;
        top: 12.3%;
        left: 50%;
        transform: translateX(-50%);
    }
    .text1{
        position: absolute;
        top: 2%;
        left: 26.8%;
        font-size: 14px;
        color: #000000;
     }
    .text2{
        position: absolute;
        top: 2%;
        left: 47%;
        font-size: 14px;
        color: #000000;
    }
    .text3{
        position: absolute;
        top: 2%;
        left: 66.9%;
        font-size: 14px;
        color: #000000;
    }
    .text4{
        position: absolute;
        top: 2%;
        left:  87.1%;
        font-size: 14px;
        color: #000000;
    }
    .text5{
        width: 94px;
        height: 40px;
        position: absolute;
        top: 28%;
        left: 3.9%;
        font-size: 14px;
        color: #000000;
        text-align: center;
    }
    .text6{
        position: absolute;
        top: 46%;
        left: 26.8%;
        font-size: 14px;
        color: #000000;
    }
    .text7{
        position: absolute;
        top: 46%;
        left: 47%;
        font-size: 14px;
        color: #000000;
    }
    .text8{
        position: absolute;
        top: 46%;
        left: 66.9%;
        font-size: 14px;
        color: #000000;
    }
    .text9{
        position: absolute;
        top: 46%;
        left:  87.1%;
        font-size: 14px;
        color: #000000;
    }
    .text10{
        width: 94px;
        height: 40px;
        position: absolute;
        top: 72%;
        left: 3.9%;
        font-size: 14px;
        color: #000000;
        text-align: center;
    }

    .text11{
        position: absolute;
        top: 90%;
        left: 26.8%;
        font-size: 14px;
        color: #000000;
    }
    .text12{
        position: absolute;
        top: 90%;
        left: 47%;
        font-size: 14px;
        color: #000000;
    }
    .text13{
        position: absolute;
        top: 90%;
        left: 66.9%;
        font-size: 14px;
        color: #000000;
    }
    .text14{
        position: absolute;
        top: 90%;
        left:  87.1%;
        font-size: 14px;
        color: #000000;
    }
    @media (height: 768px) {
        /*.rt_box{*/
            /*bottom: 16.6%;*/
        /*}*/
        /*.tankuang{*/
            /*top: 22.3%;*/
        /*}*/
    }
    @media (height: 800px) {
        /*.rt_box{*/
            /*bottom: 16.6%;*/
        /*}*/
    }
    @media (width: 806px) {
        /*.rt_box{*/
            /*bottom: 16.6%;*/
        /*}*/
    }
    @media (width: 2048px) {
        /*.rt_box{*/
            /*bottom: 8.6%;*/
        /*}*/
    }

</style>
<style>
    @media (max-height: 450px) {
        .control_div_resetBtn {
            position: absolute;
            right: 0!important;
            top: 0!important;
            transform: scale(0.6);
        }
    }
</style>