(async () => {

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

    const createAuthor = async (author) => {
        try {
            const url = 'http://localhost:3000/authors';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(author)
            };
            const response = await fetch(url, options);
            const newAuthor = await response.json();
            console.log(newAuthor);
            return newAuthor;
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

    const createABook = async (book = {}) => {
        let newBookData = {...book};
        newBookData = {
            ...newBookData,
            "id": null,
            "title": "Moby Dick " + Math.random(),
            "authorId": 4,
            "publishedYear": 1851 + Math.floor(Math.random() * 100),
            "genre": "Adventure Fiction " + Math.random(),
            "summary": "The epic tale of the relentless pursuit of the great white whale.",
            "ISBN": Date.now().toString()
        }

        return await createBook(newBookData);
    }

    console.log(await createABook());

    let allBooks = await getBooks();

    console.log(allBooks.length);

})();

/**
 * When to Use PUT or PATCH:
 * PUT: Use PUT when you have the full representation of the resource and want to replace the existing resource entirely.
 * PATCH: Use PATCH when you want to apply partial updates to a resource, especially when dealing with large resources, or when you want to minimize the data sent over the network.
 */

/**
 *
 * POST                    for (C)reating Data
 * GET                       for (R)eading Data
 * PUT/PATCH           for (U)pdating Data
 * DELETE                  for (D)eleting Data
 */
