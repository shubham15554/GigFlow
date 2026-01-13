import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { useContext, useEffect } from "react";
function Navbar() {
    let  navigate = useNavigate();



    
    let {userData , setUserData} = useContext(AuthContext);
    
    useEffect(()=>{
      console.log("user is changed")
    })

    const handleClick = async ()=>{
      await axios.post(
      "http://localhost:8000/user/logout",
      {},
      { withCredentials: true }
     
    );
    setUserData();
    navigate("/login");
    }
      
    return ( 
       <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-nav">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{color:"#6366F1", fontWeight:"bold" , fontSize:"1.5rem" , marginLeft:"2rem"}}><img src="/icons8-zoom.svg" alt="" />&nbsp;&nbsp;&nbsp;GIGFLOW</Link>
         
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>

                <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
      
             
             {userData===undefined && <li className="nav-item">
                <Link className="nav-link" to="/signup">Register</Link>
              </li>
             } 

            {userData &&  <li className="nav-item">
                <Link className="nav-link" to="/postGig">Post a gig</Link>
              </li>
            }
            {userData &&  <li className="nav-item">
                <Link className="nav-link" to="/myGigs">My Gigs</Link>
              </li>
            }
            {userData &&  <li className="nav-item">
                <Link className="nav-link" to="/myBids">My Bids</Link>
              </li>
            }
              
              {userData === undefined && <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              }

              {userData && <li className="nav-item">
                <button className="btn btn-outline-primary" onClick={handleClick} >Logout</button>
              </li>
               } 
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;
