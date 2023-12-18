import React from 'react'
import DetailPageEvent from './DetailPageEvent'

function CategoryProductList({category, product}) {
    // console.log(product)
    
    /*
        * 슬라이드 이미지 출력 방식

        - 카테고리 별로 상품을 다르게 출력
        - 전체 페이지에 동일하게 출력
        - 
    */
    return (
        <div className='container'>
            <h2>{category}</h2>

            <ul className='productList'>
                {product.map((product)=>(
                    <li key={product.id}>
                        <DetailPageEvent product={product}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CategoryProductList
