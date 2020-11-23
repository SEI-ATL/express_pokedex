var express = require('express');
var router = express.Router();
const axios = require('axios'); 

const db = require('../models');
const { response } = require('express');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(allPokemon => {
    console.log(allPokemon)
    
    res.render('pokemon/index', { pokemon: allPokemon });
  })
});

// Get route for pokemon id
router.get('/:id', (req, res) => {
  console.log(req.params.id);
  axios.get(`http://pokeapi.co/api/v2/pokemon/${req.params.id}`).then(response => {
    // let image = response.data.sprites.other['official-artwork'].front_default
    console.log(response.data.sprites.other['official-artwork'].front_default);
    res.render('pokemon/details' , { pokemon: response.data})
  })



})


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

module.exports = router;
