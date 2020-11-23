const express = require('express')
const axios = require('axios')

const db = require('../models')


const router = express.Router()

router
  .route('/')
  .get((_, res) => {
    db.pokemon.findAll().then(favorites => { res.render('pokemon/', { favorites }) })
  })
  .post(({ body: { name } }, res) => {
    db.pokemon.findOrCreate({
      where: { name }
    }).then(([pokemon, created]) => { res.redirect('/pokemon') })
  })

router
  .route('/:name')
  .get((req, res) => {
    let pokemonName = req.params.name
    let requestUrl = `http://pokeapi.co/api/v2/pokemon/${pokemonName}`

    axios.get(requestUrl)
      .then(({ data: pokemon }) => {
        res.render('pokemon/detail', { pokemon })
      })
      .catch(e => { console.error(e.stack) })
  })
  .delete((req, res) => {
    db.pokemon.findByPk(req.body.id)
      .then(poke => poke.destroy().then(res.redirect('/pokemon')))
      .catch(e => { console.error(e.stack) })
  })

module.exports = router
