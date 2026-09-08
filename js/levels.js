// ==========================================
// LEVEL SETTINGS
// ==========================================

const LEVEL_SETTINGS = {

    1: {
        rows: 5,
        ballSpeed: 1.5
    },

    2: {
        rows: 6,
        ballSpeed: 1.8
    },

    3: {
        rows: 7,
        ballSpeed: 2.1
    },

    4: {
        rows: 8,
        ballSpeed: 2.4
    },

    5: {
        rows: 8,
        ballSpeed: 2.7
    }

};


// ==========================================
// GET LEVEL SPEED
// ==========================================

function getLevelSpeed() {

    let speed =
        1.5 +
        (level - 1) * 0.3;


    if (
        speed > 3.5
    ) {

        speed = 3.5;

    }


    return speed;

}


// ==========================================
// GET LEVEL ROWS
// ==========================================

function getLevelRows() {

    if (
        LEVEL_SETTINGS[level]
    ) {

        return LEVEL_SETTINGS[level].rows;

    }


    return 8;

}


// ==========================================
// APPLY LEVEL SETTINGS
// ==========================================

function applyLevelSettings() {

    brick.rows =
        getLevelRows();

}