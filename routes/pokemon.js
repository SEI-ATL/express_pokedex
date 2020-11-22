
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
    console.log(`Storing ${pokemon.name} into our database.`)
    res.redirect('/')
  }))
  
});

router.delete('/:id', function(req, res) {
  console.log( "!!!!!!!!!" + req.body.name)
  db.pokemon.destroy({
    where: {
      name: req.body.name
    } 
  }).then((pokemon  =>{
    console.log(`Removing ${pokemon.name} from our database.`)
    res.redirect('/pokemon')
  })).catch((err)=>{
    console.log(err);
  })
  
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
        let pokeWeight = response.data.weight;
        let pokeHeight = response.data.height;
        let pokeTypes = response.data.types;
        const onePokemon = pokemon
        console.log(response.data.weight)
        res.render('pokemon', {onePokemon, pokemonSprites, pokeWeight, pokeHeight, pokeTypes})
      }).catch((error)=>{console.log(error)});

       /////////////////////////////////
     
       /////////////////////////////////
     })
   ).catch((error)=>{console.log(error)})
    })

module.exports = router;

