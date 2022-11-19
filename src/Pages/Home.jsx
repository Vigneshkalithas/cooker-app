import React from "react";
import { useNavigate } from "react-router-dom";
import"../Styles/Home.css";
import Carosuel from "../Components/Carosuel";

function Home() {
  const navigate = useNavigate();
 
  return (
 
  <>
  
      
   {/* <div className="Home-head">
        
        <div className="home-content">
          <h1>LEARN TO COOK FROM <br/>
          HOME LIKE A CHEF</h1>
          <p>Make the family kitchen like a restaurant kitchen more productive at <br/>
          home by cooking for the family or starting a culinary business.With our<br/>
          recipe recipes!</p>
             <button onClick={()=>navigate("/list")}>Explore Cooking Recipies</button>
             <div className="sm-img-head">
              {data.map((x)=>{
                return(
                 
                  <img src={x} className="home-sm-images"/>
                 
                )
              })}
             </div>
        </div>
        <div className="home-image">
          <img src="https://img.freepik.com/free-vector/isometric-italian-restaurant-kitchen-concept_1284-40632.jpg?w=740&t=st=1668685699~exp=1668686299~hmac=6f60cdfd51b37a194fbdeb8b78b8846d886d41b91cb580252905ae358366723f" alt="home-img"/>
        </div>
   </div> */}
   <Carosuel/>
    </>
  );
}

export default Home;
