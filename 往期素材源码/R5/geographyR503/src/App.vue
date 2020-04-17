<template>
    <div id="app" class="noselect">
        <div class="container">
            <!--头部-->
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
          <div class="view_space">
            <div id="renderCanvas" :style="viewSize">
              <div class="canvas_item">
                <img src="static/images/1.png" />
              </div>
              <div class="canvas_item">
                <img src="static/images/2.png" />
              </div>
              <div class="canvas_item">
                <img src="static/images/3.png" />
              </div>
              <div class="canvas_item">
                <img src="static/images/4.png" />
              </div>
            </div>
          </div>
        </div>
        <!--侧边按钮区-->
        <div class="app_aside">
            <!--重制按钮-->
            <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
            <!--清除浮动-->
            <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
                <ui-btn size="big" :type="blue1" @click.native="blueClick(1)">对流雨</ui-btn>
                <ui-btn size="big" :type="blue2" @click.native="blueClick(2)">地形雨</ui-btn>
                <ui-btn size="big" :type="blue3" @click.native="blueClick(3)">锋面雨</ui-btn>
                <ui-btn size="big" :type="blue4" @click.native="blueClick(4)">台风雨</ui-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import uiHead from '@/components/UI/uiHead';//头部
    import uiBtn from '@/components/UI/uiBtn';//按钮
    export default {
        name: 'app',
        components: {uiHead, uiBtn},
        data(){
            return {
                title: '四种降雨类型',
                viewSize: {
                  width: (window.innerWidth - 346) + 'px',
                  height: (window.innerWidth - 346) * 9 / 16 + 'px',
                },//区域大小
                BtnSpaceStyle: 'flex',
                blue1: '',
                blue2: '',
                blue3: '',
                blue4: ''
            }
        },
        created(){
            document.title = this.title;
            this.getViewSize()
        },
        mounted(){
          this.resize();
          this.setSideStyle()
        },
        computed: {},
        methods: {
            blueClick(val){
                if(val == 1){
                  $('.canvas_item').hide();
                  $('#renderCanvas').css({"backgroundImage":'url(static/images/a.gif?'+Math.random()+')'});
                  if (this.blue1 === 'blue') {
                     return;
                  } else {
                    this.blue1 = 'blue';
                    this.blue2 = '';
                    this.blue3 = '';
                    this.blue4 = '';
                  }
                }else if (val == 2) {
                  $('.canvas_item').hide();
                  $('#renderCanvas').css({"backgroundImage":'url(static/images/b.gif?'+Math.random()+')'});
                  if (this.blue2 === 'blue') {
                      return;
                  } else {
                    this.blue2 = 'blue';
                    this.blue1 = '';
                    this.blue3 = '';
                    this.blue4 = '';
                  }
                }else if (val == 3) {
                  $('.canvas_item').hide();
                  $('#renderCanvas').css({"backgroundImage":'url(static/images/c.gif?'+Math.random()+')'});
                  if (this.blue3 === 'blue') {
                      return;
                  } else {
                    this.blue3 = 'blue';
                    this.blue1 = '';
                    this.blue2 = '';
                    this.blue4 = '';
                  }
                }else {
                  $('.canvas_item').hide();
                  $('#renderCanvas').css({"backgroundImage":'url(static/images/d.gif?'+Math.random()+')'});
                  if (this.blue4 === 'blue') {
                      return;
                  } else {
                    this.blue4 = 'blue';
                    this.blue1 = '';
                    this.blue2 = '';
                    this.blue3 = '';
                  }
                }

            },
            //计算侧边
            setSideStyle(){
                const el = document.getElementById('btn_space')
                if (el && el.scrollHeight > el.offsetHeight) {
                    this.BtnSpaceStyle = 'block'
                } else {
                    this.BtnSpaceStyle = 'flex'
                }
            },

          //计算区块大小
          getViewSize(){
            const ratio = {x: 16, y: 9};
            const h1 = (window.innerWidth - 346) * ratio.y / ratio.x;
            const h2 = window.innerHeight - 92 - 50 - 72;
            if (h1 >= h2) {
              this.viewSize = {
                width: h2 * ratio.x / ratio.y + 'px',
                height: h2 + 'px'
              }
            } else {
              this.viewSize = {
                width: (window.innerWidth - 346) + 'px',
                height: h1 + 'px'
              }
            }
          },


            //窗口大小更改
            resize(){
              const vm = this;
              window.addEventListener('resize', function () {
                vm.getViewSize();//计算视图区大小
                vm.setSideStyle();//计算操作区大小
              })
            },

            //重置
            resetWidget(){
              $('.canvas_item').show();
              $('#renderCanvas').css({"backgroundImage":'none'});
              this.blue1 = '';
              this.blue2 = '';
              this.blue3 = '';
              this.blue4 = '';
            }
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

    canvas {
        outline: none;
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

    /*ui*/
    .UI-camera {
        width: 80px;
        height: 80px;
        cursor: pointer;
    }
    #renderCanvas {
        border: 1px solid rgba(0, 0, 0, 0.15);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        border-radius: 6px;
        padding: 10px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-origin: content-box;
    }
    .canvas_item{
      float: left;
      width: 50%;
      height: 50%;
    }
    .canvas_item img{
      width: 100%;
      height: 100%;
    }
    /*内容区*/
    .container {
        width: calc(100% - 280px);
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

    .app_aside {
        float: left;
        width: 280px;
        background-color: #F7F7F7;
        height: 100%;
        box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);
    }

    .view_space {
      margin: 50px 32px 92px 32px;
      width: calc(100% - 66px);
      height: calc(100% - 214px);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
    }


    .insp-wrapper {
        width: 100%;
        height: 100%;
    }

    .aside_reset {
        margin: 20px 24px;
        float: right;
    }

    .btn_space {
        padding: 20px;
        width: 100%;
        height: calc(100% - 80px);
        clear: both;
        /*display: flex;*/
        /*align-items: center;*/
        justify-content: center;
        flex-direction: column;
        overflow: hidden;
        overflow-y: auto;
    }

    .btn_space .UI-btn {
        margin-bottom: 20px;
    }
</style>
