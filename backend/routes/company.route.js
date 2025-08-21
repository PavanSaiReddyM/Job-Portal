import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { registerCompany, updateCompany,getCompany,getCompanyById } from "../controllers/company.controller.js";
import { singleUpload, singleUpload1 } from "../middlewares/multer.js";


const router=express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,singleUpload1,updateCompany); //if userauthenticated then only we can update it 

export default router;