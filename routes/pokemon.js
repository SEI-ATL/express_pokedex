const { default: Axios } = require('axios');
var express = require('express');
let db = require('../models')
const ejsLayouts = require('express-ejs-layouts');
// const axios = require('axios'); 
var router = express.Router();
router.use(ejsLayouts);

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then((favorites) => {
    res.render('pokemon/index', { favorites })
  })
});
router.get('/:id', (req,res) => {
  const id = req.params.id
  Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  .then(response => {
    let pokemon = response.data;
    console.log(pokemon)
    {res.render('pokemon/show', { pokemon })}
})

})
;

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name
  }).then((pokemon) => {res.redirect('/pokemon')})
});





module.exports = router;