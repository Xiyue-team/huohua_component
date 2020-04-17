<template>
    <fullScreensLayout>
        <template slot="viewBox" slot-scope="viewBox">
            <div class="function_image">
                <div class="title_text">{{title}}</div>

                <div class="graphic">
                    <img src="./sub_static/axis.png"/>
                    <img src="./sub_static/point.png" v-show="isFormulaSelect" style="z-index: 1"/>
                    <img src="./sub_static/line.png" v-show="isButtonClick && isFormulaSelect"/>
                    <div v-for="item in graphics" class="graphic">
                        <img :src="item.src" v-show="item.visiable"/>
                    </div>
                    <div v-for="(point,index) in points">
                        <img :src="point.src" v-show="isButtonClick && formulas[index].visiable "/>
                    </div>
                </div>

                <div class="formula">
                    <div v-for="(item, index) in formulas" class="formula_container">
                        <div type="radio" :class="item.visiable?'radio_selected':'radio_no_selected'"
                             @click="getGraphic(index)"/>
                        <img :src="item.src"/>
                    </div>
                    <button :class="isButtonClick && isFormulaSelect?'button_selected': ''" @click="getPoint()">{{button}}
                    </button>
                </div>

            </div>
        </template>
    </fullScreensLayout>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import {ViewModel} from './ViewModel';
    import Component from 'vue-class-component';

    @Component({
        components: {
            fullScreensLayout,
        },
        mixins: [ViewModel]
    })
    export default class App extends Vue {
    }
</script>

<style scoped='scoped'>
    .function_image {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #2c2c2c;
    }

    .graphic img {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        max-width: 100%;
        max-height: 100%;
    }

    .title_text {
        font-size: 24px;
        color: #FFFFFF;
        transparent: true;
        line-height: 24px;
        margin: 0;
        position: absolute;
        top: 24px;
        left: 24px;
    }

    .formula {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 70%;
        right: 0;
        margin: auto;

        width: 230px;
        /*height: 600px;*/
        height: 325px;
    }

    .formula_container {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .formula img {
        height: 45px;
        margin-left: 25px;
    }

    .radio_no_selected {
        border: 2px solid #979797;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        z-index: 10;
        cursor: pointer;
    }

    .radio_selected {
        background: #0199FF;
        border: 2px solid #FFFFFF;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        z-index: 10;
        cursor: pointer;
    }
    @media (max-height: 675px) and (max-width: 1024px)  {
        .formula {
            width: 115px;
            height: 162px;
        }

        .formula_container {
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .formula img {
            height: 30px;
            margin: -5px 0 0 8px;
        }

        button{
            width: 80px!important;
            height: 32px!important;
            border-radius: 16px!important;
            font-size: 14px!important;
            margin: 20px 0 0 12px!important;
        }

        .radio_no_selected {
            height: 13px;
            width: 13px;
        }

        .radio_selected {
            height: 13px;
            width: 13px;
        }
    }

    button{
        position: absolute;
        width: 104px;
        height: 42px;
        background: #EBEBEB;
        border-radius: 21px;
        text-align: center;
        font-size: 16px;
        margin: 20px 0 0 48px;
        z-index: 99;
    }

    .button_selected{
        background: #00AAFF;
        color: #E5F5FD;
    }
</style>

