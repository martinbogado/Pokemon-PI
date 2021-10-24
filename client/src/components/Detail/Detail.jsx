import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions';
import random from '../../images/random.png'
import loading from '../../images/loading.gif'
import style from './Detail.module.css'

import sword from '../../images/cards/sword.png'
import speed from '../../images/cards/run.png'
import happiness from '../../images/cards/happy.png'
import capture from '../../images/cards/pokeball.png'


export default function Detail (props){
    
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getDetail(props.match.params.id));
    },[dispatch])

    const myPokemon = useSelector( state => state.detail)

    const [section, setSection] = useState(1);

    useEffect( () => {
        if(myPokemon[0] && myPokemon[0].createdInDb){
            setSection(2)
        }
    }, [myPokemon, setSection]);

    

    function handleSection(e){
        if(e.target.innerHTML === 'About' && !myPokemon[0].createdInDb){
            setSection(1); 
        } else if(e.target.innerHTML === 'Base Stats'){
            setSection(2)
        } else if(e.target.innerHTML === 'Evolution' && !myPokemon[0].createdInDb){
            setSection(3)
        }
    }

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
                    <nav className={style.sections} style={{position:'relative'}}>
                        <button onClick={e => handleSection(e)} className={section === 1 ? style.active : style.noactive}>About</button><span className={style.lineab} style={section === 1 ? {opacity:'100%'} : {opacity:'0%'}}></span>
                        <button onClick={e => handleSection(e)} className={section === 2 ? style.active : style.noactive}>Base Stats</button><span className={style.linestat} style={section === 2 ? {opacity:'100%'} : {opacity:'0%'}}></span>
                        <button onClick={e => handleSection(e)} className={section === 3 ? style.active : style.noactive}>Evolution</button><span className={style.linevol} style={section === 3 ? {opacity:'100%'} : {opacity:'0%'}}></span>
                    </nav>
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
                    <section className={section === 1 ? style.show : style.hide}>
                        <div className={style.firstinfo}>
                            <div style={{display:'flex', flexFlow:'column', alignItems:'flex-start'}}>
                                <span style={{color:"black", fontWeight:'500', fontSize:"18px"}}>Description</span>
                                <span style={{alignSelf:'flex-start'}}>
                                    {myPokemon[0].description}
                                </span>
                            </div>

                            <div className={style.combatinfo}>
                                <div style={{display:'flex', flexFlow:'column', alignItems:'flex-start'}}>
                                    <span style={{color:"black", fontWeight:'500', marginBottom:'2%'}}>Combat</span>
                                    <div style={{display:'flex', flexFlow:'column'}}>
                                        <div style={{display:'flex', alignItems:'flex-start'}}>
                                            <span>Abilities</span>
                                            <div className={style.apinfo}>
                                                {
                                                    myPokemon[0].abilities ? myPokemon[0].abilities.map( el => {
                                                        return(
                                                            <span style={{width:'15vw', display: 'flex', justifyContent:'flex-start'}}>{el}</span>
                                                        )
                                                    }) :
                                                    <span>This pokemon has no abilities</span>
                                                }
                                            </div>
                                        </div>
                                        <div style={{display:'flex', alignItems:'flex-start'}}> 
                                            <span>Moves</span>
                                            <div className={style.apinfo}>
                                                {
                                                    myPokemon[0].moves ? myPokemon[0].moves.map( el => {
                                                        return(
                                                            <span style={{display:'inline-block'}}>{el}</span>
                                                        )
                                                    }) :
                                                    <span>This pokemon has no moves</span>
                                                }
                                            </div>
                                        </div>  
                                    </div>
                                    
                                </div>
                                <div style={{display:'flex', flexFlow:'column', alignItems:'flex-start'}}>
                                        <span style={{color:"black", fontWeight:'500', marginBottom:'2%'}}>Breeding</span>
                                        <div style={{display:'flex', flexFlow:'column'}}>
                                            <div style={{display:'flex', alignItems:'flex-start'}}>
                                                <span>Specie</span>
                                                    {
                                                        myPokemon[0].species ? 
                                                        <span style={{marginLeft:"6%", width:'15vw', display: 'flex', justifyContent:'flex-start' }}>{myPokemon[0].species}</span>
                                                        :
                                                        <span>This pokemon has no specie</span>
                                                    }
                                            </div>
                                            <div style={{display:'flex', alignItems:'flex-start'}}>
                                                <span>Habitat</span>
                                                    {
                                                        myPokemon[0].habitat ? 
                                                        <span style={{marginLeft:"6%"}}>{myPokemon[0].habitat}</span>
                                                        :
                                                        <span>This pokemon has no habitat</span>
                                                    }
                                            </div>
                                            <div style={{display:'flex', alignItems:'flex-start'}}>
                                                <span>Growth Rate</span>
                                                    {
                                                        myPokemon[0].growth ? 
                                                        <span style={{marginLeft:"6%"}}>{myPokemon[0].growth}</span>
                                                        :
                                                        <span>This pokemon has no growth-rate</span>
                                                    }
                                            </div>
                                            <div style={{display:'flex', alignItems:'flex-start'}}> 
                                            <span>Encounter Locations</span>
                                            <div className={style.apinfo}>
                                                {
                                                    myPokemon[0].locations.length ? myPokemon[0].locations.map( el => {
                                                        return(
                                                            <span style={{display:'inline-block'}}>{el}</span>
                                                        )
                                                    }) :
                                                    <span>This pokemon has no encounter locations</span>
                                                }
                                            </div>
                                        </div>       
                                        </div>   
                                    </div>
                            </div>
                            
                        </div>
                    </section>
                   
                   <section className={section === 2 ? style.show : style.hide}>
                   <div className={style.stats}>
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
                        
                        <div style={{display:'flex'}} className={style.moreinfo}>
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
                            {
                            !myPokemon[0].createdInDb ? 
                            <div className={style.aboutwo}>
                                <div>
                                    <div style={{display:'flex', flexDirection:'row'}}>
                                        <img src={happiness} alt='Happiness' height='22px' width='22px'/> 
                                        <span className={style.pokweight}>{myPokemon[0].happiness}</span>
                                    </div>
                                    <span className={style.weight}>Happiness</span>
                                </div>
                                <div style={{paddingTop:'4%'}}>
                                    <div style={{display:'flex', flexDirection:'row'}}>
                                        <img src={capture} alt='Capture' height='22px' width='22px'/>
                                        <span className={style.pokheight}>{myPokemon[0].capture}</span>
                                    </div>
                                    <span className={style.height}>Capture Rate</span>    
                                </div>
                            </div> : 
                            <div></div>
                            }
                            
                        </div>
                   </div>
                   </section>
                  
                   <section className={section === 3 ? style.show : style.hide}>

                   </section>
    
                </div> :
                <div className={style.loading}> 
                    <img src={loading} alt="Loading.." width='250px'/>
                    <p className={style.loadingtext}>Loading...</p>
                </div>
            }
        </div>
        
    )
}