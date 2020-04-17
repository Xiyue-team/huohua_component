<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div class="content" :style="{zoom:zoom1}">
                    <img class="backGround" src="./sub_static/UI/bj.png">
                    <div class="start">
                        <img :src="stImg"/>
                    </div>
                    <div class="xian">
                        <img src="./sub_static/UI/xiankuang.png"/>

                        <div :class="{one:have,ishave:index === 1}" @click="getEvent(1)"></div>
                        <div class="one_textBox" v-show="index === 1">
                            <div class="text_title">{{textTitle[0]}}</div>
                            <div class="text_area">{{textArea[0]}}</div>
                        </div>

                        <div :class="{two:have,ishave:index === 2}" @click="getEvent(2)"></div>
                        <div class="two_textBox" v-show="index === 2">
                            <div class="text_title">{{textTitle[1]}}</div>
                            <div class="text_area">{{textArea[1]}}</div>
                        </div>

                        <div :class="{three:have,ishave:index === 3}" @click="getEvent(3)"></div>
                        <div class="three_textBox" v-show="index === 3">
                            <div class="text_title">{{textTitle[2]}}</div>
                            <div class="text_area">{{textArea[2]}}</div>
                        </div>

                        <div :class="{four:have,ishave:index === 4}" @click="getEvent(4)"></div>
                        <div class="four_textBox" v-show="index === 4">
                            <div class="text_title">{{textTitle[3]}}</div>
                            <div class="text_area">{{textArea[3]}}</div>
                        </div>

                        <div :class="{five:have,ishave:index === 5}" @click="getEvent(5)"></div>
                        <div class="five_textBox" v-show="index === 5">
                            <div class="text_title">{{textTitle[4]}}</div>
                            <div class="text_area">{{textArea[4]}}</div>
                        </div>

                        <div :class="{six:have,ishave:index === 6}" @click="getEvent(6)"></div>
                        <div class="six_textBox" v-show="index === 6">
                            <div class="text_title">{{textTitle[5]}}</div>
                            <div class="text_area">{{textArea[5]}}</div>
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
  import "../../../../src/assets/css/core.css";
  import "../../../../src/assets/css/layout.css";
  import fullScreensLayout from "../../../../src/component/layout/fullScreens_layout.vue";
  import Component from "vue-class-component";
  import { MainVueComponent } from "./mainVueComponent";

  @Component({
    components: {
      fullScreensLayout
    }
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

    img {
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .content {
        width: 100%;
        height: 100%;
    }

    .start {
        width: 550px;
        height: 372px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }

    .xian {
        width: 550px;
        height: 372px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }

    /*第一个点*/
    .one {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        left: 130px;
        top: 28px;
        cursor: pointer;
    }

    .one_textBox {
        width: 199px;
        height: 120px;
        position: absolute;
        left: -80px;
        top: 20px;
        display: flex;
        flex-direction: column;
        /*justify-content:flex-end;*/
        align-items: flex-end;
    }

    .one_textBox .text_title {
        width: 24px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
    }

    .one_textBox .text_area {
        width: 100%;
        height: 80px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: justify;
    }

    /*第二个点*/
    .two {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        left: 22px;
        top: 158px;
        cursor: pointer;
    }

    .two_textBox {
        width: 116px;
        height: 60px;
        position: absolute;
        left: -104px;
        top: 150px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .two_textBox .text_title {
        width: 24px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
    }

    .two_textBox .text_area {
        width: 100%;
        height: 80px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: right;
        white-space: nowrap;
    }

    /*第三点*/
    .three {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        left: 64px;
        top: 263px;
        cursor: pointer;
    }

    .three_textBox {
        width: 160px;
        height: 80px;
        position: absolute;
        left: -104px;
        top: 255px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .three_textBox .text_title {
        width: 24px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
    }

    .three_textBox .text_area {
        width: 100%;
        height: 80px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: justify;
    }

    /*第四个点*/
    .four {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        left: 377px;
        top: 48px;
        cursor: pointer;
    }

    .four_textBox {
        width: 160px;
        height: 60px;
        position: absolute;
        left: 399px;
        top: 39px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .four_textBox .text_title {
        width: 24px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
    }

    .four_textBox .text_area {
        width: 100%;
        height: 80px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: justify;
        white-space: nowrap;
    }

    /*第五个点*/
    .five {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        left: 465.5px;
        top: 145px;
        cursor: pointer;
    }

    .five_textBox {
        width: 182px;
        height: 100px;
        position: absolute;
        left: 487px;
        top: 135px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .five_textBox .text_title {
        width: 48px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .five_textBox .text_area {
        width: 100%;
        height: 80px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: justify;
    }

    /*第六个点*/
    .six {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        left: 458px;
        top: 269px;
        cursor: pointer;
    }

    .six_textBox {
        width: 218px;
        height: 100px;
        position: absolute;
        left: 478px;
        top: 260px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .six_textBox .text_title {
        width: 72px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .six_textBox .text_area {
        width: 100%;
        height: 80px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: justify;
    }

    .ishave {
        background: #FFC100;
    }

    /*适配各种设备*/
    @media ( max-height: 400px) {
        .one_textBox .text_area {
            width: 150%;
            height: 80px;
        }

        .two_textBox .text_area {
            width: 150%;
        }

        .five_textBox .text_area {
            width: 130%;
        }

        .six_textBox .text_area {
            width: 130%;
        }
    }

    @media ( height: 330px) {
        .one_textBox .text_area {
            width: 165%;
            height: 80px;
        }
    }
</style>
