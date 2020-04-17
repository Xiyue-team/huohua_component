import cardImage1 from '../sub_static/img/right/one/cardImage1.png';
import cardImage2 from '../sub_static/img/right/one/cardImage2.png';
import cardImage3 from '../sub_static/img/right/one/cardImage3.png';
import cardImage4 from '../sub_static/img/right/one/cardImage4.png';
import cardImage5 from '../sub_static/img/right/one/cardImage5.png';
import cardImage6 from '../sub_static/img/right/one/cardImage6.png';
import cardImage7 from '../sub_static/img/right/one/cardImage7.png';
import cardImage8 from '../sub_static/img/right/one/cardImage8.png';

import card2Image1 from '../sub_static/img/right/two/cardImage1.png';
import card2Image2 from '../sub_static/img/right/two/cardImage2.png';
import card2Image3 from '../sub_static/img/right/two/cardImage3.png';
import card2Image4 from '../sub_static/img/right/two/cardImage4.png';
import card2Image5 from '../sub_static/img/right/two/cardImage5.png';
import card2Image6 from '../sub_static/img/right/two/cardImage6.png';
import card2Image7 from '../sub_static/img/right/two/cardImage7.png';
import card2Image8 from '../sub_static/img/right/two/cardImage8.png';

import card3Image1 from '../sub_static/img/right/three/cardImage1.png';
import card3Image2 from '../sub_static/img/right/three/cardImage2.png';
import card3Image3 from '../sub_static/img/right/three/cardImage3.png';
import card3Image4 from '../sub_static/img/right/three/cardImage4.png';
import card3Image5 from '../sub_static/img/right/three/cardImage5.png';
import card3Image6 from '../sub_static/img/right/three/cardImage6.png';
import card3Image7 from '../sub_static/img/right/three/cardImage7.png';
import card3Image8 from '../sub_static/img/right/three/cardImage8.png';

export class RightImageStorage {
  imageSrc1 = [
    cardImage1, cardImage2, cardImage3, cardImage4, cardImage5,
    cardImage6, cardImage7, cardImage8
  ];

  imageSrc2 = [
    card2Image1, card2Image2, card2Image3, card2Image4, card2Image5,
    card2Image6, card2Image7, card2Image8
  ];

  imageSrc3 = [
    card3Image1, card3Image2, card3Image3, card3Image4, card3Image5,
    card3Image6, card3Image7, card3Image8
  ];

  constructor() {
    console.log(this.imageSrc1.length, this.imageSrc2.length, this.imageSrc3.length);
  }
}
