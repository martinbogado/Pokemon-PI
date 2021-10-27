import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Game.module.css';
import { Link } from 'react-router-dom';
import { getDetail, removeDetail } from '../../actions';
import poke from '../../images/pokebola.png';
import background from '../../images/pokemongame.png';
import gamelogo from '../../images/gamelogo.png';
import gamegif from '../../images/gamegif.gif'


export default function Game(){

    const dispatch = useDispatch();

    const [input, setInput] = useState('')
    const [success, setSuccess] = useState(false)
    const [game, setGame] = useState(false)

    const myPokemon = useSelector( state => state.detail)
    // console.log(myPokemon[0] ? myPokemon[0].name : 'no hay nombre')

    useEffect( () => {
        if(!myPokemon.length){
         dispatch(getDetail(Math.floor(Math.random() * 100) + 1))
        }   
    },[myPokemon.length, dispatch])

    const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));

    function handleReload(e){
        e.preventDefault();

        dispatch(removeDetail());
    }

    function handleChange(e){
        e.preventDefault();

        if(myPokemon[0]){
        setInput(e.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " "))
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        if(myPokemon[0] && input.length){
            setGame(true)
            setInput('')
    
            input.toLowerCase() === myPokemon[0].name.toLowerCase() ?
            handleSuccess() :
            handleFailure()
        }
    }

    async function handleSuccess(){
        setSuccess(true)
        await waitFor(4000);
        setGame(false);
        setSuccess(false)
        dispatch(removeDetail());
    }

    async function handleFailure(){
        await waitFor(4000);
        setGame(false);
        dispatch(removeDetail());
    }


    return(
        <div className={style.game}>
            <Link to='/home' style={{textDecoration: 'none'}} className={style.home}><button className={style.button}><img src={poke} alt="pokebola" width='20px'/> Home</button></Link>
            <img src={gamelogo} className={style.logo}alt="pokebola" width='540px'/>
            
            <div className={style.header}>
              <button onClick={(e) => handleReload(e)} className={style.reload}><img src='images/cards/reload.svg' alt="pokebola" width='40px'/></button>
              <img src={background} className={style.bkg} alt="pokebola" width='580px'/>
              {
                myPokemon.length ?
                <img src={myPokemon[0].img} style={ game ? {filter: 'grayscale(0) brightness(100%)'} : {}} className={style.img} alt="Pokemon" width='220px'/> :
                <img src={gamegif} className={style.img} alt="Loading game" width='220px'/>
              }
              <span className={style.introduction}>Test your knowledge with this guess Pokemon game!</span>
              <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
                  <input 
                    type='text' 
                    onChange={(e) => handleChange(e)} 
                    value={input} 
                    name='repeat'
                    autocomplete="off"
                    placeholder="Pokemon name..."
                  />
                  <button type='submit'>Send</button>
              </form>
              {
                  game ? 
                  success ?
                  <div className={style.result}>
                      Correct! This pokemon is {myPokemon[0].name}
                  </div> :
                  <div className={style.result}>
                      Oops! Incorrect. This pokemon is {myPokemon[0].name}
                  </div>
                  :
                  <div></div>
              }
            </div>
        </div>
    ) 
}