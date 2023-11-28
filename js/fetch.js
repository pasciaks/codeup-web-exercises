// The GitHub token is stored local in my computer notes

function readGithubUserData(githubUsername, personalAccessToken) {

    // https://api.github.com/users/pasciaks/events
    // https://api.github.com/users/pasciaks/repos
    // https://api.github.com/users/pasciaks/orgs
    // https://api.github.com/users/pasciaks/starred
    // https://api.github.com/users/pasciaks/subscriptions
    // https://api.github.com/users/pasciaks/followers
    // https://api.github.com/users/pasciaks/commits

    return fetch(`https://api.github.com/users/${githubUsername}/commits`, {
        headers: {
            'Authorization': personalAccessToken
        }
    })

}

let githubUsername = prompt("Enter your GitHub username");

let githubPersonalAccessToken = prompt("Enter your GitHub token");

let getData = readGithubUserData(githubUsername, githubPersonalAccessToken);
getData.then((data) => {
    console.log(data)
}).catch((error) => {
    console.log(error)
});

// MISC examples

// const githubPromise = fetch('https://api.github.com/repositories');
// const bitbucketPromise = fetch('https://api.bitbucket.org/2.0/repositories');
//
// Promise.all([githubPromise, bitbucketPromise])
//     .then(data => {
//         // here data is an array of the resolved values from each promise
//         // we can now do something with both pieces of data
//         return data;
//     })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch(error => {
//         // handle errors
//         console.log(error);
//     });


