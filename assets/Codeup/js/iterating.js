(function () {

    "use strict";

    // TODO: Create an array of 4 people's names using literal array notation, in a variable called 'names'.

    let names = ['Sheldon', 'Scott', 'Steve', 'Stanley'];

    // TODO: Create a log statement that will log the number of elements in the names array.

    console.log(`There are ${names.length} elements in the array.`);

    // TODO: Create log statements that will print each of the names array elements individually.

    console.log("Element 1 at index 0 is " + names[0]);
    console.log("Element 2 at index 1 is " + names[1]);
    console.log("Element 3 at index 2 is " + names[2]);
    console.log("Element 4 at index 3 is " + names[3]);

    console.log(`There are ${names.length} elements in the array.`);

    console.log("for loop");

    for (var i = 0; i < names.length; i++) {
        console.log('The name at index ' + i + ' is: ' + names[i]);
    }

    console.log(`There are ${names.length} elements in the array.`);

    console.log("forEach loop");

    names.forEach(function (name, index, array) {
        // element is the name
        // index is the iterator
        // array is the names array itself
        console.log('The name at index ' + index + ' is: ' + name);
    });

    names.push('Sandra');
    names.push('Sharon');
    names.push('Sheila');
    names.push('Shelly');

    console.log(`There are now ${names.length} elements in the array.`);

    console.log("forEach loop");

    names.forEach(function (name, index, array) {
        // element is the name
        // index is the iterator
        // array is the names array itself
        console.log('The name at index ' + index + ' is: ' + name);
    });

    // push add to end

    // unshift add to front

    // pop remove from end

    // shift remove from front

    // splice (( splice returns what is spliced and modifies original array ))

    var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

    console.log(colors);

    let result = colors.splice(0, 2);

    console.log(colors);
    console.log(result);

    // splice can be used to insert new elements

    let result2 = colors.splice(colors.indexOf('blue') + 1, 0, 'new color 1', 'new color 2');
    console.log(colors);
    console.log(result2);

    // array.reverse

    // array.sort(function(a,b)=>{return a<b})


})();
