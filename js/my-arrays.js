let emptyArr = [];

// console.log('isArray ? ' + Array.isArray(emptyArr));

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

cheeses.forEach((cheese) => {
    console.log(cheese);
})
cheeses.forEach((cheese, index) => {
    console.log(cheese, index);
})
cheeses.forEach((cheese, index, array) => {
    console.log(cheese, index, array);
})