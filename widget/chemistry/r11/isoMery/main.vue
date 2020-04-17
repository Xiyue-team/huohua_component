<template>
    <div class="aspectration bg_white covered root_div_container">
        <div style="position: absolute;left: 10px;top: 10px;padding: 5px 1px;">
            <h2 id="title" class="title_induction">同分异构体</h2>
        </div>
        <div class="control-panel_div_content fill_parent" style="" id="father_div">
            <!--800 576-->
            <div id="show_model" class="view_div_content" style=""  data-ratio="1:1">
                   <img id="bgimage" src="./sub_static/chartlet.png"
                        style="width: 800px;height: 576px" v-show="hideBackgroundImg">
                    <div id="show_one" style="opacity: 1;" class="cover_index_one" @click="showInfo(1)" ><img v-show="showImageOne"
                            src="./sub_static/showone.png" style="width: 180px;height: 71px;position: relative;top: -90px;left: -12px;"/></div>
                    <div id="show_two" class="cover_index_two" style="opacity: 1;" @click="showInfo(2)"><img v-show="showImageTwo"
                            src="./sub_static/showtwo.png" style="width: 180px;height: 71px;position: relative;top: -70px;left: -26px;"/></div>
                    <div id="show_three" class="cover_index_three" style="opacity: 1;" @click="showInfo(3)"><img v-show="showImageThree"
                            src="./sub_static/showthree.png" style="width: 182px;height: 82px;position: relative;top: -88px;left: -25px;"/>
                    </div>
                <div class="cover_index_four" @click="showInfo(4)" style="z-index: 2;" id="show_model_one"></div>
                <div class="cover_index_five" @click="showInfo(5)" style="z-index: 2;" id="show_model_two"></div>
                <div class="cover_index_six" @click="showInfo(6)" style="z-index: 2;" id="show_model_three"></div>
                <div class="cover_index_seven" @click="showInfo(7)" style="z-index: 2;" id="show_model_four"></div>
                <div class="cover_index_eight" @click="showInfo(8)" style="z-index: 2;" id="show_model_five"></div>
                <div id="3dContainer" style="">
                    <h2 class="model_title" id="model_title" style=""></h2>
                    <span id="fubiaoti" class="fubiaoti_title"></span>
                </div>
            </div>
        </div>
        <!--右边面板悬浮-->
        <div class="control-panel_div_floatRight">
            <div class="button_border "
                 style="display:inline-block;width:48px;height:40px;float: right;margin-right: 1px;margin-top: -18px;background: #FFFFFF "
                 id="reset" @click="reset">
                <img style="width: 24px;height: 24px;  margin-top: 8px;margin-left: 12px;"
                     src="../../../../static/images/chongzhi.png"
                     alt="123" class="resetimg">
            </div>
            <div style="position: absolute;bottom: 40px;right: 20px;width: 60px;height: 60px;opacity: 1;cursor: pointer;"
                 id="return_button" @click="returnFun" v-show="returnBtn">
                <img style="width: 60px;height: 60px;" src="./sub_static/return.png"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import "../../../../src/assets/css/core.css"
    import "../../../../src/assets/css/layout.css"
    import h_button from '../../../../src/component/ui/button.vue';
    import {ViewController} from "../../../../src/core/ViewController";
    import {IsoMeryViewHandler} from "./IsoMeryViewHandler";
    var textObj = {};
    export default Vue.extend({
        data() {
            return {
                hideBackgroundImg: true,
                disabled: false,
                showImageOne: false,
                showImageTwo: false,
                showImageThree: false,
                returnBtn: false,
            }
        }
        ,
        components: {

        },
        created() {
            ViewController.getInstance(new IsoMeryViewHandler(this));
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
            ViewController.getInstance().domReady();
        },
        methods: {
            showInfo(x: number) {
                switch (x) {
                    case 1:
                        this.showImageOne = !this.showImageOne;
                        break;
                    case 2:
                        this.showImageTwo = !this.showImageTwo;
                        break;
                    case 3:
                        this.showImageThree = !this.showImageThree;
                        break;
                    case 4:
                        textObj = {
                            'title': '碳链异构：分子式相同，碳架不同',
                        };
                        break;
                    case 5:
                        textObj = {
                            'title': '位置异构：分子式相同，官能团在碳架上的位置不同',
                        };
                        break;
                    case 6:
                        textObj = {
                            'title': '官能团异构：分子式相同，分子中所含官能团的种类不同',
                        };
                        break;
                    case 7:
                        textObj = {
                            'title': '顺反异构：分子式相同，但由于双键不能自由旋转而导致分子中原子或',
                        };
                        document.getElementById('fubiaoti').innerText = '原子团在空间中排列方式不同';
                        break;
                    case 8:
                        textObj = {
                            'title': '对映异构：分子式相同，分子中不对称碳原子的四个原子或原子团在空',
                        };
                        document.getElementById('fubiaoti').innerText = '间中排布不同，形成了互为实物和镜像的关系而不能重叠';
                        break;
                }
                if (x >= 4) {
                    this.hideBackgroundImg = false;
                    document.getElementById('show_model').style.zIndex = '1';
                    this.returnBtn = true;
                    (ViewController.getInstance().viewHandler as IsoMeryViewHandler).createText(textObj);
                    (ViewController.getInstance().viewHandler as IsoMeryViewHandler).showModel(x);
                }
            }
            ,
            //点击返回按钮
            returnFun() {
                //隐藏所有模型
                (ViewController.getInstance().viewHandler as IsoMeryViewHandler).hiddenModel();
                this.showImageOne = false;
                this.showImageTwo = false;
                this.showImageThree = false;
                this.returnBtn = false;
                document.getElementById('model_title').innerText = '';
                document.getElementById('fubiaoti').innerText = '';
                this.hideBackgroundImg = true;
                (ViewController.getInstance().viewHandler as IsoMeryViewHandler).changeDivZindex(false);
                (ViewController.getInstance().viewHandler as IsoMeryViewHandler).reset();
            }
            ,
            //点击重置按钮
            reset() {
                this.showImageOne = false;
                this.showImageTwo = false;
                this.showImageThree = false;
                (ViewController.getInstance().viewHandler as IsoMeryViewHandler).reset();
            }
            ,
        }
        ,

    })
