import { applyBid , getBids , getMyBids , hireBid} from "../controllers/bids.js";

import {verifyUser} from "../middleware/verify.js";
import express from "express";
const router = express.Router();


router.post("/" , verifyUser, applyBid);
router.post("/hireBid/:bidId" , verifyUser, hireBid);
router.get("/myBids" ,verifyUser, getMyBids);
router.get("/:gigId" ,verifyUser, getBids);


export default router;
