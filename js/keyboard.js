export const Keyboard = (()=>{
    return {
        HandleKeys: [],
        Keys: {up: [], down: [], pressed: []},
        P: false,

        BindKey: function(key, type, callback){
            Keyboard.Keys[type][key] = callback;
        },

        registerEvents: function(canvas){
            canvas.onkeydown = function(e){
                e = e || window.event;
                if(Keyboard.Keys.down[e.key] && (Keyboard.HandleKeys[e.key] != false)) {
                    Keyboard.HandleKeys[e.key] = false;
                    Keyboard.Keys.down[e.key]();
                }
            }
            canvas.onkeyup = function(e){
                e = e || window.event;
                Keyboard.HandleKeys[e.key] = true;
                if(Keyboard.Keys.up[e.key]) {
                    Keyboard.Keys.up[e.key]();
                }
            }
        }
    }
})();
