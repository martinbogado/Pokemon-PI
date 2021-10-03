import React from 'react';

export default function Card({ name, types, image}){
    return(
        <div>
            <h3>{name}</h3>
            <h5>{types}</h5>
            <img src={image} alt="Img not found" width="200px" height="250px" />
        </div>
    )
}