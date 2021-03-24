import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import CenaJogo from "./CenaJogo.js";
import CenaCarregando from "./CenaCarregando.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem ("garota", "assets/girl.png");
assets.carregaImagem ("esqueleto", "assets/skelly.png");
assets.carregaImagem ("orc", "assets/orc.png");
assets.carregaImagem ("grama", "assets/grama.png");
assets.carregaImagem ("tijolo", "assets/brick.png");
assets.carregaImagem ("agua", "assets/water.png");
assets.carregaAudio ("moeda", "assets/coin.wav");
assets.carregaAudio ("explosao", "assets/boom.wav");

const canvas = document.querySelector("canvas");
canvas.width = 25*32;
canvas.height = 20*32;

input.configurarTeclado({
    "ArrowLeft": "MOVE_ESQUERDA",
    "ArrowRight": "MOVE_DIREITA",
    "ArrowUp": "MOVE_CIMA",
    "ArrowDown": "MOVE_BAIXO",
    " ": "PROXIMA_CENA",
    });

const game = new Game(canvas, assets, input);

const cena0 = new CenaCarregando(canvas, assets);
const cena1 = new CenaJogo(canvas, assets);
game.adicionarCena("carregando", cena0);
game.adicionarCena("jogo", cena1);

const mapa1 = new Mapa(20, 25, 32, assets);
mapa1.carregaMapa(modeloMapa1)
cena1.configuraMapa(mapa1);

const pc = new Sprite({x: 50, y: 120});
pc.controlar = function(dt){
    if(input.comandos.get("MOVE_ESQUERDA")){
        this.vx = -50;
    }
    else if(input.comandos.get("MOVE_DIREITA")){
        this.vx = +50;
    }
    else{
        this.vx = 0;
    }
    if(input.comandos.get("MOVE_CIMA")){
        this.vy = -50;
    }
    else if(input.comandos.get("MOVE_BAIXO")){
        this.vy = +50;
    }
    else{
        this.vy = 0;
    }
}
cena1.adicionar(pc);

function perseguePC(dt){
    this.vx = 25*Math.sign(pc.x - this.x);
    this.vy = 25*Math.sign(pc.y - this.y);

}
const en1 = new Sprite({x:360, color:"red", controlar: perseguePC});
en1.controlar = perseguePC;
    
cena1.adicionar(en1);
/*cena1.adicionar(new Sprite({x: 115, y: 70, vy: 10, color: "yellow", controlar: perseguePC}));
cena1.adicionar(new Sprite({x: 650, y: 70, vx: -10, color: "pink", controlar: perseguePC}));
cena1.adicionar(new Sprite({x: 150, y: 180, vy: -10, color: "green", controlar: perseguePC}));
cena1.adicionar(new Sprite({x: 315, y: 299, vy: +10, color: "blue",controlar: perseguePC}));*/


cena1.quandoCriar = function(){
        let nmy = Math.floor(Math.random()*(this.mapa.tiles.length-2))+1;
        let nmx = Math.floor(Math.random()*(this.mapa.tiles[0].length-2))+1;
        
        while(this.mapa.tiles[nmy][nmx] != 0){
            nmy = Math.floor(Math.random()*(this.mapa.tiles.length-2))+1;
            nmx = Math.floor(Math.random()*(this.mapa.tiles[0].length-2))+1;
        }
            this.adicionar(new Sprite({x: nmx*this.mapa.SIZE+this.mapa.SIZE/2, 
                y: nmy*this.mapa.SIZE+this.mapa.SIZE/2, controlar: perseguePC, color: "red"}));
                        
            }
          


game.iniciar();

document.addEventListener("keydown", (e)=>{
    switch (e.key) {
    case "s":
        game.iniciar();
        break;
    case "S":
        game.parar();
        break;
    case "c":
        assets.play("moeda");
        break;
    case "b":
        assets.play("explosao");
        break;
    }
    });


