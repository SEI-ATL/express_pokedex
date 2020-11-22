// Dependencies
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const db = require('./models'); 
const ejsLayouts = require('express-ejs-layouts');
const app = express();

const port = process.env.PORT || 8000;

//Middleware
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use('/public', express.static('public'));

// GET - main index of site
app.get('/', function(req, res) {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151';
  // Use request to call the API
  axios.get(pokemonUrl).then(response => {
    let pokemon = response.data.results;
    // console.log(pokemon); // Logging all 151 Pokemon
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  });
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = server;
