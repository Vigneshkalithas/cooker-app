import React, { useState , useEffect } from 'react';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import axios from 'axios';


function View() {
    let { id } = useParams();
    const navigate = useNavigate()
    // console.log(id)
    const [viewData , setViewData] = useState("")

    let fetchData = async () => {
        try{
          let result =  await axios.get(`https://61f1b9df072f86001749f34c.mockapi.io/cooker/${id}`)
          setViewData(result.data);
        
    
        }
        catch(error){
          console.log(error);
        }
       
      }
      
     
      
      useEffect(() => {
        fetchData();
      }, [])
      function GoEdit(id){
               navigate(`/edit/${id}`)
      }
      if(!viewData){
        return (<>
        <div>
          Loading</div>
          </>)
      }else{

      
      
  return (
    <div className='view-card-head'>
        
        <div className='view-card'>
        <button className='back-list' onClick={()=>navigate("/list")}><i className="fa-solid fa-arrow-left"></i></button>
        <button className='edit-list' onClick={()=>GoEdit(id)}><i className="fa-regular fa-pen-to-square"></i></button>
   <div className='view-img-head'>
    <img src ={viewData.recipePoster} alt="view-image"/>
   </div>
   <div className='view-texts'>
    <h1 className='view-h1'>{viewData.recipeName}</h1>
    <h2 className='view-h2'>{viewData.cookingTime}min</h2>
    <h5 className='view-h5'>{viewData.ingName}</h5>
    <p className='view-p'>
        {viewData.about}
    </p>
   </div>
        </div>
        <div className='steps-card-head'>
           <div className='steps-card'>
            <h2 className='step-head'>Instructions</h2>
            <ul className='step-ul'>
              {viewData.step.map((x)=>{
                return(
                  <>
                    <li><i class="fa-sharp fa-solid fa-circle-dot"></i><span>{x}</span></li>
                  </>
                )
              })}
              
                {/* <li><i class="fa-sharp fa-solid fa-circle-dot"></i><span>start to cook</span></li>
                <li><i class="fa-sharp fa-solid fa-circle-dot"></i><span>start to cook</span></li>
                <li><i class="fa-sharp fa-solid fa-circle-dot"></i><span>start to cook</span></li> */}
               
            </ul>

           </div>
        </div>
   </div>
      
  )
              }
}

export default View