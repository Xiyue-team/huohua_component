<template>
  <div class="aspectration bg_white covered root_div_container">

    <div class="control-panel_div_content fill_parent" style="background-color: white;color: #FFFFFF;">
      <div style="position: absolute;left: 10px;top: 10px;padding: 5px 1px;">
        <h2 class="title_induction">诱导公式一</h2>
        <div class="text">
          <span class="content_formula">sin(2kπ+α) = sin(α)</span><br>
          <span class="content_formula">cos(2kπ+α) = cos(α)</span><br>
          <span class="content_formula">tan(2kπ+α) = tan(α)</span>
        </div>
      </div>

      <div class="view_div_content" style="background-color: white;" data-ratio="1:1" >
        <div  id="box" style="width: 100%;height: 100%;">

        </div>
      </div>
    </div>

    <div class="control-panel_div_floatRight">
      <div class="button_border " style="display:inline-block;width:48px;height:40px;float: right;margin-right:20px;margin-top: 20px "
           id="reset" @click="resetEvent">
        <img style="width: 24px;height: 24px;  margin-top: 8px;margin-left: 12px;"
             src="../../../../static/images/chongzhi.png"
             alt=""  class="resetimg">
      </div>
      <!--http://huohua-component.oss-cn-hangzhou.aliyuncs.com/widget/c26c2451043fd2ceac0305f12728ce89_unzip/static/UI/chongzhi@2x.png-->
      <div class="right_bottom">
        <button id="add" class="add" @click="addAnimation">+</button>
        <div id="numbervalue">0</div>
        <button id="sub" class="sub" @click="subAnimation">-</button>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import "../../../../src/assets/css/core.css"
import "../../../../src/assets/css/layout.css"
import {ViewController} from "../../../../src/core/ViewController";
import {JsxViewHandler} from "./services/JsxViewHandler";

var x = 1;
export default Vue.extend({

    created(){
        ViewController.getInstance(new JsxViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
        ViewController.getInstance().domReady();
    },
    methods: {
        subAnimation(){

            let addvalue = parseInt(document.getElementById('numbervalue').innerText);

            console.log(addvalue);
            if(addvalue > 0){
                x-=1;
                document.getElementById("add").removeAttribute("disabled");
                addvalue = addvalue - 1;
                document.getElementById('numbervalue').innerText = addvalue.toString();
                (ViewController.getInstance().viewHandler as JsxViewHandler).subRotateAnimation();
            }else if(addvalue == -2){
                document.getElementById('sub_static').setAttribute("disabled", 'true');
            }else{
                addvalue-=1;
                document.getElementById('numbervalue').innerText = addvalue.toString();
                (ViewController.getInstance().viewHandler as JsxViewHandler).subRotateAnimation();
            }

        },
        addAnimation(){

            let addvalue = parseInt(document.getElementById('numbervalue').innerText);
            if(x == 3){
                document.getElementById('add').setAttribute("disabled", 'true');
            }else if(addvalue < 0){

                document.getElementById('numbervalue').innerText = (addvalue + 1).toString();
                document.getElementById("sub_static").removeAttribute("disabled");
                (ViewController.getInstance().viewHandler as JsxViewHandler).addRotateAnimation();
            }else if(x >= 0){
                document.getElementById('numbervalue').innerText = (addvalue + 1).toString();
                (ViewController.getInstance().viewHandler as JsxViewHandler).addRotateAnimation();
                x+=1;
            }

        },
        resetEvent(){

            document.getElementById("add").removeAttribute("disabled");
            document.getElementById("sub_static").removeAttribute("disabled");
            x = 1;
            document.getElementById('numbervalue').innerText = '0';
            (ViewController.getInstance().viewHandler as JsxViewHandler).reset();

        }
    }
})
</script>

<style scoped="scoped">

  .view_div_content{
    width: 470px;
    height: 470px;
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
    top:10px;
  }
  .text{
    position: absolute;
    top:50px;
    left: 24px;
  }
  .text .content_formula{
    width: 300px;
    height: 30px;
    font-family: CambriaMath;
    font-size: 26px;
    color: #3494E9;
    display: block;

  }

  .resetimg{
    width: 48px;
    height:40px;
  }

  .right_bottom{
    width: 140px;
    height: 44px;
    font-size: 40px;
    background: #FFFFFF;
    text-align: center ;
    border: 0 solid rgba(0,0,0,0.06);
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.24);
    border-radius: 5px;
    position: absolute;
    right: 40px;
    bottom: 24px;
     position: absolute;
    right: 20px;
    bottom: 50px;
  }

  .right_bottom .add{
    width: 22px;
    height: 4px;
    color: #5CAEFD;
    background: #FFFFFF;
    border-radius: 1px;
    font-size: 40px;
    display: block;
    position: absolute;
    right: 100px;
  }

  .right_bottom .sub{
    width: 22px;
    height: 4px;
    color: #5CAEFD;
    background: #FFFFFF;
    border-radius: 1px;
    font-size: 40px;
    display: block;
    position: absolute;
    right: 10px;
    top: -4px;
  }

</style>
