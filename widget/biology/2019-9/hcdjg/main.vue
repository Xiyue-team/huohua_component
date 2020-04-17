<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=0">
                <div class="content" id="content" >
                    <img src="./sub_static/background.png" style="width: 100%;height: 100%;" :style="{zoom:scale}"/>
                    <div id="title" class="title_text">{{title}}</div>
                    <div class="bottomText" :style="{zoom:scale}" v-show="initTextShow">
                        {{text_Detail[0]}}
                    </div>

                    <div class="initImg" :style="{zoom:scale}">
                        <img :src="startImg" style="width: 100%;height:auto;"/>
                    </div>

                    <div class="text" :style="{zoom:scale}">
                        <img src="./sub_static/line.png" style="width: 100%;height:auto;-webkit-user-drag: none"/>

                        <!--第一个热点-->
                        <div :class="{onePoint:have,'yellow': ischecked1}" @click="getEvent(1)"></div>
                        <div class="oneBox" v-show="isshow1">
                            <div class="xt">{{textTitle[0]}}</div>
                            <div class="text_area">{{text_Detail[1]}}</div>
                            <div class="img_list" v-show="isMouthDetail">
                                <img  src="./sub_static/mouthDetail.png" style="width: 100%;height: 100%"/>
                            </div>
                        </div>

                        <!--第二个热点-->
                        <div :class="{twoPoint:have,'yellow': ischecked2}" @click="getEvent(2)"></div>
                        <div class="twoBox" v-show="isshow2">
                            <div class="xt">{{textTitle[1]}}</div>
                            <div class="text_area">{{text_Detail[2]}}</div>
                        </div>

                        <!--第三个热点-->
                        <div :class="{threePoint:have,'yellow': ischecked3}" @click="getEvent(3)"></div>
                        <div class="threeBox" v-show="isshow3">
                            <div class="xt">{{textTitle[2]}}</div>
                            <div class="text_area">{{text_Detail[3]}}</div>
                        </div>

                        <!--第四个热点-->
                        <div :class="{fourPoint:have,'yellow': ischecked4}" @click="getEvent(4)"></div>
                        <div class="fourBox" v-show="isshow4">
                            <div class="xt">{{textTitle[3]}}</div>
                            <div class="text_area">{{text_Detail[4]}}</div>
                            <div class="img_list" v-show="isAnusDetail">
                                <img  src="./sub_static/anusDetail.png" style="width: 100%;height: 100%"/>
                            </div>
                        </div>
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
    }

    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    img{
        outline: none;
    }
    ul, ol, li {
        list-style: none;
    }
    .title_text{
        font-size: 24px;
        color: #ffffff;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
        z-index: 99;
    }
    .bottomText{
        width: 100%;
        margin: 0;
        padding: 0;
        position: absolute;
        bottom: 9.2%;
        left:0;
        z-index: 9;
        text-align: center;
        line-height: 22px;
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #FFFFFF;
    }
    .content{
        height:100%;
        width:100%;
        background: #000;
    }
    .initImg{
        width: 454px;
        height: 448px;
        position: absolute;
        top: 7.3%;
        left: 31.7%;
    }
    .text{
        width: 454px;
        height: 448px;
        position: absolute;
        top: 7.3%;
        left: 31.7%;
    }

    /*第一个热点样式*/
    .onePoint{
        width: 15px;
        height: 15px;
        border-radius:50% ;
        position: absolute;
        left: 4.95%;
        top: 14.95%;
        border: 1px solid #FFFFFF;
        cursor: pointer;
    }
    .oneBox{
        width: 140px;
        position: absolute;
        left: -30%;
        top: 10%;
        display: flex;
        flex-direction:column;
        align-items:flex-end ;
        justify-content: space-between;
    }
    .oneBox  .xt{
        height: 22px;
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #FFFFFF;
        text-align: left;
        line-height: 22px;
    }
    .oneBox   .text_area{
        font-family: SourceHanSansSC-Normal;
        font-size: 16px;
        color: #dddddd;
        text-align: left;
        margin-bottom: 156px;
        line-height: 22px;
    }
    .img_list{
        width: 140px;
        height: 140px;
        position: absolute;
        bottom: 0;
        right: 0;
    }
    /*第二个点的样式*/
    .twoPoint{
        width: 15px;
        height: 15px;
        border-radius:50% ;
        position: absolute;
        right: 19.1%;
        top: 23.3%;
        cursor: pointer;
        border: 1px solid #FFFFFF;
    }
    .twoBox{
        width: 204px;
        position: absolute;
        right:-30%;
        top: 16%;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        align-items:flex-start ;
    }
    .twoBox  .xt{
        width: 40px;
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #FFFFFF;
        text-align: left;
        line-height: 29px;
    }
    .twoBox   .text_area{
        width: 100%;
        font-family: SourceHanSansSC-Normal;
        font-size: 16px;
        color: #dddddd;
        text-align: left;
        line-height: 22px;
    }

    /*第三个点的样式*/
    .threePoint{
        width: 15px;
        height: 15px;
        border-radius:50% ;
        position: absolute;
        left: 4.2%;
        bottom: 23.1%;
        cursor: pointer;
        border: 1px solid #FFFFFF;
    }
    .threeBox{
        width: 196px;
        position: absolute;
        left:-43%;
        bottom: 21%;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        align-items:flex-start ;
    }
    .threeBox  .xt{
        width: 196px;
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #FFFFFF;
        text-align: right;
        line-height: 22px;
    }
    .threeBox   .text_area{
        width: 196px;
        font-family: SourceHanSansSC-Normal;
        font-size: 16px;
        color: #dddddd;
        text-align: right;
        line-height: 22px;
    }

    /*第四个点的样式*/
    .fourPoint{
        width: 15px;
        height: 15px;
        border-radius:50% ;
        position: absolute;
        right: 1.5%;
        bottom: 43.85%;
        cursor: pointer;
        border: 1px solid #FFFFFF;
    }
    .fourBox{
        width: 140px;
        position: absolute;
        right:-32%;
        top: 50%;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        align-items:flex-start ;
    }
    .fourBox  .xt{
        height: 22px;
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #FFFFFF;
        text-align: left;
        line-height: 22px;
    }
    .fourBox   .text_area{
        margin-bottom: 156px;
        font-family: SourceHanSansSC-Normal;
        font-size: 16px;
        color: #dddddd;
        text-align: left;
        line-height: 22px;
    }
    .fourBox   .img_list{
      left:0;
    }

    .yellow{
        width: 15px;
        height: 15px;
        border-radius:50% ;
        background: #FFC100;
        border: 1px solid #FFFFFF;
    }
    @media screen and (max-width: 610px), screen and (max-height: 610px) {
        .title_text {
            top: 12px;
            left: 12px;
            line-height: 20px;
            font-size: 20px;
        }
    }

</style>
<style>
@media screen and (max-width: 610px), screen and (max-height: 610px) {
    .control_div_resetBtn {
        right: 12px;
        top: 0;
        transform: scale(0.7);
    }
}


</style>