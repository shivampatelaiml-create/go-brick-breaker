// ==========================================
// BALL
// ==========================================

const ball = {

    x:
        canvas.width / 2,

    y:
        canvas.height - 60,

    radius:
        8,

    dx:
        1.5,

    dy:
        -1.5,

    trail:
        []

};


// ==========================================
// EXTRA BALLS
// ==========================================

let balls = [];


// ==========================================
// BALL TRAIL
// ==========================================

function updateBallTrail(
    currentBall
) {

    currentBall.trail.unshift({

        x:
            currentBall.x,

        y:
            currentBall.y

    });


    if (
        currentBall.trail.length > 12
    ) {

        currentBall.trail.pop();

    }

}


// ==========================================
// DRAW BALL
// ==========================================

function drawBallObject(
    currentBall
) {

    // ==================================
    // TRAIL
    // ==================================

    for (
        let i =
            currentBall.trail.length - 1;

        i >= 0;

        i--
    ) {

        const point =
            currentBall.trail[i];


        const progress =
            i /
            currentBall.trail.length;


        const alpha =
            (1 - progress) *
            0.22;


        const size =
            currentBall.radius *
            (
                0.35 +
                progress * 0.5
            );


        ctx.globalAlpha =
            alpha;


        ctx.fillStyle =
            "#00e5ff";


        ctx.shadowBlur =
            10;


        ctx.shadowColor =
            "#00e5ff";


        ctx.beginPath();


        ctx.arc(

            point.x,

            point.y,

            size,

            0,

            Math.PI * 2

        );


        ctx.fill();

    }


    ctx.globalAlpha =
        1;


    ctx.shadowBlur =
        0;


    // ==================================
    // MAIN BALL
    // ==================================

    ctx.save();


    ctx.shadowBlur =
        25;


    ctx.shadowColor =
        "#ffffff";


    const gradient =
        ctx.createRadialGradient(

            currentBall.x - 2,

            currentBall.y - 2,

            1,

            currentBall.x,

            currentBall.y,

            currentBall.radius

        );


    gradient.addColorStop(
        0,
        "#ffffff"
    );


    gradient.addColorStop(
        0.35,
        "#ffffff"
    );


    gradient.addColorStop(
        0.7,
        "#00e5ff"
    );


    gradient.addColorStop(
        1,
        "#0088ff"
    );


    ctx.fillStyle =
        gradient;


    ctx.beginPath();


    ctx.arc(

        currentBall.x,

        currentBall.y,

        currentBall.radius,

        0,

        Math.PI * 2

    );


    ctx.fill();


    ctx.restore();


    // ==================================
    // BALL HIGHLIGHT
    // ==================================

    ctx.fillStyle =
        "rgba(255,255,255,0.9)";


    ctx.beginPath();


    ctx.arc(

        currentBall.x - 2.5,

        currentBall.y - 2.5,

        2,

        0,

        Math.PI * 2

    );


    ctx.fill();


    ctx.shadowBlur =
        0;

}


// ==========================================
// DRAW ALL BALLS
// ==========================================

function drawBalls() {

    drawBallObject(
        ball
    );


    for (
        const extraBall of balls
    ) {

        drawBallObject(
            extraBall
        );

    }

}


// ==========================================
// MAIN BALL MOVEMENT
// ==========================================

function moveMainBall() {

    updateBallTrail(
        ball
    );


    ball.x +=
        ball.dx;


    ball.y +=
        ball.dy;


    // ==================================
    // LEFT / RIGHT WALL
    // ==================================

    if (

        ball.x +
        ball.radius >=
        canvas.width ||

        ball.x -
        ball.radius <=
        0

    ) {

        ball.dx *=
            -1;

    }


    // ==================================
    // TOP WALL
    // ==================================

    if (
        ball.y -
        ball.radius <=
        0
    ) {

        ball.dy *=
            -1;

    }


    // ==================================
    // BALL LOST
    // ==================================

    if (
        ball.y +
        ball.radius >=
        canvas.height
    ) {

        lives--;


        updateLives();


        // Combo breaks when
        // main ball is lost.

        if (
            typeof resetCombo ===
            "function"
        ) {

            resetCombo();

        }


        if (
            lives <= 0
        ) {

            gameOver();

        }
        else {

            resetBall();

        }

    }

}


// ==========================================
// EXTRA BALL MOVEMENT
// ==========================================

function moveExtraBalls() {

    for (
        let i =
            balls.length - 1;

        i >= 0;

        i--
    ) {

        const currentBall =
            balls[i];


        updateBallTrail(
            currentBall
        );


        currentBall.x +=
            currentBall.dx;


        currentBall.y +=
            currentBall.dy;


        // ==================================
        // WALLS
        // ==================================

        if (

            currentBall.x +
            currentBall.radius >=
            canvas.width ||

            currentBall.x -
            currentBall.radius <=
            0

        ) {

            currentBall.dx *=
                -1;

        }


        if (
            currentBall.y -
            currentBall.radius <=
            0
        ) {

            currentBall.dy *=
                -1;

        }


        // ==================================
        // LOST EXTRA BALL
        // ==================================

        if (
            currentBall.y -
            currentBall.radius >
            canvas.height
        ) {

            balls.splice(
                i,
                1
            );

        }

    }

}


// ==========================================
// RESET BALL
// ==========================================

function resetBall() {

    ball.x =
        canvas.width / 2;


    ball.y =
        canvas.height - 60;


    const speed =
        getLevelSpeed();


    ball.dx =
        speed;


    ball.dy =
        -speed;


    ball.trail =
        [];


    balls =
        [];


    resetPaddle();

}


// ==========================================
// CREATE EXTRA BALLS
// ==========================================

function createExtraBalls() {

    const speed =
        getLevelSpeed();


    balls.push({

        x:
            ball.x,

        y:
            ball.y,

        radius:
            8,

        dx:
            speed,

        dy:
            -speed,

        trail:
            []

    });


    balls.push({

        x:
            ball.x,

        y:
            ball.y,

        radius:
            8,

        dx:
            -speed,

        dy:
            -speed,

        trail:
            []

    });

}