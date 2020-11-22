const router = require("express").Router();
const db = require("../models");
const axios = require("axios");

// GET LIST OF ALL FAVES

router.get("/", (req, res) => {
  // db.pokemon.findAll().then((pokemon) => {
  //   res.render("favepoke", { favepoke: pokemon });
  // });

async function findAllFavePoke(){

  const favepoke = await db.pokemon.findAll()
  res.render("favepoke", { favepoke });
}

findAllFavePoke();

});

// GET DETAILS
router.get("/:id", (req, res) => {
  const pokeid = req.params.id;
  //const pokedetailsurl = `https://pokeapi.co/api/v2/pokemon/${pokeid}`;

  // axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeid}`).then((pokemon) => {
  //   getTypes = () => {
  //     const types = [];
  //     pokemon.data.types.forEach((t) => {
  //       types.push(t.type.name);
  //     });
  //     return types;
  //   };

  //   getMoves = () => {
  //     const moves = [];
  //     pokemon.data.moves.forEach((m) => {
  //       moves.push(m.move.name);
  //     });
  //     return moves;
  //   };

  //   getStats = () => {
  //     const stats = {};

  //     pokemon.data.stats.forEach((s) => {
  //       stats[s.stat.name] = s.base_stat;
  //     });
  //     return stats;
  //   };

  //   const pokedetails = {
  //     name: pokemon.data.name,
  //     image: pokemon.data.sprites.front_default,
  //     idnum: pokemon.data.id,

  //     type: getTypes(),
  //     moves: getMoves(),
  //     stats: getStats(),
  //   };

  //   res.render("details", { pokedetails });
  // });



async function getPokeData (){

const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeid}`);

getTypes = () => {
  const types = [];
  pokemon.data.types.forEach((t) => {
    types.push(t.type.name);
  });
  return types;
};

getMoves = () => {
  const moves = [];
  pokemon.data.moves.forEach((m) => {
    moves.push(m.move.name);
  });
  return moves;
};

getStats = () => {
  const stats = {};

  pokemon.data.stats.forEach((s) => {
    stats[s.stat.name] = s.base_stat;
  });
  return stats;
};

const pokedetails = {
  name: pokemon.data.name,
  image: pokemon.data.sprites.front_default,
  idnum: pokemon.data.id,

  type: getTypes(),
  moves: getMoves(),
  stats: getStats(),
};

res.render("details", { pokedetails });



}

getPokeData();

});

// UPDATE DB
router.post("/", (req, res) => {
  //const pokeid = req.body.pokeid;
  //const name = req.body.name;

  db.pokemon
    .findOrCreate({
      where: { pokeid: req.body.pokeid, name: req.body.name },
      defaults: { image: null, type: null },
    })
    .then(([pokemon, created]) => {
      res.redirect("/");
    });
});

module.exports = router;



// getting detailed info onto the main page
// create a cache
// create a table

