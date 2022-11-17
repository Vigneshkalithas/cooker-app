import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import"./Styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const data =[
    "https://www.campbells.com/wp-content/uploads/2022/09/Campbells-x-Richard-Blais-Tomato-Rigatoni-alla-Vodka_recipe-card-1106x830.jpg",
    "https://static01.nyt.com/images/2020/10/11/dining/ml-chicken-and-black-beans/merlin_160015383_4bd71410-dc4f-487f-92e6-c664995b50e0-master768.jpg",
    "https://cookieandkate.com/images/2015/04/fresh-mango-salsa-recipe-1.jpg",
  ]
  return (
 
    <div >
      
   <div className="Home-head">
        
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
   </div>
    </div>
  );
}

export default Home;
