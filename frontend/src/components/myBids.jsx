import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./context/authContext";
import { toast } from "react-toastify";
function MyBids() {
  const { userData } = useContext(AuthContext);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyBids = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://gigflow-3j81.onrender.com/api/bids/myBids", {
          withCredentials: true,
        });
        setBids(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load your bids.");
        setLoading(false);
      }
    };
   fetchMyBids();
  }, [userData]);

  if (loading)
    return <p className="text-center mt-4">Loading your bids...</p>;
  if (error)
    return (
      <p className="text-danger text-center mt-4">{error}</p>
    );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Bids</h2>
      {bids.length === 0 && (
        <p className="text-center">You haven’t applied to any gigs yet.</p>
      )}

      <div className="row">
        {bids.map((bid) => (
          <div key={bid._id} className="col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  {bid.gigId?.title || "Unknown Gig"}
                </h5>
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBids;
