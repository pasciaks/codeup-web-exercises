"use strict";

/**
 * Create a file named for_loops.js inside the js directory and link it to your loops.html file.
 */

/**
 * Exercises
 *
 * Create an HTML file named loops.html.
 * Each of the following sections will instruct you to create a new javascript file.
 * For each exercise, you should include a script tag on your html page that links the correct .js file.
 */

// iife (immediately invoked function expression)
// Prevents global scope variable access in console.

(() => {
    let inside = 'test';
    console.log("Inside IIFE");
    console.log(inside);
})(); // <-- remember extra () to call the IIFE

// console.log(inside); // not defined globally

/**
 * Create a function named showMultiplicationTable that accepts a number and console.logs the multiplication table for that number (just multiply by the numbers 1 through 10)
 * For example, showMultiplicationTable(7) should output
 *  7 x 1 = 7
 *  7 x 2 = 14
 *  7 x 3 = 21
 *  7 x 4 = 28
 *  7 x 5 = 35
 *  7 x 6 = 42
 *  7 x 7 = 49
 *  7 x 8 = 56
 *  7 x 9 = 63
 *  7 x 10 = 70
 */

function showMultiplicationTable(num) {
    for (let i = 1; i <= 10; i++) {
        logToWindow(`${num} x ${i} = ${num * i}`);
    }
}

showMultiplicationTable((7));

/**
 * Use a for loop and the code from the previous lessons to generate 10 random numbers between 20 and 200 and output to the console whether each number is odd or even. For example:
 *  123 is odd
 *  80 is even
 *  24 is even
 *  199 is odd
 *  ...
 */

function getRandom(min, max) {
    // Math.floor will always round down to Integer
    // Math.round will round naturally
    // Math.ceil will round up to Integer
    // Math.random() will be > 0.0 (Math.floor()) < 1.0
    // will not include 0 or 1
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function isOdd(num) {
    return num % 2 !== 0
}

function isEven(num) {
    return (num === 0) || (num % 2 === 0);
}

for (let i = 1; i <= 10; i++) {
    let randomNumber = getRandom(20, 200);
    let isOddResult = isOdd(randomNumber);
    logToWindow(`${randomNumber} is ${isOddResult ? 'odd' : 'even'}`);
}

/**
 Create a for loop that uses console.log to create the output shown below.
 1
 22
 333
 4444
 55555
 666666
 7777777
 88888888
 999999999
 */

function halfTree(num) {
    for (let j = 1; j <= num; j++) {
        logToWindow(`${j}`.repeat(j));
    }
}

halfTree(9);

/**
 Create a for loop that uses console.log to create the output shown below.
 100
 95
 90
 85
 80
 75
 70
 65
 60
 55
 50
 45
 40
 35
 30
 25
 20
 15
 10
 5
 */

for (let jj = 100; jj >= 5; jj -= 5) {
    logToWindow(jj);
}

function logToWindow(str, newLine = '<br>') {
    try {
        console.log(str);
        document.getElementById('output').innerHTML += (str + newLine);
    } catch {
        // not running in web browser
    }
}