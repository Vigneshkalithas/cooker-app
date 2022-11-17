import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css';
import Home from "./Home"
import ReceipeList from './ReceipeList';
import Step from "./Step";
import { Routes,Route,Link,Navigate,useNavigate} from "react-router-dom";
import { NotFound } from './NotFound';

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      {/* <Home/> */}
      {/* <ReceipeList/> */}
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Navigate replace to="/"/>} />
      <Route path="/list" element={<ReceipeList/>} />
      <Route path="/create" element={<Step/>} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
    
    </div>
  )
}

export default App
