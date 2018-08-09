import {LevelBase} from "./levelbase.js";
import {Player} from "./player.js";
import {GameObject} from "./gameobject.js";

export class LevelOne extends LevelBase
{
    preload(){
        let sun = new GameObject(0,0,"/SpaceShooterJS/img/Sun.png");
        this.addGameObject(sun);

        var player = new Player(0,0,"/SpaceShooterJS/img/PlayerShip.png");
        this.addGameObject(player);

    }
}
