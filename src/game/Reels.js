import config from '../config';
import * as PIXI from 'pixi.js';
import {Utils} from '../Utils';
import {Symbol} from './Symbol';

export class Reels extends PIXI.Container {
    constructor(pixiApplication) {
        super();
        this.pixiApplication = pixiApplication;
        this.winLinesContainer = new PIXI.Container();
        this.visible = false;
        this.reels = [];
        this.addChild(this.winLinesContainer);
        this.pixiApplication.stage.addChild(this);
    }

    initReels() {
        for (let i = 0; i < config.numberOfReels; i++) {
            const reel = this.initReel();

            reel.x = (config.reelContainer.width + config.betweenReels) * i;
            this.reels.push(reel);
            this.addChild(reel);
        }
        Utils.alignHorizontally(this);
        this.y = config.reelsContainer.y;
    }

    initReel() {
        const reel = new PIXI.Container();

        reel.addChild(this.createReelBackground());
        reel.symbols = [];

        for (let i = 0; i < config.numberOfSymbols; i++) {
            const symbol = new Symbol();

            symbol.setSymbol();
            symbol.y = i * (symbol.height + config.betweenSymbols) + config.betweenSymbols;
            symbol.x = config.reelContainer.width / 2;

            reel.symbols.push(symbol);
            reel.addChild(symbol);
        }

        return reel;
    }

    setSymbols(symbols) {
        symbols.forEach((reelSymbols, reelIndex) => {
            reelSymbols.forEach((symbolId, symbolIndex) => {
                this.reels[reelIndex].symbols[symbolIndex].setSymbol(symbolId);
            });
        });
    }

    createReelBackground() {
        const reelBackground = new PIXI.Graphics();

        reelBackground.beginFill(0x000000, 0.4);
        reelBackground.drawRect(0, 0, config.reelContainer.width, config.reelContainer.height);
        reelBackground.endFill();

        return reelBackground;
    }

    drawWinLines(winsData) {
        this.winLinesContainer.removeChildren();
        winsData.forEach((winData) => {
            const payLine = config.payLines[winData.payLineIndex];
            const line = new PIXI.Graphics();

            line.lineStyle(4, 0xFFFFFF, 0.2);

            payLine.forEach((symbolIndex, reelIndex) => {
                const reel = this.reels[reelIndex];
                const reelCenter = reel.x + reel.width / 2;
                const symbol = reel.symbols[symbolIndex];
                const symbolCenter = symbol.y + symbol.height / 2;

                reelIndex === 0 ? line.moveTo(reelCenter, symbolCenter) : line.lineTo(reelCenter, symbolCenter);
            });

            this.winLinesContainer.addChild(line);
        });
    }
}