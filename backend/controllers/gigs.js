import Gig from "../models/gig.js";
import User from "../models/user.js";



export const showGigs = async (req , res)=>{
  try {
    const search = req.query.search || "";
    const gigs = await Gig.find({
      status: "open",
      title: { $regex: search, $options: "i" },
    }).populate("ownerId", "username , email");
    res.json(gigs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


export const myGigs = async (req , res)=>{
  try {

  
    const gigs = await Gig.find({
      ownerId: req.user._id
    }).populate("ownerId", "username , email");
    console.log(gigs);
    res.json(gigs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const postGig = async (req , res)=>{
    try {
    const { title, description, budget } = req.body;
    console.log(req.user);
    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user._id,
    });
    console.log(gig);
    res.status(201).json(gig);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

}