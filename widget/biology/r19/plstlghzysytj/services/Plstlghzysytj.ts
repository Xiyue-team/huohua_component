import * as sunblack from '../sub_static/assets/sun-black.png';
import * as sun from '../sub_static/assets/sun.png';
import * as glassblack from '../sub_static/assets/glass-black.png';
import * as glasssun from '../sub_static/assets/glass-sun.png';

import * as candel0 from '../sub_static/assets/candel/0.png';
import * as candel1 from '../sub_static/assets/candel/1.png';
import * as candel2 from '../sub_static/assets/candel/2.png';
import * as candel3 from '../sub_static/assets/candel/3.png';

import * as mouse0 from '../sub_static/assets/mouse/0.png';
import * as mouse1 from '../sub_static/assets/mouse/1.png';
import * as mouse2 from '../sub_static/assets/mouse/2.png';
import * as mouse3 from '../sub_static/assets/mouse/3.png';

import * as mousesp0 from '../sub_static/assets/mouse-sun-plant/0.png';
import * as mousesp1 from '../sub_static/assets/mouse-sun-plant/1.png';
import * as mousesp2 from '../sub_static/assets/mouse-sun-plant/2.png';
import * as mousesp3 from '../sub_static/assets/mouse-sun-plant/3.png';

import * as plant0 from '../sub_static/assets/plant/0.png';
import * as plant1 from '../sub_static/assets/plant/1.png';
import * as plant2 from '../sub_static/assets/plant/2.png';
import * as plant3 from '../sub_static/assets/plant/3.png';

export class Plstlghzysytj {

  //点击添加物体框
  addObject() {
    const temp = (window as any).viewHandler.viewModel.$data;
    if (temp.xianShi === 'none') {
      temp.xianShi = '';
    } else {
      //再次点击物体框消失并将选中的物体从数组删除
      temp.xianShi = 'none';
      temp.active1 = false;
      temp.active2 = false;
      temp.active3 = false;
      temp.listZ = [];
    }
  }

  //改变光照方法
  changeLight() {
    const temp = (window as any).viewHandler.viewModel.$data;
    //改变有无阳光时 界面对应的一些样式改变
    //背景、桌子、按钮、玻璃罩、标题
    if (temp.skyopacity === '1') {
      temp.fs_sunbtn = sunblack;
      temp.skyopacity = '0';
      temp.bgColor = '#444444';
      temp.fs_glass = glassblack;
      temp.activeColor = '#FFFFFF';
      temp.sunshine = false;
    } else {
      temp.fs_sunbtn = sun;
      temp.skyopacity = '1';
      temp.bgColor = '#FFECB2';
      temp.fs_glass = glasssun;
      temp.activeColor = '#444444';
      temp.sunshine = true;
    }
  }

  //蜡烛动画
  candel() {
    const temp = (window as any).viewHandler.viewModel.$data;
    //id为 candel 切图动画以及渐隐渐现动画
    const candelFun = () => {
      //当图片切换结束时清除定时器、结束方法
      if (temp.value > 2) {
        clearTimeout(temp.timer);
        return;
      }
      //根据value的变化实现图片切换效果
      if (temp.value === 0) {
        temp.bg_candel = candel0;
      } else if (temp.value === 2) {
        temp.bg_candel = candel2;
      }
      temp.value = temp.value + 2;
      //给图片加上渐隐渐现的css动画
      temp.candelactive = true;
      //设置图片切换时间、4s是为了能够给渐隐渐现效果很好的展示
      temp.timer = setTimeout(candelFun, 4000);
    };
    candelFun();

    //id为 candel1 切图动画以及渐隐渐现动画
    const candel1Fun1 = () => {
      //当图片切换结束时清除定时器、结束方法
      if (temp.value2 > 3) {
        clearTimeout(temp.timer1);
        return;
      }
      //根据value的变化实现图片切换效果
      if (temp.value2 === 1) {
        temp.bg_candel1 = candel1;
      } else if (temp.value2 === 3) {
        temp.bg_candel1 = candel3;

        //当最后一张图片出现时，视觉上动画已经结束。这时可以选择下一次的动画
        //此时右下角按钮可点击
        temp.pointerEvents = 'auto';
        temp.stoppacity = '1';
        temp.candel1opacity = '1';
        temp.candelopacity = '0';
      }
      //value值变化
      temp.value2 = temp.value2 + 2;
      //添加渐隐渐现css动画
      temp.candel1active = true;
      temp.timer1 = setTimeout(candel1Fun1, 6000);
    };
    candel1Fun1();
  }

