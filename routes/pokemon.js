const db = require('../models')
var express = require('express');
const { default: Axios } = require('axios');
const { response } = require('express');
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
    db.pokemon.findAll().then(allPoke => {
    res.render('faves', { allPoke })
  })

  // TODO: Get all records from the DB and render to view
  
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(() => {
    res.redirect('/pokemon')
  })



  router.get('/:name', (req, res) => {
    let pokeName = req.params.name
    Axios.get(`http://pokeapi.co/api/v2/pokemon/${pokeName}`)
    .then((response) => {
      res.render('details', {pokemon: response.data})
    })
  })



  // db.post('/faves', (req, res) => {
  //   db.pokemon.create({
  //       name:req.body.title,
  //   }).then(() => {
  //       res.redirect('faves')
  //   })    
  // })

  //req.body.name
  // TODO: Get form data and add a new record to DB
 
});

module.exports = router;
