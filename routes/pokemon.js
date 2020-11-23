var express = require('express');
// var router = express.Router();
const router = require('express').Router()
const axios = require('axios');
const db = require('../models');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(allPoke => {
    res.render('pokemon/index', {allPoke});
  })
});
router.get('/:id', (req,res) => {
  const id = req.params.id
  axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  .then(response => {
    let pokemon = response.data;
    console.log(pokemon)
    {res.render('pokemon/show', { pokemon })}
})

})
;
// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
//  console.log(req.body.name);
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(() => {
    res.redirect('/pokemon');
  })
});


module.exports = router;
