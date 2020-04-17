import cardImage1 from '../sub_static/img/right/one/cardImage1.png';
import cardImage2 from '../sub_static/img/right/one/cardImage2.png';
import cardImage3 from '../sub_static/img/right/one/cardImage3.png';
import cardImage4 from '../sub_static/img/right/one/cardImage4.png';
import cardImage5 from '../sub_static/img/right/one/cardImage5.png';
import cardImage6 from '../sub_static/img/right/one/cardImage6.png';
import cardImage7 from '../sub_static/img/right/one/cardImage7.png';
import cardImage8 from '../sub_static/img/right/one/cardImage8.png';
import cardImage9 from '../sub_static/img/right/one/cardImage9.png';
import cardImage10 from '../sub_static/img/right/one/cardImage10.png';
import cardImage11 from '../sub_static/img/right/one/cardImage11.png';
import cardImage12 from '../sub_static/img/right/one/cardImage12.png';
import cardImage13 from '../sub_static/img/right/one/cardImage13.png';

export class RightImageStorage {
  imageSrc1 = [
    cardImage1, cardImage2, cardImage3, cardImage4, cardImage5, cardImage6, cardImage7, cardImage8, cardImage9, cardImage10,
    cardImage11, cardImage12, cardImage13
  ];

  imageSrc2: any = [];

  imageSrc3: any = [];

  constructor() {
    console.log(this.imageSrc1.length, this.imageSrc2.length, this.imageSrc3.length);
  }
}
