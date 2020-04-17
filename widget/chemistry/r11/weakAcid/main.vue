<template>
    <div class="aspectration bg_white covered root_div_container" style="">
        <img src="./sub_static/bg.png" style="z-index: -2;"/>
        <div class="control-panel_div_content fill_parent" style="z-index: 2;position: absolute;left: 23px;top: 24px;">
            <div style="position: absolute;left: 0px;top: 0px;">
                <h2 id="title" class="title_induction">探究几种弱酸的酸性强弱</h2>
            </div>
            <div class="view_div_content" style="" data-ratio="1:1">
                <div id="box" style="width: 100%;height: 100%;">

                </div>
            </div>
        </div>

        <div class="control-panel_div_floatRight">
            <div class="button_border "
                 style="display:inline-block;width:48px;height:40px;float: right;background:#87B8E0;border-radius: 6px;margin-top: -24px "
                 id="reset">
                <img style="border-radius: 6px"
                     src="./sub_static/reset.png"
                     alt="123" @click="resetEvent" class="resetimg">
            </div>
            <div class="right_botom" id="right_botom" v-show="dianjiBtn">
                <div class="show_lamp" id="show_lamp">
                    <div class="show_lamp_index" id="show_one"></div>
                    <div class="show_lamp_index" id="show_two"></div>
                    <div class="show_lamp_index" id="show_three"></div>
                    <div class="show_lamp_index" id="show_four"></div>
                </div>
                <div class="right_controler" id="startAnimation" @click="startAnimation" style="">
                    <div class="right_container_one">
                        <img src="./sub_static/H@2x.png" class="right_controler_one">
                    </div>
                    <div class="right_container_two">
                        <img src="./sub_static/CL@2x.png" class="right_controler_two"/>
                    </div>
                </div>
            </div>
            <h_button title="确认" class="button_option_index" v-show="querenBtn" disabled='disabled' id="comfirm"
                      @click.native="comfirmOpt"></h_button>
            <h_button title="正确排序" class="button_option_one" v-show="zxpxBtn" disabled='disabled' id="zqpxBtn"
                      @click.native="zqpxOpt"></h_button>
            <h_button title="继续挑战" class="button_option_two" v-show="jxtzBtn" disabled='disabled' id="jxtzBtn"
                      @click.native="jxtzOpt"></h_button>
        </div>

    </div>
</template>





<script lang="ts">
    import Vue from 'vue'
    import "../../../../src/assets/css/core.css"
    import "../../../../src/assets/css/layout.css"
    import h_button from '../../../../src/component/ui/button.vue';
    import {ViewController} from "../../../../src/core/ViewController";
    import {WeakAcidViewHandler} from "./services/WeakAcidViewHandler";
    var x = 1;
    export default Vue.extend({
        data() {
            return {
                disabled: false,
                dianjiBtn: true,
                querenBtn: false,
                jxtzBtn: false,
                zxpxBtn: false,
            }
        }
        ,
        components: {
            h_button,

        },
        created() {
            ViewController.getInstance(new WeakAcidViewHandler(this));
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
            ViewController.getInstance().domReady();

        },
        methods: {
            startAnimation() {
                document.getElementById('startAnimation').style.pointerEvents = 'none';
                switch (x) {
                    case 1:
                        document.getElementById('show_one').style.background = '#54D0FF';
                        break;
                    case 2:
                        document.getElementById('show_two').style.background = '#54D0FF';
                        break;
                    case 3:
                        document.getElementById('show_three').style.background = '#54D0FF';
                        break;
                    case 4:
                        document.getElementById('show_four').style.background = '#54D0FF';
                        break;
                }
                document.getElementById('startAnimation').style.opacity = '0.3';
                (ViewController.getInstance().viewHandler as WeakAcidViewHandler).createAnimationEvent(x);
                if (x == 4) {
                    x = 0;
                }
                x += 1;
            },
            comfirmOpt() {
                this.querenBtn = false;
                (ViewController.getInstance().viewHandler as WeakAcidViewHandler).showInfo();
            },
            resetEvent() {
                x = 1;
                this.dianjiBtn = true;
                this.querenBtn = false;

                this.jxtzBtn = false;
                this.zxpxBtn = false;
                document.getElementById('show_one').style.background = '#919191';
                document.getElementById('show_two').style.background = '#919191';
                document.getElementById('show_three').style.background = '#919191';
                document.getElementById('show_four').style.background = '#919191';
                document.getElementById('comfirm').setAttribute('disabled', 'disabled');
                document.getElementById('zqpxBtn').setAttribute('disabled', 'disabled');
                document.getElementById('jxtzBtn').setAttribute('disabled', 'disabled');
                (ViewController.getInstance().viewHandler as WeakAcidViewHandler).reset();
            },

            zqpxOpt() {
                    this.zxpxBtn = false;
                    this.jxtzBtn = false;
                (ViewController.getInstance().viewHandler as WeakAcidViewHandler).showCorrectQuestionTween();
            },

            jxtzOpt() {
                this.querenBtn = true;
                this.zxpxBtn = false;
                this.jxtzBtn = false;
                (ViewController.getInstance().viewHandler as WeakAcidViewHandler).returnSortBeforeStatus();
                document.getElementById('zqpxBtn').setAttribute('disabled', 'disabled');
                document.getElementById('jxtzBtn').setAttribute('disabled', 'disabled');


            }
        }
        ,
        watch: {}
    })
