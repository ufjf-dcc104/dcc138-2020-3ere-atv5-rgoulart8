import Cena from "./Cena.js";

export default class CenaFim extends Cena {
  desenhar() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = "50px Impact";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `GAME OVER - Pontuação: ${this.game.moedas}`,
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.ctx.fillStyle = "yellow";
    
      this.ctx.fillText(
        "Aperte ESPAÇO para jogar novamente",
        this.canvas.width / 2,
        this.canvas.height / 2 + 60
      );
    
  }

  quadro(t) {
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0) / 1000;

    if (this.assets.acabou()) {
      if (this.input.comandos.get("PROXIMA_CENA")) {
        this.game.selecionaCena("jogo");
        return;
      }
    }

    this.desenhar();
    this.iniciar();
    this.t0 = t;
  }
}