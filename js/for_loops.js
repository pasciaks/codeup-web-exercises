/**
 * Create a file named for_loops.js inside the js directory and link it to your loops.html file.
 */

/**
 * Exercises
 *
 * Create an HTML file named loops.html.
 * Each of the following sections will instruct you to create a new javascript file.
 * For each exercise, you should include a script tag on your html page that links the correct .js file.
 */

/**
 * Create a function named showMultiplicationTable that accepts a number and console.logs the multiplication table for that number (just multiply by the numbers 1 through 10)
 * For example, showMultiplicationTable(7) should output
 *  7 x 1 = 7
 *  7 x 2 = 14
 *  7 x 3 = 21
 *  7 x 4 = 28
 *  7 x 5 = 35
 *  7 x 6 = 42
 *  7 x 7 = 49
 *  7 x 8 = 56
 *  7 x 9 = 63
 *  7 x 10 = 70
 */

function showMultiplicationTable(num) {
    for (let i = 1; i <= 10; i++) {
        console.log(`${num} x ${i} = ${num * i}`);
    }
}

showMultiplicationTable((7));

/**
 * Use a for loop and the code from the previous lessons to generate 10 random numbers between 20 and 200 and output to the console whether each number is odd or even. For example:
 *  123 is odd
 *  80 is even
 *  24 is even
 *  199 is odd
 *  ...
 */

function getRandom(min, max) {
    return Math.floor((Math.random() * max) + min);
}

function isOdd(num) {
    return num % 2 !== 0
}

function isEven(num) {
    return num % 2 === 0;
}

for (let i = 1; i <= 10; i++) {
    let randomNumber = getRandom(20, 200);
    let isOddResult = isOdd(randomNumber);
    console.log(`${randomNumber} is ${isOddResult ? 'odd' : 'even'}`);
}

/**
 Create a for loop that uses console.log to create the output shown below.
 1
 22
 333
 4444
 55555
 666666
 7777777
 88888888
 999999999
 */

function halfTree(num) {
    for (let i = 1; i <= num; i++) {
        for (let j = 1; j <= i; j++) {
            console.log(`${j}`.repeat(j));
        }

    }
}

halfTree(9);

/**
 Create a for loop that uses console.log to create the output shown below.
 100
 95
 90
 85
 80
 75
 70
 65
 60
 55
 50
 45
 40
 35
 30
 25
 20
 15
 10
 5
 */

for (let jj = 100; jj >= 5; jj -= 5) {
    console.log(jj);
}

