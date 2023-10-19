(function () {
    "use strict";

    function addToWindow(str) {
        try {
            console.log(str);
            document.getElementById('output').innerHTML += (str + '<br>');
        } catch {
            // not running in browser
        }
    }

    var planets = [
        'Mercury',
        'Venus',
        'Earth',
        'Mars',
        'Jupiter',
        'Saturn',
        'Uranus',
        'Neptune'
    ];

    /**
     * TODO:
     * Read each console log below, and write some javascript code to perform
     * the step that it describes
     */

    addToWindow('Adding "The Sun" to the beginning of the planets array.');
    planets.unshift("The Sun");
    addToWindow(planets);

    addToWindow('Adding "Pluto" to the end of the planets array.');
    planets.push("Pluto");
    addToWindow(planets);

    addToWindow('Removing "The Sun" from the beginning of the planets array.');
    planets.shift();
    addToWindow(planets);

    addToWindow('Removing "Pluto" from the end of the planets array.');
    planets.pop();
    addToWindow(planets);

    addToWindow('Finding and logging the index of "Earth" in the planets array.');
    let earthIndex = planets.indexOf('Earth');
    addToWindow(earthIndex);

    addToWindow("Reversing the order of the planets array.");
    planets = planets.reverse();
    addToWindow(planets);

    addToWindow("Sorting the planets array.");
    planets = planets.sort();
    addToWindow(planets);
})();
