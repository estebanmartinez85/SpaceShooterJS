export class GameObject {
    constructor(lvl, spriteKey){
        this.x = 0;
        this.y = 0;
        this.sprite = new Image();
        let level = lvl;

        this.getId = function(){ return id; };
        let createUUID = function() {
            return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            )
        };
        let id = createUUID();

        this.getLevel = function(){
            return level;
        };
        this.setLevel = function(lvl){
            level = lvl;
        };
        this.setSpriteKey = function(key){
            let res = this.getLevel().getResource(key);
            if(res) {
                this.sprite = res.sprite;
            } else {
                console.log("Resource Not Found");
            }
        };
        if(spriteKey !== null){
            this.setSpriteKey(spriteKey);
        }
    };

    begin(){}
    update(){ }
    draw(){ }
};
