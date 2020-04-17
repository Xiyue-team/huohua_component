<template>
  <div class="aspectration bg_white covered root_div_container " style="background: #FDFDFD">
      <fullScreensLayout >
              <template slot="viewBox" slot-scope="viewBox" >
                  <div id="3dContainer" style="position: absolute;width: 100%; height: 100%;z-index: 1; background: #fff">
                      <div class="title_text">{{title}}</div>
                      <div class="imageBox1  imageStyle animateImage" @click="playEvent(1)">
                          <img :src="imageList[0]" ondragstart="return false">
                      </div>
                      <div class="imageBox2 imageStyle animateImage" @click="playEvent(2)">
                          <img :src="imageList[1]" ondragstart="return false"/>
                      </div>
                      <div class="imageBox3 imageStyle animateImage" @click="playEvent(3)">
                          <img :src="imageList[2]" ondragstart="return false"/>
                      </div>
                      <div class="imageBox4 imageStyle animateImage" @click="playEvent(4)">
                          <img :src="imageList[3]" ondragstart="return false"/>
                      </div>
                      <div class="imageBox5 imageStyle animateImage" @click="playEvent(5)">
                          <img :src="imageList[4]" ondragstart="return false"/>
                      </div>
                      <div class="imageBox6 imageStyle animateImage" @click="playEvent(6)">
                          <img :src="imageList[5]" ondragstart="return false"/>
                      </div>
                      <div class="imageBox7 imageStyle animateImage" @click="playEvent(7)">
                          <img :src="imageList[6]" ondragstart="return false"/>
                      </div>
                      <div class="imageBox8 imageStyle animateImage" @click="playEvent(8)">
                          <img :src="imageList[7]" ondragstart="return false"/>
                      </div>

                      <div class="image_swiper" v-show="show_gallery">
                          <div class="swiper-container" id="swiper-container" @click="swiperEvent()">
                              <div class="swiper-wrapper swiper-no-swiping">
                                  <div class="swiper-slide">
                                      <img :src="imageList[0]" ondragstart="return false"/>
                                      <div class="swiperText1 animated ">{{imageTitle[0]}}</div>
                                  </div>
                                  <div class="swiper-slide">
                                      <img :src="imageList[1]" ondragstart="return false"/>
                                      <div class="swiperText2 animated ">{{imageTitle[1]}}</div>
                                  </div>
                                  <div class="swiper-slide">
                                      <img :src="imageList[2]" ondragstart="return false"/>
                                      <div class="swiperText3 animated ">{{imageTitle[2]}}</div>
                                  </div>
                                  <div class="swiper-slide">
                                      <img :src="imageList[3]" ondragstart="return false"/>
                                      <div class=" swiperText4 animated ">{{imageTitle[3]}}</div>
                                  </div>
                                  <div class="swiper-slide">
                                      <img :src="imageList[4]" ondragstart="return false"/>
                                      <div class=" swiperText5 animated ">{{imageTitle[4]}}</div>
                                  </div>
                                  <div class="swiper-slide">
                                      <img :src="imageList[5]" ondragstart="return false"/>
                                      <div class=" swiperText6 animated ">{{imageTitle[5]}}</div>
                                  </div>
                                  <div class="swiper-slide">
                                      <img :src="imageList[6]" ondragstart="return false"/>
                                      <div class=" swiperText7 animated ">{{imageTitle[6]}}</div>
                                  </div>
                                  <div class="swiper-slide">
                                      <img :src="imageList[7]" ondragstart="return false"/>
                                      <div class=" swiperText8 animated ">{{imageTitle[7]}}</div>
                                  </div>
                              </div>
                          </div>
                          <div class="swiper-pagination"></div>
                          <div class="swiper-button-prev btn_left" id="swiper-button-prev" slot="button-prev">
                          </div>
                          <div class="swiper-button-next  btn_right" id="swiper-button-next" slot="button-next">
                          </div>
                      </div>
                  </div>

              </template>

              <template slot="controlPanel" slot-scope="controlPanel">

              </template>
          </fullScreensLayout>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import { ViewModel } from './ViewModel';
import Component from 'vue-class-component';
require('swiper/dist/css/swiper.css');
require('./sub_static/css/animate.css');

