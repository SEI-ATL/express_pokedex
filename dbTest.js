// Make sure to require your models in the files where they will be used.
const db = require('./models');

db.pokemon.create({
  name: 'Pikachu'
}).then(function(poke) {
  console.log(poke)
})

db.pokemon.findAll().then(function(poke) {
  console.log('Found: ', poke.name)
})