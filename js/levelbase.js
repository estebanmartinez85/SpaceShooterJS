export class LevelBase {
    constructor(){
      let gameObjects = new Array();
      let objectsLoaded = 0;
      this.preloaded = false;

      this.addGameObject = function(object){
          object.setLevel(this);
          object.sprite.addEventListener("load", ()=>{
              objectsLoaded++;
          }, false);
          gameObjects.push(object);
      };
      this.getGameObjects = function(){
            return gameObjects;
      };
      this.isLoaded = function(){
          if(objectsLoaded == gameObjects.length) {
              return true;
          }
          else {
              return false;
          }
      }
    };

    update(){
        for(let o of this.getGameObjects()){
            o.update();
        }
    };
    draw(ctx){
        for(let o of this.getGameObjects()){
            ctx.drawImage(o.sprite, o.x, o.y);
        }
    };
};
