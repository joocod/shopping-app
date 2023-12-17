import React from 'react'

function CartItem({product, index}) {
    return (
        <li>
            <p>{index}</p>
                <img src={product.image} alt={product.title}/>
            <p>{product.title}</p>
        </li>
    )
}

export default CartItem
