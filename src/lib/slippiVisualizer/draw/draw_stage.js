import Vec2D from "../utils/Vec2D";
import { euclideanDist } from "../utils/linAlg";
import { layersBg, layers } from "./draw";

const twoPi = Math.PI * 2;
const bgPos = [
    [-30, 500, 300, 500, 900, 500, 1230, 450, 358],
    [-30, 400, 300, 400, 900, 400, 1230, 350, 179]
];
const direction = [
    [1, -1, 1, -1, 1, -1, 1, -1, 1],
    [-1, 1, -1, 1, -1, 1, -1, 1, -1]
];
let boxFill = "rgba(0, 0, 0, 0.1)";
let boxFillBG = "rgba(0, 0, 0, 0.1)";

const bgStars = [];
for (let p = 0; p < 20; p++) {
    bgStars[p] = new bgStar();
    bgStars[p].pos = new Vec2D(
        600 + 100 * Math.random() * bgStars[p].velocity.x,
        375 + 100 * Math.random() * bgStars[p].velocity.y
    );
}
let bgSparkle = 3;

const circleSize = [];
for (let i = 0; i < 5; i++) {
    circleSize[i] = i * 40;
}
let ang = 0;
let backgroundType = 1;

/*const randall = [new Image(),new Image(),new Image()];
randall[0].src = "assets/stage/randall1.png";
randall[1].src = "assets/stage/randall2.png";
randall[2].src = "assets/stage/randall3.png";*/
let randallTimer = 0;

export function drawStageInit(stage, id) {
    layersBg.get(id).fg1.strokeStyle = "#db80cc";
    layersBg.get(id).fg1.lineWidth = 1;

    for (let j = 0; j < stage.ground.length; j++) {
        layersBg.get(id).fg1.beginPath();
        layersBg
            .get(id)
            .fg1.moveTo(
                stage.ground[j][0].x * stage.scale + stage.offset.x,
                stage.ground[j][0].y * -stage.scale + stage.offset.y
            );
        layersBg
            .get(id)
            .fg1.lineTo(
                stage.ground[j][1].x * stage.scale + stage.offset.x,
                stage.ground[j][1].y * -stage.scale + stage.offset.y
            );
        layersBg.get(id).fg1.closePath();
        layersBg.get(id).fg1.stroke();
    }
    layersBg.get(id).fg1.strokeStyle = "#ed6767";
    for (let j = 0; j < stage.ceiling.length; j++) {
        layersBg.get(id).fg1.beginPath();
        layersBg
            .get(id)
            .fg1.moveTo(
                stage.ceiling[j][0].x * stage.scale + stage.offset.x,
                stage.ceiling[j][0].y * -stage.scale + stage.offset.y
            );
        layersBg
            .get(id)
            .fg1.lineTo(
                stage.ceiling[j][1].x * stage.scale + stage.offset.x,
                stage.ceiling[j][1].y * -stage.scale + stage.offset.y
            );
        layersBg.get(id).fg1.closePath();
        layersBg.get(id).fg1.stroke();
    }

    layersBg.get(id).fg1.strokeStyle = "#4794c6";
    for (let j = 0; j < stage.platform.length; j++) {
        if (
            stage.movingPlats === null ||
            stage.movingPlats === undefined ||
            stage.movingPlats.indexOf(j) === -1
        ) {
            // not a moving platform
            layersBg.get(id).fg1.beginPath();
            layersBg
                .get(id)
                .fg1.moveTo(
                    stage.platform[j][0].x * stage.scale + stage.offset.x,
                    stage.platform[j][0].y * -stage.scale + stage.offset.y
                );
            layersBg
                .get(id)
                .fg1.lineTo(
                    stage.platform[j][1].x * stage.scale + stage.offset.x,
                    stage.platform[j][1].y * -stage.scale + stage.offset.y
                );
            layersBg.get(id).fg1.closePath();
            layersBg.get(id).fg1.stroke();
        }
    }

    layersBg.get(id).fg1.strokeStyle = "#47c648";
    for (let k = 0; k < stage.wallL.length; k++) {
        layersBg.get(id).fg1.beginPath();
        layersBg
            .get(id)
            .fg1.moveTo(
                stage.wallL[k][0].x * stage.scale + stage.offset.x,
                stage.wallL[k][0].y * -stage.scale + stage.offset.y
            );
        layersBg
            .get(id)
            .fg1.lineTo(
                stage.wallL[k][1].x * stage.scale + stage.offset.x,
                stage.wallL[k][1].y * -stage.scale + stage.offset.y
            );
        layersBg.get(id).fg1.closePath();
        layersBg.get(id).fg1.stroke();
    }
    layersBg.get(id).fg1.strokeStyle = "#9867de";
    for (let l = 0; l < stage.wallR.length; l++) {
        layersBg.get(id).fg1.beginPath();
        layersBg
            .get(id)
            .fg1.moveTo(
                stage.wallR[l][0].x * stage.scale + stage.offset.x,
                stage.wallR[l][0].y * -stage.scale + stage.offset.y
            );
        layersBg
            .get(id)
            .fg1.lineTo(
                stage.wallR[l][1].x * stage.scale + stage.offset.x,
                stage.wallR[l][1].y * -stage.scale + stage.offset.y
            );
        layersBg.get(id).fg1.closePath();
        layersBg.get(id).fg1.stroke();
    }
    layersBg.get(id).fg1.strokeStyle = "#E7A44C";
    layersBg.get(id).fg1.lineWidth = 2;
    for (let i = 0; i < stage.ledge.length; i++) {
        const e = stage.ledge[i];
        const pA = stage[e[0]][e[1]][e[2]];
        const pB = stage[e[0]][e[1]][1 - e[2]];
        const ang = Math.atan2(pB.y - pA.y, pB.x - pA.x);
        const magnitude = euclideanDist(pA, pB);
        const length = Math.min(0.4 * magnitude, 20 / stage.scale);
        const pC = new Vec2D(
            pA.x + length * Math.cos(ang),
            pA.y + length * Math.sin(ang)
        );
        layersBg.get(id).fg1.beginPath();
        layersBg
            .get(id)
            .fg1.moveTo(
                pA.x * stage.scale + stage.offset.x,
                pA.y * -stage.scale + stage.offset.y
            );
        layersBg
            .get(id)
            .fg1.lineTo(
                pC.x * stage.scale + stage.offset.x,
                pC.y * -stage.scale + stage.offset.y
            );
        layersBg.get(id).fg1.closePath();
        layersBg.get(id).fg1.stroke();
    }

    stage.drawInit(layersBg.get(id).fg1);
}

