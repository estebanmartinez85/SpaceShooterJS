import { Keyboard } from "./keyboard.js";
import { LevelOne } from "./LevelOne.js";

const Main = (function() {
    let vendors = ['webkit', 'moz'];
    for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
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

    let audio = document.querySelector("#AudioPlayer");
    audio.src = "/SpaceShooterJS/audio/Level1.wav";
    audio.loop = true;
    audio.volume = 0.2;
    audio.play();

    Keyboard.registerKeys(canvas);
    let level = new LevelOne();

    function gameLoop() {
        window.requestAnimationFrame(gameLoop);

        currentTime = (new Date()).getTime();
        delta = (currentTime-lastTime);

        if(delta > interval) {
            cx.clearRect(0,0,cw,ch);
            cx.fillStyle = "black";
            cx.fillRect(0,0,cw,ch);
            if (!level.preloaded){
                level.preload();
                level.preloaded = true;
            } else {
                if (level.isLoaded()) {
                    level.update();
                    level.draw(cx);
                } else {
                    cx.font = "30px Arial";
                    cx.fillText("LOADING", 170, 300);
                }
            }

            lastTime = currentTime - (delta % interval);
        }
    }

    if (typeof (canvas.getContext) !== undefined) {
        cx = canvas.getContext('2d');
        gameLoop();
    }
})();
