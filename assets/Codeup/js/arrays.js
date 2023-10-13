"use strict";

(function () {

    function showArray(array) {
        for (var i = 0; i < array.length; i++) {
            console.log(`${arrayOfNames[i]}`);
        }

    }

    console.log("Hello from external arrays Javascript");

    var arrayOfNames = ['Sheldon', 'Scott', 'Steve', 'Stanley'];

    showArray(arrayOfNames);


})();
