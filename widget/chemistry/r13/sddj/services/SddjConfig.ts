/**
 *canvas元素基本配置类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/6/7 10:23
 */

//烧杯前面
export class FrontConstant  {
   static width =  222;
   static height =  258;
   static  y = 130;
   static x = 0;
}

//烧杯后面
export class BackConstant  {
    static width =  222;
    static height =  93;
    static  y = 120;
}

/**
 * 滴管
 */

export class DropperConfig {
    static width =  20;
    static height =  92;
    static y = 5    ;
    static x = 0;
    static visible = false;
    static listening = false;
    static id = 'dropper';
}

/**
 * 水滴
 */

export class WaterDropperConfig {
    static width =  12;
    static height =  21;
    static y = 102   ;
    static x = 0;
    static visible = false;
    static listening = false;
    static id = 'watterDropper';
}

/**
 * 电流计
 */
export class GalvanometerConfig {
    static width =  121;
    static height =  321;
    static y = 40    ;
    static x = 0;
    static visible = false;
    static listening = false;
    static id = 'galvanometer';
}

/**
 * 指针背景
 */
export class NeedlesBgConfig {
    static width =  62;
    static height =  62;
    static y = 15    ;
    static x = 0;
    static visible = false;
    static listening = false;
    static id = 'needlesBg';
}


/**
 * 指针
 */
export class NeedlesConfig {
    static width =  6;
    static height =  26;
    static y = 45    ;
    static x = 0;
    static visible = false;
    static listening = false;
    static id = 'needles';
    static offset = {
        x: 3,
        y: 26
    };
}


/**
 * H ,CL ,O 的图片大小
 */
export class HConfig {
    static width =  14;
    static height =  14;
    static y = 0    ;
    static x = 0;
}
export class CLConfig {
    static width =  23;
    static height =  23;
    static opacity = 0;
    static y = 0;
    static x = 115;
    static to = {
        y : 5,
        x : 115
    };

}

export class OConfig {
    static width =  20;
    static height =  20;
    static y = 0    ;
    static x = 0;
}


/**
 * 十三个水分子的坐标信息
 */
export class MoleculePosition {

    static a = {

        hBottom : {
            name: 'ahb',
            x : 65,
            y : 52
        },

        hTop : {
            name: 'aht',
            x : 51,
            y : 52,

        },
        o : {
            name: 'ao',
            x : 55,
            y : 42
        }

    };

    static b = {
        hBottom : {
            name: 'bhb',
            x : 125,
            y : 45
        },

        hTop : {
            name: 'bht',
            x : 140,
            y : 45
        },
        o : {
            name: 'bo',
            x : 129,
            y : 36
        }


    };
    static c = {
        hBottom : {
            name: 'chb',
            x : 100,
            y : 125
        },

        hTop : {
            name: 'cht',
            x : 105,
            y : 135
        },
        o : {
            name: 'co',
            x : 105,
            y : 125
        }
    };
    static d = {
        hBottom : {
            name: 'dhb',
            x : 175,
            y : 126
        },

        hTop : {
            name: 'dht',
            x : 165,
            y : 120
        },
        o : {
            name: 'do',
            x : 170,
            y : 115
        }
    };
    static e = {
        hBottom : {
            name: 'ehb',
            x : 98,
            y : 18
        },

        hTop : {
            name: 'eht',
            x : 82,
            y : 15
        },
        o : {
            name: 'eo',
            x : 86,
            y : 21
        },
        h3 : {
            x : 98,
            y : 34
        }

    };
    static f = {
        hBottom : {
            name: 'fhb',
            x : 175,
            y : 60
        },

        hTop : {
            name: 'fht',
            x : 163,
            y : 55
        },
        o : {
            name: 'fo',
            x : 163,
            y : 60
        },
        h3 : {
            x : 170,
            y : 71
        }
    };

    static g = {
        hBottom : {
            name: 'ghb',
            x : 102,
            y : 92
        },

        hTop : {
            name: 'ght',
            x : 90,
            y : 82
        },
        o : {
            name: 'go',
            x : 88,
            y : 90
        },
        h3 : {
            x : 80,
            y : 95
        }
    };

    static h = {
        hBottom : {
            name: 'hhb',
            x : 135,
            y : 105
        },

        hTop : {
            name: 'hht',
            x : 123,
            y : 100
        },
        o : {
            name: 'ho',
            x : 123,
            y : 105
        },
        h3 : {
            x : 130,
            y : 115
        }
    };

    static i = {
        hBottom : {
            name: 'ihb',
            x : 17,
            y : 70
        },

        hTop : {
            name: 'iht',
            x : 33,
            y : 73
        },
        o : {
            name: 'io',
            x : 23,
            y : 60
        }
    };

    static j = {
        hBottom : {
            name: 'jhb',
            x : 10,
            y : 110
        },

        hTop : {
            name: 'jht',
            x : 22,
            y : 104
        },
        o : {
            name: 'jo',
            x : 16,
            y : 110
        }
    };

    static k = {
        hBottom : {
            name: 'khb',
            x : 24,
            y : 8
        },

        hTop : {
            name: 'kht',
            x : 10,
            y : 14
        },
        o : {
            name: 'ko',
            x : 17,
            y : 15
        },
        h3 : {
            x : 22,
            y : 25
        }
    };

    static l = {
        hBottom : {
            name: 'lhb',
            x : 60,
            y : 120
        },

        hTop : {
            name: 'lht',
            x : 68,
            y : 115
        },
        o : {
            name: 'lo',
            x : 65,
            y : 118
        },
        h3 : {
            x : 70,
            y : 130
        }
    };

    static m = {
        hBottom : {
            name: 'mhb',
            x : 182,
            y : 12
        },

        hTop : {
            name: 'mht',
            x : 173,
            y : 5
        },
        o : {
            name: 'mo',
            x : 170,
            y : 10
        }
    };

    static temp = {
        hBottom : {
            name: 'tmphb',
            x : 185,
            y : 88
        },

        hTop : {
            name: 'tmpht',
            x : 185,
            y : 100
        },
        o : {
            name: 'tmpo',
            x : 176,
            y : 90
        }
    };

    static cl2 = {
        x: 85,
        y: 50
    };

    static cl3 = {
        x: 120,
        y: 68
    };


    static clH1 = {
        from : {
            x: 60,
            y: 0
        },
        to: {
            x: 60,
            y: 35
        }
    };

    static clH2 = {
        from : {
            x: 140,
            y: 0
        },
        to: {
            x: 140,
            y: 30
        }
    };

    static clH3 = {
        from : {
            x: 173,
            y: 0
        },
        to: {
            x : 173,
            y : 22
        }
    };

}

export class TipsConfig {
  static tipsPosition = {
    x : 20,
    y : 30
  };
  static  tipsSize = 20;
}
