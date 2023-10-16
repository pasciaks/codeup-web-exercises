"use strict";

console.log("Hello from functions_practice.js JavaScript!");

function helloWorld() {
    return 'Hello World!';
}

function helloSomeone(name) {
    return `Hello, ${name}!`;
}

function helloAnyone(name = "Unknown") {
    return `Hello, ${name}!`;
}

let helloWorldResponse = helloWorld();
console.log(helloWorldResponse);

let helloSomeoneResponse = helloSomeone('Sheldon');
console.log(helloSomeoneResponse);

let helloAnyoneResponse = helloAnyone();
console.log(helloAnyoneResponse);

