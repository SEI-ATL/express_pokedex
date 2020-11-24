const express = require('express');
const { sequelize } = require('../models');
const router = express.Router();
const db = require('../models')
const axios = require('axios').default


router.use
// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res)=> {
  db.pokemon.findAll()
  .then(pokemon=>res.render('favorites', { pokemon }))
})


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res)=> {
  try{
    db.pokemon.findOrCreate({
      where: { 
        name: req.body.name,
        pokemonId: req.body.pokemonId
      }
    })
    res.redirect('/pokemon')
  }
  catch(e){
    console.log(e)
  }
  
  // TODO: Get form data and add a new record to DB
    // res.redirect('favorites');
})



router.get('/detailpokemon', async (req,res)=>{
  console.log(req.query.name);
  try{
    let pokeinfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.query.name}`)
    let pokemon = {
      name: pokeinfo.data.name,
      height: pokeinfo.data.height,
      weight: pokeinfo.data.weight,
      type: pokeinfo.data.types[0].type.name,
      image: pokeinfo.data.sprites.other['official-artwork'].front_default
    }
    let type
    if (pokemon.type === 'bug') {
      type = 'var(--bugType)'
    }else if(pokemon.type === 'electric'){
      type = 'var(--electricType)'
    }else if(pokemon.type === 'electric'){
      type = 'var(--electricType)'
    }else if(pokemon.type === 'dragon'){
      type = 'var(--dragonType)'
    }else if(pokemon.type === 'fighting'){
      type = 'var(--fightingType)'
    }else if(pokemon.type === 'fire'){
      type = 'var(--fireType)'
    }else if(pokemon.type === 'flying'){
      type = 'var(--flyingType)'
    }else if(pokemon.type === 'ghost'){
      type = 'var(--ghostType)'
    }else if(pokemon.type === 'grass'){
      type = 'var(--grassType)'
    }else if(pokemon.type === 'ground'){
      type = 'var(--groundType)'
    }else if(pokemon.type === 'ice'){
      type = 'var(--iceType)'
    }else if(pokemon.type === 'normal'){
      type = 'var(--normalType)'
    }else if(pokemon.type === 'poison'){
      type = 'var(--poisonType)'
    }else if(pokemon.type === 'psychic'){
      type = 'var(--psychicType)'
    }else if(pokemon.type === 'rock'){
      type = 'var(--rockType)'
    }else if(pokemon.type === 'water'){
      type = 'var(--waterType)'
    }
    console.log(pokemon,type);
    res.render('details',{ pokemon,type })  
  }catch(e){
    console.log(e);
  }
  // .then(poke=>{
  //   // console.log(poke);

  // })
  // .catch(e=>{
  //   console.log(e);
  // })

})

module.exports = router
