import { ScaleValue } from './SimpleKonvaTemplate';

export class YeZiConfig {

  scaleValue = new ScaleValue();

  scale = this.scaleValue.scale;
  // scale = 1;

  width = window.innerWidth;
  height = window.innerHeight;

  fontFamily = '-apple-system, BlinkMacSystemFont, \'Helvetica Neue\', ' +
    '\'PingFang SC\', \'Microsoft YaHei\', \'Source Han Sans SC\', ' +
    '\'Noto Sans CJK SC\', \'WenQuanYi Micro Hei\', sans-serif';

  backgroundImage = {
    width :  this.width,
    height :  this.height,
    x : 0,
    y : 0,
  };

  titleImage = {
    width :  382 * this.scale,
    height :  60 * this.scale,
    x : this.width * 0.027,
    y : this.height * 0.047
  };

  /////////////////////////////////////////////

  // 初始界面小树叶
  smallFoliageImage = [{
      width :  200 * this.scale,
      height :  133 * this.scale,
      x : this.width * 0.075,
      y : this.height * 0.184,
      shadowBlur: 3,
      shadowColor: '#050505',
      shadowOpacity: 0.08,
      shadowOffset: { x: 5, y: 11 },
      scale: { x: 1, y: 1 },
      startScale: 1,
      name: '樟树叶'
    },

    {
      width :  130 * this.scale,
      height :  131 * this.scale,
      x : this.width * 0.324,
      y : this.height * 0.185,
      shadowBlur: 3,
      shadowColor: '#050505',
      shadowOpacity: 0.08,
      shadowOffset: { x: 5, y: 11 },
      scale: { x: 1, y: 1 },
      startScale: 1
    },

    {
      width :  143 * this.scale,
      height :  138 * this.scale,
      x : this.width * 0.558,
      y : this.height * 0.181,
      shadowBlur: 3,
      shadowColor: '#050505',
      shadowOpacity: 0.08,
      shadowOffset: {x: 5, y: 11},
      scale: { x: 1, y: 1 },
      startScale: 1
    },

    {
      width :  199 * this.scale,
      height :  130 * this.scale,
      x : this.width * 0.759,
      y : this.height * 0.187,
      shadowBlur: 3,
      shadowColor: '#050505',
      shadowOpacity: 0.08,
      shadowOffset: {x: 5, y: 11 },
      scale: { x: 1, y: 1 },
      startScale: 1
    },

    /////////////////////////////////////////////

    {
      width :  136 * this.scale,
      height :  122 * this.scale,
      x : this.width * 0.102,
      y : this.height * 0.453,
      shadowBlur: 3,
      shadowColor: '#050505',
      shadowOpacity: 0.08,
      shadowOffset: {
        x: 5,
        y: 11
      },
      scale: { x: 1, y: 1 },
      startScale: 1
    },

    {
      width :  130 * this.scale,
      height :  125 * this.scale,
      x : this.width * 0.324,
      y : this.height * 0.452,
      shadowBlur: 3,
      shadowColor: '#050505',
      shadowOpacity: 0.08,
      shadowOffset: {
        x: 5,
        y: 11
      },
      scale: { x: 1, y: 1 },
      startScale: 1
    },

    {
      width :  182 * this.scale,
      height :  102 * this.scale,
      x : this.width * 0.541,
      y : this.height * 0.468,
      shadowBlur: 3,
      shadowColor: '#050505',
      shadowOpacity: 0.08,
      shadowOffset: {
        x: 5,
        y: 11
      },
      scale: { x: 1, y: 1 },
      startScale: 1
    },

    {
      width :  143 * this.scale,
      height :  146 * this.scale,
      x : this.width * 0.783,
      y : this.height * 0.436,
      shadowBlur: 3,
      shadowColor: '#050505',
      shadowOpacity: 0.08,
      shadowOffset: {
        x: 5,
        y: 11
      },
      scale: { x: 1, y: 1 },
      startScale: 1
    },

    /////////////////////////////////////////

    {
      width :  130 * this.scale,
      height :  113 * this.scale,
      x : this.width * 0.104,
      y : this.height * 0.733,
      shadowBlur: 3,
      shadowColor: '#050505',
      shadowOpacity: 0.08,
      shadowOffset: {
        x: 5,
        y: 11
      },
      scale: { x: 1, y: 1 },
      startScale: 1
    },

    {
      width :  128 * this.scale,
      height :  152 * this.scale,
      x : this.width * 0.325,
      y : this.height * 0.705,
      shadowBlur: 3,
      shadowColor: '#050505',
      shadowOpacity: 0.08,
      shadowOffset: {
        x: 5,
        y: 11
      },
      scale: { x: 1, y: 1 },
      startScale: 1
    },

    {
      width :  29 * this.scale,
      height :  171 * this.scale,
      x : this.width * 0.605,
      y : this.height * 0.69,
      shadowBlur: 3,
      shadowColor: '#050505',
      shadowOpacity: 0.08,
      shadowOffset: {
        x: 5,
        y: 11
      },
      scale: { x: 1, y: 1 },
      startScale: 1
    },

    {
      width :  106 * this.scale,
      height :  159 * this.scale,
      x : this.width * 0.798,
      y : this.height * 0.699,
      shadowBlur: 3,
      shadowColor: '#050505',
      shadowOpacity: 0.08,
      shadowOffset: {
        x: 5,
        y: 11
      },
      scale: { x: 1, y: 1 },
      startScale: 1
    }
  ];

  ///////////////大树叶////////////////////////
  ///////////////大树叶////////////////////////

