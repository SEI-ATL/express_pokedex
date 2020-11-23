var express = require('express');
var router = express.Router();
const db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(favorites => {
    const faves = [];
    for (let i=0; i < favorites.length; i++) {
      let name = favorites[i].dataValues.name;
      faves.push(name);
    }
    console.log(faves);
    res.render('pokemon', { faves: faves });
  })

});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
    name: req.body.name
  }).then(function(poke) {
    console.log('Created: ', req.body.name);
    res.redirect('/pokemon');
  })
});

router.get('/pokemon/:id', (req, res) => {
  axios.get(`http://pokeapi.co/api/v2/pokemon/${req.params.id}`).then(response => {
    if (response.status === 200) {
      const info = response.data.results;
      const pokemonInfo = {
        name: info.name,
        species: info.species.name,
        weight: info.weight,
        ability: info.abilities[0].ability.name,
        move: info.moves[0].move.name,
      }
    }
    res.render('show', { name, species, weight, ability, move });
    // abilities[0].ability.name
})
})


module.exports = router;
