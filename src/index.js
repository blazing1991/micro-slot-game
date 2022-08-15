import {Game} from "./game/Game.js";
import * as PIXI from 'pixi.js';
import {gsap} from "gsap";
import {PixiPlugin} from "gsap/PixiPlugin";

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PixiPlugin);
window.game = new Game();