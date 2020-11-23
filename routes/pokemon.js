var express = require('express');
var router = express.Router();
const db = require('./models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/pokemon', function(req, res) {
    // TODO: Get all records from the DB and render to view
    res.render('pokemon/index');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/pokemon', function(req, res) {
    // TODO: Get form data and add a new record to DB
    res.redirect('/pokemon');
});

module.exports = router;