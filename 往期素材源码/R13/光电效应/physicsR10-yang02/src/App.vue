<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas" :style="point_event"></div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="point_event">
        <ui-slider id="slider1" :min="100" :max="850" :speed="0" v-model="value1" :title="'波长（nm）'" :tooltip="true" :style="'margin-bottom:24px;'"></ui-slider>
        <ui-slider :title="'强度'" v-model="value2" :speed="0" :min="0" :max="100" :tooltip="false"></ui-slider>
      </div>
    </div>
  </div>
</template>
<script>
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //滑条
const BALL_BOTTOM_Y = 160;
const BALL_START_X = -130;
const RANGE = 90;
const FLOOR_X = -130;
const CEIL_X = 130;
const CENTER = BALL_BOTTOM_Y + RANGE / 2; //定义电子出现的区域的中心y轴坐标
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
    uiSlider
  },
  data() {
    return {
      title: '光电效应',
      value1: 400,
      value2: 0,
      ms: 0,
      voltage: 0.01,
      startSpeed: 0,
      isBatteryRotate: false,
      angle1: 0,
      point_event: {
        'pointer-events': 'auto'
      }
    }
  },
  created() {
    document.title = this.title;
    let colors = [34, 0, 0, 36, 0, 0, 38, 0, 0, 40, 0, 0, 42, 0, 0, 45, 1, 0, 46, 0, 0, 49, 1, 0, 50, 0, 0, 53, 1, 0, 55, 1, 0, 57, 1, 0, 59, 1, 0, 61, 1, 0, 63, 1, 0, 66, 1, 0, 67, 1, 0, 70, 2, 0, 71, 1, 0, 74, 2, 0, 76, 1, 0, 78, 2, 0, 80, 2, 0, 82, 2, 0, 84, 2, 0, 87, 2, 0, 88, 2, 0, 91, 2, 0, 92, 2, 0, 95, 3, 0, 96, 2, 0, 99, 3, 0, 101, 2, 0, 103, 3, 0, 105, 3, 0, 107, 3, 0, 109, 3, 0, 112, 3, 0, 113, 3, 0, 116, 3, 0, 117, 3, 0, 120, 4, 0, 122, 3, 0, 124, 4, 0, 126, 3, 0, 128, 4, 0, 130, 4, 0, 133, 4, 0, 134, 4, 0, 137, 4, 0, 138, 4, 0, 141, 4, 0, 143, 4, 0, 145, 5, 0, 147, 4, 0, 149, 5, 0, 151, 4, 0, 154, 5, 0, 155, 5, 0, 158, 5, 0, 159, 5, 0, 162, 5, 0, 164, 5, 0, 166, 6, 0, 168, 5, 0, 170, 6, 0, 172, 5, 0, 174, 6, 0, 176, 5, 0, 179, 6, 0, 180, 6, 0, 183, 6, 0, 184, 6, 0, 187, 6, 0, 189, 6, 0, 191, 7, 0, 193, 6, 0, 195, 7, 0, 197, 6, 0, 200, 7, 0, 201, 6, 0, 204, 7, 0, 205, 7, 0, 207, 9, 0, 207, 10, 0, 208, 12, 0, 208, 13, 0, 209, 15, 0, 209, 16, 0, 210, 18, 0, 210, 20, 0, 211, 22, 0, 211, 23, 0, 212, 25, 0, 212, 26, 0, 213, 28, 0, 213, 29, 0, 214, 31, 0, 214, 33, 0, 215, 35, 0, 215, 36, 0, 216, 38, 0, 216, 39, 0, 218, 41, 0, 218, 42, 0, 219, 45, 0, 219, 46, 0, 220, 48, 0, 220, 49, 0, 221, 51, 0, 221, 52, 0, 222, 54, 0, 222, 55, 0, 223, 58, 0, 223, 59, 0, 224, 61, 1, 224, 62, 0, 225, 64, 1, 225, 65, 0, 226, 67, 1, 226, 69, 0, 227, 71, 1, 227, 72, 0, 228, 74, 1, 228, 75, 0, 229, 77, 1, 230, 78, 0, 231, 80, 1, 231, 82, 0, 232, 84, 1, 232, 85, 0, 233, 87, 1, 233, 88, 0, 234, 90, 1, 234, 91, 0, 235, 94, 1, 235, 95, 0, 236, 97, 1, 236, 98, 0, 237, 100, 1, 237, 101, 0, 238, 103, 1, 238, 104, 0, 239, 107, 1, 239, 108, 0, 240, 110, 1, 240, 111, 0, 241, 113, 1, 242, 114, 0, 243, 116, 1, 243, 118, 0, 244, 120, 1, 244, 121, 0, 245, 123, 1, 245, 124, 0, 246, 126, 1, 246, 127, 1, 247, 130, 1, 247, 131, 1, 248, 133, 1, 248, 134, 1, 249, 136, 1, 249, 137, 1, 250, 139, 1, 250, 140, 1, 251, 142, 1, 251, 143, 1, 251, 145, 1, 251, 146, 1, 251, 148, 1, 251, 148, 1, 251, 150, 1, 251, 151, 1, 252, 153, 1, 251, 154, 1, 252, 155, 1, 251, 156, 0, 252, 158, 1, 251, 159, 0, 252, 161, 1, 251, 161, 0, 252, 163, 1, 251, 164, 0, 252, 166, 1, 252, 167, 0, 252, 168, 1, 252, 169, 0, 252, 171, 1, 252, 172, 0, 252, 174, 1, 252, 174, 0, 252, 176, 1, 252, 177, 0, 252, 179, 1, 252, 180, 0, 253, 181, 1, 252, 182, 0, 253, 184, 1, 252, 185, 0, 253, 187, 1, 252, 187, 0, 253, 189, 1, 252, 190, 0, 253, 192, 1, 253, 193, 0, 253, 194, 1, 253, 195, 0, 253, 197, 1, 253, 198, 0, 253, 199, 1, 253, 200, 0, 253, 202, 1, 253, 203, 0, 253, 205, 1, 253, 205, 0, 254, 207, 1, 253, 208, 0, 254, 210, 0, 253, 211, 0, 254, 212, 0, 253, 213, 0, 254, 215, 0, 253, 216, 0, 254, 218, 0, 253, 218, 0, 254, 220, 0, 254, 221, 0, 254, 223, 0, 254, 224, 0, 254, 225, 0, 254, 226, 0, 254, 228, 0, 254, 229, 0, 254, 231, 0, 254, 231, 0, 255, 233, 0, 254, 234, 0, 255, 236, 0, 254, 237, 0, 255, 238, 0, 254, 239, 0, 255, 241, 0, 254, 242, 0, 255, 244, 0, 254, 244, 0, 255, 246, 0, 255, 247, 0, 255, 249, 0, 253, 248, 0, 250, 248, 0, 246, 246, 0, 244, 246, 0, 240, 244, 0, 238, 244, 1, 234, 242, 0, 231, 242, 1, 228, 241, 0, 225, 240, 1, 222, 239, 1, 219, 238, 1, 216, 237, 1, 213, 237, 1, 209, 235, 1, 207, 235, 1, 203, 233, 1, 201, 233, 2, 197, 231, 1, 194, 231, 2, 191, 230, 1, 188, 229, 2, 185, 228, 2, 182, 227, 2, 178, 226, 2, 176, 226, 2, 172, 224, 2, 170, 224, 2, 166, 222, 2, 164, 222, 3, 160, 220, 2, 157, 220, 3, 154, 219, 2, 151, 218, 3, 148, 217, 3, 145, 216, 3, 141, 215, 3, 139, 214, 3, 135, 213, 3, 133, 213, 3, 129, 211, 3, 126, 211, 4, 123, 209, 3, 120, 209, 4, 117, 208, 3, 114, 207, 4, 111, 206, 4, 108, 205, 4, 104, 204, 4, 102, 203, 4, 98, 202, 4, 96, 202, 5, 92, 200, 4, 89, 200, 5, 86, 198, 4, 83, 198, 5, 80, 196, 4, 77, 196, 5, 74, 195, 5, 71, 194, 5, 67, 193, 5, 65, 192, 5, 61, 191, 5, 59, 191, 6, 55, 189, 5, 52, 189, 6, 49, 187, 5, 46, 187, 6, 43, 185, 5, 40, 185, 6, 36, 184, 6, 34, 183, 6, 30, 182, 6, 28, 181, 6, 24, 180, 6, 22, 180, 7, 18, 178, 6, 15, 178, 7, 12, 176, 6, 9, 176, 7, 6, 174, 6, 3, 174, 7, 0, 173, 7, 0, 172, 10, 0, 171, 13, 0, 171, 16, 0, 169, 18, 0, 169, 22, 0, 168, 24, 0, 167, 28, 0, 166, 30, 0, 166, 33, 0, 164, 36, 0, 164, 39, 0, 163, 42, 0, 162, 45, 0, 161, 47, 0, 161, 51, 0, 159, 53, 0, 159, 56, 0, 158, 59, 0, 157, 62, 0, 156, 65, 0, 156, 68, 0, 154, 70, 0, 154, 74, 0, 153, 76, 0, 152, 80, 0, 151, 82, 0, 151, 85, 0, 150, 88, 0, 149, 91, 0, 148, 94, 1, 148, 97, 0, 146, 99, 1, 146, 103, 0, 145, 105, 1, 144, 109, 0, 143, 111, 1, 143, 114, 0, 141, 117, 1, 141, 120, 0, 140, 123, 1, 139, 126, 0, 138, 128, 1, 138, 132, 0, 136, 134, 1, 136, 137, 0, 135, 140, 1, 134, 143, 0, 133, 146, 1, 133, 149, 0, 131, 151, 1, 131, 155, 0, 130, 157, 1, 129, 161, 0, 128, 163, 1, 128, 166, 0, 126, 169, 1, 126, 172, 0, 125, 175, 1, 125, 178, 0, 123, 180, 1, 123, 184, 0, 122, 186, 1, 121, 190, 0, 120, 192, 1, 120, 195, 0, 118, 198, 1, 118, 201, 0, 117, 204, 1, 116, 207, 0, 115, 209, 1, 115, 213, 0, 113, 215, 1, 113, 218, 1, 112, 221, 1, 111, 224, 1, 110, 227, 1, 110, 230, 1, 108, 232, 1, 108, 236, 1, 107, 238, 1, 106, 242, 1, 105, 244, 1, 105, 245, 1, 104, 243, 1, 103, 242, 1, 102, 240, 1, 102, 239, 1, 100, 237, 2, 100, 236, 1, 99, 233, 2, 99, 232, 1, 97, 230, 2, 97, 229, 1, 96, 227, 2, 95, 226, 2, 94, 223, 2, 94, 222, 2, 93, 220, 2, 92, 219, 2, 91, 217, 2, 91, 216, 2, 90, 214, 3, 89, 212, 2, 88, 210, 3, 88, 209, 2, 86, 207, 3, 86, 206, 2, 85, 204, 3, 85, 203, 3, 83, 200, 3, 83, 199, 3, 82, 197, 3, 82, 196, 3, 80, 194, 3, 80, 193, 3, 79, 191, 4, 78, 189, 3, 77, 187, 4, 77, 186, 3, 76, 184, 4, 75, 183, 3, 74, 181, 4, 74, 180, 4, 73, 177, 4, 72, 176, 4, 71, 174, 4, 71, 173, 4, 69, 171, 4, 69, 170, 4, 68, 168, 5, 68, 166, 4, 66, 164, 5, 66, 163, 4, 65, 161, 5, 64, 160, 5, 63, 158, 5, 63, 156, 5, 62, 154, 5, 61, 153, 5, 60, 151, 5, 60, 150, 5, 59, 148, 6, 58, 147, 5, 57, 144, 6, 57, 143, 5, 55, 141, 6, 55, 140, 5, 54, 138, 6, 54, 137, 6, 52, 135, 6, 52, 133, 6, 51, 131, 6, 51, 130, 6, 49, 128, 6, 49, 127, 6, 48, 125, 7, 47, 124, 6, 46, 121, 7, 46, 120, 6, 45, 118, 7, 44, 117, 6, 43, 115, 7, 43, 114, 7, 42, 112, 7, 41, 110, 8, 40, 110, 9, 40, 111, 10, 39, 111, 12, 39, 112, 12, 39, 112, 14, 39, 113, 15, 38, 113, 16, 38, 114, 17, 37, 114, 19, 37, 115, 19, 36, 115, 21, 36, 116, 22, 35, 116, 23, 35, 117, 24, 34, 117, 26, 34, 118, 26, 33, 118, 28, 33, 119, 29, 32, 119, 30, 32, 120, 31, 32, 120, 33, 32, 121, 33, 31, 122, 35, 31, 123, 35, 30, 123, 37, 30, 124, 38, 29, 124, 39, 29, 125, 40, 28, 125, 42, 28, 126, 42, 27, 126, 44, 27, 127, 45, 26, 127, 46, 26, 128, 47, 25, 128, 49, 26, 129, 49, 25, 129, 51, 25, 130, 52, 24, 130, 53, 24, 131, 54, 23, 131, 56, 23, 132, 56, 22, 132, 58, 22, 133, 59, 21, 133, 60, 21, 134, 61, 20, 134, 63, 20, 135, 63, 19, 135, 65, 19, 136, 66, 18, 136, 67, 19, 137, 68, 18, 137, 70, 18, 138, 70, 17, 138, 72, 17, 139, 73, 16, 139, 74, 16, 140, 75, 15, 140, 77, 15, 141, 77, 14, 141, 79, 14, 142, 80, 13, 142, 81, 13, 143, 82, 12, 143, 84, 12, 144, 84, 11, 144, 86, 12, 145, 87, 11, 145, 88, 11, 146, 89, 10, 146, 91, 10, 148, 91, 9, 148, 93, 9, 149, 94, 8, 149, 95, 8, 150, 96, 7, 150, 98, 7, 151, 98, 6, 151, 100, 6, 152, 101, 5, 152, 102, 5, 153, 103, 5, 152, 102, 6, 152, 101, 6, 150, 101, 7, 150, 100, 7, 148, 100, 8, 148, 99, 8, 146, 99, 9, 145, 98, 9, 144, 98, 10, 143, 97, 10, 142, 97, 11, 141, 96, 11, 140, 96, 12, 139, 95, 12, 137, 95, 13, 137, 94, 13, 135, 94, 14, 135, 93, 14, 133, 93, 15, 133, 92, 15, 131, 92, 16, 131, 91, 16, 129, 91, 17, 128, 90, 17, 127, 90, 18, 126, 89, 18, 125, 89, 19, 124, 88, 19, 123, 88, 20, 122, 87, 20, 120, 86, 21, 120, 85, 21, 118, 85, 22, 118, 84, 22, 116, 84, 23, 116, 83, 23, 114, 83, 24, 113, 82, 24, 112, 82, 25, 111, 81, 25, 110, 81, 26, 109, 80, 26, 108, 80, 27, 107, 79, 27, 106, 79, 28, 105, 78, 28, 103, 78, 29, 103, 77, 29, 101, 77, 30, 101, 76, 30, 99, 76, 31, 99, 75, 31, 97, 75, 32, 96, 74, 32, 95, 74, 33, 94, 73, 33, 93, 73, 34, 92, 72, 34, 91, 72, 35, 90, 71, 35, 88, 71, 36, 88, 69, 36, 86, 69, 37, 86, 68, 37, 84, 68, 38, 84, 67, 38, 82, 67, 39, 82, 66, 39, 80, 66, 40, 79, 65, 40, 78, 65, 41, 77, 64, 41, 76, 64, 42, 75, 63, 42, 74, 63, 43, 73, 62, 43, 71, 62, 44, 71, 61, 44, 69, 61, 45, 69, 60, 45, 67, 60, 46, 67, 59, 46, 65, 59, 47, 65, 59, 47, 64, 59, 47, 65, 58, 47, 64, 59, 47, 65, 58, 47, 64, 59, 48, 64, 58, 47, 64, 59, 48, 64, 58, 47, 63, 58, 48, 64, 58, 47, 63, 58, 48, 63, 58, 48, 63, 58, 48, 63, 58, 48, 63, 58, 48, 63, 57, 48, 62, 58, 48, 63, 57, 48, 62, 58, 48, 62, 57, 48, 62, 58, 49, 62, 57, 48, 61, 57, 49, 62, 57, 48, 61, 57, 49, 62, 57, 48, 61, 57, 49, 61, 57, 49, 61, 57, 49, 61, 57, 49, 60, 57, 49, 61, 56, 49, 60, 57, 49, 61, 56, 49, 60, 57, 50, 60, 56, 49, 60, 57, 50, 60, 56, 49, 59, 56, 50, 60, 56, 49, 59, 56, 50, 59, 56, 50, 59, 56, 50, 59, 56, 50, 59, 56, 50, 59, 55, 50, 58, 56, 50, 59, 55, 50, 58, 56, 50, 58, 55, 50, 58, 56, 51, 58, 55, 50, 57, 55, 51, 58, 55, 50, 57, 55, 51, 58, 55, 50, 57, 55, 51, 57, 55, 51, 57, 55, 51, 57, 55, 51, 56, 55, 51, 57, 54, 51, 56, 55, 51, 57, 54, 51, 56, 55, 52, 56, 54, 51, 56, 55, 52, 56, 54, 51, 55, 54, 52, 56, 54, 51, 55, 54, 52, 55, 54, 52, 55, 54, 52, 55, 54, 52, 55, 54, 52, 55, 53, 52, 54, 54, 52, 55, 53, 52, 54, 54, 52, 54, 53, 52, 54, 54, 53, 54, 53, 52, 53, 53, 53, 54, 53, 52, 53, 53, 53, 54, 53, 52, 53, 53, 53, 53, 53, 53, 53];
    this.stringArr = [];
    for (var i = 0; i < colors.length; i += 3) {
      this.stringArr.push(`rgb(${colors[i]},${colors[i+1]},${colors[i+2]})`);
    }
    this.stringArr.reverse();
  },
  mounted() {
    //禁止选择
    document.onselectstart = function() {
      return false;
    };
    this.color = this.stringArr[this.value1 - 100];
    this.TO = this.init();
    this.changeStartSpeed();
    this.changeElectronicNum();
    this.TO.changeVoltagePointer(0);
    this.TO.changeElectricityPointer();
    this.TO.changeLightingColor(this.color);
  },
  computed: {},
  watch: {
    value1(val) {
      this.color = this.stringArr[val - 100];
      this.TO.changeLightingColor(this.color); //改变灯光颜色
      this.changeStartSpeed(); //改变初始速度
      this.changeElectronicNum(); //改变出现电子数量
      this.TO.changeElectricityPointer(); //改变电流指针
    },
    value2(val) {
      this.TO.changeLightingOpacity(val / 250); //改变灯光透明度
      this.changeElectronicNum(); //改变出现电子数量
      this.TO.changeElectricityPointer(); //改变电流指针
    }
  },
  methods: {
    reset() {
      this.TO.reset();
    },
    //改变电子初始速度
    changeStartSpeed() {
      if (this.value1 < 542) {
        this.startSpeed = (542 - this.value1) * 3 / 442 + 2;
      } else {
        this.startSpeed = 0;
      }
    },
    changeElectronicNum() {
      //通过波长和强度控制电子出现的间隔
      if (this.value == 0 || this.value1 > 542) {
        return;
      }
      this.ms = (this.value1 - 100) * 400 / 442 + 400 - this.value2 * 4 + 80;
    },
    init() {
      var scene = null,
        camera = null,
        renderer = null,
        mainWidth = null,
        mainHeight = null,
        selectobjs = [],
        selectobj = null,
        raycaster = new THREE.Raycaster(),
        plane = new THREE.Plane(),
        offset = new THREE.Vector3(),
        intersection = new THREE.Vector3(),
        mouse = new THREE.Vector2(),
        INTERSECTED = null,
        mousedownflag = false,
        isMob = /iPad|Android/g.test(navigator.userAgent);
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      var offsetLeft = parseInt($('#renderCanvas').offset().left);
      var offsetTop = parseInt($('#renderCanvas').offset().top);
      mainWidth = $('#renderCanvas').width();
      mainHeight = $('#renderCanvas').height();
      scene = new THREE.Scene();
      scene.position.x = -100;
      camera = new THREE.PerspectiveCamera(50, mainWidth / mainHeight, 1, 10000);
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 1000;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0xffffff, 0);
      renderer.setSize(mainWidth, mainHeight);
      $("#renderCanvas").append(renderer.domElement);
      let commonObj = {};
      let ballArr = []; //存放电子实例的数组
      let timer = null; //清除定时创建小球的定时器
      let voltageNum = 0; //滑动变阻器贴图可拖动范围的值
      let ballGroup = new THREE.Group(); //所有电子实例都添加到这个组里，然后在场景中添加这个组
      let angle2 = 0;
      let preAngle2 = 0.9; //记录电流上一次数值，以方便实现动画
      let xishu = 0.5;
      //初始化场景里的东西。灯光和电路图
      var createObj = () => {
        //电路图
        let circuitry = createImg(1040, 760, 0, 0.7, 'static/UI/circuitry.png');
        // circuitry.position.y = 20;
        scene.add(circuitry);
        //灯光
        let flashlight = createImg(170, 152, 1, 0.6, 'static/UI/light.png');
        flashlight.position.y = 320;
        flashlight.position.x = 30;
        scene.add(flashlight);
        commonObj.lighting = lightShape(this.color);
        commonObj.lighting.position.set(-131, 230, 0);
        scene.add(commonObj.lighting);
        //创建划片
        commonObj.sliderGroup = new THREE.Group();
        commonObj.slider = createImg(56, 72, 1, 0.6, 'static/UI/slider.png');
        commonObj.sliderGroup.add(commonObj.slider);
        //放大触控区域
        let G = new THREE.PlaneGeometry(36, 52, 1);
        var M = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, transparent: true, opacity: 0 });
        var plane = new THREE.Mesh(G, M);
        plane.position.z = 1;
        plane.name = 'slider';
        selectobjs.push(plane);
        commonObj.sliderGroup.add(plane);
        commonObj.sliderGroup.position.set(0, -60, 1);
        scene.add(commonObj.sliderGroup);
        //电池
        commonObj.battery = createImg(222, 88, 1, 0.7, 'static/UI/battery.png');
        commonObj.battery.position.set(0, -250, 1);
        commonObj.battery.name = 'battery';
        selectobjs.push(commonObj.battery);
        scene.add(commonObj.battery);
        //创建两个指针;
        commonObj.pointer1 = createPointer();
        commonObj.pointer1.position.set(-132, 50, 1);
        commonObj.pointer2 = createPointer();
        commonObj.pointer2.position.set(258, 210, 1);
        scene.add(commonObj.pointer1, commonObj.pointer2);
        createBall();
        moveBall();
        scene.add(ballGroup);
        createPointer();
        //创建遮罩层 并在两秒后消失
        // scene.add(createMask());
        setTimeout(() => {
          scene.remove(commonObj.maskGroup);
          this.point_event['pointer-events'] = 'auto';
        }, 2000);
      }
      var createMask = () => {
        commonObj.maskGroup = new THREE.Group();
        let G = new THREE.PlaneGeometry(3000, 1000, 1, 1);
        let M = new THREE.MeshBasicMaterial({
          color: '#BFBEBE',
          transparent: true,
          opacity: 0.5
        });
        let plane = new THREE.Mesh(G, M);
        plane.position.z = 5;
        commonObj.maskGroup.add(plane);
        let texture1 = createImg(372, 114, 1, 0.5, 'static/UI/111.png');
        texture1.position.set(60, -10, 10);
        let texture2 = createImg(372, 114, 1, 0.5, 'static/UI/222.png');
        texture2.position.set(0, -180, 10);
        commonObj.maskGroup.add(texture1, texture2);
        return commonObj.maskGroup;
      }
      //改变电压指针
      var changeVoltagePointer = (val) => {
        this.angle1 = 0.9 - val * 1.8 / 125;
        commonObj.pointer1.rotation.z = this.angle1;
      }
      //改变电流指针
      //传进来的参数bool值为了确定是电池点击事件还是滑条拖动事件
      var changeElectricityPointer = (bool = false) => {
        cancelAnimationFrame(timer1);
        //波长大于541或者强度为0  没有电流
        if (this.value1 > 541 || this.value2 == 0) {
          electricityAni(preAngle2, 0.9);
          return;
        }
        let num = voltageNum + 2;
        let disArr = [];
        //如果电压为负，则通过循坏得到电子跑的最大距离，设置电流大小 强度也能微弱改变电流大小
        if (this.isBatteryRotate) {
          let dis = 0;
          let speed = this.startSpeed;
          for (let i = 0; i < 200; i++) {
            speed += this.voltage;
            dis += speed;
            disArr.push(dis);
          }
          let maxDis = Math.max(...disArr);
          //如果电子跑不到对面，就没有电流
          if (maxDis < 260) {
            angle2 = 0.9;
          } else {
            //距离和强度分配电流大小
            angle2 = 0.5 + (900 - maxDis) * 0.4 / 640 - this.value2 / 800;
          }
        } else {
          num = num > 90 ? 90 : num;
          angle2 = 0.9 - num * 0.8 / 90 - this.value2 * 0.4 / 100 + (this.value1 - 550) * 0.4 / 442;
        }
        electricityAni(preAngle2, angle2);
        return;
      }
      let timer1 = null;
      var electricityAni = (strat, end) => {
        let [beginning, ending] = [strat, end];
        let xishu = 0.04;
        let bool = false;
        if (strat > end) {
          ending = -end;
          beginning = -strat;
          xishu = -xishu;
          bool = true;
        }

        function animate() {
          strat += xishu;
          if (beginning >= ending) {
            commonObj.pointer2.rotation.z = end;
            preAngle2 = end;
            cancelAnimationFrame(animate);
            return;
          }
          beginning = bool ? -strat : strat;
          preAngle2 = strat;
          commonObj.pointer2.rotation.z = strat;
          timer1 = requestAnimationFrame(animate);
        }
        animate();
      }
      //定义小球的类
      class Ball {
        constructor(x, y, startSpeed) {
          this.el = createImg(60, 60, 2, 0.2, 'static/UI/ball.png');
          this.x = x;
          this.y = y + Math.random() * RANGE;
          this.startSpeed = startSpeed; //初始速度
          this.a = 0; //加速度
        }
        setPosition() {
          this.el.position.set(this.x, this.y, 1);
          return this;
        }
        //根据物体匀加速公式
        move(num, isBatteryRotate) {
          //限制加速度
          if (this.a > 3) {
            this.a = 3;
          } else if (this.a < -8) {
            this.a = -8;
          }
          this.a += num;
          this.x += this.startSpeed + this.a;
          return this;
        }
        addToScene(group) {
          group.add(this.el);
        }
        removeToScene(group) {
          group.remove(this.el);
        }
        //判断是否要从场景中删除电子
        isRemoveBall(group, voltage) {
          let bool = false;
          if (this.x >= CEIL_X || this.x < BALL_START_X||this.y<(BALL_BOTTOM_Y-40)|this.y>(BALL_BOTTOM_Y+RANGE+40)) {
            this.removeToScene(group);
            bool = true;
          }
          return bool;
        }
      }
      //定义少量偏移移动的电子类
      class DeviationBall extends Ball {
        constructor(x, y, startSpeed) {
          super(x, y, startSpeed);
          // this.isToUp = this.y > CENTER ? false : true; //判断电子应该往上还是往下跑
          this.deviation_y =Math.random()*4-2;
        }
        //让电子上下运动
        moveY() {
          this.y += this.deviation_y;
          return this;
        }
      }
      //小球动画
      var moveBall = () => {
        let that = this;
        let count = 0;

        function move() {
          //优化代码    动画每过一段时间自动清除null对象
          count++;
          if (count > 200) {
            ballArr = [...new Set(ballArr)];
            count = 0;
          }
          //循环数组中每个小球，让小球运动
          if (ballArr.length != 0) {
            ballArr.forEach((value, index, arr) => {
              let disappear;
              if (value != null) {
                //判断小球是否还在场景中，如果不在就把当前指向小球的变量变成null  优化代码
                if (value instanceof DeviationBall) {
                  value.moveY();
                }
                disappear = value.move(that.voltage, that.isBatteryRotate).setPosition().isRemoveBall(ballGroup, that.voltage);
                if (disappear) {
                  arr[index] = null;
                }
              }
            })
          }
          requestAnimationFrame(move);
        }
        move();
      }
      //创建小球的实例
      var createBall = () => {
        let ball;
        clearTimeout(timer);
        if (this.value2 !== 0 && this.value1 < 542) {
          if (Math.random() < (0.2+(0.8/90)*voltageNum)) {
            ball = new Ball(BALL_START_X, BALL_BOTTOM_Y, this.startSpeed);
          } else {
            ball = new DeviationBall(BALL_START_X, BALL_BOTTOM_Y, this.startSpeed);
          }
          ball.setPosition().addToScene(ballGroup);
          ballArr.push(ball);
        } else {
          //如果数组中小球都变成了null  就让数组长度为0   优化代码
          let bool = ballArr.every((value) => {
            return value == null;
          })
          if (bool) {
            ballArr = [];
          }
        }
        timer = setTimeout(createBall, this.ms);
      }
      //创建指针
      var createPointer = (angle) => {
        let group = new THREE.Group();
        let pointer = createImg(12, 32, 1, 1, 'static/UI/pointer.png');
        pointer.position.y = 16;
        group.add(pointer);
        return group;
      }
      //画光线的图形
      var lightShape = (color) => {
        let shape = new THREE.Shape();
        shape.moveTo(0, 75);
        shape.lineTo(0, -75);
        shape.lineTo(200, 120);
        shape.lineTo(0, 20);
        let plane = new THREE.Mesh(new THREE.ShapeGeometry(shape, 1), new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0 }));
        return plane;
      }
      //改变灯光颜色
      var changeLightingColor = (color) => {
        commonObj.lighting.material.color.set(color);
      }
      //改变灯光透明度
      var changeLightingOpacity = (opacity) => {
        commonObj.lighting.material.opacity = opacity;
      }
      //导入贴图函数
      var createImg = (w, h, z, scale, src) => {
        var PlaneG = new THREE.PlaneGeometry(w, h, 1, 1);
        var PlaneM = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(src),
          transparent: true,
          overdraw: 0.2,
          depthTest: false
        });
        var Plane = new THREE.Mesh(PlaneG, PlaneM);
        Plane.scale.set(scale, scale, scale);
        Plane.position.z = z;
        return Plane;
      };
      createObj();
      var animate = () => {
        requestAnimationFrame(animate);
        renderer.clear();
        renderer.render(scene, camera);
      };
      animate();
      //事件
      var onDocumentMouseDown = (event) => {
        var offsetLeft = parseInt($('#renderCanvas').offset().left);
        var offsetTop = parseInt($('#renderCanvas').offset().top);
        event.preventDefault();
        var mouse = {};
        mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
        mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(selectobjs);
        if (intersects.length > 0) {
          selectobj = intersects[0].object;
          if (selectobj.name === 'battery') {
            this.isBatteryRotate = !this.isBatteryRotate;
            if (this.isBatteryRotate) {
              this.voltage = -this.voltage * xishu;
            } else {
              this.voltage = -this.voltage / xishu;
            }
            // this.voltage = -this.voltage;
            commonObj.battery.rotation.z = this.isBatteryRotate ? Math.PI : 0;
            changeElectricityPointer(true);
          } else {
            mousedownflag = true;
          }
        }
      };
      var onDocumentMouseMove = (event) => {
        var offsetLeft = parseInt($('#renderCanvas').offset().left);
        var offsetTop = parseInt($('#renderCanvas').offset().top);
        event.preventDefault();
        var mouse = {};
        mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
        mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(selectobjs);
        raycaster.setFromCamera(mouse, camera);
        if (intersects.length > 0) {
          if (INTERSECTED != intersects[0].object) {
            INTERSECTED = intersects[0].object;
            plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
          }
        }
        if (mousedownflag) {
          if (raycaster.ray.intersectPlane(plane, intersection)) {
            var obj = intersection.sub(offset),
              x, y, b;
            x = obj.x + 100;
            y = obj.y;
            if (selectobj.name === 'slider') {
              x = x > 125 ? 125 : x < 0 ? 0 : x;
              commonObj.sliderGroup.position.x = x;
              // x = x > 90 ? 90 : x;
              voltageNum = x;
              this.voltage = x * 0.2 / 125 + 0.01;
              xishu = x * 5.5 / 125 + 0.2;
              if (this.isBatteryRotate) {
                // this.voltage = -this.voltage;
                // if (x < 60) {
                //   this.voltage = -this.voltage / 1.4;
                // } else {
                this.voltage = -this.voltage * xishu;
                // }
              }
              console.log(voltageNum);
              changeVoltagePointer(voltageNum);
              changeElectricityPointer();
            } else if (selectobj.name === 'E') {}
          }
        }
      };
      var onDocumentMouseUp = (event) => {
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
      };
      var onDocumentTouchStart = (event) => {
        var offsetLeft = parseInt($('#renderCanvas').offset().left);
        var offsetTop = parseInt($('#renderCanvas').offset().top);
        event.preventDefault();
        if (event.touches.length === 1) {
          var mouse = {};
          mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
          mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(selectobjs);
          if (intersects.length > 0) {
            selectobj = intersects[0].object;
            if (selectobj.name === 'battery') {
              this.isBatteryRotate = !this.isBatteryRotate;
              if (this.isBatteryRotate) {
                this.voltage = -this.voltage * xishu;
              } else {
                this.voltage = -this.voltage / xishu;
              }
              commonObj.battery.rotation.z = this.isBatteryRotate ? Math.PI : 0;
              changeElectricityPointer();
            } else {
              mousedownflag = true;
            }
          }
        }
      };
      var onDocumentTouchMove = (event) => {
        var offsetLeft = parseInt($('#renderCanvas').offset().left);
        var offsetTop = parseInt($('#renderCanvas').offset().top);
        event.preventDefault();
        if (event.touches.length === 1) {
          var mouse = {};
          mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
          mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(selectobjs);
          raycaster.setFromCamera(mouse, camera);
          if (intersects.length > 0) {
            if (INTERSECTED != intersects[0].object) {
              INTERSECTED = intersects[0].object;
              plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
            }
          }
        }
        if (mousedownflag) {
          if (raycaster.ray.intersectPlane(plane, intersection)) {
            var obj = intersection.sub(offset),
              x, y, b;
            x = obj.x + 100;
            y = obj.y;
            if (selectobj.name === 'slider') {
              x = x > 125 ? 125 : x < 0 ? 0 : x;
              voltageNum = x;
              commonObj.sliderGroup.position.x = x;
              this.voltage = x * 0.2 / 125 + 0.01;
              xishu = x * 5.5 / 125 + 0.2;
              if (this.isBatteryRotate) {
                // this.voltage = -this.voltage;
                // if (x < 60) {
                //   this.voltage = -this.voltage / 1.4;
                // } else {
                this.voltage = -this.voltage * xishu;
                // }
              }
              changeVoltagePointer(voltageNum);
              changeElectricityPointer();
            } else if (selectobj.name === 'E') {}
          }
        }
      };
      var onDocumentTouchEnd = (event) => {
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
      };
      renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
      renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
      window.addEventListener('mouseup', onDocumentMouseUp, false);
      renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
      renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
      renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
      window.addEventListener('resize', () => {
        offsetLeft = parseInt($('#renderCanvas').offset().left);
        offsetTop = parseInt($('#renderCanvas').offset().top);
        mainWidth = $('#renderCanvas').width();
        mainHeight = $('#renderCanvas').height();
        camera.aspect = mainWidth / mainHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mainWidth, mainHeight);
      });
      var resetWidget = () => {
        voltageNum = 0;
        this.value1 = 400;
        this.value2 = 0;
        this.voltage = 0.01;
        this.isBatteryRotate = false;
        this.angle1 = 0;
        xishu = 0.2;
        this.changeStartSpeed();
        ballArr = [];
        scene.remove(ballGroup);
        ballGroup = new THREE.Group();
        scene.add(ballGroup);
        changeElectricityPointer();
        commonObj.sliderGroup.position.x = 0;
        commonObj.battery.rotation.z = 0;
        commonObj.pointer1.rotation.z = 0.9;
        commonObj.pointer2.rotation.z = 0.9;
      };
      var TO = function() {
        return {
          reset: resetWidget,
          changeLightingColor,
          changeLightingOpacity,
          createBall,
          changeVoltagePointer,
          changeElectricityPointer,
        }
      }
      return TO();
    },
  },
}

