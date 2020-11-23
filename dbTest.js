const db = require('./models')

// Confirm you can write
db.pokemon.create({
    name: 'Raichu'
}).then(pkmn => {
    console.log(pkmn);
})

// Confirm you can read
db.pokemon.findAll().then(pkmns => {
    console.log(pkmns);
})