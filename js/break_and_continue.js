/**
 Break and Continue

 Create a file named break_and_continue.js in the js directory.
 Prompt the user for an odd number between 1 and 50. Use a loop and a break statement to continue prompting the user if they enter invalid input.
 Use a loop and the continue statement to output all the odd numbers between 1 and 50, except for the number the user entered.
 */

function isOdd(num) {
    return !isEven(num);
}

function isEven(num) {
    if (typeof num === 'boolean') {
        return false;
    } // booleans can't be odd or even

    if (isNaN(num)) {
        return false;
    }
    if (num == 0) { // 0 is regarded as even
        return true;
    }
    return ((Number(num) % 2) == 0); // even if can divide by 2 evenly
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let jj = 0; jj < 10; jj++) {
    let rInt = getRandomInt(1, 10);
    console.log(rInt);
    console.log(' is even ? ' + isEven(rInt));
}

let min = 1;
let max = 50;
let numberValue = null;

let invalidInput = false;

do {
    numberValue = prompt(`Enter an ODD number between ${min}-${max} ?`).trim();
    invalidInput =
        isEven(numberValue) ||
        isNaN(numberValue) ||
        Number(numberValue) < min ||
        Number(numberValue) > max ||
        numberValue === '' ||
        Number(Math.floor(numberValue)) !== Number(numberValue);

} while (invalidInput)

numberValue = Number(numberValue);

console.log(`Number to skip is ${numberValue}.`);

// ['a', 'e'].forEach((item) => {
//     console.log(item);
// });

for (let j = 1; j <= 50; j++) {
    if (j === numberValue) {
        console.log(`Yikes! Skipping number: ${j}`);
        continue;
    }
    if (isEven(j)) {
        continue;
    }
    console.log(`Here is an odd number: ${j}`);
}

// console.log(isOdd(0));
// console.log(isOdd(2));
// console.log(isOdd(3));
// console.log(isOdd(-3));
// console.log(isOdd(-2));
