require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 1338;

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'))
app.use(ejsLayouts);

// GET - main index of site
app.get('/', function(req, res) {
  // let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/'; // Original url
  let pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151' // This should have all pokemon in the api
  // Use request to call the API
  axios.get(pokemonUrl).then(response => {
    let pokemon = response.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  });
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});


module.exports = server;
