import config from '../config';
import {LoaderView} from './LoaderView';
import * as PIXI from 'pixi.js';

export class Loader {
    constructor(pixiApplication) {
        this.pixiApplication = pixiApplication;
        this.loaderView = new LoaderView(pixiApplication);
    }

    loadResources() {
        return new Promise((resolve => {
            PIXI.Loader.shared.add(config.assets).load(resolve);

            // loader.onProgress.add((loader) => this.loaderView.updateProgress(loader.progress));
        }));
    }

    playLoaderAnimation() {
        return this.loaderView.playProgressBarAnimation();
    }

    static getResourceTexture(textureName) {
        return PIXI.Loader.shared.resources[`assets/${textureName}.png`].texture;
    }
}