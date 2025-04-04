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


app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
}) ;



// // api/index.js
// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import * as Sentry from "@sentry/node";
// import serverless from "serverless-http";

// import connectDB from "../config/db.js";
// import "../config/instrument.js";
// import clerkWebHooks from "../controllers/webhooks.js";

// const app = express();

// // Use middleware
// app.use(cors());
// app.use(express.json());

// // Set up Sentry
// Sentry.setupExpressErrorHandler(app);

// // Connect to MongoDB inside a safe async block
// let dbConnected = false;

// app.use(async (req, res, next) => {
//   if (!dbConnected) {
//     try {
//       await connectDB();
//       dbConnected = true;
//     } catch (err) {
//       console.error("MongoDB connection error:", err);
//       return res.status(500).json({ error: "Database connection failed" });
//     }
//   }
//   next();
// });

// // Routes
// app.get("/", (req, res) => {
//   res.send("API working on Vercel");
// });

// app.get("/debug-sentry", (req, res) => {
//   throw new Error("Sentry error for testing");
// });

// app.post("/webhooks", clerkWebHooks);

// // Export handler
// export const handler = serverless(app);
