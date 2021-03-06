export default class Mapa {
    constructor(linhas = 20, colunas = 25, tamanho = 32, assets){
        this.LINHAS = linhas;
        this.COLUNAS = colunas;
        this.SIZE = tamanho;
        this.tiles = [];
        for (let l = 0; l < this.LINHAS; l++) {
            this.tiles[l] = [];
            for (let c = 0; c < this.COLUNAS; c++) {
                this.tiles[l][c] = 0;            
            }       
        }
        this.cena = null;
        this.assets = null;
    }

    desenhar(ctx){
        for (let l = 0; l < this.LINHAS; l++) {
            for (let c = 0; c < this.COLUNAS; c++) {
               switch (this.tiles[l][c]) {
                    case 1:
                        ctx.fillStyle = "grey";
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = "black";
                        ctx.fillRect(c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE); 
                        ctx.drawImage(this.cena.assets.img("tijolo"), c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE); 
                        //ctx.strokeRect(c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE);
                        break;
                    case 2:
                        ctx.fillStyle = "lightgreen";
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = "black";
                        ctx.fillRect(c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE); 
                        ctx.drawImage(this.cena.assets.img("agua"), c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE); 
                        //ctx.strokeRect(c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE); 
                        break;
                        default: 
                        //this.asset.desenhaImg("grama");
                        ctx.fillStyle = "white";
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = "black";
                        ctx.fillRect(c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE); 
                        ctx.drawImage(this.cena.assets.img("grama"), c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE); 
                        //ctx.strokeRect(c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE); 
                        
                }       
                  
                
            }       
        }
    }

    carregaMapa(modelo) {
        this.linhas = modelo.length;
        this.colunas = modelo[0]?.length ?? 0;
        this.tiles = [];
        for (let l = 0; l < this.LINHAS; l++) {
            this.tiles[l] = [];
            for (let c = 0; c < this.COLUNAS; c++) {
                this.tiles[l][c] = modelo[l][c];            
            }       
        }
    }
}