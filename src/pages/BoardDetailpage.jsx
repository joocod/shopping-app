import React from 'react'
import { useLocation } from 'react-router-dom'

function BoardDetailpage() {
    const state = useLocation().state;
    const {id, user, date, title, text} = state;

    return (
        <div className='container'>
            <div className='boardTextbox'>
                <strong>{title}</strong>
                <p>{text}</p>
                <p>{date}</p>
            </div>
        </div>
    )
}

export default BoardDetailpage
