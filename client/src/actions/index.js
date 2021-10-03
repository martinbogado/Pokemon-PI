import axios from 'axios'

export function getPokemons(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/pokemons",{

        })
        
        return dispatch({
            type:"GET_POKEMONS",
            payload: json.data
        })
    }
}

export function getPokemonName(name){
    return async function (dispatch){
        try{
            const json = await axios.get("http://localhost:3001/pokemons?name=" + name)

            return dispatch({
                type:"GET_POKEMON_NAME",
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    }
}

export function filterPokemonsByType(payload){
    return {
        type:"FILTER_BY_TYPES",
        payload
    }
}

export function filterCreated(payload){
    
    return {
        type:"FILTER_CREATED",
        payload
    }
}

export function orderByNameOrStrengh(payload){
    
    return {
        type:"ORDER_BY_NAME_OR_STRENGH",
        payload
    }
}