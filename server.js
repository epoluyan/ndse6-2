const express = require('express');
const { v4: uuid } = require('uuid');

class Book {
    constructor(
        id = uuid(),
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName
    ) {
        this.id = id,
        this.title = title,
        this.description = description,
        this.authors = authors,
        this.favorite = favorite,
        this.fileCover = fileCover,
        this.fileName = fileName
    }
}

const store = {
    book: []
}

const app = express();
app.use(express.json);

app.get('/api/books', (req, res) => {
    const { books } = store;
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const index = books.findindex(el => el.id === id);

    if (index !== -1) {
        res.json(books[index]);
    } else {
        res.status(404);
        res.json('Code: 404');
    }
});

app.post('/api/books', (req, res) => {
    const { books } = store;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
    books.push(newBook);
    req.status(201);
    res.json;
});

app.put('/api/books/:id', (req, res) => {
    const { books } = store;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const { id } = req.params;
    const index = books.findindex(el => el.id === id);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        };
        res.json(books[index]);
    } else {
        res.status(404);
        res.json('Code: 404');
    }
});

app.delete('/api/books/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const index = books.findindex(el => el.id === id);

    if (index !== -1) {
        books.slice(index, 1)
        res.json('ok')
    } else {
        res.status(404);
        res.json('Code: 404');
    }
});


app.post('/api/user/login', (req, res) => {
    req.status(201);
    res.json({ 
        id: 1,
        mail: "test@mail.ru"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
