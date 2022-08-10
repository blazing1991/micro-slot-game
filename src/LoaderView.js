import {gsap} from "gsap";
import config from "./config";

export class LoaderView {

    constructor(pixiApplication) {
        this.pixiApplication = pixiApplication;

        this.initLoaderAnimation();
    }

    initLoaderAnimation() {
        const container = new PIXI.Container();

        this.loadingText = this.createText("Loading...");
        this.percentText = this.createText();
        this.progressBarFrame = this.createProgressBarFrame();
        this.progressBar = this.createProgressBar();
        this.percentText.y += config.percentTextYoffset;

        container.addChild(this.loadingText);
        container.addChild(this.percentText);
        container.addChild(this.progressBar);
        container.addChild(this.progressBarFrame);

        this.pixiApplication.stage.addChild(container);
    }

    createText(string = '') {
        const text = new PIXI.Text(string);

        text.x = this.pixiApplication.renderer.width / 2 - text.width / 2;
        text.y = this.pixiApplication.renderer.height / 2;

        return text
    }

    createProgressBarFrame() {
        const progressBarFrame = new PIXI.Graphics();
        const {x, y, width, height, radius} = config.progressBarFrameConfig

        progressBarFrame.lineStyle(1, 0xFFFFFF, 1);
        progressBarFrame.drawRoundedRect(x, y, width, height, radius);

        return progressBarFrame
    }

    createProgressBar() {
        const progressBar = new PIXI.Sprite(PIXI.Texture.WHITE);
        const {x, y, height} = config.progressBarConfig

        progressBar.position.set(x, y);
        progressBar.height = height;

        return progressBar
    }

    playProgressBarAnimation() {
        return new Promise((resolve => {
            const tween = gsap.to(this.progressBar, {
                duration: config.minimumLoadingTimeSeconds,
                ease: "power1.inOut",
                pixi: {width: config.progressBarConfig.width},
                onUpdate: () => this.updateProgress(tween.progress() * 100),
                onComplete: resolve,
            }).play();
        }))
    }

    updateProgress(progress) {
        this.percentText.text = `${progress.toFixed(2)}%`
        this.percentText.x = this.pixiApplication.renderer.width / 2 - this.percentText.width / 2;
    }
}
