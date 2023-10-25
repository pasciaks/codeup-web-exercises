// # JavaScript Loops, Arrays, and Objects Assessment
//
// # MONDAY, 23 OCT 2023
//
// ## Main Concepts to be Assessed
// - JavaScript Primitive Types
// - JavaScript Operators
// - JavaScript Variables
// - JavaScript Functions
// - JavaScript Conditionals
// - JavaScript Loops
// - JavaScript Arrays
// - Manipulating JavaScript Arrays
// - JavaScript Objects
// - The Math Object in JavaScript
// - Writing Code That Passes Pre-written Tests in Jasmine.
//
// ## Skills Not Currently Being Assessed
// - Writing Tests in Jasmine
// - Browser Object Model
// - Document Object Model
// - Use of the Mapbox API
//
// ## JavaScript Loops, Arrays, and Objects Checklist
// The following are several points of competency and skill that are intended to help identify areas of additional practice and study. Not all answers are found in the Codeup curriculum.
//
// ### Knowledge
// In addition to the concepts from the previous assessment,
//     - [ ] I can differentiate between the various loops of JavaScript.

// for, forEach, for(apple of apples), do {} while(), while () {}

for (let i = 0; i <= 10; i++) {
    console.log(i);
}
;

[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((item, index, arr) => {
    console.log(item);
});

// - [ ] I can identify the use case for break and continue in loops.

for (let j = 0; j < 100; j++) {
    if (j % 2 === 0) {
        // it's even, so skip
        continue;
    }
    if (j >= 50) {
        // end at 50 or more
        break;
    }
    console.log(j);
}
// - [ ] I can identify an array in JavaScript.

let arrPeople = ['sheldon', 'scott', 'steve'];
if (Array.isArray(arrPeople)) {
    console.log('arrPeople is an array!');
    console.log(arrPeople);
    arrPeople.forEach((value, index, array) => {
        console.log(`${value}`);
    })
}
console.log(arrPeople.length + ' people is the length.');

// - [ ] I know how to iterate through an array in JavaScript.

for (let myIndexer = 0; myIndexer < arrPeople.length; myIndexer++) {
    let currentItem = arrPeople[myIndexer];
}

// - [ ] I know the various methods that can be used to manipulate an array.

// .push() .pop() .shift() .unshift() .slice() .splice()

// - [ ] I know the various parts of an object in JavaScript.

let myObject = {
    id: null,
    propertyName: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
    methodName: function (arg) {
        console.log(this.id);
        console.log(this.propertyName);
        console.log(`The arg value you passed in is [` + `${arg}` + `]`);
    }
}

myObject.id = Date.now() + '-' + Math.random();
myObject.methodName('test');
myObject.methodName();

// - [ ] I have familiarized myself with the Math object, and its various methods and properties.

let myPi = Math.PI;

console.log(2.1, '\nMath.round(2.1)\n', Math.round(2.1));
console.log(2.1, '\nMath.ceil(2.1)\n', Math.ceil(2.1));
console.log(2.1, '\nMath.floor(2.1)\n', Math.floor(2.1));
console.log(2.1, '\n(2.1).toFixed(0)\n', (2.1).toFixed(0));
console.log(2.1, '\n(2.1).toFixed(1)\n', (2.1).toFixed(1));
console.log(2.1, '\n(2.1).toFixed(2)\n', (2.1).toFixed(2));


console.log(2.16, '\n(2.16).toFixed(1)\n', (2.16).toFixed(1));

for (var jj = 0; jj < 10; jj++) {
    if (jj === 2) {
        break;
    }
    console.log(jj);
}


//
// ### Skills
// In addition to the skills from the previous assessment,
// - [ ] I can write code in a looping structure based on a condition.
// - [ ] I can write code that will stop a loop.
// - [ ] I can create an array in JavaScript.
// - [ ] I can access a single piece of information from an array in JavaScript.
// - [ ] I can navigate through an array, and access all piece of information individually.
// - [ ] I can add and remove information from an array.
// - [ ] I can change the order of information in an array.
// - [ ] I can convert between an array and string in JavaScript.
// - [ ] I can create and use objects in JavaScript.
// - [ ] I can add methods and properties to objects in JavaScript.
// - [ ] I know how to use the methods and properties from an object in JavaScript.
