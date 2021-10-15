import React, {useState, useEffect} from 'react' ;
import { useDispatch, useSelector } from 'react-redux' ;
import { getPokemons, filterCreated, orderByNameOrStrengh, getTypes, filterPokemonsByType } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import Navbar from '../Navbar/Navbar';
import random from '../../images/random.png';
import style from './Home.module.css';
import poke from '../../images/pokebola.png'


export default function Home(){

    const dispatch = useDispatch()
    const allPokemons = useSelector(state => state.pokemons)
    const types = useSelector(state => state.types)

    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch])

    useEffect(() => {
        setCurrentPage(1);
      }, [allPokemons,setCurrentPage]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    function handleFilterByType(e){
        dispatch(filterPokemonsByType(e.target.value));
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByNameOrStrengh(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return(
        <div className={style.home}>
            <Navbar />
            
            <button onClick={e => {handleClick(e)}} className={style.poke}><img src={poke} alt="pokebola" width='20px'/> Reload all</button>

            <div className={style.sortfilter}>
                <select onChange={e => handleSort(e)}>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                    <option value="HAttack">+ Attack</option>
                    <option value="LAttack">- Attack</option>
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value="All">All</option>
                    <option value="Api">API</option>
                    <option value="Created">Created</option>
                </select>
                <select onChange={e => handleFilterByType(e)}>
                    <option value="All">all</option>
                    {
                        types.map( type => (
                            <option value={type.name} key={type.name}>{type.name}</option>
                        ))
                    }
                </select>
            </div>
            <Paginado
                pokemonsPerPage={pokemonsPerPage}
                allPokemons = {allPokemons.length}
                paginado={paginado}
            />
            <div className={style.cards}>
            {
                currentPokemons.length ? currentPokemons.map( el => {
                    return(
                        <div>
                            <Link to={"/home/" + el.id} style={{textDecoration:'none'}} key={el.id}>
                                <Card name={el.name} types={el.types} image={el.img ? el.img : random} id={el.id} weight={el.weight} height={el.height} />
                            </Link>
                        </div>
                    )
                }) :
                <div className={style.loading}> 
                    <img src='images/loading.gif'alt="Loading.." width='250px'/>
                    <p className={style.loadingtext}>Loading...</p>
                </div>
            }
            </div>
        </div>
    )
}
