import {gsap} from 'gsap';
import config from '../config';
import {Utils} from '../Utils';
import * as PIXI from 'pixi.js';

export class LoaderView extends PIXI.Container {

    constructor(pixiApplication) {
        super();
        this.pixiApplication = pixiApplication;
        this.initLoaderAnimation();
    }

    initLoaderAnimation() {
        this.loadingText = this.createText('Loading...', config.loadingText.y);
        this.percentText = this.createText('', config.percentText.y);
        this.progressBarFrame = this.createProgressBarFrame();
        this.progressBar = this.createProgressBar();

        this.addChild(this.loadingText, this.percentText, this.progressBar, this.progressBarFrame);
        this.pixiApplication.stage.addChild(this);
    }

    createText(string, y) {
        const text = new PIXI.Text(string);

        Utils.alignHorizontally(text);
        text.y = y;

        return text;
    }

    createProgressBarFrame() {
        const progressBarFrame = new PIXI.Graphics();
        const {y, width, height, radius} = config.progressBarFrameConfig;

        progressBarFrame.lineStyle(1, 0xFFFFFF, 1);
        progressBarFrame.drawRoundedRect(0, y, width, height, radius);
        Utils.alignHorizontally(progressBarFrame);

        return progressBarFrame;
    }

    createProgressBar() {
        const progressBar = new PIXI.Sprite(PIXI.Texture.WHITE);
        const {y, height} = config.progressBarConfig;

        progressBar.height = height;
        progressBar.x = this.progressBarFrame.x;
        progressBar.y = y;

        return progressBar;
    }

    playProgressBarAnimation() {
        return new Promise((resolve => {
            const tween = gsap.to(this.progressBar, {
                duration: config.minimumLoadingTimeSeconds,
                ease: 'power1.inOut',
                pixi: {width: config.progressBarConfig.width},
                onUpdate: () => this.updateProgress(tween.progress() * 100),
                onComplete: resolve,
            }).play();
        }));
    }

    updateProgress(progress) {
        this.percentText.text = `${progress.toFixed(2)}%`;
        this.percentText.x = this.pixiApplication.renderer.width / 2 -
            this.percentText.width / 2;
    }
}
