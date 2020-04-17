/**
 * 狗的杂交类
 *
 */

import { Dog } from '../services/Dog';
import { GeneticCombination } from '../services/GeneticCombination';
import { LeftInteractDragEvent } from './LeftInteractDragEvent';
import { ParentInteractDropEvent } from './ParentInteractDropEvent';
import { RightInteractDragEvent } from './RightInteractDragEvent';
import { LeftParentDropEvent } from './LeftParentDropEvent';
import { Record } from '@huohua/rrwidget';
import { GeneticMap } from './GeneticMap';


export class DogHybridizationPage {
  // 回放组件
  record: Record;

  // 选择显示右侧的提示文字
  isShowTipText = 0;

  // 是否置灰生成子代按钮 默认true 置灰  父本母本确定后取消置灰  当父本母本有一方为空时置灰
  isGenerateChildButtonGray = true;
  // 判断父本是否有了
  isParentFatherEmpty = false;
  // 判断母本是个有了
  isParentMatherEmpty = false;

  // 用于获取狗
  dog: Dog;

  // 我喜欢的狗
  dogSplicingPage: any;

  // 选择哪条狗作为最终我喜欢的狗
  selectDog = 0;

  // 左边父本
  leftParent: any = [
    {aDog: [{}, {}, {}, {}], name: 'dog1', generation: 1},
    {aDog: [{}, {}, {}, {}], name: 'dog2', generation: 1},
    {aDog: [{}, {}, {}, {}], name: 'dog3', generation: 1},
    {aDog: [{}, {}, {}, {}], name: 'dog4', generation: 1},
    {aDog: [{}, {}, {}, {}], name: 'dog5', generation: 1},
    {aDog: [{}, {}, {}, {}], name: 'dog6', generation: 1}
  ];

  // 右侧杂交生成的子代
  rightChildren: any = [
    {aDog: [{}, {}, {}, {}], name: 'produceDescendants1', similarity: 0, isShow: false},
    {aDog: [{}, {}, {}, {}], name: 'produceDescendants2', similarity: 0, isShow: false},
    {aDog: [{}, {}, {}, {}], name: 'produceDescendants3', similarity: 0, isShow: false},
    {aDog: [{}, {}, {}, {}], name: 'produceDescendants4', similarity: 0, isShow: false},
    {aDog: [{}, {}, {}, {}], name: 'produceDescendants5', similarity: 0, isShow: false},
  ];

  // 杂交的父本母本
  parentFather: ParentInteractDropEvent;
  parentMather: ParentInteractDropEvent;

  // 父本母本狗数据 用于生成子代的时候传入
  fatherDog: any;
  matherDog: any;

  // 杂交得到数据
  geneticCombination: GeneticCombination;

  // 用于判断当前生成的子代是否向左拖拽保存为父本
  isLeftParent = false;

  // 用于判断当前是第几代的狗  默认是第2代开始
  generation = 2;

  // 生成遗传图谱
  geneticMap: GeneticMap;

  // 显示隐藏父本母本上的叉号按钮

  // 最后选择的狗
  endSelectdog: any;

  isShowParentFatherImage = false;
  isShowParentMatherImage = false;

  constructor(dogSplicingPage: any, record: Record) {
    this.record = record;
    this.dogSplicingPage = dogSplicingPage;

    this.dog = new Dog();
    this.geneticCombination = new GeneticCombination();

    this.initLeftParent();
    this.produceDescendants();
    this.rightParentDropEvent();
    this.leftParentDropEvent();

    this.geneticMap = new GeneticMap();
  }

  initLeftParent() {
    this.leftParent[0].aDog = this.dog.getDog({
      shape: '吉娃',
      color: '黄',
      hair: '卷毛',
      hairLength: 1,
      hairGene: 'AA',
      ear: 1,
      legsLength: 2,
      tail: 1,
    });

    this.leftParent[1].aDog = this.dog.getDog({
      shape: '比熊',
      color: '黑',
      hair: '直毛',
      hairLength: 2,
      hairGene: 'aa',
      ear: 2,
      legsLength: 3,
      tail: 2,
    });

    this.leftParent[2].aDog = this.dog.getDog({
      shape: '斗牛',
      color: '白',
      hair: '直毛',
      hairLength: 2,
      hairGene: 'aa',
      ear: 3,
      legsLength: 3,
      tail: 3,
    });

    this.leftParent[3].aDog = this.dog.getDog({
      shape: '柯基',
      color: '黄白',
      hair: '直毛',
      hairLength: 3,
      hairGene: 'aa',
      ear: 4,
      legsLength: 1,
      tail: 4,
    });

    this.leftParent[4].aDog = this.dog.getDog({
      shape: '松狮',
      color: '灰',
      hair: '卷毛',
      hairLength: 2,
      hairGene: 'AA',
      ear: 5,
      legsLength: 2,
      tail: 5,
    });

    this.leftParent[5].aDog = this.dog.getDog({
      shape: '猎犬',
      color: '黄',
      hair: '直毛',
      hairLength: 5,
      hairGene: 'aa',
      ear: 2,
      legsLength: 4,
      tail: 2,
    });
  }