</script>

<style scoped="scoped">
    .view_div_content {
        width: 900px;
        height: 576px;
    }

    .title_induction {
        width: 400px;
        height: 100px;
        line-height: 24px;
        position: absolute;
        left: 24px;
        top: 10px;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #000000;
        line-height: 24px;
    }

    .model_title {
        font-family: PingFangSC-Regular;
        font-size: 20px;
        color: #000000;
        position: absolute;
        left: 30px;
        top: 72px;
    }

    .fubiaoti_title {
        font-family: PingFangSC-Regular;
        font-size: 20px;
        color: #000000;
        position: absolute;
        left: 128px;
        top: 100px;
        display: block;
    }
    .resetimg {
        width: 48px;
        height: 40px;
    }

    .cover_index_one {
        width: 165px;
        height: 165px;
        position: relative;
        top: -405px;
        left: 105px;
        cursor: pointer;
        border-radius: 50%;
        z-index: 5;
        margin: 0 0;
    }

    .cover_index_two {
        width: 130px;
        height: 130px;
        position: relative;
        top: -689px;
        left: 400px;
        cursor: pointer;
        border-radius: 50%;
    }

    .cover_index_three {
        width: 130px;
        height: 130px;
        position: relative;
        top: -540px;
        left: 400px;
        cursor: pointer;
        border-radius: 50%;
    }

    .cover_index_four {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        position: relative;
        top: -1002px;
        left: 715px;
        cursor: pointer;
    }

    .cover_index_five {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        position: relative;
        top: -1014px;
        left: 614px;
        cursor: pointer;
    }

    .cover_index_six {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        position: relative;
        top: -999px;
        left: 691px;
        cursor: pointer;
    }

    .cover_index_seven {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        position: relative;
        top: -945px;
        left: 608px;
        cursor: pointer;
    }

    .cover_index_eight {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        position: relative;
        top: -922px;
        left: 690px;
        cursor: pointer;
    }


</style>
