<template>
    <div class="aspectration bg_white covered root_div_container ">
        <fullScreensLayout :style="{zoom:zoom1}">
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_induction">真核生物与原核生物</div>
                <div id="box">
                    <div class="allBox" id="allBox">
                        <div class="case">
                            <div class="box1" id="box1">
                                <div class="textBoox1">真核生物</div>
                                <div class="minBoox1"
                                     v-for = "(item,index) in imgArr "
                                     :key = "index"
                                     :id = "'leftMinDiv'+index"
                                     >
                                    <img class="divImg" :src ="item.src" v-show ="item.src"   v-if="hidenName === 1">
                                    <p v-text="item.text" v-if="textName===1"></p>
                                </div>
                            </div>
                            <div class="box2" id="box2">
                                <div class="textBoox1">原核生物</div>
                                <div class="minBoox2"
                                     v-for = "(item,index) in imgArr1"
                                     :key = "index"
                                     :id = "'rightMinDiv'+index">
                                    <img class="divImg" :src="item.src" v-show="item.src" v-if="hidenName === 1">
                                    <p v-text="item.text" v-if="textName===1"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                     
                    <div class="ImgBox">
                        <div class="choiceImgBox">
                            <div class="one"
                                 v-for = "(item,index) in allImagArr"
                                 :key = "index"
                                 :id = "'div'+index">
                                <img
                                    class="img"
                                    :id="'image'+index"
                                    :src="item"
                                    ondragstart = 'return false'
                                    >
                                <div class="text">
                                    <div class="textTexee" v-if="CName === 1">{{textArr[index]}}</div>
                                </div>
                            </div>
                        </div>
                </div>
                </div>
            </template>

            <template slot="controlPanel" slot-scope="controlPanel">
                <div  id="controlPanel" >
                    <!-- <div class="button_border " style="display:inline-block;width:48px;height:40px;position: absolute;top:20px;right:24px;" id="reset">
                        <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="../../../../static/images/chongzhi.png" alt="" @click="reset">
                    </div> -->
                </div>
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import "../../../../src/assets/css/core.css";
    import "../../../../src/assets/css/layout.css";
    import { ZhswyyhswViewHandler } from "./services/ZhswyyhswViewHandler";
    import { ViewController } from "../../../../src/core/ViewController";
    import {ViewOption} from "../../../../src/core/CoreInterface";
    import fullScreensLayout from "../../../../src/component/layout/fullScreens_layout.vue";
    import * as mirrorLeft1 from './sub_static/1.png';
    import * as mirrorLeft2 from './sub_static/2.png';
    import * as mirrorLeft3 from './sub_static/3.png';
    import * as mirrorLeft4 from './sub_static/4.png';
    import * as mirrorLeft5 from './sub_static/5.png';
    import * as mirrorLeft6 from './sub_static/6.png';
    import * as mirrorLeft7 from './sub_static/7.png';
    import * as mirrorLeft8 from './sub_static/8.png';
    import * as mirrorLeft9 from './sub_static/9.png';
    import * as mirrorLeft10 from './sub_static/10.png';
    import $ from 'jquery-ts';

    export default Vue.extend({
        data(){
            return{
                fromNode: null,
                opacityText:1,
                hidenName:1,
                CName:1,
                zoom1:0,
                textName:1,
                allImagArr:[],
                imgArr:[{src:'', text:''},{src:'', text:''},{src:'', text:''},{src:'', text:''},{src:'', text:''}],
                imgArr1:[{src:'', text:''},{src:'', text:''},{src:'', text:''},{src:'', text:''},{src:'', text:''}],
                obj:{},
                textArr:[
                    '霉菌','蘑菇','念珠藻','双歧杆菌','幽门螺杆菌','金黄色葡萄杆菌','酵母菌','大肠杆菌','草履虫','变形虫'
                ],
            }
        },
        components: {
            fullScreensLayout
        },
        created(){
            const viewOption = new ViewOption();
            viewOption.mobilePanelAlpha = true;
            viewOption.showMobileExpandIco = false;
            viewOption.controlPanelAnimationDelay = 1000;

            
            this.allImagArr.push(mirrorLeft1,mirrorLeft2,mirrorLeft3,mirrorLeft4,mirrorLeft5,mirrorLeft6,mirrorLeft7,mirrorLeft8,mirrorLeft9,mirrorLeft10);
            ViewController.getInstance(new ZhswyyhswViewHandler(this),viewOption);
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted(){
            this.resize();


            window.addEventListener("resize", () => {
                this.resize();
            });
            ViewController.getInstance().domReady();
        }, 
        watch:{

        },
        methods:{
            reset(){
                for(let i=0;i<10;i++){
                    $(`#image${i}`).css({
                        opacity:"1"
                    })
                }
            $(".textTexee").css({opacity:'1'});
            this.imgArr=[{src:'', text:''},{src:'', text:''},{src:'', text:''},{src:'', text:''},{src:'', text:''}]
            this.imgArr1=[{src:'', text:''},{src:'', text:''},{src:'', text:''},{src:'', text:''},{src:'', text:''}]
            },
            dragend(letter: any) {

            const left = document.getElementById('box1').offsetLeft;
            const top = document.getElementById('box1').offsetTop;
            const x = (event as any).clientX - left;
            const y = (event as any).clientY - top;
            (ViewController.getInstance().viewHandler as ZhswyyhswViewHandler).changeLocal(x, y, letter);

        },

            resize() {

                let W1 = window.innerWidth;
                let H1 = window.innerHeight;
                if (W1 / H1 > 1024 / 750) {
                    this.zoom1 = H1 / 650;
                }
                else {
                    this.zoom1 = W1 / 1024;
                }


            }
        }
    })
</script>

<style scoped="scoped">
    .title_induction {
        width: 100%;
        height: 24px;
        margin: 24px 0 0 24px;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #000000;
        line-height: 24px;
    }
    
    .allBox{
        width: 100%;
        height: 248px;
        /*display: flex;*/
        /*justify-content: center;*/
        margin-top: 48px;
    }
    .case{
        width: 774px;
        height: 248px;
        margin: 0 auto;
        position: relative;
    }
    .box1{
        width: 356px;
        height: 248px;
        background: #F6F6F6;
        margin-right: 60px;
        border-radius: 20px;
        float:left;
    }
    .box2{
        width: 356px;
        height: 248px;
        background: #F6F6F6;
        border-radius: 20px;
        float:left;
    }
    .minBoox1,
    .minBoox2{
        width: 72px;
        height: 72px;
        margin: 20px 20px;
        background: #FFFFFF;
        border-radius: 6px;
        float: left;
        position: relative;
    }
    .minBoox1 p,
    .minBoox2 p{
        position: absolute;
        top:80px;
        left:0;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        width: 72px;
        height: 10px;
        color: #525252;
        text-align: center;
        line-height: 14px;
        /*margin-top: 4px;*/
    }
    .textBoox1{
        width: 56px;
        height: 56px;
        margin: 28px 37px;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #333333;
        text-align: center;
        line-height: 28px;
        border-radius: 6px;
        float: left;
    }
    .ImgBox{
        width: 100%;
        margin-top: 4%;
        /* display: inline; */
        height: auto;
    }
    .img{
        width: 72px;
        height: 72px;
    }
    .text{
        width: 72px;
        height: 14px;
    }
    #leftMinDiv2{
        margin-left: 30px;
    }
    #rightMinDiv2{
        margin-left: 30px;
    }
    .textTexee{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        width: 72px;
        height: 10px;
        color: #525252;
        text-align: center;
        line-height: 14px;
        margin-top: 4px;
    }
    .choiceImgBox{
        width: 480px;
        margin: 0 auto;
        /* overflow: hidden; */
    }
    .one{
        width: 72px;
        height: 72px;
        margin: 20px 12px;
        float: left;
    }
    .divImg{
        width: 72px;
        height: 72px;
    }
</style>