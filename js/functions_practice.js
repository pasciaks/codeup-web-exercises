"use strict";

console.log("Hello from functions_practice.js JavaScript!");

function helloWorld() {
    return 'Hello World!';
}

function helloSomeone(name) {
    return `Hello, ${name}!`;
}

/**
 * helloAnyone - returns a greeting string given a passed in name.
 * @param name
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

function addNumbers(num1, num2) {
    return Number(num1) + Number(num2);
}

let a = 1;
let b = 2;
let c = addNumbers(a, b);
console.log(`${a} + ${b} = ${c}`);
