"use strict";

console.log("Hello from functions_practice.js JavaScript!");

/**
 * helloWorld - Returns the Hello World! greeting string
 * @returns {string}
 */
function helloWorld() {
    return 'Hello World!';
}

/**
 * helloSomeone - Returns a greeting string given a passed in name.
 * @param name
 * @returns {string}
 */
function helloSomeone(name) {
    return `Hello, ${name}!`;
}

/**
 * helloAnyone - Returns a greeting string given a passed in name.
 * @param name - Defaults to 'Unknown' if no value is passed in.
 * @returns {string}
 */
function helloAnyone(name = "Unknown") {
    return `Hello, ${name}!`;
}

let helloWorldResponse = helloWorld();
console.log(helloWorldResponse);

let helloSomeoneResponse = helloSomeone('Sheldon');
console.log(helloSomeoneResponse);

let helloAnyoneResponse = helloAnyone();
console.log(helloAnyoneResponse);

/**
 * addNumbers - Returns the Number sum of two arguments passed in
 * @param num1
 * @param num2
 * @returns {number}
 *
 * The terms parameter and argument can be used for the same thing: information that are passed into a function.
 * These arguments are sometimes referred to as the inputs of the function.
 * An argument is passed into the function as an input, where the function receives the input as a parameter of the function.
 */
function addNumbers(num1, num2) {
    return Number(num1) + Number(num2);
}

let a = 1;
let b = 2;
let c = addNumbers(a, b);
console.log(`${a} + ${b} = ${c}`);

/**
 * doSomething - Stores anonymous function for use later, Displays console message Done!
 * @returns {null}
 */
let doSomething = function () {
    console.log("Done!");
    return null;
}

doSomething();
console.log(doSomething);
console.log(doSomething());

// Notes - Arrow functions used heavily in React.
// Perhaps as ways to keep the global scope clean.
// TLDR; Functions declared the old way are ‘HOISTED’ up.

let last = 'Pasciak';
let first = 'Sheldon';

console.log(last);
console.log(first);

// let last = 'Pasciak';
// let first = 'Sheldon';

console.log(hoistedFunction);

function hoistedFunction() {
    console.log("Hoist me up!")
}

const nonHoistedFunction = () => {
    return 'Nothing!'
}

console.log(nonHoistedFunction);

/**
 * factorial - Recursive function - function that calls itself
 * @param n
 * @returns {number}
 */
function factorial(n) {
    console.log(n);
    if (n === 0 || n === 1) {
        console.log(1);
        return 1;
    } else {
        console.log(`factorial(${n - 1});`);
        return n * factorial(n - 1);
    }
}

console.log(`Factorial 5 = ${factorial(5)}!`);



