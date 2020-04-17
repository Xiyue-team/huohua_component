<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="3dContainer" style="width: 100%;height: 100%;">
                    <div class="zx" style="width: 100%;height: 100%;">
                        <div style="width: 100%;height: 50%">
                            <div class="shang">
                                <span class="title_style">折射率</span>
                                <div id="upButton" style="width: 108px;height: 98px;bottom: 51px;right:14px;position: absolute; z-index: 10"
                                     @click="show = !show" >
                                    <img :src="img2" style="position: absolute;width: 108px;height: 98px">
                                    <img :src="img3" style="position:absolute;width:46px;height:36px;top: 31px;left: 31px">
                                </div>
                                <img :src="img" style=" width: 100%; height:100%;" ondragstart="return false;">
                            </div>
                            <transition name="info">
                                <div class="Modal" v-show="show" @click="show = !show" style="z-index: 11">
                                    <div id="airButton" @click.stop="anniu()" @click="show = !show"
                                         style="width: 102px;height: 104px;float: left;left:13%;top: 37%;position: absolute;">
                                        <img src="./sub_static/air2.png" style="position:absolute">
                                        <img src="./sub_static/Group4.png"
                                             style="position:absolute;top:31px;left:28px">
                                    </div>

                                    <div id="waterButton" @click.stop="anniu1()" @click="show = !show"
                                         style="width: 102px;height: 104px;float: left;left:26%;top: 37%;position: absolute;">
                                        <img src="./sub_static/water2.png" style="position:absolute">
                                        <img src="./sub_static/Group5.png"
                                             style="position:absolute;top:31px;left:20px">
                                    </div>

                                    <div id="alcoholButton" @click.stop="anniu2()" @click="show = !show"
                                         style="width: 102px;height: 104px;float: left;left:39%;top: 37%;position: absolute;">
                                        <img src="./sub_static/alcohol2.png" style="position:absolute">
                                        <img src="./sub_static/Group6.png"
                                             style="position:absolute;top:31px;left:20px">
                                    </div>

                                    <div id="glassButton" @click.stop="anniu3()" @click="show = !show"
                                         style="width: 102px;height: 104px;float: left;left:52%;top: 37%;position: absolute;">
                                        <img src="./sub_static/glass2.png" style="position:absolute">
                                        <img src="./sub_static/Group7.png"
                                             style="position:absolute;top:31px;left:20px">
                                    </div>

                                    <div id="eryangButton" @click.stop="anniu4()" @click="show = !show"
                                         style="width: 102px;height: 104px;float: left;left:65%;top: 37%;position: absolute;">
                                        <img src="./sub_static/eryanghuadian2.png"
                                             style="position:absolute">
                                        <img src="./sub_static/Group8.png"
                                             style="position:absolute;top:31px;left:20px">
                                    </div>

                                    <div id="baoshiButton" @click.stop="anniu5()" @click="show = !show"
                                         style="width: 102px;height: 104px;float: left;left:78%;top: 37%;position: absolute;">
                                        <img src="./sub_static/baoshi2.png" style="position:absolute">
                                        <img src="./sub_static/Group9.png"
                                             style="position:absolute;top:31px;left:20px">
                                    </div>
                                </div>
                            </transition>
                        </div>
                        <div style="width: 100%;height: 50%">
                            <div class="xia">
                                <div id="downButton" style="width: 108px;height: 98px;bottom: 51px;right:14px;position: absolute; z-index: 10"
                                     @click="isshow = !isshow">
                                    <img :src="img4" style="position: absolute;width: 108px;height: 98px">
                                    <img :src="img5" style="position: absolute;width:46px;height:36px;top: 31px;left: 31px">
                                </div>
                                <img :src="img1" style="width: 100%; height: 100%" ondragstart="return false;">
                            </div>
                            <transition name="info1">
                                <div class="modal" v-show="isshow" @click="isshow = !isshow" style="z-index: 11">
                                    <div id="air2Button" @click.stop="anniu6()" @click="isshow = !isshow"
                                         style="width: 102px;height: 104px;float: left;left:13%;top: 37%;position: absolute;">
                                        <img src="./sub_static/air2.png">
                                        <img src="./sub_static/Group4.png" style="position:absolute;top:31px;left:28px">
                                    </div>

                                    <div id="water2Button" @click.stop="anniu7()" @click="isshow = !isshow"
                                         style="width: 102px;height: 104px;float: left;left:26%;top: 37%;position: absolute;">
                                        <img src="./sub_static/water2.png">
                                        <img src="./sub_static/Group5.png" style="position:absolute;top:31px;left:20px">
                                    </div>

                                    <div id="alcohol2Button" @click.stop="anniu8()" @click="isshow = !isshow"
                                         style="width: 102px;height: 104px;float: left;left:39%;top: 37%;position: absolute;">
                                        <img src="./sub_static/alcohol2.png">
                                        <img src="./sub_static/Group6.png" style="position:absolute;top:31px;left:20px">
                                    </div>

                                    <div id="glass2Button" @click.stop="anniu9()" @click="isshow = !isshow"
                                         style="width: 102px;height: 104px;float: left;left:52%;top: 37%;position: absolute;">
                                        <img src="./sub_static/glass2.png">
                                        <img src="./sub_static/Group7.png" style="position:absolute;top:31px;left:20px">
                                    </div>

                                    <div id="eryang2Button" @click.stop="anniu10()" @click="isshow = !isshow"
                                         style="width: 102px;height: 104px;float: left;left:65%;top: 37%;position: absolute;">
                                        <img src="./sub_static/eryanghuadian2.png">
                                        <img src="./sub_static/Group8.png" style="position:absolute;top:31px;left:20px">
                                    </div>

                                    <div id="baoshi2Button" @click.stop="anniu11()" @click="isshow = !isshow"
                                         style="width: 102px;height: 104px;float: left;left:78%;top: 37%;position: absolute;">
                                        <img src="./sub_static/baoshi2.png">
                                        <img src="./sub_static/Group9.png" style="position:absolute;top:31px;left:20px">
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>

                    <div id="kCanvas" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 2;">

                    </div>

                    <div id="lightImg" class="lightRotate"
                         style="width: 260px; height: 40px;position: absolute; left: calc(50% - 260px); top: calc(50% - 20px); ;transform-origin: 260px 20px;" v-if="isPC">
                        <img id="light" src="./sub_static/light.png"
                             ondragstart="return false;">
                    </div>

                    <div class="lightRotate"
                         style="width: 150px; height: 40px;position: absolute; left: calc(50% - 150px); top: calc(50% - 20px); ;transform-origin: 150px 20px;" v-else>
                        <img src="./sub_static/lightForMobile.png"
                             ondragstart="return false;">
                    </div>

                    <div id="lineImg" class="lineRotate"
                         style="width: 1000px; height: 40px;position: absolute; left: calc(50%); top: calc(50% - 20px); ;transform-origin: 0px 20px;">
                        <img id="line" src="./sub_static/line.png"
                             ondragstart="return false;">
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
  import Vue from "vue";
  import "../../../../src/assets/css/core.css";
  import "../../../../src/assets/css/layout.css";
  import fullScreensLayout from "../../../../src/component/layout/fullScreens_layout.vue";
  import Component from "vue-class-component";
  import { MainVueComponent } from "./mainVueComponent";

  @Component({
    components: {
      fullScreensLayout
    },
    mixins: [MainVueComponent]
  })
  export default class App extends Vue {}

</script>

<style scoped="scoped">
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .title_style {
        width: 336px;
        height: 24px;
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        position: absolute;
        left: 24px;
        top: 24px;
    }

    .shang {
        height: 50%;
        width: 100%;
        left: 0;
        top: 0;
        position: absolute;
    }

    .xia {
        height: 50%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: 2px;
    }

    .Modal {
        width: 100%;
        height: 50%;
        opacity: 0.8;
        background-color: #222222;
        position: absolute;
    }

    .modal {
        width: 100%;
        height: 50%;
        opacity: 0.8;
        background-color: #222222;
        position: absolute;
    }

    .lightRotate {
        transform: rotate(45deg);
    }

    .lineRotate {
        transform: rotate(57.883deg);
    }

    .info-enter, .info-leave-active {
        opacity: 0;
        transform: translatey(-100%);
    }

    .info-enter-active, .info-leave-active {
        transition: all .5S ease
    }

    .info1-enter, .info1-leave-active {
        opacity: 0;
        transform: translatey(100%);
    }

    .info1-enter-active, .info1-leave-active {
        transition: all .5S ease
    }
</style>
