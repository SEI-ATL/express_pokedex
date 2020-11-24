const db = require('./models')


// async function addPoke(){
//     let id = 1
//     let pokeinfo = await db.allPokemon.findOne({where : { id }})
//     console.log(pokeinfo);
//     let fave = await db.pokemon.findOne({
//         where: {
//             id:id,
//             pokemonId:pokeinfo.dataValues.id
//         }
//     })
//     console.log(fave);
// }
// addPoke()