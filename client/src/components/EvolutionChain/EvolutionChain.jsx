import React from 'react';
import style from './EvolutionChain.module.css';

import dawn from '../../images/stones/dawn-stone.png'
import dusk from '../../images/stones/dusk-stone.png'
import everstone from '../../images/stones/everstone.png'
import fire from '../../images/stones/fire-stone.png'
import ice from '../../images/stones/ice-stone.png'
import leaf from '../../images/stones/leaf-stone.png'
import moon from '../../images/stones/moon-stone.png'
import shiny from '../../images/stones/shiny-stone.png'
import sun from '../../images/stones/sun-stone.png'
import thunder from '../../images/stones/thunder-stone.png'
import water from '../../images/stones/water-stone.png'


export default function EvolutionChain({ pokone, poktwo }){

    const stones = {
        "dawn-stone": dawn,
        "dusk-stone": dusk,
        "fire-stone": fire,
        "ice-stone": ice,
        "leaf-stone": leaf,
        "moon-stone": moon,
        "shiny-stone": shiny,
        "sun-stone": sun,
        "thunder-stone": thunder,
        "water-stone": water,
        everstone
    }

    let requirement;
    let value;

    for(let prop in poktwo){
        if(!['name', 'img', 'item', 'trigger', 'held_item', 'time_of_day', 'itemimg'].includes(prop)){
            requirement = prop.replace('min_', '')
            value = poktwo[prop]
        }
    }
    // console.log(poktwo)

    return(
        <div className={style.evolutions}>
            <div className={style.pokone} style={{display:'flex', flexDirection:'column'}} >
                <img src={pokone.img} alt='Pokemon One' height='140px' />
                <span style={{fontSize:'18px'}}>{pokone.name.charAt(0).toUpperCase() + pokone.name.slice(1)}</span>
            </div>

            <div className={style.trigger}>
                {
                    poktwo.itemimg ?
                    <div style={{display:'flex', flexDirection:"column", alignItems:"center", fontWeight:'500'}}>
                        <span>{poktwo["held_item"].replace('-', ' ')}</span>
                        <img src={poktwo.itemimg} alt='Held Item' height='32px' width='32px' /> 
                    </div> :
                    poktwo.item ? 
                    <div>
                        {
                        stones.hasOwnProperty(poktwo.item) ?
                        <div style={{display:'flex', flexDirection:"column", alignItems:"center", fontWeight:'500'}}>
                            <span>{poktwo.item.replace('-', ' ')}</span>
                            <img src={stones[poktwo.item]} alt='Item' height='24px' width='24px' /> 
                        </div>
                        : <span>{poktwo.item.replace('-', ' ')}</span>
                        }
                    </div> :
                    <div>
                        {
                            requirement && value ?
                            <div style={{display:'flex', flexDirection:"column", alignItems:"center", fontWeight:'500'}}>
                                <span>{requirement}</span>
                                <span style={{fontSize:"28px", color:"black"}}>{typeof value === 'number' ? value : value.replace('-', ' ')}</span>
                            </div> :
                            <span>Requirement not specified</span>
                        }
                    </div>
                }
                <span style={{fontSize:'14px', marginTop:'4%'}} className={style.triggertext}>{poktwo.trigger}</span>
            </div>

            <div className={style.poktwo} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <img src={poktwo.img} alt='Pokemon Two' height='140px' />
                <span style={{fontSize:'18px'}}>{poktwo.name.charAt(0).toUpperCase() + poktwo.name.slice(1)}</span>
            </div>
            
            
        </div>
    )   
        
}