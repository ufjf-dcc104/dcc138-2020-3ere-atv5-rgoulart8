import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";

const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem ("garota", "assets/girl.png");
assets.carregaImagem ("esqueleto", "assets/skelly.png");
assets.carregaImagem ("orc", "assets/orc.png");
assets.carregaAudio ("moeda", "assets/coin.wav");
assets.carregaAudio ("explosao", "assets/boom.wav");



document.body.appendChild(assets.img("garota"));
document.body.appendChild(assets.img("esqueleto"));
document.body.appendChild(assets.img("orc"));

const canvas = document.querySelector("canvas");
canvas.width = 14*32;
canvas.height = 10*32;
const cena1 = new Cena(canvas, assets);

const mapa1 = new Mapa(10, 14, 32);
cena1.configuraMapa(mapa1);

const pc = new Sprite({vx:10});
const en1 = new Sprite({x:140, y:95, w:30, h:30, collor:"red"});

cena1.adicionar(pc);
cena1.adicionar(en1);

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
