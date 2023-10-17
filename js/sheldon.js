"use strict";

// $ npm install -g documentation
// $ documentation build js/sheldon.js -f html -o docs

/**
 * isTwo
 * @param num
 * @returns {boolean}
 */
function isTwo(num = null) { // Note: This function will be hoisted!
    return num === 2;
}

/**
 * myFunction
 * @returns {string}
 */
const myFunction = function () {
    return '';
}

/**
 * fatArrow
 * @returns {object}
 */
const fatArrow = () => {
    return {'isObject': true};
}

isTwo();
myFunction();
fatArrow();



