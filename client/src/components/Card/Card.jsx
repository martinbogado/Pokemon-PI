import React from 'react';
import style from './Card.module.css'

export default function Card({ name, types, image, id, weight, height}){

    let sprite;
    if(id >= 1 && id <= 40){
        sprite = true
    }

    const typesColors={
        fire: style.fire,
        normal: style.normal,
        fighting: style.fighting,
        flying: style.flying,
        ground: style.ground,
        poison: style.poison,
        rock: style.rock,
        bug: style.bug,
        ghost: style.ghost,
        steel: style.steel,
        water: style.water,
        grass: style.grass,
        electric: style.electric,
        psychic: style.psychic,
        ice: style.ice,
        dragon: style.dragon,
        dark: style.dark,
        fairy: style.fairy,
        unknown: style.unknown,
        shadow: style.shadow
    }


    return(
        <div className={style.card} style={{ backgroundImage: `url(images/typesbkg/${types[0]}.svg)` }}>
             <span className={style.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
            {
                sprite ?
                <img src={`images/sprites/${id}-front-n.gif`} alt="Img not found" height="190px" className={style.img}/>
                :
                <img src={image} alt="Img not found" height="190px" className={style.img}/>
            }
            <span className={`${style.typetitle} ${typesColors[types[0]]}`}>Types</span>
            <div className={style.types}>
                {
                    types ? types.map( el => {
                        return(
                            <img src={`images/types/${el}.png`} alt="Types" height="80px" key={el}/>
                        )
                     }
                    ) :
                    <span>Types not found</span>
                }
            </div>
            <span className={`${style.aboutitle} ${typesColors[types[0]]}`}>About</span>
            <div className={style.about}>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <img src={'images/cards/weight.svg'} alt='Weight Icon'/>
                        <span className={style.pokweight}>{weight / 10}kg</span>
                    </div>
                    <span className={style.weight}>Weight</span>
                </div>
                <div style={{display:'flex', flexDirection:'column', paddingLeft:'24%'}}>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <img src={'images/cards/height.svg'} alt='Height Icon'/>
                        <span className={style.pokheight}>{height / 10}m</span>
                    </div>
                    <span className={style.height}>Height</span>    
                </div>
            </div>
            
        </div>
    )
}