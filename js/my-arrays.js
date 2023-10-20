let emptyArr = [];

console.log('isArray ? ' + Array.isArray(emptyArr));

let falsy = [0, "", false, undefined, null];

for (let item in falsy) { // these are received as strings
    console.log('-------------');
    console.log(item);
    if (item) {
        console.log("truthy");
    } else {
        console.log("falsy");
    }
    console.log('============');
}

console.log("----------------------------------");

for (let i = 0; i < falsy.length; i++) {
    let variableValue = falsy[i]; // these pickup logical type
    console.log('-------------');
    console.log(variableValue);
    if (variableValue) {
        console.log("truthy");
    } else {
        console.log("falsy");
    }
    console.log('============');
}

let cheeses = ['Cheddar', 'String', 'Wensleydale'];

for (let i = 0; i < cheeses.length; i++) {
    console.log(cheeses[i]);
}

console.log('forEach(callBack)');
cheeses.forEach(function (cheese) {
    console.log(cheese);
})

console.log('forEach((item)={}))');
cheeses.forEach((cheese) => {
    console.log(cheese);
})

console.log('forEach((item,index)={}))');

cheeses.forEach((cheese, index) => {
    console.log(cheese, index);
    console.log(`${index}: ${cheese}`);
})

console.log('forEach((item,index,array)={}))');

cheeses.forEach((cheese, index, array) => {
    console.log(cheese, index, array);
})

console.log(cheeses);
cheeses[1] = 'String (string-cheese)';
console.log(cheeses);

console.log("let cheese of cheeses");
for (let cheese of cheeses) {
    console.log(cheese);
}

const array = [15, 16, 17, 18, 19];

console.log("Reduce function...");

let s = 15 + 16 + 17 + 18 + 19;
console.log(s);

let sum = array.reduce(function (acc, value, index, arr) {
    console.log(acc);
    console.log(value);
    console.log(index);
    console.log(arr);
    return acc + value;
}, 0);

console.log(sum);

console.log('---- spread operator ----');
console.log(cheeses);
console.log(...cheeses);
console.log([...cheeses]);
console.log(JSON.stringify([...cheeses], 0, 2));

const exampleVals = [5, 8];
const add = (x, y) => x + y;
console.log(exampleVals, add(...exampleVals));

const daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'];

console.log(daysOfTheWeek);
// ['Monday', 'Tuesday', 'Wednesday', 'Thursday']

// let's add 'Sunday' to the beginning of the week
daysOfTheWeek.unshift('Sunday');

console.log(daysOfTheWeek);
// ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']

// let's add 'Friday' and 'Saturday' to the end of the week
daysOfTheWeek.push('Friday', 'Saturday');

console.log(daysOfTheWeek);
// ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/**
 * Array Mutation
 * Both push and unshift will modify the original array,
 * and return a number, the new length of the array,
 * not the new array.
 */

const todoList = ['Take out the trash', 'Clean the car', 'Pay the bills'];

console.log('My todo list:');
console.log(todoList);
// ['Take out the trash', 'Clean the car', 'Pay the bills']

console.log('Completing the last item: ' + todoList[todoList.length - 1]);

// let's remove the last item
const removedItem = todoList.pop();

// log what we did
console.log('Task complete: ' + removedItem);

console.log(todoList);
// ['Take out the trash', 'Clean the car']

console.log('Completing the first item: ' + todoList[0]);

// let's remove the first item
const doneItem = todoList.shift();

// log what we did
console.log('Task complete: ' + doneItem);

console.log(todoList);
// ['Clean the car']

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

console.log(colors); // colors is unchanged

let slice = colors.slice(2, 4);
console.log(slice); // ['yellow', 'green']

console.log(colors); // colors is unchanged
// ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']


slice = colors.slice(3);
console.log(slice); // ['green', 'blue', 'indigo', 'violet']