import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CategoryProductList from '../components/CategoryProductList';
import { getCategoryProduct } from '../api/firebase';
import CategorySlider from '../components/CategorySlider';

function CategoryPages() {
    const {category} = useParams();
    const [products, setProducts] = useState([]);

    // category가 바뀌는 순간에만 작동
    useEffect(()=>{
        getCategoryProduct(category).then((product)=>{
            setProducts(product);
        }).catch((error)=>{
            console.error(error)
        })
    }, [category])
    console.log(products)

    return (
        <div>
            {category}
            <CategorySlider imgs={products.image}/>
            <CategoryProductList category={category} product={products}/>
        </div>
    )
}

export default CategoryPages
