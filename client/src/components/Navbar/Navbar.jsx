import React from 'react' ;
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import style from './Navbar.module.css'

export default function Navbar(){
    return (
        <nav className={style.nav}>
            <Link to='/'>
                <span className={style.landinglink}>
                    <img id="logoPoke" src={`images/palanding.png`} width="120" alt="landing" />
                </span>
            </Link>
            <SearchBar />
            <Link to="/pokemons"><button className={style.create}>Create</button></Link>
        </nav>
      );
}