(async () => {


// // index.js
// fetch('http://localhost:3000/books')
//     .then(response => response.json())
//     .then(books => console.log(books))
//     .catch(error => console.error(error));
//
// // index.js
// fetch('http://localhost:3000/books/1')
//     .then(response => response.json())
//     .then(book => {
//         // do something with the `book` data
//         console.log(book);
//     })
//     .catch(error => console.error(error));
//
// // index.js
// fetch('http://localhost:3000/books/1')
//     .then(response => response.json())
//     .then(book => {
//         // A second fetch request to get the author data
//         fetch(`http://localhost:3000/authors/${book.authorId}`)
//             .then(response => response.json())
//             .then(author => {
//                 // Log the book and author data to the console
//                 console.log(book);
//                 console.log(author);
//                 // OR we could simply add the author into the book object
//                 book.author = author;
//                 console.log(book);
//             })
//             .catch(error => console.error(error));
//     })
//     .catch(error => console.error(error));
//
//
// // index.js
// const getBookAndAuthor = async (id) => {
//     try {
//         // Get the book data
//         const bookUrl = `http://localhost:3000/books/${id}`;
//         const bookResponse = await fetch(bookUrl);
//         const book = await bookResponse.json();
//         // Get the author data
//         const authorUrl = `http://localhost:3000/authors/${book.authorId}`;
//         const authorResponse = await fetch(authorUrl);
//         const author = await authorResponse.json();
//         // Add the author to the book object
//         book.author = author;
//         // Return the book object
//         return book;
//     } catch (error) {
//         console.error(error);
//     }
// }
//
//
//
//
//
//

// index.js
// const getBookAndAuthor = async (id) => {
//     try {
//         // Get the book data
//         const bookUrl = `http://localhost:3000/books/${id}`;
//         const bookResponse = await fetch(bookUrl);
//         const book = await bookResponse.json();
//         // Get the author data
//         const authorUrl = `http://localhost:3000/authors/${book.authorId}`;
//         const authorResponse = await fetch(authorUrl);
//         const author = await authorResponse.json();
//         // Add the author to the book object
//         book.author = author;
//         // Return the book object
//         return book;
//     } catch (error) {
//         console.error(error);
//     }
// }

// async function init() {
//     let result = await getBookAndAuthor(1);
//     console.log(result);
// }

// init();


// index.js
// async function to retrieve a specific book's data with author data
// const getBookAndAuthor = async (id) => {
//     try {
//         // Get the book data
//         const bookUrl = `http://localhost:3000/books/${id}`;
//         const bookResponse = await fetch(bookUrl);
//         const book = await bookResponse.json();
//         // Get the author data
//         const authorUrl = `http://localhost:3000/authors/${book.authorId}`;
//         const authorResponse = await fetch(authorUrl);
//         const author = await authorResponse.json();
//         // Add the author to the book object
//         book.author = author;
//         // Return the book object
//         return book;
//     } catch (error) {
//         console.error(error);
//     }
// }
//
// // async IIFE (Immediately Invoked Function Expression)
// (async () => { // <-- this is our main thread
//     const book = await getBookAndAuthor(1);
//     console.log(book);
// })();

// books-api.js
    const getBookAndAuthor = async (id) => { // <-- notice the export keyword
        try {
            // Get the book data
            const bookUrl = `http://localhost:3000/books/${id}`;
            const bookResponse = await fetch(bookUrl);
            const book = await bookResponse.json();
            // Get the author data
            const authorUrl = `http://localhost:3000/authors/${book.authorId}`;
            const authorResponse = await fetch(authorUrl);
            const author = await authorResponse.json();
            // Add the author to the book object
            book.author = author;
            // Return the book object
            console.log(book);
            return book;
        } catch (error) {
            console.error(error);
        }
    }


    const createBook = async (book) => {
        try {
            const url = 'http://localhost:3000/books';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            };
            const response = await fetch(url, options);
            const newBook = await response.json();
            console.log(newBook);
            return newBook;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const getBooks = async (book) => {
        try {
            const url = 'http://localhost:3000/books';
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(url, options);
            const books = await response.json();
            return books;
        } catch (error) {
            console.error(error);
        }
    }

    async function initCreateBook() {
        let book = {
            // "id": 4, <-- this will be auto-generated by the server
            "title": "Moby Dick",
            "authorId": 4,
            "publishedYear": 1851,
            "genre": "Adventure Fiction",
            "summary": "The epic tale of the relentless pursuit of the great white whale.",
            "ISBN": "9780142000083"
        }

        let newBook = await createBook(book);
        
        console.log(newBook);

        return newBook;
    }

    await initCreateBook();

    let allBooks = await getBooks();

    console.log(allBooks.length);

})();
