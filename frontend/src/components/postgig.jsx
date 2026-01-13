import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
function PostGig() {


    let [title , setTitle] = useState();
    let [budget , setBudget] = useState();
    let [description , setDescription] = useState();


    const handleClick = async ()=>{
       try{
        
        let res = await axios.post("http://localhost:8000/api/gigs" , {
            title,
            budget,
            description
        } , { withCredentials: true } );

        console.log(res);
        
       }catch(e){
        console.log(e);
        toast("server Error");
       }
    }
    return ( 
        <>
         <h2 className="text-center">Post a job</h2>
         <div className="container-fluied">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Title</label>
                        <input type="title" class="form-control" id="exampleFormControlInput1" placeholder="Title" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Budget</label>
                        <input type="Number" class="form-control" id="exampleFormControlInput1" placeholder="Budget" onChange={(e)=>setBudget(e.target.value)} value={budget}/>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "80px"}} onChange={(e)=>setDescription(e.target.value)} value={description}></textarea>
                        <label for="floatingTextarea2">Description</label>
                    </div>

                <button className="btn btn-primary" onClick={handleClick}>Submit</button>
                </div>
                <div className="col-4"></div>
            </div>
         </div>

        </>
     );
}

export default PostGig;