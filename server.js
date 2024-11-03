const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Fetch reviews
app.get('/api/reviews', (req, res) => {
    fs.readFile('db.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        res.json(JSON.parse(data));
    });
});

// Add a new review
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

// Delete a review by title
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
