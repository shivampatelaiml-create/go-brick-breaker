const brick = {
    rows: 5,
    columns: 10,
    width: 65,
    height: 22,
    padding: 10,
    offsetTop: 60,
    offsetLeft: 25
};

let bricks = [];
let brickPositions = [];


// ==========================================
// CREATE BRICKS
// ==========================================

function createBricks() {

    bricks = [];
    brickPositions = [];

    const totalRows =
        Math.min(
            brick.rows + (level - 1),
            8
        );


    for (let row = 0; row < totalRows; row++) {

        bricks[row] = [];

        brickPositions[row] = [];


        for (
            let column = 0;
            column < brick.columns;
            column++
        ) {

            let type = "normal";
            let hits = 1;


            // STRONG BRICK
            if (
                level >= 2 &&
                (row + column) % 7 === 0
            ) {

                type = "strong";
                hits = 2;

            }


            // BONUS BRICK
            if (
                level >= 3 &&
                row === 1 &&
                column % 4 === 1
            ) {

                type = "bonus";
                hits = 1;

            }


            // EXPLOSIVE BRICK
            if (
                level >= 4 &&
                row === 2 &&
                column % 5 === 2
            ) {

                type = "explosive";
                hits = 1;

            }


            bricks[row][column] = {

                visible: true,

                type: type,

                hits: hits,

                maxHits: hits

            };


            brickPositions[row][column] = {

                x:
                    brick.offsetLeft +
                    column *
                    (
                        brick.width +
                        brick.padding
                    ),

                y:
                    brick.offsetTop +
                    row *
                    (
                        brick.height +
                        brick.padding
                    )

            };

        }

    }

}


// ==========================================
// BRICK COLOR
// ==========================================

function getBrickColor(
    type,
    row
) {

    if (type === "strong") {

        return "#9b5cff";

    }


    if (type === "bonus") {

        return "#ffeb3b";

    }


    if (type === "explosive") {

        return "#ff3d5a";

    }


    const colors = [

        "#00e5ff",
        "#00b8ff",
        "#0088ff",
        "#2979ff",
        "#651fff",
        "#aa00ff",
        "#d500f9",
        "#ff00aa"

    ];


    return colors[
        row % colors.length
    ];

}


// ==========================================
// DRAW SINGLE BRICK
// ==========================================

function drawSingleBrick(
    currentBrick,
    x,
    y
) {

    if (
        !currentBrick.visible
    ) {

        return;

    }


    const color =
        getBrickColor(
            currentBrick.type,
            y
        );


    ctx.save();


    // GLOW

    ctx.shadowBlur = 15;

    ctx.shadowColor =
        color;


    // GRADIENT

    const gradient =
        ctx.createLinearGradient(
            x,
            y,
            x,
            y + brick.height
        );


    gradient.addColorStop(
        0,
        "#ffffff"
    );


    gradient.addColorStop(
        0.12,
        color
    );


    gradient.addColorStop(
        1,
        color
    );


    ctx.fillStyle =
        gradient;


    // BODY

    ctx.beginPath();

    ctx.roundRect(
        x,
        y,
        brick.width,
        brick.height,
        5
    );

    ctx.fill();


    // TOP SHINE

    ctx.shadowBlur = 0;

    ctx.fillStyle =
        "rgba(255,255,255,0.45)";


    ctx.beginPath();

    ctx.roundRect(
        x + 4,
        y + 3,
        brick.width - 8,
        3,
        2
    );

    ctx.fill();


    // BOTTOM EDGE

    ctx.fillStyle =
        "rgba(0,0,0,0.22)";


    ctx.fillRect(
        x + 4,
        y + brick.height - 4,
        brick.width - 8,
        2
    );


    // SPECIAL BRICK TEXT

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.font =
        "bold 11px Arial";


    if (
        currentBrick.type ===
        "strong"
    ) {

        ctx.fillStyle =
            "#ffffff";


        ctx.fillText(

            currentBrick.hits,

            x + brick.width / 2,

            y + brick.height / 2 + 1

        );

    }


    if (
        currentBrick.type ===
        "bonus"
    ) {

        ctx.fillStyle =
            "#111111";


        ctx.fillText(

            "+5",

            x + brick.width / 2,

            y + brick.height / 2 + 1

        );

    }


    if (
        currentBrick.type ===
        "explosive"
    ) {

        ctx.fillStyle =
            "#ffffff";


        ctx.font =
            "bold 15px Arial";


        ctx.fillText(

            "✦",

            x + brick.width / 2,

            y + brick.height / 2 + 1

        );

    }


    ctx.restore();

}


// ==========================================
// DRAW ALL BRICKS
// ==========================================

