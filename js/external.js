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

let dogs = parseInt('54 dogs');
console.log(dogs);

let tt = !!"test";
console.log(tt);

console.log(Number(true));
console.log(parseFloat(true));

console.log(parseInt("dogs 88"));
console.log(parseInt(" 88 dogs"));
console.log(parseFloat("dogs 88"));
console.log(parseFloat(" 88 dogs"));
console.log('...');
console.log(parseFloat("88|,dogs"));

let aaa = 'sheldon pasciak abc def';
let ccc = aaa.replace('a', '_')
console.log(ccc);

console.log("ABC AAA CAT DOG BANANA".replace('A', '_'));

let firstName = 'John';
let lastName = 'Doe';
let fullName = `${firstName} ${lastName}`;
console.log(fullName);


