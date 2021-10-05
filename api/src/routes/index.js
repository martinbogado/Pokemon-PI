const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const { Pokemon, Type } = require('../db.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
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
        strengh: pokeInfo.stats[1].base_stat,
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
  console.log(data)
  return data
}

const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = [...apiInfo, ...dbInfo]; 
    console.log(infoTotal)

    return infoTotal;
}


router.get('/pokemons', async (req, res) => {
    const name = req.query.name
    let pokemonsTotal = await getAllPokemons()

    if(name){
       let pokemonName = pokemonsTotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))

       pokemonName.length ? 
       res.status(200).send(pokemonName) :
       res.status(404).send('No pokemon found')
    } else {
       res.status(200).send(pokemonsTotal)  
    }
})

router.get('/types', async (req, res) => {
  const typesApi = await axios.get("https://pokeapi.co/api/v2/type")
  const types = typesApi.data.results

  types.forEach( el => {
    Type.findOrCreate({
      where: {name: el.name}
    })
  })

  const allTypes = await Type.findAll();
  res.send(allTypes)
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
  res.send('Pokemon created successfuly')
})

router.get('/pokemons/:idPokemon', async (req, res) => {
  const { idPokemon } = req.params
  const pokemonsTotal = await getAllPokemons()

  
  if(idPokemon){
    const pokemonId = pokemonsTotal.filter( el => el.id == idPokemon )
    console.log(pokemonId)

    pokemonId.length ?
    res.status(200).send(pokemonId) :
    res.status(404).send('Pokemon not found')
  }
})

module.exports = router;
