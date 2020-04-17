<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas">
        <div>
          <div :style="'margin-right:104px;'" @click="choose(1)">单位圆法</div>
          <div @click="choose(2)">平移法</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead'; //头部
  export default {
    name: 'app',
    components: {
      uiHead
    },
    data() {
      return {
        title: '余弦函数的图像',
      }
    },
    created() {
      document.title = this.title;
    },
    mounted() {
      //禁止选择
      document.onselectstart = function() {
        return false;
      };
    },
    methods: {
      choose(v){
          window.location.href='./static/dist'+v+'/index.html';
      },
    },
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

  input, button {
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

  html, body, #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    background-color: #fff;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently not supported by any browser */
  }

  /*内容区*/
  .container {
    width: 100%;
    float: left;
    height: 100%;
  }

  .container h3 {
    font-size: 24px;
    color: #000;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
  }
  #renderCanvas {
    width: 100%;
    height: calc(100% - 72px);
    outline: none;
    position: relative;
    overflow: hidden;
  }
  #renderCanvas>div{
    width: 584px;
    height: 240px;
    position: absolute;
    top:0;
    left:0;
    right: 0;
    bottom:0;
    margin: auto;
  }
  #renderCanvas>div>div{
    float: left;
    width:240px;
    height:240px;
    background: #FFFFFF;
    border: 0 solid rgba(0,0,0,0.06);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08);
    border-radius: 6px;
    font-size: 36px;
    color: #000000;
    line-height: 240px;
    text-align: center;
    cursor: pointer;
  }

</style>
