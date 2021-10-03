import React, {useState, useEffect} from 'react' ;
import { useDispatch, useSelector } from 'react-redux' ;
import { getPokemons } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';

export default function Home(){

    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)

    useEffect(() => {
        dispatch(getPokemons());
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }

    return(
        <div>
            <Link to="/pokemons">Crear Pokemon</Link>
            <h1>Aguante pokemon ndea</h1>
            <button onClick={e => {handleClick(e)}}>Volver a cargar todos los Pokemones</button>
            <div>
                <select>
                    <option value="asc">A - Z</option>
                    <option value="des">Z - A</option>
                    <option value="HAttack">+ Attack</option>
                    <option value="HDefense">+ Defense</option>
                </select>
                <select>
                    <option value="All">All</option>
                    <option value="Api">API</option>
                    <option value="Created">Created</option>
                </select>
            </div>
            {
                allPokemons && allPokemons.map( el => {
                    return(
                        <fragment>
                            <Link to={"/home/" + el.id}>
                                <Card name={el.name} types={el.type} image={el.img} />
                            </Link>
                        </fragment>
                    )
                })
            }
        </div>
    )
}
