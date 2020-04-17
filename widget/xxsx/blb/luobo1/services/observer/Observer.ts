// 订阅者抽象类
import { Subject } from './Subject';

export abstract class Observer {
  // 订阅的内容
  protected subject: Subject;

  // 订阅更新
  public abstract update (): void;
}


