"use strict";

// TODO: Ask the user for their name.
//       Keep asking if an empty input is provided.

var userName = "";

while (userName == "" || userName == null) {
    userName = prompt("What is your name?", "");
}

// TODO: Show an alert message that welcomes the user based on their input.

alert("Welcome " + userName);

// TODO: Ask the user if they like pizza.
//       Based on their answer show a creative alert message.

var confirmed = confirm("Do you like pizza ?");

if (confirmed) {
    alert("Great, let's order some pizza!");
} else {
    alert("I can't believe you don't like pizza, almost everyone likes pizza!");
}
