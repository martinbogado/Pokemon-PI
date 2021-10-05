
const initialState = {
    pokemons : [],
    allPokemons: [],
    types: []
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        
        case "GET_TYPES":
            return {
                ...state,
                types: action.payload,
            }
                
        case "POST_POKEMON":
            return{
                ...state
            }
        
        case "GET_POKEMON_NAME":
            return {
                ...state,
                pokemons: action.payload
            }    

        case "FILTER_BY_TYPES":
            const allPokemons = state.allPokemons
            const statusFiltered = action.payload === "All" ? allPokemons : allPokemons.filter(el => el.types.includes(action.payload) )
            // console.log(statusFiltered)
            // console.log(action.payload)
            return {
                ...state,
                pokemons: statusFiltered
            }

        case "FILTER_CREATED":
            const allPokemons2 = state.allPokemons
            const statusFiltered2 = action.payload === "Created" ? allPokemons2.filter(el => el.createdInDb) : allPokemons2.filter(el => !el.createdInDb) 

            return {
                ...state,
                pokemons: action.payload === 'All' ? allPokemons2 : statusFiltered2
            }

        case "ORDER_BY_NAME_OR_STRENGH":
            let sortedArray

            if(action.payload === 'asc'){
                sortedArray = state.pokemons.sort(function (a, b){
                        if(a.name > b.name){
                            return 1;
                        }
                        if(b.name > a.name){
                            return -1;
                        }
                        return 0;
                    }) 
            }
            if(action.payload === 'desc'){
                sortedArray = state.pokemons.sort(function (a, b){
                        if(a.name > b.name){
                            return -1;
                        }
                        if(b.name > a.name){
                            return 1;
                        }
                        return 0;
                    }) 
            }
            if(action.payload === 'HAttack'){
                sortedArray = state.pokemons.sort(function (a, b){
                        if(a.strengh > b.strengh){
                            return -1;
                        }
                        if(b.strengh > a.strengh){
                            return 1;
                        }
                        return 0;
                    }) 
            }
            if(action.payload === 'LAttack'){
                sortedArray = state.pokemons.sort(function (a, b){
                        if(a.strengh > b.strengh){
                            return 1;
                        }
                        if(b.strengh > a.strengh){
                            return -1;
                        }
                        return 0;
                    }) 
            }
            

            return {
                ...state,
                pokemons: sortedArray
            }  

        default: 
            return state    
    }
}



export default rootReducer