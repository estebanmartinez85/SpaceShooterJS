import {LevelBase} from "./levelbase.js";
import {Player} from "./player.js";
import {GameObject} from "./gameobject.js";
import {Keyboard} from "./keyboard.js";
import {Camera} from "./camera.js";

export class LevelOne extends LevelBase
{
    constructor(key){
        super(key);
    }
    preload(){
        this.addResource('Sun', "/SpaceShooterJS/img/Sun.png");
        this.addResource('Player', "/SpaceShooterJS/img/PlayerShip.png");
        this.addResource('Laser', "/SpaceShooterJS/img/Laser.png");
    }

    loadObjects(){
        this.sun = this.addGameObject(new GameObject(this, "Sun"));
        this.sun2 = this.addGameObject(new GameObject(this, "Sun"),0,-900);
        this.player = this.addGameObject(new Player(this, "Player"), 200,300);
        this.camera = new Camera(0,0,480, 640);
        let audio = document.querySelector("#AudioPlayer");
        audio.src = "/SpaceShooterJS/audio/Level1.wav";
        audio.loop = true;
        audio.volume = 0.2;
//        audio.play();
    }
    begin(){
        super.begin();
    }

    update(){
        super.update();
        if(Keyboard.P){
            console.log(this.paused);
        }
    }
}
