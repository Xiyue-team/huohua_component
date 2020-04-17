<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9" oncontextmenu="return false"
         style="background-color: #EDEDED"
         onselectstart="return false"
         ondragstart="return false">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="bgcolor">
                    <div id="title">
                        酶促反应活化能的改变
                    </div>
                    <div id="video">
                        <div id="video1">
                            <video id="my-video1" class="video-js vjs-default-skin" preload="auto" webkit-playsinline playsinline x5-playsinline :poster="wmpng">
                                <source :src="firstvideo" type="video/mp4">
                            </video>
                            <div id="play1" @click="wumei" v-show="button1"
                                 :style="{'background-image': 'url(\'' +bgplay +'\')'} "></div>
                            <div id="bar1">
                                <h5>吸收能量</h5>
                                <div id="wait1">
                                    <div id="progress1" v-bind:style="{width: widths}"></div>
                                </div>
                            </div>
                        </div>

                        <div id="plays" @click="plays" v-show="button"
                             :style="{'background-image': 'url(\'' +bgplay2 +'\')'} "></div>

                        <div id="video2">
                            <video id="my-video2" class="video-js vjs-default-skin" preload="auto" webkit-playsinline playsinline x5-playsinline :poster="ympng">
                                <source :src="secondvideo" type="video/mp4">
                            </video>
                            <div id="play2" @click="youmei" v-show="button2"
                                 :style="{'background-image': 'url(\'' +bgplay +'\')'} "></div>
                            <div id="bar2">
                                <h5>吸收能量</h5>
                                <div id="wait2">
                                    <div id="progress2" v-bind:style="{width : width2}"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="charts">
                        <img :src="zbz" alt="坐标轴" id="zbz">
                        <img :src="line" alt="蓝色曲线" v-show="blues" id="lanline" v-bind:style="{zIndex:cengci1}">
                        <img :src="liner" alt="红色曲线" v-show="reds" id="hongline" v-bind:style="{zIndex:cengci2}">
                        <div id="sbk" v-bind:style="{borderBottom: bottomborder}"></div>
                        <div id="line">
                            <div id="wmhhn" v-show="wmhhn"
                                 :style="{'background-image': 'url(\'' +bgwmhhn +'\')'} "></div>
                            <div id="dash" v-show="dash"></div>
                            <div id="ymhhn" v-show="ymhhn"
                                 :style="{'background-image': 'url(\'' +bgymhhn +'\')'} "></div>

                            <div id="ymsfdnl" v-show="ymsfdnl"
                                 :style="{'background-image': 'url(\'' +sfnlym +'\')' , 'background-size':'100% 100%'} "></div>

                            <div id="wmsfdnl" v-show="wmsfdnl"
                                 :style="{'background-image': 'url(\'' +sfnlwm +'\')' , 'background-size':'100% 100%'} "></div>

                            <div id="mask1" v-bind:class="{move: cover1}" v-show="zhe1"
                                 v-bind:style="{zIndex:cengci3}"></div>
                            <div id="mask3" v-bind:class="{ymove: cover3}" v-show="zhe3"
                                 v-bind:style="{zIndex:cengci4}"></div>
                        </div>
                        <div id="xbkym" v-bind:style="{borderTop: topborderym}"></div>
                        <div id="xbkwm" v-bind:style="{borderTop: topborderwm}"></div>
                    </div>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
            </template>
        </fullScreensLayout>
    </div>
</template>
<script lang="ts">
  import '../../../../src/assets/css/core.css';
  import '../../../../src/assets/css/layout.css';
  import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
  import Component from 'vue-class-component';
  import { MainVueComponent } from './mainVueComponent';
  import './sub_static/assets/css/style.css';

  @Component({ components: { fullScreensLayout } })
  export default class App extends MainVueComponent {
  }
</script>
<style scoped="scoped">

</style>
