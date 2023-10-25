"use strict";

// $ npm install -g documentation
// $ documentation build js/sheldon.js -f html -o docs

/**
 * isTwo
 * @param num
 * @returns {boolean}
 */
function isTwo(num = null) { // Note: This function will be hoisted!
    return num === 2;
}

/**
 * myFunction
 * @returns {string}
 */
const myFunction = function () {
    return '';
}

/**
 * fatArrow
 * @returns {object}
 */
const fatArrow = () => {
    return {'isObject': true};
}

/**
 * # while read in; do ./script.sh "$in" "break_and_continue.js" ; done < list.txt
 * # while read in; do ./script.sh "$in" "circle.js" ; done < list.txt
 * # while read in; do ./script.sh "$in" "for_loops.js" ; done < list.txt
 */

/**
 * radiancelux
 * pasciaks
 * davidandstephens
 * derykdamon
 * eltownes
 * GBowman1
 * psykter
 * mventura14
 * BryonLuke
 * mbcodepractice
 * RicardoJaimesDez
 * cteriipaia
 * Santoszls3
 * AngelAdell
 * IraHuff
 * AmritLee
 * TheCosmicFish
 * MichaelaArteberry
 * Cmgrowald
 * Yadriel-Ruiz
 * easi-d-hatchett
 * sethcrist
 * Geoffrey-m-rendon
 * ben-w-martin
 */

/**
 * curl -o $1-$2 -LO https://raw.githubusercontent.com/$1/codeup-web-exercises/main/js/$2
 * # while read in; do ./script.sh "$in" "break_and_continue.js" ; done < list.txt
 * # while read in; do ./script.sh "$in" "circle.js" ; done < list.txt
 * # while read in; do ./script.sh "$in" "for_loops.js" ; done < list.txt
 * # while read in; do ./script.sh "$in" "external.js" ; done < list.txt
 * # while read in; do ./script.sh "$in" "conditionals.js" ; done < list.txt
 */
console.log(typeof isTwo);
console.log(typeof myFunction)
console.log(typeof fatArrow)
console.log(typeof isTwo());
console.log(typeof myFunction())
console.log(typeof fatArrow())

console.log('---------');

function printNumberedList(firstValue, ...vals) {
    console.log(typeof vals);
    console.log(firstValue);
    console.log(vals);
    for (let i = 0; i < vals.length; i++) {
        console.log(`index # ${i} : ${vals[i]}`);
    }
}

let planets = ['mercury', 'mars', 'earth'];

printNumberedList(...planets);

// ----------

function printNumberedList2(vals) {
    console.log(typeof vals);
    for (let i = 0; i < vals.length; i++) {
        console.log(`index # ${i} : ${vals[i]}`);
    }
}

let planets2 = ['mercury', 'mars', 'earth'];

printNumberedList2(planets2);
