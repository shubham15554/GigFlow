import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./context/authContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
function Bids() {
  const { userData } = useContext(AuthContext);
  const [bids, setBids] = useState([]);
  const [error, setError] = useState("");
  const { gigId } = useParams();

  const fetchBids = async () => {
      try {
       
        const res = await axios.get(`http://localhost:8000/api/bids/${gigId}`, {
          withCredentials: true,
        });
        setBids(res.data);
       
      } catch (err) {
        console.error(err);
        setError("Failed to load your bids.");
        
      }
    };


  useEffect(() => {

    fetchBids();
  }, []);


    const handleClick = async (bidId) => {
      try {
         const res = await axios.post(
          `https://gigflow-3j81.onrender.com/api/bids/hireBid/${bidId}`,
          {},
          { withCredentials: true }
        );
         
        console.log(res.data);
        toast(res.data.message);
        fetchBids();
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };





  
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Bids</h2>
      {bids.length === 0 && <p className="text-center">No Applicants</p>}

      <div className="row">
        {bids.map((bid) => (
          <div key={bid._id} className="col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{bid.gigId?.title || "Unknown Gig"}</h5>
                <p className="card-text">{bid.message}</p>
                <p className="card-text">
                  <strong>Proposed Price:</strong> ${bid.price}
                </p>
                <p className="card-text">
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      bid.status === "hired"
                        ? "text-success"
                        : bid.status === "rejected"
                        ? "text-danger"
                        : "text-warning"
                    }
                  >
                    {bid.status}
                  </span>
                </p>
                <button className="btn btn-primary" onClick={()=>{handleClick(bid._id)}}>Hire</button>
               
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bids;
