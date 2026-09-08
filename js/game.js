// ==========================================
// GO BRICK BREAKER
// MAIN GAME CONTROLLER
// ==========================================


// ==========================================
// FRAME-RATE SAFE GAME LOOP
// ==========================================
// Physics always runs at 60 updates per second.
// Rendering can still follow the device refresh rate.
// This keeps the original movement values and gameplay intact.
const FIXED_STEP = 1000 / 60;
const MAX_FRAME_DELTA = 100;
let animationFrameId = null;
let lastFrameTime = 0;
let physicsAccumulator = 0;


// ==========================================
// POWER UPS
// ==========================================

let powerUps = [];

const POWERUP_SIZE = 22;
const POWERUP_SPEED = 3;

let widePaddleTimer = null;


// ==========================================
// PARTICLES
// ==========================================

let particles = [];


// ==========================================
// HIT EFFECT
// ==========================================

let hitFlash = 0;
let screenShake = 0;


// ==========================================
// COMBO SYSTEM
// ==========================================

let combo = 0;
let comboTimer = 0;

const COMBO_DURATION = 120;


// ==========================================
// FLOATING SCORE
// ==========================================

let floatingTexts = [];


// ==========================================
// COMBO HIT
// ==========================================

function registerBrickHit(basePoints, x, y) {

    combo++;

    comboTimer = COMBO_DURATION;

    const multiplier = Math.max(1, combo);

    const earnedScore =
        basePoints * multiplier;

    score += earnedScore;

    updateScore();


    // Floating score

    createFloatingText(
        x,
        y,
        "+" + earnedScore
    );


    // Combo popup

    if (combo >= 2) {

        createFloatingText(
            x,
            y - 22,
            "COMBO x" + multiplier
        );

    }

}


// ==========================================
// UPDATE COMBO
// ==========================================

function updateCombo() {

    if (comboTimer > 0) {

        comboTimer--;

    }
    else if (combo > 0) {

        combo = 0;

    }

}


// ==========================================
// RESET COMBO
// ==========================================

function resetCombo() {

    combo = 0;

    comboTimer = 0;

}


// ==========================================
// CREATE FLOATING TEXT
// ==========================================

function createFloatingText(
    x,
    y,
    text
) {

    floatingTexts.push({

        x: x,

        y: y,

        text: text,

        life: 50,

        maxLife: 50,

        dy: -1.2,

        scale: 1

    });

}


// ==========================================
// UPDATE FLOATING TEXT
// ==========================================

function updateFloatingTexts() {

    for (
        let i = floatingTexts.length - 1;
        i >= 0;
        i--
    ) {

        const item =
            floatingTexts[i];


        item.y += item.dy;

        item.life--;

        item.scale += 0.01;


        if (
            item.life <= 0
        ) {

            floatingTexts.splice(
                i,
                1
            );

        }

    }

}


// ==========================================
// DRAW FLOATING TEXT
// ==========================================

function drawFloatingTexts() {

    for (
        const item of floatingTexts
    ) {

        const alpha =
            item.life /
            item.maxLife;


        ctx.save();

        ctx.globalAlpha =
            alpha;

        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "middle";

        ctx.font =
            "bold " +
            Math.floor(
                15 * item.scale
            ) +
            "px Arial";

        ctx.shadowBlur =
            12;

        ctx.shadowColor =
            "#ffffff";

        ctx.fillStyle =
            "#ffffff";


        ctx.fillText(

            item.text,

            item.x,

            item.y

        );


        ctx.restore();

    }

}


// ==========================================
// CREATE PARTICLES
// ==========================================

function createParticles(
    x,
    y,
    color
) {

    for (
        let i = 0;
        i < 24;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            Math.random() * 4 + 1.5;


        particles.push({

            x: x,

            y: y,

            dx:
                Math.cos(angle) *
                speed,

            dy:
                Math.sin(angle) *
                speed,

            size:
                Math.random() * 4 + 2,

            life: 40,

            maxLife: 40,

            color: color

        });

    }

}


