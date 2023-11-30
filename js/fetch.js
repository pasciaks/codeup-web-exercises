"use strict";

(() => {

    function readPublic(githubUsername, personalAccessToken) {
        let url = `https://api.github.com/users/${githubUsername}/events/public`;
        return fetch(url, {
            headers: {
                'Authorization': 'token ' + personalAccessToken, 'X-GitHub-Api-Version': '2022-11-28'
            }
        });
    }

    document.getElementById('publicRepoVersion').addEventListener('click', () => {

        let resultContainer = document.getElementById('publicRepoResult');

        resultContainer.innerHTML = ``;

        let getData = readPublic(GITHUB_USERNAME, GITHUB_PERSONAL_ACCESS_TOKEN);

        getData
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                data = data.filter((event) => {
                    return event.type === 'PushEvent';
                });
                for (let i = 0; i < data.length; i++) {
                    if (i === 0) {
                        resultContainer.innerHTML = `
                        <h2>Most recent commit:</h2>
                        <p>Created at: ${data[i].created_at}</p>
                        <p>Repo: ${data[i].repo.name}</p>
                        `;

                        let arrayOfCommits = data[i].payload.commits;
                        arrayOfCommits.forEach((commit) => {
                            resultContainer.innerHTML += `
                            <p>Commit message: ${commit.message}</p>
                            `;
                        });
                    }
                    console.log(data[i]);
                    console.log(data[i].created_at);
                    console.log(data[i].repo.name);
                    console.log(data[i].payload.commits);
                }
                return data;
            })
            .catch((error) => {
                console.log(error);
                resultContainer.innerHTML = `${JSON.stringify(error, null, 2)}`;
                return error;
            });

    });

    function readGithubUserDataFromRepo(githubUsername, repository, personalAccessToken) {
        let url = `https://api.github.com/repos/${githubUsername}/${repository}/commits`;
        return fetch(url, {
            headers: {
                'Authorization': 'token ' + personalAccessToken, 'X-GitHub-Api-Version': '2022-11-28'
            }
        });
    }

    document.getElementById('fetch-from-repo-button').addEventListener('click', () => {

        let resultContainer = document.getElementById('fetch-from-repo-output');
        resultContainer.innerHTML = ``;

        let getData = readGithubUserDataFromRepo(GITHUB_USERNAME, GITHUB_REPOSITORY, GITHUB_PERSONAL_ACCESS_TOKEN);

        getData
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                return data;
            })
            .then((data) => {
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
                        console.log(commit.commit.message);
                    }
                });
                resultContainer.innerHTML = `
                        <h2>Most recent commit:</h2>
                        <p>Created at: ${data[0].commit.author.date}</p>
                        <p>Commit message: ${data[0].commit.message}</p>
                        `;
                return data;
            })
            .catch((error) => {
                console.log(error);
                resultContainer.innerHTML = `${JSON.stringify(error, null, 2)}`;
                return error;
            });
    });

    function readGithubUserDataEvents(githubUsername, personalAccessToken) {
        let url;
        url = `https://api.github.com/users/${githubUsername}/events`;
        return fetch(url, {
            headers: {
                'Authorization': 'token ' + personalAccessToken, 'X-GitHub-Api-Version': '2022-11-28'
            }
        });
    }

    document.getElementById('fetch-button').addEventListener('click', () => {

        let resultContainer = document.getElementById('fetch-output');
        resultContainer.innerHTML = ``;

        let getData = readGithubUserDataEvents(GITHUB_USERNAME, GITHUB_PERSONAL_ACCESS_TOKEN);

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
            .then((pushEvents) => {
                resultContainer.innerHTML = `<h2>Categorized events:</h2>`;
                let arrayOfKeys = Object.keys(pushEvents);
                arrayOfKeys.forEach((key) => {
                    resultContainer.innerHTML += `<h3>${key}</h3>`;
                    pushEvents[key].forEach((event) => {
                        resultContainer.innerHTML += `
                        <p>Created at: ${event.created_at}: Repo: ${event.repo.name}</p>
                        <pre>Message: ${JSON.stringify(event.payload.commits, null, 2)}</pre>
                        `;
                    });
                });

                resultContainer.innerHTML += JSON.stringify(pushEvents, null, 2);
            })
            .catch((error) => {
                console.log(error);
                resultContainer.innerHTML = `${JSON.stringify(error, null, 2)}`;
                return error;
            });
    });

    function initialStartup() {

        let url = `https://api.github.com/users/${GITHUB_USERNAME}`;

        let userAvatar = document.getElementById('user-avatar');

        // NOTE: after the image is loaded, remove the display none class
        document.getElementById('user-avatar').addEventListener('load', () => {
            document.getElementById('user-avatar').classList.remove('d-none');
        });

        fetch(url, {
            headers: {
                'Authorization': 'token ' + GITHUB_PERSONAL_ACCESS_TOKEN, 'X-GitHub-Api-Version': '2022-11-28'
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                userAvatar.src = data?.avatar_url;
                return data;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });

    }

    initialStartup();

})();







