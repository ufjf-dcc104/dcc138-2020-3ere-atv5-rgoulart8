import Cena from "./Cena.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");
const cena1 = new Cena(canvas);

const pc = new Sprite();
const en1 = new Sprite({x:140, y:95, w:30, h:30, collor:"red"});

cena1.adicionar(pc);
cena1.adicionar(en1);

cena1.passo(0.16);
cena1.desenhar();
