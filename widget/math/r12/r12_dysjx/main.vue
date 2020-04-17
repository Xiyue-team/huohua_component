<template>
  <div class='aspectration bg_white covered root_div_container '>

    <div class='control-panel_div_content' style='background-color: white;color: #FFFFFF;'>

      <h2 class='title_induction'>等腰直角三角形面积的四种求法</h2>

      <div class='view_div_content' style='background-color: white;' data-ratio='1:1' >
        <div  id='box' style='width: 100%;height: 100%;'></div>
        <h3 class="desc_title" v-show="isShowDesc">{{desc}}</h3>
      </div>
    </div>
    <div class='control-panel_div_rt'>
      <div class='button_border ' style='display:inline-block;width:48px;height:40px;float: right;' id='reset'  @click='resetEvent'>
        <img style='width: 24px;height: 24px;  margin-top: 8px;margin-left: 12px' src='../../../../static/images/chongzhi.png' alt=''>
      </div>
        <div class='button_option' style='margin-top: 70px;'>

          <!--<h_button class="block status_btn" v-bind:class="{ event_disabled: disabled }" title="拆三角形" style="margin-top: 12px;" v-on:click.native="splitTriangleEvent"></h_button>-->
          <!--<h_button v-show="splicingTriangle" class="block status_btn" v-bind:class="{ event_disabled: splicingDisabled }" title="拼三角形" style="margin-top: 12px;" v-on:click.native="splicingTriangleEvent"></h_button>-->
          <!--<h_button class="block status_btn" v-bind:class="{ event_disabled: disabled }" title="加一个三角形" style="margin-top: 52px;" v-on:click.native="addTriangleEvent"></h_button>-->
          <!--<h_button class="block status_btn" v-bind:class="{ event_disabled: disabled }" title="加三个三角形" style="margin-top: 12px;" v-on:click.native="addMoreTriangleEvent"></h_button>-->

          <label  class="control-block_div_border"  id="s1" style="margin-top: 12px;" for="emjEnable" v-on:click="splitTriangleEvent">
            <input class="radio-default" type="radio" id="emjEnable" name="radio-group">
            <label for="emjEnable">拆三角形</label>
          </label>

          <label  class="control-block_div_border"  id="s2"  style="margin-top: 12px;" v-on:click="splicingTriangleEvent">
            <input class="radio-default" type="radio" id="bsjx"  name="radio-group"    >
            <label for="bsjx">拼三角形</label>
          </label>

          <label class="control-block_div_border"  id="s3" style="margin-top: 12px;" v-on:click="addTriangleEvent" >
            <input class="radio-default" type="radio" id="jygsjx"  name="radio-group"    >
            <label for="jygsjx">加一个三角形</label>
          </label>

          <label class="control-block_div_border"  id="s4"  style="margin-top: 12px;" v-on:click="addMoreTriangleEvent">
            <input class="radio-default" type="radio" id="jsgsjx"  name="radio-group"    >
            <label for="jsgsjx">加三个三角形</label>
          </label>

          <label for="checkbox-1">
            <div class="control-block_div_border switch" style="margin-top:10px;">
              <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" value="1" v-model="result">
              <label for="checkbox-1">结论</label>
            </div>
          </label>

          <!--<button class='button_option_index' >二面角</button><br>-->
          <!--<button class='button_option_index' id='showedge' @click=''>二面角的棱</button><br/>-->
          <!--<button class='button_option_index' id='showface' @click=''>二面角的面</button><br/>-->
          <!--<button class='button_option_index' @click=''>二面角的平面角</button>-->

        </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import h_button from '../../../../src/component/ui/button.vue';
import {DysjxViewHandler} from './DysjxViewHandler';
import {ViewController} from '../../../../src/core/ViewController';

