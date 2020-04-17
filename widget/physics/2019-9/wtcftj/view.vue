<template>
    <div class="aspectration bgc root_div_container" data-ratio="16:9">
        <div  class="control-panel_div_content fill_parent">
            <div class="title">{{title}}</div>
            <div id="2dContainer" class="container">
                <canvas id="canvas"></canvas>
            </div>
            <div :class="[isMobile ? 'mcontrol' : 'control']">
                <img 
                    v-if="index === 1"
                    @click="chooseSubstance(1)"
                    :class="[isMobile ? 'mcbutton' : 'cbutton']"
                    src="./sub_static/btn1_clicked.png">
                <img 
                    v-else
                    @click="chooseSubstance(1)"
                    :class="[isMobile ? 'mcbutton' : 'cbutton']"
                    src="./sub_static/btn1.png">
                <img
                    v-if="index === 2"
                    @click="chooseSubstance(2)"
                    :class="[isMobile ? 'mcbutton' : 'cbutton']"
                    src="./sub_static/btn2_clicked.png">
                <img 
                    v-else
                    @click="chooseSubstance(2)"
                    :class="[isMobile ? 'mcbutton' : 'cbutton']"
                    src="./sub_static/btn2.png">
                <img
                    v-if="index === 3"
                    @click="chooseSubstance(3)"
                    :class="[isMobile ? 'mcbutton' : 'cbutton']"
                    src="./sub_static/btn3_clicked.png">
                <img 
                    v-else
                    @click="chooseSubstance(3)"
                    :class="[isMobile ? 'mcbutton' : 'cbutton']"
                    src="./sub_static/btn3.png">
                <div :class="[isMobile ? 'mswitch' : 'switch']">
                    <span>{{switchText}}</span>
                    <div class="switch-con" @click="changeShowForces" :class="[showForces ? 'on' : '']">
                        <div class="switch-btn" :class="[switchDisabled ? 'disabled' : '']"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import Component from 'vue-class-component';
    import { ViewModel } from './ViewModel';

    @Component({
        components: {
            fullScreensLayout
        },
        mixins: [ViewModel]
    })
    export default class App extends Vue {
    }
</script>
<style scoped>
    .bgc {
        background: -webkit-linear-gradient(left, #19222d , #1a222d); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #19222d, #1a222d); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #19222d, #1a222d); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #19222d , #1a222d); /* 标准的语法 */
    }
    .title{
        font-size: 24px;
        color: #fff;
        line-height: 40px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 20px;
        left: 24px;
    }
    .container {
        width: 65%;
        height: calc(100% - 60px);
        position: absolute;
        top: 60px;
        left: 0;
    }
    .control {
        width: 300px;
        height: 348px;
        position: absolute;
        top: calc(50% + 60px);
        left: calc(65% + 150px);
        margin-top: -174px;
        z-index: 9;
    }
    .mcontrol {
        width: 150px;
        height: 244px;
        position: absolute;
        top: calc(50% + 60px);
        left: calc(65% + 60px);
        margin-top: -122px;
        z-index: 9;
    }
    .cbutton {
        width: 192px;
        height: 76px;
        border-radius: 76px;
        margin-bottom: 20px;
        cursor: pointer;
    }
    .mcbutton {
        width: 96px;
        height: 38px;
        margin-bottom: 20px;
        border-radius: 38px;
        cursor: pointer;
    }
    .switch {
        position: absolute;
        bottom: 0;
        left: 0;
    }
    .switch > span {
        float: left;
        height: 30px;
        line-height: 30px;
        color: #fff;
        padding-right: 20px;
        font-size: 20px;
        font-weight: 600;
    }
    .mswitch > span {
        float: left;
        height: 15px;
        line-height: 15px;
        color: #fff;
        padding-right: 10px;
        font-size: 14px;
        font-weight: 600;
    }
    .switch .switch-con {
        float: left;
        width: 80px;
        height: 30px;
        background: #B3B3B3;
        border-radius: 30px;
        position: relative;
        cursor: pointer;
        transition: all .5s;
        -moz-transition: all .5s;	/* Firefox 4 */
        -webkit-transition: all .5s;	/* Safari 和 Chrome */
        -o-transition: all .5s;
    }
    .mswitch .switch-con {
        float: left;
        width: 40px;
        height: 15px;
        background: #B3B3B3;
        border-radius: 15px;
        position: relative;
        cursor: pointer;
        transition: all .5s;
        -moz-transition: all .5s;	/* Firefox 4 */
        -webkit-transition: all .5s;	/* Safari 和 Chrome */
        -o-transition: all .5s;
    }
    .switch .switch-btn {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #fff;
        position: absolute;
        top: 2px;
        left: 2px;
        transition: left .5s;
        -moz-transition: left .5s;	/* Firefox 4 */
        -webkit-transition: left .5s;	/* Safari 和 Chrome */
        -o-transition: left .5s;
    }
    .mswitch .switch-btn {
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: #fff;
        position: absolute;
        top: 2px;
        left: 2px;
        transition: left .5s;
        -moz-transition: left .5s;	/* Firefox 4 */
        -webkit-transition: left .5s;	/* Safari 和 Chrome */
        -o-transition: left .5s;
    }
    .switch .switch-btn.disabled {
        background: #ccc;
        cursor: not-allowed;
    }
    .mswitch .switch-btn.disabled {
        background: #ccc;
        cursor: not-allowed;
    }
    .on {
        background: #0091FF!important;
    }
    .on .switch-btn {
        left: 52px!important;
    }
    .mswitch .on .switch-btn {
        left: 27px!important;
    }
</style>