  //小鼠动画
  mouse() {
    const temp = (window as any).viewHandler.viewModel.$data;
    //id为 mouse 切图动画以及渐隐渐现动画
    const mouseFun = () => {
      //图片全部执行完成后调用的方法
      if (temp.value1 > 2) {
        clearTimeout(temp.timer2);
        return;
      }
      //根据value切图
      if (temp.value1 === 0) {
        temp.bg_mouse = mouse0;
      } else if (temp.value1 === 2) {
        temp.bg_mouse = mouse2;
      }
      temp.value1 = temp.value1 + 2;
      //添加渐隐渐现css动画
      temp.mouseactive = true;
      temp.timer2 = setTimeout(mouseFun, 4000);
    };
    mouseFun();

    //id为 mouse1 切图动画以及渐隐渐现动画
    const mouse1Fun1 = () => {
      if (temp.value3 > 3) {
        clearTimeout(temp.timer3);
        return;
      }
      if (temp.value3 === 1) {
        temp.bg_mouse1 = mouse1;
      } else if (temp.value3 === 3) {
        temp.bg_mouse1 = mouse3;

        temp.pointerEvents = 'auto';
        temp.stoppacity = '1';
        temp.mouse1opacity = '1';
        temp.mouseopacity = '0';
      }
      temp.value3 = temp.value3 + 2;
      temp.mouse1active = true;
      temp.timer3 = setTimeout(mouse1Fun1, 6000);
    };
    mouse1Fun1();
  }

  //植物动画
  plant() {
    const temp = (window as any).viewHandler.viewModel.$data;
    //id为 plant 切图动画以及渐隐渐现动画
    const plantFun = () => {
      if (temp.value4 > 2) {
        clearTimeout(temp.timer4);
        return;
      }
      if (temp.value4 === 0) {
        temp.bg_plant = plant0;
      } else if (temp.value4 === 2) {
        temp.bg_plant = plant2;
      }
      temp.value4 = temp.value4 + 2;
      temp.plantactive = true;
      temp.timer4 = setTimeout(plantFun, 4000);
    };
    plantFun();

    //id为 plant1 切图动画以及渐隐渐现动画
    const plant1Fun1 = () => {
      if (temp.value5 > 3) {
        clearTimeout(temp.timer5);
        return;
      }
      if (temp.value5 === 1) {
        temp.bg_plant1 = plant1;
      } else if (temp.value5 === 3) {
        temp.bg_plant1 = plant3;

        temp.pointerEvents = 'auto';
        temp.stoppacity = '1';
        temp.plant1opacity = '1';
        temp.plantopacity = '0';
      }
      temp.value5 = temp.value5 + 2;
      temp.plant1active = true;
      temp.timer5 = setTimeout(plant1Fun1, 6000);
    };
    plant1Fun1();
  }