const wallColour = [
    "rgb(255,0,40)",
    "rgb(0,255,255)",
    "rgb(125,125,125)",
    "rgb(125,50,255)"
];

function wallColourFromDamageType(damageType) {
    if (damageType === "fire") {
        return wallColour[0];
    } else if (damageType === "electric") {
        return wallColour[1];
    } else if (damageType === "slash") {
        return wallColour[2];
    } else if (damageType === "darkness") {
        return wallColour[3];
    } else {
        return "rgb(0,50,180)";
    }
}

let wallCycle = 0;

function calculateDamageWallColours() {
    let a = 0;
    if (wallCycle < 240) {
        wallCycle++;
        if (wallCycle > 120) {
            a = 240 - wallCycle;
        } else {
            a = wallCycle;
        }
    } else {
        wallCycle = 0;
    }
    const n = Math.round((255 * a) / 120);
    wallColour[0] = "rgb(255," + n + ",40)";
    wallColour[1] = "rgb(" + n + ",255,255)";
    const m = Math.round(125 + n / 2);
    wallColour[2] = "rgb(" + m + "," + m + "," + m + ")";
    wallColour[3] =
        "rgb(" +
        Math.round(125 - n / 3) +
        ",50," +
        Math.round(255 - n / 3) +
        ")";
}

function drawDamageLine(type, can, stage) {
    for (let i = 0; i < stage[type].length; i++) {
        const surfaceProperties = stage[type][i][2];
        if (
            surfaceProperties !== undefined &&
            surfaceProperties.damageType !== null
        ) {
            can.strokeStyle = wallColourFromDamageType(
                surfaceProperties.damageType
            );
            can.beginPath();
            can.moveTo(
                stage[type][i][0].x * stage.scale + stage.offset.x,
                stage[type][i][0].y * -stage.scale + stage.offset.y
            );
            can.lineTo(
                stage[type][i][1].x * stage.scale + stage.offset.x,
                stage[type][i][1].y * -stage.scale + stage.offset.y
            );
            can.stroke();
        }
    }
}

