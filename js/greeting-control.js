"use strict";

import {getRandomGreeting} from "./greeting-logic.js";

(() => {

    let greetingElement = document.getElementById("greeting");

    let greeterForm = document.getElementById("greeter-form");
    let greeterInput = document.getElementById("name");

    greeterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let name = greeterInput.value;
        let greeting = getRandomGreeting();
        greetingElement.innerText = `${greeting}, ${name}!`;
    });

})();