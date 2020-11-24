require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const db = require('./models');
const app = express();
const port = process.env.PORT || 3001;
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
// GET - main index of site
app.get('/', async (req, res) =>{ 
  let pokemon = await db.allPokemon.findAll()
  res.render('index',{ pokemon })
})


// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
app.use(express.static(__dirname+ '/css'))
module.exports = server;
