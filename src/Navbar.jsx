import React from 'react';
import "./Styles/Navbar.css"

function Navbar() {
  return (
    <>
    <div className='navbar-head'>
           <h2>Cooking Box</h2>
           <div>
            <ul>
                <li>Home</li>
                <li>Create</li>
                <li>Recipes</li>
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