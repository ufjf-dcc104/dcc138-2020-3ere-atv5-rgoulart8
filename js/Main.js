import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";
import InputManager from "./InputManager.js";

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
    });

const cena1 = new Cena(canvas, assets);

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
const en1 = new Sprite({x:200, vx: -10, color:"red"});
    
cena1.adicionar(pc);
cena1.adicionar(en1);
cena1.adicionar(new Sprite({x: 115, y: 70, vy: 10, color: "yellow"}));
cena1.adicionar(new Sprite({x: 650, y: 70, vx: -10, color: "pink"}));
cena1.adicionar(new Sprite({x: 150, y: 180, vy: -10, color: "green"}));
cena1.adicionar(new Sprite({x: 315, y: 299, vy: +10, color: "blue"}));
cena1.adicionar(new Sprite({x: 460, y: 123, vy: -10, color: "lightblue"}));
cena1.adicionar(new Sprite({x: 400, y: 212, vy: 10, color: "orange"}));
cena1.adicionar(new Sprite({x: 420, y: 512, vy: -10, color: "purple"}));

cena1.quandoCriar = function(){
        let nmy = Math.floor(Math.random()*(this.mapa.tiles.length-2))+1;
        let nmx = Math.floor(Math.random()*(this.mapa.tiles[0].length-2))+1;
        let nvx = Math.sin(nmx)*Math.random()*50;
        let nvy = nvx;
        while(this.mapa.tiles[nmy][nmx] != 0){
            nmy = Math.floor(Math.random()*(this.mapa.tiles.length-2))+1;
            nmx = Math.floor(Math.random()*(this.mapa.tiles[0].length-2))+1;
        }
            this.adicionar(new Sprite({x: nmx*this.mapa.SIZE+this.mapa.SIZE/2, 
                y: nmy*this.mapa.SIZE+this.mapa.SIZE/2, vx: nvx, color: "red"}));
                        
            }
          


cena1.iniciar();

document.addEventListener("keydown", (e)=>{
    switch (e.key) {
    case "s":
        cena1.iniciar();
        break;
    case "S":
        cena1.parar();
        break;
    case "c":
        assets.play("moeda");
        break;
    case "b":
        assets.play("explosao");
        break;
    }
    });


