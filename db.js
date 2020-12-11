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

function getQuestions(quizID) {
    return postgrePool.query(
        'select q.id, q.choices, q.answer from imagequiz.question q join imagequiz.quizquestions q2 on q.id = q2.questionid where q2.quizid = $1', [quizID])
        .then(x => x.rows);
}

function saveScore(username, quizID, score) {
    return postgrePool.query('INSERT into imagequiz.score (username, quizid, score) values ($1, $2, $3) returning id', [username, quizID, score])
        .then(x => x.rows);
}

function getQuizImageData(id) {
    return postgrePool.query('select image from imagequiz.quiz where id = $1', [id])
        .then(result => {
            console.log(result);
            if (result.rows[0]) {
                return result.rows[0].image;
            } else {
                throw Error('The imgae data could not be found in the database.');
            }
        });
}

module.exports = { getPlaces };