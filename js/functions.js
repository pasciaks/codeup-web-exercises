"use strict";

/**
 * Just a function to self run and test the other functions
 * Note that 'hoisting' allows this early declared function to call the others
 */
function selfTests() {

    console.log(sayHello()); // Hello, !
    console.log(sayHello(1)); // Hello, 1!
    console.log(sayHello('Test')); // Hello, Test!

    console.log(isTwo()); // false
    console.log(isTwo(.2)); // false
    console.log(isTwo(2)); // true
    console.log(isTwo('2')); // true

    console.log(calculateTip(.1, 100)); // 10

    console.log(applyDiscount(100, 0.10)); // 90

    // ------------------------ extra special, spicy! ------------------------
    let listOfNumbers = [];
    for (let i = 0; i < 10; i++) {
        listOfNumbers.push(generateRandom(1, 10));
    }
    console.log(listOfNumbers);
    // ------------------------ extra special, spicy! ------------------------

}

selfTests();

/**
 * TODO:
 * Create a function called 'sayHello' that takes a parameter 'name'.
 * When called, the function should return a message that says hello to the passed in name.
 *
 * Example
 * > sayHello("codeup") // returns "Hello, codeup!"
 */

/**
 * sayHello - returns a string that says Hello, including the passed in name
 * @param name - Default's to empty string
 * @returns {string} - Example output 'Hello, Sheldon!'
 */
function sayHello(name = "") {
    console.debug("Debugging purpose only, default name set to empty string.");
    console.debug(name);
    console.debug("Debugging purpose only, default name set to empty string.");
    return `Hello, ${name}!`;
}

/**
 * TODO:
 * Call the function 'sayHello' and pass your name as a string literal argument.
 * Store the result of the function call in a variable named 'helloMessage'.
 *
 * console.log 'helloMessage' to check your work
 */

let helloMessage = sayHello("Sheldon");
console.log(helloMessage);

/**
 * TODO:
 * Store your name as a string in a variable named 'myName', and pass that
 * variable to the 'sayHello' function. You should see the same output in the
 * console.
 */

let myName = "Sheldon";
helloMessage = sayHello(myName);
console.log(helloMessage);

// Don't modify the following line, it generates a random number between 1 and 3
// and stores it in a variable named random
const random = Math.floor((Math.random() * 3) + 1);

/**
 * generateRandom - Return random integer in range of  >= min <= max
 * @param min
 * @param max
 * @returns {number}
 */
function generateRandom(min, max) {
    return Math.floor((Math.random() * Number(max)) + Number(min));
}

/**
 * TODO:
 * Create a function called 'isTwo' that takes a number as a parameter.
 * The function should return a boolean value based on whether or not the passed
 * number is the number 2.
 *
 * Example
 * > isTwo(1) // returns false
 * > isTwo(2) // returns true
 * > isTwo(3) // returns false
 *
 * Call the function 'isTwo' passing the variable 'random' as a argument.
 *
 * console.log *outside of the function* to check your work (you should see a
 * different result everytime you refresh the page if you are using the random
 * number)
 */

/**
 * isTwo - evaluates a passed in value to determine if it is the number 2
 * @param num
 * @returns {boolean}
 */
function isTwo(num) {
    console.debug("Debugging purpose only...");
    console.debug({num});
    console.debug("Debugging purpose only...");
    return Number(num) === 2;
}

let isTwoResult = isTwo(random);
console.log(`The number ${random} was checked, and the isTwo function returned ${isTwoResult}.`);

/**
 * TODO:
 * Create a function named 'calculateTip' to calculate a tip on a bill at a
 * restaurant. The function should accept a tip percentage and the total of the
 * bill, and return the amount to tip
 *
 * Examples:
 * > calculateTip(0.20, 20) // returns 4
 * > calculateTip(0.25, 25.50) // returns 6.375
 * > calculateTip(0.15, 33.42) // returns 5.013
 */

/**
 * calculateTip
 * @param tipPercentage - Value as a float/decimal in range of 0-1, example 0.20 = 20%
 * @param totalBill - Value as a float/decimal, example 25.50
 * @returns {number}
 */
function calculateTip(tipPercentage = 0, totalBill = 0) {
    console.debug("Debugging purpose only...");
    console.debug({tipPercentage});
    console.debug({totalBill});
    console.debug("Debugging purpose only...");
    return Number(tipPercentage) * Number(totalBill);
}

let test1 = calculateTip(0.20, 20);
console.log({test1});

let test2 = calculateTip(0.25, 25.50)
console.log({test2});

let test3 = calculateTip(0.15, 33.42)
console.log({test3});

/**
 * TODO:
 * Use prompt and alert in combination with your calculateTip function to
 * prompt the user for the bill total and a percentage they would like to tip,
 * then display the dollar amount they should tip
 */

let billTotal = prompt("What is the total bill (example 100.00 for $100) ?", "100.00");
billTotal = Number(billTotal);

let percentageTip = prompt("What is the percentage to tip (example 0.15 for 15 %) ?", "0.15");
percentageTip = Number(percentageTip);

let tipAmount = calculateTip(percentageTip, billTotal);
alert(`Your tip amount on a bill total of $${billTotal.toFixed(2)} with a percentage tip of ${(percentageTip * 100).toFixed(2)} % should be $${tipAmount.toFixed(2)}`);

/**
 * TODO:
 * Create a function named `applyDiscount`. This function should accept a price
 * (before a discount is applied), and a discount percentage (a number between 0
 * and 1). It should return the result of applying the discount to the original
 * price.
 *
 * Example:
 * > let originalPrice = 100;
 * > let discountPercent = .2; // 20%
 * > applyDiscount(originalPrice, discountPercent) // 80
 *
 * > applyDiscount(45.99, 0.12) // 40.4712
 */

/**
 * applyDiscount - returns the discounted price on a starting price minus the passed in discount percentage
 * @param priceBeforeDiscount - default 0's for input safety
 * @param discountPercentage - default 0's for input safety
 * @returns {number}
 */
function applyDiscount(priceBeforeDiscount = 0, discountPercentage = 0) {
    console.debug("Debugging purpose only...");
    console.debug({priceBeforeDiscount, discountPercentage});
    console.debug("Debugging purpose only...");
    // Note: Original Price - ( Price * Discount Percentage )
    return Number(priceBeforeDiscount) - (Number(priceBeforeDiscount) * Number(discountPercentage));
}

let originalPrice = 100; // $100.00
let discountPercent = 0.2; // 20%
let discountTest1 = applyDiscount(originalPrice, discountPercent);
console.log(discountTest1);

let discountTest2 = applyDiscount(45.99, 0.12); // 40.4712
console.log(discountTest2);

//----------------------------------------
// DRY - functions, calling functions
//----------------------------------------

function calculatePercentage(percentage, value) {
    return percentage * value;
}

function calculateDiscountedPrice(percentage, value) {
    return value - calculatePercentage(percentage, value);
}

console.log(calculateDiscountedPrice(.10, 100));