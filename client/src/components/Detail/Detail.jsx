import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions';
import random from '../../images/random.png'
import loading from '../../images/loading.gif'
import style from './Detail.module.css'

import sword from '../../images/cards/sword.png'
import speed from '../../images/cards/run.png'
import defense from '../../images/cards/shield.png'


export default function Detail (props){
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));

    },[dispatch])

    const myPokemon = useSelector(state => state.detail)


    return(
        <div>
            {
                myPokemon.length && myPokemon[0].id == props.match.params.id ? 
                <div className={style.grid} style={{maxHeight:'100vh'}}> 
                <Link to='/home' className={style.home}><button className={style.homebtn}>Back</button></Link>
                    <div className={style.encabezado}> 
                        <h1 className={style.name}>{myPokemon[0].name.charAt(0).toUpperCase() + myPokemon[0].name.slice(1)}</h1> 
                        <p>#{myPokemon[0].id}</p>
                    </div>
                    <div className={style.visual}> 
                        <img src={myPokemon[0].img ? myPokemon[0].img : random} className={style.img}/>
                        <span className={style.typestitle}>Types</span>
                        <div className={style.types}>
                            {
                                myPokemon[0].types ? myPokemon[0].types.map( el => {
                                    return(
                                        <img src={`../../images/types/${el}.png`} alt="Types" height="140px" key={el}/>
                                    )
                                }
                                ) :
                                <span>Types not found</span>
                            }
                        </div>
                    </div>
                   
                   <div className={style.stats}>
                        <h3 style={{display:'flex'}}>Base stats</h3>
                        <div className={style.bar}>
                            <div className={style.info}>
                                <span><i className="fas fa-heartbeat"></i> Hp</span>
                            </div>
                            <div className={style.progress} ><span style={{width:myPokemon[0].hp+'%'}} per={`${myPokemon[0].hp}`} className={style.hp}></span></div>  
                        </div>
                        <div className={style.bar}>
                            <div className={style.info}>
                                <span><img src={sword} alt='Attack' height='16px' width='16px'/> Attack</span>
                            </div>
                            <div className={style.progress} style={{animationDelay:'0.1s'}}><span style={{width:myPokemon[0].attack+'%'}} per={`${myPokemon[0].attack}`} className={style.attack}></span></div>  
                        </div>
                        <div className={style.bar}>
                            <div className={style.info}>
                                <span><i className="fas fa-shield-alt"></i> Defense</span>
                            </div>
                            <div className={style.progress} style={{animationDelay:'0.2s'}}><span style={{width:myPokemon[0].defense+'%'}} per={`${myPokemon[0].defense}`} className={style.defense}></span></div>  
                        </div>
                        <div className={style.bar}>
                            <div className={style.info}>
                                <span><img src={speed} alt='Speed' height='16px' width='16px'/> Speed</span>
                            </div>
                            <div className={style.progress} style={{animationDelay:'0.3s'}}><span style={{width:myPokemon[0].speed+'%'}} per={`${myPokemon[0].speed}`} className={style.speed}></span></div>  
                        </div>
                        <div className={style.about}>
                            <div>
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    <img src={'../../images/cards/weight.svg'} alt='Weight Icon'/>
                                    <span className={style.pokweight}>{myPokemon[0].weight / 10}kg</span>
                                </div>
                                <span className={style.weight}>Weight</span>
                            </div>
                            <div style={{paddingTop:'4%'}}>
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    <img src={'../../images/cards/height.svg'} alt='Height Icon'/>
                                    <span className={style.pokheight}>{myPokemon[0].height / 10}m</span>
                                </div>
                                <span className={style.height}>Height</span>    
                            </div>
                        </div>
                   </div>
    
                </div> :
                <div className={style.loading}> 
                    <img src={loading} alt="Loading.." width='250px'/>
                    <p className={style.loadingtext}>Loading...</p>
                </div>
            }
        </div>
        
    )
}