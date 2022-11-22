import React, { useState , useEffect , useContext } from 'react';
import "../Styles/View.css"
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { Config } from "../Config/Config";
import { MyContext } from '../context';


function View() {
    let { id } = useParams();
    const navigate = useNavigate()
     const {user , userRole,isAuthenticated } = useContext(MyContext);
    const [viewData , setViewData] = useState("")

    let fetchData = async () => {
        try{
          let result =  await axios.get(`${Config.api}/recipe/${id}`)
          setViewData(result.data);
        
    
        }
        catch(error){
          console.log(error);
        }
       
      }
      
     
      
      useEffect(() => {
        if(!user){
          navigate("/")
        }
        else{
          fetchData();
        }
      
      }, [])
      function GoEdit(id){
        navigate(`/edit/${id}`)
      
      }
      
         
  const handleDelete = async(id) => {
    try{
      alert("Are you want to delete")
      navigate("/list")
          await axios.delete(`${Config.api}/recipe/${id}`)
      
         
    }
    catch(error){
     console.log(error);
    }
  }
      
      if(!viewData){
        return (<>
        <div className='load'>
      <img src="https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif" alt="loading"/>
    </div>
          </>
          )
      }else{

      
      
  return (
    <div className='view-card-head'>
    
        <div className='view-card'>
        <button className='back-list' onClick={()=>navigate("/list")}><i className="fa-solid fa-arrow-left"></i></button>
        {userRole=="admin" || userRole=="user" ? 
        <button className='edit-list' onClick={()=>GoEdit(id)}><i className="fa-regular fa-pen-to-square"></i></button> : ""}
        {userRole=="admin" ? 
        <button className='del-list' onClick={()=>handleDelete(id)}><i class="fa-solid fa-trash"></i></button> : ""}
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