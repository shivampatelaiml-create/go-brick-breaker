// ==========================================
// PLAYER / PADDLE
// ==========================================

const paddle = {

    width: 120,

    normalWidth: 120,

    wideWidth: 200,

    height: 15,

    x:
        canvas.width / 2 - 60,

    y:
        canvas.height - 40,

    speed: 8,

    dx: 0

};


// ==========================================
// DRAW PADDLE
// ==========================================

function drawPaddle() {

    const gradient =
        ctx.createLinearGradient(

            paddle.x,

            paddle.y,

            paddle.x,

            paddle.y +
            paddle.height

        );


    gradient.addColorStop(
        0,
        "#ffffff"
    );


    gradient.addColorStop(
        0.35,
        "#00e5ff"
    );


    gradient.addColorStop(
        1,
        "#0077ff"
    );


    // ======================================
    // OUTER GLOW
    // ======================================

    ctx.save();

    ctx.shadowBlur = 25;

    ctx.shadowColor =
        "#00e5ff";


    // ======================================
    // MAIN PADDLE
    // ======================================

    ctx.fillStyle =
        gradient;


    ctx.beginPath();

    ctx.roundRect(

        paddle.x,

        paddle.y,

        paddle.width,

        paddle.height,

        6

    );

    ctx.fill();


    ctx.restore();


    // ======================================
    // TOP LIGHT
    // ======================================

    ctx.fillStyle =
        "rgba(255,255,255,0.65)";


    ctx.beginPath();

    ctx.roundRect(

        paddle.x + 7,

        paddle.y + 3,

        paddle.width - 14,

        3,

        2

    );

    ctx.fill();


    // ======================================
    // CENTER CORE
    // ======================================

    ctx.fillStyle =
        "rgba(255,255,255,0.9)";


    ctx.beginPath();

    ctx.arc(

        paddle.x +
        paddle.width / 2,

        paddle.y +
        paddle.height / 2,

        3,

        0,

        Math.PI * 2

    );

    ctx.fill();

}


// ==========================================
// MOVE PADDLE
// ==========================================

function movePaddle() {

    paddle.x +=
        paddle.dx;


    if (
        paddle.x < 0
    ) {

        paddle.x = 0;

    }


    if (
        paddle.x +
        paddle.width >
        canvas.width
    ) {

        paddle.x =
            canvas.width -
            paddle.width;

    }

}


// ==========================================
// RESET PADDLE
// ==========================================

function resetPaddle() {

    paddle.x =
        canvas.width / 2 -
        paddle.width / 2;

    paddle.dx = 0;

}


// ==========================================
// WIDE PADDLE
// ==========================================

function makePaddleWide() {

    paddle.width =
        paddle.wideWidth;

}


// ==========================================
// NORMAL PADDLE
// ==========================================

function makePaddleNormal() {

    paddle.width =
        paddle.normalWidth;

}