// ==========================================
// UPDATE PARTICLES
// ==========================================

function updateParticles() {

    for (
        let i = particles.length - 1;
        i >= 0;
        i--
    ) {

        const particle =
            particles[i];


        particle.x +=
            particle.dx;

        particle.y +=
            particle.dy;


        particle.dy +=
            0.06;


        particle.dx *=
            0.99;


        particle.life--;

        particle.size *=
            0.96;


        if (
            particle.life <= 0
        ) {

            particles.splice(
                i,
                1
            );

        }

    }

}


// ==========================================
// DRAW PARTICLES
// ==========================================

function drawParticles() {

    for (
        const particle of particles
    ) {

        ctx.globalAlpha =
            particle.life /
            particle.maxLife;


        ctx.shadowBlur =
            12;

        ctx.shadowColor =
            particle.color;

        ctx.fillStyle =
            particle.color;


        ctx.beginPath();

        ctx.arc(

            particle.x,

            particle.y,

            particle.size,

            0,

            Math.PI * 2

        );

        ctx.fill();

    }


    ctx.globalAlpha = 1;

    ctx.shadowBlur = 0;

}


// ==========================================
// BRICK HIT EFFECT
// ==========================================

function createBrickHitEffect(
    x,
    y
) {

    hitFlash =
        0.35;

    screenShake =
        5;


    for (
        let i = 0;
        i < 10;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            Math.random() * 5 + 2;


        particles.push({

            x: x,

            y: y,

            dx:
                Math.cos(angle) *
                speed,

            dy:
                Math.sin(angle) *
                speed,

            size:
                Math.random() * 3 + 1,

            life: 25,

            maxLife: 25,

            color:
                "#ffffff"

        });

    }

}


// ==========================================
// UPDATE HIT EFFECT
// ==========================================

function updateHitEffect() {

    if (
        hitFlash > 0
    ) {

        hitFlash -=
            0.04;

    }


    if (
        screenShake > 0
    ) {

        screenShake -=
            0.5;

    }

}


// ==========================================
// DRAW HIT FLASH
// ==========================================

function drawHitFlash() {

    if (
        hitFlash <= 0
    ) {

        return;

    }


    ctx.save();

    ctx.globalAlpha =
        hitFlash;

    ctx.fillStyle =
        "#ffffff";


    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );


    ctx.restore();

}


// ==========================================
// AUDIO
// ==========================================

function initAudio() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }


    if (
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume();

    }

}


function playSound(
    frequency,
    duration,
    type = "sine",
    volume = 0.05
) {

    if (!soundEnabled) {

        return;

    }


    initAudio();


    const oscillator =
        audioContext.createOscillator();


    const gain =
        audioContext.createGain();


    oscillator.type =
        type;

    oscillator.frequency.value =
        frequency;


    gain.gain.value =
        volume;


    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );


    oscillator.start();


    gain.gain.exponentialRampToValueAtTime(

        0.001,

        audioContext.currentTime +
        duration

    );


    oscillator.stop(

        audioContext.currentTime +
        duration

    );

}


function brickSound() {

    playSound(
        520,
        0.06,
        "square",
        0.035
    );

}


function paddleSound() {

    playSound(
        280,
        0.05,
        "sine",
        0.025
    );

}


function powerUpSound() {

    playSound(
        760,
        0.15,
        "triangle",
        0.06
    );

}


function levelSound() {

    playSound(
        900,
        0.12,
        "triangle",
        0.06
    );


    setTimeout(function () {

        if (soundEnabled) {

            playSound(
                1200,
                0.18,
                "triangle",
                0.06
            );

        }

    }, 120);

}


function gameOverSound() {

    playSound(
        180,
        0.25,
        "sawtooth",
        0.05
    );

}


// ==========================================
// POWER UP DRAW
// ==========================================

