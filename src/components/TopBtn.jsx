import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

function TopBtn() {

    const [isVisible, setIsvisible] = useState(false);

    const onScrollTop = ()=>{
        window.scrollTo({
            top : 0,
            behavior : 'smooth'
        })
    }
    
    const toggleVisible = ()=>{
        // 스크롤 값이 200보다 많으면 버튼을 나오게 하고 작으면 숨김 처리 
        // 상태변수
        if(window.pageYOffset > 200){
            setIsvisible(true)
        }else{
            setIsvisible(false)
        }
    }

    useEffect(()=>{     // 중첩 방지
        window.addEventListener('scroll', toggleVisible);
            return ()=>{
                window.removeEventListener('scroll', toggleVisible)
            }
    }, [])    

    return (
        isVisible && (
            <Top onClick={onScrollTop}>
                top
            </Top>
        )
    )
}

export default TopBtn

const Top = styled.button`
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: black;
    color: #fff;
`