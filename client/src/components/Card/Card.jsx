import React from 'react';
import style from './Card.module.css'

export default function Card({ name, types, image}){

    
    return(
        <div className={style.card}>
            <img src={image} alt="Img not found" width="200px" height="250px" className={style.img}/>
            <h3>{name}</h3>
            <h5>{types}</h5>
        </div>
    )
}