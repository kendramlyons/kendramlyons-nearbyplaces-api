const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./data');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3003;

//middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.send('Welcome to Nearby Places API');
});

app.post('/place', (request, response) => {
    let name = req.body.name;
    let address = req.body.address;

    db.savePlace(name, address)
        .then(x => response.json({message: 'Place Saved'}));
});
function groupBy(collection, property) {
    var i = 0, val, index,
        values = [], result = [];
    for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1)
            result[index].push(collection[i]);
        else {
            values.push(val);
            result.push([collection[i]]);
        }
    }
    return result;
}
app.get('/places', (request, response) => {
    db.getPlaces().then(x => response.json(groupBy(x, 'placeid')))
        .catch(e => response.status(500).json({error: e}));
});
app.post('/review/:placeid:reviewid', (request, response) => {
    let user = req.body.user;
    let review = req.body.review;
    let rating = req.body.rating;
    db.saveReview(user, review, rating)
        .then(x => response.json({message: 'Review added'}));
});
app.get('/search/:searchTerm/:location', (request, response) => {
    db.getSearchResult().then(x => response.json())
        .catch(e => response.status(404).json({error: e}))
});
app.listen(port, () => {
    console.log(`Nearby Places API listening on port ${port}!`);
});
