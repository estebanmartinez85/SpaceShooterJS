import { Keyboard } from "./keyboard.js";

const Player = (()=>{
   return {

       x: 100,
       y: 100
   }
});

const Main = (function() {
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    let canvas = document.getElementById('Canvas'),
        cw = canvas.width,
        ch = canvas.height,
        cx = null,
        fps = 60,
        bX = 30,
        bY = 30,
        mX = 10,
        mY = 20,
        interval     =    1000/fps,
        lastTime     =    (new Date()).getTime(),
        currentTime  =    0,
        delta = 0;

    var x = 100;
    var y = 100;

    Keyboard.registerKeys(canvas);

    function gameLoop() {
        window.requestAnimationFrame(gameLoop);

        currentTime = (new Date()).getTime();
        delta = (currentTime-lastTime);

        if(delta > interval) {
            cx.clearRect(0,0,cw,ch);

            if(Keyboard.Up){
                y -= 10;
            }
            if(Keyboard.Right){
                x += 10;
            }
            if(Keyboard.Down){
                y += 10;
            }
            if(Keyboard.Left){
                x -= 10;
            }
            cx.drawImage(img, x,y);

            lastTime = currentTime - (delta % interval);
        }
    }

    var img = new Image(32,32);
    img.src = "/SpaceShooterJS/img/PlayerShip.png";
    img.addEventListener("load", () => {
        if (typeof (canvas.getContext) !== undefined) {
            cx = canvas.getContext('2d');
            gameLoop();
        }
    }, false);
})();
