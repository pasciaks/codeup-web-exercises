function isOddInteger(n) {
    return isInteger(n) && (n % 2 !== 0);
}

function isInteger(n) {
    return n === parseInt(n, 10);
}

function isEven(n) {
    return n % 2 == 0;
}

function isOdd(n) {
    return Math.abs(n % 2) == 1;
}

function isOddTwo(num) {
    return !isEven(num);
}

function isEvenTwo(num) {
    if (typeof num === 'boolean') {
        return false;
    } // booleans can't be odd or even

    if (isNaN(num)) {
        return false;
    }
    if (num == 0) { // 0 is regarded as even
        return true;
    }
    return ((Number(num) % 2) == 0); // even if can divide by 2 evenly
}

function showMultiplicationTable(num) {
    for (let i = 1; i <= 10; i++) {
        console.log(`${num} x ${i} = ${num * i}`);
    }
}

function showMultiplicationTableTwo(num) {
    let lines = '';
    for (let i = 1; i <= 10; i++) {
        lines += `${num} x ${i} = ${num * i} \n`;
    }
    return lines;
}

/**
 * getRandom - Best implementation, min/max random integer, inclusive
 * @param min
 * @param max
 * @returns {number}
 */
function getRandom(min, max) {
    // Math.floor will always round down to Integer
    // Math.round will round naturally
    // Math.ceil will round up to Integer
    // Math.random() will be > 0.0 (Math.floor()) < 1.0
    // will not include 0 or 1, so (max-min+1) enables inclusive max
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function halfTree(num) {
    for (let j = 1; j <= num; j++) {
        console.log(`${j}`.repeat(j));
    }
}

function halfTreeTwo(num) {
    for (let i = 1; i <= num; i++) {
        let line = '';
        for (let j = 0; j < i; j++) {
            line += i;
        }
        console.log(line);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ----- functions, from walk through -----
// these are specific to the lesson requirements
// the truthy/falsy is specific in instructions
// ----------------------------------------

function iTrue(num) {
    return num === true;
}

function iFalse(num) {
    return num === false;
}

function iNot(value) {
    return !value;
}

function aOne(value) {
    return parseFloat(value) + 1;
}

function iEven(num) {
    return parseFloat(num) % 2 === 0;
}

function iIdentical(input1, input2) {
    return input1 === input2
}

const isIdentical2 = (val1, val2) => {
    return val1 === val2;
}

function iEqual(val1, val2) {
    return val1 == val2;
}

function oOr(val1, val2) {
    return val1 || val2;
}

console.log(oOr(true, true), true);
console.log(oOr("hello", "world"), "hello");

function aAnd(val1, val2) {
    return val1 && val2;
}

console.log(aAnd(true, true), true);
console.log(aAnd(false, false), false);

function cConcat(val1, val2) {
    return "" + val1 + val2; // coerce to string
}

console.log(cConcat("code", "up"), "codeup");
console.log(cConcat("true", "true"), "truetrue");

module.exports = {
    isOddInteger,
    isInteger,
    isEven,
    isOdd,
    isOddTwo,
    isEvenTwo,
    showMultiplicationTable,
    showMultiplicationTableTwo,
    getRandom,
    halfTree,
    halfTreeTwo,
    getRandomInt
}
