import {Keyboard} from "./keyboard.js";
import {Laser} from "./player.js";
import {GameObject} from "./gameobject.js";

export class LevelBase {
    constructor(){
      let gameObjects = new Array();
      let objectsOnScreen = [];
      let resources = [];
      this.canvas = document.getElementById('Canvas');
      let objectsLoaded = 0;
      this.game = null;
      this.camera = null;
      this.paused = false;
      this.preloaded = false;
      this.begun = false;

      this.addGameObject = function(object, x, y){
          object.setLevel(this);
          object.x = x || 0;
          object.y = y || 0;
          gameObjects.push(object);
          return object;
      };
      this.getGameObjects = function(){
            return gameObjects;
      };
      this.isLoaded = function(){
          if(objectsLoaded == resources.length) {
              return true;
          }
          else {
              return false;
          }
      };

      this.getObjectsOnScreen = function(){
          return objectsOnScreen;
      }
      this.getObjectOnScreen  = function(o){
            return objectsOnScreen.filter((i) => i.getId() == o.getId())[0];
        };
      this.addObjectToScreenArray = function (o) {
          objectsOnScreen.push(o);
      }

      this.removeObjectFromScreenArray = function (object) {
          let i = objectsOnScreen.filter((o) => o.getId() == object.getId())[0];
          let index = objectsOnScreen.indexOf(i);
          if (index > -1) objectsOnScreen.splice(index, 1);
      }

      this.addResource = function(key, src){
          resources.push({key: key, src: src});
      };
      this.removeResource = function(object){
          let i = gameObjects.filter((o) => o.getId() == object.getId())[0];
          if(!i){
              i = objectsOnScreen.filter((o) => o.getId() == object.getId())[0];
              let index = objectsOnScreen.indexOf(i);
              if (index > -1) objectsOnScreen.splice(index, 1);
          } else {
              let index = gameObjects.indexOf(i);
              if (index > -1) gameObjects.splice(index, 1);
          }

      };
      this.getResources = function(){
          return resources;
      };
      this.getResource  = function(key){
          return resources.filter((i) => i.key == key)[0];
      };
      this.load = function(){
          for(let r of resources){
              let img = new Image();
              img.src = r.src;
              img.addEventListener("load", ()=>{
                  objectsLoaded++;
                  r.sprite = img;
              }, false);
          }
      };
    };
    loadObjects(){}
    begin(){
        for(let o of this.getGameObjects()){
           o.begin();
            if(this.camera){
                if (o.x < this.camera.x + this.camera.vW &&
                    o.x + o.sprite.width > this.camera.x &&
                    o.y < this.camera.y + this.camera.vH &&
                    o.y + o.sprite.height > this.camera.y) {
                        this.addObjectToScreenArray(o);
                }
            } else {
                if (o.x < 0 + this.canvas.width &&
                    o.x + o.sprite.width > this.canvas.x &&
                    o.y < 0 + this.canvas.height &&
                    o.y + o.sprite.height > this.canvas.y) {
                        this.addObjectToScreenArray(o);
                }
            }
        }
    }
    update(){
        if(this.camera) {
            this.camera.update();
        }
        if(!Keyboard.P) { //TODO: Remove Keyboard reference to pause
            for(let o of this.getGameObjects()){
                if(this.camera){
                    if (o.x < this.camera.x + this.camera.vW &&
                        o.x + o.sprite.width > this.camera.x &&
                        o.y < this.camera.y + this.camera.vH &&
                        o.y + o.sprite.height > this.camera.y) {
                        if(!this.getObjectOnScreen(o)){
                            this.addObjectToScreenArray(o);
                        }
                    } else {
                        if(this.getObjectOnScreen(o)) {
                            this.removeObjectFromScreenArray(o);
                        }
                    }
                } else {
                    if (o.x < 0 + this.canvas.width &&
                        o.x + o.sprite.width > this.canvas.x &&
                        o.y < 0 + this.canvas.height &&
                        o.y + o.sprite.height > this.canvas.y) {
                        this.addObjectToScreenArray(o);
                    } else {
                        this.removeObjectFromScreenArray(o);
                    }
                }
            }
            let objects = this.getObjectsOnScreen();
            for (let o of objects) {
                o.update();
                for(let k of objects){
                    if((o.getId() != k.getId()) && this.checkCollision(o, k)){
                        if (typeof(o.onCollide) == 'function') o.onCollide(k);
                        if (typeof(k.onCollide) == 'function') k.onCollide(o);
                    }
                }
            }
        }
    };
    draw(ctx){
        for(let o of this.getObjectsOnScreen()){
            ctx.drawImage(o.sprite, o.x, o.y);
        }
    };
    checkCollision(o,o2){
        if(o.sprite && o2.sprite) {
            if (o.x < o2.x + o2.sprite.width &&
                o.x + o.sprite.width > o2.x &&
                o.y < o2.y + o2.sprite.height &&
                o.y + o.sprite.height > o2.y) {
                return true;
            }
        }
        return false;
    }
};
