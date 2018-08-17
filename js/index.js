import {Game} from "./game.js";
import {LevelOne} from "./LevelOne.js";

let level = new LevelOne();
Game.AddLevel(level);
Game.Start();
