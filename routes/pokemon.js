var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.favorite.findAll()
  .then( (pokemon) => {
    res.render('favorites', { pokemon })
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  console.log(req.body);
  db.favorite.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then( ([pokemon, created]) => {
    console.log('created: ' + created);
    console.log('pokemon: ' + pokemon.name);
    res.redirect('/pokemon')
  })
});

module.exports = router;
