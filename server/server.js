import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node"
import "./config/instrument.js"
import clerkWebHooks from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js"
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js"

// initialise express 
const app = express();  

await connectDB() ; 
await connectCloudinary();

// middlewares 
app.use(cors()); 
app.use(express.json());

const PORT = process.env.PORT || 5000 ; 
Sentry.setupExpressErrorHandler(app);

// routes :- 
app.get("/" , (req, res) =>{
    res.send("api working ") ; 
})

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});


// app.post("/webhooks" , clerkWebHooks) ; 
app.post("/webhooks", express.json({ verify: (req, res, buf) => { req.body = JSON.parse(buf.toString()); } }), clerkWebHooks);

app.use("/api/company" , companyRoutes); 
app.use("/api/jobs" , jobRoutes); 

app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
}) ;

