// 发布类
import { Observer } from './Observer';
import { Message, MessageType } from './Message';
import { CommonUtil } from '../../../../../../src/util/CommonUtil';

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
  generateTopic

  () {

    const range = 20;
    const answerMap = new Map<string, string>();
    /****** 生成题目以及将正确的答案放到队列中 *******/
    const correctMap = this.getRandomData();
    // 正确结果的索引
    const correctNo = CommonUtil.getRandomInt(1, 4);
    answerMap.set(correctNo + '', correctMap.result + '');
    /****** 生成错误答案 *******/
    let index = 1;
    do {
        console.log(0)
        //生成随机答案
        const randomData = this.getRandomData();
        const resultIndex = Array.from(answerMap.values()).indexOf(randomData.result + '');

        console.log('resultIndex' , resultIndex)
        console.log('index' , answerMap.has(index + ''))
        //如果随机生成得答案 或者当前索引 已存在 则跳过
        if( resultIndex > -1 ){
          continue;
        } else if (answerMap.has(index + '') ) {
            ++ index ;
            console.log('index', index)
          continue;
        }
        answerMap.set(index + '', randomData.result +'');
        index++;
      console.log(1)
    } while (answerMap.size < 4);
    console.log('随机题目', answerMap);
/*    for ( let i = 1 ; i <= 4 ; i ++ ) {
        if ( answerMap.has(i + '')) {
          continue;
        }


      //answerMap.set(i);

    }*/
   /* do {
      //地鼠编号
      const no = CommonUtil.getRandomInt(1, 12);
      const ans = CommonUtil.getRandomInt(1, 100);
    } while (arrayList.length < 3);*/

    /****** 通知地鼠执行动画 *******/
    const message: Message = {
      type : MessageType.BEGIN,
      eventEnable: false,
      answerMap: answerMap,
      question: correctMap.question,
      correctAnswer: correctMap.result.toString(),
      correctNo: correctNo
    };
    this.setState(message);
  }

  getRandomData() {
    //加数
    const addend = CommonUtil.getRandomDecimal(100, 2);
    //被加数
    const augend = CommonUtil.getRandomDecimal(100, 2);
    //显示问题
    const question = addend + ' + ' + augend;
    // 正确结果
    const result = addend + augend;
    return {
      a: addend,
      b: augend,
      question : question,
      result : result
    };
  }




  start() {
    this.generateTopic();
  }

}

