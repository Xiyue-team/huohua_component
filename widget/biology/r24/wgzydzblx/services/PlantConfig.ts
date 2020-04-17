import {fabric} from 'fabric';
export class PlantConfig {
  backgroundConfig = {
    left: 0,
    top: 0,
    selectable: false
  } as fabric.IImageOptions;

  //荒漠小图
  minDesertConfig = {
    left: 180,
    top: 125,
    selectable: false
  } as fabric.IImageOptions;
  //草原小图
  minMeadowConfig = {
    left: 370,
    top: 130,
    selectable: false
  } as fabric.IImageOptions;
  //针叶小图
  minConiferousConfig = {
    left: 615,
    top: 21,
    selectable: false
  } as fabric.IImageOptions;
  //落叶小图
  minDefoliationConfig = {
    left: 550,
    top: 161,
    selectable: false
  } as fabric.IImageOptions;
  //常绿小图
  minEvergreenConfig = {
    left: 436,
    top: 299,
    selectable: false
  } as fabric.IImageOptions;
  //雨林小图
  minRainforestConfig = {
    left: 493,
    top: 452,
    selectable: false
  } as fabric.IImageOptions;

  //荒漠放大图标
  desertZoomOutConfig = {
    left: 215,
    top: 146,
    hoverCursor: 'pointer',
    selectable: false
  } as fabric.IImageOptions;
  //草原放大图标
  meadowZoomOutConfig = {
    left: 405,
    top: 150,
    hoverCursor: 'pointer',
    selectable: false
  } as fabric.IImageOptions;
  //针叶放大图标
  coniferousZoomOutConfig = {
    left: 650,
    top: 39,
    hoverCursor: 'pointer',
    selectable: false
  } as fabric.IImageOptions;
  //落叶放大图标
  defoliationZoomOutConfig = {
    left: 585,
    top: 179,
    hoverCursor: 'pointer',
    selectable: false
  } as fabric.IImageOptions;
  //常绿放大图标
  evergreenZoomOutConfig = {
    left: 471,
    top: 317,
    hoverCursor: 'pointer',
    selectable: false
  } as fabric.IImageOptions;
  //雨林放大图标
  rainforestZoomOutConfig = {
    left: 528,
    top: 470,
    hoverCursor: 'pointer',
    selectable: false
  } as fabric.IImageOptions;

  zoomRectConfig = {
    left: 199,
    top: 70,
    width: 622,
    height: 444,
    fill: '#2b2b2b',
    selectable: false
  };

  zommInConfig = {
    left: 755,
    top: 90,
    hoverCursor: 'pointer',
    selectable: false
  }as fabric.IImageOptions;

  bottomButton = {
    left: 199,
    top: 418,
    selectable: false
  } as fabric.IImageOptions;

  text1 = {
    left: 238,
    top: 435,
    fontSize: 16,
    fill: 'white',
    selectable: false,
  };

  text2 = {
    left: 238,
    top: 459,
    fontSize: 16,
    fill: 'white',
    selectable: false,
  };

  text3 = {
    left: 238,
    top: 483,
    fontSize: 16,
    fill: 'white',
    selectable: false,
  };



  desetText1 = '荒漠在地球上占有很大的面积，它是在极端干旱条件下发育起来的。荒漠分布' ;
  desetText2 = '区雨水奇缺，空气干燥，冷热变化剧烈，风速大，沙暴多，植物稀疏，植物种';
  desetText3 = '类贫乏但耐旱性强。主要分布在西北部。';

  meadowText1 = '草原分布区的气候条件较差，降雨量少，年平均温度较低。我国的草原主要分' ;
  meadowText2 = '布在松辽平原、内蒙古高原和黄土高原等地。';

  coniferousText1 = '针叶林的分布区夏季温暖，冬季严寒。我国的针叶林主要分布在大兴安岭和新' ;
  coniferousText2 = '疆的阿尔泰山地。';

  defoliationText1 = '落叶阔叶林又叫夏绿林，分布区一年四季分明，夏季炎热多雨，冬季寒冷,' ;
  defoliationText2 = '树叶夏季茂盛而冬季凋落。我国的落叶阔叶林主要分布在华北和东北的大部';
  defoliationText3 = '分地区。';

  evergreenText1 = '常绿阔叶林分布地区夏季高温湿润，冬季干燥寒冷。我国的常绿阔叶林的分布' ;
  evergreenText2 = '很广，以长江流域最为典型。';

  rainforestText1 = '热带雨林分布地区终年高温多雨，植物种类丰富，叶片终年常绿，全年都有植' ;
  rainforestText2 = '物开花。我国的台湾、海南、云南都有热带雨林分布。';
}
