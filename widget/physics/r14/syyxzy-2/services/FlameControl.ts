import { BrowserInfo } from '../../../../../src/model/BrowserInfo';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';

export class FlameControl {
  browserInfo: BrowserInfo;

    constructor() {
      this.browserInfo = BrowserUtil.getBrowserInfo();
    }

    changeStatus(volumeNumber: number) {
      setTimeout(() => {
         this.controlFlame(volumeNumber);
        }, 0);
    }

    controlFlame(volumeNumber: number) {
        const flameElment = document.getElementsByClassName('flame');
        const className = 'flame_change' + volumeNumber;
        let scale, skew, translateZ;
        let transformStyle = 'rotate(180deg) scale(0.4,0.3)';

        if (this.browserInfo.browser.toLowerCase() === 'safari' || this.browserInfo.isIpad) {

          for (let i = 0; i < flameElment.length; i++) {
            const childElment = (flameElment[i] as HTMLElement);

            scale = 'scale('  +   (0.4 - 0.005 * volumeNumber - 0.01 * i) +  ','    + (0.3 - 0.005 * volumeNumber - 0.01 * i) + ')';
            skew  = 'skew('   +   (-2 * volumeNumber)                     +  'deg,' + (3 * volumeNumber) + 'deg)';

            if (volumeNumber > 0) {
              transformStyle = 'rotate(180deg)' + scale + skew;
            }
            childElment.style.transform       = transformStyle;
            childElment.style.webkitTransform = transformStyle;
            childElment.setAttribute('class', 'flame  ' + className);
          }

        } else {

          for (let i = 0; i < flameElment.length; i++) {
            const childElment = (flameElment[i] as HTMLElement);

            scale           = 'scale('      + (0.4 - 0.005 * volumeNumber)  + ','  +  (0.3 - 0.005 * volumeNumber)  +  ')';
            skew            = 'skew('       + (-2 * volumeNumber) + 'deg,'  + (3 * volumeNumber) + 'deg)';
            translateZ      = 'translateZ(' + (-1 * i * volumeNumber)       + 'px)' ;

            if (volumeNumber > 0 ) {
              transformStyle = 'rotate(180deg)' + scale + skew + translateZ;
            }
            childElment.style.transform       = transformStyle;
            childElment.style.webkitTransform = transformStyle;
            childElment.setAttribute('class', 'flame  ' + className);
          }
        }
    }
}