export default Vue.extend({

    data() {
        return{
            desc: '斜边长为10cm的等腰直角三角形，它的面积是?有哪些求法呢？',
            disabled: false,
            splicingTriangle: false,
            splicingDisabled: false,
            showmodeone: false,
            showmodeltwo: false,
            showmodelthree: false,
            showmodelfour: false,
            isShowDesc: true,
            timer:-1,
            result: false,
            model:0
        };
    },
    components: {
        h_button
    },

    created() {
        ViewController.getInstance(new DysjxViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },

    mounted() {
        ViewController.getInstance().domReady();
    },

    watch: {
       result: function(val) {
           this.changeDescVis();

           //(ViewController.getInstance().viewHandler as DysjxViewHandler).tipSwitch(opacity as any);
       }
    },

    methods: {
        changeDescVis() {
            if(this.model > 0 ){
                this.isShowDesc = this.result;
            }
        },
        resetEvent() {
            window.clearTimeout( this.timer );
            this.resetRadio();
            this.desc = '斜边长为10cm的等腰直角三角形，它的面积是?有哪些求法呢？';
            (ViewController.getInstance().viewHandler as DysjxViewHandler).reset();
            //setTimeout(()=>{
                this.disabled = false;
                this.splicingDisabled = false;
                this.splicingTriangle = false;
                this.showmodeone = false;
                this.showmodeltwo = false;
                this.showmodelthree = false;
                this.showmodelfour = false;
            this.model = 0;
            this.result = false;
            this.isShowDesc = true;
           // }, 300);

           // (ViewController.getInstance().viewHandler as DihedralAngle).reset();
        },
        splitTriangleEvent() {
//            this.disabled = true;
            this.model = 1;
            window.clearTimeout( this.timer );
            this.changeDescVis();
           (ViewController.getInstance().viewHandler as DysjxViewHandler).reset();
            this.desc = '可以看到，原来的三角形被拆成了两个完全一样的等腰直角三角形，我们可以算出其中一个的面积乘以2。';
           (ViewController.getInstance().viewHandler as DysjxViewHandler).splitTriangleAnimation();

        },
        splicingTriangleEvent() {
//            this.disabled = true;
          //  this.splicingDisabled = true;
            this.model = 2;
            this.changeDescVis();
            window.clearTimeout( this.timer );
            (ViewController.getInstance().viewHandler as DysjxViewHandler).reset();
            this.splitTriangleEvent();
            this.timer =  setTimeout( ()=>{

                this.desc = '可以看到，两个全等的等腰直角三角形拼成了一个正方形，我们可以求该正方形的面积即原来三角形的面积。';
                (ViewController.getInstance().viewHandler as DysjxViewHandler).splicingTriangleAnimation();
            }, 6100);

        },
        addTriangleEvent() {
//            this.disabled = true;
            this.model = 3;
            this.changeDescVis();
            window.clearTimeout( this.timer );
            (ViewController.getInstance().viewHandler as DysjxViewHandler).reset();
            this.desc = '借1个同样大小的等腰直角三角形拼成两直角边为10厘米的大等腰直角三角形，求出面积再除以2，就是原三角形面积。';
            (ViewController.getInstance().viewHandler as DysjxViewHandler).addTriangleAnimation();
        },
        addMoreTriangleEvent() {
//            this.disabled = true;
            this.model = 4;
            this.changeDescVis();
            window.clearTimeout( this.timer );
            (ViewController.getInstance().viewHandler as DysjxViewHandler).reset();
            this.desc = '借3个同样大小的等腰直角三角形拼成边长为10厘米的正方形，求出面积再除以4，就是原三角形面积。';
            (ViewController.getInstance().viewHandler as DysjxViewHandler).addMoreTriangleAnimation();
        }
        ,
        resetRadio() { //重置单选按钮
            const ele = document.getElementsByName("radio-group");
            for(let i = 0; i < ele.length; i ++){
                (ele[i] as any).checked = false;
            }
//

        }
//        shou2(){
//            document.getElementById('s2').style.cursor = 'pointer';
//        },
//        shubiao2(){
//            document.getElementById('s2').style.cursor = 'default';
//        },
//        shou3(){
//            document.getElementById('s3').style.cursor = 'pointer';
//        },
//        shubiao3(){
//            document.getElementById('s3').style.cursor = 'default';
//        },
//        shou4(){
//            document.getElementById('s4').style.cursor = 'pointer';
//        },
//        shubiao4(){
//            document.getElementById('s4').style.cursor = 'default';
//        },
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
    width: 744px;height: 400px;
    /*border: 1px solid black;*/
  }
  .desc_title{
    color: #000000;
    font-size: 20px;
    text-align: center;
    position: relative;
    bottom: -35px;
  }
.control-block_div_border:hover {
  cursor: pointer;
}
 /* .button_option{
    width: 300px;
    height: 300px;
    position: absolute;
    bottom: 200px;
    padding: 20px 1px;
  }
  .button_option .button_option_index{
    width: 240px;
    height: 44px;
    padding: 10px 1px;
    margin: 5px 1px;
    background: #FFFFFF;
    border: 0 solid rgba(0,0,0,0.10);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
    border-radius: 6px;

  }*/
</style>
