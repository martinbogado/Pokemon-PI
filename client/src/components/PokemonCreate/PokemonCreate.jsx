import React, { useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon, getTypes } from '../../actions/index';

function validate(input){
    let errors = {};

    if(!input.name){
        errors.name = 'Se requiere un nombre'
    }
    if(input.hp < 1 || input.hp > 200){
        errors.hp = 'La vida del Pokemon debe ser menor a 200'
    }
    if(input.attack < 1 || input.attack > 200){
        errors.attack = 'El poder de ataque del Pokemon debe ser menor a 200'
    }
    if(input.defense < 1 || input.defense > 200){
        errors.defense = 'La defensa del Pokemon debe ser menor a 200'
    }
    if(input.speed < 1 || input.speed > 200){
        errors.speed = 'La velocidad del Pokemon debe ser menor a 200'
    }
    if(input.weight < 1 || input.weight > 200){
        errors.weight = 'El peso del Pokemon debe ser menor a 200'
    }
    if(input.height < 1 || input.height > 200){
        errors.height = 'La altura del Pokemon debe ser menor a 200'
    }
    if(!input.types.length){
        errors.types = 'Debe elegir alguna clase'
    }
    if(input.types.length > 3){
        errors.types = 'No puede elegir mas de 3 tipos por Pokemon'
    }
    console.log(errors)

    return errors;
}

export default function PokemonCreate(){
    const dispatch = useDispatch();
    const types = useSelector(state => state.types)
    const history = useHistory()

    const [errors, setErrors] = useState({})

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

        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e){
        setInput({
            ...input,
            types: [...input.types , e.target.value]
        })

        setErrors(validate({
            ...input,
            types: [...input.types , e.target.value]
        }))
    }

    function handleSubmit(e){
        e.preventDefault();

        if(Object.keys(errors).length === 0){
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
                    {
                        errors.name && (
                            <p>{errors.name}</p>
                        )
                    }
                </div>
                <div>
                    <label>Hp:</label>
                    <input 
                        type="number"
                        value={input.hp}
                        name="hp"
                        onChange={ (e) => handleChange(e) }
                    />
                    {
                        errors.hp && (
                            <p>{errors.hp}</p>
                        )
                    }
                </div>
                <div>
                    <label>Attack:</label>
                    <input 
                        type="number"
                        value={input.attack}
                        name="attack"
                        onChange={ (e) => handleChange(e) }
                    />
                    {
                        errors.attack && (
                            <p>{errors.attack}</p>
                        )
                    }
                </div>
                <div>
                    <label>Defense:</label>
                    <input 
                        type="number"
                        value={input.defense}
                        name="defense"
                        onChange={ (e) => handleChange(e) }
                    />
                    {
                        errors.defense && (
                            <p>{errors.defense}</p>
                        )
                    }
                </div>
                <div>
                    <label>Speed:</label>
                    <input 
                        type="number"
                        value={input.speed}
                        name="speed"
                        onChange={ (e) => handleChange(e) }
                    />
                    {
                        errors.speed && (
                            <p>{errors.speed}</p>
                        )
                    }
                </div>
                <div>
                    <label>Weight:</label>
                    <input 
                        type="number"
                        value={input.weight}
                        name="weight"
                        onChange={ (e) => handleChange(e) }
                    />
                    {
                        errors.weight && (
                            <p>{errors.weight}</p>
                        )
                    }
                </div>
                <div>
                    <label>Height:</label>
                    <input 
                        type="number"
                        value={input.height}
                        name="height"
                        onChange={ (e) => handleChange(e) }
                    />
                    {
                        errors.height && (
                            <p>{errors.height}</p>
                        )
                    }
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    {
                        types.map( type => (
                            <option value={type.name}>{type.name}</option>
                        ))
                    }
                </select>
                <ul><li>{input.types.map( el => el + " ,")}</li></ul>
                    {
                        errors.types && (
                            <p>{errors.types}</p>
                        )
                    }

                <button type='submit'>Create</button>

            </form>
        </div>
    )
}
