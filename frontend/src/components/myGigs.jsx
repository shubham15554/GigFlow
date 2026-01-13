import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./context/authContext";
import { Navigate, useNavigate } from "react-router-dom";

const MyGigs = () => {
  const Navigate = useNavigate();
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  let {userData , setUserData} = useContext(AuthContext);

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://gigflow-3j81.onrender.com/api/gigs/myGigs`, {
        withCredentials: true, 
      });
      setGigs(res.data);
      console.log(userData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load gigs");
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center" >Gigs that I have posted</h2>

      {loading && <p>Loading gigs...</p>}

      {error && <p className="text-red-500">{error}</p>}


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gigs.length === 0 && !loading && <p>No gigs found.</p>}

        {gigs.map((gig) => (
           
          <div
            
            key={gig._id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <h2 className="font-bold text-lg">{gig.title}</h2>
            <p className="text-gray-700 my-2">{gig.description}</p>
            <p className="font-semibold">Budget: ${gig.budget}</p>
            <p className="text-sm text-gray-500 mt-1">
              Owner: {gig.ownerId.username || "Unknown"}
            </p>
            <p className="text-sm text-gray-500">
              Status: {gig.status}
            </p>
             <button
                className="btn btn-primary"
                onClick={() => { Navigate(`/bids/${gig._id}`); }}
                >
                See Applicants
             </button>
     
          </div>
        ))}
      </div>






    </div>
  );
};

export default MyGigs;
