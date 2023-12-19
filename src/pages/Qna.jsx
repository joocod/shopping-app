import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onUserState } from '../api/firebase';

function Qna() {

    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        onUserState((user)=>{
            setUser(user);
        })
    })
    const onWriteEvent = ()=>{
        navigate(`/board/write`,{state : {email : user.email}})
    }

    return (
        <div className='container'>
            <div className='board-top'>
                <h2>QnA 게시판</h2>
                <button className='writeBtn' onClick={onWriteEvent}>작성하기</button>
            </div>
        </div>
    )
}

export default Qna
