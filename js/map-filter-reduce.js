"use strict";

(() => {
    console.log("Started...");

    const users = [
        {
            id: 1,
            name: 'ryan',
            email: 'ryan@codeup.com',
            languages: ['clojure', 'javascript'],
            yearsOfExperience: 5
        },
        {
            id: 2,
            name: 'luis',
            email: 'luis@codeup.com',
            languages: ['java', 'scala', 'php'],
            yearsOfExperience: 6
        },
        {
            id: 3,
            name: 'zach',
            email: 'zach@codeup.com',
            languages: ['javascript', 'bash'],
            yearsOfExperience: 7
        },
        {
            id: 4,
            name: 'fernando',
            email: 'fernando@codeup.com',
            languages: ['java', 'php', 'sql'],
            yearsOfExperience: 8
        },
        {
            id: 5,
            name: 'justin',
            email: 'justin@codeup.com',
            languages: ['html', 'css', 'javascript', 'php'],
            yearsOfExperience: 9
        }
    ];

    /*
        Exercises
        Create a file named map-filter-reduce.js in your js directory and copy the users data below into it.
        Use .filter to create an array of user objects where each user object has at least 3 languages in the languages array.
        Use .map to create an array of strings where each element is a user's email address
        Use .reduce to get the total years of experience from the list of users. Once you get the total of years you can use the result to calculate the average.
        Use .reduce to get the longest email from the list of users.
        Use .reduce to get the list of user's names in a single string. Example: Your instructors are: ryan, luis, zach, fernando, justin.
        Bonus
        Use .reduce to get the unique list of languages from the list of users.

     */

    // Use .filter to create an array of user objects where each user object has at least 3 languages in the languages array.
    let usersWithAtLeast3Languages = users.filter(user => user.languages.length >= 3);
    console.log(usersWithAtLeast3Languages);

    // Use .map to create an array of strings where each element is a user's email address
    let userEmails = users.map(user => user.email);
    console.log(userEmails);

    // Use .reduce to get the total years of experience from the list of users. Once you get the total of years you can use the result to calculate the average.
    let totalYearsOfExperience = users.reduce((total, user) => total + user.yearsOfExperience, 0);
    console.log(totalYearsOfExperience);
    let averageYearsOfExperience = totalYearsOfExperience / users.length;
    console.log(averageYearsOfExperience);

    // Use .reduce to get the longest email from the list of users.
    let longestEmail = users.reduce((longestEmail, user) => {
        if (user.email.length > longestEmail.length) {
            longestEmail = user.email;
        }
        return longestEmail;
    }, "");
    console.log(longestEmail);

    // Use .reduce to get the list of user's names in a single string. Example: Your instructors are: ryan, luis, zach, fernando, justin.
    let usersNames = users.reduce((names, user) => {
        if (names === "") {
            names = user.name;
        } else {
            names = names + ", " + user.name;
        }
        return names;
    }, "");
    console.log(usersNames);

    // Use .reduce to get the unique list of languages from the list of users.
    let uniqueListOfLanguages = users.reduce((uniqueListOfLanguages, user) => {
        user.languages.forEach(language => {
            if (!uniqueListOfLanguages.includes(language)) {
                uniqueListOfLanguages.push(language);
            }
        });
        return uniqueListOfLanguages;
    }, []);
    console.log(uniqueListOfLanguages);

    // bonus: Use .reduce to get the unique list of languages from the list of users, along with count of each language.

    let uniqueListOfLanguagesWithCount = users.reduce((uniqueListOfLanguagesWithCount, user) => {
        user.languages.forEach(language => {
            if (uniqueListOfLanguagesWithCount[language] === undefined) {
                uniqueListOfLanguagesWithCount[language] = 1;
            } else {
                uniqueListOfLanguagesWithCount[language]++;
            }
        });
        return uniqueListOfLanguagesWithCount;
    }, {});
    console.log(uniqueListOfLanguagesWithCount);

})();