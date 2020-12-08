const express = require('express');
var cors = require('cors');

const app = express();
const port = process.env.PORT || 3003;

app.get('/', (request, response) => {
    response.send('Welcome to Nearby Places API');
});

app.listen(port, () => {
    console.log(`Nearby Places API listening on port ${port}!`);
});