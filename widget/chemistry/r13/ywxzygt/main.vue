<template>
    <div class='aspectration bg_white covered root_div_container '>
        <leftAndRightLayout>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                    <div style="margin-top: 68px; width: 140px;font-size:20px;margin-left: 50px">
                        <div style="width: 16px; height: 16px; border-radius: 50%;background-color: #FF7746;display: inline-block" id="gXiang"></div>
                        <span id="text">重叠型构象</span>
                    </div>

                    <img src="./sub_static/circle.png"
                         style="width: 180px; height: 180px;position: relative;left: 30px;top: 35px;" class="circle"
                         ondragstart="return false;" id="circleImg"/>

                    <div id="arrowImg" class="arrowRotate"
                         style="width: 19px; height: 160px;position: absolute;top: 157px;left: 130.5px;">
                        <img id="arrow" src="./sub_static/arrow.png" style="width: 19px; height: 86px;padding-top: 5px;"
                             ondragstart="return false;">
                    </div>

                    <div id="kCanvas" style="width: 240px; height: 200px; position: absolute;top: 147px;">

                        <!--旋转指针-->

                    </div>

                    <div style="width: 240px; height: 180px;position: relative;margin-top: 100px">
                        <img src="./sub_static/group.png" style="width: 240px; height: 180px"/>

                        <!--konva  sprite图-->
                        <i id="waveImg" class="wave"></i>
                    </div>
                </div>
            </template>
            <template slot="viewBox" slot-scope="viewBox">
                 <span id="title" class="title_text"
                       style="margin-top: 24px;margin-left: 24px;position: absolute;font-size: 24px;color: #000000">乙烷旋转异构体</span>
                <div id="3dContainer" style="width: 100%;height: 100%;">
                    <canvas id="renderCanvas" style="width: 100%;height: 100%;"></canvas>
                </div>
            </template>
        </leftAndRightLayout>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import './sub_static/css/main.css';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import {EthaneViewHandler} from './services/EthaneViewHandler';
    import {ViewController} from '../../../../src/core/ViewController';
    import leftAndRightLayout from '../../../../src/component/layout/leftAndRight_layout.vue';

    export default Vue.extend({

        data() {
            return {
            };
        },
        components: {leftAndRightLayout},

        created() {
            ViewController.getInstance(new EthaneViewHandler(this));
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },

        mounted() {
            ViewController.getInstance().domReady();
        },
    });
</script>

<style scoped='scoped'>

    .wave {
        display: block;
        width: 0px;
        height: 47px;
        background: url("./sub_static/wave.png") 0 0 no-repeat;
        background-size: cover;
        position: absolute;
        top: 75.4px;
        left: 37.3px
    }

    .arrowRotate {
        transform: rotate(0deg);
    }

</style>
