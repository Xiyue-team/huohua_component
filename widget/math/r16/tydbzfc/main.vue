<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">椭圆的标准方程</span>
                <transition name="fade">
                    <div v-show="showEquation" class='fight' :style="{zoom:zoom1}">
                        <div>
                        <div :class="{button_text:isactivete, 'text_color1':isactive11}" @click="changeBackground(1)">焦点在x轴上</div>
                        <div :class="{formula:open, 'formula_close':close}" v-if="!initEquation">
                        <div class='floated'>
                            <span class='symbol'>x</span><sup class='symbol1'>2</sup>
                            <div class='line'></div>
                            <span class='symbol symbol_text'>a</span><sup class='symbol1'>2</sup>
                        </div>
                        <div class='floated one'>+</div>
                        <div class='floated'>
                            <span class='symbol2'>y</span><sup class='symbol1'>2</sup>
                            <div class='line1'></div>
                            <span class='symbol2 symbol2_text'>b</span><sup class='symbol1'>2</sup>
                        </div>
                        <div class='floated one'>=</div>
                        <div class='floated one1'>1</div>
                        </div>
                        <div :class="{formula:open, 'formula_close':close}" v-else>
                        <div class='floated'>
                            <span class='symbol'>x</span><sup class='symbol1'>2</sup>
                            <div class='line'></div>
                            <span class='symbol symbol_text'>{{a}}</span><sup class='symbol1'>2</sup>
                        </div>
                        <div class='floated one'>+</div>
                        <div class='floated'>
                            <span class='symbol2'>y</span><sup class='symbol1'>2</sup>
                            <div class='line1'></div>
                            <span class='symbol2 symbol2_text'>{{b}}</span><sup class='symbol1'>2</sup>
                        </div>
                        <div class='floated one'>=</div>
                        <div class='floated one1'>1</div>
                        </div>
                        </div>
                        <div class='right_ping' v-if="!initEquation1">
                        <div :class="{button_text1:isactive, 'text_color':isactive1}" @click="changeBackground(2)">焦点在y轴上</div>
                        <div :class="{formula1:open1, 'formula_close':close1}">
                        <div class='floated'>
                            <span class='symbol'>y</span><sup class='symbol1'>2</sup>
                            <div class='line'></div>
                            <span class='symbol symbol_text'>a</span><sup class='symbol1'>2</sup>
                        </div>
                        <div class='floated one'>+</div>
                        <div class='floated'>
                            <span class='symbol2'>x</span><sup class='symbol1'>2</sup>
                            <div class='line1'></div>
                            <span class='symbol2 symbol2_text'>b</span><sup class='symbol1'>2</sup>
                        </div>
                        <div class='floated one'>=</div>
                        <div class='floated one1'>1</div>
                        </div>
                    </div>
                    <div class='right_ping' v-else>
                        <div :class="{button_text1:isactive, 'text_color':isactive1}" @click="changeBackground(2)">焦点在y轴上</div>
                        <div :class="{formula1:open1, 'formula_close':close1}">
                        <div class='floated'>
                            <span class='symbol'>y</span><sup class='symbol1'>2</sup>
                            <div class='line'></div>
                            <span  class='symbol symbol_text'>{{a}}</span><sup class='symbol1'>2</sup>
                        </div>
                        <div class='floated one'>+</div>
                        <div class='floated'>
                            <span class='symbol2'>x</span><sup class='symbol1'>2</sup>
                            <div class='line1'></div>
                            <span class='symbol2 symbol2_text'>{{b}}</span><sup class='symbol1'>2</sup>
                        </div>
                        <div class='floated one'>=</div>
                        <div class='floated one1'>1</div>
                        </div>
                    </div>
                    </div>
                </transition>
                <div style="width: 100%; height: 100%" class="box">
                    <div id="3dContainer" style="margin: auto;width: 100%;height: 100%">
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
import Vue from 'vue';
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
.title_text {
    ont-family: PingFangSC-Medium;
    font-size: 24px;
    color: #000000;
    line-height: 24px;
    line-height: 24px;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 24px;
    left: 24px;
    z-index: 100;
}
.button_text{
    width: 126px;
    height: 44px;
    top:115px;
    left: 30px;
    position: relative;
    text-align: center;
    line-height: 46px;
    border: 1px solid rgba(0,0,0,0.12);
    border-radius: 21px;
    background: #0199FF;
    border-radius: 21px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #FFFFFF;
    z-index: 100;
}
.text_color1{
    color: #333333 !important;
    background: #FFFFFF !important;
}
.button_text1{
    width: 126px;
    height: 44px;
    top:-80px;
    right: -30px;
    position: relative;
    text-align: center;
    line-height: 46px;
    background: #FFFFFF;
    border: 1px solid rgba(0,0,0,0.12);
    border-radius: 21px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #333333;
    z-index: 100;
}
.text_color{
    color: #FFFFFF !important; 
    background: #0199FF !important;
}
.right_ping{
    float:right;
}
.formula{
    width: 178px;
    height:151px;
    top:130px;
    left:7px;
    background: rgba(255,255,255,0.98);
    border-radius: 25px;
    position: relative;
    z-index: 100;
}
.formula_close{
    opacity: 0.3;
}
.formula1{
    width: 178px;
    height:121px;
    top:-70px;
    right:7px;
    background: rgba(255,255,255,0.98);
    border-radius: 25px;
    position: relative;
    z-index: 100;
}
.line{
    width: 32px;
    margin-left: 25px;
    margin-top: 5px;
    border-top:1px solid black;
}
.line1{
    width: 32px;
    margin-top: 5px;
    border-top:1px solid black
}
.symbol{
    font-style: italic;
    font-family: Times New Roman !important;
    margin-left: 35px;
    margin-top: 70px;
    font-size: 24px;
    color: #000000;
    line-height: 24px;
}
.symbol_text{
    color: #0199FF !important;
}
.symbol2_text{
    color:#D734FF !important;
}
.symbol2{
    font-style: italic;
    font-family: Times New Roman !important;
    margin-left: 10px;
    margin-top: 10px;
    font-size: 24px;
    color: #000000;
    line-height: 24px;
}
.symbol1{
    margin-left: 2px;
    font-family: CambriaMath;
    font-size: 16px;
    color:  #000000;
}
.floated{
    float:left;
}
.one{
    margin-top: 14px;
    margin-left: 7px;
    width: 24px;
    height:33px;
    font-family: STSongti-SC-Regular;
    font-size: 24px;
    color: #000000;   
}
.one1{
    margin-top: 15px;
    font-family: TimesNewRomanPSMT;
    font-size: 24px;
    color: #000000;
}
div#3dContainer{
    position: absolute !important;
    left: 0  !important;
    top:-195px  !important;
}
.box{
     position: absolute !important;
    left: 0  !important;
    top:0  !important;   
}
</style>