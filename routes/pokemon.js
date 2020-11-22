var express = require('express');
var router = express.Router();
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findOne({
    where: { name: 'Pikachu' }
  }).then((poke) => {
    // console.log(res.params);
    res.render('pokemon/index', { name: poke.name });
    
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

module.exports = router;