function drawPowerUps() {

    for (
        const powerUp of powerUps
    ) {

        let color =
            "#ffffff";

        let symbol =
            "?";


        if (
            powerUp.type === "life"
        ) {

            color =
                "#ff3d5a";

            symbol =
                "+1";

        }


        if (
            powerUp.type === "wide"
        ) {

            color =
                "#00e676";

            symbol =
                "W";

        }


        if (
            powerUp.type === "multi"
        ) {

            color =
                "#00aaff";

            symbol =
                "M";

        }


        ctx.shadowBlur =
            15;

        ctx.shadowColor =
            color;

        ctx.fillStyle =
            color;


        ctx.beginPath();

        ctx.arc(

            powerUp.x +
            powerUp.width / 2,

            powerUp.y +
            powerUp.height / 2,

            powerUp.width / 2,

            0,

            Math.PI * 2

        );

        ctx.fill();


        ctx.shadowBlur =
            0;

        ctx.fillStyle =
            "#ffffff";

        ctx.font =
            "bold 10px Arial";

        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "middle";


        ctx.fillText(

            symbol,

            powerUp.x +
            powerUp.width / 2,

            powerUp.y +
            powerUp.height / 2

        );


        ctx.textAlign =
            "left";

        ctx.textBaseline =
            "alphabetic";

    }

}


// ==========================================
// CREATE POWER UP
// ==========================================

function createPowerUp(
    x,
    y
) {

    if (
        Math.random() > 0.20
    ) {

        return;

    }


    const types = [

        "life",
        "wide",
        "multi"

    ];


    const type =
        types[
            Math.floor(
                Math.random() *
                types.length
            )
        ];


    powerUps.push({

        x: x,

        y: y,

        width:
            POWERUP_SIZE,

        height:
            POWERUP_SIZE,

        speed:
            POWERUP_SPEED,

        type:
            type

    });

}


// ==========================================
// MOVE POWER UPS
// ==========================================

function movePowerUps() {

    for (
        let i = powerUps.length - 1;
        i >= 0;
        i--
    ) {

        const powerUp =
            powerUps[i];


        powerUp.y +=
            powerUp.speed;


        if (
            powerUp.y >
            canvas.height
        ) {

            powerUps.splice(
                i,
                1
            );

            continue;

        }


        if (

            powerUp.y +
            powerUp.height >=
            paddle.y &&

            powerUp.y <=
            paddle.y +
            paddle.height &&

            powerUp.x +
            powerUp.width >=
            paddle.x &&

            powerUp.x <=
            paddle.x +
            paddle.width

        ) {

            activatePowerUp(
                powerUp.type
            );


            powerUps.splice(
                i,
                1
            );

        }

    }

}


// ==========================================
// ACTIVATE POWER UP
// ==========================================

function activatePowerUp(
    type
) {

    powerUpSound();


    // ==================================
    // POWER-UP HUD
    // ==================================

    if (
        type === "life"
    ) {

        if (
            lives < MAX_LIVES
        ) {

            lives++;

            updateLives();

            showPowerUpStatus(
                "EXTRA LIFE"
            );

        }
        else {

            showPowerUpStatus(
                "MAX LIVES"
            );

        }

        return;

    }


    if (
        type === "wide"
    ) {

        makePaddleWide();

        showPowerUpStatus(
            "WIDE PADDLE"
        );


        if (
            widePaddleTimer
        ) {

            clearTimeout(
                widePaddleTimer
            );

        }


        widePaddleTimer =
            setTimeout(
                function () {

                    makePaddleNormal();

                    hidePowerUpStatus();

                },
                6000
            );


        return;

    }


    if (
        type === "multi"
    ) {

        createExtraBalls();

        showPowerUpStatus(
            "MULTI BALL"
        );

    }

}


// ==========================================
// PADDLE COLLISION WITH BALL
// ==========================================

