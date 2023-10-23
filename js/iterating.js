(function () {
    "use strict";

    /**
     * TODO:
     * Create an array of 4 people's names and store it in a variable called
     * 'names'.
     */

    let names = ['Sheldon', 'Scott', 'Steve', 'Stanley'];

    /**
     * TODO:
     * Create a log statement that will log the number of elements in the names
     * array.
     */

    console.log(`There are ${names.length} elements in the array.`);

    /**
     * TODO:
     * Create log statements that will print each of the names individually by
     * accessing each element's index.
     */

    console.log(names[0]);
    console.log(names[1]);
    console.log(names[2]);
    console.log(names[3]);

    for (let i = 0; i < names.length; i++) {
        console.log(names[i]);
    }

    /**
     * TODO:
     * Write some code that uses a for loop to log every item in the names
     * array.
     */

    console.log(`for (let name of names) {`);
    for (let name of names) {
        console.log(name);
    }

    // for (let j = 0; j < names.length; j++) {
    //     let item = names[j];
    //     console.log(item);
    // }

    // names.forEach((value, index, array) => {
    //     console.log({value, index, array});
    // })

    /**
     * TODO:
     * Refactor your above code to use a `forEach` loop
     */

    console.log('names forEach(item)');
    names.forEach(function (item, index, array) {
        console.log(item);
    });

    console.log(`names.forEach((name) => {`);
    names.forEach((name) => {
        console.log(name);
    });

    /**
     * TODO:
     * Create the following three functions, each will accept an array and
     * return an an element from it
     * - first: returns the first item in the array
     * - second: returns the second item in the array
     * - last: returns the last item in the array
     *
     * Example:
     *  > first([1, 2, 3, 4, 5]) // returns 1
     *  > second([1, 2, 3, 4, 5]) // returns 2
     *  > last([1, 2, 3, 4, 5]) // return 5
     */

    function first(arr) {
        return arr[0];
    }

    function second(arr) {
        return arr[1];
    }

    function last(arr) {
        return arr[arr.length - 1];
    }

    console.log(`first[1,2,3,4,5]`);
    console.log(first([1, 2, 3, 4, 5]));

    console.log(`second[1,2,3,4,5]`);
    console.log(second([1, 2, 3, 4, 5]));

    console.log(`last[1,2,3,4,5]`);
    console.log(last([1, 2, 3, 4, 5]));

    console.log("first name in names array.");
    console.log(first(names));

    console.log("second name in names array.");
    console.log(second(names));

    console.log("last name in names array.");
    console.log(last(names));

    let testArray = ['one', 'two', 'three'];

    console.log('--');
    console.log(testArray.push("four")); // adds to end // returns length ?
    console.log(testArray);
    console.log(testArray.unshift("zero")); // adds to front // return length ?
    console.log(testArray);
    console.log(testArray.pop()); // returns from end
    console.log(testArray);
    console.log(testArray.shift()); // return from front
    console.log(testArray);

    let me = {
        name: 'Sheldon'
    }

    let you = {
        name: 'Someone'
    }

    let us = [me, you];

    let indexOfMe = us.indexOf(me);
    console.log(indexOfMe);
    us[indexOfMe].age = 53;

    let indexOfYou = us.indexOf(you);
    console.log(indexOfYou);
    you.age = 21;

    console.log(JSON.stringify(us));

    function copyOfArray(arr) {
        return arr.slice();
    }

    // reverse, sort - reverses,sorts an array - alters the array

    let a = [0, 1, 2, 3, 4, 5];
    console.log(JSON.stringify(a));
    let newReverse = a.reverse(); // reverse changes original array
    console.log({a, newReverse});

    let b = [12, 55, 0, 2, 4, 5];
    console.log(JSON.stringify(b));
    let newSort = b.sort((a, b) => Number(a) < Number(b) ? -1 : 1); // sort changes original array
    console.log({b, newSort});

    // slice - does not alter original array

    console.log(names);
    let abc = names.slice(0, 2);
    console.log({abc, names});

    // splice - alters original array

    let arr1 = ['sheldon', 'tom'];
    let arr2 = ['mary', 'sue'];
    let arr3 = arr1.concat(arr2);
    console.log({arr1, arr2, arr3});

})();
