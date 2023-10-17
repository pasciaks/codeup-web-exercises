"use strict";

// npm install -g documentation
// documentation build js/*.js -f html -o docs

isTwo(2);

let myName = 'Sheldon';

console.log(myName);

/**
 * isTwo
 * @param num
 * @returns {boolean}
 */
function isTwo(num) { // Note: This function will be hoisted!
    return num === 2;
}

/**
 * myFunction
 * @returns {string}
 */
const myFunction = function () {
    return '';
}

const fatArrow = () => {
    return '';
}

myFunction()



