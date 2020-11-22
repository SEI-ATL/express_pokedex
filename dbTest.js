const db = require('./models')

// db.pokemon.create({
//     name: 'Pikachu'
// }).then((poke) => {
//     console.log('Created: ', poke.name);
// });

// db.pokemon.findOne({
//     where: { name: "Pikachu" },
// }).then((poke) => {
//     console.log('Found: ', poke.name);
// });

db.pokemon.findAll().then((name) => {
    console.log(name);
})