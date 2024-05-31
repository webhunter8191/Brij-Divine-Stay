import express from "express";
import userRoute from "../routes/user.js"
const router = express.Router();


router.use('/user', userRoute);

export default router;