function drawBricks() {

    for (
        let row = 0;
        row < bricks.length;
        row++
    ) {

        for (
            let column = 0;
            column < bricks[row].length;
            column++
        ) {

            const currentBrick =
                bricks[row][column];


            if (
                !currentBrick.visible
            ) {

                continue;

            }


            const x =
                brick.offsetLeft +
                column *
                (
                    brick.width +
                    brick.padding
                );


            const y =
                brick.offsetTop +
                row *
                (
                    brick.height +
                    brick.padding
                );


            brickPositions[row][column] = {

                x: x,

                y: y

            };


            drawSingleBrick(

                currentBrick,

                x,

                y

            );

        }

    }

}


// ==========================================
// EXPLOSION
// ==========================================

function explodeNearbyBricks(
    hitRow,
    hitColumn
) {

    for (
        let row = hitRow - 1;
        row <= hitRow + 1;
        row++
    ) {

        for (
            let column = hitColumn - 1;
            column <= hitColumn + 1;
            column++
        ) {

            if (
                row < 0 ||
                row >= bricks.length ||
                column < 0 ||
                column >= bricks[row].length
            ) {

                continue;

            }


            // CENTER BRICK SKIP

            if (
                row === hitRow &&
                column === hitColumn
            ) {

                continue;

            }


            const target =
                bricks[row][column];


            if (
                !target ||
                !target.visible
            ) {

                continue;

            }


            target.visible =
                false;


            const position =
                brickPositions[row][column];


            if (position) {

                createParticles(

                    position.x +
                    brick.width / 2,

                    position.y +
                    brick.height / 2,

                    getBrickColor(
                        target.type,
                        row
                    )

                );


                createBrickHitEffect(

                    position.x +
                    brick.width / 2,

                    position.y +
                    brick.height / 2

                );


                // Explosion bricks give
                // normal combo points.

                registerBrickHit(

                    1,

                    position.x +
                    brick.width / 2,

                    position.y +
                    brick.height / 2

                );

            }

        }

    }

}


// ==========================================
// BRICK COLLISION
// ==========================================

function checkBrickCollision(
    currentBall
) {

    for (
        let row = 0;
        row < bricks.length;
        row++
    ) {

        for (
            let column = 0;
            column < bricks[row].length;
            column++
        ) {

            const currentBrick =
                bricks[row][column];


            if (
                !currentBrick.visible
            ) {

                continue;

            }


            const position =
                brickPositions[row][column];


            if (!position) {

                continue;

            }


            const x =
                position.x;

            const y =
                position.y;


            // ==================================
            // COLLISION
            // ==================================

            if (

                currentBall.x +
                currentBall.radius >
                x &&

                currentBall.x -
                currentBall.radius <
                x + brick.width &&

                currentBall.y +
                currentBall.radius >
                y &&

                currentBall.y -
                currentBall.radius <
                y + brick.height

            ) {

                currentBall.dy *= -1;


                const centerX =
                    x +
                    brick.width / 2;


                const centerY =
                    y +
                    brick.height / 2;


                // ==================================
                // STRONG BRICK
                // ==================================

                if (
                    currentBrick.type ===
                    "strong"
                ) {

                    currentBrick.hits--;


                    createParticles(

                        centerX,

                        centerY,

                        "#ffffff"

                    );


                    createBrickHitEffect(

                        centerX,

                        centerY

                    );


                    // Still alive

                    if (
                        currentBrick.hits > 0
                    ) {

                        brickSound();

                        return true;

                    }

                }


                // ==================================
                // DESTROY BRICK
                // ==================================

                currentBrick.visible =
                    false;


                createParticles(

                    centerX,

                    centerY,

                    getBrickColor(
                        currentBrick.type,
                        row
                    )

                );


                createBrickHitEffect(

                    centerX,

                    centerY

                );


                // ==================================
                // SCORE
                // ==================================

                let basePoints = 1;


                if (
                    currentBrick.type ===
                    "bonus"
                ) {

                    basePoints = 5;

                }


                registerBrickHit(

                    basePoints,

                    centerX,

                    centerY

                );


                brickSound();


                // ==================================
                // EXPLOSIVE
                // ==================================

                if (
                    currentBrick.type ===
                    "explosive"
                ) {

                    explodeNearbyBricks(

                        row,

                        column

                    );

                }


                // ==================================
                // POWER UP
                // ==================================

                createPowerUp(

                    centerX -
                    POWERUP_SIZE / 2,

                    centerY

                );


                return true;

            }

        }

    }


    return false;

}


// ==========================================
// CHECK ALL BRICKS
// ==========================================

function brickCollision() {

    checkBrickCollision(
        ball
    );


    for (
        const extraBall of balls
    ) {

        checkBrickCollision(
            extraBall
        );

    }


    // ==================================
    // REMAINING BRICKS
    // ==================================

    let remaining =
        0;


    for (
        let row = 0;
        row < bricks.length;
        row++
    ) {

        for (
            let column = 0;
            column < bricks[row].length;
            column++
        ) {

            if (
                bricks[row][column].visible
            ) {

                remaining++;

            }

        }

    }


    if (
        remaining === 0
    ) {

        levelComplete();

    }

}


// ==========================================
// INITIAL BRICKS
// ==========================================

createBricks();