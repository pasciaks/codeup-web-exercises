"use strict";

console.log("My Conditionals Started.");

let milk = 2000;
let durationMilliseconds = 3000;

const drinkMilk = (amount = 0) => {
    milk -= amount;
}

const getMilk = (amount = 0) => {
    milk += amount;
}

let currentTime = Date.now();

const startedAt = Date.now();

do {

    let random = Math.floor(Math.random() * (3) + 1);

    console.log(`Random number: [${random}]`);

    if (random === 1) {
        drinkMilk(1 + Math.random() * 5);
    }
    if (random === 2) {
        getMilk(1 + Math.random() * 5);
    }
    if (random === 3) {
        console.log({milk});
    }

    if (random === 1) {

    } else if (random === 2) {

    } else {

    }

    switch (random) {
        case 1:
            break;
        case 2:
            break;
        default:
            break;
    }

    if (milk <= 0.0) {
        alert('You ran out of milk!');
        break;
    }

    currentTime = Date.now();

} while ((currentTime - startedAt) < durationMilliseconds);

console.log({milk});
console.log(currentTime - startedAt);
