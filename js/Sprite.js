export default class Sprite{
    /* 
        É responsável por modelar algo que
        se move na tela 
    */ 
    constructor({x=100, y=100, w=20, h=20,
        collor = "white", vx=0, vy=0}={}){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.w = w;
        this.h = h;
        this.collor = collor;
        this.cena = null;
        this.mx = 0;
        this.my = 0;
    }

    desenhar(ctx)
        {
            ctx.fillStyle = this.collor;
            ctx.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
            ctx.strokeStyle = "blue";
            ctx.strokeRect (
                this.mx * this.cena.mapa.SIZE,
                this.my * this.cena.mapa.SIZE,
                this.cena.mapa.SIZE,
                this.cena.mapa.SIZE,
                )
                 
    }

    passo(dt){
        this.x = this.x + this.vx*dt
        this.y = this.y + this.vy*dt
        this.mx = Math.floor(this.x/this.cena.mapa.SIZE);
        this.my = Math.floor(this.y/this.cena.mapa.SIZE);
        this.aplicaRestricoes(dt);
    }

    colidiuCom(outro){
        return !(
            this.x - this.w/2 > outro.x + outro.w/2 ||
            this.x + this.w/2 < outro.x - outro.w/2 ||
            this.y - this.h/2 > outro.y + outro.h/2 ||
            this.y + this.h/2 < outro.y - outro.h/2
        );

    }

    aplicaRestricoes(dt){
        const SIZE = this.cena.mapa.SIZE;
        if(this.vx > 0){
           const pmx = this.mx+1;
           const pmy = this.my;
           if (this.cena.mapa.tiles[pmy][pmx]!=0){
               const tile = {x: pmx*SIZE+SIZE/2,
                             y:pmy*SIZE+SIZE/2,
                             w: SIZE,
                             h: SIZE
                            };
            if (this.colidiuCom(tile)){
                this.vx = 0;
                this.x = tile.x-tile.w/2-this.w/2 -1;
            }
           }
        }
    }
}
    