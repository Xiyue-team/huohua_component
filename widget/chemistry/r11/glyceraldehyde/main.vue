<template>
    <div class="aspectration bg_white root_div_container">

        <div class="control-panel_div_rt">

            <div class="button_border "
                 style="display:inline-block;width:48px;height:40px;position: absolute;top:20px;right:24px;float: right;"
                 id="reset" @click="resetEvent">
                <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="./../../../../static/images/chongzhi.png"
                     alt="">
            </div>

            <!--显示简化模型、DL/RS模型-->
            <label for="checkbox-1" id="s1" class="control-block_div_border switch" style="margin-top:188px;">
                <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" v-model="axiom">
                <label for="checkbox-1"><span style="font-size: 16px;color: #000000">简化模型</span></label>
            </label>

            <label @click="dlEvent()">
                <h_button title="D/L型" class="button_DL" v-bind:class="{active:disabledDL}" v-show="buttonDL"
                          style="width: 240px; margin-top: 20px;"></h_button>
            </label>
            <label @click="rsEvent">
                <h_button title="R/S型" class="button_RS" v-bind:class="{active:disabledRS}" v-show="buttonDL"
                          style="width: 240px; margin-top: 12px;"></h_button>
            </label>

            <!--点击RS后显示标注-->
            <label for="checkbox-2" id="s2" class="control-block_div_border switch" style="margin-top:20px"
                   v-show="showlable">
                <input type="checkbox" name="checkbox-cats[]" id="checkbox-2" v-model="text">
                <label for="checkbox-2"><span style="font-size: 16px;color: #000000">标注</span></label>
            </label>

            <!-- 点击标注显示图片-->
            <label>
                <img src="./sub_static/yuanZi.png" class="lable_img" v-show="lableimg"
                     style="width: 200px;height: 56px;margin-top: 35px;margin-left: 10px">
            </label>

        </div>

        <span id="title" class="title_text"
              style="margin-top: 24px;margin-left: 24px;position: absolute;font-size: 24px;color: #000000">甘油醛的对映异构体</span>
        <div id="3dContainer" class="control-panel_div_content">
            <div id="3dContainer1" class="view_div_content">
                <div id="3dContainer1th" class="t1th" v-show="threed1th"></div>

                <div id="3dContainer3th" class="t3th" v-show="threed3th">

                    <div style="position: absolute;width: 70%">

                        <div style="width: 35%;display: inline-block;text-align: center;margin-left: 20%;margin-top: 15%">
                            <img src="./sub_static/gl.png" alt=""
                                 style="width: 60%;height: 60%;background-size: contain;">
                        </div>

                        <div style="width: 35%;display: inline-block;text-align: center;margin-left: 4%;margin-top: 15%">
                            <img src="./sub_static/gr.png" alt=""
                                 style="width: 60%;height: 60%;background-size: contain;">
                        </div>

                    </div>

                    <div style="position: absolute;width: 70%">

                        <div style="width: 35%;display: inline-block;text-align: center;margin-left: 19%;margin-top: 37%">
                            <img src="./sub_static/D-gyq.png" alt="" style="width: 60%;height: 60%;">
                            <div style="font-size: 20px;color: #000000;margin-top: 5%; font-weight: 600">
                                <span>D-甘油醛</span>
                            </div>
                        </div>

                        <div style="width: 35%;display: inline-block;text-align: center;margin-left: 6%;margin-top: 37%">
                            <img src="./sub_static/L-gyq.png" alt="" style="width: 60%;height: 60%;">
                            <div style="font-size: 20px;color: #000000;margin-top: 5%; font-weight: 600">
                                <span>L-甘油醛</span>
                            </div>
                        </div>

                    </div>

                </div>

                <div id="3dContainer4th" class="t4th" v-show="threed4th" style="height: 80%">
                    <img src="./sub_static/rsModel.png"
                         style="background-size: contain;width: 80%;height: 60%;margin-left: 10%;margin-top: 15%"/>
                    <div style="width: 70%;">
                        <div style="margin-top: 8%;font-size: 20px;color: #000000;width: 20%;float: left;margin-left: 32%;font-weight: 600">
                            R-甘油醛
                        </div>
                        <div style="margin-top: 8%;font-size: 20px;color: #000000;width: 20%;float: right;margin-right: -13%;font-weight: 600">
                            S-甘油醛
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import "../../../../src/assets/css/core.css"
    import "../../../../src/assets/css/layout.css"
    import {BrowserUtil} from "../../../../src/util/BrowserUtil";
    import {Gltf3DModel} from "../../../../src/three/Gltf3DModel";
    import {ViewController} from "../../../../src/core/ViewController";
    import h_switch from '../../../../src/component/ui/switch.vue';
    import h_button from '../../../../src/component/ui/button.vue';
    import {GlyceraldehydeViewHandler} from "./service/GlyceraldehydeViewHandler";

    export default Vue.extend({
        components: {
            h_switch,
            h_button,
        },
        data() {
            return {
                buttonDL: false,
                threed1th: true,
                threed3th: false,
                threed4th: false,
                axiom: false,
                text: false,
                showlable: false,
                lableimg: false,
                disabledDL: false,
                disabledRS: false,
            }
        },
        created() {
            ViewController.getInstance(new GlyceraldehydeViewHandler(this));
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
            ViewController.getInstance().domReady();
        },
        methods: {
            resetEvent() {
                this.axiom = false;
                ( ViewController.getInstance().viewHandler as any).mode2th.reset();
            },

            rsEvent() {
                this.threed1th = false;
                this.threed3th = false;
                this.threed4th = true;
                this.disabledRS = true;
                this.disabledDL = false;
                this.showlable = true;
            },
            dlEvent() {
                this.threed1th = false;
                this.threed3th = true;
                this.threed4th = false;
                this.disabledDL = true;
                this.disabledRS = false;
                this.showlable = false;
                this.text = false;
            },
        },
        watch: {
            axiom: function (axiom: boolean) {

                this.buttonDL = axiom;
                ( ViewController.getInstance().viewHandler as any).mode2th.axiomEvent(axiom);
                if (axiom) {
                    this.threed3th = false;
                    this.threed4th = false;
                    this.disabledDL = false;
                    this.disabledRS = false;
                    this.showlable = false;
                    this.text = false;
                } else {
                    this.threed3th = false;
                    this.threed4th = false;
                    this.disabledDL = false;
                    this.disabledRS = false;
                    this.showlable = false;
                    this.text = false;
                    this.threed1th = true;
                }
            },

            text: function (text: boolean) {
                if (text) {
                    this.lableimg = true;
                } else {
                    this.lableimg = false;
                }
            }
        }
    })
