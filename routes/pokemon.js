var express = require('express');
var router = express.Router();
const db = require('../models');
const axios = require('axios');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(pokemon => {
    res.render('pokemon/index', { pokemon });
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  const pokemon = req.body.name;
  db.pokemon.findOrCreate({ 
    where: {
       name: pokemon
      }
    }).then(() => {
      res.redirect('/pokemon');
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  axios.get(`http://pokeapi.co/api/v2/pokemon/${id}`)
    .then(function (response) {
      const pokemon = response.data;
      res.render('pokemon/show', { pokemon });
    })
    .catch(function (error) {
      res.send(error);
    })
})

module.exports = router;