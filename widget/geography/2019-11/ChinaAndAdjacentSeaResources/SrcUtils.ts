import bgSrc1 from './sub_static/image/bg/bg01.png';
import bgSrc2 from './sub_static/image/bg/bg02.png';
import bgSrc3 from './sub_static/image/bg/bg03.png';
import bgSrc4 from './sub_static/image/bg/bg04.png';
import bgSrc5 from './sub_static/image/bg/bg05.png';
import bgSrc6 from './sub_static/image/bg/bg06.png';
import bgSrc7 from './sub_static/image/bg/bg07.png';
import bgSrc8 from './sub_static/image/bg/bg08.png';

export class SrcUtils {
    lang = window.env.browserInfo.lang;
    text = this.lang.text;
    tiptext = this.lang.tiptext;

    option = [
        {
            text: this.tiptext[0],
            bgSrc: bgSrc1,
            tip: this.text[0],
            showIndex: 0,
            active: false,
            deg: 0,
            offsetL: 0.21,
            offsetT: 0.6,
            left: 100,
            top: 300
        }, {
            text: this.tiptext[1],
            bgSrc: bgSrc2,
            tip: this.text[1],
            showIndex: 0,
            active: false,
            deg: 0,
            offsetL: 0.315,
            offsetT: 0.455,
            left: 100,
            top: 400
        }, {
            text: this.tiptext[2],
            bgSrc: bgSrc3,
            tip: this.text[2],
            showIndex: 0,
            active: false,
            deg: 0,
            offsetL: 0.255,
            offsetT: 0.18,
            left: 100,
            top: 200
        }, {
            text: this.tiptext[3],
            bgSrc: bgSrc4,
            tip: this.text[3],
            showIndex: 0,
            active: false,
            deg: 0,
            offsetL: 0.315,
            offsetT: 0.28,
            left: 150,
            top: 100
        }, {
            text: this.tiptext[4],
            bgSrc: bgSrc5,
            tip: this.text[4],
            showIndex: 1,
            active: false,
            deg: 0,
            offsetL: 0.285,
            offsetT: 0.19,
            left: 300,
            top: 100
        }, {
            text: this.tiptext[5],
            bgSrc: bgSrc6,
            tip: this.text[5],
            showIndex: 1,
            active: false,
            deg: 0,
            offsetL: 0.27,
            offsetT: 0.54,
            left: 400,
            top: 100
        }, {
            text: this.tiptext[6],
            bgSrc: bgSrc7,
            tip: this.text[6],
            showIndex: 1,
            active: false,
            deg: 0,
            offsetL: 0.59,
            offsetT: 0.33,
            left: 400,
            top: 100
        }, {
            text: this.tiptext[7],
            bgSrc: bgSrc8,
            tip: this.text[7],
            showIndex: 1,
            active: false,
            deg: -45,
            offsetL: 0.46,
            offsetT: 0.52,
            left: 400,
            top: 100
        }
    ];


}

