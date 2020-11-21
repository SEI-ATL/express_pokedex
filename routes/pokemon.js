var express = require('express');
let db = require('../models')
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then((favorites) => {
    res.render('pokemon/index', { favorites })
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
// What is the sequelize function we use here?
  // console.log(req.body.name) // add this to the database
  db.pokemon.create({
    name: req.body.name
  }).then((pokemon) => {res.redirect('/pokemon')})
});


router.get('/pokemon')





module.exports = router;