  // 设置左栏的父本  和  右侧的子代可以拖动
  produceDescendants() {
    const dog1 = new LeftInteractDragEvent('dog1');
    const dog2 = new LeftInteractDragEvent('dog2');
    const dog3 = new LeftInteractDragEvent('dog3');
    const dog4 = new LeftInteractDragEvent('dog4');
    const dog5 = new LeftInteractDragEvent('dog5');
    const dog6 = new LeftInteractDragEvent('dog6');

    const produceDescendants1 = new RightInteractDragEvent('produceDescendants1');
    const produceDescendants2 = new RightInteractDragEvent('produceDescendants2');
    const produceDescendants3 = new RightInteractDragEvent('produceDescendants3');
    const produceDescendants4 = new RightInteractDragEvent('produceDescendants4');
    const produceDescendants5 = new RightInteractDragEvent('produceDescendants5');
  }

  // 为父本 母本 绑定drop事件
  rightParentDropEvent() {
    this.parentFather = new ParentInteractDropEvent('parentFather', () => {
      this.fatherDog = this.getParentDog(this.parentFather.parentId);
      console.log('父本',  this.dogSplicingPage);
      this.resetRightChildren();

      this.isParentFatherEmpty = true;
      if (this.isParentMatherEmpty) {
        this.isGenerateChildButtonGray = false;
      }

      // 显示叉号按钮
      this.isShowParentFatherImage = true;
    }, this.record);

    this.parentMather = new ParentInteractDropEvent('parentMather', () => {
      this.matherDog = this.getParentDog(this.parentMather.parentId);
      this.resetRightChildren();

      this.isParentMatherEmpty = true;
      if (this.isParentFatherEmpty) {
        this.isGenerateChildButtonGray = false;
      }

      // 显示叉号按钮
      this.isShowParentMatherImage = true;
    }, this.record);
  }

  // 为左栏的父本框绑定drop事件
  leftParentDropEvent() {
    const leftParent = new LeftParentDropEvent('staticDogs', () => {
      if (!!this.getRightParentDog(leftParent.parentId)[0].character) {
        // 拖动之后打开可以生成下一代开关
        this.isLeftParent = true;

        this.leftParent.push({
          aDog: this.getRightParentDog(leftParent.parentId),
          name: 'dog' + (leftParent.id - 1),
          generation: this.generation,
          pfId: this.parentFather.parentId,
          pmId: this.parentMather.parentId
        });

        const dog = new LeftInteractDragEvent('dog' + (leftParent.id - 1));
      }

      // 显示提示文字
      if (this.isShowTipText === 1) {
        this.isShowTipText = 2;
      }
    }, this.record);
  }

  // 获取父本的数据
  getParentDog(name: string) {
    for (let i = 0; i < this.leftParent.length; i++) {
      if (this.leftParent[i].name === name) {
        return this.leftParent[i].aDog;
      }
    }
  }

  // 获取拖动的子代的数据
  getRightParentDog(name: string) {
    for (let i = 0; i < this.rightChildren.length; i++) {
      if (this.rightChildren[i].name === name) {
        this.rightChildren[i].isShow = false;
        return this.rightChildren[i].aDog;
      }
    }
  }

