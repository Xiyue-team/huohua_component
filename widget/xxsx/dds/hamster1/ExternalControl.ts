export default class ExternalControl {
  //总体数
  questionCount: number = 15;

  constructor() {

    (window as any).externalModel = this;
  }

  //暂停或恢复
  pauseAndResume() {

  }

  //当前进度
  currentProgress() {

  }

  //答对题数
  correctNum() {

  }

  //评级（星）
  evaluationStar() {

  }

  //重置
  reset() {

  }


}
