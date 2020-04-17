<template>
  <div id="app">
    <widget></widget>
  </div>
</template>

<script>
import widget from './components/widget'
export default {
  name: 'app',
  components: {
      widget
  }
}
</script>

<style>
  html, body, h1, h2, h3, h4, h5, h6, hr, p, iframe, dl, dt, dd, ul, ol, li, pre, form, button, input, textarea, th, td, fieldset {
    margin: 0;
    padding: 0;
    border:none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  html {
    font:14px/1.5  "Cambria Math",pingfang, "宋体", "sans-serif";
    word-break: break-all;
    color: #000000;
    overflow: hidden;
    height:100%;
    background-color: #fff;
    touch-action: none;
    -ms-touch-action: none;
  }
  ol, ul {
    list-style: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  img {
    width: 100%;
    border: 0;
    vertical-align: top;
  }
  a {
    text-decoration: none;
    color: #000000;
  }
  p{
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
  }
  span{
    cursor: pointer;
  }
  /****** 基本样式开始 ******/
  body{
    height:100%;
    background: #000;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  #app{
    width:100%;
    height:100%;
    background-color:#fff;
    min-width: 580px;
    overflow: hidden;
  }
</style>
