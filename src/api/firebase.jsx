import { initializeApp } from "firebase/app";
import { 
  GoogleAuthProvider, 
  getAuth, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut
} from "firebase/auth";

import {set, get, getDatabase, ref, remove} from 'firebase/database';
import {v4 as uuid} from 'uuid';

const firebaseConfig = {
    apiKey : process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId : process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL : process.env.REACT_APP_FIREBASE_DB_URL
}

/*
    - process.env : 환경변수 node.js의 전역 객체
    - 환경변수 : 실행 중인 프로세스에 사용할 수 있고, 
      애플리케이션을 구현하는 키-값으로 이루어진 변수
    - 외부에서 값을 받아와서 설정할 수 있게 코드를 직접 하드코딩하지 않고
      설정, 개인정보를 매개변수로 분리해서 관리하는 용도로 사용한다. 
      
    - process : 현재 node.js의 프로세스의 전역 객체로 실행 중인 프로세스에
      접근해서 정보를 받아옴
    - .env : process에서 사용할 수 있는 모든 환경변수를 포함하는 객체   
*/

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase(app);

// 구글 자동 로그인 방지
provider.setCustomParameters({
  prompt : 'select_account'
})

// 구글 로그인 function
export async function googleLogin(){
  try{
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user)
      return user;
  }catch(error){
    console.log(error)
  }
}

export async function googleLogOut(){
  try{
    await signOut(auth);  // 기존의 정보들을 초기화하는 hook
  }catch(error){
    console.log(error);
  }
}

// 로그인 시 새로고침을 해도 로그인 상태 유지
export function onUserState(callback){
  onAuthStateChanged(auth, async(user)=>{
    if(user){
      try{
        const updateUser = await adminUser(user);
        callback(updateUser);
      }catch(error){
        console.error(error)
      }
    }else{
      callback(null);
    }
  })
  // onAuthStateChanged : 사용자 인증 상태의 변화를 체크하는 hook(로그인 / 로그아웃)
}

async function adminUser(user){
  try{
    const snapshot = await get(ref(database, 'admin'));
    // snapshot : firebase의 database 안에 있는 admin 폴더를 검색
    if(snapshot.exists()){
      // snapshot.exists() : snapshot 안에 데이터가 있음을 의미
      
      const admins = snapshot.val();  // admin 폴더 안에 있는 데이터들을 검색
      
      const isAdmin = admins.includes(user.email);
      // 검색된 admins에 현재 로그인된 사용자의 이메일과 일치하는 이메일이 있는지 확인

      return {...user, isAdmin} 
    }
    return user
  }catch(error){
    console.error(error);
  }
}

// 상품을 database에 업로드
export async function addProducts(product, image){
    /*
      * uuid 
      - 식별자를 만들어주는 라이브러리
      - 숫자와 영문으로 조합된 식별자 코드를 부여해서 고유값으로 사용
    */
   const id = uuid()
   return set(ref(database, `products/${id}`),{
     ...product,
     id,
     image,
   })
}

// database에 있는 상품 가져오기
export async function getProducts(){
  /*
    * async
    - 비동기 방식의 데이터 처리 방법
    - promise의 단점을 보완한 최신 비동기 처리 방식 코드
  */

 const snapshot = await get(ref(database, 'products'));
 if(snapshot.exists()){
    return Object.values(snapshot.val())
  }else{
    return []
  }
}

// 장바구니 리스트 (업데이트, 상품 정보 가져오기, 상품 삭제)

// 장바구니 리스트 불러오기
export async function getCart(userId){
  try{
    const snapshot = await(get(ref(database, `cart/${userId}`)));
    if(snapshot.exists()){
      const item = snapshot.val();
      return Object.values(item)
    }else{
      return []
    }
  }catch(error){
    console.error(error)
  }
}

// 장바구니 업데이트
export async function updateCart(userId, product){
  try{
    const cartRef = ref(database, `cart/${userId}/${product.id}`);
    await set(cartRef, product);
  }catch(error){
    console.log(error)
  }
}

// 장바구니 목록 삭제
export async function deleteCart(userId, productId){
  return remove(ref(database, `cart/${userId}/${productId}`))
}

// 카테고리 상품 가져오기
export async function getCategoryProduct(category){
  // console.log(category)
  return get(ref(database, 'products')).then((snapshot)=>{
    if(snapshot.exists()){
      /*
         - 카테고리 별로 아이템 나누는 방식은 전체 상품을 먼저 구한 뒤에 
           필터로 카테고리 별로 구분
      */
      const allProducts = Object.values(snapshot.val());
      const filterProducts = allProducts.filter((product)=>product.category === category);
      
      return filterProducts
    }
    return [];
  })
}

// 상품 검색
export async function searchProducts(query){
   try{
    const dbRef = ref(database, 'products');
    const snapshot = await get(dbRef);
    if(snapshot.exists()){
      const data = snapshot.val();
      const allProducts = Object.values(data);

      if(allProducts.length === 0){
        return []
      }
      const matchProducts = allProducts.filter((product)=>{
        const itemTitle = product.itemTitle
        return itemTitle.includes(query)
      })

      return matchProducts
    }else{
      return []
    }

   }catch(error){

   }
}