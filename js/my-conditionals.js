"use strict";

console.log("My Conditionals Started.");

let milk = 500;

const drinkMilk = (amount) => {
    milk -= amount;
}

const getMilk = (amount) => {
    milk += amount;
}

const startedAt = Date.now();
let currentTime = Date.now();

do {
    let random = Math.floor(Math.random() * (3 - 1) + 1);

    currentTime = Date.now();
    console.log(new Date().toISOString());

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

    if (random === 1) {
        console.log({milk});
        drinkMilk(1 + Math.random() * 5);
    }
    if (random === 2) {
        console.log({milk});
        getMilk(1 + Math.random() * 5);
    }
    if (random === 3) {
        console.log({milk});
        getMilk(Math.random() * 5);
    }

    if (milk <= 0.0) {
        alert('You ran out of milk!');
        break;
    }

} while (currentTime - startedAt < 3000);

console.log({milk});
console.log(currentTime - startedAt);