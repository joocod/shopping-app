import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "./AuthContext";
import { getCart, updateCart } from "../api/firebase";

export default function UseCart(){
   const {uid} = useAuthContext();
   console.log(uid)
   const queryClient = useQueryClient();
   
   const cartInfo = useQuery({
    queryKey : ['cart', uid || ''],
    queryFn : ()=>getCart(uid),
    enabled : !!uid
   })

  const addItemCart = useMutation({
    mutationFn : (product)=>updateCart(uid, product),
    onSuccess : ()=>{
        queryClient.invalidateQueries(['cart',uid])
    }
  })
  return {cartInfo, addItemCart}
}   