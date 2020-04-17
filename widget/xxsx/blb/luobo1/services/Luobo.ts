import * as PIXI from 'pixi.js';
import { Observer } from './observer/Observer';
import { Subject } from './observer/Subject';
import { Message, MessageType } from './observer/Message';

export class Luobo extends Observer {

  // 大萝卜
  big: PIXI.Sprite;
  // 小萝卜
  small: PIXI.Sprite;
  // 问答
  ansBg: PIXI.Sprite;
  // 提示文字
  ansText: PIXI.Text;
  //当前编号
  no: number;

  constructor(subject: Subject, res: PIXI.LoaderResource, root: PIXI.Container, x: number, y: number, no: number) {

    super();
    this.subject = subject;
    this.subject.subscribe(this);

    const big = new PIXI.Sprite((res as any).daluobo.texture);
    const small = new PIXI.Sprite((res as any).xiaoluobo.texture);
    const ansBg = new PIXI.Sprite((res as any).ansBg.texture);

    const style = new PIXI.TextStyle({
      fontSize: 39,
      fontWeight: 'bold',
      fill: ['#FFFFFF'], // gradient
    });
    this.ansText = new PIXI.Text('', style);


    big.position.y = 55;
    small.position.y = 55;
    ansBg.position.x = 25;
    this.ansText.position.x = 55;
    this.ansText.position.y = 8;

    const container  = new PIXI.Container();

    container.addChild(big);
    container.addChild(small);
    container.addChild(ansBg);
    container.addChild(this.ansText);

    container.position.x = x;
    container.position.y = y;
    root.addChild(container);
  }

  public update() {
    const message = this.subject.getState() as Message;
    if ( message.type === MessageType.BEGIN) {
        //this.ansText.text = message.answerList[this.no - 1];
    }

  }

}
