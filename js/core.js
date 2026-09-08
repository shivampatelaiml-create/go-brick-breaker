// ==========================================
// CORE GAME SETUP
// ==========================================

const canvas =
    document.getElementById("gameCanvas");

const ctx =
    canvas.getContext("2d");


canvas.width = 800;
canvas.height = 500;


// ==========================================
// GAME VARIABLES
// ==========================================

let score = 0;

let lives = 3;

let level = 1;

let gameRunning = false;

let gamePaused = false;

const MAX_LIVES = 5;


// ==========================================
// HIGH SCORE
// ==========================================

let highScore =
    Number(
        localStorage.getItem(
            "brickBreakerHighScore"
        )
    ) || 0;


// ==========================================
// SOUND
// ==========================================

let soundEnabled = true;

let audioContext = null;


// ==========================================
// SPACE STARS
// ==========================================

let stars = [];

const STAR_COUNT = 90;


// ==========================================
// CREATE STARS
// ==========================================

function createStars() {

    stars = [];


    for (
        let i = 0;
        i < STAR_COUNT;
        i++
    ) {

        stars.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            size:
                Math.random() *
                1.8 +
                0.4,

            speed:
                Math.random() *
                0.35 +
                0.05,

            opacity:
                Math.random() *
                0.7 +
                0.3

        });

    }

}


// ==========================================
// UPDATE STARS
// ==========================================

function updateStars() {

    for (
        const star of stars
    ) {

        star.y += star.speed;


        if (
            star.y > canvas.height
        ) {

            star.y = 0;

            star.x =
                Math.random() *
                canvas.width;

        }

    }

}


// ==========================================
// DRAW STARS
// ==========================================

function drawStars() {

    for (
        const star of stars
    ) {

        ctx.globalAlpha =
            star.opacity;

        ctx.fillStyle =
            "#ffffff";

        ctx.beginPath();

        ctx.arc(

            star.x,

            star.y,

            star.size,

            0,

            Math.PI * 2

        );

        ctx.fill();

    }


    ctx.globalAlpha = 1;

}


// ==========================================
// INITIALIZE STARS
// ==========================================

createStars();