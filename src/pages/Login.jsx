import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { googleLogin, loginEmail } from '../api/firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrormsg] = useState('');

    const navigate = useNavigate();

    const googleLoginEvent = async()=>{
        const user = await googleLogin();
        navigate('/');
    }

    const onLoginEvent = async(e)=>{
        e.preventDefault();
        setErrormsg('');
        try{
            const user = await loginEmail(email, password)
            if(user){
                navigate('/')
            }else{
                setErrormsg('이메일이나 비밀번호가 일치하지 않습니다.')
            }
        }catch(error){
            console.error(error)
        }
    }
    return (
        <div className='container'>
            <h2>로그인</h2>
                <form onSubmit={onLoginEvent}>
                    <input 
                        type='email' 
                        placeholder='이메일을 입력하세요.'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    /><br></br>
                    <input
                        type='password'
                        placeholder='비밀번호를 입력하세요.'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    /><br></br>
                    <button type='submit'>로그인</button>
                    <button onClick={googleLoginEvent}>구글 아이디 로그인</button>
                </form>
                {errorMsg && <span className='errorText'>{errorMsg}</span>}
            <Link to='/join'>회원가입</Link>
        </div>
    )
}

export default Login
