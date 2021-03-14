import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";

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
const cena1 = new Cena(canvas, assets);

const mapa1 = new Mapa(20, 25, 32);
mapa1.carregaMapa(modeloMapa1)
cena1.configuraMapa(mapa1);

const pc = new Sprite({x: 50, vx:10});
const en1 = new Sprite({x:200, vx: -10, collor:"red"});


cena1.adicionar(pc);
cena1.adicionar(en1);
cena1.adicionar(new Sprite({x: 115, y: 70, vy: 10, collor: "red"}));
cena1.adicionar(new Sprite({x: 115, y: 180, vy: -10, collor: "red"}));

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


