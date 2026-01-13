import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
function ApplyPage() {
    const { gigId } = useParams();


    let [price , setPrice] = useState();
    let [message , setMessage] = useState();

    const handleClick = async ()=>{
       try{
        let res = await axios.post("https://gigflow-3j81.onrender.com/api/bids" , {
          gigId,     
          message,
          price,
        } , { withCredentials: true } );

        if(res.data){
         toast("successfully applied");
        }
        
       }catch(e){
        console.log(e);
        toast("server Error");
       }
    }


    return ( 
        <>
         <h2 className="text-center">Apply</h2>
         <div className="container-fluied">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">

                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Proposed Price</label>
                        <input type="Number" class="form-control" id="exampleFormControlInput1" placeholder="Proposed Price" onChange={(e)=>setPrice(e.target.value)} value={price}/>
                    </div>
                    
                    <div class="form-floating mb-3">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "80px"}} onChange={(e)=>setMessage(e.target.value)} value={message}></textarea>
                        <label for="floatingTextarea2">Message</label>
                    </div>


                <button className="btn btn-primary" onClick={handleClick}>Apply</button>
                </div>
                <div className="col-4"></div>
            </div>
         </div>

        </>
     );
}

export default ApplyPage;