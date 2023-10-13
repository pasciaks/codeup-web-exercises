"use strict";

console.log('Started...Strict mode javascript.');

let question_3b = `Suppose you're working as a contractor for 3 companies: 
Google, Amazon and Facebook, they pay you a different rate per hour. 
Google pays $400, Amazon $380, and Facebook $350. 
How much will you receive in payment for this week? 
You worked 10 hours for Facebook, 6 hours for Google and 4 hours for Amazon.`;

let googleRate = 400;
let amazonRate = 380;
let facebookRate = 350;

let googleHours = 6;
let amazonHours = 4;
let facebookHours = 10;

let googleTotal = googleRate * googleHours;
let amazonTotal = amazonRate * amazonHours;
let facebookTotal = facebookRate * facebookHours;

let total = googleTotal + amazonTotal + facebookTotal;

console.log(`You worked at Google for ${googleHours} hours at $${googleRate.toFixed(2)} per hour, earning $${googleTotal}.`);
console.log(`You worked at Amazon for ${amazonHours} hours at $${amazonRate.toFixed(2)} per hour, earning $${amazonTotal}.`);
console.log(`You worked at Facebook for ${facebookHours} hours at $${facebookRate.toFixed(2)} per hour, earning $${facebookTotal}.`);

console.log(`You earned a total of $${total}.`);







