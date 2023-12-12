import React, { useState } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { googleLogin } from '../api/firebase';

function Nav() {

    const [user, setUser] = useState();

    const login =()=>{
        googleLogin().then(setUser);
    }
    console.log(user);

    return (
        <HeaderContainer>
            <h1><Link to='/'>shop</Link></h1>
            <div className='userWrap'>
                {!user && <button className='loginBtn' onClick={login}>login</button>}
                {user && <button className='logoutBtn'>logout</button>}
            </div>
        </HeaderContainer>
    )
}

export default Nav

const HeaderContainer = styled.header`
    
`