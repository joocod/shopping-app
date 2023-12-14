import React from 'react'

function Products({products}) {
    return (
       <>
         <ul className='productList'>
            {products && products.map((product)=>(
                <li key={product.id} product={product}>
                    <DetailPageEvent product={product}/> 
                </li>
            ))}
         </ul>
       </>
    )
}

export default Products
