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

})();
