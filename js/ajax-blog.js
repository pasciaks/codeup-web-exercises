"use strict";

/*

  Ajax Blog
  [x] Create a new html file called ajax-blog.html.
  [x] At minimum, your Ajax blog will need an empty <div> with an id of posts.
  [x] Download blog.json to your data directory from before.
  [x] Use Ajax to load the contents of blog.json and add the data from it to your #posts div.
  [x] Add additional entries to blog.json and make sure your changes are reflected on the page.
  [x] Make it pretty with custom CSS and/or Bootstrap.

 */

(() => {

    fetch('./data/blog.json')
        .then(response => response.json())
        .then(data => {
            let html = '';
            let divTemplate = ``;

            data.forEach(blog => {
                divTemplate = `
                    <div class="blog-item">
                        <h5>${blog.title}</h5>
                        <p>${blog.content}</p>
                        <h6>Categories: <span class="blog-categories">${blog.categories}</span></h6>
                        <h6>Date: <span class="blog-date">${blog.date}</span></h6>
                    </div>
                `;

                html += divTemplate;
            });
            document.querySelector('#posts').innerHTML = html;
        })
        .catch(error => console.error(error));

})();

