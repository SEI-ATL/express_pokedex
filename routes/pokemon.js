var express = require('express');
var router = express.Router();
var db = require('../models')
const axios= require('axios')
// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then((list)=>{
     const pokemon = list;
     
      res.render('faves',{pokemon});
  }).catch((error)=>{
    console.log(error);
  })
  
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    } 
  }).then((pokemon  =>{
    console.log(`Storing ${pokemon} into our database.`)
  }))
  
});

router.get('/:id', (req, res) => {
  db.pokemon.findOne({
    where: { name: req.params.id },
   }).then(
     (pokemon =>{
      let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/'+req.params.id+'/';
       /////////////////////////////////
       axios.get(pokemonUrl).then(response => {
        let pokemonSprites = response.data.sprites;
        console.log(pokemonSprites)
        const onePokemon = pokemon
        res.render('pokemon', {onePokemon, pokemonSprites})
      }).catch((error)=>{console.log(error)});

       /////////////////////////////////
     
       /////////////////////////////////
     })
   ).catch((error)=>{console.log(error)})
    })

module.exports = router;

