import express from "express";
const router = express.Router();
import User from '../models/user.js'
import { createSecretToken } from "../utils/createToken.js";
import {signup, userVerification , logout} from "../controllers/user.js";
import bcrypt from "bcrypt";
import {login} from "../controllers/user.js"

router.post("/signup" , signup);

router.post("/login" , login);
router.post("/verify" , userVerification);

router.post("/logout" , logout);


export default router