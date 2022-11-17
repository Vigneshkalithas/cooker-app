import React from 'react';
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
  return (
    <div className='home-head'>
     <div>
        <img className="image-home" src="https://static.vecteezy.com/system/resources/previews/006/847/502/non_2x/professional-chef-cartoon-character-cooking-illustration-with-different-trays-and-food-to-serve-delicious-food-made-in-kitchen-suitable-for-poster-vector.jpg"></img>
     </div>
     <div>
        <h1>Create Your Recipe</h1>
        <h1>With Us</h1>
        <button className='started' onClick={()=>navigate("/create")}>Get Started</button>
     </div>
    </div>
  )
}

export default Home