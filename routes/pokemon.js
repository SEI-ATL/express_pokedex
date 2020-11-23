var express = require('express');
var router = express.Router();
const axios = require('axios');
const db = require('../models');


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

router.get('/:name', (req, res) => {
  let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`;

    axios.get(pokemonUrl).then((response) => {
      res.render('pokemon/show', { pokemon: response.data })
    })
})

router.delete('/:name', (req, res) => {
  const name = req.params.name
  db.pokemon.findOne({
    where: { name }
  }).then((foundPokemon) => {
    foundPokemon.destroy().then(() => {
      res.redirect('/pokemon')
    })
  })
})

module.exports = router;
