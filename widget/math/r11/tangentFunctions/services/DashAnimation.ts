export class DashAnimation {
    private ctx: any;
    private animation: any;
    control: boolean = false;

    //隐藏渐进线
    hideDash() {
        const canvas = (document.getElementById('canvas') as HTMLCanvasElement);
        canvas.style.display = 'none';
        canvas.style.zIndex = '-1';
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    //显示渐进线
    showCanvas() {
        const canvas = (document.getElementById('canvas') as HTMLCanvasElement);
        canvas.style.display = 'block';
        canvas.style.zIndex = '0';
    }


    //渐进线动画
    dashActive(length: any) {
        const canvas   = (document.getElementById('canvas') as HTMLCanvasElement);
        this.ctx      = canvas.getContext('2d');
        let beginY   = 0;
        let startX = 10;
        this.animation = setInterval(() => {
            if (this.control) {
                this.ctx.clearRect(0, 0, canvas.width, canvas.height);
                clearInterval(this.animation);
            }
            if (beginY < canvas.height ) {
                let startX = 25;
                beginY += 5;
                this.ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.ctx.lineWidth = 2;
                this.ctx.setLineDash([4, 2]);
                this.ctx.strokeStyle = '#000000';
                for (let index = 0; index < length; index++) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(startX, 0);
                    this.ctx.lineTo(startX, beginY);
                    this.ctx.stroke();
                    startX += 50;
                }
            } else {
              clearInterval(this.animation);
            }
        }, 15);
    }

 /*   clear() {
        clearInterval(this.animation);
        const canvas  = (document.getElementById('canvas') as HTMLCanvasElement);
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, 1000, 1000);
    }*/
}