import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonName } from '../../actions';

export default function SearchBar(){
    const dispatch = useDispatch()
    const [ name, setName ] = useState("")

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getPokemonName(name))
        setName("")
    }

    return(
        <div>
            <input 
                type= 'text'
                placeholder='Search...'
                onChange={(e) => handleInputChange(e)}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}
