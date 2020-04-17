<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout >
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">椭圆的标准方程、图形、几何性质</div>
                <section>
                    <div class="picture_box">
                        <img class="ellipsePicture" :src="ellipsePicture">
                        <transition name="fade">
                            <div class="picture_box_cover" v-show="isShowCover"></div>
                        </transition>
                        <div class="button-box1" v-show="isShow==='yes'">
                            <ul>
                                <li v-for="(item, index) in items" :key = 'index'>
                                    <button @click="getFirstEvent(index)">{{item}}</button>
                                </li>
                            </ul>
                        </div>
                        <div class="button-box2" @click="getSecondEvent" v-show="isShow==='no'">
                        </div>
                    </div>
                </section>
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
    import {MainVueComponent} from './mainVueComponent.ts';

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
        font-size: 28px;
        color: #000000;
        line-height: 24px;
        font-weight: 700;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 2;
    }

    section {
        display: flex;
        width: 100%;
        /*margin-top: 20px;*/
        /*height: calc(100% - 20px);*/
        height: 100%;
        position: relative;
        align-items: center;
    }

    .picture_box {
        width: 90%;
        /*height: 90%;*/
        position: relative;
        margin-left: 5%;
        z-index: 0;
        /*border: 1px solid grey;*/
    }

    .picture_box img {
        display: block;
        width: 90%;
        margin: auto;
        background-size: 100% 100%;
    }

    .button-box1 {
        width: 11.4%;
        height: 100%;
        margin-left: 44.3%;
        top: 10%;
        position: absolute;
        /*z-index: 1;*/
    }

    .button-box1 ul {
        display: block;
        width: 100%;
        height: 90%;
    }

    .button-box1 ul li {
        display: block;
        width: 100%;
        height: 7.1%;
    }

    .button-box1 ul li button {
        display: block;
        width: 100%;
        height: 100%;
        margin-top: 13.4%;
        border-radius: 100px;
        opacity: 0;
    }

    .button-box2 {
        width: 5%;
        height: 65%;
        margin-left: 47.5%;
        top: 25%;
        position: absolute;
        z-index: 1;
        /*border: 1px solid grey;*/
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.8s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .picture_box_cover {
        background: white;
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 120%;
    }

</style>
