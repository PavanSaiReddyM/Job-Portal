import express from "express"
import {login, register, updateProfile,logout } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { multiUpload, singleUpload } from "../middlewares/multer.js";
import multer from "multer";


const router=express.Router();
// const upload = multer({ storage });
router.post("/register", singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, multiUpload, updateProfile);
router.route("/me").get(isAuthenticated, (req, res) => {
  res.json({
    success: true,
    user: req.user, 
  });
});

export default router;