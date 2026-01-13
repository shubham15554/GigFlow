
import React, { useEffect } from "react";
import { useState } from "react";
import {NavLink} from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from "../components/context/authContext.jsx";
import { useContext } from "react";
import { toast } from "react-toastify";


import { useNavigate } from "react-router-dom";
function Login() {
        let { userData } = useContext(AuthContext);

        
        let Navigate = useNavigate();
        let [email , setEmail] = useState();
        let [password , setPassword] = useState();
       

        let {handleLogin} = useContext(AuthContext);

        let handleClick = async ()=>{
           try{
            let res = await handleLogin(email, password);
            Navigate("/dashboard");
            toast(res);
            
           }
           catch(e){
            console.log("server error");
            toast("server error")
           }
        }


    return (  
       


        <div className="container fluid mt-5">
           <div className="row mt-5">
            <div className="col-4"></div>
            <div className="col-4">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"onChange={(e)=>setEmail(e.target.value)} value={email}/>
                </div>

                <div id="passwordHelpBlock" class="form-text mb-3">
                    <label for="inputPassword5" class="form-label">Password</label>
                    <input type="password" id="inputPassword5" class="form-control" placeholder="password" aria-describedby="passwordHelpBlock" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                </div>

                <button className="btn btn-primary" onClick={handleClick}>Login</button>
            </div>
            <div className="col-4"></div>
           </div>
        </div>


      );
}

export default Login;