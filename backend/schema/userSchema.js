import mongoose from "mongoose";
import { Schema } from "mongoose";


const userSchema = new Schema({
   email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
   },
   username: {
    type: String,
    required: [true, "Your username is required"],
   },
   password: {
    type: String,
    required: [true, "Your password is required"],
   }
});


export default userSchema;