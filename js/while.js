/**
 * Create a file named while.js in the js directory.
 * Create a while loop that uses console.log() to create the output shown below.
 *  2
 *  4
 *  8
 *  16
 *  32
 *  64
 *  128
 *  256
 *  512
 *  1024
 *  2048
 *  4096
 *  8192
 *  16384
 *  32768
 *  65536
 */

// for (let i = 1; i < 17; i++) {
//     // console.log(2 ** i);
//     logToWindow(2 ** i);
// }

let i = 1;

while (i < 17) {
    logToWindow(2 ** i);
    i++;
}

/**
 *
 * Do While Loop
 *
 * An ice cream seller can't go home until she sells all of her cones.
 * First write enough code that generates a random number between 50 and 100
 * representing the amount of cones to sell before you start your loop.
 *
 * Inside of the loop your code should generate another random number between 1 and 5,
 * simulating the amount of cones being bought by her clients.
 *
 * Use a do-while loop to log to the console the amount of cones sold to each person.
 * The below code shows how to get the random numbers for this exercise.
 * // This is how you get a random number between 50 and 100
 * let allCones = Math.floor(Math.random() * 50) + 50;
 * // This expression will generate a random number between 1 and 5
 * Math.floor(Math.random() * 5) + 1;
 * The output should be similar to the following:
 * 5 cones sold...  // if there are enough cones
 * Cannot sell you 6 cones I only have 3...  // If there are not enough cones
 * Yay! I sold them all! // If there are no more cones
 * Finally, commit the changes to your git repository, and push to GitHub.
 */

let allCones = getRandomInt(50, 100);

let salesNeeded = allCones; // for additional display later, keeping track of initial inventory amount

// console.log(`Cones to sell ${salesNeeded}.`);
logToWindow(`Cones to sell ${salesNeeded}.`);

let salesNumber = 0; // for additional display later, keeping track of the number of times a sale is made

do {
    let toBuy = getRandomInt(1, 5);
    if (allCones >= toBuy) {
        salesNumber++;
        // console.log(`${toBuy} cones sold...${salesNumber} transaction(s) completed.`);
        logToWindow(`${toBuy} cones sold...${salesNumber} transaction(s) completed.`);
        allCones -= toBuy;
    } else {
        // console.log(`Cannot sell you ${toBuy} cones, I only have ${allCones} cones remaining.`);
        logToWindow(`Cannot sell you ${toBuy} cones, I only have ${allCones} cones remaining.`);
    }
} while (allCones > 0);

// console.log(`Yay! I sold them all!`);
logToWindow(`Yay! I sold them all!`);

// console.log(`Total ${salesNeeded} items sold: in ${salesNumber} transactions.`);
logToWindow(`Total ${salesNeeded} items sold: in ${salesNumber} transactions.`);

function logToWindow(str, newLine = '<br>') {
    try {
        console.log(str);
        document.getElementById('output').innerHTML += (str + newLine);
    } catch {
        // not running in web browser
    }
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}