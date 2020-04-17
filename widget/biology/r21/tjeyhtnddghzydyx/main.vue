<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">探究CO<sub>2</sub>浓度对光合作用强度的影响</div>
                <div class="Container" id="3dContainer" :style="{'background-image': 'url(\"" +bg +'\')'} "></div>
                <div class="threeCanvas" id="threeCanvas">
                        <canvas width="50" height="50" id="process" v-show = "show" :style="{zoom:zoom1}"></canvas>
                </div>
                <div class="echarts" id="echarts"></div>                
                <button :class="{'change':ishave}" @click="change(1)" id="button1">0.03%mol/L</button>
                <button :class="{'change':ishave1}" @click="change(2)" id="button2">0.1%mol/L</button>
                <button :class="{'change':ishave2}" @click="change(3)" id="button3">1%mol/L</button>
                <div class = "fullOpacity" id="fullOpacity" v-show = 'opacity'></div>
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
            fullScreensLayout,
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
    .Container{
        background:no-repeat;  
        width:100%;  
        height:100%;  
        background-size:100% 120%;
        background-position-y:-172px;   
        filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='./sub_static/UI/background.png',sizingMethod='scale');  
    }
    .title_text {
        font-size: 24px;
        color: #FFFFFF;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 100;
    }
    .threeCanvas{
        width: 50px;
        height: 50px;
        position: absolute;
        background-color: #4e5866;
        border-radius: 100%;
    }
    .text{
        width: 20.6%;;
        height: 10%;
        position: absolute;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: rgba(255,255,255,0.40);
        text-align: center;
    }
    .echarts{
        width: 22%;
        height: 50%;
        position: absolute;
        top:29%;
        right: 10%;
        z-index: 100;
    }
    .control_div_resetBtn{
        z-index: 1000!important;
    }
    .fullOpacity{
        width:100%;
        height:100%;
        position: absolute;
        top:0;
        right: 0;
        background: linear-gradient(to bottom left, #808080, #000000);
        opacity: 0.5;
        z-index: 1;
    }
    button{
        width:100px;
        height:36px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        line-height: 36px;
        text-align: center;
        color:white;
        border:1px solid white;
        border-radius: 18.5px;
        position: absolute;
        background-color: rgb(25, 25, 27);
        z-index: 1000;
    }

    .change{
        background-color: white!important;
        color: black!important;
    }
    
    @media(max-width: 900px) {
        button{
            width:50px;
            height:18px;
            font-size: 8px;
            line-height: 18px;
        }
        .Container{
        background-position-y:-66px;    
    }
        .echarts{
            left: 65%!important;
            top:14.5%!important;
            width: 35%!important;
            height: 75%!important;
        }
    .text{
        font-size: 12px!important;
    }
    .threeCanvas{
      width:25px;
        height:25px;
    }
    }
    @media(min-width: 900px) and (max-width: 1300px){
        button{
            width:80px;
            height:22px;
            font-size: 12px;
            line-height: 22px;
        }
        .Container{
        background-size:100% 140%;
        background-position-y:-268px!important;    
    }
    .threeCanvas{
        width:25px;
        height:25px;
    }
    .text{
        font-size: 12px!important;
    }
    .echarts{
            width: 30%!important;
            right:5%;
        }
    }
    @media (max-height: 300px) {
        .Container{
        background-position-y:-50px!important;    
    }
    }
</style>
