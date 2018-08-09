import {Keyboard} from "./keyboard.js";
import {GameObject} from "./gameobject.js";

export class Player extends GameObject
{
    constructor(x,y,sprite){
        super(x,y,sprite);
        this.previouslocation = {x:0,y:0};
    }
    update(){
        if((this.x >= 0 && (this.x <= 480 - this.sprite.width))
            && (this.y >= 0 && (this.y <= 640 - this.sprite.height))) {
            this.previouslocation = {x: this.x, y: this.y};
            if (Keyboard.Up) {
                this.y -= 10;
            }
            if (Keyboard.Right) {
                this.x += 10;
            }
            if (Keyboard.Down) {
                this.y += 10;
            }
            if (Keyboard.Left) {
                this.x -= 10;
            }
        } else {
            this.x = this.previouslocation.x;
            this.y = this.previouslocation.y;
        }
    };
};

export class Laser extends GameObject
{
    update(){
       this.y -= 10;
    };
}
