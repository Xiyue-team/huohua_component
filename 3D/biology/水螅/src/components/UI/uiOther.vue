<template>
    <div id="uiOther" class="noselect" :class="[type,type === 'tooltip'?pos:'']">
      <!--罗盘-->
      <img src="static/UI/biaopan@2x.png" alt="" v-if="type === 'board'">
      <img src="static/UI/zhizhen@2x.png"
           :style="{transform:'rotate('+value+'deg)',transitionDuration:speed+'s'}"
           class="zhen" alt="" v-if="type === 'board'">
      <!--提示框-->
      <slot v-if="type === 'tooltip'"></slot>
      <!--可拖动模型-->
      <ul v-if="type === 'dropImg'">
        <li v-for="i in time" :class="{used:useds[i-1]}"></li>
      </ul>
      <div v-if="type === 'dropImg' && useds.length >= time" class="mask"></div>
      <img :src="img" v-if="img" :style="{opacity:opacity}" v-drag id="dragImg">
    </div>
</template>

<script>
    export default{
        props: {
            type:String,
            img:String,
            acceptEl:String,
            pos:{type:String,default:'top'},
            value:Number,
            time:Number,
            speed:{type:Number,default:1.6}
        },
        data(){
          return {
            useds:[],
            opacity:1,
            left:0,
            top:0,
            imgStyle:{}
          };
        },
        components: {},
        created(){
        },
        computed:{
        },
        directives:{
          drag:{
            bind(el,v,c){
                const vm = c.context;
                $(document).ready(()=>{
                  $(el).draggable({revert: "invalid"});
                  $('#'+vm.acceptEl).droppable({
                    accept: '#dragImg',
                    drop(){
                      vm.$emit('success');
                      $(el).animate({opacity:0},200,()=>{
                        $(el).animate({left:0,top:0},10)
                      });
                      vm.useds.push(1);
                    }
                  })
                })
              }
          }
        },
        mounted(){},
        methods: {
            reset(){
              this.end();this.useds = [];
            },
            end(){
                $('#dragImg').animate({opacity:1},1000)
            }
        },
    };
</script>

<style>
/*仪表盘*/
.board{
  position: relative;
  width: 180px;
  height: 180px;
}
.board img{
  width: 100%;
  height: 100%;
}
.board img.zhen{
  position: absolute;
  top:33px;
  left:calc(50% - 6px);
  width: 10px;
  height: 60px;
  transform-origin:center bottom ;
  transition-property: all;
}
/*提示框*/
.tooltip {
  position: relative;
  display: inline-block;
  font-size: 14px;
  color: #519BE0;
  line-height: 44px;
  height: 44px;
  padding: 0 10px;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px rgba(0, 0, 0, 0.06);
}
.tooltip.top::after{
  content: '';
  position: absolute;
  top: -9px;
  left: calc(50% - 8px);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 10px solid #fff;
  filter: drop-shadow(0 -1px 3px rgba(0,0,0,0.08));
}
.tooltip.bottom::after{
  content: '';
  position: absolute;
  top: 42px;
  left: calc(50% - 8px);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px solid #fff;
  filter: drop-shadow(0 1px 3px rgba(0,0,0,0.08));
}
/*可拖动模型*/
  .dropImg{
    position: relative;
    width: 180px;
    height: 180px;
    border-radius: 6px;
    background-color: #ffffff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    border: solid 0.5px rgba(0, 0, 0, 0.06);
    display: flex;
    justify-content: center;
    align-items: center;
  }
.dropImg img{
  cursor: move;
  width: 129px;
  height: 126px;
}
.dropImg ul{
  position: absolute;
  top:-30px;
  left:0;
  width: 100%;
  text-align: center;
}
.dropImg ul li{
  width: 6px;
  height: 12px;
  border-radius: 2px;
  background-color: #5caefd;
  display: inline-block;
  margin-right: 5px;
  transition: all 0.3s;
}
.dropImg ul li:last-child{
  margin-right: 0;
}
.dropImg ul li.used{
  background-color: #d5d5d5;
}
.dropImg .mask{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
</style>
