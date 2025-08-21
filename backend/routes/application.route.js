import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob,getAppliedJobs,getapplicants,updatestatus } from "../controllers/application.controller.js";

const router=express.Router();

router.route("/apply/:id").post(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated,getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated,getapplicants);
router.route("/status/:id/update").post(isAuthenticated,updatestatus); //if userauthenticated then only we can update it 

export default router;