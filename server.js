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
    console.log(request.body)
    let name = request.body.name;
    let address = request.body.address;
    let username = request.body.username;
    db.savePlace(name, address, username)
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
app.get('/place/image/:placeid', (request, response) => {
    let id = request.params.placeid
    db.getImageData(id)
        .then(data => {
            if (data) {
                console.log(`sending the file ${id} ...`);
                response.contentType('image/png');
                response.send(data);
            } else {
                response.status(404).json({ error: `Image for quiz ${id} was not found.` });
            }
        })
        .catch(e => {
            console.log(e);
            response.status(500).json({ error: `An error happened on the server.` });
        }
        );
});
app.post('/review/:placeid', (request, response) => {
    let user = request.body.user;
    let review = request.body.review;
    let rating = request.body.rating;
    db.saveReview(user, review, rating, request.params.placeid)
        .then(x => response.json({message: 'Review added'}));
});
app.get('/search/:searchTerm/:location', (request, response) => {
    db.getSearchResult(request.params.searchTerm, request.params.location).then(x => response.json(x))
        .catch(e => response.status(404).json({error: e}))
});
app.listen(port, () => {
    console.log(`Nearby Places API listening on port ${port}!`);
});
