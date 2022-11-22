import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Edit from './Pages/Edit';
import Home from "./Pages/Home";
import { Layout } from "./Pages/Layout";
import Login from "./Pages/Login";
import { NotFound } from './Pages/NotFound';
import ReceipeList from './Pages/ReceipeList';
import Signup from './Pages/Signup';
import Step from "./Pages/Step";
import View from "./Pages/View";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Layout/>}> 
      <Route path="/" element={<Home/>}/>
      
      <Route path="/home" element={<Navigate replace to="/"/>} />
      <Route path="/list" element={<ReceipeList/>} />
      <Route path="/create" element={<Step/>} />
      <Route path="/view/:id" element={<View/>}/>
      <Route path="/edit/:id" element={<Edit/>}/>
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/404" />}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      
    </Routes>
    <ToastContainer autoClose={2000} />
    </div>
  )
}

export default App
