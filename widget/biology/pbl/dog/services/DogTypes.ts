import * as bx_cs_st from './../sub_static/chushi/bx_cs_st.png';
import * as dn_cs_st from './../sub_static/chushi/dn_cs_st.png';
import * as jw_cs_st from './../sub_static/chushi/jw_cs_st.png';
import * as kj_cs_st from './../sub_static/chushi/kj_cs_st.png';
import * as lq_cs_st from './../sub_static/chushi/lq_cs_st.png';
import * as ss_cs_st from './../sub_static/chushi/ss_cs_st.png';

export class DogTypes {


  dogTypesImage: Array<object>;


  constructor() {


    this.dogTypesImage = [
      {
        character: '身体',
        type: '猎犬',
        src: lq_cs_st
      },
      {
        character: '身体',
        type: '松狮',
        src: ss_cs_st
      },
      {
        character: '身体',
        type: '柯基',
        src: kj_cs_st
      },
      {
        character: '身体',
        type: '斗牛',
        src: dn_cs_st
      },
      {
        character: '身体',
        type: '比熊',
        src: bx_cs_st
      },
      {
        character: '身体',
        type: '吉娃',
        src: jw_cs_st
      },
    ];
  }


  getDogTypes(name: string) {

    // console.log('this.dogTypesImage', this.dogTypesImage.indexOf('松狮'));

    for (let i = 0; i < this.dogTypesImage.length; i++) {

      if ((this.dogTypesImage[i] as any).name === name) {

        return (this.dogTypesImage[i] as any).src;
      }

    }


  }



}


