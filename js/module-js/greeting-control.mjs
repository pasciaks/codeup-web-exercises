"use strict";

import {getRandomGreeting} from "./greeting-logic.mjs";

(() => {

    let greeterForm = document.getElementById("greeter-form");
    let greeterInput = document.getElementById("name");

    greeterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let name = greeterInput?.value?.trim() || "Anonymous";
        let greeting = getRandomGreeting();
        let greetingElement = document.getElementById("greeting");
        greetingElement.innerText = `${greeting}, ${name}!`;
    });

})();