</script>
<style>
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

input,
button {
  outline: none;
  -webkit-appearance: none;
  border-radius: 0;
}


/*盒模型，padding尺寸不用再减去*/

*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  background-color: #fff;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*background-image: -webkit-radial-gradient(circle at center, #490188, #04163E);*/
  /*background-image: radial-gradient(circle at center, #490188, #04163E);*/
}

.noselect {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Chrome/Safari/Opera */
  -khtml-user-select: none;
  /* Konqueror */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently not supported by any browser */
}


/*内容区*/

.container {
  width: 100%;
  height: 100%;
  float: left;
  position: relative;
}

.container h3 {
  font-size: 32px;
  color: #000;
  line-height: 1.0;
  padding: 24px;
  position: absolute;
  top: 0;
  z-index: 999;
  font-weight: normal;
  background-color: transparent;
}

#renderCanvas {
  width: 100%;
  height: 100%;
  outline: none;
  position: absolute;
  top: 0;
}

canvas {
  position: absolute;
}

.aside_reset {
  margin: 24px;
  float: right;
}

.app_aside {
  position: absolute;
  right: 0;
  width: 280px;
  background-color: transparent;
  height: 100%;
  z-index: 888;
  /*box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);*/
}

.btn_space {
  padding: 20px;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
}

