import {Keyboard} from "./keyboard.js";
import {GameObject} from "./gameobject.js";
import {Game} from "./game.js";
import {Config} from "./config.js";

export class Player extends GameObject
{
    constructor(level,sprite){
        super(level,sprite);
        this.x = 100;
        this.y = 100;
        this.previouslocation = {x:0,y:0};
        this.movingUp = false;
        this.movingRight = false;
        this.movingDown = false;
        this.movingLeft = false;
        this.speed = 12;
    }

    begin(){
        Keyboard.BindKey("ArrowUp", "down", () => {this.movingUp = true;})
        Keyboard.BindKey("ArrowUp", "up", () => {this.movingUp = false;})
        Keyboard.BindKey("ArrowRight", "down", () => {this.movingRight= true;})
        Keyboard.BindKey("ArrowRight", "up", () => {this.movingRight = false;})
        Keyboard.BindKey("ArrowDown", "down", () => {this.movingDown = true;})
        Keyboard.BindKey("ArrowDown", "up", () => {this.movingDown = false;})
        Keyboard.BindKey("ArrowLeft", "down", () => {this.movingLeft = true;})
        Keyboard.BindKey("ArrowLeft", "up", () => {this.movingLeft = false;})
        Keyboard.BindKey(" ", "down", () => {
            let l = new Laser(this.getLevel(), "Laser")
            this.getLevel().addGameObject(l, this.x + (this.sprite.width / 2), this.y);
        })

        this.camera = this.getLevel().camera;
    }
    update(){
        if((this.x >= 0 && (this.x <= 480 - this.sprite.width))
            && ((this.y >= this.camera.y) &&  ((this.y + this.sprite.height) <= (this.camera.y + this.camera.vH)))) {
            this.previouslocation = {x: this.x, y: this.y};
            this.checkMovement();
        } else {
            this.x = this.previouslocation.x;
            this.y = this.previouslocation.y - Config.VerticalScrollSpeed;
        }
        this.y -= Config.VerticalScrollSpeed;
    };

    checkMovement(){
        if (this.movingUp) {
            this.y -= this.speed;
        }
        if (this.movingRight) {
            this.x += this.speed;
        }
        if (this.movingDown) {
            this.y += this.speed;
        }
        if (this.movingLeft) {
            this.x -= this.speed;
        }
    }
}

export class Laser extends GameObject
{
    update(){
       this.y -= 15;
       if(this.y <= this.getLevel().camera.y  ) {
           this.getLevel().removeResource(this);
       }
    };

    onCollide(other){
        if(other instanceof GameObject)
         console.log(other);
    }
}
