import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions';
import random from '../../images/random.png'
import loading from '../../images/loading.gif'
import style from './Detail.module.css'

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
                <div className={style.grid}>
                    <div className={style.encabezado}> 
                        <h1>{myPokemon[0].name.charAt(0).toUpperCase() + myPokemon[0].name.slice(1)}</h1> 
                        <p>#{myPokemon[0].id}</p>
                    </div>
                   <img src={myPokemon[0].img ? myPokemon[0].img : random} className={style.img}/>
                   <h4 className={style.types}>Types: {myPokemon[0].types + ' '}</h4>
                   <div className={style.stats}>
                        <h3>Base stats</h3>
                        <div className={style.bar}>
                            <div className={style.info}>
                                <span>Hp</span>
                            </div>
                            <div className={style.progress} ><span style={{width:myPokemon[0].hp+'%'}} per={`${myPokemon[0].hp}`} className={style.hp}></span></div>  
                        </div>
                        <div className={style.bar}>
                            <div className={style.info}>
                                <span>Attack</span>
                            </div>
                            <div className={style.progress} style={{animationDelay:'0.1s'}}><span style={{width:myPokemon[0].attack+'%'}} per={`${myPokemon[0].attack}`} className={style.attack}></span></div>  
                        </div>
                        <div className={style.bar}>
                            <div className={style.info}>
                                <span>Defense</span>
                            </div>
                            <div className={style.progress} style={{animationDelay:'0.2s'}}><span style={{width:myPokemon[0].defense+'%'}} per={`${myPokemon[0].defense}`} className={style.defense}></span></div>  
                        </div>
                        <div className={style.bar}>
                            <div className={style.info}>
                                <span>Speed</span>
                            </div>
                            <div className={style.progress} style={{animationDelay:'0.3s'}}><span style={{width:myPokemon[0].speed+'%'}} per={`${myPokemon[0].speed}`} className={style.speed}></span></div>  
                        </div>
                        <div>Weight: {myPokemon[0].weight} </div>
                        <div>Height: {myPokemon[0].height} </div>
                   </div>
    
                </div> :
                <div> 
                    <img src={loading}alt="Loading.." width='250px'/>
                    <p>Loading...</p>
                </div> 
            }
        </div>
        
    )
}