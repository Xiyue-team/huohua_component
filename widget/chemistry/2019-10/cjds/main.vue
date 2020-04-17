<template>
    <div class="aspectration bg_white root_div_container">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div id="3dContainer" class="Container" style="position: absolute; width: 100%; height: 100%; left: 0;background: #383838">
                </div>

                <div class="switch reaction_button buttonStyle" v-show="isShow">
                    <input type="checkbox" id="reaction_button" @click="buttonEvent">
                    <label for="reaction_button" class="checkboxText">
                        <span class="text on">{{buttonText}}</span>
                        <span class="text off">{{buttonText}}</span>
                    </label>
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
            fullScreensLayout
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
    .buttonStyle{
        position: absolute;
        right: 38px;
        bottom: 68px;
        cursor: pointer;
        -webkit-user-select: none;
    }
    .switch input[type="checkbox"] + label:before {
        width: 108px;
        height: 40px;
        border-radius: 21px;
    }

    .switch input[type="checkbox"] + label:after {
        width: 36px;
        height: 36px;
        margin-right: 48px;
    }

    .switch input[type="checkbox"]:checked + label:before {
        background-color: #0091FF;
    }

    .switch input[type="checkbox"]:checked + label:after {
        margin-right: 2px;
    }

    .switch input[type="checkbox"]:checked + label .off {
        display: none;
    }

    .switch input[type="checkbox"]:checked + label .on {
        display: block;
    }

    .reaction_button {
        position: absolute;
        width: 108px;
        height: 45px;
        border-radius: 21px;
        font-size: 16px;
        color: #525252;
        text-align: center;
        line-height: 14px;
        margin-top: 156px;
    }

    .text {
        position: absolute;
        font-size: 16px;
    }

    .off {
        margin-left: 50px;
        line-height: 25px;
        color: #525252;
        display: block;
    }
    .on {
        margin-left: 16px;
        color: #FFFFFF;
        line-height: 24px;
        display: none;
    }

    @media screen and (max-width: 610px), screen and (max-height: 610px) {
        .title_text {
            top: 12px;
            left: 12px;
            line-height: 18px;
            font-size: 18px;
        }
        .buttonStyle{
            transform: scale(.7);
            right: 10px;
            bottom: 15px;
        }
    }
    @media screen and (max-width: 250px), screen and (max-height: 250px) {
        .title_text {
            top: 12px;
            left: 12px;
            line-height: 16px;
            font-size: 16px;
        }
        .buttonStyle{
            transform: scale(.5);
            right: -10px;
            bottom: 0px;
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
    @media screen and (max-width: 250px), screen and (max-height: 250px) {
        .control_div_resetBtn {
            right: 0px;
            top: 0;
            transform: scale(0.5);
        }
    }
    .control-panel_div_floatRight{
        display: none;
    }
</style>