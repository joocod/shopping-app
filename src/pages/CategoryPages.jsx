import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CategoryProductList from '../components/CategoryProductList';
import { getCategoryProduct } from '../api/firebase';
import CategorySlider from '../components/CategorySlider';

function CategoryPages() {
    const {category} = useParams();
    const [products, setProducts] = useState([]);
    const [randomImages, setRandomImages] = useState([]);

    // category가 바뀌는 순간에만 작동
    useEffect(()=>{
        getCategoryProduct(category).then((product)=>{
            setProducts(product);
        }).catch((error)=>{
            console.error(error)
        })
    }, [category])
    // console.log(products)
    // const slideItem = products.map((product)=>product.image)
    // console.log(slideItem)

    useEffect(()=>{
        if(products.length > 0){
            const randomImg = [...products].sort(()=>0.5-Math.random())
            // console.log(randomImg)
            const selectImg = randomImg.slice(0,4).map((el)=>el.image)
            setRandomImages(selectImg)
            // console.log(randomImages)
        }
    },[products])
    /*
        * a, b
        - 함수가 0보다 작은 값을 출력하면 a가 앖으로
        - 함수가 0보다 큰 값이면 b가 앞으로
    */

    return (
        <div>
            {category}
            <CategorySlider imgs={randomImages}/>
            <CategoryProductList category={category} product={products}/>
        </div>
    )
}

export default CategoryPages
