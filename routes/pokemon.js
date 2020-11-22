var express = require('express');
var router = express.Router();
const db = require('../models')
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(favePokemon => {
    res.render('faves', { favePokemon })
  })
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
  const sPokemon = req.params.id;
  console.log(sPokemon);
  axios.get(`http://pokeapi.co/api/v2/pokemon/${sPokemon}`).then((response) => {
    console.log(response.data)
    res.render('details', { pokemon: response.data })
  }).catch((error) => {
    console.log(error);
  })
})

module.exports = router;
