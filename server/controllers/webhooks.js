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

// Controller function to handle Clerk webhooks
const clerkWebHooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the request
    const evt = wh.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = evt;

    // Handle different event types
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
        res.json({});
        break;
      }

      case "user.updated": {
        const updatedUser = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, updatedUser);
        res.json({});
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }

      default: {
        res.status(400).json({ error: "Unhandled event type" });
        break;
      }
    }
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(500).json({ success: false, message: "Webhook error" });
  }
};

export default clerkWebHooks;
