import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { googleLogOut, googleLogin, onUserState } from '../api/firebase';

function Nav() {

    const [user, setUser] = useState();

    const login =()=>{
        googleLogin().then(setUser);
    }
   
    const logout=()=>{
        googleLogOut().then(setUser);
    }

    useEffect(()=>{
        onUserState((user)=>{
            setUser(user);
         })
    }, [])
    console.log(user);
    
    return (
        <HeaderContainer>
            <h1><Link to='/'>shop</Link></h1>
            <div className='userWrap'>
                {!user && <button className='loginBtn' onClick={login}>login</button>}
                {user && <button className='logoutBtn' onClick={logout}>logout</button>}
            </div>
        </HeaderContainer>
    )
}

export default Nav

const HeaderContainer = styled.header`
    
`