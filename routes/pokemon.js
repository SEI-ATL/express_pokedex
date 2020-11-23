const axios = require('axios')
var express = require('express');
const db = require('../models');
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
 db.pokemon.findAll()
  .then((pokemon) => {
    res.render('pokemon', { pokemon })
  })
  .catch((err) => {
    console.log(err)
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  })
  .then(() => {
   res.redirect('/')
  })
  .catch((err) => {
  console.log(err)
})
});

// GET /pokemon/show/id# - Grabs the id
router.get('/show/:id', (req, res) => {
  db.pokemon.findOne({
    where: {id: req.params.id}
  })
  .then((pokemon) => {
    let pokeNames = pokemon.dataValues.name;
    console.log(pokeNames)
    return axios.get(`http://pokeapi.co/api/v2/pokemon/${pokeNames}`)
  })
  .then((result) => {
    pokeDetails = result.data
    res.render('show', { pokeDetails })
  })
  .catch((err) => {
    console.log(err)
  })
})

module.exports = router;


