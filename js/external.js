"use strict";

console.log('Started...Strict mode javascript.');

console.log('Awaiting confirm...');

let confirmed = confirm("We have lunch at 12:30!");

if (confirmed) {
    alert("You pressed ok.");
} else {
    alert("You pressed cancel.");
}

console.log('Continued...');

let name = prompt("What is your name?", "Sheldon");

alert(`Hello, ${name}!`);