function paddleCollisionWithBall(
    currentBall
) {

    if (

        currentBall.y +
        currentBall.radius >=
        paddle.y &&

        currentBall.y -
        currentBall.radius <=
        paddle.y +
        paddle.height &&

        currentBall.x >=
        paddle.x &&

        currentBall.x <=
        paddle.x +
        paddle.width &&

        currentBall.dy > 0

    ) {

        currentBall.dy =
            -Math.abs(
                currentBall.dy
            );


        const hitPoint =

            currentBall.x -
            (
                paddle.x +
                paddle.width / 2
            );


        currentBall.dx =
            hitPoint * 0.035;


        if (
            Math.abs(
                currentBall.dx
            ) < 0.7
        ) {

            currentBall.dx =
                currentBall.dx < 0
                    ? -0.7
                    : 0.7;

        }


        if (
            Math.abs(
                currentBall.dx
            ) > 2.5
        ) {

            currentBall.dx =
                currentBall.dx < 0
                    ? -2.5
                    : 2.5;

        }


        paddleSound();

    }

}


// ==========================================
// PADDLE COLLISION
// ==========================================

function paddleCollision() {

    paddleCollisionWithBall(
        ball
    );


    for (
        const extraBall of balls
    ) {

        paddleCollisionWithBall(
            extraBall
        );

    }

}


// ==========================================
// RESET POWER UP EFFECTS
// ==========================================

function resetPowerUpEffects() {

    makePaddleNormal();


    if (
        widePaddleTimer
    ) {

        clearTimeout(
            widePaddleTimer
        );


        widePaddleTimer =
            null;

    }


    if (
        typeof hidePowerUpStatus ===
        "function"
    ) {

        hidePowerUpStatus();

    }

}


// ==========================================
// LEVEL COMPLETE
// ==========================================

function levelComplete() {

    if (!gameRunning) {

        return;

    }


    gameRunning =
        false;


    if (
        lives < MAX_LIVES
    ) {

        lives++;

    }


    updateLives();


    powerUps = [];

    balls = [];


    resetCombo();

    floatingTexts = [];


    levelSound();


    showWinScreen();

}


// ==========================================
// NEXT LEVEL
// ==========================================

function nextLevel() {

    level++;

    updateLevel();


    winScreen.classList.add(
        "hidden"
    );


    resetPowerUpEffects();


    resetCombo();

    floatingTexts = [];


    applyLevelSettings();

    createBricks();

    resetBall();


    gamePaused =
        false;


    gameRunning =
        true;


    startGameLoop();

}


// ==========================================
// GAME OVER
// ==========================================

function gameOver() {

    gameRunning =
        false;


    gamePaused =
        false;


    powerUps = [];

    balls = [];


    if (
        typeof hidePowerUpStatus ===
        "function"
    ) {

        hidePowerUpStatus();

    }


    resetCombo();

    floatingTexts = [];


    showGameOverScreen();


    gameOverSound();

}


// ==========================================
// PAUSE
// ==========================================

function pauseGame() {

    if (!gameRunning) {

        return;

    }


    gamePaused =
        true;


    showPauseScreen();

}


// ==========================================
// RESUME
// ==========================================

function resumeGame() {

    if (!gameRunning) {

        return;

    }


    gamePaused =
        false;


    hidePauseScreen();


    startGameLoop();

}


// ==========================================
// UPDATE GAME PHYSICS
// ==========================================

function updateGamePhysics() {

    updateStars();

    moveMainBall();

    moveExtraBalls();

    movePaddle();

    movePowerUps();

    updateParticles();

    updateHitEffect();

    updateFloatingTexts();

    updateCombo();

    paddleCollision();

    brickCollision();

}


// ==========================================
// START / RESUME GAME LOOP
// ==========================================

