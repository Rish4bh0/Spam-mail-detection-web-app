const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.options('*', cors());

app.post('/classify', async (req, res) => {
    const text = req.body.text;
    const data = { text };
    const url = 'https://spam-mail-detection-web-app.onrender.com/predict/';

    try {
        const response = await axios.post(url, data);
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error('Error Response:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            // Request was made but no response was received
            console.error('Error Request:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error Message:', error.message);
        }
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`Node.js API server listening at http://localhost:${port}`);
});