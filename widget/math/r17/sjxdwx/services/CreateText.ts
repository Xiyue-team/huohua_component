import * as THREE from 'three';
export default class CreateText {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
    }
    drawText(text: string, ctxOptions ? : any) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let xishu = 20;
        let x = 45;
        const textArr = text.split('');
        this.canvas.width = textArr.length*45;
        this.canvas.height = 80;
        this.ctx.fillStyle = 'rgb(0, 0, 0)';
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'top';
        let pat = /[A-z]/;
        let pat1 = /\d/;
        textArr.forEach((str, index) => {
            if (pat.test(str)) {
                this.ctx.font = `italic 60px "Times New Roman"`;
                this.ctx.fillText(str, x * index, 0);
            } else if (pat1.test(str)) {
                this.ctx.font = `40px "Times New Roman"`;
                this.ctx.fillText(str, x * index, 40);

            } else {
                this.ctx.font = `60px "Times New Roman"`;
                this.ctx.fillText(str, x * index, 0);

            }
        })
        let texture = new THREE.Texture(this.canvas);
        texture.magFilter = THREE.NearestFilter
        texture.minFilter = THREE.LinearMipMapLinearFilter
        texture.needsUpdate = true;
        this.sprite = new THREE.Sprite(new THREE.SpriteMaterial({
            map: texture,
        }))
        // mesh.scale.set(100,100,100);
        this.sprite.scale.set(this.canvas.width/10, this.canvas.height/10, 1)

        // this.sprite.position.x = ((this.canvas.width / 2) - (this.canvas.textWidth / 2)) + ((this.canvas.textWidth / 2) * this.align.x)
        // this.sprite.position.y = (-this.canvas.height / 2) + ((this.canvas.textHeight / 2) * this.align.y)
        return this.sprite;
    }
}