function startGameLoop() {

    if (!gameRunning || gamePaused) {
        return;
    }

    // Prevent multiple requestAnimationFrame loops.
    if (animationFrameId !== null) {
        return;
    }

    lastFrameTime = performance.now();
    physicsAccumulator = 0;

    animationFrameId = requestAnimationFrame(gameLoop);

}


// ==========================================
// GAME LOOP
// ==========================================

function gameLoop(timestamp) {

    // gameLoop is intended to be used by requestAnimationFrame.
    // If another existing file calls gameLoop() directly, safely start
    // the loop instead of creating a second uncontrolled loop.
    if (typeof timestamp !== "number") {
        animationFrameId = null;
        startGameLoop();
        return;
    }

    animationFrameId = null;

    if (!gameRunning || gamePaused) {
        physicsAccumulator = 0;
        lastFrameTime = timestamp;
        return;
    }

    let frameDelta = timestamp - lastFrameTime;

    if (!Number.isFinite(frameDelta) || frameDelta < 0) {
        frameDelta = 0;
    }

    frameDelta = Math.min(frameDelta, MAX_FRAME_DELTA);
    lastFrameTime = timestamp;
    physicsAccumulator += frameDelta;

    // Run the original physics functions at a fixed 60 Hz.
    // No movement values in ball.js/player.js are changed.
    let safetySteps = 0;

    while (
        physicsAccumulator >= FIXED_STEP &&
        safetySteps < 8 &&
        gameRunning &&
        !gamePaused
    ) {

        updateGamePhysics();

        physicsAccumulator -= FIXED_STEP;
        safetySteps++;

    }


    // ======================================
    // SCREEN SHAKE
    // ======================================

    ctx.save();

    if (screenShake > 0) {

        const shakeX =
            (Math.random() - 0.5) * screenShake;

        const shakeY =
            (Math.random() - 0.5) * screenShake;

        ctx.translate(shakeX, shakeY);

    }


    // ======================================
    // CLEAR
    // ======================================

    ctx.clearRect(
        -10,
        -10,
        canvas.width + 20,
        canvas.height + 20
    );


    // ======================================
    // DRAW
    // ======================================

    drawStars();

    drawBricks();

    drawParticles();

    drawPaddle();

    drawBalls();

    drawPowerUps();

    drawFloatingTexts();

    drawHitFlash();

    ctx.restore();


    if (gameRunning && !gamePaused) {
        animationFrameId = requestAnimationFrame(gameLoop);
    }

}


// ==========================================
// START GAME
// ==========================================

function startGame() {

    initAudio();


    score = 0;

    lives = 3;

    level = 1;

    gamePaused =
        false;


    hitFlash = 0;

    screenShake = 0;


    resetCombo();

    floatingTexts = [];


    updateScore();

    updateLives();

    updateLevel();


    hideAllScreens();


    resetPowerUpEffects();


    applyLevelSettings();

    createBricks();

    resetBall();


    gameRunning =
        true;


    startGameLoop();

}


// ==========================================
// RESTART GAME
// ==========================================

function restartGame() {

    startGame();

}


// ==========================================
// PAUSE BUTTON
// ==========================================

document
    .getElementById("pauseButton")
    .addEventListener(
        "click",
        function () {

            if (gamePaused) {

                resumeGame();

            }
            else {

                pauseGame();

            }

        }
    );


// ==========================================
// RESUME BUTTON
// ==========================================

document
    .getElementById("resumeButton")
    .addEventListener(
        "click",
        resumeGame
    );


// ==========================================
// SOUND BUTTON
// ==========================================

document
    .getElementById("soundButton")
    .addEventListener(
        "click",
        function () {

            soundEnabled =
                !soundEnabled;


            const button =
                document.getElementById(
                    "soundButton"
                );


            if (soundEnabled) {

                button.textContent =
                    "🔊";

                initAudio();

            }
            else {

                button.textContent =
                    "🔇";

            }

        }
    );


// ==========================================
// START BUTTON
// ==========================================

