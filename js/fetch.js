"use strict";

(() => {

    function readGithubUserDataFromRepo(githubUsername, repository, personalAccessToken) {
        let url;
        url = `https://api.github.com/repos/${githubUsername}/${repository}/commits`;
        return fetch(url, {
            headers: {
                'Authorization': personalAccessToken
            }
        });
    }

    document.getElementById('fetch-from-repo-button').addEventListener('click', () => {

        document.getElementById('fetch-from-repo-output').innerHTML = ``;

        let githubUsername = prompt("Enter your GitHub username", "pasciaks");
        let githubRepository = prompt("Enter your GitHub repository", "codeup-web-exercises");
        let githubPersonalAccessToken = prompt("Enter your GitHub token, Do not store this in your code!", "");
        let getData = readGithubUserDataFromRepo(githubUsername, githubRepository, githubPersonalAccessToken);

        getData
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                return data;
            })
            .then((data) => {
                console.log(data);
                if (data?.message === 'Not Found') {
                    throw new Error("Invalid username, repository, access key or possibly private repository.");
                }
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
                return data;
            })
            .catch((error) => {
                console.log(error);
                document.getElementById('fetch-from-repo-output').innerHTML = `${error}`;
                return error;
            });
    });

    function readGithubUserDataEvents(githubUsername, personalAccessToken) {
        let url;
        url = `https://api.github.com/users/${githubUsername}/events`;
        return fetch(url, {
            headers: {
                'Authorization': personalAccessToken
            }
        });
    }

    document.getElementById('fetch-button').addEventListener('click', () => {
        document.getElementById('fetch-output').innerHTML = ``;
        let githubUsername = prompt("Enter your GitHub username", "pasciaks");
        let githubPersonalAccessToken = prompt("Enter your GitHub token, Do not store this in your code!", "");
        let getData = readGithubUserDataEvents(githubUsername, githubPersonalAccessToken);
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
                    document.getElementById('fetch-output').innerHTML += `
                        <p>Created at: ${pushEvent.created_at}</p>
                        <p>Repo name: ${pushEvent.repo.name}</p>
                        <p>Commit message: ${pushEvent.payload.commits[0].message}</p>
                        <p>Event: ${JSON.stringify(pushEvent, null, 2)}</p>
                        `;
                });
            })
            .catch((error) => {
                return error;
            });
    });

})();







