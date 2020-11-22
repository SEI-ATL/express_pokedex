const router = require("express").Router();
const db = require("../models");
const axios = require("axios");

// GET LIST OF ALL FAVES

router.get("/", async (req, res) => {
  const favepoke = await db.pokemon.findAll().catch(() => null);

  if (!favepoke) {
    res.render("error");
  } else {
    res.render("favepoke", { favepoke });
  }
});

// GET DETAILS
router.get("/:id", async (req, res) => {
  const pokeid = req.params.id;

  const pokemon = await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokeid}`)
    .catch(() => null);

  if (!pokemon) {
    res.render("error");
  } else {

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
