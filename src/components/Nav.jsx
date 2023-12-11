import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

function Nav() {
    return (
        <div>
            <HeaderContainer>
                <h1><Link to='/'>shop</Link></h1>
                <div className='userWrap'>
                    <button className='loginBtn'>login</button>
                </div>
            </HeaderContainer>
        </div>
    )
}

export default Nav

const HeaderContainer = styled.header`
    
`