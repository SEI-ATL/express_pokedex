var express = require('express');
var router = express.Router();
const db = require("../models")
const axios = require('axios'); 


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then((favorites)=>{
    //console.log(res.send('Render a page of favorites here'));
    res.render('pokemon/index', {favorites})
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  //res.send(req.body);//placeholder
  db.pokemon.findOrCreate({//so you dont create the same value
    where:{name:req.body.name}
  }).then(() => {
    res.redirect('/pokemon')
  })
});

//more information
router.get('/:name', (req, res) => {
  //console.log(req)
  const name = req.params.name
  axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
  .then((response) => {
    const myPokemon = respose.data
    res.render('pokemon/show', {myPokemon})
  })

})

module.exports = router;
