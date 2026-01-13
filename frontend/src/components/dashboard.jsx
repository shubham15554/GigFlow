import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "./context/authContext";
import AllGigs from "./gigs";

const Dashboard = () => {
  const navigate = useNavigate();
  
  let {userData , setUserData} = useContext(AuthContext);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.post(
          "https://gigflow-3j81.onrender.com/user/verify",
          {},
          { withCredentials: true }
        );

        if (!data.status) {
          navigate("/login");
          return;
        }

        setUserData(data.user);
        console.log("verify me uesr " , data);
        toast(`Hello ${data.user.username}`, { position: "top-right" });
      } catch (error) {
        setUserData(data.user);
        navigate("/login");
      }
    };

    verifyUser();
  }, []);


  return (
    <>
      <AllGigs/>
    </>
  );
};

export default Dashboard;
