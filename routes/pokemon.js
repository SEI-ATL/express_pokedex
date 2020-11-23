// Dependencies
const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/favorite', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then (favorites => {
    console.log(req.body); //Checks the db for favorite pokemon
    res.render('favorite', {favorites: favorites});
  })
  // .catch((error) => {
  //   res.status(400).render('404')
  // })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
    let pokemon = req.body.name
      // console.log(pokemon);
      db.pokemon.findOrCreate({
        where: { name: pokemon },
        defaults: { name: pokemon }
      }).then((pokemon)=> {
        res.redirect('/pokemon/favorite');
      })
});

router.get('/:id', (req, res) =>{
  let id = req.params.id;
  console.log(id);
  let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${id}`;
  axios.get(pokemonUrl).then(response => {
    let pokemon = response.data;
  // console.log(pokemon.types[0].type.name);
  res.render('show', { pokemon: pokemon })
  })
})


router.post('/:id', function(req, res) {
  let pokemon = req.params.id;
  console.log(pokemon);
  db.pokemon.destroy({ where: { name: pokemon } }).then(() => {
      res.redirect('/pokemon/favorite');
  })
})

module.exports = router;
