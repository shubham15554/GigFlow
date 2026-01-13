import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login"); // Redirect to dashboard on click
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-4 mb-4">Welcome to GigFlow</h1>
          <p className="lead mb-4">
            GigFlow is a mini freelance marketplace where clients can post jobs and freelancers can apply for them.
            Explore gigs, post your own, and manage your applications seamlessly.
          </p>
          <button className="btn btn-primary btn-lg" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
