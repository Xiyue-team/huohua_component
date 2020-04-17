<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">合成氨反应条件的优化——压强</div>
                <section>
                    <div class="left_box">
                        <img class="equation" src="./sub_static/UI/equation.png">
                    </div>
                    <div class="center_box">
                        <div id="shell" class="shell">
                            <img ondragstart="return false" src="./sub_static/UI/shell.png">
                            <p id="pressure">{{message}}</p>
                        </div>
                        <img class="container" src="./sub_static/UI/container.png">
                        <img id="animation" class="animation" :src="molecularMotion">
                        <div class="line"></div>
                    </div>
                    <div class="right_box">
                        <div class="molecular">
                            <img src="./sub_static/UI/NH4.png">
                            <p>NH₃</p>
                        </div>
                        <div class="molecular">
                            <img src="./sub_static/UI/H2.png">
                            <p>H₂</p>
                        </div>
                        <div class="molecular">
                            <img src="./sub_static/UI/N2.png">
                            <p>N₂</p>
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
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import {ViewController} from '../../../../src/core/ViewController';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import {PressureViewHandler} from './services/PressureViewHandler';
    import {ViewOption} from '../../../../src/core/CoreInterface';
    import * as firstGif from './sub_static/animation/0.gif';
    import * as secondGif from './sub_static/animation/1.gif';
    export default Vue.extend({
        components: {
            fullScreensLayout,
        },
        data() {
            return {
                title: '合成氨反应条件的优化——压强',
                message: '压 强',
                molecularMotion: null,
                timer1: null,
                arr: [],
                store: [],
            };
        },
        computed: {},
        created() {
            this.arr = [];
            this.store = [];
            for (let i = 0; i < 6; i++) {
                this.arr.push(i);
            }
            const promises = this.arr.map((value, index) => {
                const gif = require(`./sub_static/animation/${index}.gif`);
                this.molecularMotion = gif;
                return this.preloadImage(`${this.molecularMotion}`).then((animation) => {
                    this.store[index] = animation;
                });
            });
            Promise.all(promises).then(() => {
            });

            this.molecularMotion = firstGif;
            this.timer1 = setTimeout(() => {
                this.molecularMotion = secondGif;
                clearTimeout(this.timer1);
            }, 4750);
            const viewOption = new ViewOption();
            viewOption.mobilePanelAlpha = true;
            viewOption.showMobileExpandIco = false;
            ViewController.getInstance(new PressureViewHandler(this), viewOption);
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
            ViewController.getInstance().domReady();
        },
        methods: {
            preloadImage (path: string) {
                return new Promise((resolve, reject) => {
                    const animation = new Image();
                    animation.onload = () => resolve(animation);
                    animation.onerror = reject;
                    animation.src = path;
                });
            },
            reset() {
                clearTimeout(this.timer1);
            },
        },
        watch: {
            value (v: number) {
                const dom = document.getElementById('animation');
                dom.appendChild(this.store[v]); //先添加后删除 入栈速度略高于出栈
                if (this.store[v]) {
                    dom.removeChild(dom.firstChild);
                }
            }
        }
    });
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
        font-weight: 700;
        color: #000000;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
    }

    section {
        display: flex;
        width: 90%;
        height: 80%;
        margin: 30px auto;
    }

    .left_box {
        position: fixed;
        width: 55px;
        height: 27px;
        top: 72px;
        left: 24px;
    }

    .left_box img {
        display: block;
        width: auto;
        height: 100%;
        margin: auto 0;
        background-size: 100% 100%;
    }

    .center_box {
        /*width: 40%;*/
        width: 60%;
        height: 90%;
        margin: auto;
        margin-top: 5%;
        margin-left: 20%;
        position: relative;
    }

    .center_box .shell {
        position: absolute;
        width: 100%;
        height: 44%;
        top: 0;
        left: 0;
        text-align: center;
    }

    .center_box .shell p {
        font-size: 24px;
        font-weight: 700;
        color: #000000;
        position: absolute;
        top: 9.5%;
        left: 50%;
        transform: translateX(-50%);
    }

    .center_box .shell img {
        display: block;
        width: auto;
        height: 100%;
        position: absolute;
        cursor: pointer;
        left: 50%;
        transform: translateX(-50%);
    }

    .center_box .container {
        display: block;
        width: auto;
        height: 64%;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    .center_box .line {
        width: 70%;
        border: solid black;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    .center_box .animation {
        display: block;
        /*width: 60%;*/
        width: 52%;
        /*width: auto;*/
        height: auto;
        /*height: 45%;*/
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);

    }

    @media (min-width: 1024px ) {
        .center_box .animation {
            width: 62%;
        }
    }

    @media (min-width: 1900px ) {
        .center_box .animation {
            width: 53%;
        }
    }

    @media (max-width: 800px) {
        .left_box {
            width: 40px;
            height: 20px;
        }
    }

    .right_box {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 20%;
        height: 50%;
        margin: auto;
    }

    .right_box .molecular {
        width: 100%;
        height: 100%;
        margin-top: 2%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-weight: 600;
        font-size: 120%;
    }

    .right_box .molecular img {
        float: left;
        width: 20%;
        height: auto;
        margin-right: 5%;
    }

</style>
