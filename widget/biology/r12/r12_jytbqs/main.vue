<template>
  <div class='aspectration bg_white covered root_div_container '>

    <div class='control-panel_div_content' style='background-color: white;color: #FFFFFF;'>

      <h2 id="title" class='title_induction'>基因突变-缺失</h2>

      <div class='view_div_content' style='background-color: white;' data-ratio='1:1' >
        <div  id='box' style='width: 100%;height: 100%;'></div>
      </div>
    </div>
    <div class='control-panel_div_rt'>
      <div class='button_border ' style='display:inline-block;width:48px;height:40px;float: right;' id='reset'  @click='resetEvent'>
        <img style='width: 24px;height: 24px;  margin-top: 8px;margin-left: 12px' src='../../../../static/images/chongzhi.png' alt=''>
      </div>

        <div class='button_option' style='margin-top: 70px;'>

          <h_button class="block status_btn" v-bind:class="{ active: active === 0,event_disabled: disabled }" title="正常" style="margin-top: 12px;"  v-on:click.native="complete"></h_button>
          <h_button class="block status_btn" v-bind:class="{ active: active === 1,event_disabled: disabled }" title="缺失1" style="margin-top: 12px;" v-on:click.native="miss1"></h_button>
          <h_button class="block status_btn" v-bind:class="{ active: active === 2,event_disabled: disabled }" title="缺失2" style="margin-top: 12px;" v-on:click.native="miss2"></h_button>
          <h_button class="block status_btn" v-bind:class="{ active: active === 3,event_disabled: disabled }" title="缺失3" style="margin-top: 12px;" v-on:click.native="miss3"></h_button>

          <div class="control-block_div_border " style="margin-top:10px;height: 170px;padding-top: 0px;">

            <div style="text-align: center;">
              <img src="./sub_static/tip.png" style="width: 174px;height: 52.3px;margin-top: 18px;"/>
            </div>
            <div class="ico_button_group">
              <button id="icoA" type="button" class="ico_span_button a">A</button>
              <button id="icoU" type="button" class="ico_span_button u" @dragend="dragend('U')">U</button>
              <button id="icoG" type="button" class="ico_span_button g" @dragend="dragend('G')">G</button>
              <button id="icoC" type="button" class="ico_span_button c" @dragend="dragend('C')">C</button>
            </div>

            <h_button class="block status_btn" v-bind:class="{ event_disabled: autoTranslateDisabled}" title="一键转录"
                      style="margin-top: 55px;" v-on:click.native="autoTranslate"></h_button>
          </div>

          <h_button class="block status_btn" v-bind:class="{ event_disabled: translateDisabled }"  title="翻译" style="margin-top: 12px;" v-on:click.native="translate"></h_button>

        </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import h_button from '../../../../src/component/ui/button.vue';
import {JytbViewHandler} from './JytbViewHandler';
import {ViewController} from '../../../../src/core/ViewController';

