<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=0">
                <div class="content" id="content" >
                    <div id="title" class="title_text">{{title}}</div>
                    <div class="buttonBox" id="buttonBox" >
                        <button :class="{an_niu: have, 'bulecomplete': index === ishave}"
                                v-for="(item, index) in textArr"
                                :key="index"
                                :id="'index' + index"
                                v-text="item"
                                @click="getEvent(index)"
                        ></button>
                    </div>
                    <div class="bj" id="bj" v-show="showBj" >
                        <img src="./sub_static/UI/0.png" style="width: 100%;height: 100%">
                    </div>
                    <div class="videoBox"  id="videoBox" >
                          <div id="videoBoxList" style="width: 100%; height: 100%;" v-show="active1">
                            <video id="my-video1" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                   x-webkit-airplay="true"
                                   preload="true"
                                   x5-playsinline playsinline
                                   webkit-playsinline
                                   data-setup="{}"
                                   ref="icon"
                                   :poster="picture"
                                   style="border-radius:5px;object-fit:fill"  >
                                <source id="sourceId"  src="./sub_static/Video/11_1.mp4" type="video/mp4" >
                            </video>
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
    #videoBoxList{
        background: rgba(255,255,255,0)!important;
    }
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    img{
        width: 100%;
        height: 100%;
        display: block;
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
        font-family: SourceHanSansSC-Medium;
        font-size: 28px;
        color: #FFFFFF;
        line-height: 28px;
    }
    .content{
        height:100%;
        width:100%;
        background: #2B2B2B;
    }
    .buttonBox{
        width: 74px;
        height: 222px;
        position: absolute;
        bottom: 14.2%;
        right: 2.3%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        z-index: 2000;
    }
    .bj{
        width: 71.3%;
        height: 71.4%;
        position: absolute;
        bottom: 14.2%;
        left: 14.3%;
    }
    .an_niu{
        width: 72px;
        height: 42px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        text-align: center;
        border-radius: 21px;
        cursor: pointer;
        display: flex;
        justify-content:center;
        align-items: center;
        font-family: SourceHanSansSC-Medium;
        font-size: 16px;
        color: #525252;
        line-height: 16px;
    }
    .bulecomplete{
        background: #0291FF;
        border: 1px solid #EBEBEB;
        border-radius: 21px;
        color: #FFFFFF;
    }
    /*关于视频的样式*/
    .videoBox {
        width: 71.3%;
        height: 71.4%;
        position: absolute;
        bottom: 14.2%;
        left: 14.3%;
    }
    .myVideo {
        width: 100%;
        height:100%;
    }

</style>
