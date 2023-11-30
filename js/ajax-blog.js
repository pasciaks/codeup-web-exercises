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

    function modal(mhead, mbody) {
        let modalHead = document.querySelector("#modalHead");
        let modalBody = document.querySelector("#modalBody");
        modalHead.innerText = mhead;
        modalBody.innerHTML = mbody;
        document.querySelector("#modal").classList.add("show");
        document.querySelector("#modal").style.display = "block";
        document.querySelector("#modalClose").addEventListener("click", () => {
            document.querySelector("#modal").classList.remove("show");
            document.querySelector('#modal').removeAttribute("style");
        }, {once: true});
    }

    fetch('./data/blog.json')
        .then(response => response.json())
        .then(data => {
            let html = '';
            let divTemplate = ``;

            data.forEach((blog, index) => {
                let content = blog.content;
                let contentMaxLength = 100;
                if (content.length > contentMaxLength) {
                    content = content.substring(0, contentMaxLength) + '...';
                }
                divTemplate = `
                    <div class="blog-item" id="${index}">
                        <h5>${blog.title}</h5>
                        <p class="content">${content}</p>
                        <h6>Categories: <span class="blog-categories">${blog.categories}</span></h6>
                        <h6>Date: <span class="blog-date">${blog.date}</span></h6>
                    </div>
                `;

                html += divTemplate;
            });
            document.querySelector('#posts').innerHTML = html;

            document.querySelectorAll('.blog-item').forEach(blogItem => blogItem.addEventListener('click', (e) => {
                let blogId = e.target.closest('.blog-item').id;
                let blog = data[blogId];
                let mHead = blog.title
                let mBody = `<i class=\"fa-solid fa-mug-hot\"></i>${blog.content}<i class=\"fa-solid fa-mug-hot\"></i>`
                modal(mHead, mBody);
            }));
        })
        .catch(error => console.error(error));


})();

