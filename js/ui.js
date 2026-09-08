// ==========================================
// UI ELEMENTS
// ==========================================

const levelElement =
    document.getElementById("level");

const scoreElement =
    document.getElementById("score");

const highScoreElement =
    document.getElementById("highScore");

const livesElement =
    document.getElementById("lives");


// ==========================================
// POWER-UP HUD ELEMENTS
// ==========================================

const powerUpStatus =
    document.getElementById("powerUpStatus");

const powerUpName =
    document.getElementById("powerUpName");


// ==========================================
// GAME SCREENS
// ==========================================

const startScreen =
    document.getElementById("startScreen");

const pauseScreen =
    document.getElementById("pauseScreen");

const gameOverScreen =
    document.getElementById("gameOverScreen");

const winScreen =
    document.getElementById("winScreen");


// ==========================================
// HOW TO PLAY ELEMENTS
// ==========================================

const howToPlayScreen =
    document.getElementById("howToPlayScreen");

const howToPlayButton =
    document.getElementById("howToPlayButton");

const backButton =
    document.getElementById("backButton");


// ==========================================
// MAIN MENU ELEMENTS
// ==========================================

const menuButton =
    document.getElementById("menuButton");

const menuConfirmScreen =
    document.getElementById("menuConfirmScreen");

const cancelMenuButton =
    document.getElementById("cancelMenuButton");

const confirmMenuButton =
    document.getElementById("confirmMenuButton");


// ==========================================
// GAME OVER ELEMENTS
// ==========================================

const finalScoreElement =
    document.getElementById("finalScore");

const gameOverHighScoreElement =
    document.getElementById(
        "gameOverHighScore"
    );


// ==========================================
// MENU STATE
// ==========================================

// Ye batayega ki confirmation kholne
// se pehle game chal raha tha ya nahi.

let menuReturnWasRunning = false;


// ==========================================
// POWER-UP HUD STATE
// ==========================================

let powerUpTimer = null;


// ==========================================
// SHOW POWER-UP STATUS
// ==========================================

function showPowerUpStatus(name) {

    if (!powerUpStatus || !powerUpName) {
        return;
    }


    // Purana timer clear karo
    if (powerUpTimer) {

        clearTimeout(powerUpTimer);

        powerUpTimer = null;

    }


    // Power-up name set karo
    powerUpName.textContent =
        name;


    // HUD show karo
    powerUpStatus.classList.remove(
        "hidden"
    );


    // LIFE ko thodi der ke liye dikhao
    // WIDE / MULTI ke liye baad me
    // duration system add karenge.

    if (name === "EXTRA LIFE") {

        powerUpTimer = setTimeout(
            function () {

                hidePowerUpStatus();

            },
            1800
        );

    }

}


// ==========================================
// HIDE POWER-UP STATUS
// ==========================================

function hidePowerUpStatus() {

    if (!powerUpStatus) {
        return;
    }


    powerUpStatus.classList.add(
        "hidden"
    );


    if (powerUpTimer) {

        clearTimeout(powerUpTimer);

        powerUpTimer = null;

    }

}


// ==========================================
// UPDATE SCORE
// ==========================================

function updateScore() {

    scoreElement.textContent =
        score;


    if (score > highScore) {

        highScore =
            score;


        localStorage.setItem(
            "brickBreakerHighScore",
            highScore
        );


        highScoreElement.textContent =
            highScore;

    }

}


// ==========================================
// UPDATE LIVES
// ==========================================

function updateLives() {

    livesElement.textContent =
        lives;

}


// ==========================================
// UPDATE LEVEL
// ==========================================

function updateLevel() {

    levelElement.textContent =
        level;

}


// ==========================================
// HIDE ALL SCREENS
// ==========================================

function hideAllScreens() {

    startScreen.classList.add(
        "hidden"
    );

    pauseScreen.classList.add(
        "hidden"
    );

    gameOverScreen.classList.add(
        "hidden"
    );

    winScreen.classList.add(
        "hidden"
    );

    howToPlayScreen.classList.add(
        "hidden"
    );

    menuConfirmScreen.classList.add(
        "hidden"
    );

}


// ==========================================
// START SCREEN
// ==========================================

function showStartScreen() {

    hideAllScreens();

    hidePowerUpStatus();


    startScreen.classList.remove(
        "hidden"
    );

}


// ==========================================
// HOW TO PLAY SCREEN
// ==========================================

function showHowToPlay() {

    hideAllScreens();

    hidePowerUpStatus();


    howToPlayScreen.classList.remove(
        "hidden"
    );

}


// ==========================================
// HOW TO PLAY BUTTON
// ==========================================

howToPlayButton.addEventListener(
    "click",
    showHowToPlay
);


// ==========================================
// BACK BUTTON
// ==========================================

backButton.addEventListener(
    "click",
    showStartScreen
);


// ==========================================
// MAIN MENU CONFIRMATION
// ==========================================

function showMenuConfirmation() {

    // Check karo game chal raha tha ya nahi
    menuReturnWasRunning =
        gameRunning;


    // Game temporarily stop
    gameRunning = false;


    // Baaki screens hide
    hideAllScreens();


    // Power-up HUD hide
    hidePowerUpStatus();


    // Confirmation screen show
    menuConfirmScreen.classList.remove(
        "hidden"
    );

}


// ==========================================
// MAIN MENU BUTTON
// ==========================================

menuButton.addEventListener(
    "click",
    showMenuConfirmation
);


// ==========================================
// CANCEL MAIN MENU
// ==========================================

cancelMenuButton.addEventListener(
    "click",
    function () {

        // Confirmation hide
        menuConfirmScreen.classList.add(
            "hidden"
        );


        // Agar game confirmation se pehle
        // chal raha tha to game resume karo.

        if (menuReturnWasRunning) {

            gameRunning = true;

            startGameLoop();

        }

        else {

            // Agar game paused tha,
            // to pause screen wapas dikhao.

            showPauseScreen();

        }

    }
);


// ==========================================
// CONFIRM MAIN MENU
// ==========================================

confirmMenuButton.addEventListener(
    "click",
    function () {

        // Game completely stop
        gameRunning = false;


        // Power-up HUD clear
        hidePowerUpStatus();


        // Main menu show
        showStartScreen();

    }
);


// ==========================================
// PAUSE SCREEN
// ==========================================

function showPauseScreen() {

    pauseScreen.classList.remove(
        "hidden"
    );

}


function hidePauseScreen() {

    pauseScreen.classList.add(
        "hidden"
    );

}


// ==========================================
// GAME OVER SCREEN
// ==========================================

function showGameOverScreen() {

    finalScoreElement.textContent =
        score;


    gameOverHighScoreElement.textContent =
        highScore;


    hidePowerUpStatus();


    gameOverScreen.classList.remove(
        "hidden"
    );

}


// ==========================================
// WIN SCREEN
// ==========================================

function showWinScreen() {

    hidePowerUpStatus();


    winScreen.classList.remove(
        "hidden"
    );

}


// ==========================================
// INITIAL UI
// ==========================================

highScoreElement.textContent =
    highScore;

updateScore();
updateLives();
updateLevel();