import React , { useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { data }  from "./Helper.js";

function ReceipeList() {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState([]);
  const data = [
  {
    image:"https://i.pinimg.com/564x/22/96/74/2296744f0d6c2b2bd09be16083d81dfc.jpg",
    name:"noodles",
    time:"20min",
    ingridients:"malikai , sombu, vendhayam"

  },
  {
    image:"https://hips.hearstapps.com/hmg-prod/images/shakshuka-1620054075.jpg?crop=0.845xw:0.845xh;0.116xw,0.00680xh&resize=640:*",
    name:"noodles",
    time:"20min",
    ingridients:"malikai , sombu, vendhayam"

  },
  {
    image:"https://www.curiouscuisiniere.com/wp-content/uploads/2021/02/Saag-Paneer-4.1200.jpg.webp",
    name:"noodles",
    time:"20min",
    ingridients:"malikai , sombu, vendhayam"

  },
]

let fetchData = async () => {
  try{
    let result =  await axios.get('https://61f1b9df072f86001749f34c.mockapi.io/cooker')
    
    setRecipe(result.data);
    console.log(result.data);
  }
  catch(error){
    console.log(error);
  }
 
}

// fetchData();

useEffect(() => {
  fetchData();
}, [])
  return (
    <>
    <div className='home-back-head'>
      <button className='back' onClick={()=>navigate("/create")}><i class="fa-solid fa-arrow-left"></i></button>
      <button className='home' onClick={()=>navigate("/home")}><i class="fa-solid fa-house"></i></button></div>
    
    <div className='card-head'>
      {recipe.map((x,index)=>{
        return(
          <>
<div className='card-list'>
        <div key={index}><img className="img-card" src={x.recipePoster} alt="card-image"></img></div>
        <div>
          <h2>{x.recipeName}</h2>
          <h3>{x.cookingTime} min</h3>
          <h5>{x.ingName}</h5>
          <p>{x.about}</p>
        </div>
      </div>
          </>
        )
      })}
      
      {/* <div className='card-list'></div> */}
     
    </div>
    </>
  )
}

export default ReceipeList