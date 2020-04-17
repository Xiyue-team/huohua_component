<template>
  <div class="aspectration bg_white covered root_div_container " style="background: #FDFDFD">
      <fullScreensLayout >
              <template slot="viewBox" slot-scope="viewBox" >
                  <div id="3dContainer" style="position: absolute;width: 100%; height: 100%;z-index: 1; background: #fff">
                      <div class="title_text">{{title}}</div>
                      <div class="imageBox1  imageStyle animateImage" @click="playEvent(1)">
                          <img :src="imageList[0]" ondragstart="return false"/>
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

                      <div class="image_swiper" v-show="show_gallery">
                          <div class="swiper-container" id="swiper-container" @click="swiperEvent()">
                              <div class="swiper-wrapper swiper-no-swiping">
                                  <div class="swiper-slide">
                                      <img :src="imageList[0]" ondragstart="return false"/>
                                      <div id="swiperText1" class="swiperText1 animated ">{{imageTitle[0]}}</div>
                                  </div>
                                  <div class="swiper-slide">
                                      <img :src="imageList[1]" ondragstart="return false"/>
                                      <div id="swiperText2" class="swiperText2 animated ">{{imageTitle[1]}}</div>
                                  </div>
                                  <div class="swiper-slide">
                                      <img :src="imageList[2]" ondragstart="return false"/>
                                      <div id="swiperText3" class="swiperText3 animated ">{{imageTitle[2]}}</div>
                                  </div>
                                  <div class="swiper-slide">
                                      <img :src="imageList[3]" ondragstart="return false"/>
                                      <div id="swiperText4" class=" swiperText4 animated ">{{imageTitle[3]}}</div>
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
        top:44.1%;
        left:50%;
        width:25%;
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
        width:49.6%;
        height:100%;
        cursor: pointer;
    }
    .imageBox2{
        position: absolute;
        left: 50%;
        top:0;
        width:24.6%;
        height:49.8%;
        cursor: pointer;
    }
    .imageBox3{
        position: absolute;
        right: 0;
        top:0;
        width:25%;
        height:49.8%;
        cursor: pointer;
    }
    .imageBox4{
        position: absolute;
        right: 0%;
        bottom:0%;
        width:50%;
        height:49.6%;
        cursor: pointer;
    }
    .imageStyle{
        /*-webkit-transition-property: width height left top;*/
        /*-webkit-transition-duration: 0.5s;*/
        /*-webkit-transition-timing-function: linear;*/
        /*transition-property: width height left top;*/
        /*transition-duration: 0.5s;*/
        /*transition-timing-function: linear;*/
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
    #swiperText1{
        position: absolute;
        top:20%;
        left:0;
        width:47%;
        height: 11.9%;
        font-size: 3vw;
        color: #fff;
        background: rgba(0,0,0,0);
        line-height: 12vh;
        text-align: center;
        cursor: pointer;
    }
    #swiperText2{
        position: absolute;
        top:55%;
        left:0%;
        width:50%;
        height: 11.9%;
        font-size: 3vw;
        color: #fff;
        background: rgba(0,0,0,0);
        line-height: 12vh;
        text-align: center;
        cursor: pointer;
    }
    #swiperText3{
        position: absolute;
        top:20%;
        left:10%;
        width:47%;
        height: 11.9%;
        font-size: 3vw;
        color: #fff;
        background: rgba(0,0,0,0);
        line-height: 12vh;
        text-align: center;
        cursor: pointer;
    }
    #swiperText4{
        position: absolute;
        top:15%;
        right:0%;
        width:50%;
        height: 11.9%;
        font-size: 3vw;
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
