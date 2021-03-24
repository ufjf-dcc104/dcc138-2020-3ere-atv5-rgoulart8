export default class Game {

    constructor(canvas, assets, input){
        this.canvas = canvas;
        this.assets = assets;
        this.input = input;
        this.cenas = new Map();
        this.cena = null;
        this.game = null;
    }

    adicionarCena(chave, cena){
        cena.game = this;
        this.cenas.set(chave, cena);
        cena.canvas = this.canvas;
        cena.assets = this.assets;
        cena.input = this.input;
        if(this.cena === null){
            this.cena = cena;
        }

    }

    selecionaCena(chave){
        if(this.cenas.has(chave)){
            this.cena.parar();
            this.cena = this.cenas.get(chave);
            this.cena.iniciar();
        }
    }

    iniciar(){
        this.cena?.iniciar();
    }

    parar(){
        this.cena?.parar();
    }
}