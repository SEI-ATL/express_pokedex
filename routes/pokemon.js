var express = require('express')
var router = express.Router()
const axios = require('axios').default
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
    db.pokemon.findAll().then(pokemons => {
        res.render('pokemon/index', { pokemons })
    })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
    db.pokemon.create({
        name: req.body.name
    }).then(post => {
        res.redirect('/pokemon')
    })
})

// GET /pokemon/:id - display details about individual pokemon
router.get('/:name', (req, res) => {
    const name = req.params.name
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(response => {
        res.render('pokemon/show', { pokemon: response.data })
    })
})

router.delete('/', (req, res) => {
    db.pokemon.destroy({
        where: { name: req.body.name }
    }).then(response => {
        res.redirect('/pokemon')
    })
})

module.exports = router