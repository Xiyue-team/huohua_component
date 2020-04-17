import { DogLegs } from '../services/DogLegs';
import { DogColor } from '../services/DogColor';
import { DogTail } from '../services/DogTail';
import { DogEars } from '../services/DogEars';
import { DogTypes } from '../services/DogTypes';
import { DogHair } from '../services/DogHair';
import { Record, Replay, ReplayModel } from '@huohua/rrwidget';

export class DogSplicingPage {
  record: Record;

    // 显示初始界面提示文字
  isShowExplainButton = false;

  // 显示的文字
  optionalTextArray = ['体型', '颜色', '耳朵', '腿', '尾巴', '毛发形态', '卷毛长度', '直毛长度'];
  optionalText = '体型';

  // 是否置灰确定按钮 默认true 置灰  选择狗的性状后取消置灰 点击确定按钮之后继续置灰
  isYesButtonGray = true;

  // 步骤
  operationStep = 0;

  // 用于补充数据 使得flex样式保持一致
  len = 6;
  row = 3;

  // 最测我喜欢的狗
  myLoveDog = {
    aDog: [{}, {}, {}, {}],
  };

  // 右侧的狗部位 只有4个部位 尾巴 腿 耳朵 身体
  dogParts: any = [[], [], [], []];

  // 左侧的狗
  leftExhibitionImage = [
    {character: '身体', type: '', color: '', src: '' , hairMorphology: '', hairLength: Number},
    {character: '耳朵', type: '', color: '', src: '', style: Number},
    {character: '腿', type: '', color: '', src: '', legsLength: Number },
    {character: '尾巴', type: '', color: '', src: '', style: Number }
  ];

  dogTypes: DogTypes;
  dogColor: DogColor;
  dogEars: DogEars;
  dogLegs: DogLegs;
  dogTail: DogTail;
  dogHair: DogHair;

  // 存储 每次选择
  stepChoiceArray: any = [];

  // 返回时 选中上一次的选项
  selectionChildren = -1;

  constructor(record: Record) {
    this.record = record;
    this.record.start();

    this.dogTypes = new DogTypes();
    this.dogColor = new DogColor();
    this.dogEars = new DogEars();
    this.dogLegs = new DogLegs();
    this.dogTail = new DogTail();
    this.dogHair = new DogHair();

    this.dogParts[0] = this.dogTypes.dogTypesImage;
    this.len = this.dogParts[0].length;
  }

  // 获取狗
  getDogsImage(index: number) {
    this.getDog(index);

    this.record.recordOperation({
      eventScopeObject: this,
      event: this.getDog,
      args: [index],
      duration: 100,
    });
  }
  // get狗
  getDog(index: number) {
    this.selectionChildren = index;
    const object = this.dogParts[0][index];
    console.log('点击选狗', object);

    if (this.operationStep < 6) {
      if ((object as any).character === '身体') {
        this.setShapeImage(this.dogParts[0][index]);
      } else if ((object as any).character === '耳朵') {
        this.setEarsImage(this.dogParts[0][index]);
      } else if ((object as any).character === '腿') {
        this.setLegsImage(this.dogParts[0][index]);
      } else if ((object as any).character === '尾巴') {
        this.setTailImage(this.dogParts[0][index]);
      }
    } else {
      for (let i = 0; i < this.dogParts.length; i++) {
        this.setShapeImage(this.dogParts[3][index]);
        this.setEarsImage(this.dogParts[2][index]);
        this.setLegsImage(this.dogParts[1][index]);
        this.setTailImage(this.dogParts[0][index]);
      }
    }

    this.myLoveDog.aDog = this.leftExhibitionImage;

    // 取消确定按钮的置灰
    if (this.isYesButtonGray) {
      this.isYesButtonGray = false;
    }
  }

