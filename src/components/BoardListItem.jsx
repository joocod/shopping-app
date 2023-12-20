import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function BoardListItem({post}) {
    const navigate = useNavigate();
    const onDetailEvent = ()=>{
        navigate(`${post.id}`);
    }

    return (
        <BoardItem onClick={onDetailEvent}>
            <p>{post.title}</p>
            <p>{post.date}</p>
        </BoardItem>
    )
}

export default BoardListItem

const BoardItem = styled.li`
    
`