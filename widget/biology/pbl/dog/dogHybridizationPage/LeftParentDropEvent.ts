import { DogDivWidth } from "./DogDivWidth";

/**
 * 右侧子代向左拖拽保存为父本
 */
const interact = require('interactjs');
import { Record } from '@huohua/rrwidget';

export class LeftParentDropEvent {

  // 父本的id
  parentId: string;

  // 单个狗的宽度
  dogWidth = (new DogDivWidth()).dogDivWidth;

  // 狗横向的数量 用于计算狗的位置
  leftNumber = 2;
  // 狗纵向的数量 用于计算狗的位置
  topNumber = 1;
  id = 7;

  constructor(id: string, call: Function, record: Record) {
    interact('#' + id).dropzone({
      accept: '.rightChildDog',
      overlap: 0.75,
      ondrop:  (event: any) => {
        this.dropEvent(event, call);
        record.recordOperation({
          eventScopeObject: this,
          event: this.dropEvent,
          args: [event, call],
          duration: 100,
        });
      },
    });
  }

  dropEvent(event: any, call?: Function) {
    if (!event.relatedTarget.childNodes[0].childNodes[0].childNodes[0].src) {
      return;
    }

    // 添加父本到左栏
    const childHtml = event.relatedTarget.cloneNode(true);
    childHtml.removeChild(childHtml.childNodes[2]);
    childHtml.setAttribute('id', 'dog' + this.id);
    childHtml.setAttribute('class', 'whiteBackgroundChildren dogWH leftParentDog');
    event.target.appendChild(childHtml);
    childHtml.style.left = (this.dogWidth * this.leftNumber + 8 * (this.leftNumber)) + 'px';
    childHtml.style.top = (this.dogWidth * this.topNumber + 8 * (this.topNumber)) + 'px';
    this.leftNumber += 1;
    this.id += 1;

    // 设置接收狗的div高度  及 父节点高度和boxShadow
    if ((this.dogWidth * this.topNumber + 8 * (this.topNumber)) > event.target.clientHeight) {
      event.target.style.height = (this.dogWidth * (this.topNumber + 1) + 8 * (this.topNumber)) + 'px';
      event.currentTarget.parentElement.style.height = (this.dogWidth * (this.topNumber + 1) + 8 * (this.topNumber) + 16) + 'px';
      event.currentTarget.parentElement.style.boxShadow = '1px 0 0 0 rgba(0,0,0,0.10)';
    }

    if (this.leftNumber === 4) {
      this.leftNumber = 0;
      this.topNumber += 1;
    }

    this.parentId = event.relatedTarget.id;

    call();

    // 由于ondrop会触发两次 会额外添加进去一个父本 所以需要删除
    // 删除多余的父本
    if (event.currentTarget.getElementsByClassName('leftParentDog').length > this.id - 1) {
      for (let i = this.id - 1; i < event.currentTarget.getElementsByClassName('leftParentDog').length; i++) {
        event.currentTarget.removeChild(event.currentTarget.getElementsByClassName('leftParentDog')[i]);
      }
    }
  }
}

