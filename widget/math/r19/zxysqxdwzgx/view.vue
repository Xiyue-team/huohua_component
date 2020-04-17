<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">直线与双曲线的位置关系</div>
                <div class="formStyle" v-bind:class="{'formMobileStyle': isMobile}">
                    <img src="./sub_static/form.png" alt="" class="imageStyle" v-bind:class="{'imageMobileStyle': isMobile}">
                    <div>
                        <div class="formStyle4" v-bind:class="{'formStyleMobile4': isMobile}">{{slope}}</div>
                        <div class="formStyle1" v-bind:class="{'formStyleMobile1': isMobile}">{{delta}}</div>
                        <div class="formStyle2" v-bind:class="{'formStyleMobile2': isMobile}">{{position}}</div>
                        <div class="formStyle3" v-bind:class="{'formStyleMobile3': isMobile}">{{intersection}}</div>
                    </div>
                </div>
                <div id="3dContainer" style="width: 100%;height: 100%; ">
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" class="buttonControlStyle">
                    <div @click="button">
                        <buttonPrimary class="button1" v-bind:title="newTitle" type="ellipse" v-bind:actived="color" v-bind:class="{'buttonMobileStyle': isMobile}">
                        </buttonPrimary>
                    </div>
                    <img src="./sub_static/image.png" alt="" class="image" v-show="isShow" v-bind:class="{'imageMobileStyle1': isMobile}">
                </div>
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import '../../../../src/assets/css/core.css';
  import '../../../../src/assets/css/layout.css';
  import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
  import Component from 'vue-class-component';
  import { ViewModel } from './ViewModel';
  import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
  @Component({
    components: {
        fullScreensLayout, buttonPrimary
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}

</script>

<style scoped="scoped">
    .title_text{
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .button1 {
        width: 72px;
        height: 42px;
        margin-bottom: 24px;

    }
    .buttonControlStyle {
        display: flex;
        align-items: flex-end;
        flex-direction: column-reverse;
        width: 100%;
        height: 100%;
    }
    .image {
        width: 260px;
        height: 318px;
        margin-bottom: 63px;
    }

    .formStyle {
        margin: 0;
        padding:0;
        position: absolute;
        background: #fff;
        top:60px;
        left:24px;
        width: 280px;
        height: 72px;
    }

    .formMobileStyle {
        margin: 0;
        padding:0;
        position: absolute;
        background: #fff;
        top:60px;
        left:24px;
        width: 140px;
        height: 36px;
    }

    .formStyle4 {
        background: #fff;
        width: 90px;
        height: 34px;
        position: absolute;
        top: 38px;
        left: 1px;
        line-height: 35px;
        text-align: center;
    }

    .formStyleMobile4 {
        width: 45px;
        height: 16px;
        top: 19px;
        left: 1px;
        line-height: 16px;
        text-align: center;
        font-size: 12px;
    }

    .formStyle1 {
        background: #fff;
        width: 90px;
        height: 34px;
        position: absolute;
        top: 38px;
        left: 95px;
        line-height: 35px;
        text-align: center;
    }

    .formStyleMobile1 {
        width: 45px;
        height: 16px;
        top: 19px;
        left: 48px;
        line-height: 16px;
        text-align: center;
        font-size: 12px;
    }

    .formStyle2 {
        background: #fff;
        width: 90px;
        height: 34px;
        position: absolute;
        top: 38px;
        left: 190px;
        line-height: 35px;
        text-align: center;
    }

    .formStyleMobile2 {
        width: 44px;
        height: 16px;
        top: 19px;
        left: 95px;
        line-height: 16px;
        text-align: center;
        font-size: 12px;
    }

    .formStyle3 {
        background: #fff;
        width: 90px;
        height: 34px;
        position: absolute;
        top: 38px;
        left: 285px;
        line-height: 35px;
        text-align: center;
    }

    .formStyleMobile3 {
        width: 44px;
        height: 16px;
        top: 19px;
        left: 144px;
        line-height: 16px;
        text-align: center;
        font-size: 12px;
    }
    .imageStyle {
        width: 378px
    }

    .imageMobileStyle {
        width: 189px;
    }

    .buttonMobileStyle {
        margin-bottom: 0px;
    }
    .imageMobileStyle1 {
        width: 130px;
        height: 159px;
        margin-bottom: 12px;
    }

</style>
