<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout  >
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">植物的水分运输途径</div>
                <div class="contents" :style="{'background-image': 'url(\"" + bg +'\')'} ">
                      <div class="btn" @click="getEvent()" v-if="show"><img src="./sub_static/UI/play.png"></div>
                      <div class="tree">
                          <img src="./sub_static/UI/tree.png">
                          <div class="flash-tree" v-if="isTrue"  >
                              <img src='./sub_static/UI/tree_arrow.webp' v-if="webp" id="webpId">
                              <img src='./sub_static/UI/tree_arrow.gif'  v-if="gif"  id="gifId">
                          </div>
                          <!--叶子的小按钮-->
                          <div class="btn_1" v-if="isShow" @click="getShow(1)" :class="{checked:isChecked1}"></div>
                          <div class="leaf" v-if="isShow1">
                              <img class="big" src="./sub_static/UI/leaf_t.png">
                              <div class="small">
                                  <img class="small" src='./sub_static/UI/leaf.webp' v-if="webp">
                                  <img class="small" src='./sub_static/UI/leaf.gif'  v-if="gif" >
                              </div>

                          </div>
                          <!--茎的小按钮-->
                          <div class="btn_2" v-if="isShow" @click="getShow(2)" :class="{checked:isChecked2}"></div>
                          <div class="stem" v-if="isShow2">
                              <img class="big" src="./sub_static/UI/stem_t.png">
                              <div class="small">
                                  <img class="small" src='./sub_static/UI/stem.webp' v-if="webp">
                                  <img class="small" src='./sub_static/UI/stem.gif'  v-if="gif">
                              </div>
                          </div>
                          <!--根部的小按钮-->
                          <div class="btn_3" v-if="isShow" @click="getShow(3)" :class="{checked:isChecked3}"></div>
                          <div class="root" v-if="isShow3">
                              <img class="big" src="./sub_static/UI/root_t.png">
                              <div class="small">
                                  <img class="small" src='./sub_static/UI/root.webp' v-if="webp">
                                  <img class="small" src='./sub_static/UI/root.gif'  v-if="gif">
                              </div>
                          </div>
                      </div>
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
    * {
        margin: 0;
        padding: 0;
    }
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    ul, ol, li {
        list-style: none;
    }
    .title_text {
        line-height: 33px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
        font-size: 24px;
        color: #000000;
        text-align: justify;
        background-size: 100% 100%;
    }
    .contents {
        position: relative;
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
    }
    .contents .tree{
        width: 39vw;
        height: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        position: relative;
    }
    img{
        width: 100%;
        height:100%;
        display: block;
    }
    .contents .btn{
        width: 60px;
        height: 60px;
        position: absolute;
        right: 2vw;
        bottom: 2vw;
        cursor: pointer;
        z-index: 11;
    }
    .contents .flash-tree{
        z-index: 9;
        width: 39vw;
        height: auto;
        position: absolute;
        top: 0;
        left:0
    }
   .btn_1{
       width: 1.2vw;
       height: 1.2vw;
       cursor:pointer;
       background: #FFFFFF;
       border: 3px solid #0291FF;
       border-radius:1vw ;
       box-shadow: 0 0 10px 0 #0291FF;
       position: absolute;
       top: 5vw;
       left: 25vw;
       z-index: 10;
       background-size: 100% 100%;
   }
    .btn_2{
        width: 1.2vw;
        height: 1.2vw;
        cursor:pointer;
        background: #FFFFFF;
        border: 3px solid #0291FF;
        border-radius:1vw ;
        box-shadow: 0 0 10px 0 #0291FF;
        position: absolute;
        top: 20.5vw;
        left:19.05vw;
        z-index: 10;

    }
    .btn_3{
        width: 1.2vw;
        height: 1.2vw;
        cursor:pointer;
        background: #FFFFFF;
        border: 3px solid #0291FF;
        border-radius:1vw ;
        box-shadow: 0 0 10px 0 #0291FF;
        position: absolute;
        top: 40vw;
        left: 19.5vw;
        z-index: 10;
    }
    .checked{
        background: #0199FF;
        border: 3px solid #FFFFFF;
        box-shadow: 0 0 10px 0 #FFFFFF;
        border-radius:1vw ;
    }
    /*叶子的动画的样式*/
  .leaf{
      width: 31.2vw;
      height: auto;
      position: absolute;
      top: 5.7vw;
      left: 26.50vw;
      z-index: 11;
  }
    .leaf .big{
        position: relative;
        z-index: 10;
        background-size: 100% 100%;
    }
    .leaf .small{
        width:23.475vw ;
        height: auto;
        position: absolute;
        left: 0.605vw;
        bottom:0.58vw;
    }
    /*茎部的动画的样式*/
  .stem{
      width: 40vw;
      height: auto;
      position: absolute;
      top: 10.9vw;
      right: 19.9vw;
      z-index: 11;
  }
    .stem .big{
        position: relative;
        z-index: 10;
    }
    .stem .small{
        width:23.25vw ;
        height: auto;
        position: absolute;
        left: 4.05vw;
        bottom:0.6vw;
    }
    /*根部的动画的样式*/
    .root{
        width: 40vw;
        height: auto;
        position: absolute;
        top: 8.88vw;
        left: 21vw;
        z-index: 11;
    }
    .root .big{
        position: relative;
        z-index: 10;
    }
    .root .small{
        width:23.5vw ;
        height: auto;
        position: absolute;
        left: 3.1vw;
        top:1.67vw;
    }
    /*适配移动端设备*/
    @media (max-height: 450px) {
        .title_text {
            font-size: 16px;
            line-height: 16px;
            left: 8px;
        }
        .leaf{
            top: 5.8vw;
            left: 26.8vw;
        }
        .leaf .small{
            left: 0.610vw;
            bottom:0.58vw;
        }
        .stem{
            top: 10.98vw;
            right: 19.9vw;
        }
        .stem .small{
            left: 4.05vw;
            bottom:0.60vw;
        }
    }
    @media (max-height: 360px) {
        .leaf .small{
            left: 0.67vw;
            bottom:0.6vw;
        }
        .root{
            top: 8.88vw;
            left: 21.5vw;
        }
        .stem .small{
            left: 4.05vw;
            bottom:0.7vw;
        }
    }
    @media (max-height: 320px) {
        .leaf{
            top: 5.9vw;
            left: 26.8vw;
        }
        .leaf .small{
            left: 0.61vw;
            bottom:0.56vw;
        }
        .stem{
            top: 11.1vw;
            right: 19.9vw;
        }
        .stem .small{
            left: 4.05vw;
            bottom:0.6vw;
        }
        .root{
            top: 9.2vw;
            left: 21.2vw;
        }
        .btn_2{
            top: 20.5vw;
            left:18.8vw;
        }
    }

</style>
