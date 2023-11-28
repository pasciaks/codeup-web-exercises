"use strict";

(() => {

    // The below code is kept here for important reference during this lesson.

    // fetch("https://pokeapi.co/api/v2/pokemon/charmander")
    //     .then(response => {
    //         // can't use the response's data yet. have to json() it
    //         return response.json();
    //     })
    //     .then(data => {
    //         // at this point, we can use the response's data
    //         console.log(data);
    //     });


    function readGithubUserData(githubUsername, personalAccessToken) {

        // https://api.github.com/users/pasciaks/events
        // https://api.github.com/users/pasciaks/repos
        // https://api.github.com/users/pasciaks/orgs
        // https://api.github.com/users/pasciaks/starred
        // https://api.github.com/users/pasciaks/subscriptions
        // https://api.github.com/users/pasciaks/followers
        // https://api.github.com/users/pasciaks/commits

        let url;

        url = `https://api.github.com/users/${githubUsername}/events`;

        return fetch(url, {
            headers: {
                'Authorization': personalAccessToken
            }
        });


    }

    document.getElementById('fetch-button').addEventListener('click', () => {
        let githubUsername = prompt("Enter your GitHub username", "pasciaks");
        let githubPersonalAccessToken = prompt("Enter your GitHub token, Do not store this in your code!", "");
        let getData = readGithubUserData(githubUsername, githubPersonalAccessToken);

        let events = {};

        getData
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let arrayOfEvents = Object.keys(data);
                arrayOfEvents.forEach((event) => {
                    let currentEvent = data[event];
                    if (!events[currentEvent.type]) {
                        events[currentEvent.type] = [];
                        events[currentEvent.type].push(currentEvent);
                    } else {
                        events[currentEvent.type].push(currentEvent);
                    }
                });
                return events;
            })
            .then((events) => {
                return events['PushEvent'];
            })
            .then((pushEvents) => {
                pushEvents.forEach((pushEvent, index) => {
                    if (index === 0) {
                        console.log("Most recent push event:");
                        console.log(pushEvent);
                        console.log(pushEvent.created_at);

                        document.getElementById('fetch-output').innerHTML = `
                        <h2>Most recent push event:</h2>
                        <p>Created at: ${pushEvent.created_at}</p>
                        <p>Repo name: ${pushEvent.repo.name}</p>
                        <p>Commit message: ${pushEvent.payload.commits[0].message}</p>
                        <p>Event: ${JSON.stringify(pushEvent)}</p>
                        `;
                    }
                });
            })
            .catch((error) => {
                return error;
            });
    });


})();







