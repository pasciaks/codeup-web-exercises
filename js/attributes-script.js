"use strict";

/*

Now, let's use JavaScript to manipulate these elements:

Two seconds after the page loads, change the "profile-pic" src attribute to a different image.

Four seconds after the page loads, use innerHTML to change the name in "profile-name".

Six seconds after page loads, add a new class to "profile-desc" that changes the color and font of the description text.

Use setTimout to create these behaviors.

Write code that toggles a class on the "profile-card" that changes its background color every two seconds. Use setInterval.

*/

(() => {

    setTimeout(function () {
        let intRandom = 1 + Math.floor(Math.random() * 50);
        document.getElementById('profile-pic').src = `https://randomuser.me/api/portraits/men/${intRandom}.jpg`;
    }, 2000);

    setTimeout(function () {
        document.getElementById('profile-name').innerHTML = "Sheldon Pasciak";
    }, 4000);

    setTimeout(function () {
        let profileDescElement = document.getElementById('profile-desc')
        profileDescElement.style.color = 'black';
        profileDescElement.style.fontFamily = "Courier,sans-serif";
    }, 6000);

    // [x] Instead of toggling the background color every two seconds, see below in bonus section

    // setInterval(function () {
    //     document.getElementById('profile-card').classList.toggle('selected');
    // }, 2000);

    function toggleBackground() {
        document.getElementById('profile-card').classList.toggle('selected');
    }

    document.getElementById("toggle-btn").addEventListener("click", toggleBackground);

    /*

        Bonus

        [ ] Encapsulate all your timers in a single function.

        [x] Instead of toggling the background color every two seconds for the "profile-card", create an array of colors and programmatically change the background color every two seconds.

        Hint: You will have to choose a RANDOM index from the array of colors.

        [ ] After all of your timeouts have expired, bring up a prompt that will change "profile-name" text to whatever the user inputs.

     */

    let colors = [];

    let currentColorIndex = 0;

    // generate 100 random colors
    for (let i = 0; i < 100; i++) {
        let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        colors.push(randomColor);
    }

    // [x] Instead of toggling the background color every two seconds for the "profile-card", create an array of colors and programmatically change the background color every two seconds.
    setInterval(function () {
        currentColorIndex = Math.floor(Math.random() * colors.length);
        document.getElementById('profile-card').style.background = colors[currentColorIndex];
    }, 2000);

    let textScroller = " Sheldon Pasciak ";

    setTimeout(function () {
        setInterval(function () {
            let firstChar = textScroller.charAt(0);
            let restOfChars = textScroller.substring(1);
            textScroller = `${restOfChars}${firstChar}`;
            document.getElementById('profile-name').innerHTML = textScroller;
        }, 100);
    }, 8000)

})()