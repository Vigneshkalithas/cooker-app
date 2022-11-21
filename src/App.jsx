import { useState } from 'react'
import './App.css';
import Home from "./Pages/Home"
import ReceipeList from './Pages/ReceipeList';
import Step from "./Pages/Step";
import { Routes,Route,Link,Navigate,useNavigate} from "react-router-dom";
import { NotFound } from './Pages/NotFound';
import View from "./Pages/View";
import Edit from './Pages/Edit';
import Navbar from './Components/Navbar';
import Login from "./Pages/Login";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      {/* <Navbar/> */}
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<Navigate replace to="/"/>} />
      <Route path="/list" element={<ReceipeList/>} />
      <Route path="/create" element={<Step/>} />
      <Route path="/view/:id" element={<View/>}/>
      <Route path="/edit/:id" element={<Edit/>}/>
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/404" />}/>
    </Routes>
    
    </div>
  )
}

export default App
