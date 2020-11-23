const db = require('../models');

var express = require('express');
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then((pokemons) => {
    console.log(pokemons)
    res.render('pokemon/index', {pokemons: pokemons});
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  console.log(req.body)
  db.pokemon.findOrCreate({
    where: {name: req.body.name}
  }).then((result) => {
    console.log(result)
    res.redirect('/pokemon');
  })
});

router.get('/:id', (req, res) => {
  db.pokemon.findOne({
    where: { id: req.params.id }
  }).then((pokemon) => {
    console.log(pokemon);
    res.send('almost there...')
  })
})

module.exports = router;
