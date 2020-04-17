import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import {Vue} from 'vue/types/vue';
// import { Record, Replay, ReplayModel } from '@huohua/rrwidget';

export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

    // record: Record;
    // replay: Replay;

    //构造函数
    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        super.domReady();
      //   const option = {
      //       id: 'jestId',
      //       name: 'PBL录制微件',
      //       limitTime: 100000,
      //   };
      //   this.record = new Record(option);
      //   this.record.start();
      //
      //
      // // console.log('record', record);

        ViewController.getInstance().hideLoading(1000);
    }






    //改变窗口
    resize() {
        super.resize();
    }

    //重置页面
    reset() {
        super.reset();
        // this.myCanvas.reset();
    }

}
