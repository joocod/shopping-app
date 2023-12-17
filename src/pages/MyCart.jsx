import React from 'react'
import UseCart from '../context/UseCart';
import CartItem from '../components/CartItem';

function MyCart() {
    const {cartInfo : {data : products}} = UseCart();
    const isItem = products && products.length > 0;

    return (
        <div className='container'>
            <h2>장바구니 리스트</h2>
            {!isItem && <p>장바구니에 상품이 없습니다.</p>}
            {isItem && (
                <ul className='cartList'>
                    {products && products.map((el,index)=>(
                        <CartItem key={el.id} product={el} index={index}/>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default MyCart
