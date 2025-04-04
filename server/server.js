import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node"
import "./config/instrument.js"
import clerkWebHooks from "./controllers/webhooks.js";
import serverless from "serverless-http";

// initialise express 
const app = express();  

await connectDB() ; 

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


app.post("/webhooks" , clerkWebHooks) ; 


// app.listen(PORT, () => {
//     console.log("server is running on port " + PORT);
// }) ;

export const handler = serverless(app);