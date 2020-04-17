import textImage1 from '../sub_static/img/left/textImage1.png';
import textImage2 from '../sub_static/img/left/textImage2.png';
import textImage3 from '../sub_static/img/left/textImage3.png';
import textImage4 from '../sub_static/img/left/textImage4.png';
import textImage5 from '../sub_static/img/left/textImage5.png';
import textImage6 from '../sub_static/img/left/textImage6.png';
import textImage7 from '../sub_static/img/left/textImage7.png';
import textImage8 from '../sub_static/img/left/textImage8.png';
import textImage9 from '../sub_static/img/left/textImage9.png';
import textImage10 from '../sub_static/img/left/textImage10.png';
import textImage11 from '../sub_static/img/left/textImage11.png';
import textImage12 from '../sub_static/img/left/textImage12.png';
import textImage13 from '../sub_static/img/left/textImage13.png';
import textImage14 from '../sub_static/img/left/textImage14.png';
import textImage15 from '../sub_static/img/left/textImage15.png';
import textImage16 from '../sub_static/img/left/textImage16.png';

import regionImage1 from '../sub_static/img/left/regionImage1.png';
import regionImage2 from '../sub_static/img/left/regionImage2.png';
import regionImage3 from '../sub_static/img/left/regionImage3.png';
import regionImage4 from '../sub_static/img/left/regionImage4.png';
import regionImage5 from '../sub_static/img/left/regionImage5.png';
import regionImage6 from '../sub_static/img/left/regionImage6.png';

export class LeftImageStorage {
  textImageSrc = [
    textImage1, textImage2, textImage3, textImage4, textImage5,
    textImage6, textImage7, textImage8, textImage9, textImage10,
    textImage11, textImage12, textImage13, textImage14, textImage15,
    textImage16
  ];

  regionImageSrc: any = [
    regionImage1, regionImage2, regionImage3, regionImage4,
    regionImage5, regionImage6
  ];

  constructor() {
    console.log(this.textImageSrc.length);
  }
}
