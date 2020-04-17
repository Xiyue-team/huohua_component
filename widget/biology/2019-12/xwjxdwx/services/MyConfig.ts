export class MyConfig {

  microscope = {
    left: 56,
    top: 102 + 38,
    width: 1844,
    height: 552,
    scaleX: 0.5,
    scaleY: 0.5,
    selectable: false,
    hoverCursor: 'default'
  };

  slideGlass = [
    {
      left: 384 + 103 * 0.5,
      top: 485 + 34 * 0.5,
      width: 606,
      height: 210,
      scaleX: 103 / 606,
      scaleY: 103 / 606,
      originX: 'center',
      originY: 'center',
      hasControls: false,
      hoverCursor: 'pointer',
      hasBorders: false,
      selectable: false,
    },
    {
      left: 511 + 103 * 0.5,
      top: 485 + 34 * 0.5,
      width: 606,
      height: 210,
      scaleX: 103 / 606,
      scaleY: 103 / 606,
      originX: 'center',
      originY: 'center',
      hasControls: false,
      hasBorders: false,
      hoverCursor: 'pointer',
      selectable: false
    },
    {
      left: 638 + 103 * 0.5,
      top: 485 + 34 * 0.5,
      width: 606,
      height: 210,
      scaleX: 103 / 606,
      scaleY: 103 / 606,
      originX: 'center',
      originY: 'center',
      hasControls: false,
      hasBorders: false,
      hoverCursor: 'pointer',
      selectable: false
    },
  ];

  slideGlassMask = [
    {
      left: 384 + 103 * 0.5,
      top: 485 + 34 * 0.5,
      width: 606,
      height: 210,
      scaleX: 103 / 606,
      scaleY: 103 / 606,
      originX: 'center',
      originY: 'center',
      hasControls: false,
      hasBorders: false,
      selectable: false,
      hoverCursor: 'pointer',
      visible: false
    },
    {
      left: 511 + 103 * 0.5,
      top: 485 + 34 * 0.5,
      width: 606,
      height: 210,
      scaleX: 103 / 606,
      scaleY: 103 / 606,
      originX: 'center',
      originY: 'center',
      hasControls: false,
      hasBorders: false,
      selectable: false,
      hoverCursor: 'pointer',
      visible: false
    },
    {
      left: 638 + 103 * 0.5,
      top: 485 + 34 * 0.5,
      width: 606,
      height: 210,
      scaleX: 103 / 606,
      scaleY: 103 / 606,
      originX: 'center',
      originY: 'center',
      hasControls: false,
      hasBorders: false,
      selectable: false,
      hoverCursor: 'pointer',
      visible: false
    },
  ];

  slideGlassMaskEnd = [
    {
      left: 535,
      top: 316,
      scale: 309 / 606 * 0.8,
    },
    {
      left: 513,
      top: 271,
      scale: 309 / 606 * 0.8,
    },
    {
      left: 596,
      top: 310,
      scale: 309 / 606 * 0.8,
    },
  ];

  objectiveTable = {
    left: 330 - 1,
    top: this.microscope.top + 552 * 0.5 * 0.5 - 18,
    width: 956,
    height: 636,
    scaleX: 0.5,
    scaleY: 0.5,
    originY: 'center',
    selectable: false,
    hoverCursor: 'default',
  };

  objectiveLenseMask = {
    left: this.microscope.left + 219 * 0.5,
    top: this.microscope.top + 552 * 0.5 * 0.5,
    width: 654,
    height: 654,
    scaleX: 0.5,
    scaleY: 0.5,
    originX: 'center',
    originY: 'center',
    selectable: false,
    hoverCursor: 'default',
  };

  projection2Image = {
    left: this.objectiveLenseMask.left - 10.8,
    top: this.microscope.top + 552 * 0.5 * 0.5 - 1,
    width: 350,
    height: 444,
    scaleX: 0.5,
    scaleY: 0.5,
    originY: 'center',
    angle: -0.35,
    selectable: false,
    hoverCursor: 'default',
  };

  phase = {
      left: this.objectiveLenseMask.left,
      top: this.objectiveLenseMask.top,
      width: 176,
      height: 176,
      scaleX: 309 / 606 * 0.8 * 1.7,
      scaleY: 309 / 606 * 0.8 * 1.7,
      originX: 'center',
      originY: 'center',
      hasControls: false,
      hasBorders: false,
      selectable: false,
      hoverCursor: 'default',
      visible: false
    };

  text = {
    fontSize: 18,
    fill: '#ffffff',
    originX: 'center',
    hoverCursor: 'default',
    selectable: false
  };
}







