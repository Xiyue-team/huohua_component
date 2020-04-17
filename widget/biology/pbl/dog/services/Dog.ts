
import { DogHair } from './DogHair';
import { DogTail } from './DogTail';
import { DogEars } from './DogEars';

export class Dog {

  dogTail: DogTail;
  dogHair: DogHair;
  dogEars: DogEars;

  constructor() {
    this.dogEars = new DogEars();
    this.dogTail = new DogTail();
    this.dogHair = new DogHair();
  }

  getDog(option: Option) {
    const aDog = [];
    aDog[0] = this.dogHair.getDogShapeImage(option.shape, option.color, option.hair, option.hairLength);
    aDog[1] = this.dogEars.getOneDogEarImage(option.shape, option.color, option.ear);
    aDog[2] = this.dogHair.getDogLegImage(option.shape, option.color, option.hair, option.legsLength, option.hairLength, option.hairGene);
    aDog[3] = this.dogTail.getOneDogTailImage(option.shape, option.color, option.tail);

    return aDog;
  }
}

export class Option {
  shape: string;
  color: string;
  hair: string;
  hairLength: number;
  hairGene: string;
  ear: number;
  legsLength: number;
  tail: number;
}
