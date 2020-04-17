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
import bgSrc13 from './sub_static/image/bg/bg13.png';
import bgSrc14 from './sub_static/image/bg/bg14.png';
import bgSrc15 from './sub_static/image/bg/bg15.png';
import bgSrc16 from './sub_static/image/bg/bg16.png';

export class SrcUtils {
    text = window.env.browserInfo.lang.text;

    swiperData = [
        [
            { id: 0, bgSrc: bgSrc1, tip: this.text[0] },
            { id: 1, bgSrc: bgSrc2, tip: this.text[1] },
            { id: 2, bgSrc: bgSrc3, tip: this.text[2] }
        ], [
            { id: 0, bgSrc: bgSrc4, tip: this.text[3] },
            { id: 1, bgSrc: bgSrc5, tip: this.text[4] },
            { id: 2, bgSrc: bgSrc6, tip: this.text[5] }
        ], [
            { id: 0, bgSrc: bgSrc7, tip: this.text[6] },
            { id: 1, bgSrc: bgSrc8, tip: this.text[7] }
        ], [
            { id: 0, bgSrc: bgSrc9, tip: this.text[8] },
            { id: 1, bgSrc: bgSrc10, tip: this.text[9] },
            { id: 2, bgSrc: bgSrc11, tip: this.text[10] }
        ], [
            { id: 0, bgSrc: bgSrc12, tip: this.text[11] },
            { id: 1, bgSrc: bgSrc13, tip: this.text[12] }
        ], [
            { id: 0, bgSrc: bgSrc14, tip: this.text[13] },
            { id: 1, bgSrc: bgSrc15, tip: this.text[14] },
            { id: 2, bgSrc: bgSrc16, tip: this.text[15] }
        ]
    ];

}

