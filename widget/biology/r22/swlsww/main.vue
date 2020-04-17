<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout :style="{zoom:zoom1}">
            <template slot="viewBox" slot-scope="viewBox">
                <div class="head">
                    <div id="title" class="title_text">食物链与食物网</div>
                </div>
                <div class='fullS'>                    
                    <div class='leftPanel' id="leftPanel">    
                        <div class='topBox' id="topBox" v-show="mainPage">
                            <div class="tishi" v-if="tishi">拖动形成食物链</div>
                            <div class="case_one">
                                <div class='topImgContent'
                                v-for="(item, index) in imgArr"
                                :key = index
                                :id = "'topMinDiv' + index"
                            >
                                <img class="topDivImg" :src="item.src" v-show="item.src" ondragstart="return false" v-text="item.text">
                                <div class="shanchu_box" @click="delete_1(index)" :id="'delete' + index">
                                    <img src="./sub_static/shanchu.png" class="shanchu">
                                </div>
                                </div>
                            </div>
                            <div class="case_two"> 
                                <div class='topImgContent'
                                v-for="(item, index) in imgArr1"
                                :key = "index + 'index'"
                                :id = "'topMinDiv1' + index"                                
                            >
                                <img class="topDivImg" :src="item.src" v-show="item.src" ondragstart="return false" v-text="item.text">
                                <div class="shanchu_box"  @click="delete_2(index)"  :id="'delete1' + index">
                                    <img src="./sub_static/shanchu.png" class="shanchu">
                                </div>
                                </div>
                            </div>
                            <div class="case_three"> 
                                <div class='topImgContent'
                                v-for="(item, index) in imgArr2"
                                :key = "index + 'index'"
                                :id = "'topMinDiv2' + index"                                
                            >
                                <img class="topDivImg" :src="item.src" v-show="item.src" ondragstart="return false" v-text="item.text">
                                <div class="shanchu_box"  @click="delete_3(index)"  :id="'delete2' + index">
                                    <img src="./sub_static/shanchu.png" class="shanchu">
                                </div>
                                </div>
                            </div>
                            <div class="tasks_arrows" v-show="caseShow1" id="tasks_arrows">
                                <img src="./sub_static/jiantou.png">
                            </div>
                            <div class="batterylow_arrows" id="batterylow_arrows" v-show="caseShow2">
                                <img src="./sub_static/jiantou.png">
                            </div>
                        </div>
                        <div class="gif" v-show = "gif_ani">
                            <img src="./sub_static/all.png" class="draw_png">
                            <img src="" id="gif_src" class="line_ani">
                        </div>
                        <div class="tishiImg">
                            <img :src="tishiImg" v-show="realOrerror">
                        </div>
                    </div>
                    <div class="rightPanel">
                        <div class="imgBox" v-show="pC">
                            <div class="chioceImgBox"
                                 v-for="(item, index) in allImagArr"
                                 :key = 'index'
                                 :id = "'div' + index">
                                <img class="img"
                                     :src="item"
                                     :id ="'image' + index"
                                     ondragstart="return false"
                                >
                                <div class="text" :id = "'textText' + index">
                                   <div class="textText">{{textArr[index]}}</div>
                                </div>
                            </div>
                        </div>
                        <button :class="{foodCycle: have, 'bulecomplete': ishave1}" @click="foodCycle">食物链</button>
                        <button :class="{complete: have, 'bulecomplete': ishave2}" @click="complete" v-if="allradey">完成</button>
                        <button :class="{foodWeb: have, 'bulecomplete': ishave3}" @click=" foodWeb">食物网</button>
                    </div>
                </div>
                <div style="width: 100%; height: 100%" class="box">
                    <div id="3dContainer" style="margin: auto;width: 100%;height: 100%">
                    </div>
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

<style>
.control_div_resetBtn{
    top: 8px!important;
}
.control-panel_div_floatRight{
    height:0!important;
}
.control_div_mobileResetBtn{
    top: -5px;
    right: -5px;
    transform: scale(0.75)!important;
}
    .head{
        width: 100%;
        height: 5%;
    }
