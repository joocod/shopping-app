import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import { Outlet } from 'react-router-dom';

// outlet : 상위 경로에서 하위 경로 요소 구성

function App() {
  return (
    <>
      <Nav/>
      <Outlet/> 
    </>
  );
}

export default App;