</script>

<style scoped="scoped">


    .view_div_content {
        width: 1024px;
        height: 576px;
    }

    .title_induction {
        width: 400px;
        height: 100px;
        line-height: 24px;
        font-size: 24px;
        color: #ffffff;
        line-height: 24px;
    }

    .resetimg {
        width: 48px;
        height: 40px;
        background: #87B8E0;
        border-color: #87B8E0;
    }

    .right_botom {
        width: 200px;
        height: 162px;
        position: absolute;
        bottom: -10px;
        right: 1px;
    }

    .right_controler {
        width: 110px;
        height: 110px;
        opacity: 0.6;
        background-color: #87B8E0;
        border: 0 solid rgba(0, 0, 0, 0.06);
        box-shadow: inset 0 1px 3px 1px rgba(221, 242, 255, 0.50);
        border-radius: 50%;
        position: absolute;
        right: 10px;
        bottom: 60px;
        cursor: pointer;
        z-index: 1;
        opacity: 1;
    }

    .right_controler .right_container_one {
        position: absolute;
        right: 55px;
        bottom: 60px;
        float: left;
    }

    .right_controler .right_container_two {
        position: absolute;
        right: 10px;
        bottom: 10px;
        float: right;
    }

    .right_controler .right_controler_one {
        width: 35px;
        height: 35px;
    }

    .right_controler .right_controler_two {
        width: 55px;
        height: 55px;
    }

    .show_lamp {
        position: absolute;
        bottom: 150px;
        right: -5px;
        width: 100px;
        height: 50px;
        padding: 1px 5px;
    }

    .show_lamp .show_lamp_index {
        float: left;
        border-radius: 2px;
        width: 6px;
        height: 12px;
        margin: 1px 5px;
        background: #919191;
    }

    .button_option_index {
        width: 100px;
        heghit: 44px;
        position: absolute;
        bottom: 80px;
        right: 20px;
        color: #FFFFFF;
        background: #6B98CB;
        box-shadow: inset 0 2px 3px 0 rgba(159, 220, 229, 0.50);
        border-radius: 6px;
    }

    .button_option_one {
        width: 100px;
        heghit: 44px;
        position: absolute;
        bottom: 120px;
        right: 20px;
        color: #FFFFFF;
        background: #6B98CB;
        box-shadow: inset 0 2px 3px 0 rgba(159, 220, 229, 0.50);
        border-radius: 6px;
    }

    .button_option_two {
        width: 100px;
        heghit: 44px;
        position: absolute;
        bottom: 60px;
        right: 20px;
        color: #FFFFFF;
        background: #6B98CB;
        box-shadow: inset 0 2px 3px 0 rgba(159, 220, 229, 0.50);
        border-radius: 6px;
    }
</style>