</script>

<style>
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }



    .control-block_div_border:hover {
        cursor: pointer;
    }

    .switch input {
        display: none;
    }

    .switch label {
        cursor: pointer;
        padding-right: 35px;
        position: relative;
        display: block;
        font-size: 14px;
    }

    .switch input[type="checkbox"] {
        position: absolute;
        visibility: hidden !important;
    }

    .switch input[type="checkbox"] + label:before,
    .switch input[type="checkbox"] + label:after {
        content: '';
        position: absolute;
        top: 41%;
        margin-top: -8.5px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    .switch input[type="checkbox"] + label:before {
        width: 44px;
        height: 26px;
        right: 0px;
        background: #F0F0F0;
        /*border: 1px solid #e4e3e1;*/
        border-radius: 15px;
        transition: none 16ms ease-out !important;
    }

    .switch input[type="checkbox"]:checked + label:before {
        background-color: #5CAEFD;
        transition: none 16ms ease-in !important;
    }

    .switch input[type="checkbox"] + label:after {
        width: 20px;
        height: 20px;
        right: 20px;
        margin-top: -6px;
        margin-right: 2px;
        background: #FFF;
        border-radius: 50%;
        -webkit-transition: all 16ms ease-out;
        transition: none 16ms ease-out !important;
    }

    .switch input[type="checkbox"]:checked + label:after {
        right: 0px;
        background: #FFF;
    }

</style>
