import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

function DetailPageEvent({product}) {

    const colorItem = product.colors;

    /*
        * 값을 변수에 담아서 사용했을 때와 아닐 때의 차이
        - 장점 : 가독성, 재사용성
        - 주의점 : 변수에 담긴 값은 변수에 저장되기 때문에, 
          product.colors의 값이 달라진다면 colorItem의 값은 변동이 없다.
    */
   /*
        - 단순한 페이지의 이동이 목적이면 Link 태그 사용
        - 페이지를 이동하면서 데이터의 이동도 포함해야 한다면
          useNavigate 사용
   */

    const navigate = useNavigate();
    const detailNavigate = ()=>{
        navigate(`/products/detail/${product.id}`, {
            state : {
                title : product.title,
                id : product.id,
                image : product.image,
                price : product.price,
                option : product.option,
                category : product.category,
                colors : product.colors,
                description : product.description
            }
        })
    }
    
    return (
        <DetailItem onClick={detailNavigate}>
            <img src={product.image}/>
            <div className='textWrap'>
                <h3 className='itemTitle'>{product.title}</h3>
                <div class="itemFlex">
                    <p className='itemPrice'>{product.price}</p>
                    <p classitemOpt>{product.option}</p>
                </div>
                <div className='itemColor'>
                    {colorItem && colorItem.map((color, index)=>(
                        <div key={index}
                        style={{backgroundColor : color}}/>
                    ))}
                </div>
            </div>
        </DetailItem>
    )
}

export default DetailPageEvent

const DetailItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    .textWrap{
        display: flex;
        flex-direction: column;
        gap: 10px;
        .itemTitle{
            font-size: 20px;
            font-weight: normal;
            transition: 500ms;
            color: rgba(0,0,0,0.5);
            &:hover{
                color: rgba(0,0,0,1);
            }
        }
        .itemFlex{
            display: flex;
            justify-content: space-between;
        }
        .itemColor{
            display: flex;
            height: 20px;
            gap: 2px;
            div{
                width: 20px;
                height: 20px;
            }
        }
    }
`