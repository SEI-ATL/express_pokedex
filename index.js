require("dotenv").config();
const express = require("express");
const axios = require("axios");
const ejsLayouts = require("express-ejs-layouts");
const db = require("./models");
const methodOverride = require('method-override');


const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(require("morgan")("dev"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(methodOverride('_method'))

app.use("/", express.static(path.join(__dirname, "public")));

// GET - main index of site
// app.get("/", (req, res) => {
//   let offset = 0;
//   offset = req.query.offset;
//   let pokemonUrl = `http://pokeapi.co/api/v2/pokemon?limit=151&offset=${offset}`;
//   // Use request to call the API

//   // axios.get(pokemonUrl).then((response) => {
//   //   let pokemon = response.data.results;
//   //   res.render("index", { pokemon: pokemon.slice(0, 151) });
//   // });

//   async function accessPokeAPI () {
//     const response = await axios.get(pokemonUrl)

//     let pokemon = response.data.results;
//     res.render("index", { pokemon: pokemon.slice(0, 151) });
//   };

// accessPokeAPI();

// });

app.get("/", async (req, res) => {
console.log(req.query)
  let offset = 0;
  offset = req.query.offset;
  let pokemonUrl = `http://pokeapi.co/api/v2/pokemon?limit=151&offset=${offset}`;

  const response = await axios.get(pokemonUrl).catch(() => null);

  if (!response) {
    res.render("error");
  } else {
    let pokemon = response.data.results;

    res.render("index", { pokemon: pokemon.slice(0, 151) });
  }
});

// try {} catch {} syntax is catching an error on anything inside try{}

// promise.catch()
// promise catch lets us continue with the code
// .catch appended onto await is returned in the response
// response is assigned null if something went wrong with the promise

// Imports all routes from the pokemon routes file
app.use("/pokemon", require("./routes/pokemon"));

const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = server;
