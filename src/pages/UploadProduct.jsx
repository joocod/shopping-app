import React, { useState } from 'react';
import {upLoadImg} from '../api/imgupload';

function UploadProduct() {

    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const [product, setProduct] = useState({
        title : '',
        price : '',
        option : '',
        category : '',
        description : '',   
    })  // 모든 상품의 상태를 빈 문자열로 초기화

    const productInfoChange = (e)=>{
        const {name, value, files} = e.target;
        if(name === 'file' && files && files[0]){
            setFile(files[0])
        }else{
            setProduct((prev)=>({prev, [name]:value}))
        }
    }

    const uploadSubmit = async(e)=>{
        e.preventDefault();
        try{
            const url = await upLoadImg(file)
        }catch(error){
            console.error(error)
        }
    }

    return (
        <div className='container'>
            <div className='imgUploadWrap'>
                {file && (
                    <img src={URL.createObjectURL(file)}/>
                )}
            </div>
            <form onSubmit={uploadSubmit}>
                {/** 이미지 업로드 */}
                <input 
                    type='file'
                    name='file'
                    accept='image/*'
                    onChange={(e) => setFile(e.target.files[0])}
                />

                {/** 상품 제목 */}
                 <input
                    type='text'
                    name='title'
                    placeholder='상품명을 입력하세요'
                    value={product.title}
                    onChange={productInfoChange}
                 />

                {/** 상품 가격 */}
                <input
                    type='text'
                    name='price'
                    placeholder='상품 가격을 입력하세요'
                    value={product.price}
                    onChange={productInfoChange}
                />    

                {/** 상품 분류 */}
                <input
                    type='text'
                    name='category'
                    placeholder='상품 분류를 입력하세요'
                    value={product.category}
                    onChange={productInfoChange}
                />    

                {/** 상품 설명 */}
                <input
                    type='text'
                    name='description'
                    placeholder='상품 설명을 입력하세요'
                    value={product.description}
                    onChange={productInfoChange}
                />
                
                {/** 상품 옵션 */}
                <input
                    type='text'
                    name='option'
                    placeholder='상품 옵션을 ,로 구분해서 입력해주세요'
                    value={product.option}
                    onChange={productInfoChange}
                />
                <button disabled={isLoading}>
                    {isLoading ? '업로드 중' : '제품 등록'}
                </button>
            </form>
        </div>
    )
}

export default UploadProduct
