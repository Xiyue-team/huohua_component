import bgSrc1 from './sub_static/image/bg/bg01.png';
import bgSrc2 from './sub_static/image/bg/bg02.png';
import bgSrc3 from './sub_static/image/bg/bg03.png';
import bgSrc4 from './sub_static/image/bg/bg04.png';
import bgSrc5 from './sub_static/image/bg/bg05.png';
import bgSrc6 from './sub_static/image/bg/bg06.png';
import bgSrc7 from './sub_static/image/bg/bg07.png';
import bgSrc8 from './sub_static/image/bg/bg08.png';
import bgSrc9 from './sub_static/image/bg/bg09.png';
import bgSrc10 from './sub_static/image/bg/bg10.png';
import bgSrc11 from './sub_static/image/bg/bg11.png';

import front1 from './sub_static/image/bg/front01.png';
import front2 from './sub_static/image/bg/front02.png';
import front3 from './sub_static/image/bg/front03.png';
import front4 from './sub_static/image/bg/front04.png';
import front5 from './sub_static/image/bg/front05.png';
import front6 from './sub_static/image/bg/front06.png';
import front7 from './sub_static/image/bg/front07.png';
import front8 from './sub_static/image/bg/front08.png';
import front9 from './sub_static/image/bg/front09.png';
import front10 from './sub_static/image/bg/front10.png';
import front11 from './sub_static/image/bg/front11.png';

import tip from './sub_static/image/icon/tip.png';
export class SrcUtils {
    lang = window.env.browserInfo.lang;
    text = this.lang.text;
    location = this.lang.location;

    option = [
        {
            btn: {
                text: this.location[0],
                image: tip
            },
            swiperData: [
                { id: 0, bgSrc: bgSrc1, frontSrc: '', class: 'left', hasFront: false, tip: this.text[0][0] },
                { id: 1, bgSrc: bgSrc1, frontSrc: front1, class: 'left', hasFront: true, tip: this.text[0][1] }
            ],
            showIndex: 1,
            active: false,
            offsetL: 0.07,
            offsetT: 0.45,
            left: 100,
            top: 300
        }, {
            btn: {
                text: this.location[1],
                image: tip
            },
            swiperData: [
                { id: 0, bgSrc: bgSrc2, frontSrc: '', class: 'left', hasFront: false, tip: this.text[1][0] },
                { id: 1, bgSrc: bgSrc2, frontSrc: front2, class: 'left', hasFront: true, tip: this.text[1][1] }
            ],
            showIndex: 1,
            active: false,
            offsetL: 0.17,
            offsetT: 0.39,
            left: 100,
            top: 400
        }, {
            btn: {
                text: this.location[2],
                image: tip
            },
            swiperData: [
                { id: 0, bgSrc: bgSrc3, frontSrc: '', class: 'left', hasFront: false, tip: this.text[2][0] },
                { id: 1, bgSrc: bgSrc3, frontSrc: front3, class: 'left', hasFront: true, tip: this.text[2][1] }
            ],
            showIndex: 1,
            active: false,
            offsetL: 0.285,
            offsetT: 0.445,
            left: 100,
            top: 200
        }, {
            btn: {
                text: this.location[3],
                image: tip
            },
            swiperData: [
                { id: 0, bgSrc: bgSrc4, frontSrc: '', class: 'left', hasFront: false, tip: this.text[3][0] },
                { id: 1, bgSrc: bgSrc4, frontSrc: front4, class: 'left', hasFront: true, tip: this.text[3][1] }
            ],
            showIndex: 1,
            active: false,
            offsetL: 0.883,
            offsetT: 0.52,
            left: 150,
            top: 100
        }, {
            btn: {
                text: this.location[4] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
                image: tip
            },
            swiperData: [
                { id: 0, bgSrc: bgSrc5, frontSrc: '', class: 'left', hasFront: false, tip: this.text[4][0] },
                { id: 1, bgSrc: bgSrc5, frontSrc: front5, class: 'left', hasFront: true, tip: this.text[4][1] }
            ],
            showIndex: 2,
            active: false,
            offsetL: 0.157,
            offsetT: 0.2,
            left: 300,
            top: 100
        }, {
            btn: {
                text: this.location[5],
                image: tip
            },
            swiperData: [
                { id: 0, bgSrc: bgSrc6, frontSrc: '', class: 'left', hasFront: false, tip: this.text[5][0] },
                { id: 1, bgSrc: bgSrc6, frontSrc: front6, class: 'left', hasFront: true, tip: this.text[5][1] }
            ],
            showIndex: 2,
            active: false,
            offsetL: 0.17,
            offsetT: 0.27,
            left: 400,
            top: 100
        }, {
            btn: {
                text: this.location[6],
                image: tip
            },
            swiperData: [
                { id: 0, bgSrc: bgSrc7, frontSrc: '', class: 'left', hasFront: false, tip: this.text[6][0] },
                { id: 1, bgSrc: bgSrc7, frontSrc: front7, class: 'left', hasFront: true, tip: this.text[6][1] }
            ],
            showIndex: 2,
            active: false,
            offsetL: 0.255,
            offsetT: 0.23,
            left: 400,
            top: 100
        }, {
            btn: {
                text: this.location[7],
                image: tip
            },
            swiperData: [
                { id: 0, bgSrc: bgSrc8, frontSrc: '', class: 'left', hasFront: false, tip: this.text[7][0] },
                { id: 1, bgSrc: bgSrc8, frontSrc: front8, class: 'left', hasFront: true, tip: this.text[7][1] }
            ],
            showIndex: 2,
            active: false,
            offsetL: 0.325,
            offsetT: 0.35,
            left: 400,
            top: 100
        }, {
            btn: {
                text: this.location[8] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
                image: tip
            },
            swiperData: [
                { id: 0, bgSrc: bgSrc9, frontSrc: '', class: 'left', hasFront: false, tip: this.text[8][0] },
                { id: 1, bgSrc: bgSrc9, frontSrc: front9, class: 'left', hasFront: true, tip: this.text[8][1] }
            ],
            showIndex: 2,
            active: false,
            offsetL: 0.405,
            offsetT: 0.31,
            left: 400,
            top: 100
        }, {
            btn: {
                text: this.location[9],
                image: tip
            },
            swiperData: [
                { id: 0, bgSrc: bgSrc10, frontSrc: '', class: 'left', hasFront: false, tip: this.text[9][0] },
                { id: 1, bgSrc: bgSrc10, frontSrc: front10, class: 'left', hasFront: true, tip: this.text[9][1] }
            ],
            showIndex: 2,
            active: false,
            offsetL: 0.418,
            offsetT: 0.35,
            left: 400,
            top: 100
        }, {
            btn: {
                text: this.location[10],
                image: tip
            },
            swiperData: [
                { id: 0, bgSrc: bgSrc11, frontSrc: '', class: 'left', hasFront: false, tip: this.text[10][0] },
                { id: 1, bgSrc: bgSrc11, frontSrc: front11, class: 'left', hasFront: true, tip: this.text[10][1] }
            ],
            showIndex: 3,
            active: false,
            offsetL: 0.45,
            offsetT: 0.87,
            left: 400,
            top: 100
        }
    ];


}

