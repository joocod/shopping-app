import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "./AuthContext";
import { getCart, updateCart } from "../api/firebase";

export default function UseCart(){
    const {uid} = useAuthContext();
    // useQueryClient : 리액트에서 데이터를 가져오고 업데이트 하는 라이브러리
    // 설치 - yarn add @tanstack/react-query

    const queryClient = useQueryClient();
    const cartInfo = useQuery(['cart', uid || ''], ()=> getCart(uid),{
        enabled : !!uid
    })
    const addItemCart = useMutation(
        // mutation : 정보를 업데이트할 때 사용하는 구문
        (product)=>updateCart(uid, product),{
            onSuccess : ()=>{
                queryClient.invalidateQueries(['cart',uid])
            }
        }
    )

    return [cartInfo, addItemCart]
}   