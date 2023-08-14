import React, { useState,useEffect } from 'react'
import axios from 'axios';

const SearchProduct = () => {
  const [search,setSearch] = useState('')
  const [products,setProducts] = useState([])
  const [company,setcompany] = useState("")
  useEffect(()=>{
    
    const fecthProducts = async () =>{
      console.log(company);
        const response = await axios.get('http://localhost:3001/search',{
          params : {
            name : search,
            company:company
          }
        })
        setProducts(response.data)
  
    }
    fecthProducts()
  },[search,company])
  return (
    <div>SearchProduct
    <div>
        <input value={search} onChange={(e)=>setSearch(e.target.value)}></input>
        <select value={company} onChange={(e)=>setcompany(e.target.value)}>
          <option value="">Select company</option>
          <option value="marcos">marcos</option>
          <option value="liddy">liddy</option>
          <option value="ikea">ikea</option>
          <option value="caressa">caressa</option>
        </select>
    </div>
    {
      products.map((product,index)=>{
        return <div key={index}>
            <h3><span>{index + " "}</span>{product.name}</h3>
            <h3>{product.price}</h3>
            
        </div>
      })
    }
    </div>
  )
}

export default SearchProduct