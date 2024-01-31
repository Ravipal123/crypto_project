import React from 'react'
import {Link} from 'react-router-dom'
import { SiBitcoinsv } from "react-icons/si";
import './Header.css'

const Header = () => {
  return (
    <div className='navbar'>
        <div className='logo'>
            <h1>Crypt<SiBitcoinsv color='orange' size={'25px'} />Duniya</h1>
            

        </div>
        <ul>
            <li> <Link to='/'> Home</Link> </li>
            <li> <Link to='/coins'> Coins</Link> </li>
        </ul>
    </div>
  )
}

export default Header
