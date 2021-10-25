const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const { Pokemon, Type } = require('../db.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const random = (arrlength) => {
  let number = Math.floor(Math.random() * arrlength);
  return number
 }

const arreglo = (arr) => {
  let results = []

  if(arr[0] && arr[0].hasOwnProperty('move')){
    const one = arr[random(arr.length)];
    const two = arr[random(arr.length)];
    const three = arr[random(arr.length)];

    results.push(one.move.name, two.move.name, three.move.name)
  } else{
    if(arr.length > 1){
      const one = arr[random(arr.length)]['location_area'].name;
      const two = arr[random(arr.length)]['location_area'].name;

      one !== two ? results.push(one, two) : results.push(one)
    } else{
      arr[0] ? results.push(arr[0]['location_area'].name) : results
    }
  }
  return results
 } 

const evolution = async (evol) => {
  try {
    let evoChain = [];
    let evoData = evol.chain;

    do {
      let evoDetails = evoData['evolution_details'][0];
      const apiPokeUrl = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/" + evoData.species.name
      );

      let result = {
        name: evoData.species.name,
        img: apiPokeUrl.data.sprites.other["official-artwork"].front_default,
      }
    
      if(evoDetails){
        for(prop in evoDetails){
          if(evoDetails[prop]){
            if(typeof evoDetails[prop] === 'object'){
              result[prop] = evoDetails[prop].name
            } else{
              result[prop] = evoDetails[prop]
            }
          }
          if(prop === 'held_item' && evoDetails[prop]){
            let item = await axios.get(evoDetails[prop].url)
            result.itemimg = item.data.sprites.default
          }
        }
      }
      evoChain.push(result)

      evoData = evoData['evolves_to'][0];
    } while (evoData && evoData.hasOwnProperty('evolves_to'));

    return evoChain

  } catch (e) {
    console.error(e)
  }
} 


const getApiInfo = async () => {
    const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
    const results = apiUrl.data.results

    const pokemonInfo = []

    // const resultsPokes = apiUrl.data.results.map(async el => {
    //     const pokes = await axios.get(el.url);
    //     const pokeInfo = pokes.data

    //     return {
    //         id: pokeInfo.id,
    //         name: el.name,
    //         type: pokeInfo.types.map( t => t.type.name),
    //         img: pokeInfo.sprites.versions["generation-v"]["black-white"].animated
    //            .front_default,
    //         strengh: pokeInfo.stats[1].base_stat,
    //     }
    // })
    
    for(let i = 0 ; i < results.length ; i++){
      const pokes = await axios.get(results[i].url);
      const pokeInfo = pokes.data;

      pokemonInfo.push({
        id: pokeInfo.id,
        name: pokeInfo.name,
        types: pokeInfo.types.map((t) => t.type.name),
        img: pokeInfo.sprites.other['official-artwork'].front_default,
        attack: pokeInfo.stats[1].base_stat,
        weight: pokeInfo.weight,
        height: pokeInfo.height
      });
    }
    
    return pokemonInfo;
}

const getDbInfo = async () => {
	const data = (await Pokemon.findAll({ 
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }
  })).map(pokemon => {
    const json = pokemon.toJSON();
    return{
      ...json,
      types: json.types.map( type => type.name)
    }
  });
  
  return data
}

const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = [...apiInfo, ...dbInfo]; 
    // console.log(infoTotal)

    return infoTotal;
}

