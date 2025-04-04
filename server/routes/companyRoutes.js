import express from "express"
import { ChangeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicant, getCompanyPostedJobs, loginComapny, postJob, registerCompany } from "../controllers/companyControllers.js";
const router = express.Router(); 

// register a company 

router.post("/register" , registerCompany); 

// company login 
router.post("/login" , loginComapny) ; 

// get company data 
router.get("/company" , getCompanyData);

// post a job 
router.post("/post-job" , postJob); 

// get applicants 
router.get("/applicants" , getCompanyJobApplicant); 

// get company job list
router.get("/list-jobs" , getCompanyPostedJobs);

// change application status 
router.get("/change-status" , ChangeJobApplicationsStatus) ; 

//  change applications visibility
router.get("/change-visibility", changeVisibility); 

export default router ; 