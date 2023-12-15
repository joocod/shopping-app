import { useAuthContext } from "./AuthContext";

export default function useCart(){
    const {uid} = useAuthContext();
    // useQueryClient : 리액트에서 데이터를 가져오고 업데이트 하는 라이브러리
    // 설치 - yarn add @tanstack/react-query
}   