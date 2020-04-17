/**
 * 缩放系数类
 */
export class ScaleValue {

  scale: number;

  constructor() {
    this.scale = (window.innerWidth / 1200);

    if (window.screen.width <= 854 && window.screen.width > 700) {
      this.scale = (window.innerWidth / 1200);
    } else if ((window as any)['env'].browserInfo.isSmallDevice) {
      this.scale = (window.innerWidth / 1200) - 0.15;
    }

  }


}
