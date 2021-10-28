import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon, getTypes, getPokemons } from '../../actions/index';
import style from './PokemonCreate.module.css'
import validate from './validate.js';
import Oak from '../../images/profesor.png'
import swal from 'sweetalert';


export default function PokemonCreate(){
    const dispatch = useDispatch();
    const types = useSelector(state => state.types)
    const pokemons = useSelector(state => state.allPokemons.map( pok => pok.name))
    const history = useHistory()

    const [errors, setErrors] = useState({})
    const [section, setSection] = useState(1);


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

    const typesColors={
        fire: '#F57D31',
        normal: '#AAA67F',
        fighting: '#D3425F',
        flying: '#A891EC',
        ground: '#DEC16B',
        poison: '#A43E9E',
        rock: '#B69E31',
        bug: '#A7B723',
        ghost: '#70559B',
        steel: '#5695A3',
        water: '#6493EB',
        grass: '#74CB48',
        electric: '#F9CF30',
        psychic: '#FB5584',
        ice: '#9AD6DF',
        dragon: '#7037FF',
        dark: '#75574C',
        fairy: '#E69EAC',
        unknown: '#BF5481',
        shadow: '#36045E'
    }


    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " ")
        })

        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }, pokemons))
    }

    
    function handleSection(e){
        e.preventDefault();

        Object.keys(errors).length === 1 && errors.types.length ?
            setSection(section === 1 ? 2 : 1) 
            :
            swal("You must complete the form correctly!", "", "error");
    }

    function handleChecked(e){
        if (e.target.checked) {
            setInput({
            ...input,
            types: [...input.types , e.target.value]
            })

            setErrors(validate({
                ...input,
                types: [...input.types , e.target.value]
            }, pokemons))
            
        } else if (!e.target.checked) {
            setInput({
                ...input,
                types: input.types.filter(el => el !== e.target.value)
                })

            setErrors(validate({
                ...input,
                types: input.types.filter(el => el !== e.target.value)
            }, pokemons))    
        }
    };

    function handleSubmit(e){
        e.preventDefault();

        if(Object.keys(errors).length === 0 && input.name.length){
            dispatch(postPokemon(input));
            dispatch(getPokemons());
            swal("Good job!", "Pokemon created successfuly!", "success");
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
        } else{
            swal("You must choose at least one type!", "", "error");
        }  
    }


    return(
        <div className={style.pagina}>
            <img src={Oak} alt="Profesor Oak" height="560px" className={style.img}/>
            <Link to='/home' className={style.back} style={{textDecoration: 'none'}}><button>Return home</button></Link>
            <div className={style.container}>
                <div className={style.header}>
                    <h2>Create your pokemon!</h2>
                </div>
                <form onSubmit={ (e) => handleSubmit(e) }>
                    <section className={section === 1 ? style.show : style.hide}>
                    <div className={style.formdiv} >
                        <label>Name</label>
                        <input 
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={ (e) => handleChange(e) }
                            style={input.name.length ? errors.name ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                            autocomplete="off"
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
                    <button onClick={(e) => {handleSection(e)}}>Next</button>
                    </section>
                    <section className={section === 2 ? style.show : style.hide}>
                        <div style={{position:'relative'}}> 
                            <span className={style.choosetypes} style={{display:'flex', justifyContent:'flex-start', fontFamily:'Open Sans'}}>Choose up to 2 Pokemon types</span>

                            <div className={style.containertypes}>
                            {
                                types.map( type => (
                                    <label for={type.name}>
                                        <div className={style.bytype} > 
                                            <input 
                                                    type="checkbox" 
                                                    id={type.name} 
                                                    value={type.name}
                                                    onChange={(e) => handleChecked(e)}
                                            />
                                            <div className={style.circle} style={{display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:typesColors[type.name]}}
                                            ><img src={`images/icons/${type.name}.svg`} alt={`${type.name}`} height="16px" /></div>
                                            <div style={{width:'8px'}}></div>       
                                            {type.name}
                                        </div>
                                    </label>
                                ))
                            }  
                            </div>  
                            
                                {
                                    errors.types ? (
                                        <div className={style.typeserror}>
                                            <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                            <span>{errors.types}</span>
                                        </div>
                                    ) :
                                    <i></i>
                                }
                        </div>  

                        <div style={{display:'flex', flexFlow:'row nowrap'}}> 
                            <button className={style.previous} onClick={(e) => {handleSection(e)}}>Previous</button>
                            <button className={style.create} type='submit'>Create</button>
                        </div>
                        
                    </section>   
                    

                </form>
            </div>

        </div>
    )
}
