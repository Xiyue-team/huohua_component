<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=0">
                <div id="title" class="title_text">血液循环系统</div>
                <div class="content" id="content" >
                    <img src="./sub_static/UI/bj.png" style="width: 100%;height: 100%"  v-show="showBj" >
                    <div class="buttonBox" id="buttonBox" >
                        <div  :class="{an_niu: have, checked:isChecked1}" @click="getEvent(0)">
                            <button >标注</button>
                        </div>
                        <div  :class="{an_niu: have, checked:isChecked2}"  @click="getEvent(1)">
                            <button >循环</button>
                        </div>
                    </div>
                    <div class="txt" v-show="isChecked1" >
                        <img src="./sub_static/UI/tx.png" style="width: 100%;height: 100%">
                    </div>
                    <div class="playGif" >
                        <img id="playGifId"  src=""  v-show="showGif" style="width: 100%;height: 100%">
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
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import Component from 'vue-class-component';
    import {MainVueComponent} from './mainVueComponent';
    @Component({
        components: {
            fullScreensLayout,
        },
    })
    export default class App extends MainVueComponent {
    }
</script>

<style scoped="scoped">
    @font-face
    {
        font-family: fontt;
        src: url('sub_static/zt/SourceHanSansCN-Regular.otf')
    }
    * {
        margin: 0;
        padding: 0;
        font-family: fontt !important;
    }
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    ul, ol, li {
        list-style: none;
    }
    .content{
        height:100%;
        width:100%;
    }
    .title_text {
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
        font-size: 24px;
        line-height: 24px;
        color: #FFF;
        text-align: center;
    }
    .buttonBox{
        width: 104px;
        height: 94px;
        position: absolute;
        bottom: 4.4%;
        right: 2.3%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        z-index: 999;
    }
    .an_niu{
        width: 102px;
        height: 38px;
        cursor: pointer;
    }
    .an_niu>button{
        width: 100%;
        border-radius: 21px;
        padding: 11px 0px;
        font-size: 14px;
        color: #000000;
        line-height: 14px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
    }
    .checked >button{
        background: #0291FF;
        border: 1px solid #EBEBEB;
        border-radius: 21px;
        color: #fff;
    }
   .txt{
       width: 35.9%;
       height: 93.8%;
       position: absolute;
       top: 2.1%;
       left: 31.64%;
       z-index: 999;
   }
    /*关于gif的样式*/
    .playGif{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

</style>
