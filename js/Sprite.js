export default class Sprite{
    constructor({x=100, y=100, w=20, h=20,
        collor = "white"}={}){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.collor = collor;
    }
    desenhar(ctx)
        {
            ctx.fillStyle = this.collor;
            ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}
    