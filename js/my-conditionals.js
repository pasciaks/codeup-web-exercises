"use strict";

/**
 * Uses 'random' and global scope to simulate drinking and getting milk - ends when you run out of milk.
 */

console.log("My Conditionals Started.");

let milk = 2000; // 2000 units

let durationMilliseconds = 1000; // 5 seconds

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
        console.log({message: 'If...'});
        console.log({milk});
    }

    if (random === 1) {
        drinkMilk(1 + Math.random() * 5);
    } else if (random === 2) {
        getMilk(1 + Math.random() * 5);
    } else {
        console.log({message: 'If and else/if...'});
        console.log({milk});
    }

    switch (random) {
        case 1:
            drinkMilk(1 + Math.random() * 5);
            break;
        case 2:
            getMilk(1 + Math.random() * 5);
            break;
        default:
            console.log({message: 'switch...'});
            console.log({milk});
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

let a, message;

a = 1;
message = (a === 1) ? 'A is 1' : 'A is not 1';
console.log({a, message});

a = 2;
message = (a === 1) ? 'A is 1' : 'A is not 1';
console.log({a, message});

