import ebgSrc1 from './sub_static/image/e100/bg01.jpg';
import ebgSrc2 from './sub_static/image/e100/bg02.jpg';
import ebgSrc3 from './sub_static/image/e100/bg03.jpg';
import ebgSrc4 from './sub_static/image/e100/bg04.jpg';
import ebgSrc5 from './sub_static/image/e100/bg05.jpg';
import ebgSrc6 from './sub_static/image/e100/bg06.jpg';
import ebgSrc7 from './sub_static/image/e100/bg07.jpg';
import ebgSrc8 from './sub_static/image/e100/bg08.jpg';
import ebgSrc9 from './sub_static/image/e100/bg09.jpg';
import ebgSrc10 from './sub_static/image/e100/bg10.jpg';
import ebgSrc11 from './sub_static/image/e100/bg11.jpg';
import ebgSrc12 from './sub_static/image/e100/bg12.jpg';

import n3bgSrc1 from './sub_static/image/n30/bg01.jpg';
import n3bgSrc2 from './sub_static/image/n30/bg02.jpg';
import n3bgSrc3 from './sub_static/image/n30/bg03.jpg';
import n3bgSrc4 from './sub_static/image/n30/bg04.jpg';
import n3bgSrc5 from './sub_static/image/n30/bg05.jpg';
import n3bgSrc6 from './sub_static/image/n30/bg06.jpg';
import n3bgSrc7 from './sub_static/image/n30/bg07.jpg';
import n3bgSrc8 from './sub_static/image/n30/bg08.jpg';
import n3bgSrc9 from './sub_static/image/n30/bg09.jpg';
import n3bgSrc10 from './sub_static/image/n30/bg10.jpg';
import n3bgSrc11 from './sub_static/image/n30/bg11.jpg';
import n3bgSrc12 from './sub_static/image/n30/bg12.jpg';
import n3bgSrc13 from './sub_static/image/n30/bg13.jpg';

import n4bgSrc1 from './sub_static/image/n40/bg01.jpg';
import n4bgSrc2 from './sub_static/image/n40/bg02.jpg';
import n4bgSrc3 from './sub_static/image/n40/bg03.jpg';
import n4bgSrc4 from './sub_static/image/n40/bg04.jpg';
import n4bgSrc5 from './sub_static/image/n40/bg05.jpg';
import n4bgSrc6 from './sub_static/image/n40/bg06.jpg';
import n4bgSrc7 from './sub_static/image/n40/bg07.jpg';
import n4bgSrc8 from './sub_static/image/n40/bg08.jpg';
import n4bgSrc9 from './sub_static/image/n40/bg09.jpg';
import n4bgSrc10 from './sub_static/image/n40/bg10.jpg';
import n4bgSrc11 from './sub_static/image/n40/bg11.jpg';
import n4bgSrc12 from './sub_static/image/n40/bg12.jpg';
import n4bgSrc13 from './sub_static/image/n40/bg13.jpg';

import BGs30 from './sub_static/image/B30.png';
import BGs40 from './sub_static/image/B40.png';
import BGs100 from './sub_static/image/B100.png';
import bg from './sub_static/image/Asia.png';

import tip from './sub_static/image/tip.png';
import dot from './sub_static/image/dot.png';

import label from './sub_static/image/label.png';
export class SrcUtils {
    textE100 = window.env.browserInfo.lang.textE100;
    textN40 = window.env.browserInfo.lang.textN40;
    textN30 = window.env.browserInfo.lang.textN30;
    tip = tip;
    dot = dot;
    label = label;
    bgSrc = bg;
    bg30 = BGs30;
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
            { id: 6, bgSrc: ebgSrc7, tip: this.textE100[6] },
            { id: 7, bgSrc: ebgSrc8, tip: this.textE100[7] },
            { id: 8, bgSrc: ebgSrc9, tip: this.textE100[8] },
            { id: 9, bgSrc: ebgSrc10, tip: this.textE100[9] },
            { id: 10, bgSrc: ebgSrc11, tip: this.textE100[10] },
            { id: 11, bgSrc: ebgSrc12, tip: this.textE100[11] }
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
            { id: 8, bgSrc: n4bgSrc9, tip: this.textN40[8] },
            { id: 9, bgSrc: n4bgSrc10, tip: this.textN40[9] },
            { id: 10, bgSrc: n4bgSrc11, tip: this.textN40[10] },
            { id: 11, bgSrc: n4bgSrc12, tip: this.textN40[11] },
            { id: 12, bgSrc: n4bgSrc13, tip: this.textN40[12] }
        ],
        n30: [
            { id: 0, bgSrc: n3bgSrc1, tip: this.textN30[0] },
            { id: 1, bgSrc: n3bgSrc2, tip: this.textN30[1] },
            { id: 2, bgSrc: n3bgSrc3, tip: this.textN30[2] },
            { id: 3, bgSrc: n3bgSrc4, tip: this.textN30[3] },
            { id: 4, bgSrc: n3bgSrc5, tip: this.textN30[4] },
            { id: 5, bgSrc: n3bgSrc6, tip: this.textN30[5] },
            { id: 6, bgSrc: n3bgSrc7, tip: this.textN30[6] },
            { id: 7, bgSrc: n3bgSrc8, tip: this.textN30[7] },
            { id: 8, bgSrc: n3bgSrc9, tip: this.textN30[8] },
            { id: 9, bgSrc: n3bgSrc10, tip: this.textN30[9] },
            { id: 10, bgSrc: n3bgSrc11, tip: this.textN30[10] },
            { id: 11, bgSrc: n3bgSrc12, tip: this.textN30[11] },
            { id: 12, bgSrc: n3bgSrc13, tip: this.textN30[12] }
        ],
    };

}

