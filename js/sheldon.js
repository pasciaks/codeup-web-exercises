"use strict";

isTwo(2);

let myName = 'Sheldon';

console.log(myName);

function isTwo(num) { // Note: This function will be hoisted!
    return num === 2;
}

const myFunction = function () {
    return '';
}

const fatArrow = () => {
    return '';
}

myFunction()



