import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebHooks = async (req, res) => {
  try {
    const svix_id = req.headers["svix-id"];
    const svix_timestamp = req.headers["svix-timestamp"];
    const svix_signature = req.headers["svix-signature"];

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({ error: "Missing Svix headers" });
    }

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = JSON.stringify(req.body); // Ensure proper payload for verification
    const headers = {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    };

    const evt = wh.verify(payload, headers);
    const { data, type } = evt;

    console.log("Received Clerk event:", type);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        console.log("User created:", userData.email);
        return res.status(200).json({ message: "User created" });
      }

      case "user.updated": {
        const updatedData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, updatedData);
        console.log("User updated:", updatedData.email);
        return res.status(200).json({ message: "User updated" });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("User deleted:", data.id);
        return res.status(200).json({ message: "User deleted" });
      }

      default:
        console.log("Unhandled event type:", type);
        return res.status(200).json({ message: "Unhandled event type" });
    }
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).json({ success: false, message: "Webhook processing error" });
  }
};

export default clerkWebHooks;
