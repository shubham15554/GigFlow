import mongoose from "mongoose";
import userSchema from "../schema/userSchema.js"
import gigSchema from "../schema/gigSchema.js";
import bidSchema from "../schema/bidSchema.js";
const Bid = mongoose.model("Bid", bidSchema);


export default Bid;