.btn_space .uiSlider.ui-box {
  background: rgba(74, 74, 74, .6);
  padding: 0 12px !important;
}

.uiSlider .vue-slider::after {
  background: rgba(0, 0, 0, .24);
}

#slider1.uiSlider .vue-slider::after {
  background-image: linear-gradient(90deg, #353535 0%, #3B2F41 11%, #670599 22%, #07296E 33%, #0169F6 44%, #00AD07 55%, #FFF900 66%, #FB8E01 77%, #CE0700 88%, #210000 100%);
  border: 2px solid rgba(255, 255, 255, 0.77);
  border-radius: 5px;
  height: 30px;
  /*transform: scale(-1);*/
  margin-top: -20px;
}

#slider1.uiSlider .ui-dot {
  margin-top: -8px;
}

#slider1.uiSlider .ui-dot .dotTxt {
  width: 8px;
  height: 36px;
  background: #FFFFFF !important;
  border: 0 solid rgba(151, 151, 151, 0.42);
  box-shadow: 0 2px 4px 0 rgba(125, 125, 125, 0.50);
  border-radius: 3px;
  margin-top: 4px;
}

.uiSlider .ui-title {
  color: #fff !important;
}

#app .aside_reset {
  position: fixed;
  right: 0;
  top: 0;
}

.uiSlider .ui-dot .dotTxt {
  background: #707070 !important;
  border: 0 solid rgba(0, 0, 0, 0.06) !important;
  box-shadow: 0 2px 6px 0 rgba(224, 224, 224, 0.24) !important;
}

#slider1 .ui-toolTip-top.ui-toolTip-wrap {
  display: block !important;
}

</style>
