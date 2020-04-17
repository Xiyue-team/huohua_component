import { fabric } from 'fabric';

export const createSpriteClass = () => {

    fabric.Sprite = fabric.util.createClass(fabric.Image, {

        type: 'sprite',
        spriteWidth: 120 * 2,
        spriteHeight: 122 * 2,
        spriteIndex: 0,
        frame: 20,
        isPlay : false,

        initialize: function (element: any, options: any) {
            // options || (options = {});

            options.width = this.spriteWidth;
            options.height = this.spriteHeight;

            this.callSuper('initialize', element, options);

            this.createTmpCanvas();
            this.createSpriteImages();
        },

        createTmpCanvas: function () {
            this.tmpCanvasEl = fabric.util.createCanvasElement();
            this.tmpCanvasEl.width = this.spriteWidth || this.width;
            this.tmpCanvasEl.height = this.spriteHeight || this.height;
        },

        createSpriteImages: function () {
            this.spriteImages = [];

            const steps = this._element.width / this.spriteWidth;
            for (let i = 0; i < steps; i++) {
                this.createSpriteImage(i);
            }
        },

        createSpriteImage: function (i) {
            const tmpCtx = this.tmpCanvasEl.getContext('2d');
            tmpCtx.clearRect(0, 0, this.tmpCanvasEl.width, this.tmpCanvasEl.height);
            tmpCtx.drawImage(this._element, -i * this.spriteWidth, 0);

            const dataURL = this.tmpCanvasEl.toDataURL('image/png');
            const tmpImg = fabric.util.createImage();

            tmpImg.src = dataURL;

            this.spriteImages.push(tmpImg);
        },

        _render: function (ctx) {
            ctx.drawImage(
              this.spriteImages[this.spriteIndex],
              -this.width / 2,
              -this.height / 2
            );
        },

        play: function () {

            this.isPlay = true;
            this.playImage();

        },

        stop: function () {
            this.isPlay = false;
        },
        playImage() {

            let now;
            let then = Date.now();
            // const interval = 1000 / this.frame;
            let delta;


            const animate = () => {
                if (this.isPlay) {
                    fabric.util.requestAnimFrame(animate);
                }

                now = Date.now();
                delta = now - then;
                const interval = 1000 / this.frame;

                if (delta > interval) {
                    then = now - (delta % interval);

                    //this.onPlay && this.onPlay();
                    this.dirty = true;
                    this.spriteIndex++;
                    if (this.spriteIndex === this.spriteImages.length) {
                        this.spriteIndex = 0;
                    }
                }
            };
            animate();
        },

        changeFrame: function(index: number) {
            this.frame = index;
            return this.frame;
        }
    });

    fabric.Sprite.async = true;
}
