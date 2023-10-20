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