<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div style="width: 100%; height: 100%; background: #000"></div>
                <div id="title" class="title_text">{{title}}</div>
                <div class="buttonBox">
                    <div @click="getEvent(1)">
                    <buttonPrimary
                            style="margin-bottom: 12px; cursor: pointer;width: 102px;"
                            v-bind:actived = "active1"
                            v-bind:title="buttonTitle[0]"
                            type="ellipse"
                    ></buttonPrimary>
                    </div>
                    <div @click="getEvent(2)">
                        <buttonPrimary
                                style="margin-top: 12px; cursor: pointer;width: 102px;"
                                v-bind:actived = "active2"
                                v-bind:title="buttonTitle[1]"
                                type="ellipse"
                        ></buttonPrimary>
                    </div>
                </div>
                <div class="reactionBox">
                    <div class="tipBox" v-show="active" ondragstart="return false">
                        <!--<img class="tipImg" :src="tipImg">-->
                        <img id="playImg" class="playStyle" src="./sub_static/video/play.png" @click="playEvent()">
                    </div>
                    <div class="videoBox1" style="width: 100%; height: 100%;background: #000" v-show="active1" ondragstart="return false">
                        <video id="my-video1" class="video-js myVideo vjs-default-skin "
                               preload="auto"
                               x5-playsinline
                               playsinline
                               webkit-playsinline
                               data-setup="{}"
                               :poster = "picture1">
                            <source src="./sub_static/video/adequate.mp4" type="video/mp4">
                        </video>
                    </div>
                    <div class="videoBox2" style="width: 100%; height: 100%; background: #000" v-show="active2" ondragstart="return false">
                        <video id="my-video2" class="video-js myVideo vjs-default-skin "
                               preload="auto"
                               x5-playsinline
                               playsinline
                               webkit-playsinline
                               data-setup="{}"
                               :poster = "picture2"
                               ondragstart="return false">
                            <source src="./sub_static/video/shortage.mp4" type="video/mp4">
                        </video>
                    </div>
                </div>
                <div id="3dContainer" class="Container"></div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">

            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import Component from 'vue-class-component';
    import {MainVueComponent} from './mainVueComponent';
    import './sub_static/video/video-js.css';
    @Component({
        components: {
            fullScreensLayout,buttonPrimary
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

    ul, ol, li {
        list-style: none;
    }

    .title_text {
        font-size: 24px;
        color: #fff;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
    }
    .buttonBox {
        position: absolute;
        right: 42px;
        bottom: 120px;
        z-index: 2;
    }
    .playBtnStyle img{
        width: 100%;
        height: 100%;
    }
    .reactionBox{
        position: absolute;
        width: 768px;
        height: 432px;
        left: calc(50% - 384px);
        top: calc(50% - 216px);
        background: #000;
        border: 0px solid #000;
    }

    .tipBox {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #000;
    }
    .tipBox .tipImg {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .playStyle{
        cursor: pointer;
        width: 51px;
        height: 51px;
        position: absolute;
        z-index: 1;
        left: calc(50% - 26px);
        top: calc(50% - 26px);
    }
    .myVideo {
        width: 100%;
        height: 100%;
        outline:none;
        -webkit-tap-highlight-color: #000;
    }
    .reactionBox video {
        display: block;
        width: 100%;
        height: auto;
        position: absolute;
        overflow: hidden;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        outline:none;
        -webkit-tap-highlight-color: #000;
    }
    @media screen and (max-width: 610px), screen and (max-height: 610px) {
        .title_text {
            top: 12px;
            left: 12px;
            line-height: 18px;
            font-size: 18px;
        }
        .buttonBox{
            transform: scale(.5);
            right: -5px;
            bottom: 50px;
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
    .control-panel_div_floatRight{
        display: none;
    }
</style>
