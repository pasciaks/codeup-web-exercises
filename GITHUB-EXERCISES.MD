Exercises
Handle An API Promise
Create a file named fetch.js inside of your js directory.

Create a file named fetch.html where your other HTML files reside, and include js/fetch.js in a script element.

Generate a Personal Access Token for the GitHub API.

Please choose the "classic" access token type

For permissions, you only need to put a check in "read:user"

We will use this so that we don't get rate limited when talking to the GitHub API. You can add the token to your
requests like this:

fetch(url, {headers: {'Authorization': 'token YOUR_TOKEN_HERE'}})
Create a function that accepts a GitHub username, and returns a promise that resolves returning just the date of the
last commit that user made. Reference the github api documentation to achieve this.
Ajax Store
Download and save ajax-store.html.
Create a data directory and download inventory.json to that folder.
Your online tool store should load data from the JSON file using a get request and append the data to the table. As
explained in the lesson, you will need to use fetch and a couple of .then() calls.
Add some new entries to inventory.json and see how the data on the page gets updated.
Make your store look better using custom CSS and/or Bootstrap
Ajax Blog
Create a new html file called ajax-blog.html.
At minimum, your Ajax blog will need an empty <div> with an id of posts.
Download blog.json to your data directory from before.
Use Ajax to load the contents of blog.json and add the data from it to your #posts div.
Add additional entries to blog.json and make sure your changes are reflected on the page.
Make it pretty with custom CSS and/or Bootstrap.