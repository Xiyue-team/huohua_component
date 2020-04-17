<template>
    <div class='aspectration bg_white covered root_div_container '>
        <leftAndRightLayout>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" style="display: flex;width: 100%;height: 100%;">
                    <div style="width: 240px;height:462px; margin: auto">
                        <div>
                            <label @click="qgModel()">
                                <h_button title="球棍模型" v-bind:class="{active:disabledQG}" v-model="axiom"
                                          style="width: 240px;height: 44px; margin-top: 14px;font-size: 16px;"></h_button>
                            </label>
                        </div>

                        <div class="btn_Control2">
                            <label @click="blModel()">
                                <h_button title="比例模型" v-bind:class="{active:disabledBL}"
                                          style="width: 240px;height: 44px; font-size: 16px;"></h_button>
                            </label>
                        </div>

                        <counter class="counter1" v-bind="counterOption1" ref="counterFunction1" v-bind:countDisabled.sync="counterNum1">
                        </counter>

                        <div class="img1" >
                            <img src="./sub_static/model1.png" id="img1" ondragstart='return false;'
                                 style="width: 110px; height: 110px;"
                                 v-bind:class="{'event_disabled' : disabled1}" v-show="show_qg" @click="imgEvent1()"/>
                            <img src="./sub_static/model21.png" id="img3" ondragstart='return false;'
                                 style="width: 110px; height: 110px;"
                                 v-bind:class="{'event_disabled' : disabled3}" v-show="!show_qg" @click="imgEvent1()"/>
                        </div>


                        <counter class="counter2" v-bind="counterOption2" ref="counterFunction2" v-bind:countDisabled.sync="counterNum2">
                        </counter>

                        <div class="img2">
                            <img src="./sub_static/model2.png" id="img2" ondragstart='return false;'
                                 style="width: 110px; height: 110px;"
                                 v-bind:class="{'event_disabled' : disabled2}" v-show="show_qg" @click="imgEvent2()"/>
                            <img src="./sub_static/model22.png" id="img4" ondragstart='return false;'
                                 style="width: 110px; height: 110px;"
                                 v-bind:class="{'event_disabled' : disabled4}" v-show="!show_qg" @click="imgEvent2()"/>
                        </div>
                    </div>
                </div>
            </template>
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">水和甲醇的相互溶解</span>
                <div id="3dContainer" style="width: 100%;height: 100%;">

                </div>
            </template>
        </leftAndRightLayout>
    </div>
</template>

<script lang='ts'>
  import Vue from "vue";
  import "../../../../src/assets/css/core.css";
  import "../../../../src/assets/css/layout.css";
  import h_switch from "../../../../src/component/ui/switch.vue";
  import h_button from "../../../../src/component/ui/button.vue";
  import leftAndRightLayout from "../../../../src/component/layout/leftAndRight_layout.vue";
  import { ViewController } from "../../../../src/core/ViewController";
  import { ShjcdxhrjViewHandler } from "./services/ShjcdxhrjViewHandler";
  import counter from "../../../../src/component/ui/counter.vue";

  export default Vue.extend({

    data() {
      return {
        counterNum1: 0,
        counterNum2: 0,
        axiom: true,
        show_qg: true,
        disabled1: false,
        disabled2: false,
        disabled3: false,
        disabled4: false,
        disabledQG: true,
        disabledBL: false,
        counterOption1: {
          counterNum: 4,
        },
        counterOption2: {
          counterNum: 4,
        }
      };
    },
    components: {
      h_switch,
      h_button,
      leftAndRightLayout,
      counter
    },

    created() {

      ViewController.getInstance(new ShjcdxhrjViewHandler(this));
      ViewController.getInstance().viewHandler.beforeRenderElement();
    },

    mounted() {
      ViewController.getInstance().domReady();
    },

    watch: {
      axiom: function(axiom: boolean) {
        if (axiom) {
          this.show_qg = true;
        } else {
          this.show_qg = false;
        }
      },

        counterNum1: function(counterNum1: number) {
        (ViewController.getInstance().viewHandler as any).shjcdxhrj3DModel.ctrlButton(true, false);
        (ViewController.getInstance().viewHandler as any).shjcdxhrj3DModel.showHidedModel1(counterNum1);
      },

        counterNum2: function(counterNum2: number) {
        (ViewController.getInstance().viewHandler as any).shjcdxhrj3DModel.ctrlButton(false, true);
        (ViewController.getInstance().viewHandler as any).shjcdxhrj3DModel.showHidedModel2(counterNum2);
      }
    },

    methods: {
        counterPlus1(){
            if (this.counterNum1 < this.counterOption1.counterNum){
                this.counterNum1 +=1;
            }
        },
        counterPlus2(){
            if (this.counterNum2 < this.counterOption2.counterNum){
                this.counterNum2 +=1;
            }
        },
      qgModel() {
        this.axiom = true;
        this.disabledQG = true;
        this.disabledBL = false;
        (ViewController.getInstance().viewHandler as any).shjcdxhrj3DModel.changeToQGModel();
      },

      blModel() {
        this.axiom = false;
        this.disabledQG = false;
        this.disabledBL = true;
        (ViewController.getInstance().viewHandler as any).shjcdxhrj3DModel.changeToBLModel();
      },

      imgEvent1() {
        (ViewController.getInstance().viewHandler as any).shjcdxhrj3DModel.clickEvent1();
      },
      imgEvent2() {
        (ViewController.getInstance().viewHandler as any).shjcdxhrj3DModel.clickEvent2();
      },
    }
  });
</script>

<style scoped='scoped'>

    .title_text {
        margin-top: 24px;
        margin-left: 24px;
        position: absolute;
        font-size: 24px;
        color: #000000;
    }


    .btn_Control2 {
        margin: 20px auto;
    }

    .counter1 {
        width: 50px;
        height: 20px;
        margin: 20px auto;
    }

    .counter2 {
        width: 50px;
        height: 20px;
        margin: 20px auto;
    }

    .img1 {
        width: 110px;
        height: 110px;
        margin: 20px auto;
        background: #FFFFFF;
        border: 0 solid rgba(0,0,0,0.10);
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
        border-radius: 6px;
    }

    .img2 {
        width: 110px;
        height: 110px;
        margin: 20px auto;
        background: #FFFFFF;
        border: 0 solid rgba(0,0,0,0.10);
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
        border-radius: 6px;
    }
</style>
