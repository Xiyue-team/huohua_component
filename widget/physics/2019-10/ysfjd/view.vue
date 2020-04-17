<template>
    <div class="aspectration bgc root_div_container" data-ratio="16:9">
        <div  class="control-panel_div_content fill_parent">
            <div class="title">{{title}}</div>
            <div id="2dContainer" class="container" :class="[isMobile ? 'mcontainer' : '']">
                <canvas id="canvas"></canvas>
            </div>
            <div class="options" :class="[isMobile ? 'moptions' : '']">
                <div class="consistence" :class="[isMobile ? 'mLeft': '']">
                    <span>{{concentration}}</span>
                    <div class="consistence-cover">
                        <button class="btn" :class="[consistence == 0 ? 'on' : '']" :disabled="disabled" @click="changeConsistence(0)">{{low}}</button>
                        <button class="btn" :class="[consistence == 1 ? 'on' : '']" :disabled="disabled" @click="changeConsistence(1)">{{medium}}</button>
                        <button class="btn" :class="[consistence == 2 ? 'on' : '']" :disabled="disabled" @click="changeConsistence(2)">{{high}}</button>
                    </div>
                </div>
                <div class="switch" :class="[isMobile ? 'mLeft': '']">
                    <span>{{switchText}}</span>
                    <div class="switch-con" @click="changeShow" :class="[show ? 'on' : '']">
                        <div class="switch-btn"></div>
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
    export default class App extends Vue {}
</script>
<style scoped>
    .bg {
        position: absolute;
        width: 100%;
        height: 100%;
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
        width: 60%;
        height: calc(100% - 60px);
        position: absolute;
        top: 60px;
        left: 0;
    }
    .mcontainer {
        width: 50%;
    }
    .options {
        width: 40%;
        height: calc(100% - 60px);
        position: absolute;
        top: 60px;
        right: 0;
        box-sizing: border-box;
    }
    .moptions {
        width: 50%;
    }
    .mLeft {
        left: 40px!important;
    }
    .consistence {
        position: absolute;
        height: 30px;
        top: 50%;
        left: 100px;
        margin-top: -60px;
    } 
    .consistence .consistence-cover {
        float: left;
        height: 30px;
        padding: 2px;
        background-color: #ececec;
        border-radius: 34px;
    }
    .consistence .btn {
        width: 40px;
        height: 30px;
        border-radius: 30px;
        background-color: #ececec;
        font-size: 20px;
        text-align: center;
        line-height: 30px;
        color: #6b6b6b;
    }
    .consistence .btn.on {
        color: #fff;
        background-color: #0091FF;
    }
    .consistence > span {
        float: left;
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 20px;
        margin-right: 20px;
    }
    .consistence .consistence-tips {
        width: 150px;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #fff;
        position: absolute;
        right: 0;
        bottom: 30px;
    }
    .consistence .consistence-tips > span {
        float: left;
        width: 50px;
        text-align: center;
    }
    .switch {
        position: absolute;
        top: 50%;
        left: 100px;
        z-index: 9;
        margin-top: 60px;
    }
    .switch > span {
        float: left;
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 20px;
        margin-right: 20px;
    }
    .switch .switch-con {
        float: left;
        width: 60px;
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
    .switch .switch-btn {
        width: 26px;
        height: 26px;
        border-radius: 50px;
        background: #fff;
        position: absolute;
        top: 2px;
        left: 2px;
        transition: left .5s;
        -moz-transition: left .5s;	/* Firefox 4 */
        -webkit-transition: left .5s;	/* Safari 和 Chrome */
        -o-transition: left .5s;
    }
    .on {
        background: #0091FF!important;
    }
    .on .switch-btn {
        left: 32px!important;
    }
    .bgc {
        background: #303c51;
    }
</style>