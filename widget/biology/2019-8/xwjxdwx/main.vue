<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <div id="title" class="title_text">{{title}}</div>
        <div id="slide" @click="getChange(1)" v-show="icon!=1"></div>
        <div id="slide2" @click="getChange(2)" v-show="icon!=2"></div>
        <div id="slide3" @click="getChange(3)" v-show="icon!=3"></div>

        <div id="slide1" v-show="icon!=1"></div>
        <div id="slide21" v-show="icon!=2"></div>
        <div id="slide31" v-show="icon!=3"></div>

        <p id="text1">{{textall[0]}}</p>
        <p id="text2">{{textall[1]}}</p>
        <p id="text3" v-show="text===0">{{textall[2]}}</p>
        <p id="text4" v-show="text===1">{{textall[3]}}</p>
        <div id="3dContainer" class="Container"></div>
      </template>
      <template slot="controlPanel" slot-scope="controlPanel"></template>
    </fullScreensLayout>
  </div>
</template>

<script lang="ts">
import "../../../../src/assets/css/core.css";
import "../../../../src/assets/css/layout.css";
import fullScreensLayout from "../../../../src/component/layout/fullScreens_layout.vue";
import Component from "vue-class-component";
import { MainVueComponent } from "./mainVueComponent.ts";
@Component({
  components: {
    fullScreensLayout
  }
})
export default class App extends MainVueComponent {}
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

ul,
ol,
li {
  list-style: none;
}
p {
  position: absolute;
  color: #fff;
  font-family: SourceHanSansSC-Medium;
  font-size: 1.2vw;
  width: 40vw !important;
  letter-spacing: 2px;
}
.title_text {
  font-size: 24px;
  color: #ffffff;
  line-height: 24px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 9;
}
#slide {
  position: absolute;
  width: 12%;
  height: 7%;
  z-index: 2;
  cursor: pointer;
}
#slide2 {
  position: absolute;
  width: 12%;
  height: 7%;
  z-index: 2;
  cursor: pointer;
}
#slide3 {
  position: absolute;
  width: 12%;
  height: 7%;
  z-index: 2;
  cursor: pointer;
}
#slide1 {
  position: absolute;
  width: 12%;
  height: 7%;
  z-index: 1;
  cursor: pointer;
}
#slide21 {
  position: absolute;
  width: 12%;
  height: 7%;
  z-index: 1;
  cursor: pointer;
}
#slide31 {
  position: absolute;
  width: 12%;
  height: 7%;
  z-index: 1;
  cursor: pointer;
}
@media (max-width: 730px) {
  #slide2 {
    width: 8% !important;
    left: 345px !important;
  }
  #slide21 {
    width: 8% !important;
    left: 345px !important;
  }
}
@media (max-width: 667px) {
  #slide {
    left: 216px !important;
  }
  #slide2 {
    left: 313px !important;
  }
  #slide3 {
    left: 410px !important;
  }
  #slide1 {
    left: 216px !important;
  }
  #slide21 {
    left: 313px !important;
  }
  #slide31 {
    left: 410px !important;
  }
}
@media (max-width: 641px) {
  #slide {
    width: 9%;
    left: 208px !important;
  }
  #slide2 {
    left: 300px !important;
  }
  #slide3 {
    left: 389px !important;
  }

  #slide1 {
    left: 208px !important;
  }
  #slide21 {
    left: 300px !important;
  }
  #slide31 {
    left: 389px !important;
  }
  @media (max-height: 336px) {
    #slide3 {
      left: 399px !important;
    }
    #slide31 {
      left: 399px !important;
    }
  }
}
</style>
