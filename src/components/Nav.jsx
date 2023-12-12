import React, { useState } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { googleLogin } from '../api/firebase';

function Nav() {

    const [user, setUser] = useState();

    const login =()=>{
        googleLogin().then(setUser);
    }

    return (
        <HeaderContainer>
            <h1><Link to='/'>shop</Link></h1>
            <div className='userWrap'>
                <button className='loginBtn' onClick={login}>login</button>
            </div>
        </HeaderContainer>
    )
}

export default Nav

const HeaderContainer = styled.header`
    
`