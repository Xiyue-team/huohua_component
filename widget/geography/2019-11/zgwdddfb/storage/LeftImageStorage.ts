import textImage1 from '../sub_static/img/left/textImage1.png';
import textImage2 from '../sub_static/img/left/textImage2.png';
import textImage3 from '../sub_static/img/left/textImage3.png';
import textImage4 from '../sub_static/img/left/textImage4.png';
import textImage5 from '../sub_static/img/left/textImage5.png';
import textImage6 from '../sub_static/img/left/textImage6.png';

import regionImage1 from '../sub_static/img/left/regionImage1.png';
import regionImage2 from '../sub_static/img/left/regionImage2.png';
import regionImage3 from '../sub_static/img/left/regionImage3.png';
import regionImage4 from '../sub_static/img/left/regionImage4.png';
import regionImage5 from '../sub_static/img/left/regionImage5.png';
import regionImage6 from '../sub_static/img/left/regionImage6.png';

export class LeftImageStorage {
  textImageSrc = [
    textImage1, textImage2, textImage3, textImage4, textImage5, textImage6
  ];
  regionImageSrc = [
    regionImage1, regionImage2, regionImage3, regionImage4, regionImage5, regionImage6
  ];
  constructor() {
    console.log(this.textImageSrc.length);
  }
}
