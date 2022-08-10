import {Loader} from "./Loader.js";
import {scaleToWindow} from "./scaleToWindow";
import config from "./config";

export class Game {
    constructor() {
        this.pixiApplication = this.init();
        this.loader = new Loader(this.pixiApplication);
        this.start();
    }

    async start() {
        this.loader.loadResources()
        await this.loader.playLoaderAnimation()
    }

    init() {
        const {width, height} = config.applicationResolution
        const app = new PIXI.Application({width, height, backgroundColor: 0x1099bb});

        document.getElementById("applicationContainer").appendChild(app.view);
        window.addEventListener("resize", (event) => {
            scaleToWindow(app.renderer.view);
        });
        scaleToWindow(app.renderer.view);

        return app;
    }
}