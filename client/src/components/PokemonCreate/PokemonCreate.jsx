import React, { useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon, getTypes } from '../../actions/index';

export default function PokemonCreate(){
    const dispatch = useDispatch();
    const types = useSelector(state => state.types)
    const history = useHistory()

    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        weight: '',
        height: '',
        types: [],
    })

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            types: [...input.types , e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postPokemon(input))
        alert("Pokemon created successfuly!!")
        setInput({
            name: '',
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            weight: '',
            height: '',
            types: [],
        })
        history.push("/home")
    }

    return(
        <div>
            <Link to='/home'><button>Go back</button></Link>
            <h1>Create your pokemon!</h1>
            <form onSubmit={ (e) => handleSubmit(e) }>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={ (e) => handleChange(e) }
                    />
                </div>
                <div>
                    <label>Hp:</label>
                    <input 
                        type="number"
                        value={input.hp}
                        name="hp"
                        onChange={ (e) => handleChange(e) }
                    />
                </div>
                <div>
                    <label>Attack:</label>
                    <input 
                        type="number"
                        value={input.attack}
                        name="attack"
                        onChange={ (e) => handleChange(e) }
                    />
                </div>
                <div>
                    <label>Defense:</label>
                    <input 
                        type="number"
                        value={input.defense}
                        name="defense"
                        onChange={ (e) => handleChange(e) }
                    />
                </div>
                <div>
                    <label>Speed:</label>
                    <input 
                        type="number"
                        value={input.speed}
                        name="speed"
                        onChange={ (e) => handleChange(e) }
                    />
                </div>
                <div>
                    <label>Weight:</label>
                    <input 
                        type="number"
                        value={input.weight}
                        name="weight"
                        onChange={ (e) => handleChange(e) }
                    />
                </div>
                <div>
                    <label>Height:</label>
                    <input 
                        type="number"
                        value={input.height}
                        name="height"
                        onChange={ (e) => handleChange(e) }
                    />
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    {
                        types.map( type => (
                            <option value={type.name}>{type.name}</option>
                        ))
                    }
                </select>
                <ul><li>{input.types.map( el => el + " ,")}</li></ul>

                <button type='submit'>Create Pokemon</button>
            </form>
        </div>
    )
}
