/**
 * 枚举类，记录坐标等信息
 */
export  class Constant {
    //dna 文字坐标
    static DnaLabelPosition = {
        x : 61,
        y : 125 + 45
    };

    //rdna 文字坐标
    static RDnaLablePosition = {
        x: 61,
        y: 125 + 77 + 28 + 65,
    };


    //dna 链 初始灰色链图
    static DNAUncompleteImg = {
        id: 'dnaUncompleteChain',
        name: 'dnaUncompleteChain',
        x: 134,
        y: 102,
        width: 548,
        height: 77
    };


    //dna 链 第一张图信息
    static DNA1Img = {
        id: 'dnaChain1',
        name: 'dnaChain',
        x: 134,
        y: 102,
        width: 103,
        height: 77,
        visible: false
    };

    //dna 链 第二张图信息
    static DNA2Img = {

        id: 'dnaChain2',
        name: 'dnaChain',
        x: 134 + 103 ,
        y: 102,
        width: 29,
        height: 77,
        visible: false
    };

    //dna 链 第三张图信息
    static DNA3Img = {

        id: 'dnaChain3',
        name: 'dnaChain',
        x: 134 + 103 + 29,
        y: 102,
        width: 28,
        height: 77,
        visible: false
    };

    //dna 链 第四张图信息
    static DNA4Img = {

        id: 'dnaChain4',
        name: 'dnaChain',
        x: 134 + 103 + 29 + 28,
        y: 102,
        width: 30,
        height: 77,
        visible: false
    };

    //dna 链 第五张图信息
    static DNA5Img = {

        id: 'dnaChain5',
        name: 'dnaChain',
        x: 134 + 103 + 29 + 28 + 30,
        y: 102,
        width: 358,
        height: 77,
        visible: false
    };

    //mRNA 未完成时显示的灰色链
    static mRNAUncompleteImg = {
        id: 'mRNAUncompleteChain',
        name: 'mRNAUncomplete',
        x: 52 + 62 + 21,
        y: 102 + 77 + 74,
        width: 542,
        height: 8
    };

    //mRNA 链上占位的灰色点
    static mRNAPointImg = {
        id: 'mRNAPoint',
        name: 'mRNAUncomplete',
        x: 52 + 62 + 21 + 27 - 3,
        y: 102 + 77 + 74  - 11 - 11,
        width: 16,
        height: 22
    };

    //mRna 链 第一张图信息
    static mRNA1Img = {
        id: 'mRnaChain1',
        name: 'mRnaChain',
        x: 134,
        y: 102 + 144 - 28 / 2 ,
        width: 105,
        height: 28,
        visible: false
    };

    //mRna 链 第二张图信息
    static mRNA2Img = {
        id: 'mRnaChain2',
        name: 'mRnaChain',
        x: 134 + 105,
        y: 102 + 144 - 28 / 2 ,
        width: 27,
        height: 28,
        visible: false
    };

    //mRna 链 第三张图信息
    static mRNA3Img = {
        id: 'mRnaChain3',
        name: 'mRnaChain',
        x: 134 + 105 + 27,
        y: 102 + 144 - 28 / 2 ,
        width: 27,
        height: 28,
        visible: false
    };

    //mRna 链 第四张图信息
    static mRNA4Img = {
        id: 'mRnaChain4',
        name: 'mRnaChain',
        x: 134 + 105 + 27 + 27,
        y: 102 + 144 - 28 / 2 ,
        width: 27,
        height: 28,
        visible: false
    };

    //mRna 链 第五张图信息
    static mRNA5Img = {
        id: 'mRnaChain5',
        name: 'mRnaChain',
        x: 134 + 105 + 27 + 27 + 27,
        y: 102 + 144 - 28 / 2 ,
        width: 357,
        height: 28,
        visible: false
    };

    //肽链边框
    static petideBorderImg = {
        id: 'border',
        x: 51,
        y: 125 + 77 + 28 + 28 + 42 + 28 + 23 - 50,
        // width: 636,
        // height: 148
        width: 639,
        height: 189
    };

    //灰色肽链
    static grayPetideChainImg = {
        id: 'grayPetideChain',
        x: 51 + 17,
        y: 125 + 77 + 28 + 28 + 42 + 52 + 15 - 50,
        width: 598,
        height: 19,
        visible: true
    };

    //灰色肽链1
    static grayPetideChain1Img = {
        id: 'grayPetide1Chain',
        x: 51 + 17,
        y: 125 + 77 + 28 + 28 + 42 + 52 + 59 - 50,
        width: 531,
        height: 19,
        visible: true
    };

    //灰色肽链2
    static grayPetideChain2Img = {
        id: 'grayPetide2Chain',
        x: 51 + 17,
        y: 125 + 77 + 28 + 28 + 42 + 52 + 103 - 50,
        width: 531,
        height: 19,
        visible: true
    };

    //灰色肽链3
    static grayPetideChain3Img = {
        id: 'grayPetide3Chain',
        x: 51 + 17,
        y: 125 + 77 + 28 + 28 + 42 + 52 + 144 - 50,
        width: 531,
        height: 19,
        visible: true
    };


    //肽链
    static petideChainImg = {
        id: 'petideChain',
        x: 51 + 17,
        y: 125 + 77 + 28 + 28 + 42 + 52 + 11 - 50,
        width: 598,
        height: 30,
        visible: false
    };

    //肽链1
    static petideChain1Img = {
        id: 'petide1Chain',
        x: 51 + 17,
        y: 125 + 77 + 28 + 28 + 42 + 52 + 55 - 50,
        width: 531,
        height: 30,
        visible: false
    };

    //肽链2
    static petideChain2Img = {
        id: 'petide2Chain',
        x: 51 + 17,
        y: 125 + 77 + 28 + 28 + 42 + 52 + 99 - 50,
        width: 531,
        height: 30,
        visible: false
    };

    //肽链3
    static petideChain3Img = {
        id: 'petide3Chain',
        x: 51 + 17,
        y: 125 + 77 + 28 + 28 + 42 + 52 + 140 - 50,
        width: 531,
        height: 30,
        visible: false
    };

    //箭头1
    static redArrow1Img = {
        id: 'redArrow1',
        x: 51 + 17 + 45,
        y: 125 + 45,
        width: 14,
        height: 13,
        visible: false
    };

    //箭头2
    static redArrow2Img = {
        id: 'redArrow2',
        x: 51 + 17 + 60,
        y: 125 + 77 + 28 + 28 + 42 + 52 + 11 - 42,
        width: 14,
        height: 13,
        visible: false
    };

    //箭头3
    static redArrow3Img = {
        id: 'redArrow3',
        x: 51 + 17 + 60,
        y: 125 + 77 + 28 + 28 + 42 + 52 + 55 - 42,
        width: 14,
        height: 13,
        visible: false
    };

    //箭头4
    static redArrow4Img = {
        id: 'redArrow4',
        x: 51 + 17 + 60,
        y: 125 + 77 + 28 + 28 + 42 + 52 + 99 - 42,
        width: 14,
        height: 13,
        visible: false
    };

    //箭头5
    static redArrow5Img = {
        id: 'redArrow5',
        x: 51 + 17 + 60,
        y: 125 + 77 + 28 + 28 + 42 + 52 + 140 - 42,
        width: 14,
        height: 13,
        visible: false
    };
}