  // 添加身体
  setShapeImage(object: object) {
    this.leftExhibitionImage[0].type = !(object as any).type ? this.leftExhibitionImage[0].type : (object as any).type;
    this.leftExhibitionImage[0].color = !(object as any).color ? this.leftExhibitionImage[0].color : (object as any).color;
    this.leftExhibitionImage[0].src = !(object as any).src ? this.leftExhibitionImage[0].src : (object as any).src;
    this.leftExhibitionImage[0].hairMorphology =
      !(object as any).src ? this.leftExhibitionImage[0].hairMorphology : (object as any).hairMorphology;
    this.leftExhibitionImage[0].hairLength =
      !(object as any).hairLength ? this.leftExhibitionImage[0].hairLength : (object as any).hairLength;

    console.log('直毛或者卷毛', (object as any).hairMorphology);
  }

  // 添加耳朵
  setEarsImage(object: object) {
    console.log('耳朵', object);
    this.leftExhibitionImage[1].type = (object as any).type;
    this.leftExhibitionImage[1].color = (object as any).color;
    this.leftExhibitionImage[1].src = (object as any).src;
    this.leftExhibitionImage[1].style = (object as any).style;
  }

  // 添加腿
  setLegsImage(object: object) {
    console.log('腿', object);
    this.leftExhibitionImage[2].type = (object as any).type;
    this.leftExhibitionImage[2].color = (object as any).color;
    this.leftExhibitionImage[2].src = (object as any).src;
    this.leftExhibitionImage[2].legsLength = (object as any).legsLength;
  }

  // 添加尾巴
  setTailImage(object: object) {
    console.log('尾巴', object);
    this.leftExhibitionImage[3].type = (object as any).type;
    this.leftExhibitionImage[3].color = (object as any).color;
    this.leftExhibitionImage[3].src = (object as any).src;
    this.leftExhibitionImage[3].style = (object as any).style;
  }

  // 获取图片的路径
  getImmageSrc(object: object) {
    return (object as any).src;
  }

  // 确定按钮点击
  yesButtonClickEvent () {
    this.yesButtonEvent();

    this.record.recordOperation({
      eventScopeObject: this,
      event: this.yesButtonEvent,
      args: [],
      duration: 100,
    });
    console.log('this.record', this.record);
  }
  // 确定按钮触发的具体事件
  yesButtonEvent() {
    if (this.selectionChildren !== -1) {
      this.stepChoiceArray[this.operationStep - 1] = this.selectionChildren;
    }

    this.operationStep += 1;
    this.getOperationStep();
    this.selectionChildren = -1;

    // 置灰确定按钮
    if (this.isYesButtonGray === false) {
      this.isYesButtonGray = true;
    }
  }

  // 开始按钮
  startButtonClickEvent () {
    this.startButtonEvent();

    this.record.recordOperation({
      eventScopeObject: this,
      event: this.startButtonEvent,
      args: [],
      duration: 100,
    });
  }
  // 开始按钮触发的具体事件
  startButtonEvent() {
    this.operationStep += 1;
  }

  // 头部上一页按钮点击
  previousPageButtonClickEvent () {
    this.previousPageButtonEvent();

    this.record.recordOperation({
      eventScopeObject: this,
      event: this.previousPageButtonEvent,
      args: [],
      duration: 100,
    });
  }
  // 上一页按钮点击触发的事件
  previousPageButtonEvent() {
    if (this.operationStep !== 0) {
      console.log('点击返回上一页');
      this.operationStep -= 1;
      if (this.operationStep === 0) {
        this.stepChoiceArray = [];
        this.selectionChildren = -1;
        this.myLoveDog = {
          aDog: [{}, {}, {}, {}],
        };
        this.isYesButtonGray = true;
      } else {
        this.isYesButtonGray = false;
        this.getOperationStep();
      }
    } else {
      console.log('推出微件');
    }
  }

