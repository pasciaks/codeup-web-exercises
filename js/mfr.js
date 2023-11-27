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

let factorial = numbers.reduce((currentProduct, currentNumber) => {
    return currentProduct * currentNumber;
}, 1);
console.log({factorial});

let evenNumbers = numbers.filter((oneNumber, index, array) => {
    return oneNumber % 2 === 0;
});
console.log({evenNumbers});

