(function () {
        "use strict";

        /**
         * TODO:
         * Create an object with firstName and lastName properties that are strings
         * with your first and last name. Store this object in a variable named
         * `person`.
         *
         * Example:
         *  > console.log(person.firstName) // "Rick"
         *  > console.log(person.lastName) // "Sanchez"
         */

        let person = {
            firstName: 'Sheldon',
            lastName: 'Pasciak'
        }

        console.log(person.firstName);
        console.log(person.lastName);

        // console.log(JSON.stringify(person, 0, 2));

        /**
         * TODO:
         * Add a sayHello method to the person object that returns a greeting using
         * the firstName and lastName properties.
         * console.log the returned message to check your work
         *
         * Example
         * > console.log(person.sayHello()) // "Hello from Rick Sanchez!"
         */

        person.sayHello = function () {
            return `Hello, ${this.firstName} ${this.lastName}!`;
        }

        let sayHelloResult = person.sayHello();
        console.log(`person.sayHello()`);
        console.log(sayHelloResult);

        /** TODO:
         * HEB has an offer for the shoppers that buy products amounting to
         * more than $200. If a shopper spends more than $200, they get a 12%
         * discount. Write a JS program, using conditionals, that logs to the
         * browser, how much Ryan, Cameron and George need to pay. We know that
         * Cameron bought $180, Ryan $250 and George $320. Your program will have to
         * display a line with the name of the person, the amount before the
         * discount, the discount, if any, and the amount after the discount.
         *
         * Uncomment the lines below to create an array of objects where each object
         * represents one shopper. Use a foreach loop to iterate through the array,
         * and console.log the relevant messages for each person
         */

        var shoppers = [
            {name: 'Cameron', amount: 180},
            {name: 'Ryan', amount: 250},
            {name: 'George', amount: 320}
        ];

        function calculateDiscountIfAny(num, minPurchase = 200) {
            if (Number(num) > minPurchase) {
                return 0.12;
            }
            return 0;
        }

        function calculateDiscountAmount(num, discountDecimalValue) {
            return num * discountDecimalValue;
        }

        function calculateNewPrice(num, discountedPrice) {
            return num - discountedPrice;
        }

        shoppers.forEach((shopper) => {
            let amount = shopper.amount;
            let discountPercentage = calculateDiscountIfAny(amount);
            let discountAmount = calculateDiscountAmount(amount, discountPercentage);
            let discountedPrice = calculateNewPrice(amount, discountAmount);
            let displayLine = `${shopper.name} spent $${amount.toFixed(2)}, discount is: ${discountPercentage * 100}%, $${discountAmount.toFixed(2)} discount, discounted price: $${discountedPrice.toFixed(2)}`
            console.log(displayLine);
        })

        /** TODO:
         * Create an array of objects that represent books and store it in a
         * variable named `books`. Each object should have a title and an author
         * property. The author property should be an object with properties
         * `firstName` and `lastName`. Be creative and add at least 5 books to the
         * array
         *
         * Example:
         * > console.log(books[0].title) // "The Salmon of Doubt"
         * > console.log(books[0].author.firstName) // "Douglas"
         * > console.log(books[0].author.lastName) // "Adams"
         */

        let books = [
            {
                title: 'The Salmon of Doubt',
                author: {
                    firstName: 'Douglas',
                    lastName: 'Adams'
                }
            }
        ]

        books.push(createBook('This is a title', 'John Doe'));
        books.push(createBook('This is a different title', 'Steve Williams Jr.'));
        books.push(createBook('This is a similar Title', 'Ray Charles'));
        books.push(createBook('This is not a good title!', 'Bill Jones'));
        books.push(createBook('This is the last title.', 'Crystal Robbins'));

        console.log(books[0].title) // "The Salmon of Doubt"
        console.log(books[0].author.firstName) // "Douglas"
        console.log(books[0].author.lastName) // "Adams"

        /**
         * TODO:
         * Loop through the books array and output the following information about
         * each book:
         * - the book number (use the index of the book in the array)
         * - the book title
         * - author's full name (first name + last name)
         *
         * Example Console Output:
         *
         *      Book # 1
         *      Title: The Salmon of Doubt
         *      Author: Douglas Adams
         *      ---
         *      Book # 2
         *      Title: Walkaway
         *      Author: Cory Doctorow
         *      ---
         *      Book # 3
         *      Title: A Brief History of Time
         *      Author: Stephen Hawking
         *      ---
         *      ...
         */

        books.forEach((book, index) => {
            showBookInfo(book, index);

            // console.log(`Book # ${index}`);
            // console.log(`Title: ${book.title}`);
            // console.log(`Author: ${book.author.firstName} ${book.author.lastName}`);
            // console.log(`---`);
        })

        /**
         * Bonus:
         * - Create a function named `createBook` that accepts a title and author
         *   name and returns a book object with the properties described
         *   previously. Refactor your code that creates the books array to instead
         *   use your function.
         * - Create a function named `showBookInfo` that accepts a book object and
         *   outputs the information described above. Refactor your loop to use your
         *   `showBookInfo` function.
         */

        function showBookInfo(book, index) {
            console.log(`Book # ${index + 1}`);
            console.log(`Title: ${book.title}`);
            console.log(`Author: ${book.author.firstName} ${book.author.lastName}`);
            console.log(`---`);
        }

        function createBook(title, author) {
            return {
                title,
                author: {
                    firstName: author.split(' ')[0],
                    lastName: author.split(' ')[1],

                }
            }
        }

        books.push(createBook('Test book title.', 'George Washington'));
        console.log(books);

        const testObject = {}

        // prefer to use dot-notation, with valid js variable naming

        testObject['dateRightNow'] = Date().toString();

        // testObject['Date Right Now'] = Date().toString();
        // testObject['Date-Right-Now'] = Date().toString();

        // console.log(testObject);
        // console.log(testObject.dateRightNow);

        let d0 = new Date();
        let d1 = new Date(1970, 1, 15);
        let d2 = new Date(1970, 1, 15, 8, 0, 0, 0);
        // console.log({d0, d1, d2});

        let todayDate = new Date();
        // console.log(todayDate.getDay());
        // console.log(todayDate.getFullYear());
        // console.log(todayDate.getMonth());
        // console.log(todayDate.getDate());

    }


)()