  bigFoliageImage = [
    // 1_1
    {
      width :  465 * this.scale,
      height :  309 * this.scale,
      x : this.width * 0.25 - 465 * this.scale * 0.5,
      y : this.height * 0.50 - 309 * this.scale * 0.5,
    },
    // 1_2
    {
      width :  310 * this.scale,
      height :  315 * this.scale,
      x : this.width * 0.25 - 310 * this.scale * 0.5,
      y : this.height * 0.50 - 315 * this.scale * 0.5,
    },
    // 1_3
    {
      width :  325 * this.scale,
      height :  312 * this.scale,
      x : this.width * 0.25 - 325 * this.scale * 0.5,
      y : this.height * 0.50 - 312 * this.scale * 0.5,
    },
    // 1_4
    {
      width :  448 * this.scale,
      height :  291 * this.scale,
      x : this.width * 0.25 - 448 * this.scale * 0.5,
      y : this.height * 0.50 - 291 * this.scale * 0.5,
    },
    // 2_1
    {
      width :  333 * this.scale,
      height :  298 * this.scale,
      x : this.width * 0.25 - 333 * this.scale * 0.5,
      y : this.height * 0.50 - 298 * this.scale * 0.5,
    },
    // 2_2
    {
      width :  336 * this.scale,
      height :  317 * this.scale,
      x : this.width * 0.25 - 336 * this.scale * 0.5,
      y : this.height * 0.50 - 317 * this.scale * 0.5,
    },
    // 2_3
    {
      width :  457 * this.scale,
      height :  257 * this.scale,
      x : this.width * 0.25 - 457 * this.scale * 0.5,
      y : this.height * 0.50 - 257 * this.scale * 0.5,
    },
    // 2_4
    {
      width :  358 * this.scale,
      height :  367 * this.scale,
      x : this.width * 0.25 - 358 * this.scale * 0.5,
      y : this.height * 0.50 - 367 * this.scale * 0.5,
    },
    // 3_1
    {
      width :  344 * this.scale,
      height :  299 * this.scale,
      x : this.width * 0.25 - 344 * this.scale * 0.5,
      y : this.height * 0.50 - 299 * this.scale * 0.5,
    },
    // 3_2
    {
      width :  329 * this.scale,
      height :  391 * this.scale,
      x : this.width * 0.25 - 329 * this.scale * 0.5,
      y : this.height * 0.50 - 391 * this.scale * 0.5,
    },
    // 3_3
    {
      width :  78 * this.scale,
      height :  454 * this.scale,
      x : this.width * 0.25 - 78 * this.scale * 0.5,
      y : this.height * 0.50 - 454 * this.scale * 0.5,
    },
    // 3_4
    {
      width :  319 * this.scale,
      height :  478 * this.scale,
      x : this.width * 0.25 - 319 * this.scale * 0.5,
      y : this.height * 0.50 - 478 * this.scale * 0.5,
    }
  ];


  ///////////////////////////////////////////////
  //////////////树叶背景/////////////////////////

  foliageBackgroundImage = {
    width :  1200 * this.scale,
    height :  675 * this.scale,
    x : this.width * 0.5 - 1200 * this.scale * 0.5,
    y : this.height * 0.5 - 675 * this.scale * 0.5,
    visible: false,
    opacity: 0
  };

  ////////////////////////////////////////////////////
  ///////////////树叶背景标题//////////////////////////////

  foliageTitleImage1 = {
    width :  290 * this.scale,
    height :  106 * this.scale,
    x : this.width * 0.027,
    y : this.height * 0.047,
    visible: false,
    opacity: 0
  };

  foliageTitleImage2 = {
    width :  290 * this.scale,
    height :  106 * this.scale,
    x : this.width * 0.027,
    y : this.height * 0.047,
    visible: false,
    opacity: 0
  };

  foliageTitleImage3 = {
    width :  290 * this.scale,
    height :  106 * this.scale,
    x : this.width * 0.027,
    y : this.height * 0.047,
    visible: false,
    opacity: 0
  };

  foliageTitleImage4 = {
    width :  290 * this.scale,
    height :  106 * this.scale,
    x : this.width * 0.027,
    y : this.height * 0.047,
    visible: false,
    opacity: 0
  };

  foliageTitleImage5 = {
    width :  290 * this.scale,
    height :  106 * this.scale,
    x : this.width * 0.027,
    y : this.height * 0.047,
    visible: false,
    opacity: 0
  };

  foliageTitleImage6 = {
    width :  402 * this.scale,
    height :  106 * this.scale,
    x : this.width * 0.027,
    y : this.height * 0.047,
    visible: false,
    opacity: 0
  };

  foliageTitleImage7 = {
    width :  290 * this.scale,
    height :  106 * this.scale,
    x : this.width * 0.027,
    y : this.height * 0.047,
    visible: false,
    opacity: 0
  };

  foliageTitleImage8 = {
    width :  290 * this.scale,
    height :  106 * this.scale,
    x : this.width * 0.027,
    y : this.height * 0.047,
    visible: false,
    opacity: 0
  };

  foliageTitleImage9 = {
    width :  290 * this.scale,
    height :  106 * this.scale,
    x : this.width * 0.027,
    y : this.height * 0.047,
    visible: false,
    opacity: 0
  };

  foliageTitleImage10 = {
    width :  290 * this.scale,
    height :  106 * this.scale,
    x : this.width * 0.027,
    y : this.height * 0.047,
    visible: false,
    opacity: 0
  };

  foliageTitleImage11 = {
    width :  290 * this.scale,
    height :  106 * this.scale,
    x : this.width * 0.027,
    y : this.height * 0.047,
    visible: false,
    opacity: 0
  };

  foliageTitleImage12 = {
    width :  290 * this.scale,
    height :  106 * this.scale,
    x : this.width * 0.027,
    y : this.height * 0.047,
    visible: false,
    opacity: 0
  };
}







