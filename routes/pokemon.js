var express = require('express');
var router = express.Router();
const db = require('../models')


router.get('/', function(req, res) {
  db.favorite.findAll().then((pokemons) => {
    res.render('pokemon/index', { pokemon: pokemons })
  })
});


router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  const name = req.body.name
  db.pokemon.findOrCreate({
    where: { name } // same as { name: name }
  }).then((result) => {
    res.redirect('/pokemon')
  })
});

module.exports = router;
