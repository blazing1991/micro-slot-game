import {Loader} from '../loader/Loader.js';
import config from '../config';
import {Utils} from '../Utils';
import {Reels} from './Reels';
import * as PIXI from 'pixi.js';
import {UI} from './UI';
import {GameEvents} from './GameEvents';
import {FakeServer} from '../FakeServer';

export class Game {
    constructor() {
        this.pixiApplication = this.createPixiApplication();
        this.loader = new Loader(this.pixiApplication);
        this.fakeServer = new FakeServer();
        this.reels = new Reels(this.pixiApplication);
        this.ui = new UI(this.pixiApplication);

        this.subscribeEvents();
        this.start();
        Utils.scaleToWindow(this.pixiApplication.renderer.view);
    }

    createPixiApplication() {
        const {width, height} = config.applicationResolution;
        const app = new PIXI.Application({width, height});
        const background = new PIXI.Graphics();

        background.beginFill(config.colors.backgroundColor);
        background.drawRect(0, 0, width, height);
        app.stage.interactive = true;
        app.stage.addChild(background);

        document.getElementById('applicationContainer').appendChild(app.view);

        return app;
    }

    subscribeEvents() {
        window.addEventListener('resize', () => {
            Utils.scaleToWindow(this.pixiApplication.renderer.view);
        });
        this.ui.on(GameEvents.spinButtonClicked, this.onSpinButtonClicked.bind(this));

        this.pixiApplication.stage.on('click', Utils.enterFullScreenOnMobile);
        this.pixiApplication.stage.on('tap', Utils.enterFullScreenOnMobile);
    }

    onSpinButtonClicked() {
        const {symbolsMatrix, stopPosition, balance, winsData, totalWin} = this.fakeServer.getSpinResponse();

        this.reels.setSymbols(symbolsMatrix);
        this.reels.drawWinLines(winsData);
        this.ui.updateBalance(balance);
        this.ui.showWinsInfo(totalWin, winsData);
    }

    async start() {
        this.loader.loadResources().then(() => {
            const {symbolsMatrix, balance} = this.fakeServer.getInitResponse();

            this.reels.initReels();
            this.reels.setSymbols(symbolsMatrix);
            this.ui.init();
            this.ui.updateBalance(balance);
        });

        await this.loader.playLoaderAnimation();

        this.loader.loaderView.destroy();
        this.reels.visible = true;
        this.ui.visible = true;
    }
}