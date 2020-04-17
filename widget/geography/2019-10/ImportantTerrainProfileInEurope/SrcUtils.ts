import ebgSrc1 from './sub_static/image/e100/bg01.png';
import ebgSrc2 from './sub_static/image/e100/bg02.png';
import ebgSrc3 from './sub_static/image/e100/bg03.png';
import ebgSrc4 from './sub_static/image/e100/bg04.png';
import ebgSrc5 from './sub_static/image/e100/bg05.png';
import ebgSrc6 from './sub_static/image/e100/bg06.png';


import n4bgSrc1 from './sub_static/image/n40/bg01.png';
import n4bgSrc2 from './sub_static/image/n40/bg02.png';
import n4bgSrc3 from './sub_static/image/n40/bg03.png';
import n4bgSrc4 from './sub_static/image/n40/bg04.png';
import n4bgSrc5 from './sub_static/image/n40/bg05.png';
import n4bgSrc6 from './sub_static/image/n40/bg06.png';
import n4bgSrc7 from './sub_static/image/n40/bg07.png';
import n4bgSrc8 from './sub_static/image/n40/bg08.png';

import BGs40 from './sub_static/image/B40.png';
import BGs100 from './sub_static/image/B100.png';
import bg from './sub_static/image/Europe.png';

import tip from './sub_static/image/tip.png';
import dot from './sub_static/image/dot.png';

import label from './sub_static/image/label.png';

export class SrcUtils {
    textE100 = window.env.browserInfo.lang.textE100;
    textN40 = window.env.browserInfo.lang.textN40;
    tip = tip;
    dot = dot;
    label = label;
    bgSrc = bg;

    bg40 = BGs40;
    bg100 = BGs100;

    swiperData = {
        e100: [
            { id: 0, bgSrc: ebgSrc1, tip: this.textE100[0] },
            { id: 1, bgSrc: ebgSrc2, tip: this.textE100[1] },
            { id: 2, bgSrc: ebgSrc3, tip: this.textE100[2] },
            { id: 3, bgSrc: ebgSrc4, tip: this.textE100[3] },
            { id: 4, bgSrc: ebgSrc5, tip: this.textE100[4] },
            { id: 5, bgSrc: ebgSrc6, tip: this.textE100[5] },
        ],
        n40: [
            { id: 0, bgSrc: n4bgSrc1, tip: this.textN40[0] },
            { id: 1, bgSrc: n4bgSrc2, tip: this.textN40[1] },
            { id: 2, bgSrc: n4bgSrc3, tip: this.textN40[2] },
            { id: 3, bgSrc: n4bgSrc4, tip: this.textN40[3] },
            { id: 4, bgSrc: n4bgSrc5, tip: this.textN40[4] },
            { id: 5, bgSrc: n4bgSrc6, tip: this.textN40[5] },
            { id: 6, bgSrc: n4bgSrc7, tip: this.textN40[6] },
            { id: 7, bgSrc: n4bgSrc8, tip: this.textN40[7] },
        ],
    };

    labelData = {
        e100: [
            { id: 0, tip: this.textE100[0] },
            { id: 1, tip: this.textE100[1] },
            { id: 2, tip: this.textE100[2] },
            { id: 3, tip: this.textE100[3] },
            { id: 4, tip: this.textE100[4] },
            { id: 5, tip: this.textE100[5] },
        ],
        n40: [
            { id: 0, tip: this.textN40[0] },
            { id: 1, tip: this.textN40[1] },
            { id: 2, tip: this.textN40[2] },
            { id: 3, tip: this.textN40[3] },
            { id: 4, tip: this.textN40[4] },
            { id: 5, tip: this.textN40[5] },
            { id: 6, tip: this.textN40[6] },
            { id: 7, tip: this.textN40[7] },
        ],
    };

}

