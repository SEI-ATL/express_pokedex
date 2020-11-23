var express = require('express')
var router = express.Router()
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
    db.pokemon.findAll().then(pokemons => {
        res.render('pokemon/index', { pokemons })
    })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    db.pokemon.create({
        name: req.body.name
    }).then(post => {
        res.redirect('/pokemon')
    })
})

module.exports = router