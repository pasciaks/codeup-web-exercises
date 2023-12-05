"use strict";

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function rollD6() {
    return randomNumber(1, 6);
}

function rollD20() {
    return randomNumber(1, 20);
}

export {randomNumber, rollD6, rollD20};