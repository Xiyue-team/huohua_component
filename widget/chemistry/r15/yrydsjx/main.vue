<template>
  <div class="aspectration covered root_div_container ">
    <fullScreensLayout :style="{zoom:zoom}">
      <template slot="viewBox" slot-scope="viewBox">
        <div class="title_induction">盐溶液的酸碱性</div>
        <div class="formula">
            <img src="./sub_static/images/gongshi1.png" v-if='displayHiden == 1'>
            <img src="./sub_static/images/gongshi2.png" v-if='displayHiden == 2'>
            <img src="./sub_static/images/gongshi3.png" v-if=' displayHiden == 3'>
        </div>
        <div id="box" style="width: 100%; height: 100%">
    <div class="container">
    <div class="control">
        <div class="one">
        <div class="buttonImag" @click="handelColor(1)" >
            <img src="./sub_static/images/03.png" v-if='clickChangeImag1==1'>
            <img src="./sub_static/images/03-1.png" v-if='clickChangeImag1==2'>
        </div>
        <div class="buttonImag" @click="handelColor(2)">
            <img src="./sub_static/images/04.png" v-if='clickChangeImag2==1'>
            <img src="./sub_static/images/04-1.png" v-if='clickChangeImag2==2'>
        </div>
        <div class="buttonImag" @click="handelColor(3)">
            <img src="./sub_static/images/05.png" v-if='clickChangeImag3==1'>
            <img src="./sub_static/images/05-1.png" v-if='clickChangeImag3==2'>
        </div>
        </div>
    </div>
    <div class="allImg">
        <div class="case" v-bind:style="{ 'background-image': 'url(\'' + img2+'\')' }" >
            <div class="allBoxImag" id="case" v-bind:style="{ 'background-image': 'url(\'' + img1+'\')' }" >
                <img src="./sub_static/images/01.png" class="allBoxImag">
            </div>
        </div>
    </div>
    </div>
        </div>
      </template>

      <template slot="controlPanel" slot-scope="controlPanel">
        <div  id="controlPanel" >
        </div>
      </template>
    </fullScreensLayout>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import {ViewController} from '../../../../src/core/ViewController';
import {YrydsjxViewHandler} from './services/YrydsjxViewHandler';
import {ViewOption} from "../../../../src/core/CoreInterface";
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import $ from 'jquery-ts'

