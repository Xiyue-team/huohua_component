<template>
  <div :style="{width:'100%',height:'100%'}">
  <div class="demo">

    <ui-btn>按钮</ui-btn>
    <br><br>

    <ui-btn type="reset1"></ui-btn>
    <br><br>

    <ui-btn type="reset2"></ui-btn>
    <br><br>

    <ui-btn type="blue">按钮</ui-btn>
    <br><br>

    <ui-btn size="big">按钮</ui-btn>
    <br><br>

    <ui-btn :width="98" :height="44">开始</ui-btn>
    <br><br>

    <ui-btn type="blue" size="big">按钮</ui-btn>
    <br><br>

    <img src="static/UI/Group 2@2x.png" class="UI-camera" alt="">
    <br><br>

    <ui-btn type="play" v-model="played" ></ui-btn>
    <br><br>

    <ui-btn type="zoom" v-model="zoomed" ></ui-btn>
    <br><br>

    <ui-btn type="radio" v-model="radio_checked">
      单选框
    </ui-btn>
    <br><br>
    <ui-btn type="radio" v-model="radio_checked1" :width="98" :height="44">
      正视
    </ui-btn>
    <br><br>

    <ui-group type="radio"
              :margin="20"
              :groups="groups"
              v-model="radio"></ui-group>
    <br><br>

    <ui-btn type="checkbox" v-model="checkbox_checked1">
      多选框
    </ui-btn>
    <br><br>

    <ui-btn type="switch" v-model="switch_checked1">
      switch
    </ui-btn>
    <br><br>
    <ui-slider ></ui-slider>
    <br>
    <br>

    <ui-slider :label="['0°','360°']"
                :min="0"
                :max="360"
                formatter="{value}°"></ui-slider>
    <br>
    <br>

    <ui-slider :label="['0','5']"
                :interval="0.1"
                :min="0"
                :max="5"
                :infinity="true"></ui-slider>
    <br>
    <br>

    <ui-slider direction="vertical"
                :boxWidth="60"
                :boxHeight="330"
                :title="false"
                :noBlueProcess="true"
                :realTime="true"
                :processWidth="6"></ui-slider>
    <br>
    <br>

    <ui-slider value="基态"
                :boxWidth="330"
                :boxHeight="108"
                :title="false"
                :piecewise="true"
                :piecewiseLabel="true"
                :tooltip="false"
                :noBlueProcess="true"
                :data="['基态','激发态','杂化态']"></ui-slider>
    <br>
    <br>

    <ui-slider :subTitle="'提示内容'"
                :value="[30,60]"></ui-slider>
    <br>
    <br>

    <ui-slider :interval="0.01"
                :min="-23.44"
                :max="23.44"
                :value="0"
                :label="['23°26′N','23°26′S']"
                :formatter="formatter"
                :noBlueProcess="true"
                dotTxt="H"></ui-slider>
    <br>
    <br>

    <ui-slider :min="-90"
                :max="90"
               :value="[-60,0]"
                :label="['N','S']"
                :formatter="formatter2"
                @callback="cb"
                :dotTxt="['B','A']"></ui-slider>
    <br>
    <br>

    <ui-btn type="switch"
            :width="98"
            :height="96"
            :vertical="true"
            v-model="switch_checked1">辅助线</ui-btn>
    <br>
    <br>

    <ui-group class="switchWithSlider">
      <ui-slider :min="1"
                 :box="false"
                 :max="30"
                 :value="2"
                 :label="['1','30']"
                 :infinity="true"
                 dotTxt="N"></ui-slider>
      <ui-btn type="switch" v-model="switch_checked1">标题</ui-btn>
    </ui-group>
    <br>
    <br>

    <ui-slider value="基态"
               :boxWidth="240"
               :boxHeight="108"
               :piecewise="true"
               :piecewiseLabel="true"
               :tooltip="false"
               :noBlueProcess="true"
               :data="['基态','激发态','杂化态']"></ui-slider>
    <br>
    <br>

    <ui-slider value="某某值"
               :boxWidth="200"
               direction="vertical"
               :boxHeight="330"
               :piecewise="true"
               :realTime="true"
               :piecewiseLabel="true"
               :title="false"
               :tooltip="false"
               :noBlueProcess="true"
               :data="['某某值','某某值','某某值']"></ui-slider>
    <br>
    <br>

    <ui-slider value="-100"
               :min="-100"
               :max="0"
               :boxWidth="779"
               :boxHeight="70"
               :title="false"
               :tooltip="false"
               :timeLine="true"
               :label="['5000MAY','3500MAY','3500MAY','3500MAY','现今']"></ui-slider>
    <br>
    <br>

    <ui-other type="board" :value="boardValue" :speed="1.8"></ui-other>
    <br>
    <br>

    <ui-other type="tooltip">提示内容提示内容提示内容</ui-other>
    <br>
    <br>

    <ui-other type="tooltip" pos="bottom">提示内容</ui-other>
    <br>
    <br>
    <br>
    <br>
    <button @click="reset">reset</button>
    <br><br><br><br>
    <ui-other type="dropImg"
              :time="10"
              ref="drop"
              acceptEl="accept"
              @success="addImg"
              img="static/UI/Bitmap.png"></ui-other>
    <div id="accept" style="width: 500px;height: 500px;background-color: #fff;">
      <img :src="src" v-for="src in imgs" alt="">
    </div>








  </div>
    <ul class="link">
      <router-link to="temp1" tag="li" :class="{active:linkName==='temp1'}">模版1</router-link>
      <router-link to="temp2" tag="li" :class="{active:linkName==='temp2'}">模版2</router-link>
      <router-link to="temp3" tag="li" :class="{active:linkName==='temp3'}">模版3</router-link>
      <router-link to="temp4" tag="li" :class="{active:linkName==='temp4'}">模版4</router-link>
      <router-link to="temp5" tag="li" :class="{active:linkName==='temp5'}">模版5</router-link>
    </ul>
  </div>
