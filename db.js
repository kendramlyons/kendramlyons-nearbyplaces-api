require('dotenv').config();
const { Pool } = require('pg');


const postgreConnectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;

const postgrePool = new Pool({
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : postgreConnectionString,
    ssl: { rejectUnauthorized: false }
});

function getPlaces() {
    return postgrePool.query('SELECT p.name, p.address, p.placeid, r.text, r.rating, r.user FROM nearbyplaces.places p join nearbyplaces.reviews r on p.placeid = r.placeid')
        .then(x => x.rows);
}

function savePlace(name, address) {
    return postgrePool.query('INSERT into nearbyplaces.places (name, address) values ($1, $2)', [name, address])
        .then(x => x.rows);
}

function saveReview(user, review, rating, placeid) {
    return postgrePool.query('INSERT into nearbyplaces.reviews (user, text, rating, placeid) values ($1, $2, $3, $4)', [user, review, rating, placeid])
        .then(x => x.rows);
}

function getSearchResult(searchTerm, location) {
    let query = `SELECT p.name, p.address, p.placeid FROM nearbyplaces.places p where `;
    let conditions = [];
    if (searchTerm.length > 0) {
        conditions.push(`lower(p.name) like '%${searchTerm.toLowerCase()}%'`)
    }
    if (location.length > 0) {
        conditions.push(`lower(p.address) like '%${location.toLowerCase()}%'`)
    }
    query += conditions.join(' and ');
    console.log(query);
    return(postgrePool.query(query)
        .then(x => {console.log(x); return(x.rows);}));
}

function getImageData(id) {
    return postgrePool.query('select image from nearbyplaces.places where placeid = $1', [id])
        .then(result => {
            console.log(result);
            if (result.rows[0]) {
                return result.rows[0].image;
            } else {
                throw Error('The image data could not be found in the database.');
            }
        });
}

module.exports = { getPlaces, savePlace, saveReview, getSearchResult, getImageData };