import frontE1 from './sub_static/image/Export/front01.png';
import frontE2 from './sub_static/image/Export/front02.png';
import frontE3 from './sub_static/image/Export/front03.png';
import frontE4 from './sub_static/image/Export/front04.png';
import frontE5 from './sub_static/image/Export/front05.png';
import iconE1 from './sub_static/image/Export/icon01.png';
import iconE2 from './sub_static/image/Export/icon02.png';
import iconE3 from './sub_static/image/Export/icon03.png';
import iconE4 from './sub_static/image/Export/icon04.png';
import iconE5 from './sub_static/image/Export/icon05.png';

import frontI1 from './sub_static/image/Import/front01.png';
import frontI2 from './sub_static/image/Import/front02.png';
import frontI3 from './sub_static/image/Import/front03.png';
import frontI4 from './sub_static/image/Import/front04.png';
import frontI5 from './sub_static/image/Import/front05.png';
import frontI6 from './sub_static/image/Import/front06.png';
import frontI7 from './sub_static/image/Import/front07.png';
import iconI1 from './sub_static/image/Import/icon01.png';
import iconI2 from './sub_static/image/Import/icon02.png';
import iconI3 from './sub_static/image/Import/icon03.png';
import iconI4 from './sub_static/image/Import/icon04.png';
import iconI5 from './sub_static/image/Import/icon05.png';
import iconI6 from './sub_static/image/Import/icon06.png';
import iconI7 from './sub_static/image/Import/icon07.png';

export class SrcUtils {
    lang = window.env.browserInfo.lang;
    text = this.lang.text;
    btntext = this.lang.btntext;

    option = [{
        title: this.btntext[0].title,
        text: this.text[0],
        msg: [
            {
                btn: {
                    front: frontI1,
                    icon: iconI1,
                    text: this.btntext[0].cell[0]
                },
                text: this.btntext[0].cellText[0],
                active: false
            }, {
                btn: {
                    front: frontI2,
                    icon: iconI2,
                    text: this.btntext[0].cell[1]
                },
                text: this.btntext[0].cellText[1],
                active: false
            }, {
                btn: {
                    front: frontI3,
                    icon: iconI3,
                    text: this.btntext[0].cell[2]
                },
                text: this.btntext[0].cellText[2],
                active: false
            }, {
                btn: {
                    front: frontI4,
                    icon: iconI4,
                    text: this.btntext[0].cell[3]
                },
                text: this.btntext[0].cellText[3],
                active: false
            }, {
                btn: {
                    front: frontI5,
                    icon: iconI5,
                    text: this.btntext[0].cell[4]
                },
                text: this.btntext[0].cellText[4],
                active: false
            }, {
                btn: {
                    front: frontI6,
                    icon: iconI6,
                    text: this.btntext[0].cell[5]
                },
                text: this.btntext[0].cellText[5],
                active: false
            }, {
                btn: {
                    front: frontI7,
                    icon: iconI7,
                    text: this.btntext[0].cell[6]
                },
                text: this.btntext[0].cellText[6],
                active: false
            }
        ]
    }
        ,
    {
        title: this.btntext[1].title,
        text: this.text[1],
        msg: [
            {
                btn: {
                    front: frontE1,
                    icon: iconE1,
                    text: this.btntext[1].cell[0]
                },
                text: this.btntext[1].cellText[0],
                active: false
            }, {
                btn: {
                    front: frontE2,
                    icon: iconE2,
                    text: this.btntext[1].cell[1]
                },
                text: this.btntext[1].cellText[1],
                active: false
            }, {
                btn: {
                    front: frontE3,
                    icon: iconE3,
                    text: this.btntext[1].cell[2]
                },
                text: this.btntext[1].cellText[2],
                active: false
            }, {
                btn: {
                    front: frontE4,
                    icon: iconE4,
                    text: this.btntext[1].cell[3]
                },
                text: this.btntext[1].cellText[3],
                active: false
            }, {
                btn: {
                    front: frontE5,
                    icon: iconE5,
                    text: this.btntext[1].cell[4]
                },
                text: this.btntext[1].cellText[4],
                active: false
            }
        ]
    }
    ];


}

