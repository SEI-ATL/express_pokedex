var express = require('express');
var router = express.Router();
const axios = require('axios')
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(allPokemon => {
    res.render('pokemon/faves', {allPokemon});
  })
  
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(() => {
  res.redirect('/pokemon');
  })
  
});

router.get('/:name', (req, res) => {
  let searchPoke = req.params.name
  axios.get(`https://pokeapi.co/api/v2/pokemon/${searchPoke}/`)
  .then((response) => {
    res.render('pokemon/show', {poke: response.data})
  })
  
})

router.delete('/:name', (req, res) => {
  const name = req.params.name
  db.pokemon.findOne({
    where: {name}
  }).then((foundPkmn) => {
    foundPkmn.destroy().then(()=>{
      res.redirect('/pokemon')
    })
  })
})

module.exports = router;
