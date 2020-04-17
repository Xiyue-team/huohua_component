<template>
  <div class="aspectration bg_white covered root_div_container " style="background: #53585F">
      <fullScreensLayout >
              <template slot="viewBox" slot-scope="viewBox" >
                  <div class="title_text"></div>
                  <div id="3dContainer" class="storyContainer">
                     <canvas id="storyCanvas" width="100%" height="100%"></canvas>
                      <div id="backgroundDiv">
                          <div style="background: linear-gradient(#8DC3D2, #6A94AC); "></div>
                          <div style="background: #8EC3D1"></div>
                          <div style="background: #C3EAF3"></div>
                          <div style="background: #8ACEBD"></div>
                          <div style="background: #66AF9C"></div>
                      </div>
                  </div>
                  <div v-show="showTip" class="tip_container">
                      <img src="./sub_static/tipBg@2x.png">
                      <div class="tip_desc">点击正确的地鼠可以获取金币</div>
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

@Component({
  components: {
    fullScreensLayout
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
</style>


<style>
    .tip_container  {
        position: absolute;
        width: 724px;
        height: 150px;
        top: calc( 50% - 75px);
        left: calc( 50% - 362px );
        z-index: 2;
    }

    .tip_container img {
        width: 100%;
        height: 100%;
    }
    .tip_desc {
        position: absolute;
        width: 100%;
        text-align: center;
        left:50%;    /* 定位父级的50% */
        top:50%;
        transform: translate(-50%,-50%);
        font-size: 44px;
        color: #FFFFFF;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 2s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
.absolute {
    position: absolute;
    left: 0;
    top: 0;
}
.topPic {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
}

.view_div_content {
    display: flex;
}
#backgroundDiv{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 0;
}
#backgroundDiv div{
    width: 100%;
}

.storyContainer {
    margin: auto;
}
.view_div_content {

}

</style>
