import {Config} from "./config.js";

export class Camera {
    constructor(x, y, vW, vH){
        this.x = x;
        this.y = y;
        this.vW = vW;
        this.vH = vH;
    }
    update(){
        // console.log(this.vW);
        this.y -= Config.VerticalScrollSpeed;
    }
}
