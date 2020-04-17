<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout  >
            <template slot="viewBox" slot-scope="viewBox">
                <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=0">
                <div class="content" >
                    <div id="title" class="title_text">植物生长需要的无机盐</div>
                    <div class="btn_box" id="btn_box" :style="{zoom :zoom1}">
                        <div  class="btn_box_list" v-for="(item, index) in textArr" :key="index">
                            <button :class="{an_niu: have, 'bulecomplete': index === ishave}"
                                    v-text="item"
                                    @click="getEvent(index)"
                            ></button>
                        </div>
                    </div>
                    <div class="bj"><img src="./sub_static/UI/0.png"></div>
                    <div class="box" id="box" :style="{zoom :zoom1}">
                             <div class="left">
                                 <div class="img_lf_nomal" v-if="nomal_0"><img src="./sub_static/UI/2.png"></div>
                                 <div class="img_lf_k" v-if="k_0"><img src="./sub_static/UI/4.png"></div>
                                 <div class="img_lf_p" v-if="p_0"><img src="./sub_static/UI/6.png"></div>
                                 <div class="img_lf_n" v-if="n_0"><img src="./sub_static/UI/8.png"></div>
                             </div>
                             <div class="right">
                                 <div class="right_top">
                                     <div class="img_rg_nomal" v-if="nomal_1"><img src="./sub_static/UI/1.png"></div>
                                     <div class="img_rg_k" v-if="k_1"><img src="./sub_static/UI/3.png"></div>
                                     <div class="img_rg_p" v-if="p_1"><img src="./sub_static/UI/5.png"></div>
                                     <div class="img_rg_n" v-if="n_1"><img src="./sub_static/UI/7.png"></div>
                                 </div>
                                 <div class="right_bottom">
                                     <div class="title__bottom_nomal" v-if="nomal_2">正常叶片</div>
                                     <div class="title__bottom_k" v-if="k_2">缺钾时，植株的茎秆软弱，容易倒伏，叶片边缘和尖端呈褐色，并逐渐焦枯。</div>
                                     <div class="title__bottom_p" v-if="p_2">缺磷时，植株特别矮小，叶片呈暗绿色，并出现紫色。</div>
                                     <div class="title__bottom_n" v-if="n_2">缺氮时，植株矮小瘦弱，叶片发黄。</div>
                                 </div>
                             </div>
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
        src: url('./sub_static/SourceHanSansCN-Regular.otf');
    }
    * {
        margin: 0;
        padding: 0;
        touch-acion : none;
        font-family: fontt !important;
    }
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    img{
        pointer-events: none;
        width: 100%;
        height: 100%;
    }
    ul, ol, li {
        list-style: none;
    }
    .content{
        width: 100%;
        height:100%;
    }
    .title_text {
        margin: 0;
        padding: 0;
        position: absolute;
        top: 3.6%;
        left: 2.3%;
        z-index: 99;
        font-size: 24px;
        line-height: 24px;
        color: #000000;
        font-family: SourceHanSansSC-Medium;
    }
    .btn_box{
        width: 470px;
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content:space-between;
        position: absolute;
        top: 13.9%;
        left: 50%;
        transform: translateX(-50%);
    }
    .btn_box_list{
        width: 142px;
        height: 40px;
    }
    .an_niu{
        width: 100%;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        ont-family: SourceHanSansSC-Medium;
        font-size: 14px;
        line-height: 14px;
        color: #000000;
        border-radius: 19px;
        padding:12px 2px ;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .bulecomplete{
        background: #0291FF;
        border: 1px solid #EBEBEB;
        border-radius: 19px;
        color:#fff ;
    }
   .bj{
       width: 100%;
       height: 100%;
   }
   .box{
       width: 776px;
       height:396px;
       display: flex;
       justify-content: space-between;
       position: absolute;
       top: 26.4%;
       left: 50%;
       transform: translateX(-50%);
   }
    .box .left{
        width: 410px;
        height:394px;
        background: rgba(255,255,255,0.90);
        border: 1px solid #EBEBEB;
        border-radius: 6px;
        position: relative;
    }
    .box .right{
        width: 346px;
        height:396px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }
    .box .right_top{
        width:344px ;
        height: 275px;
        background: rgba(255,255,255,0.90);
        border: 1px solid #EBEBEB;
        border-radius: 6px;
        position: relative;
    }
    .box .right_bottom{
        width:344px ;
        height: 101px;
        background: rgba(255,255,255,0.90);
        border: 1px solid #EBEBEB;
        border-radius: 6px;
        position: relative;
    }
    /*正常植物的样式*/
    .img_lf_nomal{
        width: 377px;
        height: 353px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .img_rg_nomal{
        width: 284px;
        height: 82px;
        position: absolute;
        top: 65%;
        left: 50%;
        transform: translate(-50%, -65%);
    }
    .title__bottom_nomal{
        margin-top: 11px;
        margin-left: 18px;
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #000000;
        text-align: justify;
        line-height: 28px;
    }
    /*缺少k的植株*/
    .img_lf_k{
        width: 286px;
        height: 338px;
        position: absolute;
        top: 50%;
        left: 20%;
        transform: translate(-20%, -50%);
    }
   .img_rg_k{
       width: 275px;
       height: 89px;
       position: absolute;
       top: 60%;
       left: 50%;
       transform: translate(-50%, -60%);
   }
    .title__bottom_k{
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #000000;
        text-align: justify;
        line-height: 28px;
        padding: 10px 15px;
    }
    /*缺少p的植株*/
    .img_lf_p{
        width: 214.6px;
        height: 207px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .img_rg_p{
        width: 205px;
        height: 56px;
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -55%);
    }
    .title__bottom_p{
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #000000;
        text-align: justify;
        line-height: 28px;
        padding: 10px 15px;
    }
    /*缺少n的植株*/
    .img_lf_n{
        width: 261.5px;
        height: 247.8px;
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -60%);
    }
    .img_rg_n{
        width: 239px;
        height: 59px;
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -55%);
    }
    .title__bottom_n{
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #000000;
        text-align: justify;
        line-height: 28px;
        padding: 10px 15px;
    }

</style>
