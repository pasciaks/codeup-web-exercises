"use strict";

/*

    Ajax Store
    [x] Download and save ajax-store.html.
    [x] Create a data directory and download inventory.json to that folder.
    [x] Your online tool store should load data from the JSON file using a get request and append the data to the table.
    As explained in the lesson, you will need to use fetch and a couple of .then() calls.
    [x] Add some new entries to inventory.json and see how the data on the page gets updated.
    [x] Make your store look better using custom CSS and/or Bootstrap

 */

// External source code references: https://www.freecodecamp.org/news/how-to-format-number-as-currency-in-javascript-one-line-of-code/
// Format the price above to USD using the locale, style, and currency.
let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

// External source code references: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
// https://stackoverflow.com/a/17086002
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// TODO: Create an AJAX GET request for the file under data/inventory.json

fetch('./data/inventory.json')
    .then(response => response.json())
    .then(data => {

        // TODO: Take the data from inventory.json and append it to the products table
        // HINT: Your data should come back as a JSON object; use console.log() to inspect
        //       its contents and fields

        let html = '';

        let category = getParameterByName('category') || '';

        let rowTemplate = `<tr>
                <td>{{title}}</td>
                <td>{{quantity}}</td>
                <td>{{price}}</td>
                <td>{{categories}}</td>
                </tr>`;

        data.forEach(product => {
            console.log(product);
            let {title, quantity, price, categories} = product;
            console.log({title, quantity, price, categories});
            if (category === '' || categories.indexOf(category) >= 0) {
                html += rowTemplate
                    .replace('{{title}}', title)
                    .replace('{{quantity}}', quantity)
                    .replace('{{price}}', USDollar.format(price || 0))
                    .replace('{{categories}}', categories.join(', '));
            }
        });

        // HINT: You will want to target #insertProducts for your new HTML elements
        document.querySelector('#insertProducts').innerHTML = html;

    })
    .catch(error => console.error(error));