</template>

<script>
    import UiBtn from '@/components/UI/uiBtn';
    import uiGroup from '@/components/UI/uiGroup';
    import uiSlider from '@/components/UI/uiSlider';
    import uiOther from '@/components/UI/uiOther';
    export default{
        props: [],
        components: {UiBtn,uiSlider,uiGroup,uiOther},
        created(){},
      computed:{
        linkName(){
          return this.$route.name
        }
      },
        data(){
            return {
                played:true,
                zoomed:true,
                radio_checked:false,
                radio_checked1:false,
                boardValue:0,
                radio:'one',
                groups:[{
                    name:'one',
                    txt:'多个单选框选择一个'
                },{
                    name:'two',
                    txt:'多个单选框选择一个'
                }],
                checkbox_checked1:false,
                switch_checked1:false,
              imgs:[]
            };
        },
        watch:{
            radio(val){
                console.log('数值改变了',val)
            },
        },
        mounted(){
          setInterval(()=>{
              this.boardValue = parseInt(parseFloat(Math.random()*(Math.random()>0.5?1:-1))*150);
          },1000)
        },
        methods: {
            changeEvent(val){
                this.options5.value = val
            },
            //度转度分
            formatDegree(value){
                value = Math.abs(value);
                var v1 = Math.floor(value);//度
                var v2 = Math.floor((value - v1) * 60);//分
                var v3 = Math.round((value - v1) * 3600 % 60);//秒
                if(v2 === 0){
                    return v1 + '°';
                }else{
                    return v1 + '°' + v2 + '′';
                }

            },

            //转换显示
            formatter(value){
                return this.formatDegree(value)
            },

            formatter2(value){
                return Math.abs(value)+'°';
            },

            cb(val){
//                console.log('callback',val)
            },

          addImg(){
//            this.imgs.push('static/UI/Bitmap.png')
            setTimeout(()=>{
              this.$refs.drop.end();
              this.imgs.push('static/UI/Bitmap.png')
            },1000)
          },

          reset(){
              this.$refs.drop.reset();
              this.imgs = [];
          }

        }
    };
</script>

<style>
  .demo{
    background-color: #F7F7F7;
    padding: 20px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    height: 80%;
  }
  .link{
    width:100%;
    display: table;
    margin-top:20px;
  }
  .link li{
    width: 160px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color:#63df8f;
    color: #fff;
    display: table-cell;
    cursor: pointer;
  }
  .link li.active{
    color: #333;
  }




</style>