export function drawStage(stage, frame, id) {
    calculateDamageWallColours();
    stage.draw(layersBg.get(id).fg2, frame);
    if (stage.name === "ystory") {
        // Randall
        randallTimer++;
        if (randallTimer === 30) {
            randallTimer = 0;
        }
        //bg2.drawImage(randall[Math.floor(randallTimer/10)],(stage.platform[0][0].x * stage.scale) + stage.offset.x-20, (stage.platform[0][0].y * -stage.scale) + stage.offset.y-20,100,100);
    } else if (
        stage.movingPlats !== null &&
        stage.movingPlats !== undefined &&
        stage.movingPlats.length !== 0
    ) {
        layersBg.get(id).fg2.strokeStyle = "#4794c6";
        for (let i = 0; i < stage.movingPlats.length; i++) {
            if (
                stage.name !== "fountain" ||
                stage.platform[stage.movingPlats[i]][0].y > 0
            ) {
                layersBg.get(id).fg2.beginPath();
                layersBg
                    .get(id)
                    .fg2.moveTo(
                        stage.platform[stage.movingPlats[i]][0].x *
                            stage.scale +
                            stage.offset.x,
                        stage.platform[stage.movingPlats[i]][0].y *
                            -stage.scale +
                            stage.offset.y
                    );
                layersBg
                    .get(id)
                    .fg2.lineTo(
                        stage.platform[stage.movingPlats[i]][1].x *
                            stage.scale +
                            stage.offset.x,
                        stage.platform[stage.movingPlats[i]][1].y *
                            -stage.scale +
                            stage.offset.y
                    );
                layersBg.get(id).fg2.closePath();
                layersBg.get(id).fg2.stroke();
            }
        }
    }
    layersBg.get(id).fg2.fillStyle = boxFill;

    if (stage.box !== null && stage.box !== undefined) {
        for (let j = 0; j < stage.box.length; j++) {
            layersBg
                .get(id)
                .fg2.fillRect(
                    stage.box[j].min.x * stage.scale + stage.offset.x,
                    stage.box[j].max.y * -stage.scale + stage.offset.y,
                    (stage.box[j].max.x - stage.box[j].min.x) * stage.scale,
                    (stage.box[j].max.y - stage.box[j].min.y) * stage.scale
                );
        }
    }
    if (stage.polygon !== null && stage.polygon !== undefined) {
        for (let j = 0; j < stage.polygon.length; j++) {
            const p = stage.polygon[j];
            layersBg.get(id).fg2.beginPath();
            layersBg
                .get(id)
                .fg2.moveTo(
                    p[0].x * stage.scale + stage.offset.x,
                    p[0].y * -stage.scale + stage.offset.y
                );
            for (let n = 1; n < p.length; n++) {
                layersBg
                    .get(id)
                    .fg2.lineTo(
                        p[n].x * stage.scale + stage.offset.x,
                        p[n].y * -stage.scale + stage.offset.y
                    );
            }
            layersBg.get(id).fg2.closePath();
            layersBg.get(id).fg2.fill();
        }
    }
    if (stage.background !== null && stage.background !== undefined) {
        if (
            stage.background.polygon !== null &&
            stage.background.polygon !== undefined
        ) {
            layersBg.get(id).bg2.save();
            layersBg.get(id).bg2.fillStyle = boxFillBG;
            for (let i = 0; i < stage.background.polygon.length; i++) {
                const p = stage.background.polygon[i];
                layersBg.get(id).bg2.beginPath();
                layersBg
                    .get(id)
                    .bg2.moveTo(
                        p[0].x * stage.scale + stage.offset.x,
                        p[0].y * -stage.scale + stage.offset.y
                    );
                for (let n = 1; n < p.length; n++) {
                    layersBg
                        .get(id)
                        .bg2.lineTo(
                            p[n].x * stage.scale + stage.offset.x,
                            p[n].y * -stage.scale + stage.offset.y
                        );
                }
                layersBg.get(id).bg2.closePath();
                layersBg.get(id).bg2.fill();
            }
        }
        if (
            stage.background.line !== null &&
            stage.background.line !== undefined
        ) {
            layersBg.get(id).bg2.lineWidth = 3;
            layersBg.get(id).bg2.strokeStyle = boxFillBG;
            for (let i = 0; i < stage.background.line.length; i++) {
                const lL = stage.background.line[i][0];
                const lR = stage.background.line[i][1];
                layersBg.get(id).bg2.beginPath();
                layersBg
                    .get(id)
                    .bg2.moveTo(
                        lL.x * stage.scale + stage.offset.x,
                        lL.y * -stage.scale + stage.offset.y
                    );
                layersBg
                    .get(id)
                    .bg2.lineTo(
                        lR.x * stage.scale + stage.offset.x,
                        lR.y * -stage.scale + stage.offset.y
                    );
                layersBg.get(id).bg2.closePath();
                layersBg.get(id).bg2.stroke();
            }
            layersBg.get(id).bg2.restore();
        }
    }
    layersBg.get(id).fg2.lineWidth = 4;
    const types = ["wallL", "wallR", "ground", "ceiling"];
    for (let i = 0; i < types.length; i++) {
        drawDamageLine(types[i], layersBg.get(id).fg2, stage);
    }

    layersBg.get(id).fg2.strokeStyle = "#e7a44c";
}

