import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { googleLogOut, googleLogin, onUserState } from '../api/firebase';
import UserData from './UserData';

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
                <Link to='/product/upload'>업로드</Link>

                {user && <UserData user={user}/>}
                {!user && <button className='loginBtn' onClick={login}>login</button>}
                {user && <button className='logoutBtn' onClick={logout}>logout</button>}
            </div>
        </HeaderContainer>
    )
}

export default Nav

const HeaderContainer = styled.header`
    
`