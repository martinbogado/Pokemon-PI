import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon, getTypes } from '../../actions/index';
import style from './PokemonCreate.module.css'
import validate from './validate.js';


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
