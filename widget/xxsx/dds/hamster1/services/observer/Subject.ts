// 发布类
import { Observer } from "./Observer";
import { Message, MessageType } from "../prefab/Message";
import { CommonUtil } from "../../../../../../src/util/CommonUtil";

export  class Subject {
  // 缓存列表，用以存放回调函数，以便通知订阅者
  private observers: Observer[] = new Array<Observer>();
  private state: Message;
  private animationLines: number[] = [];

  // 新增订阅者
  public subscribe (observer: Observer): void {
    //console.log('observer', observer)
    this.observers.push(observer);
  }

  // 改变状态，通知订阅者
  public setState(message: Message): void {
    console.log(`Warning: State changed: ${message}`);
    this.state = message;
    this.publish();
  }

  // 获取状态
  public getState(): Message {
    return this.state;
  }

  // 发布事件
  public publish (): void {
    for (const observer of this.observers) {
      observer.update();
    }
  }
  // 取消订阅
  public unsubscribe (observer?: Observer): void {
    // 如果没传参数，则清空订阅者
    if (!observer) {
      this.observers = new Array<Observer>();
    } else {
      this.observers.splice(this.observers.indexOf(observer), 1);
    }
  }

  /**************动画结束通知***************/
  public animationEnd (no: number): void {
    //动画结束， 用户没有任何操作，重复动画
    this.animationLines.push(no);
    if ( this.animationLines.length === 3 ) {
      console.log('animationEnd: ', this.animationLines);
      this.publish();
      this.animationLines.length = 0;
    }
  }

  //击中
  public hit(no: number): void {
      this.state.type = MessageType.PAUSE;
      this.publish();


    setTimeout(() => {
        this.state.type = MessageType.HIT;
        this.state.hitNo = no;
        this.publish();
      }, 100);
  }


  //本局结束通知
  public complete(): void {
    setTimeout(() => {
        console.log('结束');
        this.state.type = MessageType.END;
        this.publish();
        this.generateTopic();
    }, 2000);
  }

  /**************题目逻辑***************/
  generateTopic() {
    const arrayList: number[] = [];
    const ansList: string[] = [];

    const range = 20;

    /****** 生成题目以及将正确的答案放到队列中 *******/
    //加数
    const addend = CommonUtil.getRandomInt(1, range);
    //被加数
    const augend = CommonUtil.getRandomInt(1, range);
    const question = addend + ' + ' + augend;
    // 正确结果
    const result = addend + augend;
    // 正确结果的索引
    const correctNo = CommonUtil.getRandomInt(1, 12);
    arrayList.push(correctNo);
    ansList.push(result.toString());

    /****** 生成错误答案 *******/
    do {
      //地鼠编号
      const no = CommonUtil.getRandomInt(1, 12);
      const ans = CommonUtil.getRandomInt(1, 100);
      if ( arrayList.indexOf(no) === -1 && ansList.indexOf(ans) === -1) {
        arrayList.push(no);
        ansList.push(ans.toString());
      }
    } while (arrayList.length < 3);

    /****** 通知地鼠执行动画 *******/
    const message: Message = {
      type : MessageType.BEGIN,
      eventEnable: false,
      targetNo: arrayList,
      answerList: ansList,
      question: question,
      correctAnswer: result.toString(),
      correctNo: correctNo
    };
    console.log(arrayList);
    this.setState(message);
  }

}

