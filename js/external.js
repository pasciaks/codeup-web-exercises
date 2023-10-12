console.log('Started...');

let a = 1;

let b = ++a;

let c = ++a;

console.log({a, b, c});

let x = 1;
++x; // pre-increment, x is incremented, and the console prints out 2
console.log(x); // 2

x = 1; // put x back to where we started
x++; // post-increment, console prints out 1, and the value in x is incremented
console.log(x); // 2

console.log(parseInt('123abc'));// 123)

let zz = 'sheldon';

zz -= "s";

console.log(zz); // NaN

let aNumber = 5;
let aString = "" + aNumber;

console.log(Number('5'));

console.log(typeof NaN);
