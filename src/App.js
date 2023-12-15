import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import { Outlet, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import GlobalStyle from './style/GlobalStyles';
import AllProduct from './pages/AllProduct';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();
// outlet : 상위 경로에서 하위 경로 요소 구성
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <GlobalStyle/>
          <Nav/>
          <Routes>
            <Route path='/' element={<AllProduct/>}/>
          </Routes>
          {/* <AllProduct/> */}
          <Outlet/> 
        </AuthContextProvider>
        </QueryClientProvider>
    </>
  );
}

export default App;
