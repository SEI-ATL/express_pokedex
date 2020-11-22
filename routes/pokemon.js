// Dependencies
const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/favorite', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then (favorites => {
    // console.log(favorites); //Checks the db for favorite pokemon
    res.render('favorite', {favorites: favorites});
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
    let pokemon = req.body.name
      // console.log(pokemon);
      db.pokemon.findOrCreate({
        where: { name: pokemon },
        defaults: { name: pokemon }
      })
  res.redirect('/');
});

router.get('/:id', (req, res) =>{
  let id = req.params.id;
  let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${id}`;
  axios.get(pokemonUrl).then(response => {
    let pokemon = response.data;
  // console.log(pokemon.types[0].type.name);
  res.render('show', { pokemon: pokemon })
  })
})

module.exports = router;
