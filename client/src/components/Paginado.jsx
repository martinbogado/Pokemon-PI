import React from 'react'

export default function Paginado({ pokemonsPerPage, allPokemons, paginado}){
    const pageNumbers = []

    for (let i = 0 ; i < Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i + 1)
    }

    return(
        <nav>
            <ul>
                {
                    pageNumbers && pageNumbers.map( number => (
                        <li key={number}>
                           <button onClick={() => paginado(number)}>{number}</button>
                        </li>
                        
                    ))
                }
            </ul>
        </nav>
    )

}