  // 选择的页数
  getOperationStep() {
    this.dogParts[0] = [];
    // 选择体型
    if (this.operationStep === 1) {
      this.operationStep1();
    }

    // 选择颜色
    if (this.operationStep === 2) {
      this.operationStep2();
    }

    // 选择耳朵
    if (this.operationStep === 3) {
      this.operationStep3();
    }

    // 选择腿
    if (this.operationStep === 4) {
      this.operationStep4();
    }

    // 选择尾巴
    if (this.operationStep === 5) {
      this.operationStep5();
    }

    // 选择毛发样式
    if (this.operationStep === 6) {
      this.operationStep6();
    }

    // 选择毛发长度
    if (this.operationStep === 7) {
      this.operationStep7();
    }

    // 改变选项文字
    if (this.operationStep > 0) {
      if (this.operationStep <= 6) {
        this.optionalText = this.optionalTextArray[this.operationStep - 1];
      } else {
        if (this.leftExhibitionImage[0].hairMorphology === '直毛') {
          this.optionalText = this.optionalTextArray[this.operationStep];
        } else {
          this.optionalText = this.optionalTextArray[this.operationStep - 1];
        }
      }
    }

    // 选中边框
    this.selectionChildren = this.stepChoiceArray[this.operationStep - 1];
    this.stepChoiceArray[this.operationStep] = -1;
  }


  /**
   * 步骤1
   * 右侧出现体型
   * 左侧默认进入为空  从下一页返回此页时默认为选中的体型
   */
  operationStep1() {
    this.dogParts[0] = this.dogTypes.dogTypesImage;
    this.len = this.dogParts[0].length;

    // 返回时左侧出现对应的图片
    this.getDogsImage(this.stepChoiceArray[this.operationStep - 1]);
  }

  /**
   * 步骤2
   * 右侧出现相应体型的多种颜色
   * 左侧为上一页选中的体型
   * 返回时置空耳朵
   */
  operationStep2() {
    this.dogParts[0] = this.dogColor.getDogColor(this.leftExhibitionImage[0].type);
    this.len = this.dogParts[0].length;

    this.dogParts[3] = [];

    this.leftExhibitionImage[1].src = '';
  }

  /**
   * 步骤3
   * 右侧出现对应的耳朵
   * 将体型向下层移动
   * 左侧为上一页选中的体型对应的颜色
   *  返回时置空腿
   */
  operationStep3() {
    this.dogParts[0] = this.dogEars.getDogEarImage(this.leftExhibitionImage[0].type, this.leftExhibitionImage[0].color);
    this.len = this.dogParts[0].length;

    // 添加身体
    this.dogParts[1] = [];
    this.dogParts[2] = [];
    this.dogParts[3] = [];
    for (let i = 0; i < this.dogParts[0].length; i++) {
      this.dogParts[3][i] = this.dogHair.getDogShapeImage(this.leftExhibitionImage[0].type, this.leftExhibitionImage[0].color, '直毛', 1);
    }

    this.leftExhibitionImage[2].src = '';
  }

  /**
   * 步骤4
   * 右侧出现对应的腿
   * 将耳朵向下层移动
   * 左侧为上一页选中的体型对应的颜色及耳朵
   * 返回时置空尾巴
   */
  operationStep4() {
    this.dogParts[0] = this.dogLegs.getDogLegImage(this.leftExhibitionImage[0].type, this.leftExhibitionImage[0].color);
    this.len = this.dogParts[0].length;

    // 添加耳朵
    this.dogParts[1] = [];
    this.dogParts[2] = [];
    for (let i = 0; i < this.dogParts[0].length; i++) {
      this.dogParts[2][i] = this.dogEars.getOneDogEarImage(this.leftExhibitionImage[0].type,
        this.leftExhibitionImage[0].color, this.leftExhibitionImage[1].style);
    }

    this.leftExhibitionImage[3].src = '';
  }

  /**
   * 步骤5
   * 右侧出现对应的尾巴
   * 将腿向下层移动
   * 左侧为上一页选中的体型对应的颜色、耳朵、腿
   */
  operationStep5() {
    this.dogParts[0] = this.dogTail.getDogTailImage(this.leftExhibitionImage[0].type, this.leftExhibitionImage[0].color);
    this.len = this.dogParts[0].length;

    this.dogParts[1] = [];
    this.dogParts[2] = [];
    this.dogParts[3] = [];
    for (let i = 0; i < this.dogParts[0].length; i++) {
      this.dogParts[3][i] = this.dogHair.getDogShapeImage(this.leftExhibitionImage[0].type, this.leftExhibitionImage[0].color, '直毛', 1);
      this.dogParts[2][i] = this.dogEars.getOneDogEarImage(this.leftExhibitionImage[0].type,
        this.leftExhibitionImage[0].color, this.leftExhibitionImage[1].style);
      this.dogParts[1][i] = this.dogLegs.getOneDogLegImage(this.leftExhibitionImage[0].type,
        this.leftExhibitionImage[0].color, this.leftExhibitionImage[2].legsLength);
    }

    this.setShapeImage(this.dogHair.getDogShapeImage(this.leftExhibitionImage[0].type, this.leftExhibitionImage[0].color, '直毛', 1));
    this.setLegsImage(this.dogHair.getDogLegImage(this.leftExhibitionImage[2].type,
      this.leftExhibitionImage[2].color, '直毛', this.leftExhibitionImage[2].legsLength, 1, 'AA'));
  }

