export class MyConfig {

  whiteRect = {
    left: 230,
    top:  136,
    width: 367,
    height: 377,
    fill: '#ffffff',
    selectable: false,
    hoverCursor: 'default',
  };

  greenRect = {
    left: 230 + 367,
    top:  136,
    width: 367,
    height: 377,
    fill: '#A2D6CA',
    selectable: false,
    hoverCursor: 'default',
  };

  leftBlueRect = {
    left: 230,
    top:  136,
    width: 6,
    height: 377,
    originX: 'center',
    fill: '#2ba7d3',
    selectable: false,
    hoverCursor: 'default',
  };

  rightBlueRect = {
    left: 230 + 367 + 367,
    top:  136,
    width: 6,
    height: 377,
    fill: '#2ba7d3',
    originX: 'center',
    selectable: false,
    hoverCursor: 'default',
  };

  yellowRect = {
    left: 230,
    top:  136 + 377,
    width: 367,
    height: 6,
    fill: '#FFD619',
    selectable: false,
    hoverCursor: 'default',
    originY: 'center',
  };

  violetRect = {
    left: 230 + 367,
    top:  136 + 377,
    width: 367,
    height: 6,
    fill: '#B7BCFB',
    selectable: false,
    hoverCursor: 'default',
    originY: 'center',
  };

  sliderButton = {
    width: 88,
    height: 88,
    scaleX: 0.5,
    scaleY: 0.5,
    originX: 'center',
    originY: 'center',
    hasControls: false,
    hasBorders: false,
    hoverCursor: 'pointer',
  };

  sliderButtonLT = [
    {
      left: 230,
      top: 136,
    },
    {
      left: 230,
      top: 136 + 377,
    },
    {
      left: 230 + 367 + 367,
      top: 136 + 377,
    },
  ];

  rectNumberText = [
    {
      left: 230 - 12 - 10,
      top: 136 + 377 * 0.5,
      fontSize: 24,
      fill: '#2BA7D3',
      originX: 'center',
      originY: 'center',
      selectable: false,
      hoverCursor: 'default',
    },

    {
      left: 230 + 367 + 367 + 12 + 10,
      top: 136 + 377 * 0.5,
      fontSize: 24,
      fill: '#2BA7D3',
      originX: 'center',
      originY: 'center',
      selectable: false,
      hoverCursor: 'default',
    },

    {
      left: 230 + 367 * 0.5,
      top: 136 + 377 + 22,
      fontSize: 24,
      fill: '#FFD619',
      originX: 'center',
      originY: 'center',
      selectable: false,
      hoverCursor: 'default',
    },

    {
      left: 230 + 367 + 367 * 0.5,
      top: 136 + 377 + 22,
      fontSize: 24,
      fill: '#B7BCFB',
      originX: 'center',
      originY: 'center',
      selectable: false,
      hoverCursor: 'default',
    }
  ];

  formulaText = {
    left: 368,
    top: 555,
    selectable: false,
    hoverCursor: 'default',
  };

  text = [
    {
      text: window.env.browserInfo.lang.tipsText + '=(',
      color: '#ffffff',
      originX: 'center'
    },
    {
      text: '10',
      color: '#FFD619',
      originX: 'center'
    },
    {
      text: '+',
      color: '#ffffff',
      originX: 'center'
    },
    {
      text: '10',
      color: '#B7BCFB',
      originX: 'center'
    },
    {
      text: ')×',
      color: '#ffffff',
      originX: 'center'
    },
    {
      text: '10',
      color: '#2BA7D3',
      originX: 'center'
    },
    {
      text: '=',
      color: '#ffffff',
      originX: 'center'
    },
    {
      text: '10',
      color: '#FFD619',
      originX: 'center'
    },
    {
      text: '×',
      color: '#ffffff',
      originX: 'center'
    },
    {
      text: '10',
      color: '#2BA7D3',
      originX: 'center'
    },
    {
      text: '+',
      color: '#ffffff',
      originX: 'center'
    },
    {
      text: '10',
      color: '#B7BCFB',
      originX: 'center'
    },
    {
      text: '×',
      color: '#ffffff',
      originX: 'center'
    },
    {
      text: '10',
      color: '#2BA7D3',
      originX: 'center'
    },
  ];
}