  // 获取子代的数据
  getChildren(pf: any, pm: any) {
    const father = {
      shape: pf[0].type,
      color: pf[0].color,
      hair: pf[0].hairMorphology,
      hairLength: pf[0].hairLength,
      hairGene: pf[2].hairGene,
      ear: pf[1].style,
      legsLength: pf[2].legsLength,
      tail: pf[3].style,
    };

    const mather = {
      shape: pm[0].type,
      color: pm[0].color,
      hair: pm[0].hairMorphology,
      hairLength: pm[0].hairLength,
      hairGene: pm[2].hairGene,
      ear: pm[1].style,
      legsLength: pm[2].legsLength,
      tail: pm[3].style,
    };

    // 我喜欢的狗
    const myDog = {
      shape: this.dogSplicingPage.myLoveDog.aDog[0].type,
      color: this.dogSplicingPage.myLoveDog.aDog[0].color,
      hair: this.dogSplicingPage.myLoveDog.aDog[0].hairMorphology,
      hairLength: this.dogSplicingPage.myLoveDog.aDog[0].hairLength,
      hairGene: this.dogSplicingPage.myLoveDog.aDog[2].hairGene,
      ear: this.dogSplicingPage.myLoveDog.aDog[1].style,
      legsLength: this.dogSplicingPage.myLoveDog.aDog[2].legsLength,
      tail: this.dogSplicingPage.myLoveDog.aDog[3].style,
    };

    // 生成子代
    for (let i = 0; i < this.rightChildren.length; i++) {
      const dog = this.geneticCombination.getChild(father, mather);
      const getDog = this.dog.getDog(dog);
      const similarity = this.geneticCombination.getSimilarity(dog, myDog);
      this.rightChildren[i].aDog = getDog;
      this.rightChildren[i].similarity = similarity;

      // 提示文字出现
      if (similarity >= 80 && similarity < 100) {
        this.isShowTipText = 4;
      }
      if (similarity === 100) {
        this.isShowTipText = 5;
      }
    }
  }

  // 生成子代按钮点击
  generateChild() {
    this.generateChildEvent();

    this.record.recordOperation({
      eventScopeObject: this,
      event: this.generateChildEvent,
      args: [],
      duration: 100,
      mockData: this.rightChildren
    });

  }

  // 生成子代按钮点击触发的事件
  /**
   * @param rightChildren 为回放做处理  有值的时候之间复制给rightChildren 没有值的时候随机生成
   */
  generateChildEvent(rightChildren?: any) {
    if (this.isLeftParent === true) {
      this.generation += 1;
      this.isLeftParent = false;
    }

    for (let i = 0; i < this.rightChildren.length; i++) {
      this.rightChildren[i].isShow = true;
    }

    if (!rightChildren) {
      // 生成的时候赋值
      this.getChildren(this.fatherDog, this.matherDog);
      console.log('生成子代', this.rightChildren, !rightChildren);
    } else {
      // 回放的时候赋值
      for (let i = 0; i < this.rightChildren.length; i++) {
        this.rightChildren[i].aDog = rightChildren[i].aDog;
        this.rightChildren[i].similarity = rightChildren[i].similarity;
        if (rightChildren[i].similarity >= 80 && rightChildren[i].similarity < 100) {
          this.isShowTipText = 4;
        }
        if (rightChildren[i].similarity === 100) {
          this.isShowTipText = 5;
        }
      }
    }

    // 显示提示文字
    if (this.isShowTipText === 0) {
      this.isShowTipText = 1;
    }
  }

  // 点击选择最终我喜欢的子代
  clickProduceDescendants1() {
    this.clickProduceDescendantsEvent1();

    this.record.recordOperation({
      eventScopeObject: this,
      event: this.clickProduceDescendantsEvent1,
      args: [],
      duration: 100,
    });
  }
  clickProduceDescendants2() {
    this.clickProduceDescendantsEvent2();

    this.record.recordOperation({
      eventScopeObject: this,
      event: this.clickProduceDescendantsEvent2,
      args: [],
      duration: 100,
    });
  }
  clickProduceDescendants3() {
    this.clickProduceDescendantsEvent3();

    this.record.recordOperation({
      eventScopeObject: this,
      event: this.clickProduceDescendantsEvent3,
      args: [],
      duration: 100,
    });
  }
  clickProduceDescendants4() {
    this.clickProduceDescendantsEvent4();

    this.record.recordOperation({
      eventScopeObject: this,
      event: this.clickProduceDescendantsEvent4,
      args: [],
      duration: 100,
    });
  }
  clickProduceDescendants5() {
    this.clickProduceDescendantsEvent5();

    this.record.recordOperation({
      eventScopeObject: this,
      event: this.clickProduceDescendantsEvent5,
      args: [],
      duration: 100,
    });
  }

