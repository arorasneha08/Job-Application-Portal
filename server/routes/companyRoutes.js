import express from "express"
import { ChangeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicant, getCompanyPostedJobs, loginComapny, postJob, registerCompany } from "../controllers/companyControllers.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middlewares/authMiddleware.js";
const router = express.Router(); 

// register a company 

router.post("/register" ,upload.single("image") , registerCompany); 

// company login 
router.post("/login" , loginComapny) ; 

// get company data 
router.get("/company" , protectCompany,  getCompanyData);

// post a job 
router.post("/post-job" , protectCompany,  postJob); 

// get applicants 
router.get("/applicants" ,protectCompany , getCompanyJobApplicant); 

// get company job list
router.get("/list-jobs" , protectCompany , getCompanyPostedJobs);

// change application status 
router.get("/change-status" , protectCompany , ChangeJobApplicationsStatus) ; 

//  change applications visibility
router.get("/change-visibility", protectCompany , changeVisibility); 

export default router ; 