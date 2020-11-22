const { default: Axios } = require('axios');
var express = require('express');
var router = express.Router();
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: Get all records from the DB and render to view
    db.pokemon.findAll().then(pokemon => {
        res.render('pokemon', { pokemon });
    })

});

// GET /pokeomn:id - return a page of pokemon details
router.get('/:id', function(req, res) {
    let name = req.params.id;
    // TODO: Get all info from the api and render to view
    Axios.get(`http://pokeapi.co/api/v2/pokemon/${name}`).then(response => {
        //get info, render
        details = {
            type: response.data.types,
            hp: response.data.stats[0].base_stat,
            image: response.data.sprites.other['official-artwork'].front_default,
            abilities: response.data.abilities
        }
        res.render('details', { details, name });
    })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: Get form data and add a new record to DB
    let newPokemon = req.body.name;
    db.pokemon.findOrCreate({ where: { name: newPokemon } }).then(() => {
        res.redirect('/pokemon');
    })
});

//POST /pokemon/:id   - delete pokemon form favorites
router.post('/:id', function(req, res) {
    // TODO: Get form data and add a new record to DB
    let pokemon = req.params.id;
    db.pokemon.destroy({ where: { name: pokemon } }).then(() => {
        res.redirect('/pokemon');
    })

});

module.exports = router;