import * as PIXI from 'pixi.js';
import {Utils} from '../Utils';
import config from '../config';
import {GameEvents} from './GameEvents';
import {Loader} from '../loader/Loader';

export class UI extends PIXI.Container {
    constructor(pixiApplication) {
        super();
        this.pixiApplication = pixiApplication;
        this.visible = false;
        this.pixiApplication.stage.addChild(this);
    }

    init() {
        this.spinButton = this.createSpinButton();
        this.balanceField = new PIXI.Text();
        this.betField = new PIXI.Text(`Bet: ${config.initialBet}`);
        this.totalWin = new PIXI.Text();
        this.payLines = new PIXI.Text();

        this.setPositions();
        this.addChild(this.spinButton, this.balanceField, this.betField, this.totalWin, this.payLines);
    }

    showWinsInfo(totalWin, winsData) {
        this.totalWin.text = totalWin > 0 ? `Total Win: ${totalWin}` : '';
        this.payLines.text = this.parseWinsData(winsData);

        this.scalePayLines();
        Utils.alignHorizontally(this.totalWin);
        Utils.alignHorizontally(this.payLines);
    }

    parseWinsData(winsData) {
        let textString = ``;

        winsData.forEach((winData) => {
            textString += `- payline${winData.payLineIndex +
            1}, ${winData.winningSymbol} x${winData.symbolCount}, ${winData.win}\n`;
        });

        return textString;
    }

    updateBalance(balance) {
        this.balanceField.text = `Balance: ${balance}`;
    }

    scalePayLines() {
        const availableHeight = config.applicationResolution.height - this.payLines.y;

        this.payLines.scale.set(1);
        this.payLines.scale.set(availableHeight < this.payLines.height ? availableHeight / this.payLines.height : 1);
    }

    setPositions() {
        this.balanceField.position.set(config.balanceField.x, config.balanceField.y);
        this.betField.position.set(config.betField.x, config.betField.y);
        this.totalWin.y = config.totalWinField.y;
        this.payLines.y = config.payLinesField.y;
    }

    createSpinButton() {
        const button = new PIXI.Sprite(Loader.getResourceTexture('spin_button'));
        const initialScale = config.spinButton.scale;

        button.scale.set(initialScale);
        button.anchor.set(0.5);
        Utils.alignHorizontally(button);
        button.x = config.applicationResolution.width / 2;
        button.y = config.spinButton.y;
        button.interactive = true;
        button.buttonMode = true;
        button.on('click', () => {
            this.emit(GameEvents.spinButtonClicked);
        });
        button.on('tap', () => {
            this.emit(GameEvents.spinButtonClicked);
        });
        button.on('pointerover', () => button.scale.set(initialScale + 0.1));
        button.on('pointerout', () => button.scale.set(initialScale));
        button.on('pointerup', () => button.scale.set(initialScale));
        button.on('pointerdown', () => button.scale.set(initialScale - 0.1));

        return button;
    }
}