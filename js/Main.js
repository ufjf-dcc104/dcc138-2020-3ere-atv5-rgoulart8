import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import CenaJogo from "./CenaJogo.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaFim from "./CenaFim.js";
import CenaMoedas from "./CenaMoedas.js";

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
const cena2 = new CenaFim(canvas, assets);
const cena3 = new CenaMoedas(canvas, assets);
game.adicionarCena("carregando", cena0);
game.adicionarCena("jogo", cena1);
game.adicionarCena("fim", cena2);
game.adicionarCena("moedas", cena3);


          


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


