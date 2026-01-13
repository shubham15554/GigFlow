import {  createContext, useContext, useState } from "react";
import axios from "axios";

import React from "react";
import { useEffect  } from "react";


import { useNavigate } from "react-router-dom";
export const  AuthContext = createContext({});



export  const AuthProvider = ({children}) => {
   
  const navigate = useNavigate(); 
   const [userData , setUserData] = useState();


    const handleRegister =  async (username , email , password)=>{
       try{
       
        let res = await axios.post("http://localhost:8000/user/signup" , {
            username: username,
            email : email,
            password : password
         } , { withCredentials: true });
         console.log(res.data.user);

        if(res.data.success) {
          setUserData(res.data.user);
          return res.data.message;
        }
         
       }
        catch(err){
          throw err;
          
        }

    }


    const handleLogin =  async (email,password)=>{
       try{
          
         let res = await axios.post("http://localhost:8000/user/login" , {
            email: email,
            password: password
         } , { withCredentials: true } );

         console.log(res.data.message);

         if(res.data.success){
            setUserData(res.data.user);
            return res.data.message;
         }
       }
        catch(error){
          throw error;
        }
    }


    







    let data = {
        userData, setUserData , handleRegister,handleLogin
    }


    return (

        <AuthContext.Provider value={data}>
           {children}
        </AuthContext.Provider>
    )




}