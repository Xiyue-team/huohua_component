<template>
  <div id="app">
    <h3 class="title">太阳光测凸透镜焦距</h3>
  <modify-device></modify-device>
  <frame-s v-if='show'>
    <render-canvas ></render-canvas>
  </frame-s>
  </div>
</template>
<script>
import frameS from './components/frame.vue'
import modifyDevice from './components/modifyDevice.vue'
import renderCanvas from './components/renderCanvas.vue'
// let VConsole = require('../node_modules/vconsole/dist/vconsole.min')
export default {
  name: 'App',
  components: {
    modifyDevice,
    renderCanvas,
    frameS
  },
  data() {
    return {
      show: true
    }
  },
  created() {
    let thiz = this;
    // let vConsole = new VConsole();
    // if (vConsole) {

    // }
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      let mql = window.matchMedia('(orientation: portrait)');
      let onMatchMeidaChange = function(mql) {
        if (mql.matches) {
          // 竖屏
          thiz.show = false
        } else {
          thiz.show = true
        }
      }
      onMatchMeidaChange(mql);
      mql.addListener(onMatchMeidaChange);
    }
  },
  mounted() {
    document.onselectstart = function() {
      return false;
    };
  },
  methods: {}
}

</script>
<style>
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

input,
button {
  outline: none;
  -webkit-appearance: none;
  border-radius: 0;
}

/*盒模型，padding尺寸不用再减去*/

*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  background-color: #fff;
}

render-canvas {
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

</style>
