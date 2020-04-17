<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <leftAndRightLayout>
            <template slot="viewBox" scope="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text" v-bind:class="{ title_text2: showTitleText2 }">生命系统结构层次</span>
                <div style="width: 100%; height: 100%; display: flex">
                    <div  id="3dContainer" style="margin: auto;width: 100%;height: 100%">

                    </div>
                </div>

                <div class="nameText1 fontStyle" v-show="showNameText === 0">生物圈</div>
                <div class="nameText2 fontStyle" v-show="showNameText === 1">生态系统</div>
                <div class="nameText3 fontStyle" v-show="showNameText === 2">种群和群落</div>
                <div class="nameText4 fontStyle" v-show="showNameText === 3">个体</div>
                <div class="nameText5 fontStyle" v-show="showNameText === 4">系统</div>
                <div class="nameText6 fontStyle" v-show="showNameText === 5">器官</div>
                <div class="nameText7 fontStyle" v-show="showNameText === 6">组织</div>
                <div class="nameText8 fontStyle" v-show="showNameText === 7">细胞</div>
            </template>
            <template slot="controlPanel" scope="viewBox" slot-scope="controlPanel">
            </template>
        </leftAndRightLayout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import h_button from '../../../../src/component/ui/buttonEllipse.vue';
    import leftAndRightLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import Component from 'vue-class-component';
    import { ViewModel } from './ViewModel';

    @Component({
      components: {
        h_button,
        leftAndRightLayout,
      },
      mixins: [ViewModel]
    })
    export default class App extends Vue {}
</script>

<style scoped="scoped">
    body{
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }

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

    .title_text2 {
        color: #ffffff;
    }

    .fontStyle {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
        line-height: 44px;
    }

    .nameText1 {
        width: 88px;
        height: 44px;
        background: rgba(255,255,255,0.24);
        border-radius: 2px;
        position: absolute;
        top: 46.4%;
        right: 17%;
    }

    .nameText2 {
        width: 104px;
        height: 44px;
        background: rgba(0,0,0,0.30);
        border-radius: 3px;
        position: absolute;
        top: 9.4%;
        left: 0;
        right: 0;
        margin: auto;
    }

    .nameText3 {
        width: 120px;
        height: 44px;
        background: rgba(0,0,0,0.72);
        border-radius: 3px;
        position: absolute;
        top: 9.4%;
        left: 0;
        right: 0;
        margin: auto;
    }

    .nameText4 {
        width: 72px;
        height: 44px;
        background: rgba(0,0,0,0.3);
        border-radius: 3px;
        position: absolute;
        top: 9.4%;
        left: 0;
        right: 0;
        margin: auto;
    }

    .nameText5 {
        width: 72px;
        height: 44px;
        background: rgba(0,0,0,0.3);
        border-radius: 3px;
        position: absolute;
        top: 9.4%;
        left: 0;
        right: 0;
        margin: auto;
    }

    .nameText6 {
        width: 72px;
        height: 44px;
        background: rgba(0,0,0,0.3);
        border-radius: 2px;
        position: absolute;
        top: 46.4%;
        right: 17%;
    }

    .nameText7 {
        width: 72px;
        height: 44px;
        background: rgba(0,0,0,0.72);
        border-radius: 3px;
        position: absolute;
        top: 9.4%;
        left: 0;
        right: 0;
        margin: auto;
    }

    .nameText8 {
        width: 72px;
        height: 44px;
        background: rgba(0,0,0,0.3);
        border-radius: 3px;
        position: absolute;
        top: 9.4%;
        left: 0;
        right: 0;
        margin: auto;
    }
</style>