export default Vue.extend({

    data() {
        return{
            displayHiden: 1,
            zoom:0,
            clickChangeImag1:2,
            clickChangeImag2:1,
            clickChangeImag3:1,
            arr:[],
            store:[],
            arr1 : [],
            store1 : [],
            store2 : [],
            store3 : [],
            value:0,
            num:0,
            timer:null,
            time:0,
            img1:'',
            img2:'',
            timer1:null
        };
    },
    components: {
        fullScreensLayout,
    },

    created() {
        this.arr = [];
        this.arr1 = [];
        this.store = [];
        this.store1 = [];
        this.store2 = [];
        this.store3 = [];
        for (let i = 0; i < 96; i++) {

            this.arr.push(i);
        }
        for (let i = 0; i < 80; i++) {
            this.arr1.push(i);
        }
            let promises = this.arr.map((value, index) => {
                const img1 = require(`./sub_static/images1/${value}.png`);
                return this.preloadImage(img1).then((image) => {
                    this.store1[index] = image;

                })
            });
            Promise.all(promises).then(() => {
                let promises = this.arr.map((value, index) => {
                    const img2 = require(`./sub_static/images2/${value}.png`);
                    return this.preloadImage(img2).then((image) => {
                        this.store2[index] = image;

                    })
                });
                Promise.all(promises).then(() => {
                    let promises = this.arr1.map((value, index) => {
                        const img3 = require(`./sub_static/images3/${value}.png`);
                        return this.preloadImage(img3).then((image) => {
                            this.store3[index] = image;

                        })
                    });
                    Promise.all(promises).then(() => {
                        this.store = this.store1

                    });
                });

            });
        
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        viewOption.controlPanelAnimationDelay = 1000;

        ViewController.getInstance(new YrydsjxViewHandler(this),viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();

    },

    mounted() {
        this.loop();
        ViewController.getInstance().domReady();

        const bgImg1 = require('./sub_static/images/01.png');
        const bgImg2 = require('./sub_static/images/02.png');
        this.img1 = bgImg1;
        this.img2 = bgImg2;
        this.getViewSize();
    },

    watch: {
            value(v: number) {
                let case_dom = document.getElementById('case');
                this.num = v;
                if (this.store[v]) {
                    case_dom.appendChild(this.store[v]);
                    this.store[v].style.width='100%';
                    this.store[v].style.height='100%';
                    case_dom.removeChild(case_dom.firstChild);
                }
    }
    },

    methods: {
        loop () {
             clearTimeout(this.timer);
             if(this.clickChangeImag1 === 2){
             clearTimeout(this.timer1);    
             this.store = this.store1;
             this.value = 0;
             this.time = 83;
             this.play(83,96);

             this.timer1 = setTimeout(() => {
               this.loop();
             }, 7968);
           } else if(this.clickChangeImag2 === 2){
               clearTimeout(this.timer1);
             this.store = this.store2;
             this.value = 0;
             this.time = 83;
             this.play(83,96);

             this.timer1 = setTimeout(() => {
               this.loop();
             }, 7968);
           } else if(this.clickChangeImag3 === 2){
               clearTimeout(this.timer1);
             this.store = this.store3;
             this.value = 0;
             this.time = 100;
             this.play(100,80);

             this.timer1 = setTimeout(() => {

               this.loop();
             }, 8000);
           }
             
        },
        //窗口大小改变
        getViewSize() {
                const W = window.innerWidth;
                const H = window.innerHeight;
                if (W / H >= 1024 / 576) {
                   
                        this.zoom = H / 780
                    
                } else {
                   
                        this.zoom =  W / 1080
                }
            },

       handelColor(index:number):void{
           if(index ===1){
                this.clickChangeImag1 = 2;
                this.clickChangeImag2 = 1;
                this.clickChangeImag3 = 1;
                this.loop();
                this.displayHiden = 1;

                $('.img0').css("opacity","1");
                $('.img1').css("opacity","0");
                $('.img2').css("opacity","0");
           }
               if(index===2){
                this.displayHiden = 2;
                this.clickChangeImag1 = 1;
                this.clickChangeImag2 = 2;
                this.clickChangeImag3 = 1;
                this.loop();

                $('.img0').css("opacity","0");
                $('.img1').css("opacity","1");
                $('.img2').css("opacity","0");
               }
                if(index===3){
                this.displayHiden = 3;
                this.clickChangeImag1 = 1;
                this.clickChangeImag2 = 1;
                this.clickChangeImag3 = 2;
                this.loop();

                $('.img0').css("opacity","");
                $('.img1').css("opacity","0");
                $('.img2').css("opacity","1");
                }
            },

        play(time:number,n:any) {
            if (this.value === n) {
                clearTimeout(this.timer);
                return;
            }
            this.value ++;
            this.timer = setTimeout(this.play, this.time);

        },

        reset(){
                this.displayHiden = 1;
                this.handelColor(1);
        },
        preloadImage(path:any) {
            return new Promise((resolve, reject) => {
                let image = new Image();
                image.src = path;
                image.onload = () => resolve(image);
                image.onerror = reject;
            })
        }
    }
    });
</script>

<style>
   .title_induction{
        width: 100%;
        height:50px;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        font-weight: bold;
        color: #000000;
        line-height: 50px;
        position: absolute;
        left: 24px;
        top: 24px;
  }

   .container{
        width:100%;
        height: calc(100% - 76px);
  }

    canvas{
        width:100%;
        height: 100%;
  }

 .control{
        width: 100%;
        height: 50px;
        margin-top: 120px;
        text-align: center;
 }

 .formula{
        width: 710px;
        height: 30px;
        position: absolute;
        top:80px;
}
.formula>img{
        position: absolute;
        left: 24px;
        width: auto;
        height: 100%;
}

.one{
        width: 459px;
        height: 50px;
        margin: 0 auto;
}

.buttonImag{
        width: 106px;
        height: 50px;
        outline: none;
        margin: 0 20px 0 25px;
        float: left;
    }
.buttonImag>img{
        width: 106px;
        height: 50px;
        /* position: absolute; */
    }

.allImg{
        width: 100%;
        height: 100%;
    }
.allBoxImag{
        width: 457px;
        height: 297px;
        margin: 0 auto;
        background-repeat: no-repeat;
        background-size: cover;
        background-position:bottom center;
        position: absolute;
        bottom: 0;
    }
.case{
        width: 459px;
        height: 382px;
        margin: 30px auto;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        position: relative;
  }
.allImg .box img{
          width: 100%;
          height: 100%;
          position: absolute;
          opacity: 0;
      }
.view_div_content{
      background-color: #d9d9d9!important;
  }
</style>
