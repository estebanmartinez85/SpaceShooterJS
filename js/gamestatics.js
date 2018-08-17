export class GameStatics {
    constructor(){
        this.game = null;
    }
    static NextLevel(){
        this.game.NextLevel();
    }
    static LoadGame(g){
        this.game = g;
    }
}
