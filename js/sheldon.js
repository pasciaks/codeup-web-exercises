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

console.log(typeof isTwo);
console.log(typeof myFunction)
console.log(typeof fatArrow)
console.log(typeof isTwo());
console.log(typeof myFunction())
console.log(typeof fatArrow())

console.log('---------');

function printNumberedList(firstValue, ...vals) {
    console.log(typeof vals);
    console.log(firstValue);
    console.log(vals);
    for (let i = 0; i < vals.length; i++) {
        console.log(`index # ${i} : ${vals[i]}`);
    }
}

let planets = ['mercury', 'mars', 'earth'];

printNumberedList(...planets);

// ----------

function printNumberedList2(vals) {
    console.log(typeof vals);
    for (let i = 0; i < vals.length; i++) {
        console.log(`index # ${i} : ${vals[i]}`);
    }
}

let planets2 = ['mercury', 'mars', 'earth'];

printNumberedList2(planets2);
