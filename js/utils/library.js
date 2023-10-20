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


console.log(isOdd(1), true);
