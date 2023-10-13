(function () {
    "use strict";

    var planetsString = "Mercury|Venus|Earth|Mars|Jupiter|Saturn|Uranus|Neptune";
    var planetsArray;

    // TODO: Convert planetsString to an array, save it to planetsArray.

    planetsArray = planetsString.split("|");

    console.log(planetsArray);

    // TODO: Create a string with <br> tags between each planet. console.log() your results.
    //       Why might this be useful? (( see the bonus implementation answer below ))

    var displayPlanets = planetsArray.join("<br>");
    console.log(displayPlanets);
    document.body.innerHTML += displayPlanets;

    // Useful to help derive content for showing on a webpage.

    // Bonus: Create a second string that would display your planets in an undordered list.
    //        You will need an opening AND closing <ul> tags around the entire string, and <li> tags around each planet.
    //        console.log() your results.

    let ul = `<ul>{replaceOutside}</ul>`;

    let li = `<li>{replaceContent}</li>`;

    let listOfLi = planetsArray.map((planet) => {
        return li.replace("{replaceContent}", planet);
    });

    console.log(listOfLi); // array of li items

    ul = ul.replace("{replaceOutside}", listOfLi.join(""));

    console.log(ul);

    document.body.innerHTML += ul;

})();
