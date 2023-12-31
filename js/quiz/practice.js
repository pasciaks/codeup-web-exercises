"use strict";

console.log("Started...");

let i = 0;
while (i <= 10) {
    console.log(i);
    i++;
}

for (let i = 0; i <= 10; i++) {
    console.log(i);
}

const user = {
    firstName: 'Sheldon',
    d_o_b: new Date(1970, 1, 15),
    age: null
}

user.calcAge = function () {
    const today = new Date();
    if (this.d_o_b.getMonth() < today.getMonth()) {
        if (this.d_o_b.getDate() < today.getDate()) {
            this.age = today.getFullYear() - this.d_o_b.getFullYear();
        } else {
            this.age = today.getMonth() - this.d_o_b.getFullYear() - 1;
        }
    } else {
        this.age = today.getFullYear() - this.d_o_b.getFullYear() - 1;
    }
    return this.age;
}

console.log(user);
user.calcAge();
console.log(user);

/**
 * getRandomInt (min/max inclusive get random integer in range min,max)
 * @param min
 * @param max
 * @returns {number}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

console.log(getRandomInt(20, 200));

let maxIterations = 9999;
let currentIteration = 0;

do {
    if ((getRandomInt(20, 200) == 200) || (getRandomInt(20, 200) == 20)) {
        console.log('got 20 or 200');
        console.log(currentIteration);
        break;
    }
} while (++currentIteration < maxIterations);

for (let ii = 0; ii < 99; ii++) {
    let a = Math.random();

    let b = a.toFixed(0);
    let c = Math.ceil(a);
    let d = Math.floor(a);

    console.log(c, b, d);
    d = Math.floor(a);
    console.log(c, b, d);

    b = a.toFixed(1);
    c = Math.ceil(a);
    d = Math.floor(a);
    console.log(c, b, d);

    b = a.toFixed(2);
    c = Math.ceil(a);
    d = Math.floor(a);
    console.log(c, b, d);

    b = a.toFixed(3);
    c = Math.ceil(a);
    d = Math.floor(a);
    console.log(c, b, d);

    b = a.toFixed(4);
    c = Math.ceil(a);
    d = Math.floor(a);
    console.log(c, b, d);

    console.log(a);
}