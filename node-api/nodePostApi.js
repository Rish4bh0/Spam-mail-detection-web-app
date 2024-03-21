const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.post('/classify', (req, res) => {
    const text = req.body.text;

    // Define the data payload
    const data = {
        text: text
    };

    // Define the FastAPI endpoint URL
    const url = 'http://localhost:8000/predict/';

    // Send POST request to the FastAPI endpoint
    axios.post(url, data)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        });
});

app.listen(port, () => {
    console.log(`Node.js API server listening at http://localhost:${port}`);
});
