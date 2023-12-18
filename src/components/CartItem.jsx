import React from 'react'
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import UseCart from '../context/UseCart';

function CartItem({product, index}) {
    const {addItemCart, removeCart} = UseCart();
    
    const plusItem = ()=>{
        addItemCart.mutate({...product, quantity : product.quantity+1})
    }

    const minusItem = ()=>{
        if(product.quantity<2){
            alert('상품 갯수는 최소 1개여야 합니다.');
            return 
        }
        addItemCart.mutate({...product, quantity : product.quantity-1})
    }

    const itemDelete = ()=>{
        removeCart.mutate(product.id)
    }

    /*
        * mutation과 dispatch의 차이
        
        - mutaution : usemutation에서 비동기 작업을 실행하며, 
          데이터를 생성하거나 추가하고, 업데이트하거나 삭제해준다.
        - 데이터를 변경하는 작업에서 사용한다.
        
        - dispatch : redux에서 action을 내보내는데 사용하는 함수
        - action은 type을 포함한다.
        - action을 받아서 store에 전달하는 역할을 한다.
        - reducer에서는 action을 받아서 현재 상태에서 새로운 상태로 변경한다.
        - 주로 테마 변경과 같은 ui의 상태 변경에 자주 쓰인다.

        - 차이점 : mutation은 주로 외부에 있는 데이터의 이용에 사용되고,
          dispatch는 앱 내부에서 상태를 관리할 때 사용된다.
    */
    return (
        <li>
            <p>{index}</p>
            <img src={product.image} alt={product.title}/>
            <p>{product.title}</p>
            <p>{product.option}</p>
            <p>{product.price}</p>

            <div className='quantityWrap'>
                <p>수량 : {product.quantity}</p>
                <button onClick={plusItem}><IoMdArrowDropup /></button>
                <button onClick={minusItem}><IoMdArrowDropdown /></button>
            </div>
            <button onClick={()=>itemDelete(product.id)}>삭제</button>
        </li>
    )
}

export default CartItem
