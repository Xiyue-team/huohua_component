import cardImage1 from '../sub_static/img/right/one/cardImage1.png';
import cardImage2 from '../sub_static/img/right/one/cardImage2.png';
import cardImage3 from '../sub_static/img/right/one/cardImage3.png';
import cardImage4 from '../sub_static/img/right/one/cardImage4.png';
import cardImage5 from '../sub_static/img/right/one/cardImage5.png';

export class RightImageStorage {
  imageSrc1 = [
    cardImage1, cardImage2, cardImage3, cardImage4, cardImage5
  ];

  imageSrc2: any = [];

  imageSrc3: any = [];

  constructor() {
    console.log(this.imageSrc1.length, this.imageSrc2.length, this.imageSrc3.length);
  }
}
