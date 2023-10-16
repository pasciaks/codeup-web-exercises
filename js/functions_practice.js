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

