let db = require('./models');

db.pokemon.findOrCreate({
  where: {
    name: 'Ivysaur'
  }
}).then(([pokemon, created]) => {
  if (created) {
    console.log(`Added ${pokemon.name} to the database.`);
  } else {
    console.log(`Found ${pokemon.name} in the database.`);
  }
});

db.pokemon.findAll().then(pokemons => {
  console.log('Found:');
  pokemons.forEach(pokemon => {
    console.log(pokemon.name);
  });
});