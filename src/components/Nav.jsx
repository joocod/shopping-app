import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import { googleLogOut, onUserState } from '../api/firebase';
import UserData from './UserData';
import MainMenu from './MainMenu';

function Nav() {

    const [user, setUser] = useState();
    const navigate = useNavigate();

    const login =()=>{
        navigate('/login'); // 로그인 페이지로 이동하는 메소드로 변경 
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
            <MainMenu/>
            <Link to='/board/qna'>QnA</Link>

            <div className='userWrap'>
                <Link to='/search'>검색</Link>
                {user && user.isAdmin && (
                   <Link to='/product/upload' className='uploadBtn'>업로드</Link>
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
    border-bottom: solid 1px rgba(0,0,0,0.1);
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