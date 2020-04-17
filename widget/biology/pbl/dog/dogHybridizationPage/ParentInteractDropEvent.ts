/**
 * 获取父本母本
 * @type {{init}}
 */

const interact = require('interactjs');
import { Record } from '@huohua/rrwidget';

export class ParentInteractDropEvent {

  // 父本id
  parentId: string;

  constructor(id: string, call: Function, record: Record) {
    interact('#' + id).dropzone({
      accept: '.leftParentDog',
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
    event.target.innerHTML = (event.relatedTarget).innerHTML;
    this.parentId = event.relatedTarget.id;
    call();
  }


}










