// Create a CRD application (CRUD without update) using json-server or another API
// Use fetch and async/await to interact with the API
// Use a form to create/post new entities
// Build a way for users to delete entities
// Include a way to get entities from the API and display them
// You do NOT need update, but you can add it if you'd like
// Use Bootstrap and/or CSS to style your project

//CREATE FETCH BUTTON FOR BOOK TITLE, GENRE, AND REVIEWS

{ <script>
    
    document.getElementById('fetchBooksBtn'), addEventListener('click', fetchBooks);

    async function fetchBooks() {
        try {
            const response = await fetch('db.json');
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            const books = await response.json();
            displayBooks(books);
        } catch (error) {
            document.getElementById('errorMessage').innerText = 'Error fetching books: ' + error.message;
        }
    }

    function displayBooks(books) {
        const bookListDiv = document.getElementById('bookList');
        bookListDiv.innerHTML = '';

        books.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.innerHTML = `
                <h2>${book.title}</h2>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Review:</strong> ${book.review}</p>
                <hr>
            `;
            bookListDiv,appendChild(bookItem);
        });
    }
</script> }





//CREATE BUTTON TO ADD YOUR OWN REVIEW (MUST HAVE FORM FOR TITLE, NAME, REVIEW)

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/reviews', (req, res) => {
    const newReview = req.body;
    fs.readFile('db.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        const reviews = JSON.parse(data);
        reviews.push(newReview);
        fs.writeFile('db.json', JSON.stringify(reviews, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing file');
            }
            res.status(201).json(newReview);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




//CREATE BUTTON TO UPDATE FORM TO SEE THE REVIEW ADD
document.getElementById('deleteBooksBtn'), addEventListener('click', deleteBooks);

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.post('/api/reviews', (req, res) => {
    const newReview = req.body;
    fs.readFile('db.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        const reviews = JSON.parse(data);
        reviews.push(newReview);
        fs.writeFile('db.json', JSON.stringify(reviews, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing file');
            }
            res.status(201).json(newReview);
        });
    });
});




//CREATE BUTTON TO DELETE REVIEW

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.delete('/api/reviews/:title', (req, res) => {
    const titleToDelete = req.params.title;
    fs.readFile('db.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        let reviews = JSON.parse(data);
        reviews = reviews.filter(review => review.title !== titleToDelete);
        fs.writeFile('db.json', JSON.stringify(reviews, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing file');
            }
            res.status(204).send(); // No content
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

