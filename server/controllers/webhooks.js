// import { Webhook } from "svix";
// import User from "../models/User.js";
// import bodyParser from "body-parser";

// app.use(express.json());

// // api controller function to manage clerk user with database 

// export const clerkWebHooks = async(req, res) =>{
//     try {
//         // create a svix instance with clerk webhook secret ..

//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//         // verify the headers 
//         await whook.verify(req.body, {
//         "svix-id": req.headers["svix-id"],
//         "svix-timestamp": req.headers["svix-timestamp"],
//         "svix-signature": req.headers["svix-signature"],
//         });

//         // getting data from request body 

//         const {data , type} = req.body;
 
//         // switch case for different events 
//         switch(type){
//             case "user.created" : {
//                 const userData = {
//                     _id : data.id ,
//                     email : data.email_addresses[0].email_address,
//                     name : data.first_name + " " + data.last_name ,
//                     image : data.image_url ,
//                     resume : ""
//                 }
//                 await User.create(userData); 
//                 res.json({});
//                 break ; 
//             }
//             case "user.updated" : {
//                 const userData = {
//                     email : data.email_addresses[0].email_address,
//                     name : data.first_name + " " + data.last_name ,
//                     image : data.image_url ,
//                 }
//                 await User.findByIdAndUpdate(data.id , userData); 
//                 res.json({});
//                 break ; 
//             }
//             case "user.deleted" : {
//                 await User.findByIdAndDelete(data.id); 
//                 res.json({});
//                 break ; 
//             }
//             default : {
//                 break ; 
//             }
//         }
//     }
//     catch (error) {
//         console.log(error.message);
//         res.json({success : false , message : "webhooks error"}); 
//     }
// }

// export default clerkWebHooks ; 

// server/controllers/webhooks.js

import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebHooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify and parse the event
    const evt = wh.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = evt;

    console.log("Received Clerk webhook:", type);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        res.status(200).json({ message: "User created" });
        break;
      }

      case "user.updated": {
        const updatedData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, updatedData);
        res.status(200).json({ message: "User updated" });
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.status(200).json({ message: "User deleted" });
        break;
      }

      default: {
        console.log("Unhandled event type:", type);
        res.status(200).json({ message: "Event received" });
        break;
      }
    }
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(400).json({ success: false, message: "Webhook processing error" });
  }
};

export default clerkWebHooks;
