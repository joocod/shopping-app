import { createContext, useEffect, useState } from "react";
import { onUserState } from "../api/firebase";


const AuthContext = createContext();

/*
    - context 컴포넌트 간에 어떠한 값들을 공유할 수 있게 해주는 hook
    - 변수에 새로운 context를 생성해서 초기화
    - createContext() : 컨텍스트를 사용하기 위해 생성
*/
export function AuthContextProvider({children}){
    const [user, setUser] = userState();
    const [unSubScribe, setunSubScribe] = useState();

    useEffect(()=>{
        const userChange = (newUser)=>{
            setUser(newUser)
        }
        const unSubScribeFunc = onUserState(userChange);
        // 위에서 업데이트된 사용자를 onuserState에 넘김
        setunSubScribe(()=>unSubScribeFunc);
        return ()=>{
            if(unSubScribeFunc){
                unSubScribeFunc()
            }
        }
    }, [])
}