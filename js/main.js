const Main = (function() {

    const canvas = document.querySelector("#Canvas");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = 'rgb(200,0,0)';
    ctx.fillRect(20,20,20,20);

    ctx.font = "30px Arial";
    ctx.fillText("Press Enter", 200,200);

    if(gl == null)
    {
        alert("WebGL not found.");
    }

    function p(){
        return "private";
    };

    return {
        pub: function() {
            return "public";
        },
        test: function(){
            return p();
        }
    }

})();

console.log(Main.test());
