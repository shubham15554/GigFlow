import express from "express";
const router = express.Router();
import User from '../models/user.js'
import { createSecretToken } from "../utils/createToken.js";
import {signup, userVerification , logout} from "../controllers/user.js";
import bcrypt from "bcrypt";
import {login} from "../controllers/user.js"
import { showGigs , postGig , myGigs} from "../controllers/gigs.js";
import {verifyUser} from "../middleware/verify.js";


router.get("/myGigs" ,verifyUser, myGigs);
router.get("/" ,verifyUser, showGigs);
router.post("/" ,verifyUser, postGig);



export default router;