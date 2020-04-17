export class Mcfyhhndgb {
  id: any;
  id1: any;
  delay: any;
  delay1: any;
  delay2: any;
  delay3: any;
  fug1 = 888;
  fug3 = 888;

  //无酶吸收能量进度动画
  progress1() {
    const tp = (window as any).viewHandler.viewModel.$data;
    //首先能量条起始长度0
    let width = 0;
    this.id = setInterval(prog, 60);
    const thiz = this;

    //能量条不断增长， setInterval 一直调用
    function prog() {
      if (width === 100) {
        //能量条100%后停止
        clearInterval(thiz.id);
      } else {
        width++;
        tp.widths = width + '%';
      }
    }
  }

  //有酶吸收能量进度动画
  progress2() {
    const tp = (window as any).viewHandler.viewModel.$data;
    let width1 = 0;
    this.id1 = setInterval(prog, 80);
    const thiz = this;

    //能量条不断增长， setInterval 一直调用
    function prog() {
      if (width1 === 52) {
        clearInterval(thiz.id1);
      } else {
        width1++;
        tp.width2 = width1 + '%';
      }
    }
  }

  //点击一起播放时的曲线
  drawline() {
    const tp = (window as any).viewHandler.viewModel.$data;
    this.res();
    this.clicksetTime(1);
    this.clicksetTime(2);
    //显示曲线
    tp.reds = true;
    tp.blues = true;
    tp.cengci1 = '888';
    tp.cengci2 = '893';
    //选择遮罩并绑定动画
    tp.cover1 = true;
    tp.zhe1 = true;
    tp.cengci3 = '888';
    tp.cover3 = true;
    tp.zhe3 = true;
    tp.cengci4 = '893';
    this.delay = setTimeout(() => {
      this.ymhhn();
    }, 4000);
    this.delay1 = setTimeout(() => {
      this.sfdnlym();
    }, 9800);
    this.delay2 = setTimeout(() => {
      this.wmhhn();
    }, 6000);
    this.delay3 = setTimeout(() => {
      this.sfdnlwm();
    }, 10000);
  }

  //单独画蓝色曲线
  drawblueline() {
    const tp = (window as any).viewHandler.viewModel.$data;
    this.clearblue();
    this.fug1 = this.fug3 - 10;
    //动态改变图层
    tp.cengci1 = `${this.fug1}`;
    tp.cengci3 = `${this.fug1}`;
    //显示曲线
    tp.blues = true;
    //选择遮罩并绑定动画
    tp.cover1 = true;
    tp.zhe1 = true;
    //无酶催化需要的活化能标志
    this.delay2 = setTimeout(() => {
      this.wmhhn();
    }, 6000);
    this.delay3 = setTimeout(() => {
      this.sfdnlwm();
    }, 10000);
  }

  clearblue() {
    const tp = (window as any).viewHandler.viewModel.$data;
    this.clicksetTime(1);
    tp.bottomborder = '';
    tp.wmhhn = false;
    tp.wmsfdnl = false;
    tp.topborderwm = '';
  }

  //单独画红色曲线
  drawredline() {
    const tp = (window as any).viewHandler.viewModel.$data;
    this.clearred();
    this.fug3 = this.fug1 - 10;
    tp.cengci2 = `${this.fug3}`;
    tp.cengci4 = `${this.fug3}`;
    //显示曲线
    tp.reds = true;
    //选择遮罩并绑定动画
    tp.cover3 = true;
    tp.zhe3 = true;
    //有酶催化需要的活化能标志
    this.delay = setTimeout(() => {
      this.ymhhn();
    }, 4000);
    this.delay1 = setTimeout(() => {
      this.sfdnlym();
    }, 9800);
  }

  clearred() {
    const tp = (window as any).viewHandler.viewModel.$data;
    this.clicksetTime(2);
    tp.ymhhn = false;
    tp.dash = false;
    tp.ymsfdnl = false;
    tp.topborderym = '';
  }

  //上次动画结束后 在次点击 重置上次的数据
  clicksetTime(numb: number) {
    if (numb === 1) {
      const tp = (window as any).viewHandler.viewModel.$data;
      setTimeout(function() {
        tp.cover1 = false;
        setTimeout(function() {
          tp.cover1 = true;
        }, 100);
      }, 0);
    } else if (numb === 2) {
      const tp = (window as any).viewHandler.viewModel.$data;
      setTimeout(function() {
        tp.cover3 = false;
        setTimeout(function() {
          tp.cover3 = true;
        }, 100);
      }, 0);
    }
  }

  //有酶催化需要的活化能标志出现
  ymhhn() {
    const tp = (window as any).viewHandler.viewModel.$data;
    tp.ymhhn = true;
    tp.dash = true;
  }

  //有酶反应中释放的能量标志出现
  sfdnlym() {
    const tp = (window as any).viewHandler.viewModel.$data;
    tp.ymsfdnl = true;
    tp.topborderym = '2px dashed';
  }

  //无酶催化需要的活化能标志出现
  wmhhn() {
    const tp = (window as any).viewHandler.viewModel.$data;
    tp.wmhhn = true;
    tp.bottomborder = '2px dashed';
  }

  //无酶反应中释放的能量标志出现
  sfdnlwm() {
    const tp = (window as any).viewHandler.viewModel.$data;
    tp.wmsfdnl = true;
    tp.topborderwm = '2px dashed';
  }

  res() {
    const tp = (window as any).viewHandler.viewModel.$data;
    //右侧曲线隐藏
    tp.reds = false;
    tp.blues = false;
    //遮罩解绑动画
    tp.cover1 = false;
    tp.cover3 = false;
    //能量条归零
    clearInterval(this.id);
    clearInterval(this.id1);
    tp.widths = '0';
    tp.width2 = '0';
    //虚线、标识的v-show
    tp.ymhhn = false;
    tp.wmhhn = false;
    tp.dash = false;
    tp.ymsfdnl = false;
    tp.wmsfdnl = false;
    //虚线消除
    tp.topborderym = '';
    tp.topborderwm = '';
    tp.bottomborder = '';
    //清除定时器
    clearTimeout(this.delay);
    clearTimeout(this.delay1);
    clearTimeout(this.delay2);
    clearTimeout(this.delay3);
  }

  reset() {
    const tp = (window as any).viewHandler.viewModel.$data;
    this.res();
    //隐藏遮罩
    tp.zhe1 = false;
    tp.zhe3 = false;
  }
}
