import config from "./config";
import {LoaderView} from "./LoaderView";

export class Loader {
    constructor(pixiApplication) {
        this.pixiApplication = pixiApplication;
        this.loaderView = new LoaderView(pixiApplication);
    }

    loadResources() {
        return new Promise((resolve => {
            PIXI.Loader.shared
                .add(config.assets)
                .load(resolve);

            // loader.onProgress.add((loader) => this.loaderView.updateProgress(loader.progress));
        }));
    }

    playLoaderAnimation() {
        return this.loaderView.playProgressBarAnimation();
    }
}