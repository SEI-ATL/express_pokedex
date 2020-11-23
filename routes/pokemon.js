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

// POST /pokemon - add pokemon to favorites (but don't duplicate)
router.post('/', (req, res) => {
    const name = req.body.name
    db.pokemon.findOrCreate({
        where: { name }
    }).then(result => {
        res.redirect('/pokemon')
    })
})

// GET /pokemon/:name - display details about individual pokemon
router.get('/:name', (req, res) => {
    const name = req.params.name
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(response => {
        res.render('pokemon/show', { pokemon: response.data })
    })
})

// DELETE /pokemon/:name - delete pokemon from favotires
router.delete('/:name', (req, res) => {
    const name = req.params.name
    db.pokemon.destroy({
        where: { name }
    }).then(response => {
        res.redirect('/pokemon')
    })
})

module.exports = router