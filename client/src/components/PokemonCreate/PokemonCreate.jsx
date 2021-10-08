import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon, getTypes } from '../../actions/index';
import style from './PokemonCreate.module.css'

function validate(input, pokemons){
    let errors = {};

    if(!input.name){
        errors.name = 'Se requiere un nombre'
    }
    if(pokemons.indexOf( input.name ) !== -1){
        errors.name = 'Ya existe un pokemon con ese nombre'
    }
    if(input.name.length > 25){
        errors.name = 'El nombre no puede tener mas de 25 caracteres'
    }

    if(input.hp < 1 || input.hp > 150){
        errors.hp = 'La vida del Pokemon debe ser menor a 150'
    }
    if(input.attack < 1 || input.attack > 120){
        errors.attack = 'El poder de ataque del Pokemon debe ser menor a 120'
    }
    if(input.defense < 1 || input.defense > 120){
        errors.defense = 'La defensa del Pokemon debe ser menor a 120'
    }
    if(input.speed < 1 || input.speed > 100){
        errors.speed = 'La velocidad del Pokemon debe ser menor a 100'
    }
    if(input.weight < 1 || input.weight > 1500){
        errors.weight = 'El peso del Pokemon debe ser menor a 1500g'
    }
    if(input.height < 1 || input.height > 100){
        errors.height = 'La altura del Pokemon debe ser menor a 100'
    }

    if(!input.types.length){
        errors.types = 'Debe elegir alguna clase'
    }
    if(input.types.length > 3){
        errors.types = 'No puede elegir mas de 3 tipos por Pokemon'
    }
    
    return errors;
}

export default function PokemonCreate(){
    const dispatch = useDispatch();
    const types = useSelector(state => state.types)
    const pokemons = useSelector(state => state.allPokemons.map( pok => pok.name))
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
        }, pokemons))
    }

    function handleSelect(e){
        setInput({
            ...input,
            types: [...input.types , e.target.value]
        })

        setErrors(validate({
            ...input,
            types: [...input.types , e.target.value]
        }, pokemons))
    }

    function handleSubmit(e){
        e.preventDefault();

        if(Object.keys(errors).length === 0 && input.name.length){
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
            <Link to='/home'><button className={style.back}>Go back</button></Link>
            <div className={style.container}>
                <div className={style.header}>
                    <h2>Create your pokemon!</h2>
                </div>
                <form onSubmit={ (e) => handleSubmit(e) }>
                    <div className={style.formdiv} >
                        <label>Name</label>
                        <input 
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={ (e) => handleChange(e) }
                            style={input.name.length ? errors.name ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                            errors.name ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.name}</p>
                                </div>
                            ) :
                            input.name.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <div className={style.formdiv}>
                        <label>Hp</label>
                        <input 
                            type="number"
                            value={input.hp}
                            name="hp"
                            onChange={ (e) => handleChange(e) }
                            style={input.hp.length ? errors.hp ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                            errors.hp ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.hp}</p>
                                </div>
                            ) :
                            input.hp.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <div className={style.formdiv}>
                        <label>Attack</label>
                        <input 
                            type="number"
                            value={input.attack}
                            name="attack"
                            onChange={ (e) => handleChange(e) }
                            style={input.attack.length ? errors.attack ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                            errors.attack ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.attack}</p>
                                </div>
                            ) :
                            input.attack.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <div className={style.formdiv}>
                        <label>Defense</label>
                        <input 
                            type="number"
                            value={input.defense}
                            name="defense"
                            onChange={ (e) => handleChange(e) }
                            style={input.defense.length ? errors.defense ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                             errors.defense ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.defense}</p>
                                </div>
                            ) :
                            input.defense.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <div className={style.formdiv}>
                        <label>Speed</label>
                        <input 
                            type="number"
                            value={input.speed}
                            name="speed"
                            onChange={ (e) => handleChange(e) }
                            style={input.speed.length ? errors.speed ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                             errors.speed ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.speed}</p>
                                </div>
                            ) :
                            input.speed.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <div className={style.formdiv}>
                        <label>Weight</label>
                        <input 
                            type="number"
                            value={input.weight}
                            name="weight"
                            onChange={ (e) => handleChange(e) }
                            style={input.weight.length ? errors.weight ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                             errors.weight ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.weight}</p>
                                </div>
                            ) :
                            input.weight.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <div className={style.formdiv}>
                        <label>Height</label>
                        <input 
                            type="number"
                            value={input.height}
                            name="height"
                            onChange={ (e) => handleChange(e) }
                            style={input.height.length ? errors.height ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                            errors.height ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.height}</p>
                                </div>
                            ) :
                            input.height.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <select onChange={(e) => handleSelect(e)}>
                        {
                            types.map( type => (
                                <option value={type.name}>{type.name}</option>
                            ))
                        }
                    </select>
                    <ul><li style={{listStyle: 'none'}}>{input.types.map( el => el + " ,")}</li></ul>
                        {
                            errors.types && (
                                <p style={{color: '#e74c3c'}}>{errors.types}</p>
                            )
                        }

                    <button type='submit'>Create</button>

                </form>
            </div>

        </div>
    )
}