export default Vue.extend({

    data() {
        return{
            autoTranslateDisabled: true,
            translateDisabled:true,
            disabled : false,
            active: -1,
            switchAutoTranslateDisabled: true,
            switchTranslateDisabled: false,
            translateNumber: false,
            timeoutTranslate: null
        };
    },
    components: {
        h_button
    },

    created() {
        ViewController.getInstance(new JytbViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },

    mounted() {
        ViewController.getInstance().domReady();

    },

    watch: {
        disabled: function(val) {

        }
    },

    methods: {
        dragend(letter: any) {
            if ( this.active == -1){
                return;
            }

            const left = document.getElementById('box').offsetLeft;
            const top = document.getElementById('box').offsetTop;
            const x = (event as any).clientX - left;
            const y = (event as any).clientY - top;
            (ViewController.getInstance().viewHandler as JytbViewHandler).hitmRNA(x, y, letter);

            if (this.switchAutoTranslateDisabled) {
                this.autoTranslateDisabled = false;
            }
        },
        resetEvent() {
            (ViewController.getInstance().viewHandler as JytbViewHandler).reset();
            this.autoTranslateDisabled = true;
            this.translateDisabled = true;
            this.switchAutoTranslateDisabled = true;
            this.switchTranslateDisabled = false;
            this.translateNumber = false;
            this.active = -1;
            clearTimeout(this.timeoutTranslate);
        },
        complete() {
            this.disabled = true;
            this.active = 0;
            (ViewController.getInstance().viewHandler as JytbViewHandler).complete();
            this.timeoutTranslate = setTimeout(()=>{
                this.disabled = false;

                if (this.switchAutoTranslateDisabled) {
                    this.autoTranslateDisabled = false;
                    this.switchAutoTranslateDisabled = false;
                }

                const petideChain = (ViewController.getInstance().viewHandler as JytbViewHandler).layer.findOne('#petideChain').visible()
                console.log(petideChain);
                if (this.switchTranslateDisabled) {
                    if (!petideChain) {
                        this.translateDisabled = false;
                        this.switchTranslateDisabled = false;
                    }
                }

                if (petideChain) {
                    this.translateDisabled = true;
                } else {
                    if (this.translateNumber) {
                        this.translateDisabled = false;
                    }
                }
            },1100);
        },
        miss1() {
            this.disabled = true;
            this.active = 1;
            (ViewController.getInstance().viewHandler as JytbViewHandler).miss1();
            this.timeoutTranslate = setTimeout(()=>{
                this.disabled = false;
                if (this.switchAutoTranslateDisabled) {
                    this.autoTranslateDisabled = false;
                    this.switchAutoTranslateDisabled = false;
                }

                const petideChain = (ViewController.getInstance().viewHandler as JytbViewHandler).layer.findOne('#petide1Chain').visible()
                console.log(petideChain);
                if (this.switchTranslateDisabled && !petideChain) {
                    this.translateDisabled = false;
                    this.switchTranslateDisabled = false;
                }

                if (petideChain) {
                    this.translateDisabled = true;
                } else {
                    if (this.translateNumber) {
                        this.translateDisabled = false;
                    }
                }
            },1200)
        },
        miss2() {
            this.disabled = true;
            this.active = 2;
            (ViewController.getInstance().viewHandler as JytbViewHandler).miss2();
            this.timeoutTranslate = setTimeout(()=>{
                this.disabled = false;
                if (this.switchAutoTranslateDisabled) {
                    this.autoTranslateDisabled = false;
                    this.switchAutoTranslateDisabled = false;
                }

                const petideChain = (ViewController.getInstance().viewHandler as JytbViewHandler).layer.findOne('#petide2Chain').visible()
                console.log(petideChain);
                if (this.switchTranslateDisabled && !petideChain) {
                    this.translateDisabled = false;
                    this.switchTranslateDisabled = false;
                }

                if (petideChain) {
                    this.translateDisabled = true;
                } else {
                    if (this.translateNumber) {
                        this.translateDisabled = false;
                    }
                }
            },1200)


        },
        miss3() {
            this.disabled = true;
            this.active = 3;
            (ViewController.getInstance().viewHandler as JytbViewHandler).miss3();
            this.timeoutTranslate = setTimeout(()=>{
                this.disabled = false;
                if (this.switchAutoTranslateDisabled) {
                    this.autoTranslateDisabled = false;
                    this.switchAutoTranslateDisabled = false;
                }

                const petideChain = (ViewController.getInstance().viewHandler as JytbViewHandler).layer.findOne('#petide3Chain').visible()
                console.log(petideChain);
                if (this.switchTranslateDisabled && !petideChain) {
                    this.translateDisabled = false;
                    this.switchTranslateDisabled = false;
                }

                if (petideChain) {
                    this.translateDisabled = true;
                } else {
                    if (this.translateNumber) {
                        this.translateDisabled = false;
                    }
                }
            },1200)
        },
        translate() {
            this.translateDisabled = true;
            this.switchTranslateDisabled = true;
            (ViewController.getInstance().viewHandler as JytbViewHandler).translate();
        },
        autoTranslate() {
            this.autoTranslateDisabled = true;
            this.translateNumber = true;
            (ViewController.getInstance().viewHandler as JytbViewHandler).autoTranslate();
        }

    }
});
</script>

<style scoped='scoped'>
  .control-block_div_border{
    padding-top: 20px;
    margin-top: 20px;
    background: #FFFFFF;
    border: 0 solid rgba(0,0,0,0.06);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.20);
    border-radius: 6px;
  }

  .title_induction{
    width: 400px;
    height:100px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #000000;
    line-height: 24px;
    position: absolute;
    left: 24px;
    top: 24px;
  }

  .status_btn{
    width: 100%;
  }

  .view_div_content{
    width: 860px;
    height: 690px;
  }

  .ico_span_button{
    width: 34px;
    height: 34px;
    border: 0 solid rgba(0,0,0,0.10);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
    border-radius: 6px;
    font-size: 18px;
    color: #000000;
    line-height: 16px;
    position: fixed;
  }

  .ico_button_group{
    text-align: center;
  }

  .ico_button_group button:not(:first-child){
    margin-left: 14px;
  }

  .ico_span_button.a{
    right: 195px;
    background-image: linear-gradient(-180deg, #FFD300 0%, #F7961E 100%);
  }

  .ico_span_button.u{
    right: 147px;
    background-image: linear-gradient(-180deg, #B559FE 3%, #4E6CF2 100%);
  }

  .ico_span_button.g{
    right: 99px;
    background-image: linear-gradient(-180deg, #FF6903 0%, #EF0979 100%);
  }

  .ico_span_button.c{
    right: 51px;
    background-image: linear-gradient(-180deg, rgba(102,222,207,0.98) 0%, rgba(69,191,230,0.99) 47%, rgba(50,173,242,1.00) 74%, #219DFE 98%);
  }

</style>