function setBackgroundType(val) {
    backgroundType = val;
}

function bgStar() {
    const vSeed = Math.random();
    this.velocity = new Vec2D(
        5 * vSeed * Math.sign(0.5 - Math.random()),
        5 * (1 - vSeed) * Math.sign(0.5 - Math.random())
    );
    this.colour = "hsl(" + 358 * Math.random() + ", 100%, 50%)";
    this.pos = new Vec2D(0, 0);
    this.life = 0;
}

export function drawBackgroundInit(id) {
    const bgGrad = layersBg.get(id).bg1.createLinearGradient(0, 0, 0, 500);
    bgGrad.addColorStop(0, "rgb(24, 17, 66)");
    bgGrad.addColorStop(1, "black");
    layersBg.get(id).bg1.fillStyle = bgGrad;
    layersBg
        .get(id)
        .bg1.fillRect(
            -100,
            -100,
            layers.get(id).BG1.width + 200,
            layers.get(id).BG1.height + 200
        );
    if (backgroundType === 1) {
        const gridGrad = layersBg
            .get(id)
            .bg2.createRadialGradient(600, 375, 1, 600, 375, 800);
        gridGrad.addColorStop(0, "rgba(94, 173, 255, 0)");
        gridGrad.addColorStop(1, "rgba(94, 173, 255, 0.2)");
        layersBg.get(id).bg2.strokeStyle = gridGrad;
        boxFill = "rgba(94, 173, 255, 0.3)";
        boxFillBG = "rgba(94, 173, 255, 0.25)";
    }
}

export function drawBackground(id) {
    if (backgroundType === 0) {
        drawStars(id);
    } else {
        drawTunnel(id);
    }
}

function drawTunnel(id) {
    layersBg.get(id).bg2.lineWidth = 2;
    ang += 0.005;
    let angB = ang;
    layersBg.get(id).bg2.beginPath();
    for (let i = 0; i < 16; i++) {
        let v = new Vec2D(0, 800);
        v.rotate(angB);
        layersBg.get(id).bg2.moveTo(600, 375);
        layersBg.get(id).bg2.lineTo(600 + v.x, 375 + v.y);
        angB += Math.PI / 8;
    }
    layersBg.get(id).bg2.stroke();
    for (let i = 0; i < circleSize.length; i++) {
        circleSize[i]++;
        if (circleSize[i] > 200) {
            circleSize[i] = 0;
        }
        layersBg.get(id).bg2.lineWidth = Math.max(
            1,
            Math.round(3 * (circleSize[i] / 60))
        );
        layersBg.get(id).bg2.beginPath();
        layersBg.get(id).bg2.arc(600, 375, circleSize[i] * 4, 0, twoPi);
        layersBg.get(id).bg2.closePath();
        layersBg.get(id).bg2.stroke();
    }
}

