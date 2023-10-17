"use strict";

/* ########################################################################## */

function analyzeColorOriginal(whichColor = '') {
    whichColor = whichColor.toLowerCase();
    if (whichColor === 'red') {
        return `Strawberries are red.`;
    } else if (whichColor === 'blue') {
        return `Blue is the color of the sky.`;
    } else {
        return `I don't know anything about ${whichColor}.`;
    }
}

function analyzeColor(whichColor = '') {
    whichColor = whichColor.toLowerCase();
    let response = '';
    switch (whichColor) {
        case 'red':
            response = 'Roses are ...[' + whichColor + ']';
            break;
        case 'white':
            response = 'Clouds are ...[' + whichColor + ']';
            break;
        case 'blue':
            response = 'Sadness is ...[' + whichColor + ']';
            break;
        default:
            response = 'Your color is ...[' + whichColor + ']';
    }
    return response
}

let r1 = analyzeColor('BLUE');
let r2 = analyzeColor('red');
let r3 = analyzeColor('CYAN');
console.log({r1, r2, r3});

/**
 * TODO:
 * Create a function named `analyzeColor` that accepts a string that is a color
 * name as input. This function should return a message which relates to the
 * color stated in the argument of the function. For colors you do not have
 * responses written for, return a string stating so
 *
 * Example:
 *  > analyzeColor('blue') // returns "blue is the color of the sky"
 *  > analyzeColor('red') // returns "Strawberries are red"
 *
 *
 *  > analyzeColor('cyan') // returns "I don't know anything about cyan"
 *
 * You should use an if-else-if-else block to return different messages.
 *
 * Test your function by passing various string literals to it and
 * console.logging the function's return value
 */

let test1 = analyzeColorOriginal('red');
let test2 = analyzeColorOriginal('RED');
let test3 = analyzeColorOriginal('blue');
let test4 = analyzeColorOriginal('cyan');
console.log({test1, test2, test3, test4})

let t1 = analyzeColor('red');
let t2 = analyzeColor('RED');
let t3 = analyzeColor('blue');
let t4 = analyzeColor('cyan');
console.log({t1, t2, t3, t4});

// Don't change the next two lines!
// These lines create two variables for you:
// - `colors`: a list of the colors of the rainbow
// - `randomColor`: contains a single random color value from the list (this
//                  will contain a different color every time the page loads)
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
const randomColor = colors[Math.floor(Math.random() * colors.length)];

console.log(`Analyzing ${randomColor}...`);
console.log(analyzeColor(randomColor));
/**
 * TODO:
 * Pass the `randomColor` variable to your 'analyzeColor' function and console.log the results.
 * You should see a different message every time you refresh the page
 */

console.log(`Analyzing ${randomColor}...`);
console.log(analyzeColor(randomColor));

/**
 * TODO:
 * Comment out the code above, and refactor your function to use a switch-case statement
 * NOTE: Instead... I created an alternate version of the function and renamed them appropriately.
 */

console.log(`Analyzing ${randomColor}...`);
console.log(analyzeColor(randomColor));
/**
 * TODO:
 * Prompt the user for a color when the page loads, and pass the input from the
 * user to your `analyzeColor` function. Alert the return value from your
 * function to show it to the user.
 */

try {
    let choice = prompt("What color would you like to evaluate ?", "blue");
    let yourChoiceResult = analyzeColor(choice);
    alert("Your result: " + yourChoiceResult);
} catch {
    console.log("Probably running in IntelliJ! .js code runner, alert will error if not on webpage.");
}


/* ########################################################################## */

/**
 * TODO:
 * Suppose there's a promotion in Walmart, each customer is given a randomly
 * generated "lucky number" between 0 and 5. If your lucky number is 0 you have
 * no discount, if your lucky number is 1 you'll get a 10% discount, if it's 2,
 * the discount is 25%, if it's 3, 35%, if it's 4, 50%, and if it's 5 you'll get
 * everything for free!.
 *
 * Write a function named `calculateTotal` which accepts a lucky number and total
 * amount, and returns the discounted price.
 *
 * Example:
 * calculateTotal(0, 100) // returns 100
 * calculateTotal(4, 100) // returns 50
 * calculateTotal(5, 100) // returns 0
 *
 * Test your function by passing it various values and checking for the expected
 * return value.
 */

function calculateTotal(luckyNumber, amount) {
    let discountPercentage = 0;
    if (luckyNumber === 1) {
        discountPercentage = .1;
    } else if (luckyNumber === 2) {
        discountPercentage = .25;
    } else if (luckyNumber === 3) {
        discountPercentage = .35;
    } else if (luckyNumber === 4) {
        discountPercentage = .5;
    } else if (luckyNumber === 5) {
        discountPercentage = 1;
    } else {
        discountPercentage = 0;
    }

    console.log(`Your lucky number is ${luckyNumber}, and your percentage discount is ${discountPercentage}.`);
    return amount - (discountPercentage * amount);
}

