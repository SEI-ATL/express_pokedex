const db = require('./models');

db.pokemon.create({
    name: 'Pikachu'
}).then((poke) => {
    console.log('Created:', poke.name)
})

db.pokemon.findAll().then((poke) => {
    console.log('Found', poke.name)
})