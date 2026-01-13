import mongoose from "mongoose";
import userSchema from "../schema/userSchema.js"
import gigSchema from "../schema/gigSchema.js";
const Gig = mongoose.model("Gig", gigSchema);


export default Gig;