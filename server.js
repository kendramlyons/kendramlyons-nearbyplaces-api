const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./data');

const app = express();
const port = process.env.PORT || 3003;

//middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.send('Welcome to Nearby Places API');
});

app.post('/place', (request, response) => {

});
app.get('/places', (request, response) => {
    let metadata = data.places.map(x => {
        return{name: x.name, reviews: x.reviews};
    });
    response.json(metadata);
});
app.listen(port, () => {
    console.log(`Nearby Places API listening on port ${port}!`);
});