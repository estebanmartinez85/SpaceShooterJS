import { Keyboard } from "./keyboard.js";

export const Game = (function() {
    let vendors = ['webkit', 'moz'];
    let paused = false;
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
    canvas.focus();

    Keyboard.registerEvents(canvas);
    let levels = new Array();
    let levelIndex = 0;
    let yy = 0;

    function gameLoop() {
        window.requestAnimationFrame(gameLoop);

        currentTime = (new Date()).getTime();
        delta = (currentTime-lastTime);
        if(delta > interval) {
            cx.setTransform(1,0,0,1,0.5,0.5);
            cx.clearRect(0,0,cw,ch);
            cx.fillStyle = "black";
            cx.fillRect(0,0,cw,ch);
            if(levels.length > 0) {
                if (!levels[levelIndex].preloaded) {
                    levels[levelIndex].preload();
                    levels[levelIndex].load();
                    levels[levelIndex].preloaded = true;
                }
                else {
                    if (levels[levelIndex].isLoaded()) {
                        if(!levels[levelIndex].begun){
                            levels[levelIndex].loadObjects();
                            levels[levelIndex].begin();
                            levels[levelIndex].begun = true;
                        }
                        if(levels[levelIndex].camera) {
                            cx.translate(-levels[levelIndex].camera.x, -levels[levelIndex].camera.y)
                        }

                        levels[levelIndex].update();
                        levels[levelIndex].draw(cx);
                    } else {
                        cx.font = "30px Arial";
                        cx.fillText("LOADING", 170, 300);
                    }
                }
            } else {
                cx.fillStyle = "white";
                cx.font = "29px Arial";
                cx.fillText("No Levels", 170, 300);
            }

            lastTime = currentTime - (delta % interval);
        }
    }
    return {
        AddLevel: function(lvl){
            levels.push(lvl);
        },
        Start: function() {
            if (typeof(canvas.getContext) !== undefined) {
                cx = canvas.getContext('2d');
                gameLoop();
            }
        },
        NextLevel: function(){
            if(levels.length > levelIndex + 1) levelIndex++;
        },
        Restart: function(){
            levelIndex = 0;
        },
        Pause: function(){
            paused = !paused;
        }
    }
})();