document
    .getElementById("startButton")
    .addEventListener(
        "click",
        startGame
    );


// ==========================================
// RESTART BUTTON
// ==========================================

document
    .getElementById("restartButton")
    .addEventListener(
        "click",
        restartGame
    );


// ==========================================
// NEXT LEVEL BUTTON
// ==========================================

document
    .getElementById("nextLevelButton")
    .addEventListener(
        "click",
        nextLevel
    );


// ==========================================
// KEYBOARD
// ==========================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "ArrowLeft"
        ) {

            paddle.dx =
                -paddle.speed;

        }


        if (
            event.key === "ArrowRight"
        ) {

            paddle.dx =
                paddle.speed;

        }


        if (
            event.code === "Space"
        ) {

            event.preventDefault();


            if (gameRunning) {

                if (gamePaused) {

                    resumeGame();

                }
                else {

                    pauseGame();

                }

            }

        }

    }
);


// ==========================================
// KEYBOARD STOP
// ==========================================

document.addEventListener(
    "keyup",
    function (event) {

        if (

            event.key === "ArrowLeft" ||

            event.key === "ArrowRight"

        ) {

            paddle.dx = 0;

        }

    }
);


// ==========================================
// MOUSE CONTROL
// ==========================================

canvas.addEventListener(
    "mousemove",
    function (event) {

        if (!gameRunning) {

            return;

        }


        const rect =
            canvas.getBoundingClientRect();


        const mouseX =
            event.clientX -
            rect.left;


        const scaleX =
            canvas.width /
            rect.width;


        const actualX =
            mouseX *
            scaleX;


        paddle.x =
            actualX -
            paddle.width / 2;


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
);


// ==========================================
// TOUCH CONTROL
// ==========================================

canvas.addEventListener(
    "touchmove",
    function (event) {

        if (!gameRunning) {

            return;

        }


        event.preventDefault();


        const rect =
            canvas.getBoundingClientRect();


        const touch =
            event.touches[0];


        const touchX =
            touch.clientX -
            rect.left;


        const scaleX =
            canvas.width /
            rect.width;


        const actualX =
            touchX *
            scaleX;


        paddle.x =
            actualX -
            paddle.width / 2;


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

    },
    {
        passive: false
    }
);


// ==========================================
// MOBILE BUTTONS
// ==========================================

const leftButton =
    document.getElementById(
        "leftButton"
    );


const rightButton =
    document.getElementById(
        "rightButton"
    );


function moveLeftStart(event) {

    event.preventDefault();


    if (gameRunning) {

        paddle.dx =
            -paddle.speed;

    }

}


function moveLeftStop(event) {

    event.preventDefault();

    paddle.dx = 0;

}


leftButton.addEventListener(
    "touchstart",
    moveLeftStart,
    {
        passive: false
    }
);


leftButton.addEventListener(
    "touchend",
    moveLeftStop,
    {
        passive: false
    }
);


leftButton.addEventListener(
    "mousedown",
    moveLeftStart
);


leftButton.addEventListener(
    "mouseup",
    moveLeftStop
);


leftButton.addEventListener(
    "mouseleave",
    moveLeftStop
);


function moveRightStart(event) {

    event.preventDefault();


    if (gameRunning) {

        paddle.dx =
            paddle.speed;

    }

}


function moveRightStop(event) {

    event.preventDefault();

    paddle.dx = 0;

}


rightButton.addEventListener(
    "touchstart",
    moveRightStart,
    {
        passive: false
    }
);


rightButton.addEventListener(
    "touchend",
    moveRightStop,
    {
        passive: false
    }
);


rightButton.addEventListener(
    "mousedown",
    moveRightStart
);


rightButton.addEventListener(
    "mouseup",
    moveRightStop
);


rightButton.addEventListener(
    "mouseleave",
    moveRightStop
);


// ==========================================
// INITIAL UI
// ==========================================

updateScore();

updateLives();

updateLevel();