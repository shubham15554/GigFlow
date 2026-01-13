import { useState } from 'react'
import {BrowserRouter as Router} from "react-router-dom";
import {Routes, Route} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from './components/navbar';
import Home from './components/home';
import Signup from './components/signup';
import { AuthProvider } from './components/context/authContext';
import  Login  from './components/login';
import Dashboard from './components/dashboard';
import PostGig from './components/postgig';
import ApplyPage from './components/applyPage';
import MyGigs from './components/myGigs';
import Bids from './components/bids';
import MyBids from './components/myBids';

function App() {

  return (
    <>
    <Router>
        
        <AuthProvider>
          <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/postGig' element={<PostGig/>}/>
          <Route path='/applyPage/:gigId' element={<ApplyPage/>}/>
          <Route path='/myGigs' element={<MyGigs/>}/>
          <Route path='/myBids' element={<MyBids/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/bids/:gigId' element={<Bids/>}/>

          
        </Routes>
        <ToastContainer />
        </AuthProvider>
    </Router>
      
    </>
  )
}

export default App
