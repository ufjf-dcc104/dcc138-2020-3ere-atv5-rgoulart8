export default class Sprite {
  /* 
        É responsável por modelar algo que
        se move na tela 
    */
  constructor({
    x = 100,
    y = 100,
    w = 32,
    h = 32,
    color = "black",
    vx = 0,
    vy = 0,
    controlar = () => {},
    tags = [],
  } = {}) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.w = w;
    this.h = h;
    this.color = color;
    this.cena = null;
    this.assets = null;
    this.mx = 0;
    this.my = 0;
    this.controlar = controlar;
    this.tags = new Set();
    tags.forEach((tag) => {
      this.tags.add(tag);
    });
  }

  desenhar(ctx) {
    if (this.tags.has("moeda")) {
      ctx.drawImage(
        this.cena.assets.img("moeda"),
        this.x - this.w / 2,
        this.y - this.h / 2,
        this.w,
        this.h
      );
    }
    if (this.tags.has("enemy")) {
      if (this.vx <= 0) {
        ctx.drawImage(
          this.cena.assets.img("enemy"),
          this.x - this.w / 2,
          this.y - this.h / 2,
          this.w,
          this.h
        );
      }
      if (this.vx > 0) {
        ctx.drawImage(
          this.cena.assets.img("enemy2"),
          this.x - this.w / 2,
          this.y - this.h / 2,
          this.w,
          this.h
        );
      }
    }
    if (this.tags.has("muda")) {
        if (this.vx >= 0) {
            ctx.drawImage(
              this.cena.assets.img("arrow"),
              this.x - this.w / 2,
              this.y - this.h / 2,
              this.w,
              this.h
            );
          }
          if (this.vx < 0) {
            ctx.drawImage(
              this.cena.assets.img("arrow2"),
              this.x - this.w / 2,
              this.y - this.h / 2,
              this.w,
              this.h
            );
          }
    }

    if (this.tags.has("pc")) {
        
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
      /* if (this.vx > 0) {
        ctx.drawImage(
          this.cena.assets.img("arrow"),
          this.x - this.w / 2,
          this.y - this.h / 2,
          this.w,
          this.h
        );
      }
      if (this.vx <= 0) {
        ctx.drawImage(
          this.cena.assets.img("arrow2"),
          this.x - this.w / 2,
          this.y - this.h / 2,
          this.w,
          this.h
        );
      }
      */
    }
  }

  controlar(dt) {}

  mover(dt) {
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
    this.mx = Math.floor(this.x / this.cena.mapa.SIZE);
    this.my = Math.floor(this.y / this.cena.mapa.SIZE);
  }

  passo(dt) {
    this.controlar(dt);
    this.mover(dt);
    this.aplicaRestricoes(dt);
  }

  colidiuCom(outro) {
    return !(
      this.x - this.w / 2 > outro.x + outro.w / 2 ||
      this.x + this.w / 2 < outro.x - outro.w / 2 ||
      this.y - this.h / 2 > outro.y + outro.h / 2 ||
      this.y + this.h / 2 < outro.y - outro.h / 2
    );
  }

  aplicaRestricoes(dt) {
    this.aplicaRestricoesDireita(this.mx + 1, this.my - 1);
    this.aplicaRestricoesDireita(this.mx + 1, this.my);
    this.aplicaRestricoesDireita(this.mx + 1, this.my + 1);
    this.aplicaRestricoesEsquerda(this.mx - 1, this.my - 1);
    this.aplicaRestricoesEsquerda(this.mx - 1, this.my);
    this.aplicaRestricoesEsquerda(this.mx - 1, this.my + 1);
    this.aplicaRestricoesBaixo(this.mx - 1, this.my + 1);
    this.aplicaRestricoesBaixo(this.mx, this.my + 1);
    this.aplicaRestricoesBaixo(this.mx + 1, this.my + 1);
    this.aplicaRestricoesCima(this.mx - 1, this.my + 1);
    this.aplicaRestricoesCima(this.mx, this.my + 1);
    this.aplicaRestricoesCima(this.mx + 1, this.my + 1);
  }

  aplicaRestricoesDireita(pmx, pmy) {
    const SIZE = this.cena.mapa.SIZE;
    if (this.vx > 0) {
      const pmx = this.mx + 1;
      const pmy = this.my;
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE,
        };
        if (this.colidiuCom(tile)) {
          this.vx = 0;
          this.x = tile.x - tile.w / 2 - this.w / 2 - 1;
        }
      }
    }
  }

  aplicaRestricoesEsquerda(pmx, pmy) {
    const SIZE = this.cena.mapa.SIZE;
    if (this.vx < 0) {
      const pmx = this.mx - 1;
      const pmy = this.my;
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE,
        };
        if (this.colidiuCom(tile)) {
          this.vx = 0;
          this.x = tile.x + tile.w / 2 + this.w / 2 + 1;
        }
      }
    }
  }

  aplicaRestricoesBaixo(pmx, pmy) {
    const SIZE = this.cena.mapa.SIZE;
    if (this.vy > 0) {
      const pmx = this.mx;
      const pmy = this.my + 1;
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE,
        };
        if (this.colidiuCom(tile)) {
          this.vy = 0;
          this.y = tile.y - tile.h / 2 - this.h / 2 - 1;
        }
      }
    }
  }

  aplicaRestricoesCima(pmx, pmy) {
    const SIZE = this.cena.mapa.SIZE;
    if (this.vy < 0) {
      const pmx = this.mx;
      const pmy = this.my - 1;
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE,
        };
        if (this.colidiuCom(tile)) {
          this.vy = 0;
          this.y = tile.y + tile.h / 2 + this.h / 2 + 1;
        }
      }
    }
  }
}
