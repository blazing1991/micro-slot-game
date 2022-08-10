import {Game} from "./Game.js";
import * as PIXI from 'pixi.js';
import {gsap} from "gsap";
import {PixiPlugin} from "gsap/PixiPlugin";

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PixiPlugin);
global.PIXI = PIXI;
window.game = new Game();