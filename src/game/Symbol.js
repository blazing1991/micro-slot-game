import * as PIXI from 'pixi.js';
import config from '../config';
import {Loader} from '../loader/Loader';

export class Symbol extends PIXI.Sprite {
    constructor(props) {
        super(props);

        this.anchor.set(0.5, 0);
    }

    setSymbol(symbolId = 'lv1') {
        const texture = Loader.getResourceTexture(`${symbolId}_symbol`);
        this.texture = texture;
        this.scale.set(config.reelContainer.width / texture.width - 0.1);
    }

}