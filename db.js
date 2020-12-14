require('dotenv').config();
const { Pool } = require('pg');


const postgreConnectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;

const postgrePool = new Pool({
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : postgreConnectionString,
    ssl: { rejectUnauthorized: false }
});

function getPlaces() {
    return postgrePool.query('SELECT p.name, p.address, p.image, p.placeid, r.text, r.rating, r.user FROM nearbyplaces.places p join nearbyplaces.reviews r on p.placeid = r.placeid')
        .then(x => x.rows);
}

function savePlace(name, address) {
    return postgrePool.query('INSERT into nearbyplaces.places (name, address)', [name, address])
        .then(x => x.rows);
}

function saveReview(user, review, rating) {
    return postgrePool.query('INSERT into nearbyplaces.reviews (user, text, rating)', [user, review, rating])
        .then(x => x.rows);
}

function getSearchResult(query) {
    return(postgrePool.query(`SELECT p.name, p.address, p.placeid, p.image FROM nearbyplaces.places p where ${query} in p.name`, [query]))
        .then(x => x.rows);
}

module.exports = { getPlaces, savePlace, saveReview, getSearchResult };