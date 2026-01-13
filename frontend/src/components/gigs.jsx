import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./context/authContext";
import { Navigate, useNavigate } from "react-router-dom";
const AllGigs = () => {
  const Navigate = useNavigate();
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  let {userData , setUserData} = useContext(AuthContext);

  useEffect(() => {
    fetchGigs();
  }, [search]);

  const fetchGigs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://gigflow-3j81.onrender.com/api/gigs?search=${search}`, {
        withCredentials: true, 
      });
      setGigs(res.data);
      console.log(res.data);
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
      <h2 className="text-2xl font-bold mb-4 text-center" >Open Gigs</h2>
    <div className="row">
        <div className="col-5"></div>
        <div className="col-3 mb-4">
        <input
          type="text"
          placeholder="Search gigs by title..."
          className="border border-gray-300 rounded p-2 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="col-4"></div>
      </div>
    </div>

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

            {gig.ownerId._id !== userData._id && gig.status === "open" && (
             <button
                className="btn btn-primary"
                onClick={() => { Navigate(`/applyPage/${gig._id}`); }}
                >
                Apply
             </button>
            )}
          </div>
        ))}
      </div>






    </div>
  );
};

export default AllGigs;
