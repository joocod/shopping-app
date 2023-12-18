import React, { useEffect, useState } from 'react'
import { searchProducts } from '../api/firebase';

function Search() { 
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);

    useEffect(()=>{
        const fetchProducts = async()=>{
            if(query.trim() === ''){
                setResult([])
            }else{
               try{
                   const txt = await searchProducts(query);
                   setResult(txt)
               }catch(error){
                 console.error(error)
               }
            }
        }
        fetchProducts()
    }, [query])

    const onSearchEvent=(e)=>{
        e.preventDefault();
        setQuery(e.target.value);
    }

    return(
        <div className='container'>
            <input type='text' value={query} onChange={onSearchEvent} className='searchForm'/>
        </div>
    )
}

export default Search
