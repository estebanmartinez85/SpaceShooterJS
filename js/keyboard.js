export const Keyboard = (()=>{
    return {
        Up: false,
        Right: false,
        Down: false,
        Left: false,
        registerKeys: function(canvas){
            canvas.onkeydown = function(e){
                e = e || window.event;
                switch (e.key){
                    case "w":
                        Keyboard.Up = true;
                        break;
                    case "d":
                        Keyboard.Right = true;
                        break;
                    case "s":
                        Keyboard.Down = true;
                        break;
                    case "a":
                        Keyboard.Left = true;
                        break;
                }

            };
            canvas.onkeyup = function(e){
                e = e || window.event;
                switch (e.key){
                    case "w":
                        Keyboard.Up = false;
                        break;
                    case "d":
                        Keyboard.Right = false;
                        break;
                    case "s":
                        Keyboard.Down = false;
                        break;
                    case "a":
                        Keyboard.Left = false;
                        break;
                }
            };
        }
    }
})();