  //点击确定之后执行的动画
  performAnimation() {
    const temp = (window as any).viewHandler.viewModel.$data;
    // 未点击选择物体则无法点击确定执行动画
    if (temp.active1 === false && temp.active2 === false && temp.active3 === false) {
      return;
    }
    //动画执行时一些页面样式改变
    temp.xianShi = 'none';
    //按钮置灰
    temp.pointerEvents = 'none';
    temp.stoppacity = '0.6';


    //单个物体存在的情况
    //蜡烛存在时
    if (temp.active1 === true && temp.active2 === false && temp.active3 === false) {
      temp.candelopacity = '1';
      this.candel();
    } else if (temp.active2 === true && temp.active1 === false && temp.active3 === false) {
      //小鼠单独存在时动画
      temp.mouseopacity = '1';
      this.mouse();
    } else if (temp.active3 === true && temp.active1 === false && temp.active2 === false) {
      //植物单独存在时的动画
      temp.plantopacity = '1';
      this.plant();
    }

    //蜡烛和小鼠共存的状况
    if (temp.active1 === true && temp.active2 === true) {
      temp.candelopacity = '1';
      temp.mouseopacity = '1';
      this.candel();
      this.mouse();
    }

    //蜡烛和植物共存的状况
    if (temp.active1 === true && temp.active3 === true) {
      temp.candelopacity = '1';
      temp.plantopacity = '1';
      //无光时动画
      if (!temp.sunshine) {
        //id为 candel 切图动画以及渐隐渐现动画
        const candelFun = () => {
          if (temp.value > 2) {
            clearTimeout(temp.timer);
            return;
          }
          if (temp.value === 0) {
            temp.bg_candel = candel0;
          } else if (temp.value === 2) {
            temp.bg_candel = candel2;
          }
          temp.value = temp.value + 2;
          temp.candelactive = true;
          temp.timer = setTimeout(candelFun, 4000);
        };
        candelFun();

        //id为 candel1 切图动画以及渐隐渐现动画
        const candel1Fun1 = () => {
          if (temp.value2 > 3) {
            clearTimeout(temp.timer1);
            return;
          }
          //根据value的变化实现图片切换效果
          if (temp.value2 === 1) {
            temp.bg_candel1 = candel1;
          } else if (temp.value2 === 3) {
            temp.bg_candel1 = candel3;

            temp.candel1opacity = '1';
            temp.candelopacity = '0';
          }
          temp.value2 = temp.value2 + 2;
          temp.candel1active = true;
          temp.timer1 = setTimeout(candel1Fun1, 6000);
        };
        candel1Fun1();
        //蜡烛熄灭后执行植物凋落动画
        temp.bg_plant = plant0;
        temp.timer6 = setTimeout(() => {
          this.plant();
        }, 6000);

      } else if (temp.sunshine) {  //有光时植物和蜡烛动画
        const sunshineFun = () => {
          if (temp.value1 > 2) {
            clearTimeout(temp.timer);
            temp.pointerEvents = 'auto';
            temp.stoppacity = '1';
            return;
          }
          temp.bg_candel = candel0;
          temp.bg_plant = plant0;
          temp.value1 = temp.value1 + 1;
          temp.timer = setTimeout(sunshineFun, 1000);
        };
        sunshineFun();
      }
    }

    //小鼠和植物共存的状况
    if (temp.active3 === true && temp.active2 === true) {
      temp.plantopacity = '1';
      temp.mouseopacity = '1';
      if (!temp.sunshine) {
        //id为 mouse 切图动画以及渐隐渐现动画
        const mouseFun = () => {
          if (temp.value > 2) {
            clearTimeout(temp.timer);
            return;
          }
          if (temp.value === 0) {
            temp.bg_mouse = mouse0;
          } else if (temp.value === 2) {
            temp.bg_mouse = mouse2;
          }
          temp.value = temp.value + 2;
          temp.mouseactive = true;
          temp.timer = setTimeout(mouseFun, 4000);
        };
        mouseFun();

        //id为 mouse1 切图动画以及渐隐渐现动画
        const mouse1Fun1 = () => {
          if (temp.value2 > 3) {
            clearTimeout(temp.timer1);
            return;
          }
          if (temp.value2 === 1) {
            temp.bg_mouse1 = mouse1;
          } else if (temp.value2 === 3) {
            temp.bg_mouse1 = mouse3;

            temp.mouse1opacity = '1';
            temp.mouseopacity = '0';
          }
          temp.value2 = temp.value2 + 2;
          temp.mouse1active = true;
          temp.timer1 = setTimeout(mouse1Fun1, 6000);
        };
        mouse1Fun1();
        temp.bg_plant = plant0;
        //设置植物的动画全部延时6秒执行  即、令小鼠死后植物才凋零
        temp.timer7 = setTimeout(() => {
          this.plant();
        }, 6000);

      } else if (temp.sunshine) {  //有光时 小鼠 植物动画

        const sunshineFun = () => {
          if (temp.value1 > 2) {
            clearTimeout(temp.timer);
            return;
          }
          temp.bg_plant = plant0;
          temp.value1 = temp.value1 + 1;
          temp.timer = setTimeout(sunshineFun, 1000);
        };
        sunshineFun();

        const timeFun2 = () => {
          if (temp.value > 2) {
            clearTimeout(temp.timer2);
            return;
          }
          if (temp.value === 0) {
            temp.bg_mouse = mousesp0;
          } else if (temp.value === 2) {
            temp.bg_mouse = mousesp2;
          }
          temp.value = temp.value + 2;
          temp.mouseactive = true;
          temp.timer2 = setTimeout(timeFun2, 4000);
        };
        timeFun2();

        const timeFun1 = () => {
          if (temp.value2 > 3) {
            clearTimeout(temp.timer1);
            return;
          }
          if (temp.value2 === 1) {
            temp.bg_mouse1 = mousesp1;
          } else if (temp.value2 === 3) {
            temp.bg_mouse1 = mousesp3;

            temp.pointerEvents = 'auto';
            temp.stoppacity = '1';
            temp.mouse1opacity = '1';
            temp.mouseopacity = '0';
          }
          temp.value2 = temp.value2 + 2;
          temp.mouse1active = true;
          temp.timer1 = setTimeout(timeFun1, 6000);
        };
        timeFun1();
      }
    }
    //执行动画时物体选择框消失 同时清除选中的数据
    if (temp.xianShi === 'none') {
      temp.active1 = false;
      temp.active2 = false;
      temp.active3 = false;
      temp.listZ = [];
    }
  }

