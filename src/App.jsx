import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css';
import Home from "./Home"
import ReceipeList from './ReceipeList';
import Step from "./Step";
import { Routes,Route,Link,Navigate,useNavigate} from "react-router-dom";
import { NotFound } from './NotFound';
import View from "./View";
import Edit from './Edit';
import Navbar from './Navbar';

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Navbar />
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Navigate replace to="/"/>} />
      <Route path="/list" element={<ReceipeList/>} />
      <Route path="/create" element={<Step/>} />
      <Route path="/view/:id" element={<View/>}/>
      <Route path="/edit/:id" element={<Edit/>}/>
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
    
    </div>
  )
}

export default App