function drawStars(id) {
    bgSparkle--;
    for (let p = 0; p < 20; p++) {
        if (
            bgStars[p].pos.x > 1250 ||
            bgStars[p].pos.y > 800 ||
            bgStars[p].pos.x < -50 ||
            bgStars[p].pos.y < -50
        ) {
            bgStars[p].pos = new Vec2D(600, 375);
            bgStars[p].life = 0;
            const vSeed = Math.random();
            bgStars[p].velocity = new Vec2D(
                5 * vSeed * Math.sign(0.5 - Math.random()),
                5 * (1 - vSeed) * Math.sign(0.5 - Math.random())
            );
        }
        bgStars[p].pos.x += bgStars[p].velocity.x;
        bgStars[p].pos.y += bgStars[p].velocity.y;

        bgStars[p].life++;

        if (bgSparkle === 0) {
            layersBg.get(id).bg2.fillStyle = bgStars[p].colour;
            layersBg.get(id).bg2.globalAlpha = Math.min(
                bgStars[p].life / 300,
                1
            );
            layersBg.get(id).bg2.beginPath();
            layersBg
                .get(id)
                .bg2.arc(bgStars[p].pos.x, bgStars[p].pos.y, 5, twoPi, 0);
            layersBg.get(id).bg2.fill();
        }
    }
    if (bgSparkle === 0) {
        bgSparkle = 2;
    }
    layersBg.get(id).bg2.globalAlpha = 1;
    for (let k = 1; k > -1; k--) {
        for (let j = 0; j < 9; j++) {
            //bgPos[j] += direction[j]*5*Math.random();
            if (j === 8) {
                bgPos[k][j] += direction[k][j] * 0.2 * Math.random();
            } else {
                bgPos[k][j] += direction[k][j] * 1 * Math.random();
            }
            switch (j) {
                case 0:
                    if (
                        (direction[k][j] === 1 && bgPos[k][j] > -10) ||
                        (direction[k][j] === -1 && bgPos[k][j] < -200)
                    ) {
                        direction[k][j] *= -1;
                    }
                    break;
                case 1:
                    if (
                        (direction[k][j] === 1 &&
                            bgPos[k][j] > 550 - k * 100) ||
                        (direction[k][j] === -1 && bgPos[k][j] < 450 - k * 100)
                    ) {
                        direction[k][j] *= -1;
                    }
                    break;
                case 2:
                    if (
                        (direction[k][j] === 1 && bgPos[k][j] > 550) ||
                        (direction[k][j] === -1 && bgPos[k][j] < 0)
                    ) {
                        direction[k][j] *= -1;
                    }
                    break;
                case 3:
                    if (
                        (direction[k][j] === 1 &&
                            bgPos[k][j] > 550 - k * 100) ||
                        (direction[k][j] === -1 && bgPos[k][j] < 450 - k * 100)
                    ) {
                        direction[k][j] *= -1;
                    }
                    break;
                case 4:
                    if (
                        (direction[k][j] === 1 && bgPos[k][j] > 1150) ||
                        (direction[k][j] === -1 && bgPos[k][j] < 600)
                    ) {
                        direction[k][j] *= -1;
                    }
                    break;
                case 5:
                    if (
                        (direction[k][j] === 1 &&
                            bgPos[k][j] > 550 - k * 100) ||
                        (direction[k][j] === -1 && bgPos[k][j] < 450 - k * 100)
                    ) {
                        direction[k][j] *= -1;
                    }
                    break;
                case 6:
                    if (
                        (direction[k][j] === 1 && bgPos[k][j] > 1400) ||
                        (direction[k][j] === -1 && bgPos[k][j] < 1210)
                    ) {
                        direction[k][j] *= -1;
                    }
                    break;
                case 7:
                    if (
                        (direction[k][j] === 1 &&
                            bgPos[k][j] > 550 - k * 100) ||
                        (direction[k][j] === -1 && bgPos[k][j] < 450 - k * 100)
                    ) {
                        direction[k][j] *= -1;
                    }
                    break;
                case 8:
                    if (
                        (direction[k][j] === 1 && bgPos[k][j] > 357) ||
                        (direction[k][j] === -1 && bgPos[k][j] < 1)
                    ) {
                        direction[k][j] *= -1;
                    }
                    break;
                default:
                    break;
            }
        }
        boxFill =
            "hsla(" + bgPos[k][8] + ", 100%, 50%, " + (0.15 - k * 0.07) + ")";
        boxFillBG =
            "hsla(" + bgPos[k][8] + ", 100%, 50%, " + (0.13 - k * 0.07) + ")";
        layersBg.get(id).bg2.fillStyle = boxFill;
        layersBg.get(id).bg2.beginPath();
        layersBg.get(id).bg2.moveTo(bgPos[k][0], bgPos[k][1]);
        layersBg
            .get(id)
            .bg2.bezierCurveTo(
                bgPos[k][2],
                bgPos[k][3],
                bgPos[k][4],
                bgPos[k][5],
                bgPos[k][6],
                bgPos[k][7]
            );
        if (k === 1) {
            layersBg.get(id).bg2.lineTo(bgPos[0][6], bgPos[0][7]);
            layersBg
                .get(id)
                .bg2.bezierCurveTo(
                    bgPos[0][4],
                    bgPos[0][5],
                    bgPos[0][2],
                    bgPos[0][3],
                    bgPos[0][0],
                    bgPos[0][1]
                );
        } else {
            layersBg.get(id).bg2.lineTo(1200, 750);
            layersBg.get(id).bg2.lineTo(0, 750);
        }
        layersBg.get(id).bg2.closePath();
        layersBg.get(id).bg2.fill();
    }
}
