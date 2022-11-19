import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/Navbar.css";


function Navbar() {
  const navigate = useNavigate()
  return (
    <>
    <div className='navbar-head'>
           <h2>Cooking Box</h2>
           <div>
            <ul>
                <li onClick={()=>navigate("/home")}>Home</li>
                <li onClick={()=>navigate("/create")}>Create</li>
                <li onClick={()=>navigate("/list")}>Recipes</li>
            </ul>
            <div className='bar'>
            <i class="fa-solid fa-bars"></i>
            </div>
           </div>
    </div>
    </>
  )
}

export default Navbar