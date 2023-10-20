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

function isOdd(num) {
    return !isEven(num);
}

function isEven(num) {
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

showMultiplicationTable((7));

function showMultiplicationTableTwo(num) {
    let lines = '';
    for (let i = 1; i <= 10; i++) {
        lines += `${num} x ${i} = ${num * i} \n`;
    }
    return lines;
}

console.log(showMultiplicationTableTwo((7)));

function getRandom(min, max) {
    // Math.floor will always round down to Integer
    // Math.round will round naturally
    // Math.ceil will round up to Integer
    // Math.random() will be > 0.0 (Math.floor()) < 1.0
    // will not include 0 or 1
    return Math.floor((Math.random() * (max - min + 1)) + min);
}


console.log(isOdd(1), true);


function halfTree(num) {
    for (let j = 1; j <= num; j++) {
        console.log(`${j}`.repeat(j));
    }
}

halfTree(9);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let ii = 0; ii < 99; ii++) {
    console.log(getRandom(1, 5));
}

for (let ii = 0; ii < 99; ii++) {
    console.log(getRandomInt(1, 5));
}