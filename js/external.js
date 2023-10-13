"use strict";

console.log("Hello from external JavaScript");

alert("Welcome to my Website!");

let favoriteColor = prompt("What is your favorite color?");

if (!favoriteColor) {
    console.log("no favorite color added.");
}

alert(`Great, ${favoriteColor} is my favorite color too!`);

let question3 = `
Write some JavaScript code, that is, variables and operators, to describe the following scenarios. Do not worry about the real operations to get the values, the goal of these exercises is to understand how real world conditions can be represented with code.
You have rented some movies for your kids: The little mermaid (for 3 days), Brother Bear (for 5 days, they love it), and Hercules (1 day, you don't know yet if they're going to like it). If price for a movie per day is $3, how much will you have to pay?
Suppose you're working as a contractor for 3 companies: Google, Amazon and Facebook, they pay you a different rate per hour. Google pays $400, Amazon $380, and Facebook $350. How much will you receive in payment for this week? You worked 10 hours for Facebook, 6 hours for Google and 4 hours for Amazon.
`;

let mermaidRentalDays;
let brotherBearRentalDays;
let herculesRentalDays;

let rentalRate;
let totalCost;

mermaidRentalDays = prompt("How many days did you rent Little Mermaid?", "3");
brotherBearRentalDays = prompt("How many days did you rent Brother Bear?", "5");
herculesRentalDays = prompt("How many days did you rent Hercules?", "1");

rentalRate = prompt("What is the daily rental rate?", "3");

let mermaidCost = Number(mermaidRentalDays) * Number(rentalRate);
let brotherBearCost = Number(brotherBearRentalDays) * Number(rentalRate);
let herculesCost = Number(herculesRentalDays) * Number(rentalRate);

totalCost = mermaidCost + brotherBearCost + herculesCost;

alert(`Your rental cost is $${totalCost.toFixed(2)}`);

let googleRate;
let amazonRate;
let facebookRate;

let googleHours;
let amazonHours;
let facebookHours;

let googleEarnings;
let facebookEarnings;
let amazonEarnings;

let totalEarnings;

googleRate = prompt("What is the google pay rate ?", "400");
googleHours = prompt("How many hours did you work at Google ?", "6");

amazonRate = prompt("What is the amazon pay rate ?", "380");
amazonHours = prompt("How many hours did you work at Amazon ?", "4");

facebookRate = prompt("What is the facebook pay rate ?", "350");
facebookHours = prompt("How many hours did you work at Facebook ?", "10");


googleEarnings = Number(googleHours) * Number(googleRate);
facebookEarnings = Number(facebookHours) * Number(facebookRate);
amazonEarnings = Number(amazonHours) * Number(amazonRate);

totalEarnings = googleEarnings + facebookEarnings + amazonEarnings;

alert(`You will receive $${totalEarnings.toFixed(2)} pay for this week.`);