  clickProduceDescendantsEvent1 () {
    if (this.selectDog === 1) {
      this.selectDog = 0;
      // 显示提示文字
      this.isShowTipText = 1;
    } else {
      this.selectDog = 1;
      // 显示提示文字
      this.isShowTipText = 4;
    }

    this.setEndSelectdog();
  }
  clickProduceDescendantsEvent2 () {
    if (this.selectDog === 2) {
      this.selectDog = 0;
      // 显示提示文字
      this.isShowTipText = 1;
    } else {
      this.selectDog = 2;
      // 显示提示文字
      this.isShowTipText = 4;
    }

    this.setEndSelectdog();
  }
  clickProduceDescendantsEvent3 () {
    if (this.selectDog === 3) {
      this.selectDog = 0;
      // 显示提示文字
      this.isShowTipText = 1;
    } else {
      this.selectDog = 3;
      // 显示提示文字
      this.isShowTipText = 4;
    }

    this.setEndSelectdog();
  }
  clickProduceDescendantsEvent4 () {
    if (this.selectDog === 4) {
      this.selectDog = 0;
      // 显示提示文字
      this.isShowTipText = 1;
    } else {
      this.selectDog = 4;
      // 显示提示文字
      this.isShowTipText = 4;
    }

    this.setEndSelectdog();
  }
  clickProduceDescendantsEvent5 () {
    if (this.selectDog === 5) {
      this.selectDog = 0;
      // 显示提示文字
      this.isShowTipText = 1;
    } else {
      this.selectDog = 5;
      // 显示提示文字
      this.isShowTipText = 4;
    }

    this.setEndSelectdog();
  }

  // 选中右侧生成子代时赋值给endSelectdog
  setEndSelectdog() {
    this.endSelectdog = {
      aDog: this.rightChildren[this.selectDog - 1].aDog,
      name: 'dog' + (this.leftParent.length),
      generation: this.generation,
      pfId: this.parentFather.parentId,
      pmId: this.parentMather.parentId
    };
  }

  // 重置父本
  resetParentFather() {
    this.resetParentFatherEvent();

    this.record.recordOperation({
      eventScopeObject: this,
      event: this.resetParentFatherEvent,
      args: [],
      duration: 100,
    });
  }
  // 重置父本 触发的事件
  resetParentFatherEvent() {
    const fatherHtml = document.getElementById('parentFather');
    for (let i = 0; i < fatherHtml.childNodes.length; i++) {
      fatherHtml.removeChild(fatherHtml.childNodes[i]);
    }

    this.resetRightChildren();

    // 置灰生成子代按钮
    this.isParentFatherEmpty = false;
    this.isGenerateChildButtonGray = true;

    // 隐藏叉号按钮
    this.isShowParentFatherImage = false;
  }

  // 重置母本
  resetParentMather() {
    this.resetParentMatherEvent();

    this.record.recordOperation({
      eventScopeObject: this,
      event: this.resetParentMatherEvent,
      args: [],
      duration: 100,
    });
  }
  // 重置母本 触发的事件
  resetParentMatherEvent() {
    const matherHtml = document.getElementById('parentMather');
    for (let i = 0; i < matherHtml.childNodes.length; i++) {
      matherHtml.removeChild(matherHtml.childNodes[i]);
    }

    this.resetRightChildren();

    // 置灰生成子代按钮
    this.isParentMatherEmpty = false;
    this.isGenerateChildButtonGray = true;

    // 隐藏叉号按钮
    this.isShowParentMatherImage = false;
  }

  // 重置生成的子代rightChildren
  resetRightChildren() {
    this.rightChildren = [
      {aDog: [{}, {}, {}, {}], name: 'produceDescendants1', similarity: 0, isShow: false},
      {aDog: [{}, {}, {}, {}], name: 'produceDescendants2', similarity: 0, isShow: false},
      {aDog: [{}, {}, {}, {}], name: 'produceDescendants3', similarity: 0, isShow: false},
      {aDog: [{}, {}, {}, {}], name: 'produceDescendants4', similarity: 0, isShow: false},
      {aDog: [{}, {}, {}, {}], name: 'produceDescendants5', similarity: 0, isShow: false},
    ];
  }

  // 重置左栏的数据
  resetLeftParent() {
    // 请空数据到初始
    this.leftParent = [
      {aDog: [{}, {}, {}, {}], name: 'dog1'},
      {aDog: [{}, {}, {}, {}], name: 'dog2'},
      {aDog: [{}, {}, {}, {}], name: 'dog3'},
      {aDog: [{}, {}, {}, {}], name: 'dog4'},
      {aDog: [{}, {}, {}, {}], name: 'dog5'},
      {aDog: [{}, {}, {}, {}], name: 'dog6'}
    ];

    // 添加初始数据
    this.initLeftParent();
  }

  // 点击完成探究按钮 生成遗传图谱
  addGeneticMap () {
    this.addGeneticMapEvent();

    this.record.recordOperation({
      eventScopeObject: this,
      event: this.addGeneticMapEvent,
      args: [],
      duration: 100,
    });
  }
  addGeneticMapEvent() {
    // 将最后选中的子代放入左侧
    this.leftParent.push(this.endSelectdog);

    this.geneticMap.createGeneticMap(this.leftParent);
    this.dogSplicingPage.operationStep += 1;
  }
}
