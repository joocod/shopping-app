import React from 'react'
import PropTypes from 'prop-types'

function SortButton({sortName, sortPrice}) {
    return (
        <>
            <button onClick={sortName}>이름순</button>
            <button onClick={sortPrice}>가격순</button>
        </>
    )
}

/*
    - propTypes : 타입에 대한 검증 라이브러리
    - isRequired : 
*/
SortButton.propTypes = {
    sortName : PropTypes.func.isRequired,
    sortPrice : PropTypes.func.isRequired,
}

export default SortButton