@Component({
  components: {
    fullScreensLayout
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text{
        position: absolute;
        top:44%;
        left:25%;
        width:24.8%;
        height: 11.9%;
        font-size: 4vw;
        color: #000;
        background: #fff;
        line-height: 12vh;
        text-align: center;
        z-index: 2;
    }
    .imageBox1{
        position: absolute;
        left: 0;
        top:0;
        width:49.8%;
        height:49.8%;
        cursor: pointer;
    }
    .imageBox2{
        position: absolute;
        left: 0;
        bottom:0;
        width:24.8%;
        height:49.8%;
        cursor: pointer;
    }
    .imageBox3{
        position: absolute;
        left: 25%;
        bottom:0;
        width:24.8%;
        height:49.8%;
        cursor: pointer;
    }
    .imageBox4{
        position: absolute;
        left: 50%;
        top:0%;
        width:24.8%;
        height:49.8%;
        cursor: pointer;
    }
    .imageBox5{
        position: absolute;
        left: 50%;
        bottom:0%;
        width:24.8%;
        height:49.8%;
        cursor: pointer;
    }
    .imageBox6{
        position: absolute;
        right: 0%;
        top:0%;
        width:25%;
        height:33.1%;
        cursor: pointer;
    }
    .imageBox7{
        position: absolute;
        right: 0%;
        top:33.5%;
        width:25%;
        height:33.1%;
        cursor: pointer;
    }
    .imageBox8{
        position: absolute;
        right: 0%;
        bottom:0%;
        width:25%;
        height:33%;
        cursor: pointer;
    }
    .animateImage img{
        width:100%;
        height:100%;
        object-fit: cover
    }
    .image_swiper{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height:100%;
        z-index: 100;
    }
    .swiper-container{
        width: 100%;
        height: 100%;
        background: #fff;
    }
    .swiper-slide img{
        width:100%;
        height:100%;
        cursor: pointer;
        object-fit: cover
    }
    .swiperText1{
        position: absolute;
        top:16.6%;
        left:0;
        width:47%;
        height: 11.9%;
        font-size: 4vw;
        color: #fff;
        background: rgba(0,0,0,0);
        line-height: 12vh;
        text-align: center;
        cursor: pointer;
    }
    .swiperText2{
        position: absolute;
        top:50%;
        left:0;
        width:40%;
        height: 11.9%;
        font-size: 4vw;
        color: #fff;
        background: rgba(0,0,0,0);
        line-height: 12vh;
        text-align: center;
        cursor: pointer;
    }
    .swiperText3{
        position: absolute;
        top:25%;
        right:0%;
        width:47%;
        height: 11.9%;
        font-size: 4vw;
        color: #fff;
        background: rgba(0,0,0,0);
        line-height: 12vh;
        text-align: center;
        cursor: pointer;
    }
    .swiperText4{
        position: absolute;
        top:16.6%;
        left:0;
        width:47%;
        height: 11.9%;
        font-size: 4vw;
        color: #fff;
        background: rgba(0,0,0,0);
        line-height: 12vh;
        text-align: center;
        cursor: pointer;
    }
    .swiperText5{
        position: absolute;
        top:70%;
        right:5%;
        width:47%;
        height: 11.9%;
        font-size: 4vw;
        color: #fff;
        background: rgba(0,0,0,0);
        line-height: 12vh;
        text-align: center;
        cursor: pointer;
    }
    .swiperText6{
        position: absolute;
        top:16.6%;
        left:0;
        width:47%;
        height: 11.9%;
        font-size: 4vw;
        color: #fff;
        background: rgba(0,0,0,0);
        line-height: 12vh;
        text-align: center;
        cursor: pointer;
    }
    .swiperText7{
        position: absolute;
        top:70%;
        left:0;
        width:30%;
        height: 11.9%;
        font-size: 4vw;
        color: #fff;
        background: rgba(0,0,0,0);
        line-height: 12vh;
        text-align: center;
        cursor: pointer;
    }
    .swiperText8{
        position: absolute;
        top:16.6%;
        left:0;
        width:47%;
        height: 11.9%;
        font-size: 4vw;
        color: #fff;
        background: rgba(0,0,0,0);
        line-height: 12vh;
        text-align: center;
        cursor: pointer;
    }
    .btn_left{
        position: absolute;
        left:0;
        top: 0;
        width: 20%;
        height: 100%;
        margin-top: 0;
        background: rgba(0,0,0,0);
        outline:0 none !important;
    }
    .btn_right{
        position: absolute;
        right:0;
        top: 0;
        width: 20%;
        height: 100%;
        margin-top: 0;
        background: rgba(0,0,0,0);
        outline:0 none !important;
    }


    @media screen and (max-width: 610px), screen and (max-height: 610px) {

    }
</style>
<style>
/*.canvas-container {*/
    /*margin: 0 auto;*/
/*}*/
@media screen and (max-width: 610px), screen and (max-height: 610px) {

}
.control_div_resetBtn {
    display: none;
}
.control-panel_div_floatRight{
    display: none;
}
</style>