  //清除上次的动画，各项数据恢复初始值
  delAnimation() {
    const temp = (window as any).viewHandler.viewModel.$data;
    temp.bg_mouse = '';
    temp.bg_mouse1 = '';
    temp.bg_plant = '';
    temp.bg_plant1 = '';
    temp.bg_candel = '';
    temp.bg_candel1 = '';

    temp.candelopacity = '0';
    temp.candel1opacity = '0';
    temp.plantopacity = '0';
    temp.plant1opacity = '0';
    temp.mouseopacity = '0';
    temp.mouse1opacity = '0';

    temp.value = 0;
    temp.value1 = 0;
    temp.value2 = 1;
    temp.value3 = 1;
    temp.value4 = 0;
    temp.value5 = 1;

    temp.candelactive = false;
    temp.candel1active = false;
    temp.plantactive = false;
    temp.plant1active = false;
    temp.mouseactive = false;
    temp.mouse1active = false;

    clearTimeout(temp.timer);
    clearTimeout(temp.timer1);
    clearTimeout(temp.timer2);
    clearTimeout(temp.timer3);
    clearTimeout(temp.timer4);
    clearTimeout(temp.timer5);
    clearTimeout(temp.timer6);
    clearTimeout(temp.timer7);
  }

  // 重置
  reset(): void {
    const temp = (window as any).viewHandler.viewModel.$data;

    this.delAnimation();
    //界面恢复初始状态
    temp.skyopacity = '1';
    temp.xianShi = 'none';
    temp.bgColor = '#FFECB2';
    temp.activeColor = '#444444';
    temp.fs_sunbtn = sun;
    temp.fs_glass = glasssun;
    //按钮置灰去除
    temp.pointerEvents = 'auto';
    temp.stoppacity = '1';

    //将选中的物体清除
    temp.active1 = false;
    temp.active1 = false;
    temp.active2 = false;
    temp.active3 = false;
    temp.listZ = [];
    temp.sunshine = true;
  }
}
