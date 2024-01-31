import React from 'react'
import { useState, useEffect } from 'react'
import { Baseurl } from './baseUrl'
import Loader from './Loader'
import axios from 'axios'
import Header from './Header'
import {Link} from 'react-router-dom'
import './Res.css'


const Coins = () => {
  const [loading, setLoading] = useState(true)
  
  const [coins, setCoins]=useState([])

  const [currency, setCurrency] = useState('usd')

  const [search, setSearch] = useState('')

  const currencySymbol = currency === 'inr' ? '₹' : '$'

  useEffect(()=>{
      const getCoinsData = async()=>{
          const {data} = await axios.get(`${Baseurl}/coins/markets?vs_currency=${currency}`);
          console.log(data)
          setCoins(data)
          setLoading(false)
      }
      getCoinsData()
  },[currency])

  return (
    <>
      {
        loading ? <Loader/> :
        <>
          <Header/>
          <div className="search-bar">
            <input 
            type="text"
            placeholder='Search Your Coins'
            onChange={(e)=> setSearch(e.target.value)} 
            />
          </div>
          <div className="btns">
              <button onClick={() => setCurrency('inr')}>inr</button>
              <button onClick={() => setCurrency('usd')}>usd</button>
          </div>
          {
            coins.filter((data)=>{
                if(data == ""){
                  return data
                }
                else if(data.name.toLowerCase().includes(search.toLowerCase())){
                  return data
                }
            }).map((coinData, i)=>{
              return (
                <CoinCard key={i} coinData={coinData} i={i} id={coinData.id} currencySymbol={currencySymbol} />
              )
            })
          }
        </>
      }
    </>
  )
}

const CoinCard = ({coinData, i, currencySymbol, id}) => {
  const profit = coinData.price_change_percentage_24h>0
  return(
    
    <div key={i} className='ex-cards'>
      <div className='image'>
        <Link to={`/coins/${id}`} style={{color:'white', textDecoration:'none'}}>  
          <img height={'65px'} src={coinData.image} alt=""/>
        </Link>  
      </div>
      <div className='name'>
      <Link to={`/coins/${id}`} style={{color:'white', textDecoration:'none'}}>  
        {coinData.name}
      </Link>
      </div>
      <div className='price'>
        {currencySymbol}{coinData.current_price.toFixed(0)}
      </div>
      <div style={profit ? {color:'green'} : {color:'red'}} className="rank">
        {profit ? "+" + coinData.price_change_percentage_24h.toFixed(2) : coinData.price_change_percentage_24h.toFixed(2)}
      </div>
    </div> 
  )
}

export default Coins
