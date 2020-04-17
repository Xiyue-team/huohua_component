import textImage1 from '../sub_static/img/left/textImage1.png';
import textImage2 from '../sub_static/img/left/textImage2.png';
import textImage3 from '../sub_static/img/left/textImage3.png';
import textImage4 from '../sub_static/img/left/textImage4.png';
import textImage5 from '../sub_static/img/left/textImage5.png';
import textImage6 from '../sub_static/img/left/textImage6.png';
import textImage7 from '../sub_static/img/left/textImage7.png';

export class LeftImageStorage {
  textImageSrc = [
    textImage1, textImage2, textImage3, textImage4, textImage5,
    textImage6, textImage7
  ];

  constructor() {
    console.log(this.textImageSrc.length);
  }
}
