import React, { useEffect, useState } from 'react'
import { getProducts } from '../api/firebase';
import Products from '../components/Products';

function AllProduct() {
    const [product, setProduct] = useState([]);

    useEffect(()=>{
        const fetchProducts = async()=>{
            try{
                const products = await getProducts();
                setProduct(products)
            }catch(error){
                console.log(error)
            }
        }
        fetchProducts();
    },[])
    
    return (
        <div>
            <Products products={product}/>
        </div>
    )
}

export default AllProduct