.title_text{
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: white;
    line-height: 24px;
    line-height: 24px;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 24px;
    left: 24px;
    z-index: 8;
}
.mainPage{
    width:100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color:#515151;
    z-index: 1;
}
.fullS{
    width:100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
    .leftPanel{
        width: 80%;
        height: 100%;
        float: left;
        position: relative;
    }
    .rightPanel{
        width: 20%;
        height: 100%;
        float: left;
        display:table-cell; 
        text-align:center; 
        vertical-align:middle;
        position: absolute;
        right: 0;
        background-color: #515151;
        border-left: 1px solid rgba(0,0,0,0.5);
    }
    
    .topBox{
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: nowrap;
        background-color: #515151;
    }

    .gif{
        width: 100%;
        height: 100%;
    }
    .gif>img{
        width: 100%;
        height: 100%;
    }

    #gif_src{
        width: 100%;
        height: 100%;
    }

    .draw_png,
    .line_ani
    {
        position: absolute;
        top: 0; 
        left: 0;
    }

    .case_one,
    .case_two,
    .case_three
    {
        width: 770px;
        height: 108px;
        position: absolute;
        top: 15%;
        left: 12%;
        display: flex;
    }
    .case_two{
        top: calc(15% + 216px)!important;
    }
    .case_three{
        top: calc(15% + 432px)!important;
    }
   .tasks_arrows,
   .batterylow_arrows
   {
       width: 108px;
       height: 108px;
       position: absolute;
       top: calc(15% + 108px);
       left: calc(12% + 648px);
       border-radius: 8px;
   }
   .tasks_arrows>img
   {
       width: 100%;
       height: 100%;
       transform: rotate(90deg);
   }
   .batterylow_arrows>img{
       width: 100%;
       height: 100%;
       transform: rotate(90deg);
   }
   .batterylow_arrows{
       left: 12%;
       top: calc(15% + 324px)!important;
   }
    .topImgContent
    {
        width: 108px;
        height: 108px;
        display: flex;
        border-radius: 8px;
    }
    .imgBox{
        width: 180px;
        height:550px;
        position: absolute;
        left: 50%;
        margin-top: 140px;
        transform: translateX(-50%);
    }
    .img{
        width: 100%;
        height: 100%;
    }
    .chioceImgBox{
        width: 72px;
        height: 72px;
        margin: 16px 8px;
        float: left;
    }
    .textText{
        width: 72px;
        height: 14px;
        margin-top: 7px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #525252;
        text-align: center;
        line-height: 14px;
    }
    .topDivImg{
        width: 100%;
        height: 100%;
    }

   .tishi{
       width: 30%;
       height: 10%;
       top: 50%;
       left: 35%;
       position: relative;
       font-family: PingFangSC-Regular;
       font-size: 16px;
       color: #B8B8B8;
       text-align: center;
       line-height: 18px;
   }
   .foodCycle,
   .foodWeb
   {
       width: 120px;
       height: 40px;
       position: absolute;
       bottom: 100px;
       left: 50%;
       transform: translateX(-50%);
       font-family: PingFangSC-Medium;
       font-size: 14px;
       color: #000000;
       background: #FFFFFF;
       border: 1px solid #EBEBEB;
       border-radius: 19px;
       z-index: 1;
   }
   .foodWeb{
       bottom: 30px;
   }
   .complete{
       width: 100px;
       height: 40px;
       position: absolute;
       bottom: 50px ;
       right: 350px;
       color: black;
       background: #FFFFFF;
       border: 1px solid #EBEBEB;
       border-radius: 19px;
       z-index: 1;
   }

   .bulecomplete{
       background-color: #1E90FF;
   }

   .tishiImg{
       width: 400px;
       height: 225px;
       position: absolute;
       top: calc(50% - 112.5px);
       left: calc(80% - 400px);
       opacity: 0.9;
   }

   .tishiImg>img{
       width: 100%;
       height: 100%;
   }

   .shanchu_box{
       width: 30px;
       height: 30px;
       position: relative;
       top:-8px;
       left: -20px;
       visibility: hidden;
       cursor: pointer;
       z-index: 2;
   }
    .shanchu_box>img{
        width:30px;
        height: 30px;
   }
    @media (max-width: 1000px) {
        .imgBox{
            width: 80%;
            height: 68%;
            transform: translateX(-42%);
            margin-top: 160px;
        }
    }
 @media (min-width: 1000px) and (max-width: 1200px){
        .complete{
            bottom: 50px;
            right: 300px;
        }
        .case_one,
        .case_two,
        .case_three,
        .batterylow_arrows
        {
            left: 5%;
        }
        .tasks_arrows
        {
            left: calc(5% + 648px);
        }
        }
        @media (max-height: 350px){
         .imgBox{
            transform: translateX(-45%);
            width: 63%;
        }
        .foodCycle
        {
            bottom: 30vh;
            right: 48vh;
        }
        .foodWeb{
            bottom: 10vh;
            right: 48vh;
        }
        .complete{
            bottom: 15vh;
            right: 140vh;
        }
        }
</style>