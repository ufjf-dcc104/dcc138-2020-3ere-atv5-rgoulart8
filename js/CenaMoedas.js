import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa2.js";

export default class CenaMoedas extends Cena{

    quandoColidir (a, b){
        let contador = 0;
       this.assets.playColidiu("coin");
        if (a.tags.has("pc") && b.tags.has("moeda")){
            contador ++;
            if(!this.aRemover.includes(b)){
                this.aRemover.push(b);
            }
        }
        if (a.tags.has("pc") && b.tags.has("muda")){
                this.rodando = false;
                this.game.selecionaCena("jogo");
        }
       
    }

    preparar(){
        super.preparar();
        const mapa2 = new Mapa(20, 25, 32);
        mapa2.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa2);

        const pc = new Sprite({x: 50, y: 120});
        pc.tags.add("pc");
        const cena = this;
        pc.controlar = function(dt){
         if(cena.input.comandos.get("MOVE_ESQUERDA")){
        this.vx = -50;
    }
         else if(cena.input.comandos.get("MOVE_DIREITA")){
        this.vx = +50;
    }
          else{
        this.vx = 0;
    }
          if(cena.input.comandos.get("MOVE_CIMA")){
        this.vy = -50;
    }
          else if(cena.input.comandos.get("MOVE_BAIXO")){
        this.vy = +50;
    }
          else{
        this.vy = 0;
    }
}
        this.adicionar(pc);

        function perseguePC(dt){
         this.vx = 25*Math.sign(pc.x - this.x);
         this.vy = 25*Math.sign(pc.y - this.y);

}
        const en1 = new Sprite({x:360, color:"red", controlar: perseguePC, tags:["muda"]});
        en1.controlar = perseguePC;
    
        this.adicionar(en1);
        this.adicionar(new Sprite({x: 115, y: 70, color: "yellow", tags:["moeda"]}));
        this.adicionar(new Sprite({x: 650, y: 70, color: "yellow", tags:["moeda"]}));
        this.adicionar(new Sprite({x: 150, y: 180, color: "yellow", tags:["moeda"]}));
        this.adicionar(new Sprite({x: 315, y: 299, color: "yellow", tags:["moeda"]}));


        this.quandoCriar = function(){
            let nmy = Math.floor(Math.random()*(this.mapa.tiles.length-2))+1;
            let nmx = Math.floor(Math.random()*(this.mapa.tiles[0].length-2))+1;
        
        while(this.mapa.tiles[nmy][nmx] != 0){
            nmy = Math.floor(Math.random()*(this.mapa.tiles.length-2))+1;
            nmx = Math.floor(Math.random()*(this.mapa.tiles[0].length-2))+1;
        }
            this.adicionar(new Sprite({x: nmx*this.mapa.SIZE+this.mapa.SIZE/2, 
                y: nmy*this.mapa.SIZE+this.mapa.SIZE/2, color: "yellow", tags:["moeda"]}));
                        
            }
    }

}