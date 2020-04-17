import cardImage1 from '../sub_static/img/right/one/cardImage1.png';
import cardImage2 from '../sub_static/img/right/one/cardImage2.png';
import cardImage3 from '../sub_static/img/right/one/cardImage3.png';
import cardImage4 from '../sub_static/img/right/one/cardImage4.png';

import card2Image1 from '../sub_static/img/right/two/cardImage1.png';
import card2Image2 from '../sub_static/img/right/two/cardImage2.png';
import card2Image3 from '../sub_static/img/right/two/cardImage3.png';
import card2Image4 from '../sub_static/img/right/two/cardImage4.png';

import card3Image1 from '../sub_static/img/right/three/cardImage1.png';
import card3Image2 from '../sub_static/img/right/three/cardImage2.png';
import card3Image3 from '../sub_static/img/right/three/cardImage3.png';

import card4Image2 from '../sub_static/img/right/four/cardImage2.png';
import card4Image3 from '../sub_static/img/right/four/cardImage3.png';

import card5Image2 from '../sub_static/img/right/five/cardImage2.png';

export class RightImageStorage {
  imageSrc1 = [
    cardImage1, cardImage2, cardImage3, cardImage4
  ];

  imageSrc2 = [
    card2Image1, card2Image2, card2Image3, card2Image4
  ];

  imageSrc3 = [
    card3Image1, card3Image2, card3Image3
  ];

  imageSrc4 = [
    card4Image2, card4Image3
  ];

  imageSrc5 = [
    card5Image2
  ];

  constructor() {
    console.log(this.imageSrc1.length, this.imageSrc2.length, this.imageSrc3.length, this.imageSrc4.length, this.imageSrc5.length);
  }
}
