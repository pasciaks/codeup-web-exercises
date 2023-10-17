"use strict";

console.log("My Conditionals Started.");

let milk = 2000;

const drinkMilk = (amount) => {
    milk -= amount;
}

const getMilk = (amount) => {
    milk += amount;
}

const startedAt = Date.now();
let currentTime = Date.now();

do {

    let random = Math.floor(Math.random() * (3) + 1);

    currentTime = Date.now();

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

} while ((currentTime - startedAt) < 3000);

console.log({milk});

console.log(currentTime - startedAt);
