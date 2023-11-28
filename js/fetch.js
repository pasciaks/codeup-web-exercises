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


    function readGithubUserDataFromRepo(githubUsername, repository, personalAccessToken) {

        let url;

        url = `https://api.github.com/repos/${githubUsername}/${repository}/commits`;

        return fetch(url, {
            headers: {
                'Authorization': personalAccessToken
            }
        });

    }


    function readGithubUserData(githubUsername, personalAccessToken) {

        let url;

        url = `https://api.github.com/users/${githubUsername}/events`;

        return fetch(url, {
            headers: {
                'Authorization': personalAccessToken
            }
        });


    }

    document.getElementById('fetch-from-repo-button').addEventListener('click', () => {
        let githubUsername = prompt("Enter your GitHub username", "pasciaks");
        let githubRepository = prompt("Enter your GitHub repository", "codeup-web-exercises");
        let githubPersonalAccessToken = prompt("Enter your GitHub token, Do not store this in your code!", "");
        let getData = readGithubUserDataFromRepo(githubUsername, githubRepository, githubPersonalAccessToken);

        let events = {};

        getData
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                alert(JSON.stringify(data, null, 2));
                return data;
            })
            .then((data) => {
                console.log(data);
                return data;
            })
            .then((data) => {

                data.forEach((commit, index) => {
                    if (index === 0) {
                        console.log("Most recent commit:");
                        console.log(commit);
                        console.log(commit.commit.author.date);
                    }
                });

                document.getElementById('fetch-from-repo-output').innerHTML = `
                        <h2>Most recent commit:</h2>
                        <p>Created at: ${data[0].commit.author.date}</p>
                        <p>Commit message: ${data[0].commit.message}</p>
                        `;

            })
            .catch((error) => {
                return error;
            });
    });


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







