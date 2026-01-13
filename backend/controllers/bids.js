import Gig from "../models/gig.js";
import Bid from "../models/bid.js";
import mongoose from "mongoose";

export const applyBid = async (req , res)=>{
    
    try {
    const { gigId, message, price } = req.body;

    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    if (gig.ownerId.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot bid on your own gig" });
    }

    const existingBid = await Bid.findOne({
      gigId,
      freelancerId: req.user._id,
    });
    if (existingBid)
      return res.status(400).json({ message: "You already bid on this gig" });

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
      price,
    });

    console.log("bid created " , bid);

    res.status(201).json(bid);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

export const getBids = async (req, res) => {
 
  try {
    const gig = await Gig.findById(req.params.gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

  
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const bids = await Bid.find({ gigId: req.params.gigId })
      .populate("freelancerId", "name email");

    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getMyBids = async (req, res) => {
  try {
   
    const userId = req.user._id;

    
    const bids = await Bid.find({ freelancerId: userId }).populate(
      "gigId",
      "title description budget ownerId"
    );

    res.status(200).json(bids);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const hireBid = async (req, res) => {
  const { bidId } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(bidId).populate("gigId").session(session);
    if (!bid) throw new Error("Bid not found");

    const gig = bid.gigId;
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (gig.status !== "open") {
      return res.status(400).json({ message: "Gig already assigned" });
    }

    gig.status = "assigned";
    await gig.save({ session });

    bid.status = "hired";
    await bid.save({ session });

    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bidId } },
      { $set: { status: "rejected" } },
      { session }
    );

   
    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Freelancer hired successfully", bid });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
