import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";


export function Layout() {

    return (
     
       <div className="App-child">
            <div className="top-nav">
            <div>
            <Navbar/>
            </div>
            <div>
           <Outlet/>
            </div>
          </div>
        </div>
      
    );
  }