  /**
   * 步骤6 选择毛发形态
   * 右侧出现两种毛发形态
   */
  operationStep6() {
    this.dogParts[1] = [];
    this.dogParts[2] = [];
    this.dogParts[3] = [];

    const hair = ['直毛', '卷毛'];
    const hairLength = [1, 2];
    for (let i = 0; i < 2; i++) {
      this.dogParts[3].push(this.dogHair.getDogShapeImage(this.leftExhibitionImage[0].type,
        this.leftExhibitionImage[0].color, hair[i], hairLength[i]));
      this.dogParts[2].push(this.leftExhibitionImage[1]);
      this.dogParts[1].push(this.dogHair.getDogLegImage(this.leftExhibitionImage[2].type,
        this.leftExhibitionImage[2].color, hair[i], this.leftExhibitionImage[2].legsLength, hairLength[i], 'aa'));
      this.dogParts[0].push(this.leftExhibitionImage[3]);
    }

    this.len = 6;

    this.setShapeImage(this.dogHair.getDogShapeImage(this.leftExhibitionImage[0].type, this.leftExhibitionImage[0].color, '直毛', 1));
    this.setLegsImage(this.dogHair.getDogLegImage(this.leftExhibitionImage[2].type,
      this.leftExhibitionImage[2].color, '直毛', this.leftExhibitionImage[2].legsLength, 1, 'aa'));
  }

  /**
   * 步骤7选择对应的毛发长度
   */
  operationStep7() {
    this.dogParts[1] = [];
    this.dogParts[2] = [];
    this.dogParts[3] = [];

    let hairLength = 0;
    if (this.leftExhibitionImage[0].hairMorphology === '直毛') {
      hairLength = 5;
      this.len = 5;
    } else {
      hairLength = 2;
      this.len = 6;
    }

    for (let i = 0; i < hairLength; i++) {
      this.dogParts[3].push(this.dogHair.getDogShapeImage(this.leftExhibitionImage[0].type,
        this.leftExhibitionImage[0].color, this.leftExhibitionImage[0].hairMorphology, i + 1));
      this.dogParts[2].push(this.leftExhibitionImage[1]);
      this.dogParts[1].push(this.dogHair.getDogLegImage(this.leftExhibitionImage[2].type, this.leftExhibitionImage[2].color,
        this.leftExhibitionImage[0].hairMorphology, this.leftExhibitionImage[2].legsLength, i + 1, 'aa'));
      this.dogParts[0].push(this.leftExhibitionImage[3]);
    }
  }

  // 说明文字按钮点击
  explainButton() {
    this.explainButtonEvent();

    this.record.recordOperation({
      eventScopeObject: this,
      event: this.explainButtonEvent,
      args: [],
      duration: 100,
    });
    // this.replay();
  }

  // 说明文字按钮点击 触发事件
  explainButtonEvent() {
    this.isShowExplainButton = !this.isShowExplainButton;
  }

  // 回放
  replay() {
    const option2 = {
      id: '0001',
      name: 'PBL-widget-01',
      limitTime: 100000,
      mode: ReplayModel.Auto,
      interval: 500,
      done: () => {
        //finsh call
      }
    };
    console.log('开始回放');
    console.log('step', this.record.steps);
    const replay = new Replay(option2, this.record.steps);

    console.log('准备回放');

    replay.start();
  }
}

