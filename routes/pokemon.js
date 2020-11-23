var express = require('express');
var router = express.Router();
const db = require('../models')
const axios = require('axios')

// GET /favorites - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then (allOfEm => {
    res.render('favorites', { pokemon: allOfEm})
  })
  // TODO: Get all records from the DB and render to view
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(() => {
    res.redirect('/pokemon')

  })
});



router.get('/:id', (req, res) => {
  

})

module.exports = router;
