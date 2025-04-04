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


// app.post("/webhooks" , clerkWebHooks) ; 
app.post("/webhooks", express.json({ verify: (req, res, buf) => { req.body = JSON.parse(buf.toString()); } }), clerkWebHooks);



app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
}) ;


// // api/index.js

// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import * as Sentry from "@sentry/node";
// import serverless from "serverless-http";
// import bodyParser from "body-parser";

// import connectDB from "../server/config/db.js";
// import "../server/config/instrument.js";
// import clerkWebHooks from "../server/controllers/webhooks.js";

// const app = express();

// // Enable CORS
// app.use(cors());

// // Use express.json() for all routes except /webhooks
// app.use((req, res, next) => {
//   if (req.originalUrl === "/api/webhooks") {
//     next(); // Skip JSON parsing for Clerk webhook
//   } else {
//     express.json()(req, res, next);
//   }
// });

// // Sentry setup
// Sentry.setupExpressErrorHandler(app);

// // MongoDB connection middleware
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

// app.get("/debug-sentry", () => {
//   throw new Error("Sentry test error");
// });

// // Use raw body only for webhook verification
// app.post(
//   "/webhooks",
//   bodyParser.raw({ type: "application/json" }),
//   clerkWebHooks
// );

// // Export handler for Vercel
// export const handler = serverless(app);
