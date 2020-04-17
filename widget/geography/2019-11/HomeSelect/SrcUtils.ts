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
import bgSrc12 from './sub_static/image/bg/bg12.png';

export class SrcUtils {
    lang = window.env.browserInfo.lang;
    text = this.lang.text;
    location = this.lang.location;

    option = [
        {
            btn: {
                text: this.location[0],
                show: false
            },
            swiperData: [
                { id: 0, bgSrc: bgSrc1, class: 'left', tip: this.text[0][0] },
                { id: 1, bgSrc: bgSrc2, class: 'left', tip: this.text[0][1] }
            ],
            showIndex: 1,
            active: false,
            offsetL: 0.47,
            offsetT: 0.23,
            left: 100,
            top: 300
        }, {
            btn: {
                text: this.location[1],
                show: false
            },
            swiperData: [
                { id: 0, bgSrc: bgSrc3, class: 'left', tip: this.text[1][0] },
                { id: 1, bgSrc: bgSrc4, class: 'left', tip: this.text[1][1] }
            ],
            showIndex: 1,
            active: false,
            offsetL: 0.24,
            offsetT: 0.35,
            left: 100,
            top: 400
        }, {
            btn: {
                text: this.location[2],
                show: false
            },
            swiperData: [
                { id: 0, bgSrc: bgSrc5, class: 'left', tip: this.text[2][0] },
                { id: 1, bgSrc: bgSrc6, class: 'left', tip: this.text[2][1] }
            ],
            showIndex: 1,
            active: false,
            offsetL: 0.5,
            offsetT: 0.39,
            left: 100,
            top: 200
        }, {
            btn: {
                text: this.location[3],
                show: false
            },
            swiperData: [
                { id: 0, bgSrc: bgSrc7, class: 'left', tip: this.text[3][0] },
                { id: 1, bgSrc: bgSrc8, class: 'left', tip: this.text[3][1] }
            ],
            showIndex: 1,
            active: false,
            offsetL: 0.745,
            offsetT: 0.3,
            left: 150,
            top: 100
        }, {
            btn: {
                text: this.location[4],
                show: false
            },
            swiperData: [
                { id: 0, bgSrc: bgSrc9, class: 'left', tip: this.text[4][0] },
                { id: 1, bgSrc: bgSrc10, class: 'left', tip: this.text[4][1] }
            ],
            showIndex: 2,
            active: false,
            offsetL: 0.29,
            offsetT: 0.68,
            left: 300,
            top: 100
        }, {
            btn: {
                text: this.location[5],
                show: false
            },
            swiperData: [
                { id: 0, bgSrc: bgSrc11, class: 'left', tip: this.text[5][0] },
                { id: 1, bgSrc: bgSrc12, class: 'left', tip: this.text[5][1] }
            ],
            showIndex: 2,
            active: false,
            offsetL: 0.51,
            offsetT: 0.92,
            left: 400,
            top: 100
        }
    ];


}

