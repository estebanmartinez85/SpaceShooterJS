export class GameObject {
    constructor(x, y, sprite){
        this.x = x || 0;
        this.y = y || 0;
        this.sprite = new Image();
        let level = null;

        this.getId = function(){ return id; };
        let createUUID = function() {
            return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            )
        }
        let id = createUUID();

        if(sprite !== ""){
            this.sprite.src = sprite;
        }

        this.getLevel = function(){
            return level;
        };
        this.setLevel = function(lvl){
            level = lvl;
        };
    };

    update(){}
    draw(){}
};