function calculateTotalObjectReturned(luckyNumber, amount) {
    let discountPercentage = 0;
    if (luckyNumber === 1) {
        discountPercentage = .1;
    } else if (luckyNumber === 2) {
        discountPercentage = .25;
    } else if (luckyNumber === 3) {
        discountPercentage = .35;
    } else if (luckyNumber === 4) {
        discountPercentage = .5;
    } else if (luckyNumber === 5) {
        discountPercentage = 1;
    } else {
        discountPercentage = 0;
    }
    console.log("Using discount Percentage: " + discountPercentage);
    return {
        newAmount: amount - (discountPercentage * amount),
        luckyNumber,
        originalAmount: amount,
        discountPercentage,
        discountAmount: (discountPercentage * amount)
    }
}

console.log(calculateTotal(0, 100));
console.log(calculateTotal(4, 100));
console.log(calculateTotal(5, 100));


/**
 * TODO:
 * Uncomment the line below to generate a random number between 0 and 5.
 * (In this line of code, 0 is inclusive, and 6 is exclusive)
 * Prompt the user for their total bill, then use your `calculateTotal` function
 * and alerts to display to the user what their lucky number was, what their
 * price before the discount was, and what their price after the discount is.
 */
// Generate a random number between 0 and 6
const luckyNumber = Math.floor(Math.random() * 6);
let totalBill = prompt("What total bill to use ?", "100");
totalBill = Number(totalBill);
if (isNaN(totalBill) || totalBill === null || totalBill <= 0) {
    alert("You didn't enter a valid amount. Using 100 for default.");
    totalBill = 100;
}
let totalAfterRandomDiscount = calculateTotal(luckyNumber, Number(totalBill));
alert(`Your lucky number ${luckyNumber} gave you a discount, your new price is ${totalAfterRandomDiscount.toFixed(2)}!`);

console.log(calculateTotalObjectReturned(luckyNumber, 55));

/**
 * TODO:
 * Write some JavaScript that uses a `confirm` dialog to ask the user if they
 * would like to enter a number. If they click 'Ok', prompt the user for a
 * number, then use 3 separate alerts to tell the user:
 *
 * - whether the number is even or odd
 * - what the number plus 100 is
 * - if the number is negative or positive
 *
 * Do *NOT* display any of the above information
 * if the user enters a value that is not of the number data type.
 * Instead, use an alert to inform them of the incorrect input data type.
 *
 *
 * Can you refactor your code to use functions?
 * HINT: The way we prompt for a value could be improved
 */
let confirmResponse = confirm("Would you like to enter a number?");

if (confirmResponse) {
    let aNumber = prompt("What number?", "22");
    if (!isNaN(aNumber) && aNumber != null && aNumber != '') { // Added this extra special check, if they hit cancel on # entry
        alert(`The number isEven(${aNumber}) returned ${isEven(aNumber)}`);
        alert(`The number addOneHundred(${aNumber}) returned ${addOneHundred(aNumber)}`);
        alert(`The number positiveOrNegative(${aNumber}) returned ${positiveOrNegative(aNumber)}`);
    } else {
        alert("You didn't enter a valid number.");
    }
}

/**
 *
 * @param num
 * @returns {boolean}
 */
function isEven(num) {
    return (Number(num) % 2 === 0);
}

/**
 *
 * @param num
 * @returns {number}
 */
function addOneHundred(num) {
    return Number(num) + 100;
}

/**
 *
 * @param num
 * @returns {string}
 */
function positiveOrNegative(num) {
    if (Number(num) < 0) {
        return '-';
    } else if (Number(num) > 0) {
        return '+';
    } else {
        return '0';
    }
}

/**
 * Prompts a user for a number
 * Note, normalizes null if no number, or not a valid number received.
 * Note, returns the value as a Number type
 * @param min - not yet implemented
 * @param max - not yet implemented
 * @returns {number|null}
 */
const getNumber = (min, max) => {
    let numberValue = prompt("What number?");

    try {
        numberValue = numberValue.trim();
    } catch {
        numberValue = null;
    }

    if (isNaN(Number(numberValue))) {
        console.log("isNaN");
        return null;
    }
    if (numberValue === '') {
        console.log("is empty");
        return null;
    }
    if (numberValue === null) {
        console.log("is null");
        return null;
    }

    return Number(numberValue);

}

const askForConfirm = () => {
    return confirm(`Would you like to add a number?`);
}

const evaluateNumber = (aNumber) => {
    alert(`The number isEven(${aNumber}) returned ${isEven(aNumber)}`);
    alert(`The number addOneHundred(${aNumber}) returned ${addOneHundred(aNumber)}`);
    alert(`The number positiveOrNegative(${aNumber}) returned ${positiveOrNegative(aNumber)}`);
    return true;
}

const showMessage = (message) => {
    alert(message);
    return null;
}

/**
 * This will continually loop until they cancel when asked if they want to add a number.
 */
while (askForConfirm()) {
    let aNumber = getNumber(-Infinity, Infinity); // prompt for a user entered number
    if (aNumber != null) {
        evaluateNumber(aNumber); // if a number was received, evaluate it.
    } else {
        showMessage("You didn't enter a valid number."); // not a valid number, show error message.
    }
}