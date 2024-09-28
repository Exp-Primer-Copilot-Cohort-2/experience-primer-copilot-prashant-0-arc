// create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all comments
app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.send(JSON.parse(data));
  });
});

// Add a comment
app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    const comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      res.send('Comment added');
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});