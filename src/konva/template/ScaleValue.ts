
/**
 * 此类用于给SimpleKonvaTemplate2中的scale值做适配
 */

export class ScaleValue {

  scale: number;

  constructor(height: number = 576) {
    if ((window as any)['env'].browserInfo.isPc) {
      this.scale = (window.innerHeight / height );
    } else if ((window as any)['env'].browserInfo.isElectron) {
      this.scale = (window.innerHeight / height ) - 0.3;
    } else {
      this.scale = (window.innerHeight / height ) - 0.1;
    }
  }
}

