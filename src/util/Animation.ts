export class Animation {

    private now  = 0;
    private then = 0;
    private isCancle = false;

    fpsInterval = 60;


    callback: Function;

    constructor(callback: Function, fpsInterval?: number) {

        this.fpsInterval = fpsInterval ? fpsInterval : this.fpsInterval;
        this.callback = callback;
    }


    run() {
        // console.info('abc' , this);
        // request another frame
        if ( this.isCancle) {
            this.isCancle = false;
            return;
        }

        requestAnimationFrame(() => {
            this.run();
        });

        // calc elapsed time since last loop

        this.now = Date.now();
        const elapsed = this.now - this.then;


        // if enough time has elapsed, draw the next frame

        if (elapsed > this.fpsInterval) {
            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            this.then = this.now - (elapsed % this.fpsInterval);

            // Put your drawing code here
            this.callback();

        }
    }

    cancle() {
        this.isCancle = true;
    }
}
