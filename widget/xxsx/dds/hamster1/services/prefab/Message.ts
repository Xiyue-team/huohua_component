export interface Message {

  type: MessageType;
  //上浮目标地鼠编号
  targetNo: number[];
  //问题题目
  question: string;
  //答案列表
  answerList: string[];
  //正确答案
  correctAnswer: string;
  //正确地鼠编号
  correctNo: number;
  //击打的对象
  hitNo?: number;

  eventEnable?: boolean  ;

}


export enum MessageType {
  //动画开始
  BEGIN,
  //动画结束
  END,
  //动画暂停
  PAUSE,
  //打中
  HIT,
 /* //打空
  MISS,
  //错误的
  INCORRECT*/
}
