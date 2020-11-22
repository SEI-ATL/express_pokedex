var express = require('express');
var router = express.Router();
const axios= require('axios');
const db = require('../models');
// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(allPoke => {
  // TODO: Get all records from the DB and render to view
  // res.send('Render a page of favorites here');
  res.render('pokemon/index', {allPoke});
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(() => {
    res.redirect('/pokemon');
})

});

module.exports = router;
