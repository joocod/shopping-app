import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

function ProductDetail() {
    const state = useLocation().state;
    const {id,image,price,option,
        colors,title,description,category} = state;

    const setOpt = option.split(',').map((option)=>option.trim())
    const [selected, setSelected] = useState(setOpt && setOpt[0])
    const [success, setSuccess] = useState();   // 장바구니 아이템 전송 여부 값    
   
    const selectOpt = (e)=>{
        setSelected(e.target.value)
    }    

    return (
        <div className='container'>
            <DetailPage>
                <div className='detailImg'>
                    <img src={image} alt={title}/>
                </div>
                <div className='detailText'>
                    <h3>{title}</h3>
                    <p className='price'>가격<span>{price}</span></p>
                    <p className='description'>{description}</p>
                    <div className='detailOpt'>
                        {/* 리액트에서는 label에 for 대신 htmlFor를 사용 */}
                        <label className='labelText' htmlFor='optSelect'>
                            <select id='optSelect' onChange={selectOpt} value={selected}>
                                {setOpt && setOpt.map((option, index)=>(
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>
                <div className='detailBtns'>
                    <button className='cartBtn'>장바구니 담기</button>
                    <button className='biyBtn'>구매하기</button>               
                </div>
            </DetailPage>
        </div>
    )
}

export default ProductDetail

const DetailPage = styled.div`
    width: 100%;
    display: flex;
    gap: 40px;
    .detailImg{
        max-width: 400px;
        img{
            width: 100%;
            display: block;
        }
    }
    .detailText{
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        h3{
            font-size: 24px;
            width: 100%;
            font-weight: normal;
            border-bottom: solid 1px rgba(0,0,0,0.1);
            padding-bottom: 20px;
        }
        .price{
            display: flex;
            align-items: center;
            gap: 30px;
        }
    }
`
