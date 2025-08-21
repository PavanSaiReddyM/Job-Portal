import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { postjob,getAllJobs,getJobById,getAdminjobs } from "../controllers/job.controller.js";

const router=express.Router();

router.route("/post").post(isAuthenticated,postjob);
router.route("/get").get(isAuthenticated,getAllJobs);
router.route("/getadminjobs").get(isAuthenticated,getAdminjobs);
router.route("/get/:id").get(isAuthenticated,getJobById);


export default router;
