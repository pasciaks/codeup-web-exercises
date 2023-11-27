const hamsters = [
    {
        name: "Hamtaro",
        heightInMM: 86,
        fur: ['orange', 'white'],
        gender: "male",
        dateOfBirth: "August 6"
    }, {
        name: "Bijou",
        heightInMM: 75,
        fur: ['white'],
        gender: "female",
        dateOfBirth: "July 10"
    }, {
        name: "Oxnard",
        heightInMM: 100,
        fur: ['grey', 'white'],
        gender: "male",
        dateOfBirth: "May 3"
    }, {
        name: "Boss",
        heightInMM: 120,
        fur: ['brown', 'white'],
        gender: "male",
        dateOfBirth: "September 21"
    }, {
        name: "Snoozer",
        heightInMM: 85,
        fur: ['brown', 'white', "pink"],
        gender: "male",
        dateOfBirth: "January 14"
    }];

console.log({hamsters});
console.log(hamsters.length);

let hamsterNames = hamsters.map((oneHamster, index, array) => {
    return oneHamster.name;
});

console.log({hamsterNames});
console.log(hamsters.length);

let tallHamsters = hamsters.filter((oneHamster, index, array) => {
    return oneHamster.heightInMM >= 100;
});

console.log({tallHamsters});
console.log(hamsters.length);

let numbers = [4, 3, 2, 1];
console.log({numbers});

let sum = numbers.reduce((currentSum, currentNumber) => {
    return currentSum + currentNumber;
}, 0);
console.log({sum});

let factorialLikeProduct = numbers.reduce((currentProduct, currentNumber, index, array) => {
    console.log({currentProduct, currentNumber, index, array});
    return currentProduct * currentNumber;
}, 1);
console.log({factorialLikeProduct});

let evenNumbers = numbers.filter((oneNumber, index, array) => {
    return oneNumber % 2 === 0;
});
console.log({evenNumbers});

Array.prototype.doesNotInclude = function (valueToCheck) {
    return !this.includes(valueToCheck);
}

if (numbers.doesNotInclude(5)) {
    console.log("The [numbers] array does not include the number 5.");
}

// unique colors of all my jackets considering current and new jackets
let colorsOfMyCurrentJackets = ["blue", "black", "grey"];
let newJacketColors = ["blue", "red", "green", "black", "white", "grey"];

let uniqueColors = newJacketColors.reduce((uniqueColors, currentColor) => {
    if (!uniqueColors.includes(currentColor)) {
        uniqueColors.push(currentColor);
    }
    return uniqueColors;
}, [...colorsOfMyCurrentJackets]);

console.log(uniqueColors);



