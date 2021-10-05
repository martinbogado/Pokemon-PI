import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions';
import random from '../../images/random.png'

export default function Detail (props){
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));

    },[dispatch])

    const myPokemon = useSelector(state => state.detail)

    return(
        <div>
            <Link to='/home'><button>Volver</button></Link>
            {
                myPokemon.length && myPokemon[0].id == props.match.params.id ? 
                <div>
                   <h1>{myPokemon[0].name}</h1>  
                   <img src={myPokemon[0].img ? myPokemon[0].img : random}/>
                   <h4>Types: {myPokemon[0].types + ' '}</h4>
                </div> :
                <div>Loading.. </div> 
            }
        </div>
    )
}