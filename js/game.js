document.addEventListener("DOMContentLoaded", function () {
    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext("2d");

    function resizeCanvas() {
        var scale = window.innerWidth / 288;
        cvs.style.width = "100vw";
        cvs.style.height = 512 * scale + "px";
        document.body.style.overflow = "hidden";
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    var bird = new Image(),
        bg = new Image(),
        fg = new Image(),
        pipeUp = new Image(),
        pipeBottom = new Image();
    
    bird.src = "img/bird.png";
    bg.src = "img/bg.png";
    fg.src = "img/fg.png";
    pipeUp.src = "img/pipeUp.png";
    pipeBottom.src = "img/pipeBottom.png";

    var fly = new Audio(), score_audio = new Audio();
    fly.src = "audio/fly.mp3";
    score_audio.src = "audio/score.mp3";

    var gap = 90;
    var xPos = 10, yPos = 150, grav = 1.2, velocity = 0;
    var pipe = [{ x: cvs.width, y: 0 }];
    var score = 0;

    function moveUp() {
        velocity = -4.5;
        fly.play();
    }

    document.addEventListener("keydown", function (event) {
        if (event.code === "Space") moveUp();
    });
    document.addEventListener("touchstart", moveUp);

    function draw() {
        ctx.drawImage(bg, 0, 0);
        for (var i = 0; i < pipe.length; i++) {
            ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
            pipe[i].x--;
            if (pipe[i].x === 125) {
                pipe.push({ x: cvs.width, y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height });
            }
            if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
                location.reload();
            }
            if (pipe[i].x === 5) {
                score++;
                score_audio.play();
            }
        }
        ctx.drawImage(fg, 0, cvs.height - fg.height);
        ctx.drawImage(bird, xPos, yPos);
        velocity += grav;
        yPos += velocity;

        ctx.fillStyle = "#000";
        ctx.font = "24px Verdana";
        ctx.fillText("Счет: " + score, 10, cvs.height - 20);
        requestAnimationFrame(draw);
    }
    pipeBottom.onload = draw;
});
