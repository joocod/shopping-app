import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

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