<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div id="box" style="width: 100%;height: 100%;display: flex">
            <div id="Container" style="width: 100%; height: 100%;">
              <div id="3dContainer" style="width: 100%; height: 100%;">
                <v-stage :config='configStage'>
                  <v-layer :config='configLayer'>
                    <!-- x 轴 -->
                    <v-line :config='configX' />
                    <v-text v-for="(item, index) in [-4,-3,-2,-1,0,1,2,3,4]" v-bind:key="'x'+index"
                      :config="{x:(width - layerBorder) / 2 + 15 + ((layerBorder-40) / 10) * (index + 1),
                      y:height/2 + 5,text: item, fontSize: 15}"/>
                    <v-text :config="{x:(width - layerBorder) / 2 + 15 + ((layerBorder-40) / 10) * 10,
                      y:height/2 + 5,text: 'x', fontSize: 15,fontStyle:'italic',fontFamily:'Times New Roman'}"/>
                    <!-- y 轴 -->
                    <v-line :config='configY' />
                    <v-text v-for="(item, index) in [4,3,2,1,0,-1,-2,-3,-4]" v-bind:key="'y'+index"
                      :config="{x:width/2 - 20,y:((layerBorder-40) / 10) * (index + 1) + 15 + (height-layerBorder)/2,
                      text: item, fontSize: 15}"/>
                    <v-text :config="{x:width/2 - 20,y: 15 + (height-layerBorder)/2,
                      text: 'y', fontSize: 15,fontStyle:'italic',fontFamily:'Times New Roman'}"/>
                    <!-- 圆点 -->
                      <v-text :config="{x:width/2-20,y: height/2,
                      text: 'O', fontSize: 18,fontStyle:'italic',fontFamily:'Times New Roman'}"/>
                    <!----------- x+y-4=0 -------------->
                    <v-line :config='configLine1' />
                    <v-text :config='{x:configLine1.points[2] - 100,y:configLine1.points[3],
                        text: "x + y - 4 = 0", fontFamily:"Times New Roman",
                        fill: "#5F9BEE", fontSize: 15,fontStyle:"italic"}' />
                    <v-arrow :config="{
                        x:configLine1.points[0] - 10,
                        y:configLine1.points[1] + 20,
                        points: [0, 0, -50, 50],
                        pointerLength: 10,
                        pointerWidth: 8,
                        fill: '#5F9BEE',
                        stroke: '#5F9BEE',
                        strokeWidth: 2 }" />
                     <!----------- x - y = 0 ---------------->
                    <v-line :config='configLine2' />
                    <v-text :config='{x:configLine2.points[2] - 70,y:configLine2.points[3],text: "x - y = 0",
                        fill: "#8BC052", fontSize: 15,fontStyle:"italic",fontFamily:"Times New Roman",}' />
                    <v-arrow :config="{
                        x:configLine2.points[0] - 10,
                        y:configLine2.points[1] + 20,
                        points: [0, 0, -50, -50],
                        pointerLength: 10,
                        pointerWidth: 8,
                        fill: '#8BC052',
                        stroke: '#8BC052',
                        strokeWidth: 2 }" />
                    <!---------- x - 1 = 0 -------------->
                    <v-line :config='configLine3' />
                    <v-text :config='{x:configLine3.points[2],y:configLine3.points[3],text: "x - 1 = 0",
                        fill: "#AA8374", fontSize: 15,fontStyle:"italic",fontFamily:"Times New Roman",}' />
                    <v-arrow :config="{
                        x:configLine3.points[0] + 10,
                        y:configLine3.points[1] + 20,
                        points: [0, 0, 50, 0],
                        pointerLength: 10,
                        pointerWidth: 8,
                        fill: '#AA8374',
                        stroke: '#AA8374',
                        strokeWidth: 2 }" />
                    <!-------- 圆点 ---------->
                    <v-circle :config='circle1'/>
                    <v-text :config='{x:circle1.x-20,y:circle1.y,fontSize: 15,text:"C",fontStyle:"italic"}'/>
                    <v-circle :config='circle2'/>
                    <v-text :config='{x:circle2.x-20,y:circle2.y,fontSize: 15,text:"A",fontStyle:"italic"}'/>
                    <v-circle :config='circle3'/>
                    <v-text :config='{x:circle3.x+20,y:circle3.y,fontSize: 15,text:"B",fontStyle:"italic"}'/>
                    <!------------ 三角形 --------->
                    <v-line v-if="step==2" :config='triangle' />
                    <!-- 虚线 -->
                    <v-line v-if="step==2" :config='dotLine' />
                    <v-image v-if="step==2" :config='dragDot'
                        @dragstart="handleDragStart"
                        @dragmove="handleDragMove"
                        @dragend="handleDragEnd"/>
             
                  </v-layer>
                </v-stage>
              </div>
            </div>
            <div id="value">
              <img src="./sub_static/value.png" alt=""> <span>=</span>
              <span class='value'>{{value}}</span>
            </div>
        </div>
      </template>
    </exerciseLayout>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
import { ViewModel } from './ViewModel';

@Component({
  components: {
    exerciseLayout
  },
  mixins: [ViewModel]
})

export default class App extends Vue {}
</script>

<style scoped>
body {
  overflow: hidden !important;
}
#renderCanvas {
  width: 100%;
  height: 100%;
  outline: 0;
}
.title_text {
  font-size: 24px;
  line-height: 24px;
  color: #fff;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
}

#value{
  position: absolute;
  color: #000;
  bottom: 40px;
  right: 40px;
  display: flex;
  align-items: center;
}
#value img {
  height: 26px;
  width: auto;
  display: inline;
}
.value{
  padding: 5px 10px;
  background-color: rgb(194, 210, 224);
  border: 1px solid #dddddd;
  border-radius: 5px;
}

img {
  width: 100%;
  height: 100%;
}
#Container {
  /* background-color: #333333; */
}
#fps {
  position: absolute;
  left: 20px;
  top: 5em;
  font-size: 20px;
  color: #fff;
  text-shadow: 2px 2px 0 #000;
  display: none;
}

</style>