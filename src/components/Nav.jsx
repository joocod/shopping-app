import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { googleLogOut, googleLogin, onUserState } from '../api/firebase';
import UserData from './UserData';
import { LuPencil } from "react-icons/lu";

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
                {user && user.isAdmin && (
                   <Link to='/product/upload' className='uploadBtn'>{LuPencil}</Link>
                )}
                {user ?(
                    <>
                        <UserData user={user}/>
                        <button className='logoutBtn' onClick={logout}>logout</button>
                    </> 
                    ) : (
                        <button className='loginBtn' onClick={login}>login</button>
                )}
            </div>
        </HeaderContainer>
    )
}

export default Nav

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    padding: 12px;
    gap: 24px;

    .userWrap{
        display: flex;
        margin-left: auto;
        align-items: center;
        gap: 12px;
        button{
            padding: 6px 12px;
            border-radius: 6px;
            &.loginBtn{
                background: pink;
            }
            &.logoutBtn{
                background: gray;
            }
        }
        .uploadBtn{

        }
    }
`