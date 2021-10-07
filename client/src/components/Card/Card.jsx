import React from 'react';
import style from './Card.module.css'

export default function Card({ name, types, image, id}){

    let sprite;
    if(id >= 1 && id <= 40){
        sprite = true
    }

    return(
        <div className={style.card}>
            {
                sprite ?
                <img src={`images/sprites/${id}-front-n.gif`} alt="Img not found" height="180px" className={style.img}/>
                :
                <img src={image} alt="Img not found" height="180px" className={style.img}/>
            }
            <h3>{name}</h3>
            <h5>{types}</h5>
        </div>
    )
}