const getPokeInfo = async (id) => {
  try {
    const apiPokeUrl = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id);
    const results = apiPokeUrl.data
    const apiPokeSpecie = await axios.get(results.species.url)
    const speciesresult = apiPokeSpecie.data
    const pokeEvolution = await axios.get(speciesresult['evolution_chain'].url)

    const allDescriptions = speciesresult["flavor_text_entries"].filter( el => el.language.name === 'en')
    const speciespok = speciesresult.genera.filter( el => el.language.name === 'en')
    const locations = await axios.get(results['location_area_encounters'])
    const moves = results.moves
    

    const pokemonInfo = {
      // ABOUT
      abilities: results.abilities ? results.abilities.map( a => a.ability.name) : null,
      growth: speciesresult['growth_rate'] ? speciesresult['growth_rate'].name : null,
      habitat: speciesresult.habitat ? speciesresult.habitat.name : null,
      description: allDescriptions[random(allDescriptions.length)]['flavor_text'].replace('POKéMON', 'Pokémon'),
      species: speciespok[0].genus ? speciespok[0].genus : null,
      locations: arreglo(locations.data),
      moves: arreglo(moves),

      // STATS
      id: results.id,
      name: results.name,
      types: results.types.map((t) => t.type.name),
      img: results.sprites.other['official-artwork'].front_default,
      hp: results.stats[0].base_stat,
      attack: results.stats[1].base_stat,
      defense: results.stats[2].base_stat,
      speed: results.stats[5].base_stat,
      weight: results.weight,
      height: results.height,
      happiness: speciesresult['base_happiness'],
      capture: speciesresult['capture_rate'],

      //EVOLUTION
      evolution: await evolution(pokeEvolution.data)
    }
    console.log(pokemonInfo)

    return pokemonInfo;
  } catch (e) {
    console.error(e);
    if (e.status === 404) return null;
  }
}

const getPokeInfoxName = async (name) => {
  try {
    const apiPokeUrl = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/" + name
    );
    const results = apiPokeUrl.data;

    const pokemonInfo = {
      id: results.id,
      name: results.name,
      types: results.types.map((t) => t.type.name),
      img: results.sprites.other["official-artwork"].front_default,
      weight: results.weight,
      height: results.height,
    };
    console.log(pokemonInfo);

    return pokemonInfo;
  } catch (e) {
    if (e.status === 404) return null;
  }
};


router.get("/pokemons", async (req, res) => {
  const name = req.query.name;

  if (name) {
    const pokemonName = await getPokeInfoxName(name.toLowerCase());

    if (pokemonName) {
      return res.status(200).send([pokemonName]);
    } else {
      const pokemonsDB = await getDbInfo();
      const pokemonNAM = pokemonsDB.filter(
        el => el.name.toLowerCase() == name.toLowerCase()
      );

      return pokemonNAM.length
        ? res.status(200).send(pokemonNAM)
        : res.status(404).send("Pokemon not found");
    }
  } else {
    const pokemonsTotal = await getAllPokemons();

    return res.status(200).send(pokemonsTotal);
  }
});

router.get('/types', async (req, res) => {
  const typesApi = await axios.get("https://pokeapi.co/api/v2/type");
  const types = typesApi.data.results;

  types.forEach( el => {
    Type.findOrCreate({
      where: {name: el.name}
    })
  })

  const allTypes = await Type.findAll();
  return res.send(allTypes);
})

router.post('/pokemons', async (req, res) => {
  const { 
		name, 
		types, 
		hp, 
		attack, 
		defense, 
		speed, 
		height, 
		weight, 
		img,
    createdInDb 
	} = req.body;

  const pokemonCreated = await Pokemon.create({
    name, 
    hp, 
    attack, 
    defense, 
    speed, 
    height, 
    weight, 
    img,
    createdInDb 
  })

  const pokemonTypes = await Type.findAll({
    where: { name: types }
  })

  pokemonCreated.addType(pokemonTypes)
  return res.send('Pokemon created successfuly')
})

router.get('/pokemons/:idPokemon', async (req, res) => {
  const { idPokemon } = req.params
  
  let pokemonInfo;
  if(idPokemon >= 1 && idPokemon <= 898 || idPokemon >= 10001 && idPokemon <= 10220){
    const pokemonInfo = await getPokeInfo(idPokemon)
    
    return pokemonInfo ?
    res.status(200).send([pokemonInfo]) :
    res.status(404).send('Pokemon not found')
  }

  const pokemonsTotal = await getDbInfo()

  if(!pokemonInfo && idPokemon){
    const pokemonId = pokemonsTotal.filter( el => el.id == idPokemon )

    return pokemonId.length ?
    res.status(200).send(pokemonId) :
    res.status(404).send('Pokemon not found')
  }
})

module.exports = router;
