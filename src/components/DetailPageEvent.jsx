import React from 'react'
import styled from 'styled-components'

function DetailPageEvent({product}) {
    return (
        <DetailItem>
            <img src={product.image}/>
            <div className='textWrap'>
                <h3 className='itemTitle'>{product.title}</h3>
                <div class="itemFlex">
                    <p className='itemPrice'>{product.price}</p>
                    <p classitemOpt>{product.option}</p>
                </div>
                <div className='itemColor'>
                    {product.colors && product.colors.map((color, index)=>(
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